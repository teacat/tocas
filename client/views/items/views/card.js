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
        title   : '卡片',
        subTitle: 
        `
            隨心所欲，像漢堡一樣，拼湊出你喜歡的。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>卡片的內容可以是由各式各樣的元素組成，</p>
    
                <p>這一個特點請參考「內容」的介紹區塊。</p>
                
                <p>&nbsp;</p>
                
                <p>卡片和片段事實上外觀相同（它們來自同個樣式），</p>
                
                <p>但你不應該因為外觀一樣，就將原本應該用卡片顯示的內容以片段代替，</p>
                
                <p>請別忘記：雖然外觀一樣，但是內在卻不一樣。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '卡片具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的卡片。`,
            link       : 'card'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="image">
        <img src="${imgPlaceholderLegacy}">
    </div>
    <div class="content">
        <div class="header">Tocas Collection</div>
        <div class="meta">
            <a>@ts_collection</a>
        </div>
        <div class="description">
            <p>在同個屋簷下，做著那一成不變的事情，</p>
            <p>就算沒有外星人來襲擊，</p>
            <p>偶爾也會發生一些意想之外的事情。</p>
        </div>
    </div>
</div>`,
            mark: 'card'
        },
        {
            type       : small,
            title      : '語意',
            description: `卡片可以有著不同的語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary card">
    <div class="content">
        <div class="header">Jajjimento</div>
        <div class="description">
            Jajjimento（ジャッジメント）中文涵意是風紀委員，
            這是用來驗證表單的 PHP 類別。
        </div>
    </div>
</div>
<div class="ts info card">
    <div class="content">
        <div class="header">夏希</div>
        <div class="description">
            夏希是一個基於 PHP 的時間類別，
            用以取得現在的時間，或者是數天後的現在時刻。
        </div>
    </div>
</div>
<div class="ts warning card">
    <div class="content">
        <div class="header">帝國</div>
        <div class="description">
            帝國是一個基於 PHP 的權限管理系統，
            建立一個帝國需要細心的規劃。
        </div>
    </div>
</div>`,
            mark: 'primary, info, warning'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `卡片可以帶有肯定或否定的語氣。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive card">
    <div class="content">
        <div class="header">正面 :)</div>
        <div class="description">
            這是一個比較正面的卡片。
        </div>
    </div>
