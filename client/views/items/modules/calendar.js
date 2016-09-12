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
        title   : '日曆',
        subTitle: 
        `
            哇，2016 始春。
        `
    },
    html: 
    [
        {
            type       : normal,
            title      : '種類',
            description: '日曆有不同種類可供選擇。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的日曆。`,
            link       : 'calendar'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
    </div>
</div>`,
            mark: 'calendar'
        },
        {
            type       : normal,
            title      : '內容',
            description: '日曆由多個不同的內容構造所組成。',
            link       : false
        },
        {
            type       : small,
            title      : '標題',
            description: `日曆的標題，可以用來顯示月份或是當作主要標題。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">十二月</div>
</div>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '日期',
            description: `日曆中的日期。`,
            link       : 'date'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">九月</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>`,
            mark: 'date'
        },
        {
            type       : small,
            title      : '日期範圍',
            description: `日期可以是一個範圍，而不是單一天。`,
            link       : 'range'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">九月</div>
    <div class="content">
        <div class="range date">12 - 31</div>
    </div>
</div>`,
            mark: 'range date'
        },
        {
            type       : small,
            title      : '額外內容',
            description: `日曆中可以擺放額外的內容。`,
            link       : 'extra'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
        <div class="extra">星期三</div>
    </div>
</div>`,
            mark: 'extra'
        },
        {
            type       : small,
            title      : '前後輟',
            description: `日曆中的日期可以有前輟或是後輟。`,
            link       : 'prefix'
        },
        {
            type: 'example',
            code: `<div class="ts calendar">
    <div class="header">十二月</div>
    <div class="content">
        <div class="date">
            <span class="prefix">第</span>
            ?
            <span class="suffix">日</span>
        </div>
    </div>
</div>
<br><br>
<div class="ts calendar">
    <div class="header">十二月</div>
    <div class="content">
        <div class="date">
            25
            <span class="suffix">日</span>
        </div>
    </div>
</div>`,
            mark  : 'prefix, suffix',
            remove: '<br>'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '日曆的外觀有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '圓角',
            description: `日曆的邊角可以是稍微圓角的。`,
            link       : 'rounded'
        },
        {
            type: 'example',
            code: `<div class="ts rounded calendar">
    <div class="header">七月</div>
    <div class="content">
        <div class="date">13</div>
    </div>
</div>`,
            mark: 'rounded'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `日曆的尺寸可以改變。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini calendar">
    <div class="header">迷你</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts tiny calendar">
    <div class="header">微小</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts small calendar">
    <div class="header">小的</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts medium calendar">
    <div class="header">適中</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts large calendar">
    <div class="header">稍大</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts big calendar">
    <div class="header">大的</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts huge calendar">
    <div class="header">巨大</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>
<div class="ts massive calendar">
    <div class="header">重量級</div>
    <div class="content">
        <div class="date">14</div>
    </div>
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
    ]
}