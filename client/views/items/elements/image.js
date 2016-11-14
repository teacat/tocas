var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var imgPlaceholderSquare = require('../../images/image_placeholder_1-1.png')
var imgPlaceholderWide   = require('../../images/image_placeholder_16-9.png')
var imgPlaceholderLegacy = require('../../images/image_placeholder_4-3.png')
var imgPlaceholderUser   = require('../../images/image_placeholder_user.png')
var imgPlaceholderUser2  = require('../../images/image_placeholder_user2.png')
var imgPlaceholderUser3  = require('../../images/image_placeholder_user3.png')

export default
{
    header:
    {
        title   : '圖片',
        subTitle:
        `
            搭拉，這看起來跟你本人不太像。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>圖片在不指定大小的情況下，</p>
                <p>預設最大至少可以填滿整個容器。</p>
            `,
        },
        {
            type       : normal,
            title      : '種類',
            description: '圖片具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的圖片。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<img class="ts small image" src="${imgPlaceholderLegacy}">`,
            mark: 'image'
        },
        {
            type       : small,
            title      : '圖片連結',
            description: `圖片也可以是被連結包覆住的。`,
            link       : 'image-link'
        },
        {
            type: 'example',
            code: `<a href="http://google.com" class="ts small image">
    <img src="${imgPlaceholderLegacy}">
</a>`,
            mark: 'image'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '圖片具有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '隱藏',
            description: `隱藏一個圖片。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<img class="ts hidden image" src="${imgPlaceholderLegacy}">`,
            mark: 'hidden'
        },
        {
            type       : small,
            title      : '已停用',
            description: `顯示一個圖片已經過時、不可用。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<img class="ts disabled small image" src="${imgPlaceholderLegacy}">`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '圖片具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '頭像',
            description: `頭像的大小會自動調整成比文字稍微大一些。`,
            link       : 'avatar'
        },
        {
            type: 'example',
            code: `<img class="ts avatar image" src="${imgPlaceholderSquare}">
<span>Yami Odymel</span>`,
            mark: 'avatar'
        },
        {
            type       : small,
            title      : '框線',
            description: `新增一個預設顏色的框線。`,
            link       : 'bordered'
        },
        {
            type: 'example',
            code: `<img class="ts small bordered image" src="${imgPlaceholderSquare}">`,
            mark: 'bordered'
        },
        {
            type       : small,
            title      : '流動',
            description: `會填滿整個容器的圖片。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<img class="ts fluid image" src="${imgPlaceholderLegacy}">`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '圓角',
            description: `會加一些少許的圓角在圖片角落。`,
            link       : 'rounded'
        },
        {
            type: 'example',
            code: `<img class="ts small rounded image" src="${imgPlaceholderLegacy}">`,
            mark: 'rounded'
        },
        {
            type       : small,
            title      : '圓型',
            description: `將圖片變成圓形。`,
            link       : 'circular'
        },
        {
            type: 'example',
            code: `<img class="ts small circular image" src="${imgPlaceholderSquare}">`,
            mark: 'circular'
        },
        {
            type       : small,
            title      : '垂直對齊',
            description: `將圖片對齊上、下或中間。`,
            link       : 'circular'
        },
        {
            type: 'example',
            code: `<img class="ts mini top aligned image" src="${imgPlaceholderSquare}">垂直置頂
<div class="ts divider"></div>
<img class="ts mini middle aligned image" src="${imgPlaceholderSquare}">垂直置中
<div class="ts divider"></div>
<img class="ts mini bottom aligned image" src="${imgPlaceholderSquare}">垂直置障`,
            mark: 'top aligned, middle aligned, bottom aligned'
        },
        {
            type       : small,
            title      : '水平置中',
            description: `將圖片水平置中。`,
            link       : 'centered'
        },
        {
            type: 'example',
            code: `<img class="ts small centered image" src="${imgPlaceholderSquare}">`,
            mark: 'centered'
        },
        {
            type       : small,
            title      : '帶空白',
            description: `新增一些空白在圖片的左右旁。`,
            link       : 'spaced'
        },
        {
            type: 'example',
            code: `亞凡芽 <img class="ts mini spaced image" src="${imgPlaceholderSquare}"> 是一個基於 PHP 的模板引擎， 很適合用在具有 MVC 架構的大型應用程式中，其中亞凡芽還支援了動態 CSS 名稱，你可以隨機命名類別名稱，
或者是將類別名稱轉換成 Emoji（表情符號），也可以將 JavaScript 檔案匯集成一個檔案。 Tocas 是一個基於 CSS3 的
<img class="ts mini spaced image" src="${imgPlaceholderSquare}"> 網頁介面框架， 以行動裝置為主，同時也支援自訂顏色，還有更具有語意的類別名稱。`,
            mark: 'spaced'
        },
        {
            type       : small,
            title      : '左右浮動',
            description: `讓圖片浮動置左或置右。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<img class="ts tiny left floated image" src="${imgPlaceholderSquare}">
<p>
    保障任何人的著作權，其中包括二次創作，二次創作僅可在原作者未聲明否決下進行發佈和創作， 在未經原作允許下衍生任何具有原作之內容，基於衍生理念與內容為判決要點，
    原作必須基於合理使用之理念提出移除、上訴任何非符合合理使用概念的衍生內容， 合理使用的理念如下： 使用目的及性質 其著重點在於內容是否有所轉化，如衍生創作另有新意，非僅複製原作內容。
    版權作品性質
    <img class="ts tiny right floated image" src="${imgPlaceholderSquare}"> 以真實、事實所闡述之作品較虛構作品來的能夠符合合理使用。 使用版權作品的多寡 引用少量的原創著作比起引用大量來要的符合合理使用，但倘若原創著作成為衍生著作之核心內容，
    即使少量的原創著作被引用，也較不可能符合合理使用之原則。 使用行為對於版權作品的市場或價值之影響 透過原創著作的內容而進行獲利並造成原創著作部分損害，較不符合合理使用之原則。
</p>`,
            mark: 'left floated, right floated'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `更改圖片的大小，大小從 <span class="ts horizontal label">mini</span> 到 <span class="ts horizontal label">massive</span>。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<img class="ts mini image" src="${imgPlaceholderSquare}">
<img class="ts tiny image" src="${imgPlaceholderSquare}">
<img class="ts small image" src="${imgPlaceholderSquare}">
<img class="ts medium image" src="${imgPlaceholderSquare}">`,
            mark: 'mini, tiny, small, medium'
        },
        {
            type       : normal,
            title      : '群組',
            description: '圖片可以是一個群組。',
            link       : false
        },
        {
            type       : small,
            title      : '尺寸',
            description: `群組內的圖片大小將會符合群組所設定的尺寸。`,
            link       : 'group-size'
        },
        {
            type: 'example',
            code: `<div class="ts tiny images">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
</div>`,
            mark: 'images'
        },
        {
            type       : small,
            title      : '網格的',
            description: `群組可以看起來是像是一個有網格結構。`,
            link       : 'celled',
            wip        : true
        },
        {
            type: 'example',
            code: `<div class="ts one celled images">
    <img src="${imgPlaceholderSquare}">
</div>
<br>
<div class="ts two celled images">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
</div>
<br>
<div class="ts three celled images">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
</div>
<br>
<div class="ts four celled images">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
</div>
<br>
<div class="ts five celled images">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
    <img src="${imgPlaceholderSquare}">
</div>`,
            mark  : 'celled, one, two, three, four, five',
            remove: '<br>'
        },
    ]
}