</div>
<div class="ts negative card">
    <div class="content">
        <div class="header">負面 :(</div>
        <div class="description">
            我是一張比較負面的卡片。
        </div>
    </div>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '反色語意',
            description: `卡片的語意可以是反色的。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted card">
    <div class="content">
        <div class="header">反色</div>
        <div class="description">
            我是一張反色的卡片，喔耶！！
        </div>
    </div>
</div>
<div class="ts inverted primary card">
    <div class="content">
        <div class="header">Jajjimento</div>
        <div class="description">
            Jajjimento（ジャッジメント）中文涵意是風紀委員，
            這是用來驗證表單的 PHP 類別。
        </div>
    </div>
</div>
<div class="ts inverted info card">
    <div class="content">
        <div class="header">夏希</div>
        <div class="description">
            夏希是一個基於 PHP 的時間類別，
            用以取得現在的時間，或者是數天後的現在時刻。
        </div>
    </div>
</div>
<div class="ts inverted warning card">
    <div class="content">
        <div class="header">帝國</div>
        <div class="description">
            帝國是一個基於 PHP 的權限管理系統，
            建立一個帝國需要細心的規劃。
        </div>
    </div>
</div>
<div class="ts inverted positive card">
    <div class="content">
        <div class="header">正面 :)</div>
        <div class="description">
            這是一個比較正面的卡片。
        </div>
    </div>
</div>
<div class="ts inverted negative card">
    <div class="content">
        <div class="header">負面 :(</div>
        <div class="description">
            我是一張比較負面的卡片。
        </div>
    </div>
</div>`,
            mark: 'inverted, primary, info, warning, positive, negative'
        },
        {
            type       : small,
            title      : '多個卡片',
            description: `卡片可以集成一個群組並有著相同的高度或是分享共同樣式。`,
            link       : 'cards'
        },
        {
            type: 'example',
            code: `<div class="ts cards">
    <div class="ts card">
        <div class="content">
            <div class="header">
                Yami Odymel
            </div>
            <div class="description">
                看似最重要的東西卻沒能被妥善利用，
                沒有人能發現這一點，因為他們早已活在過去，
                才剛開始的序章卻被放在頁尾。
            </div>
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            <div class="header">
                小安網站
            </div>
            <div class="description">
                你將會在這裡看見一個魔法師的日常生活，
                沒錯，只要你能夠單身三十年，
                你也可以跟我一樣成為魔法師。
            </div>
        </div>
    </div>
</div>`,
            mark: 'cards'
        },
        {
            type       : normal,
            title      : '內容',
            description: '卡片是由多種內容所組成的，你可以在此任意挑選並組合搭配。',
            link       : false
        },
        {
            type       : small,
            title      : '內容',
            description: `一個放置文字的區塊。`,
            link       : 'content'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        人的生命有兩次，一次是你沒發現的時候，一次是你發現的時候。
    </div>
</div>`,
            mark: 'content'
        },
        {
            type       : small,
            title      : '圖片',
            description: `一個用以放置圖片的區塊。`,
            link       : 'image'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="image">
        <img src="${imgPlaceholderLegacy}">
    </div>
    <div class="content">
        你將會在這裡看見一個魔法師的日常生活，
        沒錯，只要你能夠單身三十年，
        你也可以跟我一樣成為魔法師。
    </div>
</div>`,
            mark: 'image'
        },
        {
            type       : small,
            title      : '標題',
            description: `用以放置人名、標題、名稱的區塊。`,
            link       : 'header'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">The Place Where Only We Know</div>
        <div class="description">
            <p>I must going to find you out,</p>
            <p>to the place where only we know.</p>
        </div>
    </div>
</div>`,
            mark: 'header'
        },
        {
            type       : small,
            title      : '副標題',
            description: `你可以用副標題來詮釋你的大標題。`,
            link       : 'sub-header'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">
            三十公分
            <div class="sub header">人人都渴望的尺寸。</div>
        </div>
        <div class="description">
            <p>所謂的標準鄉民尺寸三十公分，</p>
            <p>無論是誰都會想要擁有。</p>
        </div>
    </div>
</div>`,
            mark: 'sub header'
        },
        {
            type       : small,
            title      : '註釋',
            description: `用來詮釋卡片內容的區塊。`,
            link       : 'description'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">文青短文精選</div>
        <div class="description">
            <p>路，就是一條直直的。</p>
            <p>哥 抽的不是菸 是筋。</p>
        </div>
    </div>
</div>`,
            mark: 'description'
        },
        {
            type       : small,
            title      : '中繼資料',
            description: `放置時間、標籤、短資料的區塊。`,
            link       : 'meta'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">小安網站</div>
        <div class="meta">
            <a>@xiaoan</a>
            <a>七月</a>
        </div>
        <div class="description">
            你將會在這裡看見一個魔法師的日常生活，
            沒錯，只要你能夠單身三十年，
            你也可以跟我一樣成為魔法師。
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
            code: `<div class="ts card">
    <div class="content">
        <div class="header">小安網站</div>
        <div class="bulleted meta">
            <a>@xiaoan</a>
            <a>七月</a>
        </div>
    </div>
</div>
<div class="ts card">
    <div class="content">
        <div class="header">小安網站</div>
        <div class="middoted meta">
            <a>@xiaoan</a>
            <a>七月</a>
        </div>
    </div>
</div>`,
            mark: 'bulleted, middoted'
        },
        {
            type       : small,
            title      : '連結',
            description: `你可以將一些區塊轉換成連結，如果要讓整張卡成為卡片，請觀看下方「外觀」章節。`,
            link       : 'link'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <a class="image" href="#!">
        <img src="${imgPlaceholderLegacy}">
    </a>
    <div class="content">
        <a class="header" href="#!">iPhone 7 開賣！</a>
        <div class="meta">
            <a href="#!">兩天前</a>
        </div>
    </div>
</div>`,
            tagMark: 'a'
        },
        {
            type       : small,
            title      : '按鈕',
            description: `你也可以把按鈕放入卡片中。`,
            link       : 'buttons'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="ts fluid top attached buttons">
        <button class="ts button">編輯</button>
    </div>
    <div class="content">
        <div class="header">Tocas Collection</div>
        <div class="description">
            <p>在同個屋簷下，做著那一成不變的事情，</p>
            <p>就算沒有外星人來襲擊，</p>
            <p>偶爾也會發生一些意想之外的事情。</p>
        </div>
    </div>
    <div class="ts fluid bottom attached buttons">
        <button class="ts button">完成預覽</button>
    </div>
</div>`,
            mark: 'top attached, bottom attached, buttons'
        },
        {
            type       : small,
            title      : '偏見按鈕',
            description: `卡片中可以插入偏見按鈕來營造一個類似問答的卡片。`,
            link       : 'opinion'
        },
        {
            type: 'example',
            code: `<div class="ts inverted primary card">
    <div class="content">
        <div class="header">尺寸問題</div>
        <div class="description">
            你有達到 30 公分，正所謂鄉民標準尺寸嗎？
        </div>
    </div>
    <div class="ts fluid bottom attached buttons">
        <button class="ts opinion button">有的</button>
        <button class="ts secondary opinion button">沒有</button>
    </div>
</div>`,
            mark: 'opinion, secondary opinion'
        },
        {
            type       : small,
            title      : '代表性符號',
            description: `放入一個代表這張卡片性質的符號。`,
            link       : 'symbol'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <p>任何已發布或是計畫中之產品及服務，</p>
        <p>皆不得用來刻意偏頗大眾想法、喜好、甚至混淆視聽，</p>
        <p>且該產品及服務不得擁有自我立場。</p>
        <div class="symbol">
            <i class="caution circle icon"></i>
        </div>
    </div>
</div>`,
            mark: 'symbol'
        },
        {
            type       : small,
            title      : '額外內容',
            description: `一個與這個卡片有關連的額外內容。`,
            link       : 'symbol'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">絕園的暴風雨</div>
        <div class="description">
            <p>正氣和狂氣，理性和知性，自信和確信，</p>
            <p>在悲劇性的不合理世界，故事開始了。</p>
        </div>
    </div>
    <div class="extra content">
        <i class="icon unhide"></i> 934 次欣賞
    </div>
</div>`,
            mark: 'extra content'
        },
        {
            type       : tiny,
            title      : '額外內容發音方式',
            description: `你可以用不同的發音方式來替額外內容做些點綴。`
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="header">Zedd - Papercut (Audio) ft. Troye Sivan</div>
        <div class="description">
            <p>Get “True Colors” on iTunes: http://smarturl.it/ZeddTrueColors</p>
        </div>
    </div>
    <div class="extra content">
        <i class="icon unhide"></i> 6,439,852 觀看次數
    </div>
    <div class="secondary extra content">
        <i class="icon thumbs up"></i> 109,159 個喜歡
    </div>
    <div class="tertiary extra content">
        <i class="icon thumbs down"></i> 1,077 個討厭
    </div>
</div>`,
            mark: 'extra content, secondary, tertiary'
        },
        {
            type       : small,
            title      : '重疊內容',
            description: `內容可以重疊在整張卡片的上面。`,
            link       : 'overlapped'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="image">
        <img style="opacity: 0.2" src="${imgPlaceholderLegacy}">
    </div>
    <div class="overlapped content">
        <div class="description">
            <p>這是一個來自台灣的社群網站，</p>
            <p>在這裡，我們並沒有「讚」，或是「已讀」。</p>
            <p>取而代之的，是一個「星號」，</p>
            <p>你可以假裝沒看見你朋友發給你的訊息，</p>
            <p>或者——你可以按下「星號」，告訴對方你知道了。</p>
        </div>
    </div>
</div>`,
            mark  : 'overlapped content',
        },
        {
            type       : small,
            title      : '自由排列',
            description: `現在你學到了許多的內容結構，你可以透過自由排列的方式來達成不同的效果。`,
            link       : 'custom'
        },
        {
            type: 'example',
            code: `<div class="ts card">
     <div class="content">
        <div class="header">伊繁星最高協議</div>
        <div class="meta">
            <div>@ce_laws</div>
        </div>
    </div>
    <div class="image">
        <img src="${imgPlaceholderLegacy}">
    </div>
    <div class="content">
        <div class="description">
            <p>任何已發布或是計畫中之產品及服務，</p>
            <p>皆不得用來刻意偏頗大眾想法、喜好、甚至混淆視聽，</p>
            <p>且該產品及服務不得擁有自我立場。</p>
        </div>
    </div>
</div>
<span></span>
<div class="ts card">
     <div class="secondary extra content">
        <div class="header">你上次錯過了...</div>
    </div>
    <div class="content">
        <div class="description">
            Sed vitae egestas ex. 
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Sed et felis eleifend, 
            molestie dolor in, 
            scelerisque sapien.
        </div>
    </div>
</div>`,
            mark  : 'card',
            remove: '<span></span>'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '卡片具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '簡潔問答',
            description: `一個將按鈕獨立擺放的問答。`,
            link       : 'question'
        },
        {
            type: 'example',
            code: `<div class="ts postive card">
    <div class="content">
        <div class="header">請問</div>
        <div class="description">
            <p>比起小明，您是否更喜歡小安？</p>
        </div>
        <div class="symbol">
            <i class="question circle icon"></i>
        </div>
    </div>
    <div class="right aligned secondary extra content">
        <button class="ts primary button">是的</button>
        <button class="ts button">不是</button>
    </div>
</div>`
        },
        {
            type       : small,
            title      : '文字對齊',
            description: `文字可以靠左、右、甚至置中。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts card">
    <div class="content">
        <div class="center aligned header">
            我置中
        </div>
        <div class="left aligned description">
            這置左
        </div>
    </div>
    <div class="right aligned extra content">
        然後靠右
    </div>
</div>
<div class="ts card">
    <div class="center aligned content">
        <div class="header">
            這種置中方式
        </div>
        <div class="description">
            可以一次置中多個元素。
        </div>
    </div>
</div>`,
            mark: 'left aligned, right aligned, center aligned'
        },
        {
            type       : small,
            title      : '置中卡片',
            description: `卡片本身可以是置中的。`,
            link       : 'centered'
        },
        {
            type: 'example',
            code: `<div class="ts centered card">
    <div class="image">
        <img src="${imgPlaceholderLegacy}">
    </div>
    <div class="content">
        <a class="header">Yami Odymel</a>
    </div>
</div>`,
            mark: 'centered'
        },
        {
            type       : small,
            title      : '抬舉',
            description: `卡片可以看起來像是浮在空中，被抬舉一樣。`,
            link       : 'raised'
        },
        {
            type: 'example',
            code: `<div class="ts raised card">
    <div class="image">
        <img src="${imgPlaceholderLegacy}">
    </div>
    <div class="content">
        <a class="header">Yami Odymel</a>
    </div>
</div>`,
            mark: 'raised'
        },
        {
            type       : small,
            title      : '連結卡片',
            description: `整張卡片可以是一個連結。`,
            link       : 'link-card'
        },
        {
            type: 'example',
            code: `<a class="ts card" href="http://www.dog.com">
    <div class="content">
        <div class="header">關於我</div>
        <div class="meta">
            <div>@Xiaoan</div>
        </div>
        <div class="description">
            你將會在這裡看見一個魔法師的日常生活，
            沒錯，只要你能夠單身三十年，
            你也可以跟我一樣成為魔法師。
        </div>
    </div>
    <div class="extra content">
        <div class="right floated author">
            <img class="ts circular avatar image" src="${imgPlaceholderUser}"> 小安
        </div>
    </div>
</a>`,
            tagMark: 'a',
            mark   : 'link'
        },
        {
            type       : small,
            title      : '平面化',
            description: `卡片可以看起來是平的，沒有陰影。`,
            link       : 'flatted'
        },
        {
            type: 'example',
            code: `<div class="ts flatted card">
    <div class="content">
        Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit. 
        Sed et felis eleifend, 
        molestie dolor in, scelerisque sapien.
    </div>
</div>`,
            mark: 'flatted'
        },
        {
            type       : small,
            title      : '卡片欄數',
            description: `卡片群組可以設定欄位數量，並在超過時自動換行，允許的卡片數量從 <span class="ts horizontal label">one</span> 至 <span class="ts horizontal label">ten</span>。`,
            link       : 'columns'
        },
        {
            type: 'example',
            code: `<div class="ts four cards">
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="content">
            <a class="header">Karen</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="header">Caris</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="header">Imperium</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="header">Natsuki</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="header">Avane</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser2}">
        </div>
        <div class="content">
            <a class="header">Eneko</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser}">
        </div>
        <div class="content">
            <a class="header">Iknore</a>
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderUser3}">
        </div>
        <div class="content">
            <a class="header">Aira</a>
        </div>
    </div>
