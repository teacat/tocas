var normal             = 'normal'
var large              = 'large'
var small              = 'small'
var tiny               = 'tiny'
var source             = 'source'
var example            = 'example'
var imgPlaceholderUser = require('../../images/image_placeholder_user.png')

export default
{
    header:
    {
        title   : '標題',
        subTitle:
        `
            那數公分的大小落差，就足以形容事態的嚴重。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '標題具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本標題',
            description: `基於 <span class="ts label">h1</span> 到 <span class="ts label">h6</span> 的標題，這個標題的大小依照頁面基準文字大小為主。`,
            link       : 'h1-h6'
        },
        {
            type: 'example',
            code: `<h1 class="ts header">標題 1</h1>
<h2 class="ts header">標題 2</h2>
<h3 class="ts header">標題 3</h3>
<h4 class="ts header">標題 4</h4>
<h5 class="ts header">標題 5</h5>
<h6 class="ts header">標題 6</h6>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '內容標題',
            description: `這種標題是基於父容器的文字大小為基準點，因此在不同文字大小的容器中，標題的大小也會有所不同。`,
            link       : 'content-header'
        },
        {
            type: 'example',
            code: `<div class="ts massive header">重量級</div>
<div class="ts huge header">巨大</div>
<div class="ts big header">大的</div>
<div class="ts large header">大型</div>
<div class="ts medium header">中等</div>
<div class="ts small header">小型</div>
<div class="ts tiny header">微小</div>
<div class="ts mini header">迷你</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive, header'
        },
        {
            type       : small,
            title      : '副標題',
            description: `比正常標題還要稍微小一號的副標題。`,
            link       : 'sub-header'
        },
        {
            type: 'example',
            code: `<h1 class="ts sub header">副標題 1</h1>
<h2 class="ts sub header">副標題 2</h2>
<h3 class="ts sub header">副標題 3</h3>
<h4 class="ts sub header">副標題 4</h4>
<h5 class="ts sub header">副標題 5</h5>
<h6 class="ts sub header">副標題 6</h6>

<div class="ts massive sub header">重量級副標題</div>
<div class="ts huge sub header">巨大副標題</div>
<div class="ts big sub header">大的副標題</div>
<div class="ts large sub header">大型副標題</div>
<div class="ts medium sub header">中等副標題</div>
<div class="ts small sub header">小型副標題</div>
<div class="ts tiny sub header">微小副標題</div>
<div class="ts mini sub header">迷你副標題</div>`,
            mark: 'sub header'
        },
        {
            type       : small,
            title      : '圖示標題',
            description: `標題可以帶有圖示和部分說明。`,
            link       : 'icon-header'
        },
        {
            type: 'example',
            code: `<h3 class="ts center aligned icon header">
    <i class="gift icon"></i>挑選禮物
    <div class="sub header">為你的女朋友，喔不，你沒有女朋友。</div>
</h3>`,
            mark: 'icon header, content'
        },
        {
            type       : normal,
            title      : '內容',
            description: '一些用以擺放在標題內不同的內容元素。',
            link       : false
        },
        {
            type       : small,
            title      : '標題中的副標題',
            description: `用來詮釋主標題的副標題。`,
            link       : 'sub-header-in-header'
        },
        {
            type: 'example',
            code: `<h4 class="ts header">大標題
    <div class="sub header">然後我是子標題。</div>
</h4>`,
            mark: 'sub header'
        },
        {
            type       : small,
            title      : '圖片',
            description: `標題中可以帶有圖片。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<h3 class="ts header">
    <img class="ts circular image" src="${imgPlaceholderUser}">
    帳號設定
</h3>`,
            mark: 'image'
        },
        {
            type       : small,
            title      : '圖示',
            description: `標題中也可以帶有圖示。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<h3 class="ts header">
    <i class="plug icon"></i>
    <div class="content">
        99.9% 上線時間保證
    </div>
</h3>
<h2 class="ts header">
    <i class="settings icon"></i>
    <div class="content">
        安全性設定
        <div class="sub header">管理好您的洨洨安，確保不受任何人詐騙。</div>
    </div>
</h2>`,
            mark: 'icon'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '你可以隨時透過樣式類別切換一個標題的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已停用',
            description: `用以顯示這個標題已經被停用。`,
            link       : 'sub-header-in-header'
        },
        {
            type: 'example',
            code: `<h3 class="ts disabled header">已停用標題</h3>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '你可以點綴標題的樣式。',
            link       : false
        },
        {
            type       : small,
            title      : '語氣',
            description: `標題也具有不同的語氣。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<h3 class="ts primary header">主要語氣</h3>
<h3 class="ts info header">提示語氣</h3>
<h3 class="ts warning header">警告語氣</h3>
<h3 class="ts positive header">正面語氣</h3>
<h3 class="ts negative header">否定語氣</h3>
<div class="ts inverted segment">
    <h3 class="ts inverted header">反色語氣</h3>
</div>`,
            mark: 'primary, info, warning, positive, negative, inverted'
        },
        {
            type       : small,
            title      : '分隔線',
            description: `每個標題都可以在底下新增分隔線。`,
            link       : 'dividing'
        },
        {
            type: 'example',
            code: `<h1 class="ts dividing header">標題 1</h1>
<h2 class="ts dividing header">標題 2</h2>
<h3 class="ts dividing header">標題 3</h3>
<h4 class="ts dividing header">標題 4</h4>
<h5 class="ts dividing header">標題 5</h5>
<h6 class="ts dividing header">標題 6</h6>`,
            mark: 'dividing'
        },
        {
            type       : small,
            title      : '對齊',
            description: `標題可以置中、置左或者置右。`,
            link       : 'alligned'
        },
        {
            type: 'example',
            code: `<h5 class="ts left aligned header">我置左</h5>
<h5 class="ts center aligned header">我置中</h5>
<h5 class="ts right aligned header">我置障</h5>`,
            mark: 'left aligned, center aligned, right aligned'
        },
        {
            type       : small,
            title      : '浮動',
            description: `標題也可以是浮動對齊的。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<h5 class="ts left floated header">向左浮動</h5>
<h5 class="ts right floated header">向右浮動</h5>`,
            mark: 'left floated, right floated'
        },
        {
            type       : small,
            title      : '較細的',
            description: `標題可以略細一些。`,
            link       : 'thinner'
        },
        {
            type: 'example',
            code: `<h3 class="ts thinner header">細一點的標題</h3>`,
            mark: 'thinner'
        },
        {
            type       : small,
            title      : '較粗的',
            description: `標題也可以略粗一些。`,
            link       : 'bolder'
        },
        {
            type: 'example',
            code: `<h3 class="ts bolder header">粗略的標題</h3>`,
            mark: 'bolder'
        },
    ]
}