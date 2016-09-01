<template>
    <div>
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/elements/icon'

export default 
{
    components: 
    {
        DocBasic
    },
    data()
    {
        return { items: items }        
    }
}
</script>