
sass --watch ./src/tocas.sass:./src/tocas.css
cd ./cli/docs-builder/ && go build && ./docs-builder serve

<p align="center">
  <br>
  <img src="./assets/images/logo.png" width="200">
  <br>
  <br>
</p>

---

<h4 align="center">支援響應式設計並基於 CSS3 的多元介面元件庫，可快速建置任何規模的網站且用法簡易。</h4>

<p align="center">
  <a href="https://github.com/teacat/tocas/releases">
    <img src="https://img.shields.io/github/release/teacat/tocas.svg"
         alt="GitHub Release">
  </a>
  <a href="https://github.com/teacat/tocas/issues">
      <img src="https://img.shields.io/github/issues/teacat/tocas.svg">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
</p>

<p align="center">
  <a href="#how-to-use">特色</a> •
  <a href="#key-features">瀏覽器支援</a> •
  <a href="#credits">文件</a> •
  <a href="#download">使用方式</a> •
  <a href="#credits">範例</a> •
  <a href="#related">社群</a>
</p>

![screenshot](https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif)

## 國籍注意

本套件中含有中華民國（台灣）國旗，欲使用至政治敏感用途，請注意。

## 特色

* 更簡潔、沒有像 Bootstrap 那樣雜亂的樣式名稱
  * 你再也不會看見 `.m-l-1`、`.p-x-2`、`.p-a-3` 這種東西了。
* 豐富的元件系統，符合手機應用、甚至是大型規模的網站
* 以支援行動裝置為優先
  * 易於在不同裝置上有所變化的元件系統。
* 更加彈性的網格系統
  * 達到 16 格欄位的高度客製化佈局，且支援更多不同與顯示排列方式。
* 具有回饋力的動畫特效 :tada:
* 標準對比的設計讓網頁更為一致化且易於閱讀
  * 不會過於強調黑白色彩，讓頁面風格更加地與人親近。
* 不仰賴 jQuery 函式庫的獨立 JavaScript 模塊

## 瀏覽器支援

除了 Microsoft 所提供的瀏覽器（如：Edge、Internet Explorer）外，都獲得後續的支援與開發。

|         | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_64x64.png)<br>Chrome | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_64x64.png)<br>Firefox | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_64x64.png)<br>Edge | ![WebView](https://raw.githubusercontent.com/alrra/browser-logos/master/src/android-webview-beta/android-webview-beta_64x64.png)<br>Android WebView | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_64x64.png)<br>Opera | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_64x64.png)<br>Safari |
|---------|--------|---------|------|-------------------|-------|--------|
| Android | 29+    | 28+     | N/A  | Android 5.0+      | 17+   | N/A    |
| iOS     | 29+    | 28+     | N/A  | N/A               | 17+   | 9.2+   |
| macOS   | 29+    | 28+     | N/A  | N/A               | 17+   | 9+     |
| Windows | 29+    | 28+     | ✖    | N/A               | 17+   | 9+     |

## 文件

## 使用方式

將下列標籤放入網頁的 `<head>...</head>` 標籤之中。

```html
<!-- Tocas UI：CSS 與元件 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tocas-ui/3.0.0/tocas.min.css">
<!-- Tocas JS：模塊與 JavaScript 函式 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tocas-ui/3.0.0/tocas.min.js"></script>
```

## 範例

## 社群

## 授權

MIT

---

> Group [卡莉絲伊繁星](https://caris.events) &nbsp;&middot;&nbsp;
> Author [Yami Odymel](https://yami.io)