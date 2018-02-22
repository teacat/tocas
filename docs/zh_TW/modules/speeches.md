---
layout: single
---

# 對話

.ts.speeches

## 說明

對話可搭配卡片、片段來達成一個類似聊天室的樣式。

## 對話氣泡

氣泡有不同的樣式。

### 對話

一個最正常不過的對話氣泡。

```html
<div class="ts [[speeches]]">
  <div class="[[speech]]">
      <div class="content">早安，我的朋友！</div>
  </div>
</div>
```

### 右側對話

對話也可以是來自右邊的。

```html
<div class="ts speeches">
    <div class="[[right]] speech">
        <div class="content">早安，我的朋友！</div>
    </div>
</div>
```

### 語意

對話可以有不同的語意。

```html
<div class="ts speeches">
  <div class="[[primary]] speech">
      <div class="content">這是主要語氣的對話氣泡。</div>
  </div>
  <div class="[[info]] speech">
      <div class="content">這是資訊語氣的對話氣泡。</div>
  </div>
  <div class="[[warning]] speech">
      <div class="content">這是警告語氣的對話氣泡。</div>
  </div>
</div>
```

### 肯定和否定

對話可以是肯定或是否定意味。

```html
<div class="ts speeches">
    <div class="[[negative]] speech">
        <div class="content">不好了！這是帶有否定意味的對話！</div>
    </div>
    <div class="[[positive]] speech">
        <div class="content">讚啦！這是很肯定的對話氣泡。</div>
    </div>
</div>
```

### 發音方式

可以利用不同的發音方式來點綴訊息。

```html
<div class="ts speeches">
    <div class="[[secondary]] speech">
        <div class="content">這是次要發音方式，看起來顏色較深。</div>
    </div>
    <div class="[[tertiary]] speech">
        <div class="content">這是其次發音方式，比剛才的還要更深了一點點。</div>
    </div>
</div>
```

## 內容

對話氣泡的內部可以擺放不同的內容。

### 頭像

對話內容也可以具有頭像。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="[[avatar]]">
          <img src="!-user-!">
        </div>
        <div class="content">早安！</div>
    </div>
</div>
```

### 文字

用來呈現對話的主要文字內容，如果對話僅有文字而沒有別的元素，可以省略。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="content">我是純文字的對話內容。</div>
    </div>
    <div class="speech">
        <div class="content">
          <div class="author">Yami Odymel</div>
          <div class="[[text]]">這個對話內容結構較複雜，所以需要用註釋包起來。</div>
        </div>
    </div>
</div>
```

### 作者

對話內容可以帶有一個作者、訊息發布者的名稱。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="[[author]]">Yami Odymel</div>
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="text">大家好啊！</div>
        </div>
    </div>
</div>
```

#### 自由擺放作者名稱

作者名稱除了不只能夠擺在對話外，也可以和對話同行，或是放置於對話內。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="[[inline]] [[author]]">Yami Odymel</div>
            <div class="text">：嗨！早安。</div>
        </div>
    </div>
    <div class="speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="author">Haneda Shirone</div>
            <div class="text">囉哈！</div>
        </div>
    </div>
</div>
```

### 圖片

對話內容可以擺放一張圖片。

```html
<div class="ts speeches">
  <div class="speech">
      <div class="content">
          <div class="author">Yami Odymel</div>
          <div class="[[image]]">
              <img src="!-16:9-!">
          </div>
          <div class="text">前天去夏威夷旅行，怎樣？拍得不錯吧！。</div>
      </div>
  </div>
</div>
```

### 中繼資料

你可以在對話內容下方插入一些中繼資料。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="text">月月，搭拉安。</div>
            <div class="[[meta]]">
                <div class="item">12:33 PM</div>
                <div class="item">已讀</div>
            </div>
        </div>
    </div>
</div>
```

#### 帶點中繼資料

中繼資料可以有「子彈點」或是「中點」來做區隔。別忘記，你的中繼資料也可以像作者名稱那樣放置在對話氣泡的外面。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">這個訊息的中繼資料帶有子彈點。</div>
        <div class="[[bulleted]] [[meta]]">
            <div class="item">09:16 PM</div>
            <div class="item">已讀</div>
        </div>
    </div>
    <div class="speech">
          <div class="avatar">
              <img src="!-user-!">
          </div>
          <div class="content">這個則是中點的中繼資料。</div>
          <div class="[[middoted]] [[meta]]">
              <div class="item">03:54 AM</div>
              <div class="item">已傳送</div>
          </div>
    </div>
</div>
```

### 分隔線

透過分隔線元件，你能以此來當作兩個對話之間的分隔點。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="content">
            吻仔魚，這裡充滿了很多吻仔魚。
        </div>
    </div>
    <div class="[[ts horizontal divider]]">今天</div>
    <div class="right speech">
        <div class="content">
            喔，等一下，蛤？
        </div>
    </div>
