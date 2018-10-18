#

* Accordion
* Breadcrumb
* Button
* Calendar
* Card
* Carousel
* Checkbox
* Comment
* Container
* Conversation
* Dimmer
* Divider
* Dropdown
* Embed
* Feed
* Flag
* Form
* Grid
* Header
* Icon
* Image
* Input
* Item
* Label
* List
* Loader
* Menu
* Message
* Modal
* Pane
* Placeholder
* Popup
* Progress
* Quote
* Rating
* Segment
* Slate
* Snackbar
* Statistic
* Step
* Tab
* Table
* Topic
* Validation
* Window

## 命名

除了你不曉得怎麼實踐的程式外，其次最難的不外乎就是「命名」。通常使用其他的介面框架都不會有如此的規範，但我們在這裡希望你能夠遵循 Tocas UI 的命名精神，來讓頁面上的樣式名稱不再那麼混亂。

### 以大駝峰式命名法為主

HTML 中的元素唯一識別名稱與類別都以大駝峰式命名法（CamelCase）來命名，猶如 Vue 和 React 都那樣般地能讓一個元素看起來更像元件。

```html
<!-- ✖ 別這樣 -->
<div id="search-form"></div>

<!-- ✓ 請這麼做 -->
<div id="SearchForm"></div>
```

### 以元件的思維命名類別

試圖把一個會重複使用的類別名稱當作元件來命名，例如置頂的留言應該叫做 `PinnedComment`（被釘選的留言）而不是單純的 `TopComment`（最頂的留言）。也別試著使用 `pinned`（訂選的），因為這可能會與 Tocas UI 的命名相互衝突。

```html
<!-- ✖ 別這樣 -->
<div class="ts comments">
    <div class="pinned comment"></div>
    <div class="pinned comment"></div>
    <div class="pinned comment"></div>
</div>

<!-- ✓ 請這麼做 -->
<div class="ts comments">
    <div class="PinnedComment comment"></div>
    <div class="PinnedComment comment"></div>
    <div class="PinnedComment comment"></div>
</div>
```

### 語意而不是顏色

頁面上不應該充滿一堆顏色，請記住一點：「當所有事情都被凸顯，所有事情都將顯得不重要」。為此，Tocas UI 中也沒有顏色樣式，因為語意才是最重要的。將顏色以語意命名，能夠限制你所使用的方式、避免濫用且導向正軌。

透過「負面的」、「警告的」、甚至是「移除按鈕」來命名顏色，而不是「紅色」、「黃色」，這令你能夠替換樣式佈景的時候而不會因為改了顏色卻繼續使用像「黃色」這種制式名稱而有所不符。所以比起 `GreenButton`（綠色的按鈕）來說，你更該用上 `SubmitButton`（送出的按鈕）。

```html
<!-- ✖ 別這樣 -->
<button class="RedButton ts button"></button>
<button class="GreenButton ts button"></button>

<!-- ✓ 請這麼做 -->
<button class="DeleteButton ts button"></button>
<button class="SubmitButton ts button"></button>
```

### 不要重複聲明

當元素是某個合集（如：清單、選單、導航列）的項目時，沒有必要重新聲明這個項目屬於誰，這能夠大幅度減少 HTML 的重複與混濁度。

```html
<!-- ✖ 別這樣 -->
<div class="ts menu menu-lg">
    <div class="menu-item menu-active"></div>
    <div class="menu-item"></div>
    <div class="menu-item"></div>
</div>

<!-- ✓ 請這麼做 -->
<div class="ts large menu">
    <div class="active item"></div>
    <div class="item"></div>
    <div class="item"></div>
</div>
```

## 元素

```html
<!-- ✖ 別這樣 -->
<div class="ts-grid">
    <div class="grid-column">
        <!-- ... -->
    </div>
</div>

<!-- ✓ 請這麼做 -->
<div class="ts grid">
    <div class="column">
        <!-- ... -->
    </div>
</div>
```

## 修飾子

### 修飾語句不需要前輟

```html
<!-- ✖ 別這樣 -->
<button class="ts button-basic button-large button">
    <!-- ... -->
</button>

<!-- ✓ 請這麼做 -->
<button class="ts basic large button">
    <!-- ... -->
</button>
```

### 相關語句以 `-` 連接在一起

```html
<!-- ✖ 別這樣 -->
<div class="13 computer 6 mobile column">
    <!-- ... -->
</div>

<!-- ✓ 請這麼做 -->
<div class="13-computer 6-mobile column">
    <!-- ... -->
</div>
```




## JavaScript 元素

有時候你會為了專門給 jQuery 或者 JavaScript 而另外命名了像是 `js-reply-btn`，這通常是設計不良所導致的，但如果你真的沒辦法的話，在這裡我們則是建議和先前的命名方式一樣，但最前方加上減號。

```html
<!-- ✖ 別這樣 -->
<button class="-ReplyButton ts small button"></button>

<!-- ✓ 請這麼做 -->
<div class="ts grid">
    <div class="column">
        <!-- ... -->
    </div>
</div>
```



# 工具鏈

## Sass

Sass 是 Tocas UI 中的核心 CSS 預處理器，任何樣式都是從此而生。這些步驟的 Sass 有關教學來自於：https://askubuntu.com/questions/849057/how-to-install-libsass-on-ubuntu-16-04。

