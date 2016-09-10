<template>
    <main>
        <doc-nav></doc-nav>
        <doc-jumbotron :title="title" :subTitle="subTitle"></doc-jumbotron>
        <section class="ts narrow container">
            <doc-cards :cards="cards"></doc-cards>
        </section>
        <doc-footer></doc-footer>
    </main>
</template>

<script>
import DocJumbotron from '../components/DocJumbotron'
import DocCards    from '../components/DocCards'
import DocNav      from '../components/DocNav'
import DocExample  from '../components/DocExample'
import DocFooter   from '../components/DocFooter'

export default 
{
    name      : 'DocList',
    components: 
    {
        DocCards,
        DocNav,
        DocFooter,
        DocJumbotron
    },
    props:
    {
        title   : {},
        subTitle: {},
        cards   : {}
    },
    beforeCreate()
    {
        window.RENDER_STARTED_TIME = new Date().getTime()
    },
    mounted()
    {
        this.$store.dispatch('CALCULATE_RENDER_TIME', {time       : new Date().getTime(), 
                                                       startedTime: window.RENDER_STARTED_TIME})
    }
}
</script>