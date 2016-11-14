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
        title   : '步驟',
        subTitle:
        `
            告訴別人下一步會是什麼。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '步驟具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '步驟',
            description: `一個最基本的步驟。`,
            link       : 'step'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="step">
      運送
    </div>
</div>`,
            mark: 'step'
        },
        {
            type       : normal,
            title      : '群組',
            description: '步驟可以是一個群組。',
            link       : false
        },
        {
            type       : small,
            title      : '步驟群組',
            description: `一個最基本的步驟群組。`,
            link       : 'steps'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="info icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>`,
            mark: 'step, steps'
        },
        {
            type       : small,
            title      : '排序',
            description: `步驟群組可以有號碼排序。`,
            link       : 'ordered'
        },
        {
            type: 'example',
            code: `<div class="ts ordered steps">
    <div class="completed step">
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="completed step">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>`,
            mark: 'ordered'
        },
        {
            type       : small,
            title      : '垂直',
            description: `步驟群組可以是垂直擺放的。`,
            link       : 'vertical'
        },
        {
            type: 'example',
            code: `<div class="ts vertical steps">
    <div class="completed step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="completed step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>`,
            mark: 'vertical'
        },
        {
            type       : normal,
            title      : '內容',
            description: '步驟的內容是各式各樣的。',
            link       : false
        },
        {
            type       : small,
            title      : '標題',
            description: `步驟裡面可以有標題。`,
            link       : 'title'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="step">
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
</div>`,
            mark: 'title'
        },
        {
            type       : small,
            title      : '註釋',
            description: `步驟裡面可以包含註釋。`,
            link       : 'description'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="step">
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
</div>`,
            mark: 'description'
        },
        {
            type       : small,
            title      : '圖示',
            description: `步驟也能夠擁有圖示。`,
            link       : 'icon'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
</div>`,
            mark: 'icon'
        },
        {
            type       : small,
            title      : '連結',
            description: `步驟本身可以是連結。`,
            link       : 'link'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <a class="active step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </a>
    <a class="step">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </a>
</div>`,
        },
        {
            type       : tiny,
            title      : '非傳統的連結',
            description: `步驟的連結樣式也可以出現在非傳統連結標籤上。`
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="link step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="link step">
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>`,
            mark: 'link'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '步驟有許多不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '行進中',
            description: `顯示一個步驟是目前正在行進中的。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '完成',
            description: `顯示一個已經完成的步驟。`,
            link       : 'completed'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="completed step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
</div>`,
            mark: 'completed'
        },
        {
            type       : small,
            title      : '已停用',
            description: `用來顯示一個不能被選擇的步驟。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts steps">
    <div class="disabled step">
        結帳
    </div>
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '步驟的外觀有所不同。',
            link       : false
        },
        {
            type       : small,
            title      : '可層疊的',
            description: `在螢幕縮小時，步驟可以被層疊起來。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts stackable steps">
    <div class="completed step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '流動',
            description: `步驟的寬度可以是填滿容器寬度的。`,
            link       : 'fluid'
        },
        {
            type: 'example',
            code: `<div class="ts vertical fluid steps">
    <div class="completed step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="active step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
            <div class="description">認證訂單資訊</div>
        </div>
    </div>
</div>`,
            mark: 'fluid'
        },
        {
            type       : small,
            title      : '附著',
            description: `步驟可以附著在其他元件上。`,
            link       : 'attached'
        },
        {
            type: 'example',
            code: `<div class="ts three top attached steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="info icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts flatted attached segment">
    <p>月月，搭拉安！</p>
    <p>月月，搭拉安！</p>
    <p>月月，搭拉安！</p>
</div>
<div class="ts three bottom attached steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
            <div class="description">選擇你的運送方式</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
            <div class="description">輸入結帳資訊</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="info icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>`,
            mark: 'top attached, bottom attached, attached'
        },
        {
            type       : small,
            title      : '平均分割',
            description: `步驟的寬度可以依照自訂的步驟數來進行平均劃分。`,
            link       : 'evenly-divided'
        },
        {
            type: 'example',
            code: `<div class="ts three steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>`,
            mark: 'three'
        },
        {
            type       : small,
            title      : '尺寸',
            description: `步驟具有不同尺寸。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts tiny steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts small steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts medium steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts large steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts big steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts huge steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>
<div class="ts massive steps">
    <div class="step">
        <i class="truck icon"></i>
        <div class="content">
            <div class="title">運送</div>
        </div>
    </div>
    <div class="active step">
        <i class="payment icon"></i>
        <div class="content">
            <div class="title">結帳</div>
        </div>
    </div>
    <div class="disabled step">
        <i class="notice icon"></i>
        <div class="content">
            <div class="title">確認訂單</div>
        </div>
    </div>
</div>`,
            mark: 'mini, tiny, small, medium, large, big, huge, massive'
        },
    ]
}