</div>`,
            mark: 'four'
        },
        {
            type       : small,
            title      : '自動層疊',
            description: `卡片可以在行動裝置上自動層疊成一行。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts stackable three cards">
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '雙倍層疊',
            description: `在行動裝置上卡片群組能夠以雙倍層疊的方式將卡片重新排序，假設卡片群組設定一排四張，那麼在行動裝置上將會變成一排兩張。`,
            link       : 'doubling'
        },
        {
            type: 'example',
            code: `<div class="ts doubling four cards">
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
    <div class="ts card">
        <div class="image">
            <img src="${imgPlaceholderLegacy}">
        </div>
    </div>
</div>`,
            mark: 'doubling'
        },
        {
            type       : small,
            title      : '瀑布流',
            description: `卡片群組可以是呈現一個瀑布流的樣式。`,
            link       : 'waterfall'
        },
        {
            type: 'example',
            code: `<div class="ts waterfall cards">
    <div class="ts card">
        <div class="content">
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Sed et felis eleifend, molestie dolor in, 
            scelerisque sapien.
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            Nullam sed turpis vel purus consectetur elementum a sed ante.
            In venenatis ligula nisl, 
            sed dapibus felis ultrices eu. 
            Curabitur finibus leo dolor, 
            eu euismod mi elementum ut. 
            Donec ac interdum urna.
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            Class aptent taciti sociosqu ad litora 
            torquent per conubia nostra, 
            per inceptos himenaeos. 
            Morbi rhoncus porta mi et finibus. 
            Pellentesque nisi massa, 
            imperdiet ac egestas ut, 
            ullamcorper sit amet urna. 
            Fusce maximus vitae orci vel hendrerit. 
            Pellentesque habitant morbi tristique senectus 
            et netus et malesuada fames ac turpis egestas.
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            Cras eget dui ut eros pulvinar euismod eget rutrum odio.
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            Curabitur vel arcu tortor. 
            Sed sed libero pellentesque, 
            venenatis justo a, lobortis velit. 
            Ut cursus, turpis nec sodales posuere, 
            libero orci maximus lectus, 
            sed tincidunt eros diam vel urna.
        </div>
    </div>
    <div class="ts card">
        <div class="content">
            Pellentesque nisi massa, 
            imperdiet ac egestas ut,
            ullamcorper sit amet urna.
            Fusce maximus vitae orci vel hendrerit. 
            Pellentesque habitant morbi tristique 
            senectus et netus et malesuada fames ac turpis egestas. 
            Donec vel sagittis purus.
            Morbi ultrices, 
            quam et feugiat dignissim
        </div>
    </div>
</div>`,
            mark: 'waterfall'
        },
    ]
}