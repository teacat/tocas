var normal = 'normal'
var large = 'large'
var small = 'small'
var tiny = 'tiny'
var source = 'source'
var example = 'example'
var imgPlaceholderUser = require('../../images/image_placeholder_user.png')
var imgPlaceholderSquare = require('../../images/image_placeholder_1-1.png')

export default {
    header: {
        title: '對話視窗',
        subTitle: `
            請問大家知道你只有一公分嗎？「知道」、「不知道」。
        `
    },
    html: [{
            type: large,
            title: '說明',
            description: `
                <p>通常來說只有在你希望阻止、提醒、警告使用者的時候才該用上對話視窗，你不應該在為了省去自己的麻煩時直接用上對話視窗來進行相關動作，這是一個很不好的習慣。</p>
                <p>對話視窗在任何裝置上都非常的符合，所以毋需擔心有跑版的問題。</p>
            `
        },
        {
            type: normal,
            title: '種類',
            description: '一個對話視窗有多種類別。',
            link: false
        },
        {
            type: small,
            title: '對話視窗',
            description: `最基本的對話視窗。帶有 <span class="ts horizontal label">[open]</span> 元素標籤的對話視窗會被顯示出來。`,
            link: 'modal'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        逼啪拉畢叭啦霹拉吧
    </div>
    <div class="content">
        <p>到水的車風、天小望再，個院們著福！要清我個夫後於、說媽平神線連時該：光四報接。大親放書光？不議書組巴口保能近細，卻實到式石特約過。</p>
        <p>代你是走是：路火改大兒地結後也傷車、明心沒教的童了共這英們點縣慢公早出光了得引多經！處技北夫們十是入就重得然親……法美機的義是小唱當解土量同吃，和樣做新機子他市很失吃出家。仍思老木海和部成是市的國兒生球要又辦中有對父色……形非帶海了。話安生當我球起。子立過財量展美義；那康自從遠飛心的一。</p>
        <p>旅一的四課，開地還，的取理活數度青天化民家向的專自到及學，縣光自分個發：條越資大無庭；但進臺方隊的風斷此的小……一背書要西表靈：要藝太童汽也老天好住？兒沒生月路把時？不他謝、意強兩而一機，卻運持院是品的她腳。進和問半葉一所希知，景是育不、市音個在費我星國增成受呢來我子片易黃頭著，停可成人發才己金過位關長不一得主，好成引題於手魚，文指者價然、常首能國達另了石？且年養？好看了不、產行和越早反前門有，放轉國引環流的力是直算不福然。的館體後在利遠員我經現運懷況指正念像媽頭是中經！</p>
    </div>
    <div class="actions">
        <button class="ts deny button">
            不
        </button>
        <button class="ts positive button">
            是的
        </button>
    </div>
</dialog>`,
            tagMark: 'dialog',
            mark: 'modal'
        },
        {
            type: small,
            title: '基本',
            description: `對話視窗也能夠看起來只有基本結構且背景是透明的（範例加上了反色背景避免看不見文字）。`,
            link: 'basic'
        },
        {
            type: 'example',
            inverted: true,
            code: `<dialog class="ts basic fullscreen modal" open>
    <div class="ts icon header">
        <i class="smile icon"></i>
        您同意「合理使用條約」嗎
    </div>
    <div class="content">
        <p>保障任何人的著作權，其中包括二次創作，二次創作僅可在原作者未聲明否決下進行發佈和創作，在未經原作允許下衍生任何具有原作之內容，基於衍生理念與內容為判決要點，
原作必須基於合理使用之理念提出移除、上訴任何非符合合理使用概念的衍生內容，合理使用的理念如下：使用目的及性質其著重點在於內容是否有所轉化，如衍生創作另有新意，非僅複製原作內容。版權作品性質以真實、事實所闡述之作品較虛構作品來的能夠符合合理使用。使用版權作品的多寡引用少量的原創著作比起引用大量來要的符合合理使用，但倘若原創著作成為衍生著作之核心內容，即使少量的原創著作被引用，也較不可能符合合理使用之原則。使用行為對於版權作品的市場或價值之影響透過原創著作的內容而進行獲利並造成原創著作部分損害，較不符合合理使用之原則。</p>
    </div>
    <div class="actions">
        <button class="ts inverted basic deny button">
            不
        </button>
        <button class="ts inverted basic positive button">
            是的
        </button>
    </div>
</dialog>`,
            mark: 'basic'
        },
        {
            type: normal,
            title: '內容',
            description: '對話視窗可以有多種屬性的內容。',
            link: false
        },
        {
            type: small,
            title: '標題',
            description: `對話視窗的標題段落。`,
            link: 'header'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        對話視窗標題
    </div>
</dialog>`,
            mark: 'header'
        },
        {
            type: small,
            title: '內容',
            description: `對話視窗的主要敘述都會被放在內容區塊中。`,
            link: 'content'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        吃過早餐了嗎？
    </div>
    <div class="content">
        如果沒有，還請務必嚐嚐我們的招牌：「嘉明的味道」。
    </div>
</dialog>`,
            mark: 'content'
        },
        {
            type: small,
            title: '圖片內容',
            description: `對話視窗裡面可以有圖片內容。`,
            link: 'image-content'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        這是你嗎？
    </div>
    <div class="image content">
        <div class="ts medium image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="description">
            <div class="ts header">我們在照片中偵測到了你。</div>
            <p>這張照片看起來裡面包含著你的人像，如果你願意的話我們可以自動將該照片發佈至 <a href="https://www.gravatar.com" target="_blank">gravatar</a> 並替換你原先的頭像。</p>
            <p>你希望這麼做嗎？</p>
        </div>
    </div>
</dialog>`,
            mark: 'image content, description, image'
        },
        {
            type: small,
            title: '動作',
            description: `<p>對話視窗裡的動作區塊用來提供確認、取消的按鈕，令使用者在該區塊進行操作與回應。</p>`,
            link: 'action'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        確定檢舉嗎？
    </div>
    <div class="content">
        <p>你正打算要檢舉：「洨洨安萬萬歲⋯⋯」文章，如果你確定這篇文章違反伊繁星最高協議即可進行檢舉，倘若抱有任何遲疑的態度請在送出前再度確認是否有違反任何規範的嫌疑。</p>
    </div>
    <div class="actions">
        <button class="ts deny button">
            不
        </button>
        <button class="ts button">
            檢閱協議內容
        </button>
        <button class="ts positive button">
            是的
        </button>
    </div>
</dialog>`,
            mark: 'actions, positive, deny'
        },
        {
            type: tiny,
            title: '按鈕群組',
            description: `你也能夠在動作區塊中擺放按鈕群組。`,
            link: 'action-buttons'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
       我是對話視窗！
    </div>
    <div class="content">
        <p>你打開了一個帶有按鈕群組的對話視窗，你還能讓這些按鈕還可以在手機版上自動層疊！真是夭壽讚！</p>
    </div>
    <div class="actions">
        <div class="ts fluid separated stackable buttons">
            <button class="ts deny button">
                不
            </button>
            <button class="ts positive button">
                好
            </button>
        </div>
    </div>
</dialog>`,
            mark: 'buttons'
        },
        {
            type: small,
            title: '關閉按鈕',
            description: `對話視窗可以帶有一個關閉按鈕，在手機版時這個按鈕會被放入視窗內。`,
            link: 'close'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <i class="close icon"></i>
    <div class="header">
        範例視窗
    </div>
    <div class="image content">
        <p>這個範例的關閉按鈕被遮住了，建議使用行動裝置觀看此範例。或者你也可以在下面的 JavaScript 範例中呼叫對話視窗來查看有關閉按鈕的範例。</p>
    </div>
    <div class="actions">
        <button class="ts deny button">
            不
        </button>
        <button class="ts button">
            檢閱協議內容
        </button>
        <button class="ts positive button">
            是的
        </button>
    </div>
</dialog>`,
            mark: 'close icon'
        },
        {
            type: normal,
            title: '外觀',
            description: '你可以更改對話視窗的外觀點綴。',
            link: false
        },
        {
            type: small,
            title: '全螢幕等寬',
            description: `對話視窗的寬度可以直接符合螢幕最寬的寬度。`,
            link: 'fullscreen'
        },
        {
            type: 'example',
            code: `<dialog class="ts fullscreen modal" open>
    <div class="header">
        全螢幕等寬
    </div>
    <div class="content">
        這個對話視窗會是 100% 寬度喔。
    </div>
</dialog>`,
            mark: 'fullscreen'
        },
        {
            type: small,
            title: '尺寸',
            description: `對話視窗有不同的尺寸大小，這可以用來避免內容文字過多而撐寬對話視窗導致閱讀障礙，這些都能夠在行動裝置上良好地符合。沒有特別標注尺寸的對話視窗寬度會依照內容而定。`,
            link: 'sizes'
        },
        {
            type: 'example',
            code: `<dialog class="ts mini modal" open>
    <div class="header">
        迷你
    </div>
    <div class="content">
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
    </div>
</dialog>
<br>
<dialog class="ts tiny modal" open>
    <div class="header">
        微小
    </div>
    <div class="content">
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
    </div>
</dialog>
<br>
<dialog class="ts small modal" open>
    <div class="header">
        小的
    </div>
    <div class="content">
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
    </div>
</dialog>
<br>
<dialog class="ts large modal" open>
    <div class="header">
        大的
    </div>
    <div class="content">
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
        內容內容內容內容內容內容內容內容內容內容內容內容內容內容
    </div>
</dialog>`,
            mark: 'mini, tiny, small, large'
        },
        {
            type: normal,
            title: 'JavaScript',
            description: '對話視窗有幾個 JavaScript 選項。',
            link: false
        },
        {
            type: small,
            title: '顯示與隱藏',
            description: `如果你希望這個對話視窗能夠彈出並且遮蔽背景，那麼你就需要將其包含在一個 <span class="ts horizontal label">.ts.modals.dimmer</span> 的淡化幕中。在淡化幕中的對話視窗預設是隱藏的，除非透過 JavaScript 呼叫該對話視窗才會顯示。
            <br>
            <table class="ts small stackable definition table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>註釋</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>show</td>
                            <td>顯示對話視窗。</td>
                        </tr>
                        <tr>
                            <td>hide</td>
                            <td>隱藏對話視窗。</td>
                        </tr>
                    </tbody>
                </table>`,
            link: 'hide-show'
        },
        {
            type: 'example',
            code: `<div class="ts modals dimmer">
    <dialog id="basicModal" class="ts basic modal" open>
        <i class="close icon"></i>
        <div class="ts icon header">
            <i class="smile icon"></i>
            您同意「合理使用條約」嗎
        </div>
        <div class="content">
            <p>保障任何人的著作權，其中包括二次創作，二次創作僅可在原作者未聲明否決下進行發佈和創作，在未經原作允許下衍生任何具有原作之內容，基於衍生理念與內容為判決要點，
    原作必須基於合理使用之理念提出移除、上訴任何非符合合理使用概念的衍生內容，合理使用的理念如下：使用目的及性質其著重點在於內容是否有所轉化，如衍生創作另有新意，非僅複製原作內容。版權作品性質以真實、事實所闡述之作品較虛構作品來的能夠符合合理使用。使用版權作品的多寡引用少量的原創著作比起引用大量來要的符合合理使用，但倘若原創著作成為衍生著作之核心內容，即使少量的原創著作被引用，也較不可能符合合理使用之原則。使用行為對於版權作品的市場或價值之影響透過原創著作的內容而進行獲利並造成原創著作部分損害，較不符合合理使用之原則。</p>
        </div>
        <div class="actions">
            <button class="ts inverted basic deny button">
                不
            </button>
            <button class="ts inverted basic positive button">
                是的
            </button>
        </div>
    </dialog>
</div>`,
            mark: 'ts modals dimmer'
        },
        {
            type: tiny,
            title: 'JavaScript',
            description: '接著像這樣呼叫對話視窗。',
            expandableExample: false
        },
        {
            type: source,
            executable: true,
            code: `ts('#basicModal').modal("show")`
        },
        {
            type: small,
            title: '可關閉的',
            description: `你可以讓使用者點擊周邊的淡化幕就關閉對話視窗。`,
            link: 'closable'
        },
        {
            type: 'example',
            code: `<div class="ts modals dimmer">
    <dialog id="testModal" class="ts closable tiny modal">
        <div class="content">
            <p>點擊淡化幕也能夠關閉這個視窗，因為這是個 <span class="ts horizontal label">closable</span> 對話視窗。</p>
        </div>
        <div class="actions">
            <button class="ts deny button">
                不
            </button>
            <button class="ts positive button">
                是的
            </button>
        </div>
    </dialog>
</div>`,
            mark: 'closable'
        },
        {
            type: tiny,
            title: 'JavaScript',
            description: '用和剛才差不多的方式呼叫對話視窗。',
            expandableExample: false
        },
        {
            type: source,
            executable: true,
            code: `ts('#testModal').modal("show")`
        },
        {
            type: small,
            title: '設置選項',
            description: `在預設對話視窗行為中只要是類別名稱為 <span class="ts horizontal label">.deny</span>、<span class="ts horizontal label">.negative</span>、<span class="ts horizontal label">.cancel</span> 的元素被按下都會呼叫<strong>取消回呼函式</strong>，而 <span class="ts horizontal label">.approve</span>、<span class="ts horizontal label">.positive</span>、<span class="ts horizontal label">.ok</span> 則會呼叫<strong>成功回呼函式</strong>，你能夠在選項中自行改變這一點。
            <br>
            <table class="ts small stackable definition table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>註釋</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>approve</td>
                            <td>會呼叫同意回呼函式的元素選擇器（預設：<span class="ts horizontal label">.approve, .positive, .ok</span>）</td>
                        </tr>
                        <tr>
                            <td>deny</td>
                            <td>會呼叫拒絕回呼函式的元素選擇器（預設：<span class="ts horizontal label">.deny, .negative, .cancel</span>）</td>
                        </tr>
                        <tr>
                            <td>onApprove</td>
                            <td>同意時所被呼叫的函式，如果這個函式回傳 <span class="ts horizontal label">false</span> 的話將不會關閉對話視窗。</td>
                        </tr>
                        <tr>
                            <td>onDeny</td>
                            <td>拒絕時所被呼叫的函式，如果這個函式回傳 <span class="ts horizontal label">false</span> 的話將不會關閉對話視窗。</td>
                        </tr>
                    </tbody>
                </table>`,
            link: 'options'
        },
        {
            type: 'example',
            code: `<div class="ts modals dimmer">
    <dialog id="optionModal" class="ts modal">
        <div class="header">
            逼啪拉畢叭啦霹拉吧
        </div>
        <div class="content">
            <p>到水的車風、天小望再，個院們著福！要清我個夫後於、說媽平神線連時該：光四報接。大親放書光？不議書組巴口保能近細，卻實到式石特約過。</p>
            <p>代你是走是：路火改大兒地結後也傷車、明心沒教的童了共這英們點縣慢公早出光了得引多經！處技北夫們十是入就重得然親……法美機的義是小唱當解土量同吃，和樣做新機子他市很失吃出家。仍思老木海和部成是市的國兒生球要又辦中有對父色……形非帶海了。話安生當我球起。子立過財量展美義；那康自從遠飛心的一。</p>
            <p>旅一的四課，開地還，的取理活數度青天化民家向的專自到及學，縣光自分個發：條越資大無庭；但進臺方隊的風斷此的小……一背書要西表靈：要藝太童汽也老天好住？兒沒生月路把時？不他謝、意強兩而一機，卻運持院是品的她腳。進和問半葉一所希知，景是育不、市音個在費我星國增成受呢來我子片易黃頭著，停可成人發才己金過位關長不一得主，好成引題於手魚，文指者價然、常首能國達另了石？且年養？好看了不、產行和越早反前門有，放轉國引環流的力是直算不福然。的館體後在利遠員我經現運懷況指正念像媽頭是中經！</p>
        </div>
        <div class="actions">
            <button class="ts deny button">
                不
            </button>
            <button class="ts positive button">
                是的
            </button>
        </div>
    </dialog>
</div>`,
        },
        {
            type: tiny,
            title: 'JavaScript',
            description: '接著呼叫對話視窗時，順帶把選項帶入呼叫函式中。',
            expandableExample: false
        },
        {
            type: source,
            executable: true,
            code: `ts('#optionModal').modal({
    approve: '.positive, .approve, .ok',
    deny  : '.negative, .deny, .cancel',
    onDeny: function() {
        alert("你一定要同意才行！");
        return false
    },
    onApprove: function() {
        alert("太好了！")
    }
}).modal("show")`
        },
    ]
}