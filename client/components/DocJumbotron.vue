<template>
    <header class="ts fluid horizontally fitted padded heading slate">
        <div class="ts narrow container">
            <h1 class="ts left aligned header">
                {{ title }}
                <br>
                <small class="sub header" v-html="subTitle"></small>
            </h1>
        </div>
    </header>
</template>

<style style="sass" scoped>
h1
{
    font-size: 3em !important;
}
h1 .sub.header
{
    margin-top: .8em;
    font-size : 0.45em !important;
}
.slate
{
    display: block;
    margin-bottom: 2em !important;
}
</style>

<script>
export default
{
    name: 'DocJumbotron',
    props:
    {
        title   : { default: '' },
        subTitle: { default: '' },
    }
}
</script>