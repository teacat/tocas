<template>
    <div class="card documentation">
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<style>
.card.documentation .ts.card
{
    width: 300px;
}
</style>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/views/card'

export default 
{
    components: 
    {
        DocBasic
    },
    data()
    {
        return { items: items }        
    },
    beforeCreate()
    {
        document.title = '卡片 | Tocas UI'
    }
}
</script>