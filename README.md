<p align="center">
  <img src="tocas-og.png"/>
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

8. 模塊**不需要 jQuery**（耶！）。

&nbsp;

## 安裝

透過 `bower` 安裝。

```
$ bower install tocas
```

透過 `git` 安裝最新（測試版）。

```
$ git clone https://github.com/TeaMeow/TocasUI.git
```

透過 `git` 安裝正式版。

```
$ git clone https://github.com/TeaMeow/TocasUI.git
$ git fetch --tags
$ git tag -l
> v1.0.0
$ git checkout tags/v1.0.0
```

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
