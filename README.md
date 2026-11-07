# Bidi Fix (Persian RTL)

A Chrome extension that fixes RTL/LTR direction per paragraph for Persian text mixed with English, while keeping math and code left-to-right.

## Features

- **Per-paragraph direction detection** – each paragraph, list item, heading, table cell, etc. is set to RTL or LTR based on the share of Persian/Arabic/Hebrew words in it.
- **Math and code stay LTR** – KaTeX, MathJax, MathML, `<code>`, `<pre>` and similar elements are never counted and are always kept left-to-right.
- **Works on dynamically loaded content** – a MutationObserver re-checks content as it appears or streams in (chat apps, AI assistants, etc.).
- **Blockquote border flipped** – the accent border of RTL blockquotes moves to the right side.
- **Per-site toggle** – click the toolbar icon to turn the extension off/on for the current site (the page reloads; an `OFF` badge is shown while disabled).

## Screenshots

<!-- Add your before/after images here:
     docs/before.png and docs/after.png, then uncomment the lines below.

| Before | After |
|--------|-------|
| ![Before](docs/before.png) | ![After](docs/after.png) |
-->

## Installation

1. Download the latest `bidi-fix-v*.zip` from the [Releases](../../releases) page.
2. Unzip it.
3. Open `chrome://extensions`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select the unzipped folder.

## Configuration

Open `content.js` and change `RTL_RATIO` (default `0.3`). A block becomes RTL when at least this share of its words are Persian/Arabic/Hebrew. Lower it (e.g. `0.2`) if Persian paragraphs with many English terms still come out LTR. After editing, click the reload button for the extension on `chrome://extensions`.

## Known limitations

- Raw-text formulas that are not rendered by KaTeX/MathJax are treated as normal text.
- Inputs, textareas and contenteditable editors are not modified.

## License

[MIT](LICENSE) © 2026 Amirmahdi Gol-Ahmar

---

<div dir="rtl" align="right">

# Bidi Fix (راست‌به‌چپ فارسی)

افزونه‌ی کروم که جهت متن (RTL/LTR) را برای هر پاراگراف به‌صورت جداگانه در متن‌های فارسی آمیخته با انگلیسی اصلاح می‌کند، و فرمول‌های ریاضی و کد را چپ‌به‌راست نگه می‌دارد.

## ویژگی‌ها

- **تشخیص جهت برای هر پاراگراف** – هر پاراگراف، آیتم لیست، عنوان، سلول جدول و غیره بر اساس سهم کلمات فارسی/عربی/عبری، راست‌به‌چپ یا چپ‌به‌راست می‌شود.
- **ریاضی و کد چپ‌به‌راست می‌مانند** – KaTeX، MathJax، MathML، و عناصر `<code>` و `<pre>` هرگز شمرده یا تغییر داده نمی‌شوند.
- **کار با محتوای پویا** – محتوایی که بعداً بارگذاری می‌شود یا به‌تدریج نمایش داده می‌شود (برنامه‌های چت و دستیارهای هوش مصنوعی) هم اصلاح می‌شود.
- **برگرداندن حاشیه‌ی blockquote** – حاشیه‌ی رنگی نقل‌قول‌های راست‌به‌چپ به سمت راست منتقل می‌شود.
- **فعال/غیرفعال‌سازی برای هر سایت** – با کلیک روی آیکون افزونه در نوار ابزار، افزونه را برای سایت فعلی خاموش/روشن کنید (صفحه دوباره بارگذاری می‌شود و هنگام غیرفعال بودن نشان `OFF` دیده می‌شود).

## تصاویر

<!-- تصاویر قبل/بعد را اینجا اضافه کنید: docs/before.png و docs/after.png -->

## نصب

1. آخرین فایل `bidi-fix-v*.zip` را از صفحه‌ی [Releases](../../releases) دانلود کنید.
2. فایل را از حالت فشرده خارج کنید.
3. آدرس `chrome://extensions` را باز کنید.
4. گزینه‌ی **Developer mode** را فعال کنید.
5. روی **Load unpacked** کلیک کنید و پوشه‌ی استخراج‌شده را انتخاب کنید.

## پیکربندی

در فایل `content.js` مقدار `RTL_RATIO` (پیش‌فرض `0.3`) را تغییر دهید. اگر سهم کلمات فارسی در یک بلوک حداقل این مقدار باشد، آن بلوک راست‌به‌چپ می‌شود. اگر پاراگراف‌های فارسی پر از اصطلاحات انگلیسی هنوز چپ‌به‌راست می‌شوند، آن را کمتر کنید (مثلاً `0.2`). پس از ویرایش، افزونه را در `chrome://extensions` دوباره بارگذاری کنید.

## محدودیت‌های شناخته‌شده

- فرمول‌های متنیِ خام که توسط KaTeX/MathJax رندر نشده‌اند، مانند متن عادی در نظر گرفته می‌شوند.
- فیلدهای ورودی (input/textarea) و ویرایشگرهای contenteditable تغییر داده نمی‌شوند.

## مجوز

[MIT](LICENSE) © 2026 Amirmahdi Gol-Ahmar

</div>
