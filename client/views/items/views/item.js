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
        title   : '項目',
        subTitle:
        `
            用來陳列商品或者是一些項目都很不錯用。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '項目有多個種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的項目群組。`,
            link       : 'item'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="content">
            <a class="header">吻仔魚</a>
            <div class="meta">
                <span>$32 元</span>
            </div>
            <div class="description">
                一般可分為淡水魚魩仔魚與海水魚魩仔魚兩類。
                根據臺灣大學王友慈博士指出，魩仔魚是單一種魚類，
                是沙丁魚苗，若撈捕作業不正確有可能撈到數十至一百五十種類的魚苗。
            </div>
            <div class="extra">
                維基百科
            </div>
        </div>
    </div>
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="content">
            <a class="header">芒果</a>
            <div class="meta">
                <span>Mango</span>
            </div>
            <div class="description">
                是芒果屬的一種植物和果實，原產自北印度和馬來半島，
                在梵語中叫作āmra，音譯為「菴羅」，或叫作āmalaka，
                音譯為「菴摩勒」、「菴摩羅」、「阿摩落伽」。
            </div>
            <div class="extra">
                維基百科
            </div>
        </div>
    </div>
</div>`,
            mark: 'items'
        },
        {
            type       : normal,
            title      : '內容',
            description: `項目由多種不同構造的內容組成。`,
            link       : false
        },
        {
            type       : small,
            title      : '圖片',
            description: `項目可以包含圖片。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<div class="ts divided items">
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderSquare}">
        </div>
    </div>
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderSquare}">
        </div>
    </div>
</div>`,
            mark: 'image'
        },
        {
            type       : small,
            title      : '內容',
            description: `項目中可以有內容來敘述項目。`,
            link       : 'content'
        },
        {
            type: 'example',
            code: `<div class="ts divided items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            臺灣，舊稱福爾摩沙，是位於亞洲東部、太平洋西北側的島嶼，
            地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望－維基百科。
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            「臺灣」之名的由來說法甚多，在明朝以後的文獻中，
            臺灣亦寫作「大員」、「臺員」（三者臺語：同音：Tai-oan），
            或是「雞籠山」、「雞籠」、「北港」、「東蕃」等－維基百科。
        </div>
    </div>
</div>`,
            mark: 'content'
        },
        {
            type       : small,
            title      : '標題',
            description: `項目中可以有標題。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                笨蛋測驗召喚獸
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                零之使魔
            </div>
        </div>
    </div>
