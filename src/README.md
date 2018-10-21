#

## 編譯指令

```bash
coffee -c ./src/tocas.dev.coffee
coffee -c -w -o ./dist ./src/javascript
wt watch src/tocas.sass -b dist/ -s compressed
sass --watch --indented ../tocas.sass:../../dist/tocas.css
go build ./main.go && ./main
```

## 工具鏈

### CoffeeScript

在 Tocas UI 中，所有模組都是透過 CoffeeScript 撰寫而成。這是一個簡易化但卻強大的 JavaScript 轉譯語言，在[正體中文 CoffeeScript 網站](https://coffeescript.tw/)中有著更詳細的講解。

#### 安裝 Node.js 與 `npm`

這兩個是執行 CoffeeScript 不可缺的 Node.js 程式語言核心與其套件管理器，透過下列指令執行。

```bash
sudo apt-get install nodejs npm
```

#### 安裝 `coffeescript`

在 `npm` 安裝完畢後，就能夠透過該套件管理系統安裝我們所需要的 `coffeescript` 程式。

```bash
sudo npm install -g coffeescript
```

安裝完成後，透過 `coffee` 指令來在任何地方使用 CoffeeScript。

### Sass

Sass 是 Tocas UI 中的核心 CSS 預處理器，任何樣式都是從此而生。這些步驟的 Sass 有關教學來自於：[https://askubuntu.com/questions/849057/how-to-install-libsass-on-ubuntu-16-04](https://askubuntu.com/questions/849057/how-to-install-libsass-on-ubuntu-16-04)。

#### 複製 `libsass`、`sassc` 與 `sass-spec` 倉庫

這些工具會複製到 `/usr/local/lib` 目錄來安裝給所有使用者使用。

```bash
cd /usr/local/lib/
sudo git clone https://github.com/sass/sassc.git --branch 3.4.2 --depth 1
sudo git clone https://github.com/sass/libsass.git --branch 3.4-stable --depth 1
sudo git clone https://github.com/sass/sass-spec.git --depth=1
```

由於 `/usr/local/lib` 目錄可能僅能透過 `root` 使用者讀寫，這種情況請使用 `sudo` 解決。

#### 設置環境變數

這能夠正確地設置 `sassc` 所會使用到的 `SASS_LIBSASS_PATH` 路徑。

```bash
echo 'SASS_LIBSASS_PATH="/usr/local/lib/libsass"' | sudo tee -a /etc/environment
```

接著重新套用環境變數檔案。

```bash
source /etc/environment
```

#### 建置 `libsass`

你需要先建置 `libsass` 函式庫，當你正為於 `/usr/local/lib` 目錄時，可以執行下列指令達成。

```bash
sudo make -C libsass
```

#### 建置並安裝 `sassc`

當上個步驟完成且仍位於 `/usr/local/lib` 目錄時，透過下列指令建置 `sassc`。

```bash
sudo make -C sassc
```

這將會在 `sassc/bin/` 目錄中產生一個 `sassc` 二進制執行檔案。現在透過下列指令來讓此執行檔案能夠在任何地方使用。

```bash
sudo make -C sassc install
```

到這裡已經完成了。試著在任何地方使用 `sassc` 指令來看是否奏效。

#### 安裝 `dart-sass`

透過 `npm` 套件管理器安裝令一個基礎且必須的官方 Sass 執行時態。

```bash
npm install -g sass
```

試著在任何地方使用 `sass` 指令來看是否奏效。


### Go

Go 是執行 Wellington 與編譯 Tocas UI 文件最重要的程式語言，其特性為輕量同時也有著更快的效能與多工執行緒特色。這篇教學來自於：[https://medium.com/@RidhamTarpara/install-go-1-11-on-ubuntu-18-04-16-04-lts-8c098c503c5f](https://medium.com/@RidhamTarpara/install-go-1-11-on-ubuntu-18-04-16-04-lts-8c098c503c5f)

#### 更新本地套件

在使用 Go 之前做足準備，透過下列指令更新本地的所有套件。

```bash
sudo apt-get update
sudo apt-get -y upgrade
```

#### 下載 Go 檔案

透過下列指令會進入暫存目錄並且下載 Go 的 1.11 版本。

```bash
cd /tmp
wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz
```

#### 解壓縮並轉移 Go 檔案

當下載完成之後就能夠解壓縮該檔案至目前的暫存目錄，並且透過遞迴複製來將整個資料夾搬移到 `/usr/local/go`。

```bash
sudo tar -xvf go1.11.linux-amd64.tar.gz
sudo cp -r go /usr/local/go
sudo rm -rf go
```

在複製後透過 `rm` 移除原本位於暫存目錄的 `go` 資料夾。

#### 配置環境變數

以下列指令來將環境變數指向家目錄與 Go 所擺放的目錄來讓你有辦法從終端機的任何地方使用 `go` 指令。

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```

更改完環境變數之後，透過下列指令直接套用其變更。如此一來就不需要重新啟動整個終端機。

```bash
source ~/.profile
```

接著在任何地方使用 `go` 指令來看看是否已經安裝完畢且可供使用。

### Wellington

Wellington 是一套採用 `go-libsass` 的 Sass 協助編譯器，這能夠以夠快的效能轉譯 Sass 檔案，同時也比起 `sassc` 還要來的多功能與支援檔案監聽自動轉譯。

#### 安裝 `wt`

這需要至少 Go 1.3.1+ 版本的支援，在 Go 安裝完畢後執行下列指令可以直接從 GitHub 取得 Wellington 並且轉譯成可供執行的二進制執行檔案。

```bash
go get -u github.com/wellington/wellington/wt
```

接著在任何地方使用 `wt` 指令來看看是否已經成功安裝，若無法找到該指令，可能是因為 `PATH` 環境變數路徑設置並沒有指向到 Go 的二進制資料夾位置。



### Pug

在 Tocas UI 的測試元件中，所採用的是簡化的 HTML 格式：Pug。而這在即時測試元件渲染時將會被用上。

#### 安裝 `pug`

透過上述說明所安裝的 `npm` 套件管理程式來安裝 Pug。

```bash
sudo npm install -g pug
```

在安裝完畢後，透過 `pug` 來在任何目錄下執行檢查其指令是否可用。