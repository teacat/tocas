<template>
    <doc-list :cards="cards.cards" 
              :title="cards.header.title"
              :subTitle="cards.header.subTitle"></doc-list>
</template>

<script>
import DocList from '../components/DocList'
import cards   from './items/elements'

export default 
{
    components: 
    {
        DocList
    },
    data()
    {
        return { cards: cards }        
    },
    beforeCreate()
    {
        document.title = '一般元素 | Tocas UI'
    }
}
</script>