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
            title      : '簡單',
            description: `你可以使用 JavaScript 來省去撰寫 <span class="ts horizontal label">[id=""]</span> 和 <span class="ts horizontal label">[for=""]</span> 的困擾。`,
            link       : 'simple'
        },
        {
            type: 'example',
            code: `<div class="ts checkbox">
    <input type="checkbox">
    <label>第三性</label>
</div>`,
            mark: 'checkbox'
        },
        {
            type       : tiny,
            title      : 'JavaScript',
            description: '如果要省去上述困擾，透過下列程式碼來實作。',
            expandableExample: false
        },
        {
            type: source,
            code: `ts('.ts.checkbox').checkbox()`
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
    <input type="radio">
    <label>男性</label>
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
    <input type="checkbox">
    <label>暫離</label>
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
        <input type="radio" name="gender">
        <label>男性</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="gender">
        <label>女性</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="gender">
        <label>第三性</label>
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
        <input type="checkbox">
        <label>小藍</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>小芽</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>橙希</label>
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
        <input type="checkbox">
        <label>蘋果</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>菠蘿</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>拔鳳梨</label>
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
        <input type="checkbox">
        <label>雷莉亞</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>亞凡芽</label>
    </div>
</div>
<br><br>
<div class="ts center aligned compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox">
        <label>吳雨藍</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>羽田白音</label>
    </div>
</div>
<br><br>
<div class="ts right aligned compact horizontal checkboxes">
    <div class="ts checkbox">
        <input type="checkbox">
        <label>卡莉絲</label>
    </div>
    <div class="ts checkbox">
        <input type="checkbox">
        <label>依可諾爾</label>
    </div>
</div>`,
            mark  : 'left aligned, right aligned, center aligned',
            remove: '<br><br>'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '核取方塊有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已停用',
            description: `一個核取方塊可以顯示已經被停用、不可使用的樣子。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts disabled checkbox">
    <input type="checkbox">
    <label>你不能點擊我</label>
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '核取方塊有不同的外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '自動層疊',
            description: `核取方塊群組可以在行動裝置上自動層疊，而不是保持水平排列。欲要觀看效果，你可能需要使用手機裝置瀏覽此範例。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts horizontal stackable checkboxes">
    <div class="ts radio checkbox">
        <input type="radio" name="os">
        <label>Windows</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="os">
        <label>Linux</label>
    </div>
    <div class="ts radio checkbox">
        <input type="radio" name="os">
        <label>macOS</label>
    </div>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '反色',
            description: `核取方塊可以是反色的。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts inverted segment">
    <div class="ts inverted checkboxes">
        <div class="ts checkbox">
            <input type="checkbox">
            <label>洨安</label>
        </div>
        <div class="ts checkbox">
            <input type="checkbox">
            <label>卡特雅</label>
        </div>
        <div class="ts checkbox">
            <input type="checkbox">
            <label>皮爾</label>
        </div>
    </div>
</div>`,
            mark: 'inverted'
        },
    ]
}