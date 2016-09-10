<template>
    <div>
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/modules/dropdown'
import '../../asserts/tocas.js'

setTimeout(() =>
{
    ts('.ts.dropdown:not(.basic)').dropdown()
}, 1000)

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
        document.title = '下拉式選單 | Tocas UI'
    }
}
</script>