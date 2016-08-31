<template>
    <div class="ts horizontally fitted extra padded jumbotron">
        <div class="ts container">
            <h1 class="ts left aligned header">
                {{ title }}
                <br>
                <p class="sub header" v-html="subTitle"></p>
            </h1>
        </div>
    </div>
</template>

<style style="sass" scoped>
h1
{
    font-size: 3em !important;
}
h1 .sub.header
{
    font-size: 0.45em !important;
}
.jumbotron
{
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