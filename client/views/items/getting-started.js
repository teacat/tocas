var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var expandedSource = 'expandedSource'

export default
{
    header:
    {
        title   : '從這開始',
        subTitle:
        `
            人生已經很無聊了，別讓你的網頁也再無聊下去
            <br>
            從這裡你將會知道如何開始一段新的網頁人生。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '前言介紹',
            description: 'Tocas UI 是一個基於 Semantic UI 的衍生分支，其傳承特色包括了獨具語意的寫法，同時也支援更彈性、多樣化的使用方式，並支援自動和手動響應式設計。'
        },
        {
            type             : normal,
            anchor           : 'include',
            title            : '引用檔案',
            description      : '你需要引用 Tocas UI 的檔案才能夠開始使用，這裡提供兩種方式讓你使用。',
            link             : false,
            expandableExample: false
        },
        {
            type       : small,
            title      : '透過線上 CDN',
            description:
            `
                這是項免費服務並且提供夠快的服務速度，這使你不需要下載 Tocas UI，只需要將下列標籤放置於 HTML 中的 <span class="ts horizontal label">&lt;head&gt; .. &lt;/head&gt;</span> 處即可，
                缺點是我們並不保證該伺服器會 100% 處於上線狀態。
            `,
            link             : 'cdn',
            expandableExample: false
        },
        {
            type: source,
            code: `<link rel="stylesheet" href="//cdn.rawgit.com/TeaMeow/TocasUI/master/dist/tocas.min.css">`
        },
        {
            type       : small,
            title      : '自行下載 Tocas UI',
            description:
            `
                你需要到 <a href="//github.com/TeaMeow/TocasUI">我們的 Github 下載 Tocas UI</a>，然後取出其中的 <span class="ts horizontal label">/dist</span> 資料夾，並像下面這樣引用 Tocas UI 檔案，如此的好處是你可以確保樣式不會因為遠端的伺服器離線而遺失。
            `,
            link             : 'manual-download',
            expandableExample: false
        },
        {
            type: source,
            code: `<link rel="stylesheet" href="tocas2.min.css">`
        },
        {
            type       : normal,
            anchor     : 'include',
            title      : '全域注意事項',
            description: '你需要注意你的 HTML 和設計上是否有達到這些要求。',
            link       : false
        },
        {
            type       : small,
            title      : '網頁字型',
            description:
            `
                Tocas UI 為了統一所有裝置的字型所以使用了 Google 的 Web Font 網頁字型 <strong>Noto Sans CJK</strong>，
                預設支援英文、日本語、韓文、簡體中文和正體中文共五種字型，
            `,
            link             : 'web-font',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'HTML 5 宣告',
            description:
            `
                請確定你有透過 <span class="ts horizontal label">&lt;!DOCTYPE HTML&gt;</span> 將網頁宣告成 HTML5。
            `,
            link             : 'html5',
            expandableExample: false
        },
        {
            type: source,
            code: `<!DOCTYPE HTML>
<html>
...
</html>`
        },
        {
            type       : small,
            title      : '響應式設計標籤',
            description:
            `
                Tocas UI 支援響應式設計，為此你需要新增下列一段的標籤在你的 HTML 來告訴行動裝置你的網頁支援響應式設計，
                利用這個標籤還可以降低並解決行動裝置對於網頁的點擊延遲，請將這段放置於 HTML 中的 <span class="ts horizontal label">&lt;head&gt; .. &lt;/head&gt;</span> 處。
            `,
            link             : 'rwd-meta',
            expandableExample: false
        },
        {
            type: source,
            code: `<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">`
        },
        {
            type       : small,
            title      : '原生標籤',
            description:
            `
                Tocas UI 能夠將瀏覽器多餘的樣式移除（如行動裝置按鈕按下時的藍色高光），這能夠讓使用上更像原生應用程式，其用法在 <span class="ts horizontal label">&lt;html&gt;</span> 標籤中宣告 <span class="ts horizontal label">data-ts-native</span> 即可。
            `,
            link             : 'ts-native',
            expandableExample: false
        },
        {
            type: source,
            code: `<html data-ts-native>
...
</html>`
        },
        {
            type       : normal,
            anchor     : 'compare',
            title      : '與其他框架比較',
            description: '這裡解釋著為什麼 Tocas UI 比起其他框架還要些卓越的部分。',
            link       : false
        },
        {
            type       : small,
            title      : 'Bootstrap v4',
            description:
            `
                Bootstrap 是一個十分常見的框架，但卻有個最為嚴重的問題，也是與 Tocas UI 所背馳的理念，就是太多雜亂的樣式名稱，並且不具有意義，
                像是這樣：<span class="ts horizontal label">m-l-1</span>、<span class="ts horizontal label">m-t-0</span>、<span class="ts horizontal label">p-x-2</span>、<span class="ts horizontal label">m-x-auto</span>、等，
                並不能夠一眼就看出這些樣式所具備的意義，相較之下 Tocas UI 的 <span class="ts horizontal label">small</span>、<span class="ts horizontal label">centered</span> 更具有意義。
                <br><br>
                此外，在 HTML 結構的部分 Bootstrap 常為了要補足某些缺陷或排列而新增過多不必要的結構，而 Tocas UI 則沒有這方面的問題。在元件的部分 Tocas UI 也較多元化並更具彈性。
            `,
            link             : 'bootstrap4',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'Semantic UI',
            description:
            `
                Semantic UI 即是 Tocas UI 的衍生來源，雖然 Semantic UI 具備自訂主題功能，但要改變主題你必須自行手動編譯，會這樣做的人少之又少，
                預設的 Semantic UI 主題看起來十分地沈重並仰賴過多地白色和黑色，這個問題在 Tocas UI 則有所改善。

                <br><br>

                在元件的部分 Semantic UI 過度依賴非原生元件（如下拉式輸入欄位），Tocas UI 在這部分則保留並美化了原生的元件，而不是另外做一個。
                Tocas UI 還勝過 Semantic UI 一個優點，那就是元件更具有自訂性，舉例來說你可以讓具有陰影的卡片「扁平化」，或是其他更多外觀上的變動。
            `,
            link             : 'semantic-ui',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'Amaze UI',
            description:
            `
                Amaze UI 在外觀上較為生硬，和 Bootstrap 一樣不具有語意並擁有 <span class="ts horizontal label">am-</span> 的類別前輟，樣式和元件也過於死板不具彈性，還有一些非直覺的動畫，例如「按鈕」按下時的緩慢感，
                Tocas UI 讓按鈕和回饋充滿動感，不會讓使用者感到遲鈍，並讓元件多樣化，外觀上也看起來更為簡約。
            `,
            link             : 'amaze-ui',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'Kule Lazy',
            description:
            `
                Kule Lazy 在一些結構上使用的是舊型的樣式，Tocas UI 則採用最新並具彈性的 Flexbox，在外觀的配色和陰影也比起 Kule Lazy 還要更加地輕盈，不會令人感到沈重，
                除此之外 Kule Lazy 的命名方式也和 Bootstrap 有著一樣的問題，且還不只如此， Kule Lazy 在用詞上也較為獨特使人不容易區分和上手，
                Tocas UI 在這方面則以直覺的方式稱呼元件讓人不感到困惑。
            `,
            link             : 'kule-lazy',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'Foundation',
            description:
            `
            Foundation 在外觀上較為生硬，過多的方形設計，按鈕也不具有回饋力，令人按下時感到鈍感，並且在元件樣式上過度依賴標籤選擇器，
            這將使得你在自訂部分元件時會有所衝突，上述的所有問題都有在 Tocas UI 獲得改善。
            `,
            link             : 'foundation',
            expandableExample: false
        },
        {
            type       : small,
            title      : 'Tachyons',
            description:
            `
            Tachyons 並沒有「元件觀念」，這意味著你將需要透過 Tachyons 內建的輔助樣式自行建立需要的元件，Tachyons 在樣式命名上有著與 Bootstrap 一樣厭垢並且更難以令人捉摸的問題，
            如 <span class="ts horizontal label">mr3</span> 但其實是 <span class="ts horizontal label">margin-right: 1rem;</span>，
            並且在元素上使用過多的樣式如：<span class="ts horizontal label">fw6 f3 f2-ns lh-title mt0 mb3</span>，這些都將導致未來整合有所困難，
            同時也意味著當你需要重複使用元件時，你的原始碼大小也會急劇地增加。
            `,
            link             : 'foundation',
            expandableExample: false
        },
        {
            type       : normal,
            title      : '基本語意',
            description: 'Tocas UI 以更有意義的方式來命名類別名稱，就像是你直接稱呼這個元素一樣地親切。',
            link       : false
        },
        {
            type       : small,
            title      : '語氣渲染',
            description:
            `
                在 Tocas UI 中我們並不以「顏色」稱呼我們對元件的著色，
                我們以「語氣」來表示這個元件的外觀，
                例如「正面的」、「負面的」、「主要的」等。<br><br>
                這麼做的好處是在更改主題顏色時，可以直接更換「正面的」顏色，
                設想一下你將一個按鈕命名成「綠色」，當你要統一更改綠色按鈕為紅色時，
                不就要將所有頁面上的「綠色」重新打成「紅色」嗎？
            `,
            link: 'emphasis'
        },
        {
            type: example,
            code: `<p><strong>主流語氣</strong></p>
<button class="ts button">預設語氣</button>
<button class="ts primary button">主要語氣</button>
<button class="ts info button">提示語氣</button>
<button class="ts warning button">警告語氣</button>
<br><br>
<p><strong>抉擇語氣</strong></p>
<button class="ts positive button">肯定語氣</button>
<button class="ts negative button">否定語氣</button>
<br><br>
<p><strong>副語氣</strong></p>
<button class="ts inverted button">相反語氣</button>`,
            mark  : 'primary, info, warning, positive, negative, inverted',
            remove: '<p><strong>主流語氣</strong></p>, <p><strong>抉擇語氣</strong></p>, <p><strong>副語氣</strong></p>, <br><br>',
        },
        {
            type       : small,
            title      : '發音方式',
            description: '在部分的元件上你可以有不同的「發音方式」，實際上就是像「次要」，「較不重要」這樣的感覺。',
            link       : 'pronounce'
        },
        {
            type: 'example',
            code: `<div class="ts segment">一般發音方式</div>
<div class="ts secondary segment">次要發音方式</div>
<div class="ts tertiary segment">其次發音方式</div>`,
            mark  : 'secondary, tertiary'
        },
        {
            type       : small,
            title      : '外觀尺寸',
            description: '除了語氣外，還支援八個尺寸，這比起其他的常見框架還要來得更多！也能夠讓你在設計外觀上更加地靈活。',
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<button class="ts mini button">迷你</button>
<button class="ts tiny button">微小</button>
<button class="ts small button">小型</button>
<button class="ts medium button">中型</button>
<button class="ts large button">大型</button>
<button class="ts big button">稍大</button>
<button class="ts huge button">巨大</button>
<button class="ts massive button">重量級</button>`,
            mark  : 'mini, tiny, small, medium, large, big, huge, massive'
        },
        {
            type       : normal,
            anchor     : 'naming',
            title      : '命名規範',
            description:
            `
            除了你不曉得怎麼實踐的程式外，其次最難的不外乎就是「命名」。
            通常使用其他的介面框架都不會有如此的規範。
            但我們在這裡希望你能夠遵循 Tocas UI 的命名精神，
            來讓頁面上的樣式名稱不再那麼混亂。
            `,
            link: false
        },
        {
            type             : small,
            title            : '區塊／容器',
            description      : '區塊的樣式名稱不應有任何符號，或者是大小寫，在這裡僅用空白區隔。',
            link             : 'naming-block',
            expandableExample: false
        },
        {
            type             : tiny,
            title            : 'HTML',
            description      : '請像下方這樣做，你不應該用 <span class="ts label">block-container</span> 或 <span class="ts label">blockContainer</span> 命名他們。',
            expandableExample: false
        },
        {
            type: source,
            code: '<div class="block container"></div>'
        },
        {
            type             : tiny,
            title            : 'CSS',
            description      : '像這樣簡單的用法，就像是你直接稱呼元素那樣地輕切。',
            expandableExample: false
        },
        {
            type: source,
            code: `.container {}
.block.container {}`

        },
        {
            type             : small,
            title            : '元素',
            description      : '元素的樣式名稱和區塊的命名方式相同。',
            link             : 'naming-elements',
            expandableExample: false
        },
        {
            type             : tiny,
            title            : 'HTML',
            description      : '請像下方這樣做，你不應該用 <span class="ts label">single-block</span> 或 <span class="ts label">singleBlock</span> 命名他們。',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="block container">
    <div class="single block"></div>
    <div class="single block"></div>
    <div class="single block"></div>
</div>`
        },
        {
            type             : tiny,
            title            : 'CSS',
            description      : '用法也是相當地簡單，像這樣。',
            expandableExample: false
        },
        {
            type: source,
            code: `.block.container .single.block {}`
        },
        {
            type       : small,
            title      : '修飾詞',
            description:
            `
                修飾詞用來讓一個元素、區塊變成指定顏色，或者套用特殊樣式，<br>
                而修飾詞的樣式名稱和先前的區塊與元素命名方式皆相同，但請注意樣式名稱應保有「語義」。<br>
                例如：小的（small）不可以被縮寫成（sm），同時如果有兩個單字仍以空白隔開，例如：向左浮動（left floated）。
            `,
            link             : 'naming-decoration',
            expandableExample: false
        },
        {
            type             : tiny,
            title            : 'HTML',
            description      : '請像下方這樣做，你不應該用 <span class="ts label">is-large</span> 或 <span class="ts label">container-lg</span> 命名他們。',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="large container">
    <div class="small picutre"></div>
    <button class="left floated button"></button>
</div>`
        },
        {
            type             : tiny,
            title            : 'CSS',
            description      : '在較複雜的情況下你可能會遇到衝突，這個時候你可以使用較特別的選擇器。',
            expandableExample: false
        },
        {
            type: source,
            code: `.large.container
{
    height: 320px;
}
.large.container .small.picture
{
    height: 32px; width: 32px;
}
.large.container [class*="left floated"].button
{
    float: left;
}`
        },
        {
            type       : small,
            title      : '給 JavaScript 或其他用途',
            description:
            `
                有時候你會為了專門給 jQuery 或者 JavaScript 而另外命名了像是 <span class="ts label">js-reply-btn</span>，<br>
                這通常是設計不良所導致的，但如果你真的沒辦法的話，<br>
                在這裡我們則是建議和先前的命名方式一樣，但最前方加上減號。
            `,
            link             : 'naming-javascript',
            expandableExample: false
        },
        {
            type             : tiny,
            title            : 'HTML',
            description      : '請像下方這樣做，你不應該用 <span class="ts label">js-main-reply-button</span> 或 <span class="ts label">js-btn</span> 命名他們。',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="comments">
    <div class="single comment">
        <button class="large -main -reply button"></button>
    </div>
</div>`
        },
        {
            type            : tiny,
            title           : 'CSS',
            description     : '這種時候，你不應該賦予那些具減號的樣式一個樣式，所以基本上你只會有這些樣式。',
            expandableExample: false
        },
        {
            type: source,
            code: `.comments {}
.comments .single.comment {}
.comments .single.comment .large.button {}`
        },
        {
            type             : tiny,
            title            : 'JavaScript',
            description      : '現在你可以像這樣選擇專門給 JavaScript 用的按鈕了。',
            expandableExample: false
        },
        {
            type: source,
            code: `$("-main.-reply.button").show()`
        },
    ]
}