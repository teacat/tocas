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
        title   : '聚焦看板（已廢棄）',
        subTitle:
        `
            現在是時候閃耀了。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <strong>注意！這個元素已經被<a href="/elements/slate">板岩</a>取代。</strong>
                <p>聚焦看板不應該被拿來當作擺放很多元素的容器，</p>
                <p>這應該只被拿來當作頁頭，用來當作擺放標題或少許元件的地方。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '一個聚焦看板具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '聚焦看板',
            description: `一個正常的聚焦看板。`,
            link       : 'jumbotron'
        },
        {
            type: 'example',
            code: `<div class="ts jumbotron">
    <h2 class="ts header">搜尋結果
        <div class="sub header">總共有 325 個搜尋結果，費時 0.021 秒。</div>
    </h2>
    <br>
    <button class="ts info button">查看更多</button>
</div>`,
            mark  : 'jumbotron'
        },
        {
            type       : small,
            title      : '基本語氣',
            description: `用來讓一個聚焦看板擁有不同的意思，但卻不帶有肯定或否定語氣。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary jumbotron">
    <h2 class="ts header">主要看板
        <div class="sub header">用來告訴使用者一個主要的資訊。</div>
    </h2>
</div>
<div class="ts info jumbotron">
    <h2 class="ts header">資訊看板
        <div class="sub header">用於顯示一些資訊。</div>
    </h2>
</div>
<div class="ts warning jumbotron">
    <h2 class="ts header">警告看板
        <div class="sub header">警告一下使用者的看板。</div>
    </h2>
</div>
<div class="ts inverted jumbotron">
    <h2 class="ts header">相反色看板
        <div class="sub header">一個相反色的看板。</div>
    </h2>
</div>`,
            mark  : 'primary, info, warning, inverted'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `讓聚焦看板帶有肯定或否定的意思。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive jumbotron">
    <h2 class="ts header">肯定看板
        <div class="sub header">一個帶有正面消息的看板。</div>
    </h2>
</div>
<div class="ts negative jumbotron">
    <h2 class="ts header">否定看板
        <div class="sub header">帶有非正面消息的資訊看板。</div>
    </h2>
</div>`,
            mark  : 'positive, negative'
        },
        {
            type       : small,
            title      : '基本',
            description: `讓聚焦看板只帶有基本的架構，移除框線和陰影。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic jumbotron">
    <h3 class="ts header">基本架構
        <div class="sub header">一個僅有基本架構的聚焦看板。</div>
    </h3>
</div>`,
            mark  : 'basic'
        },
        {
            type       : small,
            title      : '發音方式',
            description: `你可以透過更沉重地語氣來表示聚焦看板。`,
            link       : 'pronounce'
        },
        {
            type: 'example',
            code: `<div class="ts secondary jumbotron">
    <h3 class="ts header">次要發音方式
        <div class="sub header">這個聚焦看板比較沒有那麼重要。</div>
    </h3>
</div>
<div class="ts tertiary jumbotron">
    <h3 class="ts header">其次發音方式
        <div class="sub header">這個聚焦看板比起其他都還要沒有那麼重要。</div>
    </h3>
</div>`,
            mark  : 'secondary, tertiary'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '你可以隨時透過樣式類別切換一個聚焦看板的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已停用',
            description: `顯示這個看板已經被停用了。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts disabled jumbotron">
    <h3 class="ts header">別看這裡
        <div class="sub header">我已經不重要了。</div>
    </h3>
</div>`,
            mark  : 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '你可以更改聚焦看板的位置、大小、或者形狀。',
            link       : false
        },
        {
            type       : small,
            title      : '增加內距',
            description: `你可以增加聚焦看板的內距。`,
            link       : 'padded'
        },
        {
            type: 'example',
            code: `<div class="ts padded jumbotron">
    <h3 class="ts header">增加內距
        <div class="sub header">這可以讓你的聚焦看板看起來不那麼壅擠。</div>
    </h3>
</div>
<div class="ts very padded jumbotron">
    <h3 class="ts header">非常內距
        <div class="sub header">可以，這很內距。</div>
    </h3>
</div>
<div class="ts extra padded jumbotron">
    <h3 class="ts header">超級內距
        <div class="sub header">如果你還不滿足的話還有這樣增加內距地方式。</div>
    </h3>
</div>`,
            mark  : 'extra padded, very padded, padded'
        },
        {
            type       : small,
            title      : '縮減',
            description: `你可以移除所有內距、或水平和垂直內距。`,
            link       : 'fitted'
        },
        {
            type: 'example',
            code: `<div class="ts fitted jumbotron">
    <h3 class="ts header">縮減全部
        <div class="sub header">這將使的你的聚焦看板完全沒有內距。</div>
    </h3>
</div>
<div class="ts horizontally fitted jumbotron">
    <h3 class="ts header">水平縮減
        <div class="sub header">聚焦看板的左右內距將會消失。</div>
    </h3>
</div>
<div class="ts vertically fitted jumbotron">
    <h3 class="ts header">垂直縮減
        <div class="sub header">這樣做的話上下內距將會消失。</div>
    </h3>
</div>`,
            mark  : 'extra padded, very padded, padded'
        },
        {
            type       : small,
            title      : '無框線',
            description: `聚焦看板可以不需要框線。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<div class="ts borderless jumbotron">
    <h3 class="ts header">無框線看板
        <div class="sub header">這個看板沒有框線。</div>
    </h3>
</div>`,
            mark  : 'borderless'
        },
        {
            type       : small,
            title      : '文字對齊',
            description: `聚焦看板內的文字可以靠左、右、甚至置中。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts right aligned jumbotron">
    <h3 class="ts header">靠右置齊
        <div class="sub header">這個看板的文字靠右。</div>
    </h3>
</div>
<div class="ts left aligned jumbotron">
    <h3 class="ts header">靠左置齊
        <div class="sub header">這個看板的文字靠左。</div>
    </h3>
</div>
<div class="ts center aligned jumbotron">
    <h3 class="ts header">置中對齊
        <div class="sub header">這個看板的文字置中。</div>
    </h3>
</div>`,
            mark  : 'right aligned, left aligned, center aligned'
        },
        {
            type       : small,
            title      : '流動',
            description: `這種聚焦看板適合用在需要貼齊容器左右的時候，因為沒有圓角。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts fluid jumbotron">
    <h3 class="ts header">流動看板
        <div class="sub header">這個看板沒有圓角，適合貼齊左右邊。</div>
    </h3>
</div>`,
            mark  : 'fluid'
        },
    ]
}