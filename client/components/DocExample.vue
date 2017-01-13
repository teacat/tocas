<template>
    <div class="example preview" :class="{inverted: inverted}">

        <!-- 無框實際範例 -->
        <div class="real example" v-html="code" v-if="hasExample" :style="style"></div>
        <!-- / 無框實際範例 -->

        <button class="ts small secondary labeled icon button" v-if="!hasExample && executable" v-on:click="ev(code)">
            <i class="bug icon"></i>
            執行程式碼
        </button>

        <!-- 原始碼片段 -->
        <div class="ts padded secondary segment" v-if="!hasExample">
            <pre class="code"><code class="hljs" :data-utaha-hightlight="mark" :data-utaha-tag-hightlight="tagMark" :data-utaha-remove="remove">{{ code }}</code></pre>
        </div>
        <!-- / 原始碼片段 -->


        <!-- 範例片段 -->
        <div class="ts example segments" v-if="hasExample">

            <!-- 實際範例 -->
            <div class="ts clearing preview segment" v-html="code" :style="style"></div>
            <!-- / 實際範例 -->

            <!-- 原始碼 -->
            <div class="ts padded secondary segment">
                <pre class="code"><code class="hljs" :data-utaha-hightlight="mark" :data-utaha-tag-hightlight="tagMark" :data-utaha-remove="remove">{{ code }}</code></pre>
            </div>
            <!-- / 原始碼 -->

        </div>
        <!-- / 範例片段 -->

    </div>
</template>

<style>
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

<style lang="scss" scoped>
pre
{
    overflow-x: auto;
    margin: 0;
}
.example.preview
{
    &.inverted
    {
        border-radius: 4px;
        background-color: #34495e;
        .real.example,
        .ts.example.segments .preview.segment
        {
            border-radius: 4px;
            background-color: #34495e;
        }
    }
    .real.example
    {
        display: block;
    }
    .ts.example.segments
    {
        display: none;
    }

    &.expanded
    {
        .real.example
        {
            display: none;
        }
        .ts.example.segments
        {
            display: block;
        }
    }
}
</style>

<script>


export default
{
    name : 'ExampleSegments',
    methods:
    {
        ev(code)
        {
            var prev = jA(this.$el).prev().prev()

            if(prev.hasClass("example"))
                prev.removeClass("expanded")

            eval(code)
        }
    },
    props:
    {
        style      : { default: null  },
        code       : { default: ''    },
        mark       : { default: null  },
        tagMark    : { default: null  },
        inverted   : { default: false },
        remove     : { default: null  },
        hasExample : { default: true  },
        showingCode: { default: false },
        executable : { default: false }
    }
}
</script>