</div>
```

### 引用

對話內可以插入一個引用元件。

```html
<div class="ts speeches">
    <div class="speech">
        <div class="content">
            <div class="text">
                <blockquote class="[[ts secondary quote]]">
                    Yami Odymel
                    <br>
                    看看我，這是引用元件欸！
                </blockquote>
                Tocas UI 的聊天室元件支援引用欸，真是太 Telegram 了。
            </div>
        </div>
    </div>
</div>
```

## 群組

多個對話氣泡可以被包覆成一個群組，避免重複的頭像並將對話串聯在一起。

### 群組

一個最基本的對話群組。

```html
<div class="ts speeches">
    <div class="[[group]]">
        <div class="speech">
            <div class="avatar">
                <img src="!-user-!">
            </div>
            <div class="content">
                <div class="author">Yami Odymel</div>
                <div class="text">這些對話氣泡組成了一個群組。</div>
            </div>
        </div>
        <div class="speech">
            <div class="avatar">
                <img src="!-user-!">
            </div>
            <div class="content">
                <div class="author">Yami Odymel</div>
                <div class="text">有些重複的內容會被隱藏，像是頭像、作者名稱、中繼資料。</div>
            </div>
        </div>
    </div>
</div>
```

### 右側群組

群組可以是向右對齊的。

```html
<div class="ts speeches">
    <div class="[[right]] group">
        <div class="speech">
            <div class="content">我是右側群組。</div>
        </div>
        <div class="speech">
            <div class="content">看起來很像是自己所發出的對話訊息。</div>
        </div>
    </div>
</div>
```

### 圓形群組

群組可以指定圓形樣式，這除了讓對話氣泡是圓形之外，還能夠看起來是一體的。

```html
<div class="ts speeches">
    <div class="[[circular]] group">
        <div class="speech">
            <div class="avatar">
                <img src="!-user-!">
            </div>
            <div class="content">這個對話氣泡除了是圓的以外，</div>
        </div>
        <div class="speech">
            <div class="avatar">
                <img src="!-user-!">
            </div>
            <div class="content">看起來也不會太突兀。</div>
        </div>
        <div class="speech">
            <div class="avatar">
                <img src="!-user-!">
            </div>
            <div class="content">就像 Facebook Messenger 那樣串連在一起。</div>
        </div>
    </div>
</div>
```

### 指標群組

同時你也能夠將群組也能夠看起來帶有指標，省去了在每個對話氣泡上設置指標樣式的麻煩。

```html
<div class="ts speeches">
    <div class="[[pointing]] group">
        <div class="speech">
            <div class="content">這是個指標對話氣泡群組。</div>
        </div>
        <div class="speech">
            <div class="content">但只有最後一個對話氣泡才會有三角形指標。</div>
        </div>
    </div>
</div>
```

## 外觀

對話有不同的外觀點綴。

### 無框線

對話氣泡可以看起來是沒有框線的。

```html
<div class="ts speeches">
    <div class="[[borderless]] speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="author">Yami Odymel</div>
            <div class="text">這個對話氣泡沒有框線，不覺得看起來好像有點寬敞了嗎？</div>
        </div>
    </div>
    <div class="[[borderless]] speech">
        <div class="avatar">
            <img src="!-user-!">
        </div>
        <div class="content">
            <div class="author">Haneda Shirone</div>
            <div class="text">嗯⋯⋯。</div>
        </div>
    </div>
</div>
```

### 帶指標的

對話氣泡可以看起來有個三角形指標。

```html
<div class="ts speeches">
    <div class="[[pointing]] speech">
        <div class="content">哇喔！看看這氣泡的左邊！</div>
    </div>
</div>
```

### 圓形

對話氣泡可以看起來是圓形的。

```html
<div class="ts speeches">
    <div class="[[circular]] speech">
        <div class="content">昨天你有看到彗星撞地球嗎？</div>
    </div>
</div>
```

### 尺寸

對話有不同的尺寸可供選擇。

```html
<div class="ts [[tiny]] speeches">
  <div class="speech">
      <div class="content">微小</div>
  </div>
</div>
<div class="ts [[small]] speeches">
  <div class="speech">
      <div class="content">小型</div>
  </div>
</div>
<div class="ts [[medium]] speeches">
  <div class="speech">
      <div class="content">適中</div>
  </div>
</div>
<div class="ts [[large]] speeches">
  <div class="speech">
      <div class="content">大型</div>
  </div>
</div>
<div class="ts [[big]] speeches">
  <div class="speech">
      <div class="content">大的</div>
  </div>
</div>
```