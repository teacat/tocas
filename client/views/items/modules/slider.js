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
        title   : '滑桿',
        subTitle:
        `
            省去手動輸入數值的麻煩。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>滑桿目前使用 HTML5 原生元件和 Tocas UI 樣式，</p>
                <p>這意味著所有瀏覽器的滑桿外觀都一樣，但基於 HTML5 的限制，</p>
                <p>還沒有辦法讓滑桿的左半部和右半部出現不同顏色。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '這裡是滑桿的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的滑桿。`,
            link       : 'slider'
        },
        {
            type: 'example',
            code: `<div class="ts slider">
    <input type="range">
</div>`,
            mark: 'slider'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '滑桿有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已停用',
            description: `一個滑桿可以呈現出無法使用、已停用的狀態。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts disabled slider">
    <input type="range">
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '滑桿的外觀有所不同。',
            link       : false
        },
        /*{
            type       : small,
            title      : '垂直',
            description: `滑桿可以是垂直的。`,
            link       : 'vertical'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
            <div class="ts vertical slider">
        <input type="range">
    </div>
</div>`,
            mark: 'vertical'
        },*/
        {
            type       : small,
            title      : '流動',
            description: `滑桿可以是流動且填滿整個容器的寬度。`,
            link       : 'vertical'
        },
        {
            type: 'example',
            code: `<div class="ts fluid slider">
    <input type="range">
</div>`,
            mark: 'fluid'
        },
    ]
}