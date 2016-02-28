<p align="center">
  <img src="logo.png"/>
</p>
<p align="center">
  <i>Here comes another world.</i>
</p>

&nbsp;

<p align="center">
  <img src="http://i.imgur.com/WIICQyZ.png"/>
</p>

&nbsp;

## TocasUI

TocasUI 是基於 SASS 和 CSS3 的元件框架，可快速建立大型或小型網站的介面，

其用法與 Bootstrap 差異甚多，Tocas UI 以不雜亂，有意義為主。

**相關教學網站仍在製作中。**

&nbsp;

## 特色

1. 更簡潔，沒有像 Bootstrap 那樣**雜亂**的樣式名稱。（如：`.m-l-1`, `.p-x-2`, `.p-a-3`）

2. 以**意義**為樣式命名的主要精神。 

3. 以支援行動裝置為**優先**。

4. 更**加彈性的格線系統**，並達到 16 格線。 

5. 可自訂元件顏色，甚至**只需一行指令**。

6. 據有**回饋力**的動畫。

7. 元件之間可交互使用。

&nbsp;

## 範例

Tocas UI 的樣式命名方式來自於 Semantic UI 的精神，以意義為主。

```html
<!-- Tocas 大的 主要 按鈕 -->
<button class="ts big primary button"></button>
```

讓我們看看 Bootstrap 的樣式命名方式。

```html
<!-- 按鈕 按鈕-大的 按鈕-主要 -->
<button class="btn btn-lg btn-primary"></button>
```

&nbsp;

## 可自訂顏色、而且更簡單

<p align="center">
  <img src="http://i.imgur.com/78oACTY.png"/>
</p>

在 Bootstrap 中，你會需要為了更改顏色，而新增更多 CSS 來覆蓋原生設定，

而 TocasUI 中，**你只需要新增一行更換顏色的指令即可**。（而且 TocasUI 會自動為其配色。）

你隨時都可以變換元件的顏色，還可以為他們命名。

&nbsp;

## 不會因為顏色而命名

<p align="center">
  <img src="http://i.imgur.com/hm4w6ug.png"/>
</p>

假如你以 `.btn-green` 當作送出的按鈕，

日後若要更換成藍色，不就需要全部更換成 `.btn-blue` 了麼？

TocasUI 以「意義」命名：`positive negative info primary`，因此你只需要更換該意義的顏色即可。

&nbsp;

## 沒有雜亂的樣式，而且更短

<p align="center">
  <img src="http://i.imgur.com/tNwh3kZ.png"/>
</p>

Tocas UI 內建了許多**意義類別**，例如你正在建立一個選單，

加上 `.pointing` 就可以變成帶有指標的選單，諸如此類的類別。

&nbsp;

## 具有回饋力

<p align="center">
  <img src="http://i.imgur.com/YxKsaUk.gif"/>
</p>

以 Amaze UI 為例，他們的按鈕按下去具有**緩慢的動畫效果**，而不是「喀」的清脆。

<p align="center">
  <img src="http://imgur.com/8UrV6Bb.gif"/>
</p>

而 TocasUI 在按下去的時候，就是非常的**清脆**（毫無動畫效果）。

&nbsp;

## 元件可以交互使用

<p align="center">
  <img src="http://i.imgur.com/iKl8Z7A.png"/>
</p>

<p align="center">
  <img src="http://i.imgur.com/RYvH03X.png"/>
</p>

Bootstrap 本身的設計是**每個元件都獨立使用**，造成你**沒辦法更好地呈獻你所要的**，

而 TocasUI 則是在這點上**強化了交互使用**，

假設你將按鈕放在卡片中，Tocas UI **會自動讓按鈕更符合卡片樣式**。

&nbsp;

## 簡短，而且更有意義

讓我們展示一些更進階的用法，讓你清楚了解 Tocas UI 和 Bootstrap 之間的差異。

```html
<nav class="ts menu">
    <div class="header item">WebSiteName</div>
    <div class="item">Home</div>
    <div class="item">Page 1</div>
    <div class="item">Page 2</div>
    <div class="item">Page 3</div>
</nav>
```

而這是 Bootstrap。

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

&nbsp;
