function setBadge(tabId, on) {
  chrome.action.setBadgeText({ tabId, text: on ? '' : 'OFF' });
  chrome.action.setBadgeBackgroundColor({ tabId, color: '#888' });
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg && msg.type === 'bidifix-state' && sender.tab && sender.frameId === 0) {
    setBadge(sender.tab.id, msg.on);
  }
});

// Clicking the toolbar icon turns the extension on/off for the current site.
chrome.action.onClicked.addListener(async (tab) => {
  let host;
  try {
    host = new URL(tab.url).hostname;
  } catch {
    return;
  }
  if (!host) return;
  const { disabledHosts } = await chrome.storage.sync.get({ disabledHosts: [] });
  const i = disabledHosts.indexOf(host);
  if (i === -1) disabledHosts.push(host);
  else disabledHosts.splice(i, 1);
  await chrome.storage.sync.set({ disabledHosts });
  chrome.tabs.reload(tab.id);
});
