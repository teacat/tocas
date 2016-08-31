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
        title   : '按鈕',
        subTitle: 
        `
            一個重要的按鈕，我們將它視為核彈按鈕般，精心設計和呵護。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>按鈕具有多種樣式和語意，請注意的是，語意和顏色不同，</p>
                <p>請不要為了要新增紅色按鈕，就建立一個「負面」按鈕。</p>
                <p>請務必遵循 CSS 樣式中的含意。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '一個按鈕具有多個不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '按鈕',
            description: `一個正常的按鈕。`,
            link       : 'button'
        },
        {
            type: 'example',
            code: `<button class="ts button">按鈕</button>`,
            mark: 'button'
        },
        {
            type       : small,
            title      : '基本語氣',
            description: `用來讓一個按鈕擁有不同的意思，但卻不帶有肯定或否定語氣。`,
            link       : 'basic-emphasis'
        },
        {
            type: 'example',
            code: `<button class="ts primary button">主要</button>
<button class="ts warning button">警告</button>
<button class="ts info button">資訊</button>
<button class="ts inverted button">相反色</button>`,
            mark: 'primary, warning, info, inverted'
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `讓按鈕帶有肯定或否定的意思。`,
            link       : 'positive-negative'
        },
        {
            type: 'example',
            code: `<button class="ts positive button">肯定</button>
<button class="ts negative button">否定</button>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '偏見',
            description: `讓按鈕以背景顏色作為基礎，並以此產生深、暗差異的偏見。`,
            link       : 'opinion'
        },
        {
            type: 'example',
            code: `<button class="ts opinion button">偏見</button>
<button class="ts secondary opinion button">次要偏見</button>
<br>
<div class="ts inverted info segment">
    <button class="ts opinion button">偏見</button>
    <button class="ts secondary opinion button">次要偏見</button>
</div>

<div class="ts inverted warning segment">
    <button class="ts opinion button">偏見</button>
    <button class="ts secondary opinion button">次要偏見</button>
</div>`,
            mark: 'opinion, secondary opinion',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '圖案',
            description: `只顯示圖案的按鈕。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<button class="ts icon button">
    <i class="icon heart"></i>
</button>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '基本',
            description: `讓按鈕只帶有基本的架構。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<button class="ts positive basic button">確定</button>
<button class="ts negative basic button">拒絕</button>
<button class="ts basic button">取消</button>`,
            mark: 'basic'
        },
        {
            type       : small,
            title      : '標籤',
            description: `帶有標籤的按鈕。`,
            link       : 'labeled'
        },
        {
            type: 'example',
            code: `<div class="ts left labeled button">
    <div class="ts basic label">689</div>
    <button class="ts button">加入募集</button>
</div>

<div class="ts labeled button">
    <button class="ts button">加入募集</button>
    <div class="ts basic label">689</div>
</div>`,
            mark: 'left labeled, labeled'
        },
        {
            type       : small,
            title      : '標籤圖示',
            description: `帶有標籤和圖示的按鈕。`,
            link       : 'labeled-icon'
        },
        {
            type: 'example',
            code: `<button class="ts labeled icon button">
    <i class="star icon"></i>
    星號
</button>

<button class="ts right labeled icon button">
    加入最愛
    <i class="heart icon"></i>
</button>`,
            mark: 'right labeled icon, labeled icon'
        },
        {
            type       : normal,
            title      : '群組',
            description: '將多個按鈕組成一列，或是擁有同樣性質。',
            link       : false
        },
        {
            type       : small,
            title      : '按鈕群組',
            description: `按鈕可以組合成一個群組。`,
            link       : 'buttons'
        },
        {
            type: 'example',
            code: `<div class="ts buttons">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>`,
            mark: 'buttons'
        },
        {
            type       : small,
            title      : '垂直群組',
            description: `群組也可以是垂直擺放的。`,
            link       : 'vertical-buttons'
        },
        {
            type: 'example',
            code: `<div class="ts fluid vertical buttons">
    <button class="ts warning button">橙希</button>
    <button class="ts primary button">雨藍</button>
    <button class="ts inverted button">卡莉絲</button>
</div>`,
            mark: 'vertical, buttons'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '你可以隨時透過樣式類別切換一個按鈕的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已啟用',
            description: `用以顯示這個按鈕已經被啟用、觸發。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<button class="ts active button">按鈕</button>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '已停用',
            description: `用以顯示這個按鈕已經被禁止按下。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<button class="ts disabled button">按鈕</button>`,
            mark: 'disabled'
        },
        {
            type       : small,
            title      : '讀取中',
            description: `按鈕也可以變成讀取狀態。`,
            link       : 'loading'
        },
        {
            type: 'example',
            code: `<button class="ts loading button">按鈕</button>`,
            mark: 'loading'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '你可以更改按鈕的位置、大小、或者形狀。',
            link       : false
        },
        {
            type       : small,
            title      : '尺寸',
            description: `按鈕可以有不同的大小尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<button class="ts mini button">迷你</button>
<button class="ts tiny button">微小</button>
<button class="ts small button">小型</button>
<button class="ts button">預設</button>
<button class="ts medium button">適中</button>
<button class="ts large button">大型</button>
<button class="ts big button">巨大</button>
<button class="ts huge button">超大</button>
<button class="ts massive button">重量級</button>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
        {
            type       : small,
            title      : '浮動',
            description: `按鈕可以向左或向右浮動對齊。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<button class="ts left floated button">向左浮動</button>
<button class="ts right floated button">向右浮動</button>`,
            mark: 'right floated, left floated'
        },
        {
            type       : small,
            title      : '垂直附著',
            description: `按鈕可以垂直附著在某個元素的上下端。`,
            link       : 'attached'
        },
        {
            type: 'example',
            code: `<button class="ts fluid top attached button">附著於上</button>
<div class="ts top attached bottom attached segment">
    <p>TeaMeow 是一個社群網站，就像是你正在使用的 Facebook 或是 Twitter，</p>
    <p>不過我們強調的是「自由」和「日常」，我們不會整天刪你文章。</p>
</div>
<button class="ts fluid bottom attached button">附著於下</button>`,
            mark: 'top attached, bottom attached'
        },
        {
            type       : small,
            title      : '輕巧版',
            description: `縮小按鈕的內距。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<button class="ts mini compact button">迷你按鈕</button>
<button class="ts compact button">按鈕</button>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '圓形',
            description: `按鈕可以是圓形的。`,
            link       : 'circular'
        },
        {
            type: 'example',
            code: `<button class="ts circular large icon button">
    <i class="gift icon"></i>
</button>
<button class="ts circular positive button">知道了！</button>`,
            mark: 'circular'
        },
    ]
}