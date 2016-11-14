<template>
    <div class="card documentation">
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<style>
.card.documentation *:not(.three):not(.four):not(.stackable):not(.waterfall) > .ts.card
{
    width: 285px;
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