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
        title   : '麵包屑',
        subTitle:
        `
            留下導覽的痕跡。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '在這裡瀏覽麵包屑的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '麵包屑',
            description: `最基本的麵包屑。`,
            link       : 'breadcrumb'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <div class="divider"> / </div>
    <a class="section">商店</a>
    <div class="divider"> / </div>
    <div class="active section">T-Shirt</div>
</div>`,
            mark: 'breadcrumb'
        },
        {
            type       : small,
            title      : '圖示分隔',
            description: `麵包屑也能夠由圖示來當做分隔線。`,
            link       : 'breadcrumb'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <i class="right angle icon divider"></i>
    <a class="section">商店</a>
    <i class="right angle icon divider"></i>
    <div class="active section">T-Shirt</div>
</div>`,
            mark: 'icon divider'
        },
        {
            type       : normal,
            title      : '內容',
            description: '麵包屑由不同的內容所組成。',
            link       : false
        },
        {
            type       : small,
            title      : '分隔線',
            description: `麵包屑可以帶有分隔線來表示其中的關係，這個分隔線可以是文字或是圖示。`,
            link       : 'divider'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <span class="divider">/</span>
    <a class="section">註冊程序</a>
    <span class="divider">/</span>
    <div class="active section">個人資料</div>
</div>
<br><br>
<div class="ts breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊程序</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>`,
            mark  : 'divider',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '區塊',
            description: `麵包屑可以包含區塊，能夠是連結或是純文字。`,
            link       : 'section'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
    <div class="section">首頁</div>
    <div class="divider"> / </div>
    <div class="active section">搜尋</div>
</div>`,
            mark: 'section'
        },
        {
            type       : small,
            title      : '連結',
            description: `區塊可以是連結，或者帶有連結文字。`,
            link       : 'link'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
  <a class="section">首頁</a>
  <div class="divider"> / </div>
  <div class="active section">搜尋：<a href="#">衛生紙</a></div>
</div>`,
            tagMark: 'a'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '麵包屑有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已啟用',
            description: `區塊可以表現出一個已被啟用的狀態。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<div class="ts breadcrumb">
    <a class="section">商品</a>
    <div class="divider"> / </div>
    <div class="active section">衛生紙</div>
</div>`,
            mark: 'active'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '麵包屑有著不同的外觀點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '尺寸',
            description: `麵包屑有不同的尺寸可供選擇。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<div class="ts mini breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts tiny breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts small breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts medium breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts large breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts big breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts huge breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>
<br>
<div class="ts massive breadcrumb">
    <a class="section">首頁</a>
    <i class="right chevron icon divider"></i>
    <a class="section">註冊手續</a>
    <i class="right chevron icon divider"></i>
    <div class="active section">個人資料</div>
</div>`,
            mark  : 'mini, tiny, small, medium, large, big, huge, massive',
            remove: '<br>'
        },
    ]
}