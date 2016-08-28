<template>
    <div class="page">
        <doc-header></doc-header>
        <doc-jumbotron title="入門教學">
            人生已經很無聊了，別讓你的網頁也再無聊下去
            <br>
            從這裡你將會知道如何開始一段新的網頁人生。
        </doc-jumbotron>
        <div class="ts container">
            <div class="ts relaxed grid">
                <div class="four wide column">
                    <div class="ts flatted borderless secondary relaxed vertical menu">
                        <a class="item" :href="anchor.link" v-for="anchor in items.anchors" v-text="anchor.text"></a>
                    </div>
                </div>
                <div class="twelve wide column">
                    
                    <template v-for="item in items.html">

                        <a :name="item.anchor"></a>
                        
                        <helper-header :title="item.title" size="large" v-if="item.type == 'large'" :description="item.description"></helper-header>
                        
                        <helper-header :title="item.title" v-if="item.type == 'normal'" :description="item.description"></helper-header>
                        
                        <helper-header :title="item.title" size="tiny" v-if="item.type == 'tiny'" :description="item.description"></helper-header>
                        
                        <helper-header :title="item.title" size="small" v-if="item.type == 'small'" :description="item.description"></helper-header>
                        
                        <example-segments :code="item.code" 
                                          :mark="item.mark"
                                          :remove="item.remove"
                                          v-if="item.type == 'example'"></example-segments>
                    
                        <example-segments :code="item.code" 
                                          :mark="item.mark"
                                          :hasExample="false"
                                          v-if="item.type == 'source'"></example-segments>
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
.ts.label
{
    color: #333 !important;
}
</style>

<script>
import DocHeader       from '../components/DocHeader'
import DocJumbotron    from '../components/DocJumbotron'
import HelperHeader    from '../components/HelperHeader'
import ExampleSegments from '../components/ExampleSegments'
import pageItems       from './test'

export default 
{
    components: 
    {
        DocHeader,
        DocJumbotron,
        HelperHeader,
        ExampleSegments
    },
    data()
    {
        return { items: pageItems }        
    }
}
</script>
