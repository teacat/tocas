<template>
    <div>

        <!-- 導航欄 -->
        <doc-nav></doc-nav>
        <!-- / 導航欄 -->


        <!-- 聚焦看板 -->
        <doc-jumbotron :title="items.header.title"
                       :subTitle="items.header.subTitle"></doc-jumbotron>
        <!-- / 聚焦看板 -->


        <!-- 主要區塊 -->
        <div class="ts narrow container">

            <!-- 網格系統 -->
            <div class="ts relaxed stackable grid">

                <!-- 左側索引 -->
                <div class="four wide column" v-if="sidebar">

                    <!-- 選單 -->
                    <div class="ts flatted borderless secondary relaxed vertical menu">

                        <template v-for="item in items.html">

                            <!-- 純標題文字 -->
                            <span class="item" v-if="item.link === false" v-text="item.title"></span>
                            <!-- / 純標題文字 -->


                            <!-- 連結文字 -->
                            <a class="item" :href="'#' + item.link" v-if="item.link">
                                <span v-if="item.wip">{{item.title}} <span class="ts warning horizontal label">未完成</span></span>
                                <span v-if="!item.wip">{{item.title}}</span>
                            </a>
                            <!-- / 連結文字 -->

                        </template>

                    </div>
                    <!-- / 選單 -->

                </div>
                <!-- / 左側索引 -->


                <!-- 右側文件內容 -->
                <div :class="{'twelve wide column': sidebar, 'sixteen wide column': !sidebar}">

                    <template v-for="item in items.html">

                        <!-- 錨點 -->
                        <a :name="item.link" v-if="item.link" class="anchor"></a>
                        <!-- / 錨點 -->


                        <!-- 標題 -->
                        <doc-header :title="item.title"
                                    :description="item.description"
                                    :expandableExample="item.expandableExample"
                                    :wip="item.wip"
                                    size="large"
                                    v-if="item.type == 'large'"></doc-header>
                        <doc-header :title="item.title"
                                    :description="item.description"
                                    :expandableExample="item.expandableExample"
                                    :wip="item.wip"
                                    size="normal"
                                    v-if="item.type == 'normal'"></doc-header>
                        <doc-header :title="item.title"
                                    :description="item.description"
                                    :expandableExample="item.expandableExample"
                                    :wip="item.wip"
                                    size="tiny"
                                    v-if="item.type == 'tiny'"></doc-header>
                        <doc-header :title="item.title"
                                    :description="item.description"
                                    :expandableExample="item.expandableExample"
                                    :wip="item.wip"
                                    size="small"
                                    v-if="item.type == 'small'"></doc-header>
                        <!-- / 標題 -->


                        <!-- 範例區塊 -->
                        <doc-example :executable="item.executable"
                                     :style     ="item.style"
                                     :inverted  ="item.inverted"
                                     :code      ="item.code"
                                     :mark      ="item.mark"
                                     :tagMark   ="item.tagMark"
                                     :remove    ="item.remove"
                                     v-if="item.type == 'example'"></doc-example>

                        <doc-example :executable="item.executable"
                                     :style     ="item.style"
                                     :inverted  ="item.inverted"
                                     :code      ="item.code"
                                     :mark      ="item.mark"
                                     :tagMark   ="item.tagMark"
                                     :hasExample="false"
                                     v-if="item.type == 'source'"></doc-example>
                        <!-- / 範例區塊 -->

                    </template>

                </div>
                <!-- / 右側文件內容 -->

            </div>
            <!-- / 網格系統 -->

            <h2 class="ts massive disqus header">
                本頁留言
                <div class="sub header">你現在可以在這裡留言啦！如果有功能建議或是發現錯誤，可以<a href="https://github.com/TeaMeow/TocasUI">這裡提出 Issue</a>。</div>
            </h2>

            <!-- Disqus -->
            <div id="disqus_thread"></div>
            <!-- / Disqus -->

        </div>
        <!-- / 主要區塊 -->


        <!-- 頁腳 -->
        <doc-footer></doc-footer>
        <!-- / 頁腳 -->

    </div>
</template>

<style lang="scss" scoped>
.ts.disqus.header
{
    margin-top: 3em;
    margin-bottom: .5em;
}

.ts.narrow.container
{
    overflow-x: hidden;
    overflow-y: hidden;
}

.ts.warning.horizontal.label
{
    margin-left: 8px !important;
}

/** 左側欄位 */
.four.column
{
    padding-right: 4rem !important;

    /** 左側欄位邊線 */
    &:after
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
}

/** 左側選單 */
.vertical.menu
{
    /** 一般項目 */
    .item
    {
        padding: 1.2em;
    }

    /** 純文字項目 */
    span.item
    {
        padding-left  : 0;
        display       : block;
        margin        : 0px 0px 15px 6px !important;
        font-size     : 18px;
        font-weight   : 500;
        color         : #005F5F;
        border-bottom : 1px dashed #B3FFFF;
        padding-bottom: .8em;
    }
}

/** 手機版 */
@media (max-width: 767px)
{
    .ts.disqus.header
    {
        border-top: 2px solid rgba(0, 0, 0, 0.1);
        padding-top: 1em;
    }

    /** 左側欄位 */
    .four.column
    {
        margin-top   : -1em;
        margin-bottom: 2em;
        padding-right: 1.2rem !important;
        padding-left : 1.2rem !important;

        &:after
        {
            display: none !important;
        }

        /** 左側選單 */
        .vertical.menu span.item
        {
            margin-right: 0;
        }
    }

    /** 右側主要區塊 */
    .twelve.column
    {
        padding-right: 1.2rem !important;
        padding-left: 1.2rem !important;
    }


}
</style>

<style>
/** 說明內的標籤 */
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
import DocFooter    from '../components/DocFooter'

export default
{
    name      : 'DocBasic',
    components:
    {
        DocHeader,
        DocJumbotron,
        DocNav,
        DocExample,
        DocFooter
    },
    props:
    {
        items  : { default: null },
        sidebar: { default: true }
    },
    beforeCreate()
    {
        window.RENDER_STARTED_TIME = new Date().getTime()
    },
    mounted()
    {
        /** 將網頁捲至頂部　*/
        window.scrollTo(0, 0);

        /** 讀取 Disqus */
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = '//tocas-ui.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();

        /** 取得所有 Hightlight JS 元素 */
        var examples = document.querySelectorAll('.hljs');

        /** 移除程式碼 */
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

        /** 重新 Hightlight 程式碼 */
        hljs.initHighlighting.called = false;
        hljs.initHighlighting()

        /** 標記重要樣式名稱 */
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

        /** 標記重要標籤名稱 */
        for(var el in examples)
        {
            var el = examples[el]

            if(typeof el === 'number' || typeof el === 'function')
                continue

            var hightlights = el.getAttribute('data-utaha-tag-hightlight')

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

        /** 更改渲染時間 */
        this.$store.dispatch('CALCULATE_RENDER_TIME', {time       : new Date().getTime(),
                                                       startedTime: window.RENDER_STARTED_TIME})
    }
}
</script>
