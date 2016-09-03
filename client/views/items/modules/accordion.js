var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'


export default
{
    header:
    {
        title   : '手風琴',
        subTitle: 
        `
            叭啦叭叭叭叭，喔不好意思那是小喇叭。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>手風琴採用的是 HTML5 原生的標籤而不是 jQuery 或 TocasJS，樣式已經在所有瀏覽器上統一化了。</p>
                <p>手風琴內的下拉圖示會依照展開與否更換成不同的形態。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '在這裡瀏覽手風琴的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的手風琴。`,
            link       : 'accordion'
        },
        {
            type: 'example',
            code: `<details class="ts accordion" open>
    <summary>
        <i class="dropdown icon"></i>
        什麼是夏希？
    </summary>
    <div class="content">
        <p>夏希是一個基於 PHP 的時間類別，用以取得現在的時間，或者是數天後的現在時刻。</p>
    </div>
</details>`,
            mark: 'accordion'
        },
        {
            type       : normal,
            title      : '內容',
            description: '手風琴的內部構造不僅一種。',
            link       : false
        },
        {
            type       : small,
            title      : '標題',
            description: `手風琴的標題，作為欲展開內容的大鋼。`,
            link       : 'summary'
        },
        {
            type: 'example',
            code: `<details class="ts accordion">
    <summary>
        <i class="dropdown icon"></i>
        我是標題，我永遠不會被收縮。
    </summary>
</details>`,
            tagMark: 'summary'
        },
        {
            type       : small,
            title      : '內容',
            description: `擺放欲收縮和展開的內容容器。`,
            link       : 'content'
        },
        {
            type: 'example',
            code: `<details class="ts accordion" open>
    <summary>
        <i class="dropdown icon"></i>
        我是手風琴標題
    </summary>
    <div class="content">
        <p>按下標題可以收縮或是展開我。</p>
    </div>
</details>`,
            mark: 'content'
        },
        {
            type       : small,
            title      : '清單',
            description: `手風琴內可以包含一個正常的 <span class="ts horizontal label">ul</span> 清單。`,
            link       : 'ul'
        },
        {
            type: 'example',
            code: `<details class="ts accordion" open>
    <summary>
        <i class="dropdown icon"></i>
        伊繁星最高協議——第六條
    </summary>
    <div class="content">
        <p>設計一項產品，或是任何服務，都應抱持原本創作的理念，不得因自我、商業利益進而更改創作理念。</p>
        <ul>
            <li>建立於 Github。</li>
            <li>適用於所有伊繁星旗下產品。</li>
        </ul>
    </div>
</details>`,
            tagMark: 'ul, li'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '手風琴的外觀可以有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '反色',
            description: `手風琴可以是反色的。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted segment">
    <details class="ts inverted accordion" open>
        <summary>
            <i class="dropdown icon"></i>
            什麼是風紀委員？
        </summary>
        <div class="content">
            <p>Jajjimento（ジャッジメント）中文涵意是風紀委員，這是用來驗證表單的 PHP 類別。</p>
        </div>
    </details>
</div>`,
            mark: 'inverted'
        },
    ]
}