# 命名規範（Naming Convention）

**T**OCA**S** **CSS** 是專為 Tocas UI 4.0 所設計的新命名方法，這能夠有效解決對於 JavaScript 和 Vue.js（或 React.js）那樣模組操作樣式名稱時發生衝突的問題，同時能夠減少 CSS 選擇器的運用令整體程式更加地輕量化；同時，這個命名方案也會顛覆性地更改以往的習慣，並針對網格系統縮短樣式用法。

## 索引

* [舊有問題](#舊有問題)
* [命名規範](#命名規範)
  * [私人規範](#私人規範)
    * [唯一名稱](#唯一名稱)
    * [區塊／容器](#區塊／容器)
    * [元素](#元素)
    * [JavaScript 代用詞](#JavaScript-代用詞)
    * [CSS 選擇器](#CSS-選擇器)
  * [Tocas 規範](#Tocas-規範)
    * [元件](#元件)
    * [修飾詞](#修飾詞)
    * [子項目](#子項目)
    * [語意與顏色](#語意與顏色)
    * [響應式可見詞](#響應式可見詞)
    * [圖示](#圖示)
    * [網格尺寸](#網格尺寸)
    * [有限度縮寫](#有限度縮寫)

## 舊有問題

在 Tocas 1.x 與 2.x 都採用了 Semantic UI 官方命名方式，其方法類似

```html
<!-- Tocas 大的 按鈕 -->
<button class="ts large button"></button>
```

這個命名方式十分明確，但同時也帶來了困擾。例如說：一個置左對齊且置左浮動的按鈕。

```html
<!-- Tocas 置左對齊 置左浮動 按鈕 -->
<button class="ts left aligned left floated button"></button>
```

在這種情況下，當透過 JavaScript 切換 `left aligned` 樣式時，其置左浮動的 `left` 也會一同受到干擾。在 [HTML5 的文件中](https://www.w3.org/TR/2011/WD-html5-20110525/elements.html)強調敘述了一件事情：

> The classes that an HTML element has assigned to it consists of all the classes returned when the value of the class attribute is split on spaces. (Duplicates are ignored.)
>
> （HTML 元素的樣式名稱以空白分隔，並且在作為資料回傳時會將所有重複的名稱去除）

這意味著採用 Semantic UI 的作法其實是由走在邊緣且不可靠的，這同時也在 GitHub 上有著類似的問題：

1. [Duplicate class names are removed by Meteor](https://github.com/Semantic-Org/Semantic-UI/issues/1526)
2. [When the transition "fade out" ended, it removes all "out" classes in the element](https://github.com/vuejs/vue/issues/3773)
3. [Word Order Dependency ](https://github.com/Semantic-Org/Semantic-UI/issues/396)
4. [Class name order shouldn’t matter ](https://github.com/Semantic-Org/Semantic-UI/issues/5484)

在撰寫 CSS 時，也會為了避免衝突而增加許多不必要的累贅 `:not` 選擇器。

```css
/** 避免與 .horizontally.padded 或 .vertically.padded 衝突 */
.ts.card > .content.padded:not(.horizontal):not(.vertically)

.ts.card > .content[class*="horizontally padded"]
.ts.card > .content[class*="vertically padded"]
```

針對這個方法，應該要在 Tocas UI 3 中獲得改進。

## 命名規範

新的 TSCSS 命名規範受到 [RSCSS](http://rscss.io/#introduction) 和 [SUIT CSS](https://suitcss.github.io/) 的啟發，同時也盡可能地降低了像 [BEM](http://getbem.com/) 那樣令人感到聒噪的問題。

### 私人規範

開發者自行命名元素與元件時所該遵循的事項。

#### 唯一名稱

元素的唯一識別名稱的單字必須透過 `-`（減號）來作為分隔符號，這讓其風格符合修飾詞與其他用法。

```html
<!-- ✓ 請這麼做 -->
<div id="block-container"></div>

<!-- ✖ 別這樣 -->
<div id="blockContainer"></div>
```

#### 區塊／容器

一個區塊或容器的樣式名稱必須要有至少兩個單字，並且透過 `-`（減號）相隔。

```html
<!-- ✓ 請這麼做 -->
<div class="search-form"></div>

<!-- ✖ 別這樣 -->
<div class="form"></div>
```

#### 元素

在區塊內的元素（像是：收藏按鈕、圖片）都只能用上一個單字，且不可帶有任何分隔符號。

```html
<!-- ✓ 請這麼做 -->
<div class="search-form">
     <input class="keyword" type="text">
     <button class="submit"></button>
</div>

<!-- ✖ 別這樣 -->
<div class="search-form">
     <input class="search-keyword" type="text">
     <button class="submit-button"></button>
</div>
```

#### JavaScript 代用詞

有些時候在元件上可能會使用到 JavaScript 代名詞，這讓你可以透過 jQuery 等函式庫直接選擇某個元件，而不需要透過 CSS 選擇器一層一層地慢慢選。JavaScript 代名詞的命名方式和修飾詞不太一樣，其名稱以 `js-` 作為前輟（而不是修飾詞的減號符號）。

```html
<!-- ✓ 請這麼做 -->
<button class="ts js-reply -large button"></button>

<!-- ✖ 別這樣 -->
<button class="ts -js-reply -large button"></button>
```

#### CSS 選擇器

當撰寫 CSS 選擇器的時候，請直接指定樣式名稱而不是採用標籤作為選擇的重點。這能夠讓你的選擇器看起來更明瞭與簡潔，且不需要猜測其標籤元素的用意。

```css
/* ✓ 請這麼做 */
.comment-container > .comment-item .avatar

/* ✖ 別這樣 */
.comment-container > .comment-item > figure > img
```

### Tocas 規範

Tocas UI 在設計元件名稱與用法時所該遵循的注意事項和風格。

#### 元件

元件是一個最上層的容器（像是：按鈕、選單、清單），其底下可能會有其他元件。一個元件的命名方式以小寫為主，中間不應安插任何符號。元件的名稱必須為一個單字。

```html
<!-- ✓ 請這麼做 -->
<button class="ts button"></button>

<!-- ✖ 別這樣 -->
<button class="ts-button"></button>
```

#### 修飾詞

任何更改元件的樣式、點綴都被稱作為「修飾詞」，所有的修飾詞都以 `-`（減號）作為開頭符號，遇到單字時再次透過 `-`（減號）作為分隔符號且不可有任何空白於其中，這讓你能夠一眼就看出來哪些字詞相互關聯。

修飾詞應該盡可能地保持在兩個單字以內，避免過長而造成閱讀不易。

```html
<!-- ✓ 請這麼做 -->
<button class="ts -large -left-aligned button"></button>

<!-- ✖ 別這樣 -->
<button class="ts large left aligned button"></button>
```

#### 子項目

當元素是某個合集（如：清單、選單、導航列）的項目時，沒有必要重新聲明這個項目屬於誰，這能夠大幅度減少 HTML 的重複與混濁度。子項目的命名方法與元件相同。

```html
<!-- ✓ 請這麼做 -->
<div class="ts menu">
    <div class="item"></div>
</div>

<!-- ✖ 別這樣 -->
<div class="ts menu">
    <div class="menu-item"></div>
</div>
```

正因為子項目的命名方式與元件相同，因此子項目只能有一個單字作為名稱。在最壞的情況以下方範例來說，也能夠採用 `subheader`（不分大小寫與不帶分隔符號）作為命名的最終手段，但盡可能地不要將兩個單字混參著一起使用。

```html
<!-- ✓ 請這麼做 -->
<div class="ts header">
    <div class="description"></div>
</div>

<!-- ✖ 別這樣 -->
<div class="ts header">
    <div class="sub header"></div>
</div>
```

#### 語意與顏色

頁面上不應該充滿一堆顏色，請記住一點：「當所有事情都被凸顯，所有事情都將顯得不重要」，為此 Tocas UI 中也沒有顏色樣式，因為語意才是最重要的。將顏色以語意命名能夠限制你所使用的方式、避免濫用且導向正軌。

透過「負面的」、「警告的」來命名顏色，而不是「紅色」、「黃色」，這令你能夠替換樣式佈景的時候而不會因為改了顏色卻繼續使用像「黃色」這種制式名稱而有所不符。

```html
<!-- ✓ 請這麼做 -->
<button class="ts -negative button"></button>
<button class="ts -warning button"></button>

<!-- ✖ 別這樣 -->
<button class="ts -red button"></button>
<button class="ts -yellow button"></button>
```

#### 響應式可見詞

在 Tocas UI 中不會有任何的全域裝飾詞，唯一例外的是響應式可見詞。響應式可見詞是 Tocas UI 中唯一能夠套用到任何元件的樣式，這能夠切換某個元件出現的實機（例如：僅在手機出現），而這也被稱作為響應式設計（Responsive Design）。

響應式可見詞的命名方式為 `_`（底線）開頭，而單字之間仍保持以 `-`（減號）分隔。

```html
<!-- ✓ 請這麼做 -->
<button class="ts _mobile-only -large button"></button>

<!-- ✖ 別這樣 -->
<button class="ts -large -mobile-only button"></button>
<button class="ts -large button" data-rwd="mobile only"></button>
```

#### 圖示

在 Tocas UI 4.0 中，圖示將不再繼續透過類別樣式名稱進行圖示更改，而是透過 HTML 標籤屬性（`[data-icon]`）。

```html
<!-- ✓ 請這麼做 -->
<i class="icon" data-icon="arrow-right">

<!-- ✖ 別這樣 -->
<i class="-arrow-right icon">
```

#### 網格尺寸

網格系統的寬度尺寸命名方式一直是 Tocas UI 1 與 2.x 中最為聒噪的一部分，而在新的 4.0 中，這也將被改善。其用法類似於裝飾詞皆以 `-`（減號）作為開頭，但將英文數字轉換成正統的阿拉伯數字，並且縮短了樣式名稱。

```html
<!-- ✓ 請這麼做 -->
<div class="ts grid">
    <div class="-mobile-3 -widescreen-10 column"></div>
</div>

<!-- ✖ 別這樣 -->
<div class="ts grid">
    <div class="-three-wide-mobile -ten-wide-large-screen column"></div>
</div>
```

#### 有限度縮寫

在 Tocas UI 中可以使用縮寫，但不應該過度縮寫（因此這也被稱為有限度縮寫）。

| 全名                     	| 縮寫       	| 含意       	| 可供採用 	|
|--------------------------	|------------	|------------	|----------	|
| `left`、`right`          	| `l`、`r`   	| 左、右     	| ✖         	|
| `vertical`、`horizontal` 	| `x`、`y`   	| 垂直、水平 	| ✖         	|
| `x wide device`          	| `device-x` 	| 裝置寬度   	| ✓         	|

