<template>
    <div>
        <doc-list :cards="cards.cards"
                  :title="cards.header.title"
                  :subTitle="cards.header.subTitle"></doc-list>
    </div>
</template>

<script>
import DocList from '../components/DocList'
import cards   from './items/modules'

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
        document.title = '模塊 | Tocas UI'
    }
}
</script>