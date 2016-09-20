<template>
    <div class="tocas section header" :class="size">

        <!-- 標題 -->
        <h2 class="ts dividing header" v-if="size == 'large'">
            <span v-html="title"></span> <span v-if="wip" class="ts warning horizontal label">未完成</span>
        </h2>
        <h3 class="ts dividing header" v-if="size == 'normal'">
            <span v-html="title"></span> <span v-if="wip" class="ts warning horizontal label">未完成</span>
        </h3>
        <h4 class="ts header"          v-if="size == 'small'">
            <span v-html="title"></span> <span v-if="wip" class="ts warning horizontal label">未完成</span>
        </h4>
        <h5 class="ts header"          v-if="size == 'tiny'">
            <span v-html="title"></span> <span v-if="wip" class="ts warning horizontal label">未完成</span>
        </h5>
        <!-- / 標題 -->
            
        <!-- 註釋 -->
        <p class="description" v-if="description" v-html="description"></p>
        <!-- / 註釋 -->
        
        <!-- 檢視原始碼按鈕 -->
        <button class="ts expand tiny labeled icon button" 
                v-if="expandableExample && size != 'large' && size != 'normal'" 
                @click="expand">
            <i class="code icon"></i>
            <span>原始碼</span>
        </button>
        <!-- / 檢視原始碼按鈕 -->
        
    </div>
</template>

<style lang="sass">
.tocas.section.header,
.tocas.section.header p
{
    clear         : both;
    position      : relative;
    font-size     : 16px;
    line-height   : 28px;
    letter-spacing: 0.08px;
    color         : #6f6e6e;
    
    &.small,
    &.tiny
    {
        margin-bottom: 1.5em;
    }
    
    &.tiny
    {
        .tiny.button
        {
            top: -.5em !important;
        }
    }
    
    .description
    {
        margin-top: 0 !important;
        
        .ts.label
        {
            color: #676767 !important;
        }
    }
}

.tocas.section.header.normal:first-child
{
    font-size: 28px;
    margin-top: -4em;
}
</style>

<style lang="sass" scoped>
h2
{
    font-size    : 32px !important;
    line-height  : 1.8em             !important;
    border-bottom: 2px solid #d9d9d9 !important;
    color: #636262 !important;
}
h3
{
    font-size    : 28px !important;
    color        : #606060           !important;
    margin-top   : 4em               !important;
    line-height  : 1.5em             !important;
    border-bottom: 2px solid #d9d9d9 !important;
}
h4
{
    font-size : 24px !important;
    color     : #606060 !important;
    margin-top: 4em !important;
    display   : inline-block;
    
    & + .description,
    & + .description p
    {
        font-size: 15px !important;
    }
}
h5
{
    margin-top: 3em !important;
    
    & + .description,
    & + .description p
    {
        font-size: 15px !important;
    }
}
.button
{
    position : absolute !important;
    right    : 0;
    top      : 6.7em;
    transform: scale(0.9);
}
</style>

<script>
export default 
{
    name : 'DocHeader',
    props:
    {
        title            : {},
        size             : { default: false },
        description      : { default: false },
        expandableExample: { default: true  },
        wip              : { default: false }
    },
    methods:
    {
        expand()
        {
            var $next = jA(this.$el).next()
            
            $next.toggleClass('expanded')
        }
    }
}
</script>
