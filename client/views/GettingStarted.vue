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
                        <a class="item" href="#">引用檔案</a>
                        <a class="item" href="#">與其他框架比較</a>
                        <a class="item" href="#">基本語意</a>
                        <a class="item" href="#">命名規範</a>
                    </div>
                </div>
                <div class="twelve wide column">
                    <helper-header title="前言介紹" size="large">
                        Tocas UI 是一個基於 Semantic UI 的衍生分支，其傳承特色包括了獨具語意的寫法，同時也支援更彈性、多樣化的使用方式，並支援自動和手動響應式設計。
                    </helper-header>
                    <helper-header title="引用檔案">
                        欲要使用 Tocas UI，先從引用 Tocas UI 的相關文件開始，也請別忘記一同放置 fonts 文件夾。
                    </helper-header>
                    <helper-header title="基本語意">
                        Tocas UI 以更有意義的方式來命名類別名稱，就像是你直接稱呼這個元素一樣地親切。
                    </helper-header>
                    
                    <helper-header title="語氣渲染" size="small">
                        在 Tocas UI 中我們並不以「顏色」稱呼我們對元件的著色，
                        我們以「語氣」來表示這個元件的外觀，
                        例如「正面的」、「負面的」、「主要的」等。<br><br>
                        這麼做的好處是在更改主題顏色時，可以直接更換「正面的」顏色，
                        設想一下你將一個按鈕命名成「綠色」，當你要統一更改綠色按鈕為紅色時，
                        不就要將所有頁面上的「綠色」重新打成「紅色」嗎？
                    </helper-header>
                    <example-segments :code="buttonExample" 
                                       remove="<p><strong>主流語氣</strong></p>, <p><strong>抉擇語氣</strong></p>, <p><strong>副語氣</strong></p>, <br><br>"
                                       mark="primary, info, warning, positive, negative, inverted">
                    </example-segments>
                    
                    <helper-header title="發音方式" size="small">
                        在部分的元件上你可以有不同的「發音方式」，實際上就是像「次要」，「較不重要」這樣的感覺。
                    </helper-header>
                    <example-segments :code="segmentPronounceExample" 
                                       mark="secondary, tertiary">
                    </example-segments>
                    
                    <helper-header title="外觀尺寸" size="small">
                        除了語氣外，還支援八個尺寸，這比起其他的常見框架還要來得更多！也能夠讓你在設計外觀上更加地靈活。
                    </helper-header>
                    <example-segments :code="buttonSizeExample" 
                                       mark="mini, tiny, small, medium, large, big, huge, massive">
                    </example-segments>
                    
                    <helper-header title="命名規範">
                        除了你不曉得怎麼實踐的程式外，其次最難的不外乎就是「命名」。
                        通常使用其他的介面框架都不會有如此的規範。
                        但我們在這裡希望你能夠遵循 Tocas UI 的命名精神，
                        來讓頁面上的樣式名稱不再那麼混亂。
                    </helper-header>
                    
                    <helper-header title="區塊／容器" size="small">
                        區塊的樣式名稱不應有任何符號，或者是大小寫，在這裡僅用空白區隔。
                    </helper-header>
                    <helper-header title="HTML" size="tiny">
                        請像下方這樣做，你不應該用 <span class="ts label">block-container</span> 或 <span class="ts label">blockContainer</span> 命名他們。
                    </helper-header>
                    <example-segments :code="namingBlockHTML" :hasExample="false">
                    </example-segments>
                    <helper-header title="CSS" size="tiny">
                        像這樣簡單的用法，就像是你直接稱呼元素那樣地輕切。
                    </helper-header>
                    <example-segments :code="namingBlockCSS" :hasExample="false">
                    </example-segments>
                    
                    <helper-header title="元素" size="small">
                        元素的樣式名稱和區塊的命名方式相同。
                    </helper-header>
                    <helper-header title="HTML" size="tiny">
                        請像下方這樣做，你不應該用 <span class="ts label">single-block</span> 或 <span class="ts label">singleBlock</span> 命名他們。
                    </helper-header>
                    <example-segments :code="namingElementHTML" :hasExample="false">
                    </example-segments>
                    <helper-header title="CSS" size="tiny">
                        用法也是相當地簡單，像這樣。
                    </helper-header>
                    <example-segments :code="namingElementCSS" :hasExample="false">
                    </example-segments>
                    
                    <helper-header title="修飾詞" size="small">
                        修飾詞用來讓一個元素、區塊變成指定顏色，或者套用特殊樣式，<br>
                        而修飾詞的樣式名稱和先前的區塊與元素命名方式皆相同，但請注意樣式名稱應保有「語義」。<br>
                        例如：小的（small）不可以被縮寫成（sm），同時如果有兩個單字仍以空白隔開，例如：向左浮動（left floated）。
                    </helper-header>
                    <helper-header title="HTML" size="tiny">
                        請像下方這樣做，你不應該用 <span class="ts label">is-large</span> 或 <span class="ts label">container-lg</span> 命名他們。
                    </helper-header>
                    <example-segments :code="namingDecorationHTML" :hasExample="false">
                    </example-segments>
                    <helper-header title="CSS" size="tiny">
                        在較複雜的情況下你可能會遇到衝突，這個時候你可以使用較特別的選擇器。
                    </helper-header>
                    <example-segments :code="namingDecorationCSS" :hasExample="false">
                    </example-segments>
                    
                    <helper-header title="給 JavaScript 或其他用途" size="small">
                        有時候你會為了專門給 jQuery 或者 JavaScript 而另外命名了像是 <span class="ts label">js-reply-btn</span>，<br>
                        這通常是設計不良所導致的，但如果你真的沒辦法的話，<br>
                        在這裡我們則是建議和先前的命名方式一樣，但最前方加上減號。
                    </helper-header>
                    <helper-header title="HTML" size="tiny">
                        請像下方這樣做，你不應該用 <span class="ts label">js-main-reply-button</span> 或 <span class="ts label">js-btn</span> 命名他們。
                    </helper-header>
                    <example-segments :code="namingJavaScriptHTML" :hasExample="false">
                    </example-segments>
                    <helper-header title="CSS" size="tiny">
                        這種時候，你不應該賦予那些具減號的樣式一個樣式，所以基本上你只會有這些樣式。
                    </helper-header>
                    <example-segments :code="namingJavaScriptCSS" :hasExample="false">
                    </example-segments>
                    <helper-header title="JavaScript" size="tiny">
                        現在你可以像這樣選擇專門給 JavaScript 用的按鈕了。
                    </helper-header>
                    <example-segments :code="namingJavaScriptNative" :hasExample="false">
                    </example-segments>
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
import DocHeader    from '../components/DocHeader'
import DocJumbotron from '../components/DocJumbotron'
import HelperHeader from '../components/HelperHeader'
import ExampleSegments from '../components/ExampleSegments'

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
        return {
buttonExample:
`<p><strong>主流語氣</strong></p>
<button class="ts button">預設語氣</button>
<button class="ts primary button">主要語氣</button>
<button class="ts info button">提示語氣</button>
<button class="ts warning button">警告語氣</button>
<br><br>
<p><strong>抉擇語氣</strong></p>
<button class="ts positive button">肯定語氣</button>
<button class="ts negative button">否定語氣</button>
<br><br>
<p><strong>副語氣</strong></p>
<button class="ts inverted button">相反語氣</button>`,
segmentPronounceExample:
`<div class="ts segment">一般發音方式</div>
<div class="ts secondary segment">次要發音方式</div>
<div class="ts tertiary segment">其次發音方式</div>`,
buttonSizeExample:
`<button class="ts mini button">迷你</button>
<button class="ts tiny button">微小</button>
<button class="ts small button">小型</button>
<button class="ts medium button">中型</button>
<button class="ts large button">大型</button>
<button class="ts big button">稍大</button>
<button class="ts huge button">巨大</button>
<button class="ts massive button">重量級</button>`,

namingBlockHTML:
`<div class="block container"></div>`,
namingBlockCSS:
`.container {}
.block.container {}`,

namingElementHTML:
`<div class="block container">
    <div class="single block"></div>
    <div class="single block"></div>
    <div class="single block"></div>
</div>`,
namingElementCSS:
`.block.container .single.block {}`,

namingDecorationHTML:
`<div class="large container">
    <div class="small picutre"></div>
    <button class="left floated button"></button>
</div>`,
namingDecorationCSS:
`.large.container
{
    height: 320px;
}
.large.container .small.picture
{
    height: 32px; width: 32px;
}
.large.container [class*="left floated"].button
{
    float: left;
}`,

namingJavaScriptHTML:
`<div class="comments">
    <div class="single comment">
        <button class="large -main -reply button"></button>
    </div>
</div>`,
namingJavaScriptCSS:
`.comments {}
.comments .single.comment {}
.comments .single.comment .large.button {}`,
namingJavaScriptNative:
`$("-main.-reply.button").show()`,
        }
    }
}
</script>
