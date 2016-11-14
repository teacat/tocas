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
        title   : '選單',
        subTitle:
        `
            從這裡到達任何地方。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>選單在螢幕過小時會更改為捲動式，而不會變更為響應式設計，但你可以讓他自動層疊。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '選單具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '選單',
            description: `一個原生選單。`,
            link       : 'menu'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'menu'
        },
        {
            type       : small,
            title      : '基本',
            description: `一個基本的選單。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'basic'
        },
        {
            type       : small,
            title      : '單純',
            description: `一個十分單純的選單，這種選單沒有左右內距，因此很適合對齊其他元件。`,
            link       : 'pure'
        },
        {
            type: 'example',
            code: `<div class="ts pure basic borderless menu">
    <a class="item">合作</a>
    <a class="item">外框</a>
    <a class="item">除錯器</a>
</div>`,
            mark: 'pure'
        },
        {
            type       : small,
            title      : '其次',
            description: `一個比較不重要的選單，這個選單沒有背景顏色和框線。`,
            link       : 'secondary'
        },
        {
            type: 'example',
            code: `<div class="ts secondary menu">
    <a class="item">動漫</a>
    <a class="item">休閒</a>
    <a class="item">音樂</a>
</div>`,
            mark: 'secondary'
        },
        {
            type       : small,
            title      : '帶指標的其次',
            description: `一個帶有指示標記卻又比較不重要的選單。`,
            link       : 'pointing-secondary'
        },
        {
            type: 'example',
            code: `<div class="ts pointing secondary menu">
    <a class="item">首頁</a>
    <a class="active item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'pointing, secondary'
        },
        {
            type       : small,
            title      : '分頁籤',
            description: `選單可以看起來像分頁籤一樣。`,
            link       : 'tabbed'
        },
        {
            type: 'example',
            code: `<div class="ts tabbed menu">
    <a class="item">動漫</a>
    <a class="active item">休閒</a>
    <a class="item">音樂</a>
</div>`,
            mark: 'tabbed'
        },
        {
            type       : small,
            title      : '反色語意',
            description: `選單也可以是反色且具有不同語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts inverted primary menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>
<div class="ts inverted info menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>
<div class="ts inverted warning menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>
</div>
<div class="ts inverted menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'inverted, primary, info, warning'
        },
        {
            type       : small,
            title      : '反色肯定和否定',
            description: `選單也可以是反色且帶有肯定或否定的語氣。`,
            link       : 'inverted-positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts inverted positive menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>
<div class="ts inverted negative menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'inverted, positive, negative'
        },
        {
            type       : small,
            title      : '垂直',
            description: `一個垂直的選單。`,
            link       : 'vertical'
        },
        {
            type: 'example',
            code: `<div class="ts vertical menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'vertical'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '一個選單帶有些不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '啟用中',
            description: `顯示這個項目正在使用、被啟用。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="item">首頁</a>
    <a class="active item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '已停用',
            description: `顯示一個項目已經被停用、不可使用。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="item">首頁</a>
    <a class="disabled item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '內容',
            description: '一個選單具有不同內容。',
            link       : false
        },
        {
            type       : small,
            title      : '標題',
            description: `項目也可以含有標誌性文字。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts inverted info borderless menu">
    <a class="header item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
</div>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '未讀標記',
            description: `項目可以有一個新通知、未讀標記。`,
            link       : 'unread'
        },
        {
            type: 'example',
            code: `<div class="ts borderless menu">
    <a class="item">首頁</a>
    <a class="unread item">動態軸</a>
    <a class="item">好友</a>
    <a class="item">設定</a>
</div>
<br>
<div class="ts icon menu">
    <a class="item"><i class="icon user"></i></a>
    <a class="unread item"><i class="icon comment"></i></a>
    <a class="item"><i class="icon star"></i></a>
</div>`,
            mark  : 'unread',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '圖示',
            description: `你可以將圖示放置於選單的項目內。`,
            link       : 'icon-item'
        },
        {
            type: 'example',
            code: `<div class="ts vertical compact menu">
    <a class="item">
        <i class="search icon"></i>
        搜尋
    </a>
    <a class="active item">
        <i class="mail icon"></i>
        電子郵件
    </a>
    <a class="disabled item">
        <i class="user icon"></i>
        使用者
    </a>
    <a class="item">
        <i class="remove icon"></i>
        刪除
    </a>
</div>`,
            mark: 'label'
        },
        {
            type       : small,
            title      : '置右選單',
            description: `一個選單內可以再放置一個向右靠齊的選單。`,
            link       : 'right-menu'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
    <div class="right menu">
        <a class="item">檔案</a>
        <a class="item">Github</a>
    </div>
</div>`,
            mark: 'right menu'
        },
        {
            type       : small,
            title      : '帶輸入欄位選單',
            description: `選單內也可以放置輸入欄位，例如這樣。`,
            link       : 'input'
        },
        {
            type: 'example',
            code: `<div class="ts inverted primary borderless menu">
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
    <div class="right menu">
        <div class="fitted item">
            <div class="ts borderless right icon inverted primary input">
                <input type="text" placeholder="文字欄位">
                <i class="search icon"></i>
            </div>
        </div>
    </div>
</div>
<br>
<div class="ts vertical compact inverted info borderless menu">
    <div class="item">
        <div class="ts fluid right icon inverted info input">
            <input type="text" placeholder="搜尋">
            <i class="search icon"></i>
        </div>
    </div>
    <a class="item">首頁</a>
    <a class="item">關於</a>
    <a class="item">文件</a>
    <div class="fitted item">
        <div class="ts fluid borderless basic  icon inverted input">
            <input type="text" placeholder="搜尋 ...">
            <i class="search icon"></i>
        </div>
    </div>
</div>`,
            mark: 'input',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '標籤',
            description: `選單內可以擺放計數標籤。`,
            link       : 'label'
        },
        {
            type: 'example',
            code: `<div class="ts vertical compact inverted info menu">
    <a class="item">
        <div class="ts label">99+</div>
        動態軸
    </a>
    <a class="active item">
        <div class="ts label">12</div>
        電子郵件
    </a>
    <a class="disabled item">
        <div class="ts label">3</div>
        訊息
    </a>
</div>`,
            mark: 'label'
        },
        {
            type       : small,
            title      : '分隔線',
            description: `你可以在選單中放置分隔線用以區隔項目。`,
            link       : 'divider'
        },
        {
            type: 'example',
            code: `<div class="ts vertical compact borderless menu">
    <a class="item">
        <i class="picture icon"></i> 相簿
    </a>
    <a class="item">
        <i class="music icon"></i> 音樂
    </a>
    <div class="divider item"></div>
    <a class="item">
        <i class="sign out icon"></i> 登出
    </a>
</div>`,
            mark: 'divider'
        },
        {
            type       : small,
            title      : '子選單',
            description: `選單的項目內還可以再有一層選單。`,
            link       : 'sub-menu'
        },
        {
            type: 'example',
            code: `<div class="ts vertical compact menu">
    <div class="item">
        <div class="ts fluid right icon input">
            <input type="text" placeholder="搜尋">
            <i class="search icon"></i>
        </div>
    </div>
    <div class="item">
        首頁功能
        <div class="menu">
            <a class="active item">搜尋</a>
            <a class="item">新增</a>
            <a class="item">移除</a>
        </div>
    </div>
    <div class="item">瀏覽</div>
    <div class="item">訊息</div>
    <div class="item">更多</div>
</div>`,
            mark: 'menu'
        },
        {
            type       : small,
            title      : '下拉式功能選單',
            description: `你可以在選單內擺置幾個下拉式功能選單，這部分請參考下拉式選單元件。`,
            link       : 'dropdown-menu'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="item">首頁</a>
    <div class="ts item dropdown">
        <div class="text">
            元件
        </div>
        <i class="dropdown icon"></i>
        <div class="menu">
            <a class="item">按鈕</a>
            <div class="divider"></div>
            <a class="item">表單</a>
            <a class="item">導航列</a>
        </div>
    </div>
    <a class="item">文件</a>
</div>`,
            mark: 'ts item dropdown'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '選單具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '圖示',
            description: `用來擺放圖示的選單。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts icon menu">
    <a class="item"><i class="icon search"></i></a>
    <a class="item"><i class="icon download"></i></a>
    <a class="item"><i class="icon upload"></i></a>
</div>
<div class="ts vertical icon menu">
    <a class="item"><i class="icon search"></i></a>
    <a class="item"><i class="icon download"></i></a>
    <a class="item"><i class="icon upload"></i></a>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '圖示標籤',
            description: `你還可以在圖示選單中帶有標籤文字。`,
            link       : 'labeled-icon'
        },
        {
            type: 'example',
            code: `<div class="ts labeled icon menu">
    <a class="item">
        <i class="search icon"></i>
        搜尋
    </a>
    <a class="active item">
        <i class="mail icon"></i>
        電子郵件
    </a>
    <a class="disabled item">
        <i class="user icon"></i>
        使用者
    </a>
    <a class="item">
        <i class="remove icon"></i>
        移除鈕
    </a>
</div>
<div class="ts vertical labeled icon menu">
    <a class="item">
        <i class="search icon"></i>
        搜尋
    </a>
    <a class="active item">
        <i class="mail icon"></i>
        電子郵件
    </a>
    <a class="disabled item">
        <i class="user icon"></i>
        使用者
    </a>
</div>`,
            mark: 'labeled icon'
        },
        {
            type       : small,
            title      : '流動',
            description: `選單的寬度可以是流動的，用來貼齊容器左右邊並且移除邊角。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts vertical fluid menu">
    <a class="item">亞凡芽</a>
    <a class="item">卡莉絲</a>
    <a class="item">夏希</a>
</div>`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '輕巧版',
            description: `選單的寬度能夠以選單的內容作為基準並自動延展。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<div class="ts compact menu">
    <a class="item">
        <i class="gamepad icon"></i>
        遊戲
    </a>
    <a class="item">
        <i class="video camera icon"></i>
        頻道
    </a>
    <a class="item">
        <i class="video play icon"></i>
        影片
    </a>
</div>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '平均劃分',
            description: `選單的項目寬度可以平均劃分。`,
            link       : 'evenly-divided'
        },
        {
            type: 'example',
            code: `<div class="ts evenly divided menu">
    <a class="item">
        <i class="gamepad icon"></i>
        遊戲
    </a>
    <a class="item">
        <i class="video camera icon"></i>
        頻道
    </a>
    <a class="item">
        <i class="video play icon"></i>
        影片
    </a>
</div>`,
            mark: 'evenly divided'
        },
        {
            type       : small,
            title      : '減少框線',
            description: `選單也可以選擇不要有內部框線。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<div class="ts borderless menu">
    <a class="item">亞凡芽</a>
    <a class="item">卡莉絲</a>
    <a class="item">夏希</a>
</div>`,
            mark: 'borderless'
        },
        {
            type       : small,
            title      : '縮減',
            description: `項目可以不要有垂直或是水平內距。`,
            link       : 'fitted'
        },
        {
            type: 'example',
            code: `<div class="ts menu">
    <a class="horizontally fitted item"> 水平縮減 </a>
    <a class="vertically fitted item"> 垂直縮減 </a>
    <a class="item"> 一般選項 </a>
</div>`,
            mark: 'fitted, horizontally, vertically'
        },
        {
            type       : small,
            title      : '寬鬆',
            description: `選單可以套用更寬鬆的樣式。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts relaxed menu">
    <a class="item">預設</a>
    <a class="item">工作區域</a>
    <a class="item">指令</a>
</div>`,
            mark: 'relaxed'
        },
        {
            type       : small,
            title      : '抬舉',
            description: `選單可以看起來像被抬舉一般加重陰影。`,
            link       : 'raised'
        },
        {
            type: 'example',
            code: `<div class="ts raised menu">
    <a class="item">檔案</a>
    <a class="item">編輯</a>
    <a class="item">尋找</a>
    <a class="item">檢視</a>
</div>`,
            mark: 'raised'
        },
        {
            type       : small,
            title      : '平面化',
            description: `選單可以看起來是扁平的。`,
            link       : 'flatted'
        },
        {
            type: 'example',
            code: `<div class="ts flatted menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>`,
            mark: 'flatted'
        },
        {
            type       : small,
            title      : '水平對齊',
            description: `你可以改變項目中的水平對齊，可以是置左、置右或者置中。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts vertical menu">
    <a class="left aligned item">置左對齊</a>
    <a class="center aligned item">置中對齊</a>
    <a class="right aligned item">置右對齊</a>
</div>`,
            mark: 'left aligned, center aligned, right aligned'
        },
        {
            type       : small,
            title      : '自動層疊',
            description: `選單可以在行動裝置上自動層疊，而不是繼續保持一排。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts stackable menu">
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '可水平捲動的',
            description: `當選單項目過多的時候你可以讓選單支援水平捲動，避免項目溢出來。`,
            link       : 'horizontally-scrollable'
        },
        {
            type: 'example',
            code: `<div class="ts horizontally scrollable menu">
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
    <a class="item">項目</a>
</div>`,
            mark: 'horizontally scrollable'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `選單提供了多種尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts tiny menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts small menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts medium menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts large menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts big menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts huge menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>
<div class="ts massive menu">
    <a class="item">執行</a>
    <a class="item">工具</a>
    <a class="item">視窗</a>
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
    ]
}