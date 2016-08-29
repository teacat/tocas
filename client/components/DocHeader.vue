<template>
    <div :class="classes">
        <h2 class="ts header" :class="classes">
            {{ title }}
        </h2>
        <p v-if="description" v-html="description">
        </p>
    </div>
    
    
</template>

<style style="sass" scoped>
h2
{
    font-size          : 2em !important;
    border-bottom-width: 2px !important;
}
div
{
    margin-top   : 3em !important;
    margin-bottom: 1.5em !important;
}
div:first-child
{
    margin-top   : 1em !important;
}
div.small
{
    margin-top: 4em !important;
}
.large:not(div)
{
    font-size: 2.5em !important;
}
.large:not(div) + p
{
    font-size  : 1.2em;
    line-height: 1.8em;
}
.small:not(div)
{
    font-size: 1.7em !important;
}
.tiny:not(div)
{
    font-size: 1.3em !important;
    opacity: 0.9 !important;
}
p
{
    opacity: 0.7;
    font-size  : 1.1em;
    line-height: 1.8em;
}
.tiny:not(div) + p
{
    opacity: 0.6;
}
</style>

<script>
export default 
{
    name : 'DocHeader',
    props:
    {
        title      : {},
        size       : { default: false },
        description: { default: false }
    },
    computed:
    {
        classes()
        {
            let classes = [this.size]
            
            if(this.size === 'large' || !this.size)
                classes.push('dividing')
                
            return classes
        },
        hasSlot()
        {
            return this.$slots !== null
        }
    }
}
</script>
