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
        title   : '留言',
        subTitle: 
        `
            如何引發網路戰爭？一，留言；二，等待。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>你可以變換留言中時間和文字的位置，</p>
                <p>這些在下面都有範例可供參考。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '留言具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的留言。`,
            link       : 'comment'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="metadata">
                <div>2 天前</div>
                <div>
                    <i class="star icon"></i>
                    5 次收藏
                </div>
            </div>
            <div class="text">
                你的思想不應該只屬於現在這個時間。
            </div>
        </div>
    </div>
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser2}">
        </a>
        <div class="content">
            <a class="author">Karisu</a>
            <div class="metadata">
                <div>42 分鐘前</div>
            </div>
            <div class="text">
                有反對的聲音，世界才能中立。
            </div>
        </div>
    </div>
</div>`,
            mark: 'comments, comment'
        },
        {
            type       : normal,
            title      : '內容',
            description: '留言包含了許多不同的內容。',
            link       : false
        },
        {
            type       : small,
            title      : '頭像',
            description: `用以顯示發言者、圖片的一個內容區塊。`,
            link       : 'avatar'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser3}">
        </div>
    </div>
</div>`,
            mark: 'avatar'
        },
        {
            type       : small,
            title      : '作者',
            description: `顯示發言者的名稱。`,
            link       : 'author'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <div class="author">Yami Odymel</div>
        </div>
    </div>
</div>`,
            mark: 'author'
        },
        {
            type       : small,
            title      : '內容',
            description: `擺放留言內容的區塊。`,
            link       : 'text'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">     
        <div class="avatar">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="content">
            <a class="author">Karisu</a>
            <div class="text">發現自己做不到是進步過程中的一環。</div>
        </div>
    </div>
</div>`,
            mark: 'text'
        },
        {
            type       : small,
            title      : '中繼資料',
            description: `用以擺放時間、一些有關連的小型資料。`,
            link       : 'metadata'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="author">亞凡芽</a>
            <div class="metadata">
                <div> 42 分鐘前 </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'metadata'
        },
        {
            type       : tiny,
            title      : '帶點中繼資料',
            description: `中繼資料可以有「子彈點」或是「中點」來做區隔。`
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="bulleted metadata">
                <div>3 天前</div>
                <div>5 個讚</div>
            </div>
            <div class="text">直到你成功之前，人們都是瞎子。</div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="content">
            <a class="author">比爾蓋飯</a>
            <div class="middoted metadata">
                <div>1 月前</div>
                <div>已收藏</div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'bulleted metadata, middoted metadata'
        },
        {
            type       : small,
            title      : '動作',
            description: `一個可以擺放這個留言所可以執行動作的區塊。`,
            link       : 'actions'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="author">吳雨藍</a>
            <div class="metadata">
                <div>42 分鐘前</div>
            </div>
            <div class="text">
                成功的開始不在於創意，而是現在。
            </div>
            <div class="actions">
                <a>回覆</a>
                <a>移除</a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'actions'
        },
        {
            type       : tiny,
            title      : '帶點動作',
            description: `動作可以有「子彈點」或是「中點」來做區隔。`
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="text">輸的時候失去最多的就是理智。</div>
            <div class="bulleted actions">
                <a>檢舉</a>
                <a>編輯</a>
                <a>移除</a>
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="text">對這個世界感到失望，是躍出舞台的第一步。</div>
            <div class="middoted actions">
                <a>回覆</a>
                <a>移除</a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'bulleted actions, middoted actions'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '留言擁有一些不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '同列文字',
            description: `留言的文字可以與作者名稱同列。`,
            link       : 'inline'
        },
        {
            type: 'example',
            code: `<div class="ts comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser3}">
        </a>
        <div class="content">
            <a class="author">橙希</a>
            <div class="inline text">
                我的信仰是自己，你呢？
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'inline text'
        },
        {
            type       : small,
            title      : '主題性質',
            description: `留言可以是一個主題性質，這將允許你的留言帶有層級制度，留言中可帶有子留言。`,
            link       : 'threaded'
        },
        {
            type: 'example',
            code: `<div class="ts threaded comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="text">
                準備向令一個平行世界的你道歉，因為你將在這個世界有所作為。
            </div>
        </div>
        <div class="comments">
            <div class="comment">
                <div class="avatar">
                    <img src="${imgPlaceholderUser2}">
                </div>
                <div class="content">
                    <a class="author">橙希</a>
                    <div class="text">
                        把 S 鍵拔掉，看是要向著 A 或 D 橫走，還是直接朝著 W 的方向前進？
                    </div>
                </div>
                <div class="comment">
                    <div class="avatar">
                        <img src="${imgPlaceholderUser3}">
                    </div>
                    <div class="content">
                        <a class="author">吳雨藍</a>
                        <div class="text">
                            第一個覺得檸檬是食物的人一定是個被虐狂。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'threaded, comments'
        },
        {
            type       : small,
            title      : '分隔的',
            description: `留言可以帶有分隔線區分來和下一個留言做區分。`,
            link       : 'divided'
        },
        {
            type: 'example',
            code: `<div class="ts divided comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="text">
                你是一個漁夫。
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="text">
                如果你有去釣魚大賽，你可能會被禁止進入：<br>
                「我們不歡迎職業選手」
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="text">
                你很機車人
            </div>
        </div>
    </div>
</div>`,
            mark: 'divided'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `留言可以有不同的尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts tiny comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ts small comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser2}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ts medium comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser3}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ts large comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ts big comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser2}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ts huge comments">
    <div class="comment">
        <a class="avatar">
            <img src="${imgPlaceholderUser3}">
        </a>
        <div class="content">
            <a class="author">Mac Taylor</a>
            <div class="inline text">
                你是一個漁夫。
            </div>
            <div class="middoted actions">
                <a class="reply">回應</a>
                <a class="save">收藏</a>
                <a>
                    <i class="expand icon"></i>
                    全尺寸檢視
                </a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'tiny, small, medium, large, big, huge'
        },
    ]
}