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
        title   : '核取方塊',
        subTitle:
        `
            好的。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '核取方塊有不同的種類可供選擇。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的核取方塊。`,
            link       : 'checkbox'
        },
        {
            type: 'example',
            code: `<div class="ts checkbox">
    <input type="checkbox" id="thirdGender">
    <label for="thirdGender">第三性</label>
</div>`,
            mark: 'checkbox'
        },
        {
            type       : small,
            title      : '單選方塊',
            description: `一個僅能夠在多個選項中核取其中一項的單選方塊。`,
            link       : 'radio'
        },
        {
            type: 'example',
            code: `<div class="ts radio checkbox">
    <input type="radio" id="male">
    <label for="male">男性</label>
</div>`,
            mark: 'radio'
        },
        {
            type       : small,
            title      : '指撥開關',
            description: `一個可供切換的指撥開關。`,
            link       : 'toggle'
        },
        {
            type: 'example',
            code: `<div class="ts toggle checkbox">
    <input type="checkbox" id="afk">
    <label for="afk">暫離</label>
</div>`,
            mark: 'toggle'
        },
        {
            type       : normal,
            title      : '群組',
            description: '多個核取方塊可以組成一個群組。',
            link       : false
        },
        {
            type       : small,
            title      : '核取群組',
            description: `核取方塊群組可以用來排列。`,
            link       : 'checkboxes'
        },
        {
            type: 'example',
            code: `<div class="ts checkboxes">
    <div class="ts radio checkbox">
        <input type="radio" name="gender" id="genderMale">
        <label for="genderMale">男性</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="gender" id="genderFemale">
        <label for="genderFemale">女性</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="gender" id="genderThird">
        <label for="genderThird">第三性</label>
    </div>
</div>`,
            mark: 'checkboxes'
        },
        {
            type       : small,
            title      : '水平群組',
            description: `群組可以是水平排列的。`,
            link       : 'horizontal'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox" id="aoi">
        <label for="aoi">小藍</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="ava">
        <label for="ava">小芽</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="orenji">
        <label for="orenji">橙希</label>
    </div>
</div>`,
            mark: 'horizontal'
        },
        {
            type       : small,
            title      : '輕巧版',
            description: `群組可以是依照內容為寬度基準，而不是一開始就服貼容器的寬度。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<div class="ts compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox"id="apple">
        <label for="apple">蘋果</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="polo">
        <label for="polo">菠蘿</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="pineapple">
        <label for="pineapple">拔鳳梨</label>
    </div>
</div>`,
            mark: 'compact'
        },
        {
            type       : small,
            title      : '水平對齊',
            description: `群組可以靠右、左、甚至置中。`,
            link       : 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts left aligned compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox" id="lelia">
        <label for="lelia">雷莉亞</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="avane">
        <label for="avane">亞凡芽</label>
    </div>
</div>
<br><br>
<div class="ts center aligned compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox" id="wuAoi">
        <label for="wuAoi">吳雨藍</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="shirone">
        <label for="shirone">羽田白音</label>
    </div>
</div>
<br><br>
<div class="ts right aligned compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox" id="caris">
        <label for="caris">卡莉絲</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox" id="iknore">
        <label for="iknore">依可諾爾</label>
    </div>
</div>`,
            mark  : 'left aligned, right aligned, center aligned',
            remove: '<br><br>'
        },
    ]
}