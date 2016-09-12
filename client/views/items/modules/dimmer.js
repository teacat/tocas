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
        title   : '淡化幕',
        subTitle: 
        `
            國防布。
        `
    },
    html: 
    [
        {
            type       : normal,
            title      : '種類',
            description: '淡化幕有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的淡化幕。`,
            link       : 'dimmer'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <div class="ts active dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>`,
            mark: 'dimmer'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '淡化幕有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '已啟用',
            description: `淡化幕只有在啟用時才會出現。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <div class="ts active dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '已停用',
            description: `淡化幕可以被停用，如此一來就不會遮蔽或是淡化任何物件。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <div class="ts disabled dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '淡化幕有不同的外觀樣式可供點綴。',
            link       : false
        },
        {
            type       : small,
            title      : '反色',
            description: `淡化幕可以是反色的。`,
            link       : 'inverted'
        },
        {
            type: 'example',
            code: `<div class="ts segment">
    <div class="ts inverted active dimmer"></div>
    <p>看似最重要的東西卻沒能被妥善利用，</p>
    <p>沒有人能發現這一點，因為他們早已活在過去，</p>
    <p>才剛開始的序章卻被放在頁尾。</p>
</div>`,
            mark: 'inverted'
        },
    ]
}