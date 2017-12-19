# 統計數據

<p>統計數據可以在數據下顯示一個說明標籤，用來敘述該數字的含意。</p>

## 種類

統計數據具有不同的種類。

### 基本

一個最基本的統計數據。

```html
<div class="ts [[statistic]]">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
```

### 標籤於上

標籤也可以在統計數據的上方，你只需要變更順序。

```html
<div class="ts statistic">
    <div class="[[label]]">會員總數</div>
    <div class="value">999</div>
</div>
```

### 語意

統計數據也可以帶有不同的語意。

```html
<div class="ts [[primary]] statistic">
    <div class="value">1,463</div>
    <div class="label">下載次數</div>
</div>
<div class="ts [[info]] statistic">
    <div class="value">361</div>
    <div class="label">觀看次數</div>
</div>
<div class="ts [[warning]] statistic">
    <div class="value">72%</div>
    <div class="label">負載頻率</div>
</div>
```

### 肯定和否定

統計數據可以是肯定或是否定的。

```html
<div class="ts [[positive]] statistic">
    <div class="value">301+</div>
    <div class="label">正面</div>
</div>
<div class="ts [[negative]] statistic">
    <div class="value">13</div>
    <div class="label">負面</div>
</div>
```

### 反色

統計數據可以是反色的，用以呈現在不同的背景上。

```html
<div class="ts inverted {{segment}}">
    <div class="ts [[inverted]] [[primary]] statistic">
        <div class="value">1,463</div>
        <div class="label">下載次數</div>
    </div>
    <div class="ts [[inverted]] [[info]] statistic">
        <div class="value">361</div>
        <div class="label">觀看次數</div>
    </div>
    <div class="ts [[inverted]] [[warning]] statistic">
        <div class="value">72%</div>
        <div class="label">負載頻率</div>
    </div>
    <div class="ts [[inverted]] [[positive]] statistic">
        <div class="value">301+</div>
        <div class="label">正面</div>
    </div>
    <div class="ts [[inverted]] [[negative]] statistic">
        <div class="value">13</div>
        <div class="label">負面</div>
    </div>
</div>
```

## 內容

統計數據中包有不同性質的內容。

### 數值

包含主要統計數據的數字、數值，其中也可以帶有圖示、文字或圖片。

```html
<div class="ts statistics">
    <div class="statistic">
        <div class="[[value]]">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="text [[value]]">
            三千六百<br>
            八十萬
        </div>
        <div class="label">檢視次數</div>
    </div>
    <div class="statistic">
        <div class="[[value]]">
            <i class="flag {{icon}}"></i> 32
        </div>
        <div class="label">已佔據</div>
    </div>
    <div class="statistic">
        <div class="[[value]]">
            <img class="ts right spaced circular {{image}}" src="!-user-!">
            Infinity-S
        </div>
        <div class="label">人氣最高</div>
    </div>
</div>
```

### 異動

顯示與上次的差距、異動數值。

```html
<div class="ts statistic">
    <div class="value">
        892
        <div class="[[increment]]">32</div>
    </div>
    <div class="label">觀看次數</div>
</div>
<div class="ts statistic">
    <div class="value">
        18
        <div class="[[decrement]]">32</div>
    </div>
    <div class="label">收藏次數</div>
</div>
<div class="ts statistic">
    <div class="value">
        1,725
        <div class="[[fluctuation]]">163+</div>
    </div>
    <div class="label">購買次數</div>
</div>
```

### 標籤

用來告訴使用者這個數據的含義。

```html
<div class="ts statistic">
    <div class="value">315</div>
    <div class="[[label]]">點擊次數</div>
</div>
```

## 外觀

你也可以更改統計數據的外觀。

### 水平統計數據

讓統計數據以水平的方式擺放。

```html
<div class="ts [[horizontal]] statistic">
    <div class="value">315</div>
    <div class="label">點擊次數</div>
</div>
<div class="ts [[horizontal]] statistics">
    <div class="statistic">
        <div class="value">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">916</div>
        <div class="label">檢視次數</div>
    </div>
</div>
```

### 分隔的

統計數據群組可以有分隔線劃分開每個統計項目。

```html
<div class="ts [[divided]] statistics">
    <div class="statistic">
        <div class="value">163</div>
        <div class="label">點擊數</div>
    </div>
    <div class="statistic">
        <div class="value">12</div>
        <div class="label">購買數</div>
    </div>
    <div class="statistic">
        <div class="value">2,847</div>
        <div class="label">評價數</div>
    </div>
</div>
```

### 均分寬度

