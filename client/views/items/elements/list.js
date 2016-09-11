var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var imgPlaceholderSquare = require('../../images/image_placeholder_1-1.png')
var imgPlaceholderWide   = require('../../images/image_placeholder_16-9.png')
var imgPlaceholderLegacy = require('../../images/image_placeholder_4-3.png')
var imgPlaceholderUser   = require('../../images/image_placeholder_user.png')
var imgPlaceholderUser2  = require('../../images/image_placeholder_user2.png')
var imgPlaceholderUser3  = require('../../images/image_placeholder_user3.png')

export default
{
    header:
    {
        title   : '清單',
        subTitle: 
        `
            一個這個，一個那個。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description: 
            `
                <p>清單很像一個選單，但是其結構更為簡易，外觀也以純文字居多，</p>
                <p>很適合用在頁腳的那種連結清單。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '清單具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的清單。`,
            link       : 'list'
        },
        {
            type: 'example',
            code: `<div class="ts list">
  <div class="item">蘋果</div>
  <div class="item">菠羅</div>
  <div class="item">拔鳳梨</div>
</div>`,
            mark  : 'list, item'
        },
        {
            type       : small,
            title      : '黑點',
            description: `一個帶有黑點的清單。`,
            link       : 'bulleted'
        },
        {
            type: 'example',
            code: `<div class="ts bulleted list">
    <div class="item">橙希</div>
    <div class="item">卡莉絲</div>
    <div class="item">
        <div>吳雨藍</div>
        <div class="list">
            <a class="item" href="#">亞凡芽</a>
            <div class="item">羽田白音</div>
            <div class="item">雷莉亞</div>
        </div>
    </div>
    <div class="item">依可諾爾</div>
</div>`,
            mark  : 'bulleted'
        },
        {
            type       : small,
            title      : '排序',
            description: `清單可以有號碼排序。`,
            link       : 'ordered'
        },
        {
            type: 'example',
            code: `<div class="ts ordered list">
    <a class="item">英梨梨</a>
    <a class="item">詩羽</a>
    <div class="item">
        <a>其他人物</a>
        <div class="list">
            <a class="item">加藤惠</a>
            <a class="item">九條可憐</a>
            <a class="item">豬熊陽子</a>
        </div>
    </div>
    <a class="item">小路綾</a>
</div>`,
            mark: 'ordered'
        },
        {
            type       : small,
            title      : '連結',
            description: `清單也可以是存放許多連結的地方。`,
            link       : 'link-list'
        },
        {
            type: 'example',
            code: `<div class="ts link list">
    <div class="active item">首頁</div>
    <a class="item">關於</a>
    <a class="item">工作</a>
    <a class="item">團隊</a>
</div>`,
            mark: 'link, active',
        },
        {
            type       : normal,
            title      : '內容',
            description: '清單包含了各式各樣的內容。',
            link       : false
        },
        {
            type       : small,
            title      : '項目',
            description: `項目是清單中最基本的內容。`,
            link       : 'item'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <div class="item">英梨梨</div>
    <div class="item">詩羽</div>
    <div class="item">加藤惠</div>
</div>`,
            mark  : 'item'
        },
        {
            type       : small,
            title      : '圖示',
            description: `清單內也可以擺放圖示。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <a class="item">
        <i class="help icon"></i>
        <div class="content">
            <div class="header">浮動圖示</div>
            <div class="description">這串文字會有一個左邊距，用來確保和你的圖示不會靠地太近。</div>
        </div>
    </a>
    <a class="item">
        <i class="right triangle icon"></i>
        <div class="content">
            <div class="header">圖示對齊</div>
            <div class="description">浮動圖示預設貼齊上方。想看看效果的話這個範例就是了。</div>
        </div>
    </a>
    <div class="item">
        <i class="help icon"></i>
        圖示同行文字。
    </div>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '圖片',
            description: `清單的項目可以包含圖片。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="content">
            <a class="header">Yami Odymel</a>
            <div class="description">正在遊玩 <a><b>Battlefield 1</b></a>。</div>
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="content">
            <a class="header">Mac Taylor</a>
            <div class="description">正在研發 <a><b>Alan Wakeup</b></a>。</div>
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="content">
            <a class="header">Karisu</a>
            <div class="description">正在觀看 <a><b>麻辣鮮師</b></a>。</div>
        </div>
    </div>
</div>`,
            mark: 'image'
        },
        {
            type       : small,
            title      : '連結',
            description: `清單裡面的項目可以是連結。`,
            link       : 'link'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <a class="item">什麼是 FAQ？</a>
    <a class="item">誰是我們的客戶？</a>
    <a class="item">我們的辦公室於何地？</a>
</div>
<br>
<div class="ts list">
    <div class="item">
        <a class="header">標題</a>
        <div class="description">
          在我們的 <a>註釋中</a> 按下吧！
        </div>
    </div>
    <div class="item">
        <a class="header">知道更多</a>
        <div class="description">
          想知道這個網站的更多請參閱 <a>我們的 FAQ 頁面</a>。
        </div>
    </div>
</div>`,
            remove: '<br>'
        },
        {
            type       : small,
            title      : '標題',
            description: `清單的項目可以包含一個標題。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <div class="item">
        <div class="header">巫師聯盟總部</div>
        電腦專家俱樂部 // 巫術實驗室
    </div>
    <div class="item">
        <div class="header">YSITD</div>
        Young Students' IT Discussion
    </div>
    <div class="item">
        <div class="header">HentaiDB</div>
        Official supergroup of @HentaiDB project.
    </div>
</div>`,
            mark  : 'header'
        },
        {
            type       : small,
            title      : '註釋',
            description: `清單的項目可以包含註釋。`,
            link       : 'description'
        },
        {
            type: 'example',
            code: `<div class="ts list">
    <div class="item">
        <i class="map marker icon"></i>
        <div class="content">
            <a class="header">台北 101</a>
            <div class="description">一根每到跨年就會變成金蔥棒的台灣知名柱子。</div>
        </div>
    </div>
    <div class="item">
        <i class="map marker icon"></i>
        <div class="content">
            <a class="header">台東</a>
            <div class="description">不錯的休閒旅遊地點，連我都想去。</div>
        </div>
    </div>
    <div class="item">
        <i class="map marker icon"></i>
        <div class="content">
            <a class="header">高雄</a>
            <div class="description">大家有著不錯的熱情。</div>
        </div>
    </div>
    <div class="item">
        <i class="map marker icon"></i>
        <div class="content">
            <a class="header">台南</a>
            <div class="description">小吃是台灣最好吃的，你說不好吃？吃慶記啦，阿靠夭那是台中。</div>
        </div>
    </div>
</div>`,
            mark  : 'description'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '清單具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '水平清單',
            description: `清單可以是水平排列的。`,
            link       : 'horizontal'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal list">
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="content">
            <div class="header">Yami Odymel</div>
            研發 2016 始春的人
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="content">
            <div class="header">Mac Taylor</div>
            好基友
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="content">
            <div class="header">Val Pyen</div>
            OSU! 喜好者
        </div>
    </div>
</div>`,
            mark: 'horizontal'
        },
        {
            type       : tiny,
            title      : '請試著加上排序',
            description: `如果你希望水平清單有排序的話，你也可以這樣使用。`
        },
        {
            type: 'example',
            code: `<div class="ts ordered horizontal list">
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="content">
            <div class="header">Yami Odymel</div>
            研發 2016 始春的人
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="content">
            <div class="header">Mac Taylor</div>
            好基友
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="content">
            <div class="header">Val Pyen</div>
            OSU! 喜好者
        </div>
    </div>
</div>`,
            mark: 'ordered'
        },
        {
            type       : tiny,
            title      : '水平清單和黑點',
            description: `水平清單也可以搭配黑點。`
        },
        {
            type: 'example',
            code: `<div class="ts horizontal bulleted link list">
    <a class="item">
        使用者條約
    </a>
    <a class="item">
        隱私政策
    </a>
    <a class="item">
        聯繫我們
    </a>
</div>`,
            mark: 'horizontal, bulleted'
        },
        {
            type       : small,
            title      : '反色',
            description: `清單可以是反色的，用在不同背景色的時候。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted segment">
    <div class="ts inverted relaxed divided list">
        <div class="item">
            <div class="content">
                <div class="header">Cloud 9</div>
                還不錯的線上 IDE 和雲端服務。
            </div>
        </div>
        <div class="item">
            <div class="content">
                <div class="header">Facebook</div>
                你認真的嗎？
            </div>
        </div>
        <div class="item">
            <div class="content">
                <div class="header">ВКонтакте</div>
                朝向獨裁邁進的俄羅斯社群平台。
            </div>
        </div>
    </div>
</div>`,
            mark: 'inverted'
        },
        {
            type       : small,
            title      : '可選擇的',
            description: `清單可以看起來像可供選擇的。`,
            link       : 'selection'
        },
        {
            type: 'example',
            code: `<div class="ts middle aligned selection list">
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="content">
            <div class="header">Yami Odymel</div>
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="content">
            <div class="header">Mac Taylor</div>
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="content">
            <div class="header">Ruby</div>
        </div>
    </div>
</div>`,
            mark: 'selection'
        },
        {
            type       : small,
            title      : '寬鬆',
            description: `一個間距較大的寬鬆清單。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts relaxed list">
    <div class="item">天野望</div>
    <div class="item">火井向百合</div>
    <div class="item">成海遙香</div>
</div>`,
            mark: 'relaxed'
        },
        {
            type       : small,
            title      : '分隔的',
            description: `帶有分隔線的清單。`,
            link       : 'divided'
        },
        {
            type: 'example',
            code: `<div class="ts divided list">
    <div class="item">千導院楓</div>
    <div class="item">粒櫻杏子</div>
    <div class="item">若葉昴</div>
</div>
<br>
<div class="ts relaxed divided list">
    <div class="item">英梨梨</div>
    <div class="item">詩羽</div>
    <div class="item">加藤惠</div>
</div>`,
            mark: 'divided, relaxed divided'
        },
        {
            type       : small,
            title      : '網格的',
            description: `像網格一樣清單。`,
            link       : 'celled'
        },
        {
            type: 'example',
            code: `<div class="ts celled list">
    <div class="item">千導院楓</div>
    <div class="item">粒櫻杏子</div>
    <div class="item">若葉昴</div>
</div>
<br>
<div class="ts relaxed celled list">
    <div class="item">英梨梨</div>
    <div class="item">詩羽</div>
    <div class="item">加藤惠</div>
</div>`,
            mark: 'celled, relaxed celled'
        },
        {
            type       : small,
            title      : '更進階的網格用法',
            description: `像網格一樣清單。`
        },
        {
            type: 'example',
            code: `<div class="ts celled ordered list">
    <div class="item">貓咪</div>
    <div class="item">馬</div>
    <div class="item">狗
        <div class="list">
            <div class="item">月月</div>
            <div class="item">柴犬</div>
            <div class="item">吻仔魚</div>
        </div>
    </div>
</div>
<br>
<div class="ts celled horizontal list">
    <div class="item">關於我們</div>
    <div class="item">聯絡方式</div>
    <div class="item">支援需求</div>
</div>`,
            mark  : 'ordered',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `不同的尺寸大小。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini horizontal list">
    <div class="item">迷你</div>
    <div class="item">迷你</div>
</div><br>
<div class="ts tiny horizontal list">
    <div class="item">微小</div>
    <div class="item">微小</div>
</div><br>
<div class="ts small horizontal list">
    <div class="item">小型</div>
    <div class="item">小型</div>
</div><br>
<div class="ts medium horizontal list">
    <div class="item">適中</div>
    <div class="item">適中</div>
</div><br>
<div class="ts large horizontal list">
    <div class="item">較大</div>
    <div class="item">較大</div>
</div><br>
<div class="ts big horizontal list">
    <div class="item">大型</div>
    <div class="item">大型</div>
</div><br>
<div class="ts huge horizontal list">
    <div class="item">超大</div>
    <div class="item">超大</div>
</div><br>
<div class="ts massive horizontal list">
    <div class="item">重量級</div>
    <div class="item">重量級</div>
</div>`,
            mark  : 'mini, tiny, small, medium, large, big, huge, massive',
            remove: '<br>'
        },
        {
            type       : normal,
            title      : '內容外觀',
            description: '你可以點綴清單內容的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '垂直對齊',
            description: `項目的內容可以調整垂直對齊。`,
            link       : 'item'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal list">
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="top aligned content">
            向上置齊
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="middle aligned content">
            置中
        </div>
    </div>
    <div class="item">
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="bottom aligned content">
            向下置齊
        </div>
    </div>
</div>`,
            mark  : 'top aligned, middle aligned, bottom aligned'
        },
        {
            type       : small,
            title      : '浮動',
            description: `項目的內容可以向左或向右浮動。`,
            link       : 'item'
        },
        {
            type: 'example',
            code: `<div class="ts middle aligned divided list">
    <div class="item">
        <div class="right floated content">
            <div class="ts button">新增</div>
        </div>
        <img class="ts avatar image" src="${imgPlaceholderUser}">
        <div class="content">
            Aoi
        </div>
    </div>
    <div class="item">
        <div class="right floated content">
            <div class="ts button">新增</div>
        </div>
        <img class="ts avatar image" src="${imgPlaceholderUser2}">
        <div class="content">
            Orenji
        </div>
    </div>
    <div class="item">
        <div class="right floated content">
            <div class="ts button">新增</div>
        </div>
        <img class="ts avatar image" src="${imgPlaceholderUser3}">
        <div class="content">
            Shirone
        </div>
    </div>
</div>`,
            mark  : 'right floated'
        },
    ]
}