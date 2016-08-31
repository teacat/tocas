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
        title   : '輸入欄位',
        subTitle: 
        `
            再鍵入幾個字就是新的開始。
        `
    },
    html: 
    [
        {
            type       : normal,
            title      : '種類',
            description: '輸入欄位具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '輸入欄位',
            description: `一個普通的基本欄位可以是正常的 <span class="ts horizontal label">input</span> 或 <span class="ts horizontal label">textarea</span> 甚至是任何 <span class="ts horizontal label">[contenteditable]</span> 的元素。`,
            link       : 'input'
        },
        {
            type: 'example',
            code: `<div class="ts input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts input">
    <textarea placeholder="多行文字欄位"></textarea>
</div>
<br><br>
<div class="ts input">
    <div contenteditable>在這裡輸入一些文字</div>
</div>`,
            mark  : 'input',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '反色語意',
            description: `輸入欄位具有多種語意並將其呈現於背景。`,
            link       : 'inverted-emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts inverted primary input">
    <input type="text" placeholder="反色主要語氣">
</div>
<br><br>
<div class="ts inverted info input">
    <input type="text" placeholder="反色提示語氣">
</div>
<br><br>
<div class="ts inverted warning input">
    <input type="text" placeholder="反色警告語氣">
</div>
<br><br>
<div class="ts inverted positive input">
    <input type="text" placeholder="反色正面語氣">
</div>
<br><br>
<div class="ts inverted negative input">
    <input type="text" placeholder="反色否定語氣">
</div>
<br><br>
<div class="ts inverted input">
    <input type="text" placeholder="反色語氣">
</div>`,
            remove: '<br>',
            mark  : 'inverted primary, inverted info, inverted warning, inverted positibe, inverted negative, inverted'
        },
        {
            type       : small,
            title      : '基本',
            description: `輸入欄位可以只擁有基本的結構、背景透明。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic input">
    <input type="text" placeholder="這個背景是透明的">
</div>`,
            mark: 'basic'
        },
        {
            type       : normal,
            title      : '群組',
            description: '輸入欄位也具有群組。',
            link       : false
        },
        {
            type       : small,
            title      : '垂直群組',
            description: `輸入欄位的群組擺放可以是垂直的。`,
            link       : 'vertical-group'
        },
        {
            type: 'example',
            code: `<div class="ts vertical inputs">
    <div class="ts input">
        <input type="text" placeholder="帳號">
    </div>
    <div class="ts input">
        <input type="text" placeholder="電子郵件地址">
    </div>
    <div class="ts input">
        <input type="password" placeholder="密碼">
    </div>
</div>`,
            mark: 'vertical, inputs'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '輸入欄位具有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '聚焦中',
            description: `輸入欄位可以看起來是正在被聚焦的。`,
            link       : 'focus'
        },
        {
            type: 'example',
            code: `<div class="ts focus input">
    <input type="text" placeholder="聚焦中的輸入欄位">
</div>`,
            mark: 'focus'
        },
        {
            type       : small,
            title      : '讀取中',
            description: `輸入欄位可以顯示正在讀取的圖示。`,
            link       : 'loading'
        },
        {
            type: 'example',
            code: `<div class="ts left icon input loading">
    <input type="text" placeholder="在此搜尋人、事、物">
    <i class="search icon"></i>
</div>
<br><br>
<div class="ts icon input loading">
    <input type="text" placeholder="在此搜尋人、事、物">
    <i class="search icon"></i>
</div>`,
            mark  : 'left icon, icon, loading',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '已停用',
            description: `可以讓輸入欄位呈現一個被停用的狀態。`,
            link       : 'disalbed'
        },
        {
            type: 'example',
            code: `<div class="ts disabled input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark: 'disabled',
        },
        {
            type       : small,
            title      : '錯誤',
            description: `輸入欄位能夠顯示一個發生錯誤的狀態。`,
            link       : 'error'
        },
        {
            type: 'example',
            code: `<div class="ts error input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic error input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark  : 'error, basic error',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '警告',
            description: `輸入欄位能夠處於一個警告或提示的狀態。`,
            link       : 'warning'
        },
        {
            type: 'example',
            code: `<div class="ts warning input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic warning input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark  : 'warning, basic warning',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '成功',
            description: `輸入欄位能夠處於成功的狀態。`,
            link       : 'success'
        },
        {
            type: 'example',
            code: `<div class="ts success input">
    <input type="text" placeholder="文字欄位">
</div>
<br><br>
<div class="ts basic success input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark  : 'success, basic success',
            remove: '<br>'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '輸入欄位可以有著不同的外觀點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '圖示',
            description: `你可以將圖示放入輸入欄位中。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts icon input">
    <input type="text" placeholder="搜尋...">
    <i class="search icon"></i>
</div>
<br><br>
<div class="ts left icon input">
    <input type="text" placeholder="搜尋使用者...">
    <i class="users icon"></i>
</div>`,
            mark  : 'icon, left icon, link',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '連結圖示',
            description: `輸入欄位中的圖示也能是一種連結，或可供按下的。`,
            link       : 'link-icon'
        },
        {
            type: 'example',
            code: `
<div class="ts icon input">
    <input type="text" placeholder="搜尋...">
    <i class="circular search link icon"></i>
</div>
<br><br>
<div class="ts icon input">
    <input type="text" placeholder="搜尋...">
    <i class="inverted circular search link icon"></i>
</div>`,
            mark  : 'link icon, icon',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '帶標籤',
            description: `輸入欄位可以帶有標籤元素。`,
            link       : 'labeled'
        },
        {
            type: 'example',
            code: `<div class="ts labeled input">
    <div class="ts label">
        http://
    </div>
    <input type="text" placeholder="您的網址">
</div>
<br><br>
<div class="ts right labeled input">
    <div class="ts label">
        $
    </div>
    <input type="text" placeholder="價格">
    <div class="ts basic label">
        .00
    </div>
</div>`,
            mark  : 'right labeled, labeled, label',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '動作',
            description: `輸入欄位旁可以附帶具有動作性質的元素。`,
            link       : 'action'
        },
        {
            type: 'example',
            code: `<div class="ts action input">
    <input type="text" placeholder="在這搜尋人、事、物">
    <button class="ts button">搜尋</button>
</div>
<br><br>
<div class="ts left action input">
    <button class="ts primary labeled icon button">
        <i class="cart icon"></i>
        結帳
    </button>
    <input type="text" value="$52.03">
</div>
<br><br>
<div class="ts action input">
    <input type="text" placeholder="搜尋網域名稱">
    <select class="ts basic dropdown">
        <option>.com</option>
        <option>.org</option>
        <option>.xxx</option>
     </select>
</div>
<br><br>
<div class="ts action input">
    <input type="text" placeholder="書籍名稱">
    <select class="ts basic dropdown">
        <option>教育</option>
        <option>娛樂休閒</option>
        <option>經濟</option>
     </select>
     <button class="ts button">搜尋</button>
</div>`,
            mark  : 'left action, action',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '無邊框',
            description: `輸入欄位可以沒有邊框，有時可以和基本樣式 <span class="ts horizontal label">.basic</span> 一同搭配。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<div class="ts borderless input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark: 'borderless',
        },
        {
            type       : small,
            title      : '流動',
            description: `輸入欄位的寬度可以是流動的。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts fluid input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark: 'fluid',
        },
        {
            type       : small,
            title      : '圓形的',
            description: `輸入欄位的圓角可以更圓。`,
            link       : 'circular'
        },
        {
            type: 'example',
            code: `<div class="ts circular input">
    <input type="text" placeholder="文字欄位">
</div>`,
            mark: 'circular',
        },
        {
            type       : small,
            title      : '可伸縮的',
            description: `輸入欄位可供使用者自由縮放。`,
            link       : 'resizable'
        },
        {
            type: 'example',
            code: `<div class="ts resizable input">
    <textarea placeholder="文章內容..."></textarea>
</div>`,
            mark: 'resizable',
        },
        {
            type       : small,
            title      : '尺寸',
            description: `輸入欄位的的尺寸有所不同。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts mini input">
    <input type="text" placeholder="迷你">
</div>
<br><br>
<div class="ts tiny input">
    <input type="text" placeholder="微小">
</div>
<br><br>
<div class="ts small input">
    <input type="text" placeholder="小的">
</div>
<br><br>
<div class="ts medium input">
    <input type="text" placeholder="適中">
</div>
<br><br>
<div class="ts large input">
    <input type="text" placeholder="大的">
</div>
<br><br>
<div class="ts big input">
    <input type="text" placeholder="更大">
</div>
<br><br>
<div class="ts huge input">
    <input type="text" placeholder="巨大">
</div>
<br><br>
<div class="ts massive input">
    <input type="text" placeholder="重量級">
</div>`,
            mark  : 'mini, tiny, small, medium, large, big, huge, massive',
            remove: '<br>'
        },
    ]
}