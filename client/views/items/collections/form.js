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
        title   : '表單',
        subTitle: 
        `
            以最有條理的方式送出資料。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>表單也具有網格系統，對於這部分並不熟悉的使用者還請參閱網格系統的教學。</p>
                <p>這個元件的設計很自由化，因此使用方式可能對初心者來說過度複雜，可以參考實際範例中的註冊頁面。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '表單有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的表單。`,
            link       : 'form'
        },
        {
            type: 'example',
            code: `<form class="ts form">
    <div class="field">
        <label>姓氏</label>
        <input type="text">
    </div>
    <div class="field">
        <label>名字</label>
        <input type="text">
    </div>
    <div class="field">
        <div class="ts checkbox">
            <input type="checkbox" id="agree">
            <label for="agree">我同意伊繁星最高協議。</label>
        </div>
    </div>
    <button class="ts button">送出</button>
</form>`,
            mark: 'form'
        },
        {
            type: 'example',
            code: `<form class="ts form">
    <h4 class="ts dividing header">結帳資訊</h4>
    <div class="field">
        <label>真實姓名</label>
        <div class="two fields">
            <div class="field">
                <input type="text" placeholder="姓氏">
            </div>
            <div class="field">
                <input type="text" placeholder="名字">
            </div>
        </div>
    </div>
    <div class="field">
        <label>帳單地址</label>
        <div class="fields">
            <div class="twelve wide field">
                <input type="text" placeholder="道路地址">
            </div>
            <div class="four wide field">
                <input type="text" placeholder="縣市名稱">
            </div>
        </div>
    </div>
    <button class="ts button">送出</button>
</form>`,
            mark: 'form'
        },
        {
            type       : normal,
            title      : '內容',
            description: '表單內可以有許多不同種類的內容、欄位。',
            link       : false
        },
        {
            type       : small,
            title      : '欄位',
            description: `欄位是組成表單的最基本元素，而其中可以帶有標籤用以命名該欄位。`,
            link       : 'field'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>使用者輸入欄位</label>
        <input type="text">
    </div>
</div>`,
            mark: 'field'
        },
        {
            type       : small,
            title      : '靜態文字',
            description: `你可以在欄位中擺放靜態文字，用作不可改變的欄位。`,
            link       : 'static'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>使用者名稱</label>
        <span class="text">YamiOdymel</span>
    </div>
    <div class="field">
        <label>密碼</label>
        <input type="password">
    </div>
</div>`,
            mark: 'text'
        },
        {
            type       : small,
            title      : '提醒',
            description: `欄位中可以透過 <span class="ts horizontal label">small</span> 標籤來新增一個提醒。`,
            link       : 'small'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>帳號</label>
        <input type="text">
        <small>你未來將無法更改這項設定。</small>
    </div>
</div>`,
            tagMark: 'small'
        },
        {
            type       : small,
            title      : '欄位群組',
            description: `多個欄位可以被規劃成群組，並自動均分寬度，在行動裝置上將會縮成一行。`,
            link       : 'fields'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>中間名</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'fields'
        },
//        {
//            type       : tiny,
//            title      : '指定欄位數量',
//            description: `有時候你也可以自己手動指定欄位群組的總欄位量，從 <span class="ts horizontal label">one</span> 至 <span class="ts horizontal label">ten</span>。`
//        },
//        {
//            type: 'example',
//            code: `<div class="ts form">
//    <div class="four fields">
//        <div class="field">
//            <label>姓氏</label>
//            <input type="text">
//        </div>
//        <div class="field">
//            <label>中間名</label>
//            <input type="text">
//        </div>
//        <div class="field">
//            <label>名字</label>
//            <input type="text">
//        </div>
//        <div class="field">
//            <label>暱稱</label>
//            <input type="text">
//        </div>
//    </div>
//</div>`,
//            mark: 'four fields'
//        },
        {
            type       : small,
            title      : '文字區塊',
            description: `你可以在表單內放入文字區塊的欄位，搭配 HTML5 原生的 <span class="ts horizontal label">rows</span> 可以指定文字區塊的預設高度。`,
            link       : 'textarea'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>長篇文章</label>
        <textarea></textarea>
    </div>
    <div class="field">
        <label>指定五行高度</label>
        <textarea rows="5"></textarea>
    </div>
</div>`,
            tagMark: 'textarea'
        },
        {
            type       : small,
            title      : '核取方塊',
            description: `你也可以將核取方塊做成一個欄位來使用。`,
            link       : 'checkbox'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <div class="ts checkbox">
            <input type="checkbox" id="adult">
            <label for="adult">我已滿 18 歲。</label>
        </div>
    </div>
    <div class="field">
        <div class="ts toggle checkbox">
            <input type="checkbox" id="afk">
            <label for="afk">開啟快速充電。</label>
        </div>
    </div>
</div>`,
            mark: 'checkbox, toggle'
        },
        {
            type       : small,
            title      : '單選核取方塊',
            description: `理所當然地，單選核取方塊也能夠是欄位。`,
            link       : 'radio'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>您最喜愛的食物？</label>
        <div class="ts horizontal checkboxes">
            <div class="ts radio checkbox">
                <input type="radio" name="fruits" id="mango">
                <label for="mango">芒果</label>
            </div>
            <div class="ts radio checkbox">
                <input type="radio" name="fruits" id="apple">
                <label for="apple">蘋果</label>
            </div>
            <div class="ts radio checkbox">
                <input type="radio" name="fruits" id="guava">
                <label for="guava">芭樂</label>
            </div>
        </div>
    </div>
    <div class="field">
        <label>您最常搭乘的交通工具？</label>
        <div class="ts checkboxes">
            <div class="ts radio checkbox">
                <input type="radio" name="traffic" id="bus">
                <label for="bus">公車</label>
            </div>
            <div class="ts radio checkbox">
                <input type="radio" name="traffic" id="motorcycle">
                <label for="motorcycle">機車</label>
            </div>
            <div class="ts radio checkbox">
                <input type="radio" name="traffic" id="walk">
                <label for="walk">步行</label>
            </div>
        </div>
    </div>
</div>`,
            mark: 'radio, checkboxes'
        },
        {
            type       : small,
            title      : '下拉式選單',
            description: `你也能夠在欄位中放入下拉式選單。`,
            link       : 'field'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field">
        <label>您所使用的系統版本為何？</label>
        <select class="ts basic dropdown">
            <option>macOS</option>
            <option>Windows</option>
            <option>Linux</option>
        </select>
    </div>
</div>`,
            mark: 'field'
        },
        {
            type       : small,
            title      : '訊息',
            description: `別忘記，你還可以在表單中帶入訊息元件。`,
            link       : 'message'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="ts message">
        <div class="header">不好了！</div>
        <ul class="list">
            <li>請輸入您的姓氏。</li>
            <li>請輸入您的名字。</li>
        </ul>
    </div>
</div>`,
            mark: 'message'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '表單具有不同性質的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '讀取中',
            description: `表單可以出現一個讀取指示器告訴使用者正在進行讀取。`,
            link       : 'loading'
        },
        {
            type: 'example',
            code: `<div class="ts loading form">
    <div class="field">
        <label>電子郵件地址</label>
        <input type="email">
    </div>
    <div class="ts submit button">送出</div>
</div>`,
            mark: 'loading'
        },
        {
            type       : small,
            title      : '欄位錯誤',
            description: `表單中的欄位可以呈現為一個錯誤狀態。`,
            link       : 'error'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="two fields">
        <div class="field error">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
    <div class="field error">
      <label>性別</label>
      <select class="ts basic dropdown">
            <option>男性</option>
            <option>女性</option>
            <option>第三性</option>
      </select>
    </div>
    <div class="inline field error">
        <div class="ts checkbox">
            <input type="checkbox" id="agree2">
            <label for="agree2">我同意伊繁星最高協議。</label>
        </div>
    </div>
</div>`,
            mark: 'loading'
        },
        {
            type       : small,
            title      : '欄位成功',
            description: `欄位也可以呈現為一個成功狀態。`,
            link       : 'success'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field success">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'success'
        },
        {
            type       : small,
            title      : '欄位警告',
            description: `你也可以讓欄位呈現一個警告的狀態。`,
            link       : 'warning'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="two fields">
        <div class="field warning">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'warning'
        },
        {
            type       : small,
            title      : '基本欄位語意',
            description: `欄位的狀態表現方式可以更加的簡潔、基本化。`,
            link       : 'basic-status'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="field basic success">
        <label>姓氏</label>
        <input type="text">
    </div>
    <div class="field basic warning">
        <label>名字</label>
        <input type="text">
    </div>
    <div class="field basic error">
        <label>電子郵件地址</label>
        <input type="text">
    </div>
</div>`,
            mark: 'basic'
        },
        {
            type       : small,
            title      : '停用欄位',
            description: `欄位可以呈現一個已經被停用、不可用的狀態。`,
            link       : 'disabled-field'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="two fields">
        <div class="disabled field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="disabled field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '表單外觀',
            description: '你可以點綴表單的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '尺寸',
            description: `表單可以有不同的尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts tiny form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts small form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts medium form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts large form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts big form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts huge form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>
<div class="ts massive form">
    <div class="two fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
        {
            type       : normal,
            title      : '欄位外觀',
            description: '欄位也具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '同行欄位',
            description: `欄位和標籤可以是同一行的。`,
            link       : 'inline-field'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="inline field">
      <label>名字</label>
      <input type="text" placeholder="全名">
    </div>
</div>`,
            mark: 'inline'
        },
        {
            type       : small,
            title      : '網格寬度',
            description: `欄位的寬度也可以用網格系統來劃分。`,
            link       : 'grid-field'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="fields">
        <div class="seven wide field">
            <label>電子信箱地址</label>
            <input type="text">
        </div>
        <div class="four wide field">
            <label>真實姓名</label>
            <input type="text">
        </div>
        <div class="five wide field">
            <label>暱稱</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'seven wide, four wide, five wide'
        },
        {
            type       : small,
            title      : '必填',
            description: `欄位可以顯示一個必填的樣式。`,
            link       : 'required'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="required field">
        <label>使用者輸入欄位</label>
        <input type="text">
    </div>
    <div class="required field">
        <div class="ts checkbox">
            <input type="checkbox" id="agree3">
            <label for="agree3">我同意伊繁星最高協議。</label>
        </div>
    </div>
</div>`,
            mark: 'required'
        },
        {
            type       : normal,
            title      : '群組外觀',
            description: '群組也具有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '平均劃分',
            description: `群組中的欄位寬度可以被平均劃分，從 <span class="ts horizontal label">one</span> 至 <span class="ts horizontal label">ten</span>。`,
            link       : 'evenly-divided'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="four fields">
        <div class="field">
            <label>姓氏</label>
            <input type="text">
        </div>
        <div class="field">
            <label>中間名</label>
            <input type="text">
        </div>
        <div class="field">
            <label>名字</label>
            <input type="text">
        </div>
        <div class="field">
            <label>暱稱</label>
            <input type="text">
        </div>
    </div>
    <div class="three fields">
        <div class="field">
            <label>帳號</label>
            <input type="text">
        </div>
        <div class="field">
            <label>密碼</label>
            <input type="password">
        </div>
        <div class="field">
            <label>電子郵件地址</label>
            <input type="text">
        </div>
    </div>
</div>`,
            mark: 'four fields, three fields'
        },
        {
            type       : small,
            title      : '同行欄位',
            description: `群組中的欄位和標籤可以是同一行的。`,
            link       : 'inline-group'
        },
        {
            type: 'example',
            code: `<div class="ts form">
    <div class="inline fields">
        <div class="eight wide field">
            <label>名字</label>
            <input type="text" placeholder="姓氏">
        </div>
        <div class="three wide field">
            <input type="text" placeholder="中間名">
        </div>
        <div class="five wide field">
            <input type="text" placeholder="名字">
        </div>
    </div>
</div>`,
            mark: 'inline'
        },
    ]
}