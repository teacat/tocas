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

export default
{
    header:
    {
        title   : '聊天室',
        subTitle: 
        `
            跨國交際的好場所。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description: 
            `
                <p>聊天室目前僅有訊息元件，而不像 Tocas UI 1 擁有完整的聊天室元件，</p>
                <p>主要原因是利用卡片和聊天室元件搭配有著更大的效益。</p>
            `,
        },
        {
            type       : normal,
            title      : '內容主體',
            description: '聊天室的訊息內容有許多不同的表現方式。',
            link       : false
        },
        {
            type       : small,
            title      : '訊息',
            description: `用來擺放對話內容的區塊。`,
            link       : 'message'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    早安！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'left message'
        },
        {
            type       : small,
            title      : '右邊的訊息',
            description: `內容也可以來自於右邊。`,
            link       : 'message'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="right message">
            <div class="content">
                <div class="text">
                    早安！兄弟，你欠錢還沒還！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'right message'
        },
        {
            type       : small,
            title      : '語意',
            description: `訊息也帶有不同的語意。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left primary message">
            <div class="content">
                <div class="text">
                    主要語意，主要語意，主要語意，主要語意
                </div>
            </div>
        </div>
        <div class="left info message">
            <div class="content">
                <div class="text">
                    提示語意，提示語意，提示語意，提示語意
                </div>
            </div>
        </div>
        <div class="left warning message">
            <div class="content">
                <div class="text">
                    警告語意，警告語意，警告語意，警告語意
                </div>
            </div>
        </div>
        <div class="left inverted message">
            <div class="content">
                <div class="text">
                    反色，反色，反色，反色
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'primary, info, warning'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `訊息可以是肯定或是否定意味。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left positive message">
            <div class="content">
                <div class="text">
                    肯定語氣，肯定語氣，肯定語氣，肯定語氣
                </div>
            </div>
        </div>
        <div class="left negative message">
            <div class="content">
                <div class="text">
                    否定語氣，否定語氣，否定語氣，否定語氣
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '發音方式',
            description: `可以利用不同的發音方式來點綴訊息。`,
            link       : 'pronounce'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left secondary message">
            <div class="content">
                <div class="text">
                    次要發音方式，次要發音方式，次要發音方式，次要發音方式
                </div>
            </div>
        </div>
        <div class="left tertiary message">
            <div class="content">
                <div class="text">
                    其次發音方式，其次發音方式，其次發音方式，其次發音方式
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'secondary, tertiary'
        },
        {
            type       : small,
            title      : '帶有頭像的內容',
            description: `聊天內容也可以具有頭像。`,
            link       : 'avatar'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="avatar">
                <img src="${infinityPicture1}">
            </div>
            <div class="content">
                <div class="text">
                    早安！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'avatar'
        },
        {
            type       : small,
            title      : '作者',
            description: `訊息內容可以帶有一個作者、訊息發布者的名稱。`,
            link       : 'author'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="author">
                Yami Odymel
            </div>
            <div class="avatar">
                <img src="${infinityPicture1}">
            </div>
            <div class="content">
                <div class="text">
                    大家好啊！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'author'
        },
        {
            type       : tiny,
            title      : '自由擺放作者名稱',
            description: `作者名稱除了不只能夠擺在訊息外，也可以和訊息同行，或是放置於訊息內。`
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="avatar">
                <img src="${infinityPicture3}">
            </div>
            <div class="content">
                <div class="text">
                    <div class="inline author">
                        Yami Odymel: 
                    </div>
                    嗨！早安。
                </div>
            </div>
        </div>
        <div class="left message">
            <div class="avatar">
                <img src="${infinityPicture2}">
            </div>
            <div class="content">
                <div class="text">
                    <div class="author">
                        Yami Odymel
                    </div>
                    囉哈！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'inline, author'
        },
        {
            type       : small,
            title      : '中繼資料',
            description: `你可以在聊天內容下方插入一些中繼資料。`,
            link       : 'metadata'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="avatar">
                <img src="${infinityPicture1}">
            </div>
            <div class="content">
                <div class="text">
                    月月，搭拉安。
                </div>
                <div class="meta">
                    <div class="item">12:33 PM</div>
                    <div class="item">已讀</div>
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'meta, item'
        },
        {
            type       : tiny,
            title      : '帶點中繼資料',
            description: `中繼資料可以有「子彈點」或是「中點」來做區隔。`
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    這個訊息的中繼資料帶有子彈點。
                </div>
                <div class="bulleted meta">
                    <div class="item">09:16 PM</div>
                    <div class="item">已讀</div>
                </div>
            </div>
        </div>
        <div class="right message">
            <div class="content">
                <div class="text">
                    這個則是中點的中繼資料。
                </div>
                <div class="middoted meta">
                    <div class="item">03:54 AM</div>
                    <div class="item">已傳送</div>
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'bulleted meta, middoted meta'
        },
        {
            type       : small,
            title      : '分隔線',
            description: `用來區分兩個對話之間的分隔點。`,
            link       : 'divider'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    吻仔魚，這裡充滿了很多吻仔魚。
                </div>
            </div>
        </div>
        <div class="divider">今天</div>
        <div class="right message">
            <div class="content">
                <div class="text">
                    喔，等一下，蛤？
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'divider'
        },
        {
            type       : small,
            title      : '引用',
            description: `訊息內可以插入一個引用元件。`,
            link       : 'quote'
        },
        {
            type: 'example',
            code: `<div class="ts chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    <blockquote class="ts secondary quote">
                        <p><strong>Yami Odymel</strong></p>
                        哇，哭哭 ; - ;
                    </blockquote>
                    Tocas UI 的聊天室元件支援引用欸
                    <br>
                    真是太 Telegram 了！！！！！
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'quote'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '聊天室有不同的外觀點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '尺寸',
            description: `聊天室有不同的尺寸可供選擇。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts tiny chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    微小
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ts small chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    小型
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ts medium chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    適中
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ts large chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    大型
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ts big chatroom">
    <div class="content">
        <div class="left message">
            <div class="content">
                <div class="text">
                    大的
                </div>
            </div>
        </div>
    </div>
</div>`,
            mark: 'tiny, small, medium, large, big'
        },
    ]
}