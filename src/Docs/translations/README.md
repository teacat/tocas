# Translations

翻譯文件。

## 結構

```js
translations
├── zh-tw
│  ├── components    // 元件文字
│  ├── views         // 單頁文字
│  └── zh-tw.yml     // 語系資訊與文字
└── en-us            // ...
```

## 文件格式

每單個元件的文件皆由 `.yml` 格式作為基礎。

```yml
Title      : 按鈕
Description: 一個重要的按鈕，我們將它視為核彈按鈕般，精心設計和呵護。

Outline: |
  按鈕具有多種樣式和語意，請注意的是，語意和顏色不同，請不要為了要新增紅色按鈕，就建立一個「負面」按鈕。
  請務必遵循 CSS 樣式中的含意。

Definitions:
  - Title      : 種類
    Description: 一個按鈕具有多個不同的種類。
    Sections   :
      - Title      : 按鈕
        Description: 一個正常的按鈕。
        HTML       : |
          <button class="ts [[button]]">按鈕</button>
```

### 特殊格式

在 Tocas UI 中有三個特殊標記：

* `[[文字]]`：這會用來凸顯包覆的文字，很常用在需要特別標記重要樣式名稱（Class）的時候。
* `{{文字}}`：自動將包覆的文字轉換成相關連結，如 `{{segment}}` 將會被轉換成 `<a href="//tocas-ui.com/elements/segment">segment</a>`，這很常用在希望能將樣式名稱中的某元素加上相關連結時候。
* `!-文字-!`：這會將文字轉換成圖片，可用關鍵字有：`16:9`、`1:1`、`4:3`、`user`、`user2`、`user3`。

具體範例如下：

```yml
- Title      : 按鈕
  Description: 一個正常的按鈕。
  HTML       : |
      <button class="ts icon [[button]]">
          <i class="heart {{icon}}"></i>
      </button>
      <img src="!-user-!">
```

## Translating Note

The translation files are under the `client/docs/langages/` directory, find your own language and translate it :D. Here're the things that you should care about while translating the files.

1. Replace it with bullshit when it's bullshit.

   (When the words are not telling a story, replace it with your own bullshit.)

2. Translate it when the word has meaning.

   (Translate them when the words are telling something meaningful, or a tutorial.)

3. Don't hard-translate it when it's a "meme".

   (Try to replace the joke with the jokes which were borned in your country.)

4. The file format is based on YAML, be careful about the indents.

   (2 spaces for YAML, 4 spaces for the CSS, HTML, JavaScript in the YAML.)

5. Send the Pull Request when you're done with a chapter.

   (You don't have to finish it all to send the Pull Request, just send it whenever you want.)