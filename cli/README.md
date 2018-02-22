# Tocas CLI

Tocas CLI 是一套能夠協助開發者與普通使用者自訂與客製化 Tocas UI 的工具。

## 主要結構

這是此建置工具的結構。

```js
cli
├── web
│   └── templates       // 文件模板檔案
├── init                // 初始化檔案
├── internal            // 內部程式
│   ├── assembler       //
│   ├── compiler
│   ├── compressor
│   ├── parser
│   ├── processor
│   ├── transpiler
│   └── watcher
└── main.go
```

## 使用方法

## 外部呼叫與非互動式執行

有些時候希望透過程式的 `Exec` 等函式來執行 Tocas CLI，這種時候可以用上下列程式參數並停用互動式執行。

