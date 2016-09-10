<template>
    <div>
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/modules/calendar'

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
        document.title = '日曆 | Tocas UI'
    }
}
</script>