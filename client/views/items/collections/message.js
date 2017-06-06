var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var imgPlaceholderUser   = require('../../images/image_placeholder_user.png')

export default
{
    header:
    {
        title   : '訊息',
        subTitle:
        `
            傳遞訊息至遠方。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '訊息有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '訊息',
            description: `一個最基本的訊息。`,
            link       : 'message'
        },
        {
            type: 'example',
            code: `<div class="ts message">
    <div class="header">靜思語</div>
    <p>輸的時候失去最多的就是理智。</p>
</div>`,
            mark: 'message'
        },
        {
            type       : small,
            title      : '基本',
            description: `訊息可以只留下基本結構。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<div class="ts basic message">
    直到你成功之前，人們都是瞎子。
</div>`,
            mark: 'basic'
        },
        {
            type       : small,
            title      : '外框線',
            description: `訊息可以只有外框線。`,
            link       : 'outlined'
        },
        {
            type: 'example',
            code: `<div class="ts outlined message">
    直到你成功之前，人們都是瞎子。
</div>`,
            mark: 'outlined'
        },
        {
            type       : small,
            title      : '結構化',
            description: `訊息能夠看起來更具有結構，並帶有更多附加動作。`,
            link       : 'structured'
        },
        {
            type: 'example',
            code: `<div class="ts structured message">
    <div class="avatar">
        <img src="${imgPlaceholderUser}">
    </div>
    <div class="content">
        <div class="text">
            <p>有位使用者跑到了你的小屋並向你道聲早安，</p>
            <p>但就在你卸下心防的同時，你意識到有什麼東西從身邊消失了。</p>
        </div>
        <div class="actions">
            <a class="primary" href="#!">檢查道具欄</a>
            <a href="#!">叫住對方</a>
        </div>
    </div>
</div>`,
            mark: 'structured'
        },
        {
            type       : small,
            title      : '語氣',
            description: `訊息也可以帶有不同的語氣。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary message">
    <div class="header">現已開始</div>
    <p>目前「osu! World Cup 2015」已開始進行直播。</p>
</div>
<div class="ts warning message">
    <div class="header">您需要先登入！</div>
    <p>不好意思，您需要先登入才能夠執行這項動作。</p>
</div>
<div class="ts info message">
    <div class="header">需要一些時間</div>
    <p>你所上傳的影片會在稍後開始進行轉檔動作。</p>
</div>`,
            mark: 'primary, info, warning'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `訊息可以有肯定或是否定的語氣。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive message">
    <div class="header">恭喜！</div>
    <p>你已經註冊成功。</p>
</div>
<div class="ts negative message">
    <div class="header">此文章已被刪除</div>
    <p>你欲拜訪的文章因違反規定而遭到刪除。</p>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '反色',
            description: `反色語氣可以用在訊息上。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted message">
    <div class="header">系統升級中</div>
    <p>搭啦啦！系統正在升級！</p>
</div>
<div class="ts inverted primary message">
    <div class="header">現已開始</div>
    <p>目前「osu! World Cup 2015」已開始進行直播。</p>
</div>
<div class="ts inverted warning message">
    <div class="header">您需要先登入！</div>
    <p>不好意思，您需要先登入才能夠執行這項動作。</p>
</div>
<div class="ts inverted info message">
    <div class="header">需要一些時間</div>
    <p>你所上傳的影片會在稍後開始進行轉檔動作。</p>
</div>
<div class="ts inverted positive message">
    <div class="header">恭喜！</div>
    <p>你已經註冊成功。</p>
</div>
<div class="ts inverted negative message">
    <div class="header">此文章已被刪除</div>
    <p>你欲拜訪的文章因違反規定而遭到刪除。</p>
</div>`,
            mark: 'inverted'
        },
        {
            type       : small,
            title      : '次要',
            description: `訊息的重要程度可以是次要的。`,
            link       : 'secondary'
        },
        {
            type: 'example',
            code: `<div class="ts secondary message">
    <div class="header">系統升級中</div>
    <p>搭啦啦！系統正在升級！</p>
</div>
<div class="ts secondary primary message">
    <div class="header">現已開始</div>
    <p>目前「osu! World Cup 2015」已開始進行直播。</p>
</div>
<div class="ts secondary inverted positive message">
    <div class="header">恭喜！</div>
    <p>你已經註冊成功。</p>
</div>
<div class="ts secondary inverted negative message">
    <div class="header">此文章已被刪除</div>
    <p>你欲拜訪的文章因違反規定而遭到刪除。</p>
</div>`,
            mark: 'secondary'
        },
        {
            type       : small,
            title      : '清單',
            description: `一個帶有清單的訊息。`,
            link       : 'list'
        },
        {
            type: 'example',
            code: `<div class="ts message">
    <div class="header">現已推出</div>
    <div class="list">
        <li>虛擬實境擴充</li>
        <li>肥宅模擬器 2016</li>
    </div>
</div>`,
            mark: 'list'
        },
        {
            type       : small,
            title      : '圖示',
            description: `一個帶有圖示的訊息。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts icon message">
    <i class="gift icon"></i>
    <div class="content">
        <div class="header">最新禮物</div>
        <p>你收到了來自 ThisAV 的禮物。</p>
    </div>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '可關閉的',
            description: `一個可以關閉的訊息。`,
            link       : 'dismissable'
        },
        {
            type: 'example',
            code: `<div class="ts dismissable message">
    <i class="close icon"></i>
    <div class="header">
        不喜歡我？
    </div>
    <p>那就關閉我吧。</p>
</div>`,
            mark: 'dismissable, close'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '訊息帶有一些不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '隱藏',
            description: `用來隱藏訊息。`,
            link       : 'message'
        },
        {
            type: 'example',
            code: `<div class="ts hidden message">
    你看不見我。
</div>`,
            mark: 'hidden'
        },
        {
            type       : normal,
            title      : '內容',
            description: '訊息裡面可以帶有不同的內容。',
            link       : false
        },
        {
            type       : small,
            title      : '文字',
            description: `訊息裡可以擺放基本的文字，這只用於結構較複雜的訊息，通常你不需要這麼做。`,
            link       : 'text'
        },
        {
            type: 'example',
            code: `<div class="ts message">
    <div class="content">
        <div class="text">
            雖然開始是一樣的，但經歷令我們成為了不同人。
        </div>
    </div>
</div>`,
            mark: 'content, text'
        },
        {
            type       : small,
            title      : '動作',
            description: `你能夠在訊息的右側安插一些動作按鈕。`,
            link       : 'actions'
        },
        {
            type: 'example',
            code: `<div class="ts message">
    <div class="content">
        <div class="text">
            我們已接獲版權警告並將此影片進行消音處理，這可能導致你的影片觀看次數下降。
        </div>
        <div class="actions">
            <button class="ts small inverted basic negative button">重新上訴</button>
        </div>
    </div>
</div>`,
            mark: 'actions'
        },
        {
            type       : small,
            title      : '圖示',
            description: `結構化的訊息內可以擺放圖示。`,
            link       : 'structured-icon'
        },
        {
            type: 'example',
            code: `<div class="ts structured message">
    <div class="icon">
        <i class="trash icon"></i>
    </div>
    <div class="content">
        <div class="text">
            你已成功地將文章移動至垃圾桶了。
        </div>
    </div>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '頭像',
            description: `訊息裡也能夠擺置一個使用者頭像。`,
            link       : 'structured-avatar'
        },
        {
            type: 'example',
            code: `<div class="ts structured message">
    <div class="avatar">
        <img src="${imgPlaceholderUser}">
    </div>
    <div class="content">
        <div class="text">
            你的朋友剛才在你的文章中留言。
        </div>
        <div class="actions">
            <a class="primary" href="#!">查看</a>
            <a href="#!">下次別提醒我</a>
        </div>
    </div>
</div>`,
            mark: 'avatar'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '訊息有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '輕巧版',
            description: `讓訊息透過文字長度來決定寬度。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<div class="ts compact message">
    可惡，好想知道她的名字啊！
</div>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '淡化',
            description: `訊息可以被淡化。`,
            link       : 'faded'
        },
        {
            type: 'example',
            code: `<div class="ts faded message">
    當你接受了現況，就等於接受了死亡。
</div>`,
            mark: 'faded'
        },
        {
            type       : small,
            title      : '縮減',
            description: `訊息的內距可以省去。`,
            link       : 'fitted'
        },
        {
            type: 'example',
            code: `<div class="ts fitted message">
    這個訊息沒有內距。
</div>
<div class="ts horizontally fitted message">
    移除水平內距。
</div>
<div class="ts vertically fitted message">
    這個訊息沒有垂直內距。
</div>`,
            mark: 'horizontally fitted, vertically fitted, fitted'
        },
        {
            type       : small,
            title      : '無邊框',
            description: `訊息可以沒有邊框。`,
            link       : 'borderless'
        },
        {
            type: 'example',
            code: `<div class="ts borderless message">
    這個訊息沒有邊框。
</div>`,
            mark: 'borderless'
        },
        {
            type       : small,
            title      : '附著',
            description: `訊息可以附著在其他元素上下。`,
            link       : 'attached'
        },
        {
            type: 'example',
            code: `<div class="ts padded top attached message">
    <div class="header">
        正在編輯：關於我
    </div>
    <p>請檢查以下「關於我」是否正確。</p>
</div>
<div class="ts bottom attached segment">
    始春到底是什麼？始春，絕不向日曆妥協始春，絕不向預告低頭只要 CM3D2 在手，就能夠永遠地始春始春是一種精神，一種態度一種革命，一種叛逆。於是我了解「跳票、延期、三螢幕，這就是始春。」
</div>
<br><br>
<div class="ts fluid top attached input">
    <input type="text" placeholder="監護人姓名">
</div>
<div class="ts warning bottom attached message">
    當有監護人時請填寫此欄位。
</div>`,
            mark: 'top attached message, bottom attached message',
            remove: '<br><br>'
        },
        {
            type       : small,
            title      : '附著增加內距',
            description: `訊息在附著的情況下會縮減內距以避免過大，這個時候你能夠增加內距來令訊息大於他們所附著的元素。`,
            link       : 'attached-padded'
        },
        {
            type: 'example',
            code: `<div class="ts top attached message">
    基本內距
</div>
<div class="ts attached segment">
    文字。
</div>
<div class="ts padded attached message">
    增加內距
</div>
<div class="ts attached segment">
    文字。
</div>
<div class="ts very padded bottom attached message">
    超級內距
</div>`,
            mark: 'attached message, very padded, padded'
        },
        {
            type       : small,
            title      : '水平對齊',
            description: `你可以改變訊息中的文字水平對齊，例如置左、置右、或置中。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts left aligned message">
    我置左對齊。
</div>
<div class="ts center aligned message">
    我置中對齊。
</div>
<div class="ts right aligned message">
    我置右對齊。
</div>`,
            mark: 'left aligned, center aligned, right aligned'
        },
        {
            type       : small,
            title      : '浮起',
            description: `訊息可以看起來像是浮起來一般。`,
            link       : 'floating'
        },
        {
            type: 'example',
            code: `<div class="ts floating message">
    我好像浮起來了。
</div>`,
            mark: 'floating'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `訊息有提供多種尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini message">
    迷你
</div>
<div class="ts tiny message">
    微小
</div>
<div class="ts small message">
    小的
</div>
<div class="ts medium message">
    適中
</div>
<div class="ts large message">
    大的
</div>
<div class="ts big message">
    大型
</div>
<div class="ts huge message">
    巨大
</div>
<div class="ts massive message">
    重量級
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massives'
        },
    ]
}