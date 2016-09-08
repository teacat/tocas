<template>
    <div>
        <doc-basic :items="items"></doc-basic>
    </div>
</template>

<style lang="sass">
.example .ts.grid:not(.three)
{
    &:before
    {
        position: absolute;
        top: calc(0.44rem - 1px);
        bottom: calc(0.44rem - 1px);
        left: calc(0.44rem - 1px);
        right: calc(0.44rem - 1px);
        z-index: 1;
        content: '';
        border: 1px solid #929292;
    }
    
    &.relaxed:before
    {
        left: calc(0.88rem - 1px);
        right: calc(0.88rem - 1px);
    }
    
    .grid:before
    {
        border-width: 2px
    }
    
    .row:before
    {
        position: absolute;
        top: calc(0.44rem - 1px);
        bottom: calc(0.44rem - 1px);
        left:calc(0.44rem - 1px);
        right: calc(0.44rem - 1px);
        z-index: 1;
        content: '';
        border: 2px solid #808080;
    }
}

.example .ts.grid:not(.three)  .column:not(.row):not(.grid)
{
    display: flex;
    align-content: center;
    flex-direction: column;
    height: 5em;
    background: #E2E2E2;
    color: #909090;
    background-clip: content-box;
}
    
.example .ts.grid:not(.three)  .column:not(.row):not(.grid):after
{
    box-shadow: 0px 0px 0px 1px rgba(86, 61, 124, 0.2) inset;
    content: "";
    display: block;
    position: absolute;
    top: 0.44rem;
    right: 0.44rem;
    bottom: 0.44rem;
    left: 0.44rem;
}   

.example .ts.relaxed.grid:not(.three)  .column:not(.row):not(.grid):after
{
    right: 0.88rem;
    left: 0.88rem;
}    


.example .ts.grid.two
{
    > .column:not(.row):not(.grid):first-child
    {
        height: 5em;
        background: transparent;
        background-clip: content-box;
    }
}
</style>

<script>
import DocBasic from '../../components/DocBasic'
import items    from '../items/collections/grid'

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