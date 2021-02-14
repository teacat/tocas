# 響應式設計（Responsive Design）

在 Tocas 4 開始，響應式將由網站規模作為命名，這意味著設計網站介面時，將不會以「該呈現於何種裝置」作為執行目標，而是「該出現在何種介面規模上」。

在 Tocas 2 中最為被採用的有三種尺寸，分別是：手機、平板、標準電腦。而這三種名稱將會被重新命名為：最小化（Minimal）、緊湊（Compact）、最大化（Maximal）。

|   樣式名稱   	|   裝置稱呼   	| 當螢幕尺寸 .. 出現 	|
|:------------:	|:------------:	|:------------------:	|
|    minimal    |   最小化介面 	|       < 768px      	|
|    compact   	|   緊湊介面   	|       > 768px      	|
|    standard  	|   標準介面   	|      -                |
|    maximal   	|   最大化介面 	|       > 1200px      	|

*標準介面（Standard）目前沒有加入的計畫，仍在考慮。*

這些名稱的定義簡單敘述如下：

* 最小化介面會有最小限度的功能與介面可供使用者操作，這就和行動裝置的版本相同。
* 緊湊介面是處於最小化與標準介面之間的一個地帶，通常會有額外的附加功能可輔助使用者操作。
* 最大化介面則是擁有完整功能的介面。

## 索引

* [舊有問題](#舊有問題)
  * [裝置界線模糊](#裝置界線模糊)
  * [尺寸不該被作為命名](#尺寸不該被作為命名)
  * [絕對尺寸](#絕對尺寸)
* [其他觀點](#其他觀點)
* [使用方式](#使用方式)
  * [或者條件](#或者條件)

## 舊有問題

在早期的 Tocas 2 中，響應式設計的條件中斷點（Breakpoint）是以裝置名稱為主，如：Mobile（手機）、Tablet（平板）、Computer（電腦）。在 Tocas 2.3.3 中，這些裝置可以很簡單的被區分如下：

|   樣式名稱   	|   裝置稱呼   	| 當螢幕尺寸 .. 出現 	|
|:------------:	|:------------:	|:------------------:	|
|    mobile    	|   行動裝置   	|       < 767px      	|
|    tablet    	|   平板裝置   	|       > 767px      	|
|   computer   	| 小型電腦螢幕 	|       > 992px      	|
| large device 	|   大型裝置   	|       > 992px      	|
| large screen 	|   大型螢幕   	|      > 1200px      	|

如此直覺的命名方式也易於開發者在設計網頁時決定哪些內容要呈現給哪些對象裝置。

### 裝置界線模糊

原先的 [Semantic UI](https://semantic-ui.com/) 命名方式在 2016 年後期由於裝置尺寸的界線變得十分模糊，令這種命名方式使用上會造成混淆以及難以假想。

例如 [Rico Sta](https://ricostacruz.com/til/css-media-query-breakpoints) 曾提及 iPad Pro 12" 是台平板裝置，但在上述的表格卻會對到 `computer`（電腦）媒體查詢條件語句而非 `tablet`（平板）；Samsung Note 是台手機，但卻會符合平板裝置的螢幕尺寸條件。

在這種情況下會更難以針對正確的目標裝置進行介面設計。

### 尺寸不該被作為命名

如果 `mobile` 這種命名方式不是正確的答案，那麼通常都會走向 `small`（小型裝置）和 `medium`（中型裝置）這種命名方式，而這正是 [Bootstrap](https://getbootstrap.com/) 的作法。

但這些命名會造成不小的疑慮；iPad Pro 10" 算是中型裝置還是大型裝置？iPhone SE 算是「最小型裝置」（Extra Small）嗎？這些說詞都太過於主觀而難以被定義。

### 絕對尺寸

在 [Rico Sta](https://ricostacruz.com/) 所寫的 [我該使用什麼樣的媒體查詢條件語句？（外文）](https://ricostacruz.com/til/css-media-query-breakpoints) 文章最後提及了查詢語句可以透過絕對尺寸來作為命名，例如：`viewport-7` 表示針對 `768px` 螢幕大小的裝置。

這種方式清晰且明確，但這種名稱在 Tocas 會顯得過於冗長而沒有被採用。

## 其他觀點

在 [Landscape mode for mobile, tablet breakpoint and tablet-only breakpoint](https://github.com/jgthms/bulma/issues/1420#issuecomment-382581752) 問題中 [lukepighetti](https://github.com/lukepighetti)
 發表了自己對響應式斷點的看法，他認為其斷點應該至少要有四個且分別對應下列裝置：

* 最小化（Minimal）- 直向手機
* 緊湊（Compact）- 橫向手機、直向平板
* 標準（Standard）- 橫向平板、筆電（這意味著在橫向平板中不會有類似[漢堡選單](https://medium.com/@g801109g51/%E6%BC%A2%E5%A0%A1-hamburger-%E9%81%B8%E5%96%AE-%E6%98%AF%E7%A6%8F%E4%BA%A6%E6%98%AF%E7%A6%8D-cb61cf491830)的不符合介面尺寸設計）
* 最大化（Maximal）- 標準電腦與螢幕

## 使用方式

Tocas 4 開始，將能夠在所有元件或是容器中使用響應式設計的輔助語詞，這個語詞從 `_`（底線）作為前輟。當使用響應式設計輔助語詞時，該元素將會成為特定介面的元素，這意味著其他介面規模將看不到該元素（等同：僅限於）。

```html
<button class="ts _standard button">按鈕</button>
```

### 或者條件

如果希望一個元素可以出現在多個介面規模，那麼就同時定義兩個響應式輔助語詞。例如：`_maximal _compact` 同時使用則表示該元素不會出現在最小化介面上。

```html
<button class="ts _maximal _compact button">按鈕</button>
```