</div>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '中繼資料',
            description: `可以在項目中放入中繼資料。`,
            link       : 'meta'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            <div class="header">
                戳戳洨洨安
            </div>
            <div class="meta">
                <span>Android</span>
                <span>免費下載</span>
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
            code: `<div class="ts items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            <div class="header">
                電腦玩瞎咪
            </div>
            <div class="middoted meta">
                <span>Yami Odymel</span>
                <span>台灣</span>
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            <div class="header">
                希豹
            </div>
            <div class="bulleted meta">
                <span>Seadog007</span>
                <span>台灣</span>
            </div>
        </div>
    </div>
</div>`,
            mark: 'middoted meta, bulleted meta'
        },
        {
            type       : tiny,
            title      : '同行中繼資料',
            description: `中繼資料可以和標題是同一行。`
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="content">
            <div class="header">
                標題
            </div>
            <div class="inline meta">
                <span>同行</span>
                <span>中繼資料</span>
            </div>
        </div>
    </div>
</div>`,
            mark: 'inline'
        },
        {
            type       : small,
            title      : '註釋',
            description: `項目中可以帶有註釋來詮釋整個項目。`,
            link       : 'description'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="content">
            <div class="header">Macbook Air</div>
            <div class="description">
                一台由賈伯斯從牛皮信封袋中拿出來的輕薄筆電，
                令人為之驚艷，嘆為觀止。
                省去 CD 光碟機的時代從這個時候開始。
            </div>
        </div>
    </div>
</div>`,
            mark: 'description'
        },
        {
            type       : small,
            title      : '連結',
            description: `項目中可以有連結，如果你想讓整個項目變成連結請參考更下方的教學。`,
            link       : 'link'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <a class="ts tiny image">
            <img src="${imgPlaceholderUser}">
        </a>
        <div class="content">
            <a class="header">羽田白音</a>
            <div class="description">
                來自日本，在台灣目睹一場飛機事故並在其中拯救了另一名乘客，但得到的回報卻不是感謝。
            </div>
        </div>
    </div>
    <div class="item">
        <a class="ts tiny image">
            <img src="${imgPlaceholderUser3}">
        </a>
        <div class="content">
            <a class="header">卡莉絲</a>
            <div class="description">
                總是以玩樂為主的初中生，
                把大多數的時間都花在打理自己的外觀上，
                嘗試著讓自己成為能夠大受矚目的人物。
            </div>
        </div>
    </div>
</div>`,
            tagMark: 'a'
        },
        {
            type       : small,
            title      : '額外內容',
            description: `你可以在項目中放入額外內容。`,
            link       : 'extra'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="content">
            <div class="header">廢除博愛座</div>
            <div class="description">
                近年來，台灣一般民眾之文化水準已明顯提高，
                在公共運輸工具上讓座給有需要的人已經成為一個常見的行為。
                不僅僅局限於博愛座，一般座位也常見讓座這樣的行為。
            </div>
            <div class="extra">
                <i class="check icon"></i>
                121 個贊同
            </div>
        </div>
    </div>
</div>`,
            mark: 'extra'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '項目可以有不同的外觀點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '分隔的',
            description: `項目和另一個項目之間可以有分隔線做為區隔的界線。`,
            link       : 'divided'
        },
        {
            type: 'example',
            code: `<div class="ts divided items">
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="content">
            <a class="header">吻仔魚</a>
            <div class="meta">
                <span>$32 元</span>
            </div>
            <div class="description">
                一般可分為淡水魚魩仔魚與海水魚魩仔魚兩類。
                根據臺灣大學王友慈博士指出，魩仔魚是單一種魚類，
                是沙丁魚苗，若撈捕作業不正確有可能撈到數十至一百五十種類的魚苗。
            </div>
            <div class="extra">
                維基百科
            </div>
        </div>
    </div>
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="content">
            <a class="header">芒果</a>
            <div class="meta">
                <span>Mango</span>
            </div>
            <div class="description">
                是芒果屬的一種植物和果實，原產自北印度和馬來半島，
                在梵語中叫作āmra，音譯為「菴羅」，或叫作āmalaka，
                音譯為「菴摩勒」、「菴摩羅」、「阿摩落伽」。
            </div>
            <div class="extra">
                維基百科
            </div>
        </div>
    </div>
</div>`,
            mark: 'divided'
        },
        {
            type       : small,
            title      : '較寬鬆',
            description: `項目和項目之間的間隙可以更為寬鬆。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts relaxed items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                New Game!
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                Re:從零開始的異世界生活
            </div>
        </div>
    </div>
</div>
<br>
<div class="ts very relaxed items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                Fate/kaleid liner 魔法少女☆伊莉雅3rei
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderSquare}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                這個美術社大有問題！
            </div>
        </div>
    </div>
</div>`,
            mark  : 'very relaxed, relaxed',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '連結項目',
            description: `單個項目可以是一個連結。`,
            link       : 'link-item'
        },
        {
            type: 'example',
            code: `<div class="ts link items">
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                Lorem ipsum
            </div>
            <div class="description">
                Curabitur efficitur nisi vitae lorem bibendum pulvinar.
                Nec risus ac tellus euismod varius.
                Nullam commodo turpis lorem,
                vitae luctus magna consequat sed.
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts tiny image">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                Cum sociis
            </div>
            <div class="description">
                Quisque gravida dictum justo,
                vitae dignissim est luctus a. Phasellus placerat,
                nunc eget hendrerit dictum,
                orci urna iaculis enim.
            </div>
        </div>
    </div>
</div>`,
            mark  : 'link'
        },
        {
            type       : small,
            title      : '垂直對齊',
            description: `你可以自訂項目內容的垂直對齊。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="top aligned content">
            <div class="header">
                這個標題會貼齊上方
            </div>
        </div>
    </div>
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="middle aligned content">
            <div class="header">
                這會垂直置中
            </div>
        </div>
    </div>
    <div class="item">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
        <div class="bottom aligned content">
            <div class="header">
                然後這個會貼齊底部
            </div>
        </div>
    </div>
</div>`,
            mark  : 'top aligned, middle aligned, bottom aligned'
        },
        {
            type       : small,
            title      : '浮動',
            description: `項目的內容可以左右浮動。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<div class="ts items">
    <div class="item">
        <div class="ts small image">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="top aligned content">
            <div class="header">
                Lorem ipsum
            </div>
            <div class="description">
                Curabitur efficitur nisi vitae lorem bibendum pulvinar.
                Nec risus ac tellus euismod varius.
                Nullam commodo turpis lorem,
                vitae luctus magna consequat sed.
            </div>
            <div class="extra">
                <div class="ts right floated button">
                    加入好友
                </div>
            </div>
        </div>
    </div>
    <div class="item">
        <div class="ts small image">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="top aligned content">
            <div class="header">
                Cum sociis
            </div>
            <div class="description">
                Quisque gravida dictum justo,
                vitae dignissim est luctus a. Phasellus placerat,
                nunc eget hendrerit dictum,
                orci urna iaculis enim.
            </div>
            <div class="extra">
                <div class="ts right floated button">
                    加入好友
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark  : 'left floated, right floated'
        },
    ]
}