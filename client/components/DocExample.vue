<template>
    <div>
        <button class="ts mini labeled icon button" style="    position: absolute;
    margin-top: -4.5em;
    right: 1em;" @click="test">
            <i class="code icon" v-show="!showingCode"></i>
            <i class="hide icon" v-show="showingCode"></i>
            <span v-show="showingCode">隱藏原始碼</span>
            <span v-show="!showingCode">檢視原始碼</span>
        </button>
        <div v-html="code" v-show="!showingCode">
            
        </div>
        <div class="ts example segments" v-show="showingCode">
            <div class="ts clearing preview segment" v-html="code" v-if="hasExample"></div>
            <pre class="ts secondary padded segment code"><code class="hljs" :data-utaha-hightlight="mark" :data-utaha-tag-hightlight="tagMark" :data-utaha-remove="remove">{{ code }}</code>
            <div class="ts top right attached label">原始碼</div></pre>
        </div>
    </div>
</template>

<style style="sass">
.hljs
{
    background  : none    !important;
    color       : #8E8E8E !important;
    line-height : 21px    !important;
    font-size   : 14px;
    overflow-x  : scroll;
    font-weight : normal;
    font-family : "Ubuntu Mono";
    word-spacing: 2px;
    letter-spacing: .02em;
}
.hljs .hljs-variable,
.hljs .hljs-template-variable,
.hljs .hljs-tag,
.hljs .hljs-name,
.hljs .hljs-selector-id,
.hljs .hljs-selector-class,
.hljs .hljs-regexp,
.hljs .hljs-deletion
{
    color: #8E8E8E;
}
.hljs .hljs-string,
.hljs .hljs-symbol,
.hljs .hljs-bullet,
.hljs .hljs-addition
{
    color: #0683A3 !important;
}
.hljs .hljs-attribute
{
    color       : #B58E00 !important;
    margin-right: 0.2em;
}
.hljs .hljs-important-class
{
    background-color: #52C6CA;
    padding         : 1px 3px;
    border-radius   : 4px;
    color           : #FFF !important;
}
.hljs .hljs-important-class * 
{
   color: #FFF !important;
}
.hljs *
{
  font-weight: normal        !important;
  font-family: "Ubuntu Mono" !important;
}
code.hljs.javascript
{
    color: #008076 !important; 
}
code.hljs.javascript .hljs-string
{
    margin: 0 4px;
}
.example.segments .preview.segment strong
{
    opacity: 0.7;
}
.ts.example.segments + .ts.example.segments
{
    margin-top: 50px;
}
</style>

<style style="sass" scoped>
pre
{
    overflow-x: auto;
}
</style>

<script>
$(() =>
{
    var examples = document.querySelectorAll('.hljs');
    
    for(var el in examples)
    {
        var el = examples[el]
        
        if(typeof el === 'number' || typeof el === 'function')
            continue
            
        var removes = el.getAttribute('data-utaha-remove')
        
        if(removes === null)
            continue
            
        var removes = removes.split(', ')
        
        for(var remove in removes)
        {
            var thisPart = removes[remove]
            var regEx    = new RegExp(thisPart, 'g')
            
            if(el.innerText.indexOf(thisPart) == -1)
                continue
                    
            el.innerText = el.innerText.replace(regEx, '')
        }
    }
    
    hljs.initHighlighting();
    
    for(var el in examples)
    {
        var el = examples[el]
        
        if(typeof el === 'number' || typeof el === 'function')
            continue
            
        var hightlights = el.getAttribute('data-utaha-hightlight')
            
        if(hightlights === null)
            continue
        
        var hightlights = hightlights.split(', ')
         
        for(var hightlight in hightlights)
        {
            var thisPart    = hightlights[hightlight]
            var strings     = el.querySelectorAll('.hljs-string')
            var replacePart = '<span class="hljs-important-class">' + thisPart + '</span>'
    
            for(var j = 0; j < strings.length; j++)
            {
                if(strings[j].innerHTML.indexOf(thisPart) == -1)
                    continue
    
                strings[j].innerHTML = strings[j].innerHTML.replace(thisPart, replacePart)
            }
        }
    }
    
    for(var el in examples)
    {
        var el = examples[el]
        
        if(typeof el === 'number' || typeof el === 'function')
            continue
            
        var hightlights = el.getAttribute('data-utaha-tag-hightlight')
            console.log(hightlights)
        if(hightlights === null)
            continue
        
        var hightlights = hightlights.split(', ')
         
        for(var hightlight in hightlights)
        {
            var thisPart    = hightlights[hightlight]
            var strings     = el.querySelectorAll('.hljs-name')
            var replacePart = '<span class="hljs-important-class">' + thisPart + '</span>'
    
            for(var j = 0; j < strings.length; j++)
            {
                if(strings[j].innerHTML.indexOf(thisPart) == -1)
                    continue
    
                strings[j].innerHTML = strings[j].innerHTML.replace(thisPart, replacePart)
            }
        }
    }
})

export default 
{
    name : 'ExampleSegments',
    props:
    {
        code       : { default: ''    },
        mark       : { default: null  },
        tagMark    : { default: null  },
        remove     : { default: null  },
        hasExample : { default: true  },
        showingCode: { default: false }
    },
    methods:
    {
        test()
        {
            if(this.showingCode)
                this.showingCode = false
            else
                this.showingCode = true
        }
    }
}
</script>
