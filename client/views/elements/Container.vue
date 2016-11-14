<template>
    <div>
        <doc-basic :items="items" :sidebar="false"></doc-basic>
    </div>
</template>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/elements/container'

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
        document.title = '容器 | Tocas UI'
    }
}
</script>