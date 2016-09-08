<template>
    <div>
        <doc-nav></doc-nav>
        <doc-jumbotron :title="items.header.title" :subTitle="items.header.subTitle"></doc-jumbotron>
        <div class="ts narrow container">
            <div class="ts relaxed grid">
                <div class="four wide column">
                    <div class="ts flatted borderless secondary relaxed vertical menu">
                        
                        <template v-for="item in items.html">
                            
                            <span class="item" v-if="item.link === false" v-text="item.title"></span>
                            <a class="item" :href="'#' + item.link" v-if="item.link" v-text="item.title"></a>
                            
                        </template>
                    </div>
                </div>
                <div class="twelve wide column">
                    
                    <template v-for="item in items.html">

                        <a :name="item.link" v-if="item.link" class="anchor"></a>
                        
                        <doc-header :title="item.title" size="large" v-if="item.type == 'large'" :description="item.description"></doc-header>
                        
                        <doc-header :title="item.title" v-if="item.type == 'normal'" :description="item.description"></doc-header>
                        
                        <doc-header :title="item.title" size="tiny" v-if="item.type == 'tiny'" :description="item.description"></doc-header>
                        
                        <doc-header :title="item.title" size="small" v-if="item.type == 'small'" :description="item.description"></doc-header>
                        
                        <doc-example :code="item.code" 
                                          :mark="item.mark"
                                          :tagMark="item.tagMark"
                                          :remove="item.remove"
                                          v-if="item.type == 'example'"></doc-example>
                    
                        <doc-example :code="item.code" 
                                          :mark="item.mark"
                                          :tagMark="item.tagMark"
                                          :hasExample="false"
                                          v-if="item.type == 'source'"></doc-example>
                    </template>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style style="sass" scoped>
.four.column
{
    padding-right: 4rem !important;
}
.four.column:after
{
    content       : "";
    position      : absolute;
    top           : 1em;
    right         : 2em;
    bottom        : 0;
    left          : 0;
    border-right  : 2px solid rgba(0, 0, 0, 0.1);
    pointer-events: none;
}
.vertical.menu .item
{
    padding: 1.2em;
}
.vertical.menu span.item
{
    padding-left: 0;
    display: block;
    margin: 15px 15px 15px 0px;
    font-size: 18px;
    font-weight: 500;
    color: #005F5F;
    border-bottom: 1px dashed #B3FFFF;
    padding-bottom: .8em;
}
.anchor
{
    visibility: hidden;
}
.anchor:first-child + div
{
    margin-top: 1em !important;
}
</style>

<style>
p > .ts.label
{
    color: #333 !important;
}
</style>

<script>
import DocHeader    from '../components/DocHeader'
import DocJumbotron from '../components/DocJumbotron'
import DocNav       from '../components/DocNav'
import DocExample   from '../components/DocExample'

export default 
{
    name      : 'DocBasic',
    components: 
    {
        DocHeader,
        DocJumbotron,
        DocNav,
        DocExample
    },
    props:
    {
        items: { default: null }
    }
}
</script>
