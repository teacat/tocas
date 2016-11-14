var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'


export default
{
    header:
    {
        title   : '片段',
        subTitle:
        `
            碎片化的文字聚集地。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>片段通常可以拿來包裝文章內容，</p>
                <p>但他不適合獨立當作一個卡片使用。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '片段具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '片段',
            description: `一個最基本的片段。`,
            link       : 'segment'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <p>烈日高照，前方的道路什麼都看不見，</p>
    <p>「很高興能和你見面。」一個細微的聲音好似那邊傳來，</p>
    <p>明明不清楚前方的事物，卻感覺自己正在邁向的是一個新世界。</p>
</div>`,
            mark: 'segment'
        },
        {
            type       : small,
            title      : '抬舉',
            description: `片段可以加深陰影，看起來像被抬舉，或是浮在空中。`,
            link       : 'secondary'
        },
        {
            type: 'example',
            code: `<div class="ts raised segment">
    <p>在最糟糕的事情發生之前，</p>
    <p>我儘可能地想找出原因，</p>
    <p>原來是 — 自己。</p>
</div>`,
            mark: 'raised'
        },
        {
            type       : small,
            title      : '語意',
            description: `片段也具有語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary segment">
    <p>主要語意。</p>
</div>
<div class="ts info segment">
    <p>提醒語意。</p>
</div>
<div class="ts warning segment">
    <p>警告語意。</p>
</div>`,
            mark: 'primary, info, warning'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `片段也可以帶有肯定或否定的語氣。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive segment">
    <p>正面語意。</p>
</div>
<div class="ts negative segment">
    <p>否定語意。</p>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '反色和語意',
            description: `片段的語意可以更為明顯，甚至是反色地。`,
            link       : 'inverted-emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts inverted primary segment">
    <p>主要語意。</p>
</div>
<div class="ts inverted info segment">
    <p>提醒語意。</p>
</div>
<div class="ts inverted warning segment">
    <p>警告語意。</p>
</div>
<div class="ts inverted positive segment">
    <p>正面語意。</p>
</div>
<div class="ts inverted negative segment">
    <p>否定語意。</p>
</div>
<div class="ts inverted segment">
    <p>反色語意。</p>
</div>`,
            mark: 'inverted primary, inverted info, inverted warning, inverted positive, inverted negative, inverted'
        },
        {
            type       : small,
            title      : '發音方式',
            description: `片段可以有不同的發音方式來強調或是以清淡地方式來描繪。`,
            link       : 'pronounce'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <p>我是一般的片段。</p>
</div>
<div class="ts secondary segment">
    <p>我是次要發音方式的片段。</p>
</div>
<div class="ts tertiary segment">
    <p>我是其次發音方式的片段。</p>
</div>`,
            mark: 'secondary, tertiary'
        },
        {
            type       : normal,
            title      : '群組',
            description: '可以聚集多個片段為一體。',
            link       : false
        },
        {
            type       : small,
            title      : '片段群組',
            description: `片段可以組合成一個群組。`,
            link       : 'segments'
        },
        {
            type: 'example',
            code: `<div class="ts segments">
    <div class="ts segment">任何人皆自由且平等。</div>
    <div class="ts segment">莫忘初衷。</div>
    <div class="ts segment">永遠不放棄。</div>
    <div class="ts segment">為全民、大眾所設計、運作並傾聽。</div>
</div>`,
            mark: 'segments'
        },
        {
            type       : tiny,
            title      : '群組和語意',
            description: `群組中的片段也可以具有語意。`
        },
        {
            type: 'example',
            code: `<div class="ts segments">
    <div class="ts primary segment">任何人皆自由且平等。</div>
    <div class="ts info segment">莫忘初衷。</div>
    <div class="ts warning segment">永遠不放棄。</div>
    <div class="ts positive segment">為全民、大眾所設計、運作並傾聽。</div>
</div>`,
            mark: 'primary, info, warning, positive'
        },
        {
            type       : tiny,
            title      : '不同地發音語氣',
            description: `群組中的片段也可以用不同的語氣發音。`
        },
        {
            type: 'example',
            code: `<div class="ts segments">
    <div class="ts segment">任何人皆自由且平等。</div>
    <div class="ts secondary segment">莫忘初衷。</div>
    <div class="ts tertiary segment">永遠不放棄。</div>
</div>`,
            mark: 'primary, info, warning, positive'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '片段可以處於不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已停用',
            description: `淡化片段，用以顯示這個片段不再可用。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts disabled segment">
    <p>那傢伙不常說話，但是從她的言行舉止中，</p>
    <p>好像有什麼是能被發現的。</p>
</div>`,
            mark: 'disabled'
        },
        {
            type       : small,
            title      : '讀取中',
            description: `片段可以顯示一個正在讀取的圖示。`,
            link       : 'loading'
        },
        {
            type: 'example',
            code: `<div class="ts loading segment">
    <p>月月，搭拉安！。</p>
    <p>月月，搭拉安！。</p>
    <p>月月，搭拉安！。</p>
</div>`,
            mark: 'loading'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '片段可以有不同的外觀點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '增加內距',
            description: `片段的內距可以更大。`,
            link       : 'padded'
        },
        {
            type: 'example',
            code: `<div class="ts segment">一般片段。</div>
<div class="ts padded segment">增加內距的片段。</div>
<div class="ts very padded segment">非常內距的片段。</div>`,
            mark: 'very padded, padded'
        },
        {
            type       : small,
            title      : '縮減內距',
            description: `你可以移除所有內距、或水平和垂直內距。`,
            link       : 'fitted'
        },
        {
            type: 'example',
            code: `<div class="ts vertically fitted segment">這個片段沒有垂直內距。</div>
<div class="ts fitted segment">這個片段沒有內距。</div>
<div class="ts horizontally fitted segment">這個片段沒有水平內距。</div>`,
            mark: 'fitted, horizontally fitted, vertically fitted'
        },
        {
            type       : small,
            title      : '輕巧版',
            description: `片段的寬度以內容為主。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<div class="ts compact segment">
    月月，搭拉安！
</div>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '浮動清理',
            description: `片段可以帶有 <span class="ts horizontal label">clear: both;</span> 的樣式用來整理內部的浮動元素。`,
            link       : 'clearing'
        },
        {
            type: 'example',
            code: `<div class="ts clearing segment">
    <button class="ts right floated button">浮動按鈕</button>
</div>`,
            mark: 'clearing'
        },
        {
            type       : small,
            title      : '流動',
            description: `片段可以是流動寬度並移除相關圓角用以貼齊螢幕左右。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts fluid segment">
   這個片段適合用來貼齊容器左右邊。
</div>`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '文字對齊',
            description: `片段的文字對齊可以改變。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts left aligned segment">
   這段文字是置左對齊。
</div>
<div class="ts center aligned segment">
   這段文字是置中對齊。
</div>
<div class="ts right aligned segment">
   這段文字是置右對齊。
</div>`,
            mark: 'left aligned, center aligned, right aligned'
        },
        {
            type       : small,
            title      : '平面化',
            description: `片段可以是平面化，不具有陰影的。`,
            link       : 'flatted'
        },
        {
            type: 'example',
            code: `<div class="ts flatted segment">
   這個片段是平的。
</div>`,
            mark: 'flatted'
        },
        {
            type       : small,
            title      : '無框線',
            description: `片段可以沒有框線。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<div class="ts borderless segment">
   這個片段沒有框線。
</div>`,
            mark: 'borderless'
        },
        {
            type       : small,
            title      : '浮動',
            description: `片段可以向左或向右浮動。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<div class="ts left floated segment">
    <p>我向左浮動。</p>
</div>
<div class="ts right floated segment">
    <p>我向右浮動。</p>
</div>`,
            mark: 'left floated, right floated'
        },
        {
            type       : small,
            title      : '基本',
            description: `片段可以是只有基本結構的。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic segment">
    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
</div>`,
            mark: 'basic'
        },
    ]
}