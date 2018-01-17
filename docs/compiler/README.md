# Docs Compiler

這是用來將文件轉譯成 HTML 靜態文件的編譯器套件。

## 主要結構

這是此套件的運作結構。

```js
compiler
├── compiler.go         // 編譯器主體
├── parser.go           // 結構解析器
├── preparser.go        // 開頭結構解析器
├── transpiler.go       // 文件結構轉譯器
└── watcher.go          // 檔案監聽器
```

## 使用方法

```bash
# 安裝 Go。
brew install go

# 進入此專案目錄。
cd tocasui/docs/compiler

# 以 Go 編譯此套件。
go build

# 在相同目錄下執行編譯後的二進制檔案。
# 這會自動編譯所有文件並結束程式。
./compiler

# 傳入 `-w` 參數可以持續監聽所有文件變更，並即時編譯文件產生結果。
./compiler -w
```