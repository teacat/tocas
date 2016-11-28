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
        title   : '彈出式訊息',
        subTitle:
        `
            砰！看看我！
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>彈出訊息目前是以毋需 JavaScript 為目的，此元件會在滑鼠移過某處時顯示一個氣泡訊息，這個訊息偏向提示，因此不打算增加過多豐富的功能，</p>
                <p>往後會在行動裝置上則會隱藏，因為觸控裝置並沒有滑鼠。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '一個彈出式訊息具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '彈出式訊息',
            description: `一個正常的彈出式訊息，在元素中設置 <span class="ts horizontal label">[data-tooltip="訊息"]</span> 屬性即可，彈出式訊息的位置預設在元素下方。`,
            link       : 'popup'
        },
        {
            type: 'example',
            code: `<button class="ts info labeled icon button" data-tooltip="早安！我的朋友！你欠錢沒還！">
    <i class="mouse pointer icon"></i>
    滑鼠移至此查看範例
</button>`
        },
        {
            type       : small,
            title      : '標籤',
            description: `透過 <span class="ts horizontal label">[data-tooltip-type="label"]</span> 可以讓彈出式訊息像是標籤一般的外觀。`,
            link       : 'label-type'
        },
        {
            type: 'example',
            code: `<button class="ts info labeled icon button" data-tooltip-type="label" data-tooltip="這個彈出式訊息沒有箭頭，像普通標籤。">
    <i class="mouse pointer icon"></i>
    滑鼠移至此查看範例
</button>`
        },
        {
            type       : small,
            title      : '附著於其他元素',
            description: `彈出式訊息也可以套用在一般的文字或是連結甚至其他元素上，需要注意的是這依賴著 <span class="ts horizontal label">:after</span> 與 <span class="ts horizontal label">:before</span> 選擇器，任何不是「容器」的都不適用，如：文字欄位、圖示、影像等。
            <br><br>
            你需要有個額外的容器包覆這些不適用的元素，然後在容器上配置彈出式訊息，請參閱下面這個範例。`,
            link       : 'any-element'
        },
        {
            type: 'example',
            code: `<a href="#!" data-tooltip="這是洨洨安。">
    <img class="ts circular avatar image" src="${imgPlaceholderUser}">
</a>
<a href="#!" data-tooltip="這是我好朋友，長得跟洨洨安有點像。">
    <img class="ts circular avatar image" src="${imgPlaceholderUser}">
</a>
當然，你也能夠讓
<a href="#!" data-tooltip="早安！朋友！">
    普通的連結
</a>
有彈出式訊息。
<div class="ts input" data-tooltip="請輸入您的帳號。">
    <input type="text" placeholder="滑鼠移過來">
</div>`
        },
        {
            type       : normal,
            title      : '狀態',
            description: '彈出式訊息也具有狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '無彈出式訊息',
            description: `有些時候你可能已經有外掛、或是插件來協助你完成彈出式訊息的實作，倘若你的外掛、插件也使用到了 <span class="ts horizontal label">[data-tooltip]</span> 屬性，這個時候可能會與 Tocas UI 有所衝突，為此，你可以在該元素上加上 <span class="ts horizontal label">.untooltipped</span> 樣式即可停用 Tocas UI 的彈出式訊息。`,
            link       : 'untooltipped'
        },
        {
            type: 'example',
            code: `<button class="ts info untooltipped button" data-tooltip="早安！我的朋友！你欠錢沒還！">
    這個按鈕不會有彈出式訊息
</button>`,
            mark  : 'untooltipped'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '你可以更改彈出式訊息的位置、大小。',
            link       : false
        },
        {
            type       : small,
            title      : '訊息位置',
            description: `你可以透過 <span class="ts horizontal label">[data-tooltip-position]</span> 改變彈出式訊息的出現位置。`,
            link       : 'position'
        },
        {
            type: 'example',
            code: `<button class="ts info button" data-tooltip-position="top left" data-tooltip="這是彈出式訊息。">上面左邊</button>
<button class="ts info button" data-tooltip-position="top center" data-tooltip="這是彈出式訊息。">上面中間</button>
<button class="ts info button" data-tooltip-position="top right" data-tooltip="這是彈出式訊息。">上面右邊</button>
<button class="ts info button" data-tooltip-position="bottom left" data-tooltip="這是彈出式訊息。">下面左邊</button>
<button class="ts info button" data-tooltip-position="bottom center" data-tooltip="這是彈出式訊息。">下面中間</button>
<button class="ts info button" data-tooltip-position="bottom right" data-tooltip="這是彈出式訊息。">下面右邊</button>
<button class="ts info button" data-tooltip-position="left" data-tooltip="這是彈出式訊息。">左邊</button>
<button class="ts info button" data-tooltip-position="right" data-tooltip="這是彈出式訊息。">右邊</button>`,
        },
        {
            type       : small,
            title      : '出現延遲',
            description: `透過 <span class="ts horizontal label">[data-tooltip-delay]</span> 來決定滑鼠移至元素上後要過多久才會出現彈出式訊息。`,
            link       : 'delay'
        },
        {
            type: 'example',
            code: `<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="disabled">停用延遲</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="0.1">0.1 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="0.2">0.2 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="0.3">0.3 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="0.4">0.4 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="0.5">0.5 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="1">1 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="2">2 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="3">3 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="4">4 秒</button>
<button class="ts info button" data-tooltip="這是彈出式訊息。" data-tooltip-delay="5">5 秒</button>`
        }
    ]
}