統計數據的寬度可以平均劃分，從 <span class="ts horizontal label">one</span> 到 <span class="ts horizontal label">ten</span>。

```html
<div class="ts [[three]] statistics">
    <div class="statistic">
        <div class="value">1,463</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">361</div>
        <div class="label">觀看次數</div>
    </div>
    <div class="statistic">
        <div class="value">72%</div>
        <div class="label">負載頻率</div>
    </div>
</div>
```

### 流動寬度

如果你不想手動指定統計數據的寬度，你可以讓統計數據群組變成流動寬度，這會直接貼滿父容器的寬度並自動均分。

```html
<div class="ts [[fluid]] divided statistics">
    <div class="statistic">
        <div class="value">4,712</div>
        <div class="label">註冊人數</div>
    </div>
    <div class="statistic">
        <div class="value">1,394</div>
        <div class="label">昨日登入</div>
    </div>
</div>
```

### 垂直對齊

你可以變動統計數據中標籤的垂直對齊。

```html
<div class="ts horizontal statistic">
    <div class="value">4,126</div>
    <div class="[[top aligned]] label">置上對齊</div>
</div>
<div class="ts horizontal statistic">
    <div class="value">8,973</div>
    <div class="[[middle aligned]] label">置中對齊</div>
</div>
<div class="ts horizontal statistic">
    <div class="value">1,502</div>
    <div class="[[bottom aligned]] label">置下對齊</div>
</div>
```

### 水平對齊

統計數據的水平對齊是可以變更的，例如對齊左邊而不是中間。

```html
<div class="ts [[left aligned]] divided fluid statistics">
    <div class="statistic">
        <div class="value">8,651</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">958</div>
        <div class="label">觀看次數</div>
    </div>
    <div class="statistic">
        <div class="value">16%</div>
        <div class="label">負載頻率</div>
    </div>
</div>
```

### 浮動

統計數據可以是浮動靠左或靠右。

```html
<div class="ts segment">
    <div class="ts [[right floated]] statistic">
        <div class="value">
          2,204
        </div>
        <div class="label">
          觀看次數
        </div>
    </div>
    <p>Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque.</p>
    <div class="ts [[left floated]] statistic">
        <div class="value">
          2,204
        </div>
        <div class="label">
          觀看次數
        </div>
    </div>
    <p>Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu per, quas minimum postulant per id.</p>
</div>
```

### 尺寸

統計數據有不同的尺寸可供選擇。

```html
<div class="ts [[mini]] statistic">
    <div class="value">42,689</div>
    <div class="label">迷你尺寸</div>
</div>
<div class="ts [[tiny]] statistic">
    <div class="value">42,689</div>
    <div class="label">微小尺寸</div>
</div>
<div class="ts [[small]] statistic">
    <div class="value">42,689</div>
    <div class="label">小型尺寸</div>
</div>
<div class="ts [[medium]] statistic">
    <div class="value">42,689</div>
    <div class="label">一般尺寸</div>
</div>
<div class="ts [[large]] statistic">
    <div class="value">42,689</div>
    <div class="label">稍大尺寸</div>
</div>
<div class="ts [[big]] statistic">
    <div class="value">42,689</div>
    <div class="label">大型尺寸</div>
</div>
<div class="ts [[huge]] statistic">
    <div class="value">42,689</div>
    <div class="label">巨大尺寸</div>
</div>
<div class="ts [[massive]] statistic">
    <div class="value">42,689</div>
    <div class="label">重量級尺寸</div>
</div>
```

## 群組

你能夠將多個統計數據放入單個容器成為一個群組。

### 統計群組

一個最基本的統計數據群組。

```html
<div class="ts [[statistics]]">
    <div class="statistic">
        <div class="value">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">916</div>
        <div class="label">檢視次數</div>
    </div>
</div>
```

### 反色群組

你可以直接將統計群組設置為反色的，這樣就不需要替每個統計數據設置成反色。

```html
<div class="ts inverted {{segment}}">
    <div class="ts [[inverted]] statistics">
        <div class="statistic">
            <div class="value">1,948</div>
            <div class="label">已收藏</div>
        </div>
        <div class="statistic">
            <div class="value">625</div>
            <div class="label">已分享</div>
        </div>
    </div>
</div>
```

### 群組尺寸

統計群組可以擁有一個尺寸，省去替每個統計數據設置尺寸的困擾。

```html
<div class="ts [[large]] statistics">
    <div class="statistic">
        <div class="value">859</div>
        <div class="label">點擊次數</div>
    </div>
    <div class="statistic">
        <div class="value">8,182</div>
        <div class="label">已觸及</div>
    </div>
</div>
```