### 複製 `libsass`、`sassc` 與 `sass-spec` 倉庫

這些工具會複製到 `/usr/local/lib` 目錄來安裝給所有使用者使用。

```bash
cd /usr/local/lib/
sudo git clone https://github.com/sass/sassc.git --branch 3.4.2 --depth 1
sudo git clone https://github.com/sass/libsass.git --branch 3.4-stable --depth 1
sudo git clone https://github.com/sass/sass-spec.git --depth=1
```

由於 `/usr/local/lib` 目錄可能僅能透過 `root` 使用者讀寫，這種情況請使用 `sudo` 解決。

### 設置環境變數

這能夠正確地設置 `sassc` 所會使用到的 `SASS_LIBSASS_PATH` 路徑。

```bash
echo 'SASS_LIBSASS_PATH="/usr/local/lib/libsass"' | sudo tee -a /etc/environment
```

接著重新套用環境變數檔案。

```bash
source /etc/environment
```

### 建置 `libsass`

你需要先建置 `libsass` 函式庫，當你正為於 `/usr/local/lib` 目錄時，可以執行下列指令達成。

```bash
sudo make -C libsass
```

### 建置並安裝 `sassc`

當上個步驟完成且仍位於 `/usr/local/lib` 目錄時，透過下列指令建置 `sassc`。

```bash
sudo make -C sassc
```

這將會在 `sassc/bin/` 目錄中產生一個 `sassc` 二進制執行檔案。現在透過下列指令來讓此執行檔案能夠在任何地方使用。

```bash
sudo make -C sassc install
```

到這裡已經完成了。試著在任何地方使用 `sassc` 指令來看是否奏效。

## Go

Go 是執行 Wellington 與編譯 Tocas UI 文件最重要的程式語言，其特性為輕量同時也有著更快的效能與多工執行緒特色。這篇教學來自於：https://medium.com/@RidhamTarpara/install-go-1-11-on-ubuntu-18-04-16-04-lts-8c098c503c5f

### 更新本地套件

在使用 Go 之前做足準備，透過下列指令更新本地的所有套件。

```
sudo apt-get update
sudo apt-get -y upgrade
```

### 下載 Go 檔案

透過下列指令會進入暫存目錄並且下載 Go 的 1.11 版本。

```
cd /tmp
wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
```

### 解壓縮並轉移 Go 檔案

當下載完成之後就能夠解壓縮該檔案至目前的暫存目錄，並且透過遞迴複製來將整個資料夾搬移到 `/usr/local/go`。

```
sudo tar -xvf go1.11.linux-amd64.tar.gz
sudo cp -r go /usr/local/go
sudo rm -rf go
```

在複製後透過 `rm` 移除原本位於暫存目錄的 `go` 資料夾。

### 配置環境變數

以下列指令來將環境變數指向家目錄與 Go 所擺放的目錄來讓你有辦法從終端機的任何地方使用 `go` 指令。

```
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```

更改完環境變數之後，透過下列指令直接套用其變更。如此一來就不需要重新啟動整個終端機。

```
source ~/.profile
```

接著在任何地方使用 `go` 指令來看看是否已經安裝完畢且可供使用。

## Wellington

Wellington 是一套採用 `go-libsass` 的 Sass 協助編譯器，這能夠以夠快的效能轉譯 Sass 檔案，同時也比起 `sassc` 還要來的多功能與支援檔案監聽自動轉譯。

### 安裝 `wt`

這需要至少 Go 1.3.1+ 版本的支援，在 Go 安裝完畢後執行下列指令可以直接從 GitHub 取得 Wellington 並且轉譯成可供執行的二進制執行檔案。

```
go get -u github.com/wellington/wellington/wt
```

接著在任何地方使用 `wt` 指令來看看是否已經成功安裝，若無法找到該指令，可能是因為 `PATH` 環境變數路徑設置並沒有指向到 Go 的二進制資料夾位置。

## CoffeeScript

在 Tocas UI 中，所有模組都是透過 CoffeeScript 撰寫而成。這是一個簡易化但卻強大的 JavaScript 轉譯語言，在[正體中文 CoffeeScript 網站](https://coffeescript.tw/)中有著更詳細的講解。

### 安裝 Node.js 與 `npm`

這兩個是執行 CoffeeScript 不可缺的 Node.js 程式語言核心與其套件管理器，透過下列指令執行。

```
sudo apt-get install nodejs npm
```

### 安裝 `coffeescript`

在 `npm` 安裝完畢後，就能夠透過該套件管理系統安裝我們所需要的 `coffeescript` 程式。

```
sudo npm install -g coffeescript
```

安裝完成後，透過 `coffee` 指令來在任何地方使用 CoffeeScript。

## Pug

在 Tocas UI 的測試元件中，所採用的是簡化的 HTML 格式：Pug。而這在即時測試元件渲染時將會被用上。

### 安裝 `pug`

透過上述說明所安裝的 `npm` 套件管理程式來安裝 Pug。

```bash
sudo npm install -g pug
```

在安裝完畢後，透過 `pug` 來在任何目錄下執行檢查其指令是否可用。