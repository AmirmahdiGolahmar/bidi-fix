(() => {
  // A block becomes RTL when at least this share of its words are Persian/Arabic/Hebrew.
  // Lower it (e.g. 0.2) if Persian paragraphs full of English terms still come out LTR.
  const RTL_RATIO = 0.3;

  const ATTR = 'data-bidifix';
  const BLOCKS = 'p,li,ul,ol,blockquote,h1,h2,h3,h4,h5,h6,td,th,dt,dd,summary,figcaption';
  // Math, code and editors: never counted, never changed, always kept LTR.
  const SKIP =
    '.katex,.katex-display,mjx-container,.MathJax,math,code,pre,kbd,samp,svg,' +
    'script,style,textarea,input,[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"]';
  const RTL_WORD = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]+/g;
  const LTR_WORD = /[A-Za-z\u00C0-\u024F]+/g;

  const CSS = `
    .katex, .katex-display, mjx-container, .MathJax, math,
    code, pre, kbd, samp {
      direction: ltr !important;
      unicode-bidi: isolate !important;
    }
    pre { text-align: left !important; }
    :is(p, li, blockquote, dd, dt, td, th)[${ATTR}="rtl"] { text-align: right !important; }
    :is(ul, ol)[${ATTR}="rtl"] {
      padding-inline-start: 1.6em !important;
      padding-inline-end: 0 !important;
    }
  `;

  function textOf(el) {
    let out = '';
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement && n.parentElement.closest(SKIP)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    while (walker.nextNode()) out += walker.currentNode.nodeValue + ' ';
    return out;
  }

  // Moves a left accent border (typical blockquote style) to the right side in RTL.
  function swapBorder(el, dir) {
    if (dir === 'rtl' && !el.dataset.bidifixSwapped) {
      const cs = getComputedStyle(el);
      if (parseFloat(cs.borderLeftWidth) > 0 && parseFloat(cs.borderRightWidth) === 0) {
        const pl = cs.paddingLeft, pr = cs.paddingRight;
        el.style.borderRight = `${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`;
        el.style.borderLeft = 'none';
        el.style.paddingRight = pl;
        el.style.paddingLeft = pr;
        el.dataset.bidifixSwapped = '1';
      }
    } else if (dir === 'ltr' && el.dataset.bidifixSwapped) {
      ['border-right', 'border-left', 'padding-right', 'padding-left'].forEach((p) =>
        el.style.removeProperty(p)
      );
      delete el.dataset.bidifixSwapped;
    }
  }

  function classify(el) {
    if (!el.isConnected || el.closest(SKIP)) return;
    const text = textOf(el);
    const r = (text.match(RTL_WORD) || []).length;
    const l = (text.match(LTR_WORD) || []).length;
    if (r + l === 0) return; // only numbers/symbols: leave untouched
    const dir = r / (r + l) >= RTL_RATIO ? 'rtl' : 'ltr';
    if (el.getAttribute(ATTR) === dir) return;
    el.setAttribute('dir', dir);
    el.setAttribute(ATTR, dir);
    if (el.tagName === 'BLOCKQUOTE') swapBorder(el, dir);
  }

  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches(BLOCKS)) classify(root);
    root.querySelectorAll(BLOCKS).forEach(classify);
  }

  function start() {
    const style = document.createElement('style');
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);

    if (document.body) scan(document.body);

    // Handle content that appears or changes later (chat apps, streaming answers).
    const subtrees = new Set();
    const ancestors = new Set();
    let timer = null;

    const flush = () => {
      timer = null;
      subtrees.forEach(scan);
      ancestors.forEach(classify);
      subtrees.clear();
      ancestors.clear();
    };

    const noteAncestors = (node) => {
      let el = node.nodeType === 1 ? node : node.parentElement;
      while (el && (el = el.closest(BLOCKS))) {
        ancestors.add(el);
        el = el.parentElement;
      }
    };

    new MutationObserver((mutations) => {
      for (const m of mutations) {
        noteAncestors(m.target);
        m.addedNodes.forEach((n) => n.nodeType === 1 && subtrees.add(n));
      }
      if (!timer) timer = setTimeout(flush, 150); // throttle, so streaming text still updates
    }).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  }

  chrome.storage.sync.get({ disabledHosts: [] }, ({ disabledHosts }) => {
    const on = !disabledHosts.includes(location.hostname);
    chrome.runtime.sendMessage({ type: 'bidifix-state', on }).catch(() => {});
    if (on) start();
  });
})();
