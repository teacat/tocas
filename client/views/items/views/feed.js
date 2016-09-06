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
var justAPerson1 = require('../../images/justaperson-01.png')
var justAPerson2 = require('../../images/justaperson-02.png')
var justAPerson3 = require('../../images/justaperson-03.png')
var justAPerson4 = require('../../images/justaperson-04.png')
var defaultAvatar = require('../../images/default.jpg')

export default
{
    header:
    {
        title   : '動態',
        subTitle: 
        `
            你朋友剛到你家拜訪，五分鐘前，對了，他還把你的 PS4 幹走了。
        `
    },
    html: 
    [
        {
            type       : normal,
            title      : '種類',
            description: '動態的種類有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的動態。`,
            link       : 'feed'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 和你成為了朋友。
                <div class="date">
                    1 小時前
                </div>
            </div>
            <div class="meta">
                <a><i class="like icon"></i> 4 個讚</a>
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 在他牆上分享了這則貼文。
                <div class="date">
                    3 小時前
                </div>
            </div>
            <div class="extra images">
                <a><img src="${infinityPicture1}"></a>
                <a><img src="${infinityPicture2}"></a>
            </div>
            <div class="meta">
                <a><i class="like icon"></i> 1 個讚</a>
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a class="user">
                    Yami Odymel
                </a>
                在他牆上分享了這則貼文
                <div class="date">
                    1 天前
                </div>
            </div>
            <div class="extra text">
                準備向令一個平行世界的你道歉，因為你將在這個世界有所作為。
            </div>
            <div class="meta">
                <a><i class="like icon"></i> 成為第一個讚的人</a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'feed'
        },
        {
            type       : normal,
            title      : '內容',
            description: '動態內可安插多個不同性質的內容。',
            link       : false
        },
        {
            type       : small,
            title      : '事件',
            description: `一個事件是組成動態的基本元件。`,
            link       : 'event'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="content">
            今天什麼事情也都沒有發生。
        </div>
    </div>
</div>`,
            mark   : 'event'
        },
        {
            type       : small,
            title      : '概要',
            description: `概要用以加強詮釋事件的經過。`,
            link       : 'summary'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 追蹤了 <a>infinity-G™</a>。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="content">
            <div class="summary">
                <a>infinity-G™</a> 和 <a>Yami Odymel</a> 目前是朋友了。
            </div>
        </div>
    </div>
</div>`,
            mark: 'summary'
        },
        {
            type       : small,
            title      : '標籤',
            description: `一個事件可以帶有圖片或是圖示。`,
            link       : 'label'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                你將 Yami Odymel 加入了 <a>員工</a> 群組。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <i class="pencil icon"></i>
        </div>
        <div class="content">
            <div class="summary">
                你將該貼文發布至 <a>Yami Odymel</a> 的牆上。
            </div>
        </div>
    </div>
</div>`,
            mark   : 'label'
        },
        {
            type       : tiny,
            title      : '試試其他點綴方式',
            description: `別忘記搭配其他 Tocas UI 樣式你還可以做出下面這樣的效果。`
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img class="ts circular image" src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="date">
                1 天前
            </div>
            <div class="summary">
                我的頭像是圓的。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <i class="inverted info circular comment icon"></i>
        </div>
        <div class="content">
            <div class="date">
                51 分鐘前
            </div>
            <div class="summary">
                這是一個圓形的圖示。
            </div>
        </div>
    </div>
</div>`,
            mark   : 'inverted, info, circular, image'
        },
        {
            type       : small,
            title      : '日期',
            description: `事件或者是其概要中可以帶有日期。`,
            link       : 'date'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img src="${infinityPicture1}">
        </div>
        <div class="content">
            <div class="date">
                51 分鐘前
            </div>
            <div class="summary">
                你追蹤了 <a>infinity-G™</a>。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <img src="${infinityPicture1}">
        </div>
        <div class="content">
            <div class="summary">
                你和 <a>infinity-G™</a> 成為朋友了。
                <div class="date">今天</div>
            </div>
        </div>
    </div>
</div>`,
            mark   : 'date'
        },
        {
            type       : small,
            title      : '額外資訊',
            description: `事件中可以插入額外的資訊，像是附帶圖片或是額外文字。`,
            link       : 'extra'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="date">
                3 小時前
            </div>
            <div class="summary">
                <a>Yami Odymel</a> 分享了兩張照片。
            </div>
            <div class="extra images">
                <a><img src="${infinityPicture1}"></a>
                <a><img src="${infinityPicture2}"></a>
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="date">
                1 天前
            </div>
            <div class="summary">
                <a>Yami Odymel</a> 在他牆上分享了這則貼文。
            </div>
            <div class="extra text">
                準備向令一個平行世界的你道歉，因為你將在這個世界有所作為。
            </div>
        </div>
    </div>
</div>`,
            mark: 'extra, images, text'
        },
        {
            type       : small,
            title      : '中繼資料',
            description: `事件可以帶有中繼資料。`,
            link       : 'meta'
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
            <div class="meta">
                <a><i class="like icon"></i> 4 個讚</a>
                <a><i class="comment icon"></i> 32 個回應</a>
                <a>清除</a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'meta'
        },
        {
            type       : tiny,
            title      : '帶點中繼資料',
            description: `中繼資料可以有「子彈點」或是「中點」來做區隔。`
        },
        {
            type: 'example',
            code: `<div class="ts feed">
    <div class="event">
        <div class="label">
            <i class="circular trash icon"></i>
        </div>
        <div class="content">
            <div class="summary">
                你移除了 <a>洨安萬萬歲</a> 文件。
            </div>
            <div class="bulleted meta">
                <a>保存</a>
                <a>檢視</a>
                <a>還原</a>
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <i class="circular comment icon"></i>
        </div>
        <div class="content">
            <div class="summary">
                你收到了一則訊息，這來自 <a>境界的彼方</a>。
            </div>
            <div class="middoted meta">
                <a>保存</a>
                <a>檢視</a>
                <a>還原</a>
            </div>
        </div>
    </div>
</div>`,
            mark: 'bulleted meta, middoted meta'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '動態的外觀可供點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '分隔的',
            description: `動態可以有分隔線區分。`,
            link       : 'divided'
        },
        {
            type: 'example',
            code: `<div class="ts divided feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                你將 Yami Odymel 加入了 <a>員工</a> 群組。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <i class="pencil icon"></i>
        </div>
        <div class="content">
            <div class="summary">
                你將該貼文發布至 <a>Yami Odymel</a> 的牆上。
            </div>
        </div>
    </div>
</div>`,
            mark   : 'divided'
        },
        {
            type       : small,
            title      : '較寬鬆',
            description: `動態事件之間的空隙可以更加寬鬆。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts relaxed feed">
    <div class="event">
        <div class="label">
            <img src="${infinityPicture1}">
        </div>
        <div class="content">
            <div class="date">
                51 分鐘前
            </div>
            <div class="summary">
                你追蹤了 <a>infinity-G™</a>。
            </div>
        </div>
    </div>
    <div class="event">
        <div class="label">
            <img src="${infinityPicture1}">
        </div>
        <div class="content">
            <div class="summary">
                你和 <a>infinity-G™</a> 成為朋友了。
                <div class="date">今天</div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'relaxed'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `動態有提供不同的尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts tiny feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
        </div>
    </div>
</div>
<div class="ts small feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
        </div>
    </div>
</div>
<div class="ts medium feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
        </div>
    </div>
</div>
<div class="ts large feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
        </div>
    </div>
</div>
<div class="ts big feed">
    <div class="event">
        <div class="label">
            <img src="${defaultAvatar}">
        </div>
        <div class="content">
            <div class="summary">
                <a>Yami Odymel</a> 戳了你一下
            </div>
        </div>
    </div>
</div>`,
            mark: 'tiny, small, medium, large, big'
        },
    ]
}