<p align="center">
  <img src="logo.png"/>
</p>
<p align="center">
  <i>Here comes another world.</i>
</p>


&nbsp;

## TocasUI（Alpha 階段）

TocasUI 是基於 SASS 和 CSS3 的元件框架，而**教學首頁正在製作中**。

你說 Logo 看不出來是 Tocas？很正常。

&nbsp;

## 為什麼是 TocasUI？

與 Bootstrap 相比（甚至是最新的 Bootstrap 4），TocasUI更好於：

&nbsp;

###更簡潔

在 Bootstrap 中，你會需要為了更改顏色，而新增更多 CSS 來覆蓋原生設定，

而 TocasUI 中，**你只需要新增一行更換顏色的指令即可**。（而且 TocasUI 會自動為其配色。）

&nbsp;

###可自訂顏色

你隨時都可以變換元件的顏色，還可以為他們命名，

**你只需要提供一個主顏色**，而 TocasUI 會為其自動配副色。


&nbsp;

###更有意義

在 Bootstrap 中，你會遇到像這樣的按鈕

```html
<!-- 按鈕 按鈕-資訊 按鈕-更大 -->
<button class="btn btn-info btn-lg">
```

而在 TocasUI 中，我們將**樣式以更有意義的方式命名**。

```html
<!-- Tocas 按鈕 資訊 更大 -->
<button class="ts button info large">
```

&nbsp;

### 不會因為顏色而命名

有的樣式框架以 `.btn-red .btn-green .btn-blue` 方式命名紅、綠、藍顏色按鈕，

設想看看，你可能以前用 `.btn-green` 當作送出的按鈕，日後若要更換成藍色，不就需要全部更換成 `.btn-blue` 了麼？

TocasUI 以「意義」命名：`positive negative info primary`，因此你只需要更換該意義的顏色即可。


&nbsp;

###沒有雜亂的樣式，而且更短

在 Bootstrap 中，你很常看見為了美化介面，而冒出的一堆 `<div>`：

```html
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">WebSiteName</a>
        </div>
        <div>
            <ul class="nav navbar-nav">
                <li class="active">Home</li>
                <li>Page 1</li>
                <li>Page 2</li> 
                <li>Page 3</li> 
            </ul>
        </div>
    </div>
</nav>
```

而 TocasUI 中，**每個容器都據有意義，而且更簡短**。

```html
<nav class="ts menu">
    <div class="header item">WebSiteName</div>
    <div class="item">Home</div>
    <div class="item">Page 1</div>
    <div class="item">Page 2</div>
    <div class="item">Page 3</div>
</nav>
```

&nbsp;

###具有回饋力

有的樣式框架，他們的按鈕按下去具有**緩慢的動畫效果**，而不是「喀」的清脆。

我們以 Amaze UI 為例：

![Amaze UI](http://i.imgur.com/YxKsaUk.gif)

而 TocasUI 在按下去的時候，就是非常的**清脆**（毫無動畫效果）：

![Tocas UI](http://imgur.com/8UrV6Bb.gif)

&nbsp;

### 可以交互使用

Bootstrap 本身的設計是**每個元件都獨立使用**，造成你沒辦法更好地呈獻你所要的，

而 TocasUI 則是在這點上**強化了交互使用**，例如：你可以在「卡片（card）」樣式中插入一個「導覽列（menu）」。

&nbsp;

### 沒有隨意的動畫

Google 提出了 [Material Design](https://wcc723.gitbooks.io/google_design_translate/content/)，他們有一套如何讓使用者感到更討喜的元件動畫，

在 TocasUI 中，**你不會看到一下淡入，一下飛出的動畫**。

&nbsp;

### 沒有濫用的樣式

在 Bootstrap 中，許多人喜歡使用 `.hidden-*`，這樣就會自動在手機版本上自動隱藏：

```html
<div class="col-md-4">
    <div class="hidden-xs">Foo</div>
    <div class="hidden-md">bar!</div>
</div>
<div class="hidden-xs"> Hello! </div>
```

而 TocasUI 希望你遵循著「**不要有濫用的樣式**」，因此你只能在 CSS 樣式中規定什麼時候該隱藏，

放心，TocasUI 也提供了 `rwd()` 函式，讓你更加方便整理響應式的所有設計。
