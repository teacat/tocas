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
        title   : '分隔線',
        subTitle:
        `
            這裡開啟了另一個話題。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '分隔線具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的分隔線。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<p>我是微笑小安安，歡迎來到小安網站。</p>
<div class="ts divider"></div>
<p>你將會在這裡看見一個魔法師的日常生活，</p>
<p>沒錯，只要你能夠單身三十年，你也可以跟我一樣成為魔法師。</p>`,
            mark: 'divider'
        },
        {
            type       : small,
            title      : '段落',
            description: `分隔線可以增加間距用以區分大型段落。`,
            link       : 'section'
        },
        {
            type: 'example',
            code: `這裡是一個區段，然後下一行會是新世界。
<div class="ts section divider"></div>
哈囉！世界！`,
            mark: 'section'
        },
        {
            type       : small,
            title      : '水平分隔線',
            description: `水平分隔線可以讓你在中間插入文字。`,
            link       : 'horizontal-divider'
        },
        {
            type: 'example',
            code: `<p>嗶嗶嗶。</p>
<div class="ts horizontal divider">我是分隔線</div>
<p>沒錯，你可以在分隔線中間插入一小段文字，</p>
<p>而且只需要一個元素。</p>`,
            mark: 'horizontal'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '分隔線的外觀可以有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '隱藏',
            description: `不可見的分隔線，但仍帶有分隔效果。`,
            link       : 'hidden'
        },
        {
            type: 'example',
            code: `<p>嗶嗶嗶。</p>
<div class="ts hidden divider">我是分隔線</div>
<p>你有看見中間的分隔線嗎？。</p>
<p>很多人看不見。</p>
<p>但是很多人不說。</p>`,
            mark: 'hidden'
        },
        {
            type       : small,
            title      : '縮減',
            description: `分隔線可以沒有間距。`,
            link       : 'fitted'
        },
        {
            type: 'example',
            code: `這個分隔線會沒有間距，字看起來會跟分隔線黏在一起。
<div class="ts fitted divider"></div>
當然這一行也不例外。`,
            mark: 'fitted'
        },
        {
            type       : small,
            title      : '反色',
            description: `分隔線的顏色是相反色。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted segment">
    下面的分隔線會和一般的分隔線顏色有所不同。
    <div class="ts inverted divider"></div>
    看見了嗎！奇蹟啊！
</div>`,
            mark: 'inverted'
        },
        {
            type       : small,
            title      : '清理浮動',
            description: `分隔線可以透過 <span class="ts label">clear: both;</span> 清理上一個元素的浮動狀態。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `月月，搭拉安！
<div class="ts clearing divider"></div>
月月，搭拉安！`,
            mark: 'clearing'
        },
    ]
}