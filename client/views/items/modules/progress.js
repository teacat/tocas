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
        title   : '進度列',
        subTitle:
        `
            讓使用者知道他還要等多久，前提是不會卡在 99%。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '進度列具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的進度列架構。`,
            link       : 'progress'
        },
        {
            type: 'example',
            code: `<div class="ts progress">
    <div class="bar" style="width: 30%"></div>
</div>`,
            mark: 'progress'
        },
        {
            type       : small,
            title      : '語意',
            description: `進度列有著不同的語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary progress">
    <div class="bar" style="width: 30%"></div>
</div>
<div class="ts info progress">
    <div class="bar" style="width: 45%"></div>
</div>
<div class="ts warning progress">
    <div class="bar" style="width: 65%"></div>
</div>
<div class="ts inverted progress">
    <div class="bar" style="width: 30%"></div>
</div>`,
            mark: 'primary, info, warning, inverted'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `進度列也可以帶有肯定或否定的語氣。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive progress">
    <div class="bar" style="width: 60%"></div>
</div>
<div class="ts negative progress">
    <div class="bar" style="width: 35%"></div>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : normal,
            title      : '內容',
            description: '進度列的內容有一些不一樣的元素。',
            link       : false
        },
        {
            type       : small,
            title      : '進度列',
            description: `一個顯示進度最基本的「列」。`,
            link       : 'bar'
        },
        {
            type: 'example',
            code: `<div class="ts progress">
    <div class="bar"></div>
</div>`,
            mark: 'bar'
        },
        {
            type       : small,
            title      : '文字',
            description: `可以在進度列上顯示文字的元素。`,
            link       : 'progress-text'
        },
        {
            type: 'example',
            code: `<div class="ts progress">
    <div class="bar" style="width: 32%">
        <span class="text">32%</span>
    </div>
</div>`,
            mark: 'text'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '進度列的有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '活動中',
            description: `顯示一個進度列正在進行中。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<div class="ts active progress">
    <div class="bar" style="width: 60%"></div>
</div>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '未知',
            description: `顯示一個可能位於準備中的進度列。`,
            link       : 'indeterminate'
        },
        {
            type: 'example',
            code: `<div class="ts indeterminate progress">
    <div class="bar"></div>
</div>`,
            mark: 'indeterminate'
        },
        {
            type       : normal,
            title      : '群組',
            description: '進度列可以是一個群組。',
            link       : false
        },
        {
            type       : small,
            title      : '進度列堆疊',
            description: `進度列可以由多個列來進行堆疊排列。`,
            link       : 'stack'
        },
        {
            type: 'example',
            code: `<div class="ts progress">
    <div class="bar" style="width: 20%; background: lightskyblue">
        <label class="text">檔案</label>
    </div>
    <div class="bar" style="width: 50%; background: orange">
        <label class="text">音樂</label>
    </div>
    <div class="bar" style="width: 30%; background: green">
        <label class="text">圖片</label>
    </div>
</div>`,
            mark: 'bar'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '進度列有多種外觀型態。',
            link       : false
        },
        {
            type       : small,
            title      : '流動',
            description: `進度列可以是流動寬度並適合用來貼齊容器的左右邊，因為沒有圓角。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts fluid progress">
    <div class="bar" style="width: 60%"></div>
</div>`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '吸附',
            description: `進度列可以吸附在某些元件內。`,
            link       : 'attached'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="ts positive top attached progress">
        <div class="bar" style="width: 25%"></div>
    </div>
    <div class="content">
        這個卡片的上下方都各有一個獨立的吸附式進度條。
    </div>
    <div class="ts bottom attached progress">
        <div class="bar" style="width: 70%"></div>
    </div>
</div>`,
            mark: 'top attached, bottom attached'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `進度列提供多種尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts tiny progress">
    <div class="bar" style="width: 40%"></div>
</div>
<div class="ts small progress">
    <div class="bar" style="width: 50%"></div>
</div>
<div class="ts medium progress">
    <div class="bar" style="width: 60%"><span class="text">60%</span></div>
</div>
<div class="ts large progress">
    <div class="bar" style="width: 70%"><span class="text">70%</span></div>
</div>
<div class="ts big progress">
    <div class="bar" style="width: 80%"><span class="text">80%</span></div>
</div>`,
            mark: 'tiny, small, medium, large, big'
        },
    ]
}