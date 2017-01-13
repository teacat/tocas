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
        title   : '統計數據',
        subTitle:
        `
            平均可能不超過 8 —— 公分。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>統計數據可以在數據下顯示一個說明標籤，</p>
                <p>用來敘述該數字的含意。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '統計數據具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個最基本的統計數據。`,
            link       : 'statistic'
        },
        {
            type: 'example',
            code: `<div class="ts statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>`,
            mark: 'statistic'
        },
        {
            type       : small,
            title      : '標籤於上',
            description: `標籤也可以在統計數據的上方，你只需要變更順序。`,
            link       : 'label-upper'
        },
        {
            type: 'example',
            code: `<div class="ts statistic">
    <div class="label">會員總數</div>
    <div class="value">999</div>
</div>`,
            mark: 'label'
        },
        {
            type       : small,
            title      : '語氣',
            description: `統計數據也可以帶有不同的語氣。`,
            link       : 'emphasis'
        },
        {
            type: 'example',
            code: `<div class="ts primary statistic">
    <div class="value">1,463</div>
    <div class="label">下載次數</div>
</div>
<div class="ts info statistic">
    <div class="value">361</div>
    <div class="label">觀看次數</div>
</div>
<div class="ts warning statistic">
    <div class="value">72%</div>
    <div class="label">負載頻率</div>
</div>`,
            mark: 'primary, info, warning'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `統計數據可以是肯定或是否定的。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<div class="ts positive statistic">
    <div class="value">301+</div>
    <div class="label">正面</div>
</div>
<div class="ts negative statistic">
    <div class="value">13</div>
    <div class="label">負面</div>
</div>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '反色',
            description: `統計數據可以是反色的，用以呈現在不同的背景上。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted segment">
    <div class="ts inverted primary statistic">
        <div class="value">1,463</div>
        <div class="label">下載次數</div>
    </div>
    <div class="ts inverted info statistic">
        <div class="value">361</div>
        <div class="label">觀看次數</div>
    </div>
    <div class="ts inverted warning statistic">
        <div class="value">72%</div>
        <div class="label">負載頻率</div>
    </div>
    <div class="ts inverted positive statistic">
        <div class="value">301+</div>
        <div class="label">正面</div>
    </div>
    <div class="ts inverted negative statistic">
        <div class="value">13</div>
        <div class="label">負面</div>
    </div>
</div>`,
            mark: 'inverted, primary, info, warning ,positive, negative'
        },
        {
            type       : small,
            title      : '統計群組',
            description: `一個統計數據群組。`,
            link       : 'statistics'
        },
        {
            type: 'example',
            code: `<div class="ts statistics">
    <div class="statistic">
        <div class="value">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">916</div>
        <div class="label">檢視次數</div>
    </div>
</div>`,
            mark: 'statistics'
        },
        {
            type       : normal,
            title      : '內容',
            description: '統計數據中包有不同性質的內容。',
            link       : false
        },
        {
            type       : small,
            title      : '數值',
            description: `包含主要統計數據的數字、數值，其中也可以帶有圖示、文字或圖片。`,
            link       : 'value'
        },
        {
            type: 'example',
            code: `<div class="ts statistics">
    <div class="statistic">
        <div class="value">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="text value">
            三千六百<br>
            八十萬
        </div>
        <div class="label">檢視次數</div>
    </div>
    <div class="statistic">
        <div class="value">
            <i class="flag icon"></i> 32
        </div>
        <div class="label">已佔據</div>
    </div>
    <div class="statistic">
        <div class="value">
            <img class="ts circular image" src="${imgPlaceholderUser3}">
            Infinity-S
        </div>
        <div class="label">人氣最高</div>
    </div>
</div>`,
            mark: 'value'
        },
        {
            type       : small,
            title      : '異動',
            description: `顯示與上次的差距、異動數值。`,
            link       : 'fluctuation'
        },
        {
            type: 'example',
            code: `<div class="ts statistic">
    <div class="value">
        892
        <div class="increment">32</div>
    </div>
    <div class="label">觀看次數</div>
</div>
<div class="ts statistic">
    <div class="value">
        18
        <div class="decrement">32</div>
    </div>
    <div class="label">收藏次數</div>
</div>
<div class="ts statistic">
    <div class="value">
        1,725
        <div class="fluctuation">163+</div>
    </div>
    <div class="label">購買次數</div>
</div>`,
            mark: 'increment, decrement, fluctuation'
        },
        {
            type       : small,
            title      : '標籤',
            description: `用來告訴使用者這個數據的含義。`,
            link       : 'label'
        },
        {
            type: 'example',
            code: `<div class="ts statistic">
    <div class="value">315</div>
    <div class="label">點擊次數</div>
</div>`,
            mark: 'label'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '你也可以更改統計數據的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '水平統計數據',
            description: `讓統計數據以水平的方式擺放。`,
            link       : 'horizontal'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal statistic">
    <div class="value">315</div>
    <div class="label">點擊次數</div>
</div>`,
            mark: 'horizontal'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal statistics">
    <div class="statistic">
        <div class="value">724</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">916</div>
        <div class="label">檢視次數</div>
    </div>
</div>`,
            mark: 'horizontal'
        },
        {
            type       : small,
            title      : '均分寬度',
            description: `統計數據的寬度可以平均劃分，從 <span class="ts horizontal label">one</span> 到 <span class="ts horizontal label">ten</span>。`,
            link       : 'evenly-divided'
        },
        {
            type: 'example',
            code: `<div class="ts three statistics">
    <div class="statistic">
        <div class="value">1,463</div>
        <div class="label">下載次數</div>
    </div>
    <div class="statistic">
        <div class="value">361</div>
        <div class="label">觀看次數</div>
    </div>
    <div class="statistic">
        <div class="value">72%</div>
        <div class="label">負載頻率</div>
    </div>
</div>`,
            mark: 'three'
        },
        {
            type       : small,
            title      : '浮動',
            description: `統計數據可以是浮動靠左或靠右。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <div class="ts right floated statistic">
        <div class="value">
          2,204
        </div>
        <div class="label">
          觀看次數
        </div>
    </div>
    <p>Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia facete scriptorem, est autem aliquip detraxit at. Usu ocurreret referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei ex natum rebum iisque.</p>
    <div class="ts left floated statistic">
        <div class="value">
          2,204
        </div>
        <div class="label">
          觀看次數
        </div>
    </div>
    <p>Eu quo homero blandit intellegebat. Incorrupte consequuntur mei id. Mei ut facer dolores adolescens, no illum aperiri quo, usu odio brute at. Qui te porro electram, ea dico facete utroque quo. Populo quodsi te eam, wisi everti eos ex, eum elitr altera utamur at. Quodsi convenire mnesarchum eu per, quas minimum postulant per id.</p>
</div>`,
            mark: 'three'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `統計數據有不同的尺寸可供選擇。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
<div class="ts tiny statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
<div class="ts small statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
<div class="ts medium statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
<div class="ts large statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>
<div class="ts huge statistic">
    <div class="value">42,689</div>
    <div class="label">拜訪次數</div>
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
    ]
}