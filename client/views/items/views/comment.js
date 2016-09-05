var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var infinityPicture1 = require('../../images/infinity-s/01.png')
var infinityPicture2 = require('../../images/infinity-s/02.png')
var infinityPicture3 = require('../../images/infinity-s/03.png')
var infinityPicture4 = require('../../images/infinity-s/04.png')
var infinityPicture5 = require('../../images/infinity-s/05.jpg')

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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="metadata">
                <div>2 天前</div>
                <div>
                    <i class="star icon"></i>
                    5 次收藏
                </div>
            </div>
            <div class="text">
                入稿版冬コミ新作ブランケットです。よろしくね。
            </div>
        </div>
    </div>
    <div class="comment">
        <a class="avatar">
            <img src="${infinityPicture2}">
        </a>
        <div class="content">
            <a class="author">いんふぃ™</a>
            <div class="metadata">
                <div>42 分鐘前</div>
            </div>
            <div class="text">
                普通に知ってる
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
            <img src="${infinityPicture1}">
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
            <img src="${infinityPicture2}">
        </div>
        <div class="content">
            <div class="author">いんふぃ™</div>
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
            <img src="${infinityPicture3}">
        </div>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="text">入稿版冬コミ新作ブランケットです。よろしくね。</div>
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
            <img src="${infinityPicture1}">
        </div>
        <div class="content">
            <a class="author">infinity-G™</a>
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
            <img src="${infinityPicture3}">
        </div>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="bulleted metadata">
                <div>3 天前</div>
                <div>5 個讚</div>
            </div>
            <div class="text">入稿版冬コミ新作ブランケットです。よろしくね。</div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${infinityPicture2}">
        </div>
        <div class="content">
            <a class="author">いんふぃ™</a>
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
            <img src="${infinityPicture2}">
        </div>
        <div class="content">
            <a class="author">いんふぃ™</a>
            <div class="metadata">
                <div>42 分鐘前</div>
            </div>
            <div class="text">
                冬コミで頒布した新作ブランケット、新刊同人誌、
                本編ディスク、 過去グッズ等すべての通信販売を開始しました！
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
            <img src="${infinityPicture4}">
        </div>
        <div class="content">
            <a class="author">Yami Odymel</a>
            <div class="text">這些頭貼都是由 Infinity-Sama 所提供的！</div>
            <div class="bulleted actions">
                <a>檢舉</a>
                <a>編輯</a>
                <a>移除</a>
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${infinityPicture3}">
        </div>
        <div class="content">
            <a class="author">Karisu</a>
            <div class="text">搭啦啦啦！下面的動作以「中點」來區分。</div>
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットです。よろしくね。
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="text">
                入稿版冬コミ新作ブランケットです。よろしくね。
            </div>
        </div>
        <div class="comments">
            <div class="comment">
                <div class="avatar">
                    <img src="${infinityPicture2}">
                </div>
                <div class="content">
                    <a class="author">いんふぃ™</a>
                    <div class="text">
                        映画のように没入できる『シネマティックノベル』をリリースしている
                        『infinity-G™』および『いんふぃ™』です。
                    </div>
                </div>
                <div class="comment">
                    <div class="avatar">
                        <img src="${infinityPicture2}">
                    </div>
                    <div class="content">
                        <a class="author">いんふぃ™</a>
                        <div class="text">
                            今のゲーム制作用PCをPV制作もできるようリプレースするためには
                            最低20万円の投資が必要だと判明した
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="text">
                入稿版冬コミ新作ブランケットです。よろしくね。
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${infinityPicture2}">
        </div>
        <div class="content">
            <a class="author">いんふぃ™</a>
            <div class="text">
                映画のように没入できる『シネマティックノベル』をリリースしている
                『infinity-G™』および『いんふぃ™』です。
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="avatar">
            <img src="${infinityPicture2}">
        </div>
        <div class="content">
            <a class="author">いんふぃ™</a>
            <div class="text">
                今のゲーム制作用PCをPV制作もできるようリプレースするためには
                最低20万円の投資が必要だと判明した
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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
            <img src="${infinityPicture1}">
        </a>
        <div class="content">
            <a class="author">infinity-G™</a>
            <div class="inline text">
                入稿版冬コミ新作ブランケットで...
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