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
        title   : '下拉式選單',
        subTitle:
        `
            打開之後會顛覆你先前以為不能的想法。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '下拉式選單有多個種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的下拉式選單。`,
            link       : 'dropdown'
        },
        {
            type: 'example',
            code: `<select class="ts basic dropdown">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
</select>`,
            mark: 'basic, dropdown'
        },
        {
            type       : small,
            title      : '語意',
            description: `基本的下拉式選單有著不同的語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<select class="ts basic primary dropdown">
    <option>1998</option>
</select>
<select class="ts basic info dropdown">
    <option>1998</option>
</select>
<select class="ts basic warning dropdown">
    <option>1998</option>
</select>
<select class="ts basic inverted dropdown">
    <option>1998</option>
</select>`,
            mark: 'primary, info, warning, inverted'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `肯定和否定的語氣可以用在基本的下拉式選單。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<select class="ts basic positive dropdown">
    <option>1998</option>
</select>
<select class="ts basic negative dropdown">
    <option>1998</option>
</select>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '多選項',
            description: `選單可以一次展現出多個選項。`,
            link       : 'size-dropdown'
        },
        {
            type: 'example',
            code: `<select class="ts basic dropdown" size="3">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
    <option>2001</option>
    <option>2002</option>
</select>`
        },
        {
            type       : small,
            title      : '複選',
            description: `選單可以加上 <span class="ts horizontal label">multiple</span> 來允許複選。`,
            link       : 'multiple'
        },
        {
            type: 'example',
            code: `<select class="ts basic dropdown" size="3" multiple>
    <option>蘋果</option>
    <option>西瓜</option>
    <option>香蕉</option>
    <option>菠蘿</option>
    <option>拔鳳梨</option>
</select>`
        },
        {
            type       : small,
            title      : '功能選單',
            description: `一個用以呈現功能的下拉式功能選單`,
            link       : 'dropdown-menu'
        },
        {
            type: 'example',
            code: `<div class="ts dropdown">
    <div class="text">檔案</div>
    <i class="caret down icon"></i>
    <div class="menu">
        <div class="item">
            新增
        </div>
        <div class="item">
            重新命名
            <span class="description">Ctrl + R</span>
        </div>
        <div class="item">
            <i class="folder icon"></i>
            移動至
        </div>
        <div class="item">
            <i class="trash icon"></i>
            移至垃圾桶
        </div>
        <div class="divider"></div>
        <div class="item">
            下載為 ...
        </div>
    </div>
</div>`,
            mark: 'dropdown'
        },
        {
            type       : tiny,
            title      : 'JavaScript',
            description: '欲要使用這種選單，你必須透過下列方式來驅動你的下拉式功能選單。',
            expandableExample: false
        },
        {
            type: source,
            code: `ts('.ts.dropdown:not(.basic)').dropdown()`
        },
        {
            type       : normal,
            title      : '群組',
            description: '下拉式選單可以是一個群組。',
            link       : false
        },
        {
            type       : small,
            title      : '下拉式選單群組',
            description: `一個最基本的下拉式選單群組。`,
            link       : 'group'
        },
        {
            type: 'example',
            code: `<div class="ts dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>`,
            mark: 'dropdowns'
        },
        {
            type       : small,
            title      : '分開的',
            description: `下拉式選單群組裡的選單可以是分開的。`,
            link       : 'separated'
        },
        {
            type: 'example',
            code: `<div class="ts separated dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>`,
            mark: 'separated'
        },
        {
            type       : small,
            title      : '較寬鬆',
            description: `分開的下拉式選單群組間隙可以較為寬鬆。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts fluid separated relaxed dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>`,
            mark: 'relaxed'
        },
        {
            type       : normal,
            title      : '內容',
            description: '下拉式選單的內容由多種不同的結構組成。',
            link       : false
        },
        {
            type       : small,
            title      : '項目',
            description: `項目是構成選單中最基本的一個部分。`,
            link       : 'item'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="caret down icon"></i>
    <span class="text">更多功能</span>
    <div class="menu">
        <div class="item">
            新增
        </div>
        <div class="item">
            重新命名
        </div>
        <div class="item">
            下載並壓縮
        </div>
    </div>
</div>`,
            mark: 'item'
        },
        {
            type       : small,
            title      : '標題',
            description: `選單中可以有標題。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="filter icon"></i>
    <span class="text">篩選</span>
    <div class="menu">
        <div class="header">
            <i class="tags icon"></i>
            由下列標籤篩選
        </div>
        <div class="item">
            已完成
        </div>
        <div class="item">
            進行中
        </div>
    </div>
</div>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '分隔線',
            description: `選單中可以插入分隔線來劃分兩個區塊。`,
            link       : 'divider'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="users icon"></i>
    <span class="text">選擇人物</span>
    <div class="menu">
        <div class="item">
            橙希
        </div>
        <div class="item">
            吳雨藍
        </div>
        <div class="divider"></div>
        <div class="item">
            羽田白音
        </div>
    </div>
</div>`,
            mark: 'divider'
        },
        {
            type       : tiny,
            title      : '區段分隔線',
            description: `分隔線的間距可以更大，用以加強分隔區段。`
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="users icon"></i>
    <span class="text">選擇人物</span>
    <div class="menu">
        <div class="item">
            橙希
        </div>
        <div class="item">
            吳雨藍
        </div>
        <div class="section divider"></div>
        <div class="item">
            羽田白音
        </div>
    </div>
</div>`,
            mark: 'section divider'
        },
        {
            type       : tiny,
            title      : '群組分隔線',
            description: `下拉式選單群組也能在中間插入自定義分隔線。`
        },
        {
            type: 'example',
            code: `<div class="ts separated dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <div class="divider">年</div>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <div class="divider">月</div>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
    <div class="divider">日</div>
</div>`,
            mark: 'divider'
        },
        {
            type       : small,
            title      : '圖示',
            description: `選單內可以有圖示點綴。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown button">
    <span class="text">您的心情？</span>
    <div class="menu">
        <div class="item">
            <i class="frown icon"></i>
            難過
        </div>
        <div class="item">
            <i class="meh icon"></i>
            喔
        </div>
        <div class="item">
            <i class="smile icon"></i>
            開心
        </div>
    </div>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '註釋',
            description: `選單內的項目可以帶有註釋，用做詮釋項目的概要。`,
            link       : 'description'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="caret down icon"></i>
    <span class="text">移至資料夾</span>
    <div class="menu">
        <div class="item">
            <span class="text">圖片</span>
            <span class="description">今天上午</span>
        </div>
        <div class="item">
            <span class="text">音樂</span>
            <span class="description">未曾變動</span>
        </div>
        <div class="item">
            <span class="text">備份</span>
            <span class="description">一年前</span>
        </div>
    </div>
</div>`,
            mark: 'text, description'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '下拉式選單的外觀有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '浮動',
            description: `下拉式功能選單可以看起來像是浮動的，離按鈕更遠，陰影更深。`,
            link       : 'floating'
        },
        {
            type: 'example',
            code: `<div class="ts floating dropdown labeled icon button">
    <i class="caret down icon"></i>
    <span class="text">更多功能</span>
    <div class="menu">
        <div class="item">
            新增
        </div>
        <div class="item">
            重新命名
        </div>
        <div class="item">
            下載並壓縮
        </div>
    </div>
</div>`,
            mark: 'floating'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `基本的下拉式選單有多種尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<select class="ts basic mini dropdown">
    <option>迷你</option>
</select>
<select class="ts basic tiny dropdown">
    <option>微小</option>
</select>
<select class="ts basic small dropdown">
    <option>小的</option>
</select>
<select class="ts basic medium dropdown">
    <option>適中</option>
</select>
<select class="ts basic large dropdown">
    <option>大的</option>
</select>
<select class="ts basic big dropdown">
    <option>大型</option>
</select>
<select class="ts basic huge dropdown">
    <option>巨大</option>
</select>
<select class="ts basic massive dropdown">
    <option>重量級</option>
</select>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
        {
            type       : small,
            title      : '動作',
            description: `下拉式選單的左右可以帶有具動作性質的元素。`,
            link       : 'action'
        },
        {
            type: 'example',
            code: `<div class="ts action dropdown">
    <select class="ts basic dropdown">
        <option>1 個</option>
    </select>
    <div class="ts button">
        購買
    </div>
</div>`,
            mark: 'action'
        },
        {
            type       : small,
            title      : '流動',
            description: `下拉式選單可以是流動寬度，填滿容器寬度。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<select class="ts fluid basic dropdown">
    <option>Kasendra</option>
    <option>Larafel</option>
    <option>Kake</option>
</select>`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '自動層疊',
            description: `下拉式選單群組能夠在手機上自動層疊，而不是保持水平排列。欲看見效果，你可能需要透過手機來查看這個範例。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts stackable dropdowns">
    <select class="ts basic dropdown">
        <option>1998</option>
    </select>
    <select class="ts basic dropdown">
        <option>07</option>
    </select>
    <select class="ts basic dropdown">
        <option>13</option>
    </select>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '無邊框',
            description: `下拉式選單可以沒有邊框。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<select class="ts borderless basic dropdown">
    <option>1998</option>
    <option>1999</option>
    <option>2000</option>
</select>`,
            mark: 'borderless'
        },
    ]
}