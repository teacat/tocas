<template>
    <div>
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/collections/table'

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
        document.title = '表格 | Tocas UI'
    },
    mounted()
    {
        ts('.ts.sortable.table').tablesort()
    }
}
</script>