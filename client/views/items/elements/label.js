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
        title   : '標籤',
        subTitle: 
        `
            那個 5 元，然後這個——無價。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description: 
            `
                <p>標籤會在沒有內容的時候自動隱藏，</p>
                <p>這也很適合用來當作一個狀態指標，對於一個色盲使用者而言，</p>
                <p>標籤不應以顏色來引導他人，而是應該以形狀來敘述狀態，</p>
                <p>例如：在線（圓形）、暫離（正方形）、離線（三角形）。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '標籤具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的標籤。`,
            link       : 'label'
        },
        {
            type: 'example',
            code: `<div class="ts label">
    <i class="gift icon"></i>
    標籤
</div>`,
            mark  : 'label'
        },
        {
            type       : small,
            title      : '圖片',
            description: `一個帶有圖片的標籤。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<div class="ts image label">
    <img src="${imgPlaceholderUser}">Yami Odymel</div>
<div class="ts image label">
    <img src="${imgPlaceholderUser2}">Xiaoan</div>
<div class="ts image label">
    <img src="${imgPlaceholderUser3}">卡莉絲
    <div class="detail">實況主</div>
</div>`,
            mark  : 'image'
        },
        {
            type       : small,
            title      : '語氣',
            description: `標籤也可以擁有不同的語氣。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts circular primary label">9</div>
<div class="ts circular info label">14</div>
<div class="ts warning label">7</div>
<div class="ts positive label">13</div>
<div class="ts inverted label">1998</div>`,
            mark: 'primary, info, warning, positive, inverted'
        },
        {
            type       : small,
            title      : '吸附',
            description: `吸附在某個容器的角落或是內容中。`,
            link       : 'attached'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <p>&nbsp;</p>
    <p>伊繁星最高協議，所有隸屬伊繁星旗下已發佈或是正於計劃中之產品皆須遵守此協議。</p>
    <p>&nbsp;</p>
    <div class="ts top right attached label">右上標籤</div>
    <div class="ts top left attached label">左上標籤</div>
    <div class="ts bottom right attached label">右下標籤</div>
    <div class="ts bottom left attached label">左下標籤</div>
</div>`,
            mark  : 'top, right, left, bottom, attached',
            remove: '<p>&nbsp;</p>'
        },
        {
            type       : small,
            title      : '水平',
            description: `標籤可以是水平用來符合附近文字用的。`,
            link       : 'horizontal'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal label">這個標籤</div> 很適合和文字放在一起。`,
            mark: 'horizontal'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '圖片具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '浮起附著',
            description: `標籤可以浮起並附著在某個元素的角落。`,
            link       : 'floating'
        },
        {
            type: 'example',
            code: `<button class="ts primary button">已讀所有
    <div class="ts floating circular label">7</div>
</button>
<button class="ts warning button">檢視
    <div class="ts floating label">13</div>
</button>`,
            mark  : 'floating'
        },
        {
            type       : normal,
            title      : '內容',
            description: '標籤的內容具有不同的性質。',
            link       : false
        },
        {
            type       : small,
            title      : '詳細資料',
            description: `用以詮釋標籤的內容。`,
            link       : 'detail'
        },
        {
            type: 'example',
            code: `<div class="ts label">新郵件
    <div class="detail">689</div>
</div>`,
            mark: 'detail'
        },
        {
            type       : small,
            title      : '圖示',
            description: `在標籤內放置一些點綴或是具有功能的圖示。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts left icon label">
    <i class="mail outline icon"></i>未讀郵件
    <div class="detail">142</div>
</div>
<div class="ts right icon label">吳雨藍
    <i class="close icon"></i>
</div>`,
            mark: 'icon'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '標籤具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '基本結構',
            description: `標籤可以只留下基本的結構。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic label">Yami Odymel</div>`,
            mark: 'basic'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `標籤可以有不同的大小尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini label">迷你</div>
<div class="ts tiny label">微小</div>
<div class="ts small label">小型</div>
<div class="ts label">預設</div>
<div class="ts medium label">適中</div>
<div class="ts large label">大型</div>
<div class="ts big label">巨大</div>
<div class="ts huge label">超大</div>
<div class="ts massive label">重量級</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
        {
            type       : small,
            title      : '浮動',
            description: `標籤可以靠左或靠右浮動。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<div class="ts left floated label">靠左浮動</div>
<div class="ts right floated label">靠右浮動</div>`,
            mark: 'left floated, right floated'
        },
        {
            type       : small,
            title      : '縮減',
            description: `標籤內距可以縮減。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<div class="ts compact label">1,624</div>
<div class="ts compact primary label">315</div>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '圓形',
            description: `將標籤變成圓形。`,
            link       : 'circular'
        },
        {
            type: 'example',
            code: `<div class="ts circular label">1</div>
<div class="ts circular label">99+</div>
<div class="ts circular label">1234567</div>`,
            mark: 'circular'
        },
        {
            type       : small,
            title      : '空的',
            description: `一個空的標籤。`,
            link       : 'empty'
        },
        {
            type: 'example',
            code: `<div class="ts empty circular label"></div>
<div class="ts empty triangle label"></div>
<div class="ts empty square label"></div>
<div class="ts empty circular primary label"></div>
<div class="ts empty circular info label"></div>
<div class="ts empty square positive label"></div>
<div class="ts empty square negative label"></div>
<div class="ts empty triangle info label"></div>
<div class="ts empty triangle warning label"></div>`,
            mark: 'empty'
        }
    ]
}