<?php
if(!class_exists('TocasUIDocumention'))
    require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('命名規範', 'Tocas UI 所主張的精神，同時也希望你能夠照著做。')
            ->headerGroup('為什麼？', '<p>除了你不曉得怎麼實踐的程式外，其次最難的不外乎就是「命名」。</p>
                                   <p>通常使用其他的介面框架都不會有如此的規範。</p>
                                   <p>&nbsp;</p>
                                   <p>但我們在這裡希望你能夠遵循 Tocas UI 的命名精神，</p>
                                   <p>來<strong>讓頁面上的樣式名稱不再那麼混亂</strong>。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('區塊／容器', '區塊的樣式名稱<strong>不應有任何符號，或者是大小寫，在這裡僅用空白區隔</strong>。')
          
            /**
             * HTML
             */
             
            ->single('HTML', '請像下方這樣做，你<strong>不應該</strong>用 <span class="ts label">block-container</span> 或 <span class="ts label">blockContainer</span> 命名他們。', 
           '<div class="block container">
            </div>
            ', null, null, true)
            
            
            /**
             * CSS
             */
             
            ->singleCss('CSS', '像這樣簡單的用法，就像是你直接稱呼元素那樣地輕切。', 
           '.container {}
.block.container {}')
            ->groupEnd()
            ->groupStart('元素', '元素的樣式名稱<strong>和區塊的命名方式相同</strong>。')
          
            /**
             * HTML
             */
             
            ->single('HTML', '請像下方這樣做，你<strong>不應該</strong>用 <span class="ts label">single-block</span> 或 <span class="ts label">singleBlock</span> 命名他們。', 
           '<div class="block container">
                <div class="single block"></div>
                <div class="single block"></div>
                <div class="single block"></div>
            </div>
            ', null, null, true)
            
            
            /**
             * CSS
             */
             
            ->singleCss('CSS', '用法也是相當地簡單，像這樣。', 
           '.block.container .single.block {}')
            ->groupEnd()
            ->groupStart('修飾詞', '修飾詞用來讓一個元素、區塊變成指定顏色，或者套用特殊樣式，
                                    <p>而修飾詞的樣式名稱<strong>和先前的區塊與元素命名方式皆相同</strong>，但請注意<strong>樣式名稱應保有「語義」</strong>。</p>
                                    <p>例如：小的（small）不可以被縮寫成（sm），同時如果有兩個單字仍以空白隔開，例如：向左浮動（left floated）。</p>')
          
            /**
             * HTML
             */
             
            ->single('HTML', '請像下方這樣做，你<strong>不應該</strong>用 <span class="ts label">is-large</span> 或 <span class="ts label">container-lg</span> 命名他們。', 
           '<div class="large container">
                <div class="small picutre"></div>
                <button class="left floated button"></button>
            </div>
            ', null, null, true)
            
            
            /**
             * CSS
             */
             
            ->singleCss('CSS', '在較複雜的情況下你可能會遇到衝突，這個時候你可以使用較特別的選擇器。', 
           '.large.container
{
    height: 320px;
}

.large.container .small.picture
{
    height: 32px;
    width: 32px;
}

.large.container [class*="left floated"].button
{
    float: left;
}')
            ->groupEnd()
            ->groupStart('給 JavaScript 或其他用途', '有時候你會為了專門給 jQuery 或者 JavaScript 而另外命名了像是 <span class="ts label">js-reply-btn</span>，
                                            <p>這通常是<strong>設計不良所導致的</strong>，但如果你真的沒辦法的話，</p>
                                            <p>在這裡我們則是建議<strong>和先前的命名方式一樣，但最前方加上減號</strong>。</p>')
          
            /**
             * HTML
             */
             
            ->single('HTML', '請像下方這樣做，你<strong>不應該</strong>用 <span class="ts label">js-main-reply-button</span> 或 <span class="ts label">js-btn</span> 命名他們。', 
           '<div class="comments">
                <div class="single comment">
                    <button class="large -main -reply button"></button>
                </div>
            </div>
            ', null, null, true)
            
            
            /**
             * CSS
             */
             
            ->singleCss('CSS', '這種時候，你<strong>不應該賦予那些具減號的樣式一個樣式</strong>，所以基本上你只會有這些樣式。', 
           '.comments {}
.comments .single.comment {}
.comments .single.comment .large.button {}')


            /**
             * JavaScript
             */
             
            ->singleJs('JavaScript', '現在你可以像這樣選擇專門給 JavaScript 用的按鈕了。', 
           '$("-main.-reply.button").show()')
            ->groupEnd()
            ->groupStart('整體示範', '這個章節統整了先前的所有命名方式，並且集合成一個示範，假設情況是這樣地：
                                      <p>你有一個聖誕節主題 (christmas) 的基本表單 (form)，而裡面有一個欄位跟一個被停用的 (disabled) 送出按鈕。</p>')
          
            /**
             * HTML
             */
             
            ->single('HTML', '', 
           '<form class="christmas basic form">
                <input class="input" type="text">
                <input class="disabled -submit button" type="submit">
            </form>
            ', null, null, true)
            
            
            /**
             * CSS
             */
             
            ->singleCss('CSS', '', 
           '.form {}
.form .input {}
.form .disabled.button {}

.christmas.form {}
.basic.form {}')


            /**
             * JavaScript
             */
             
            ->singleJs('JavaScript', '', 
           '$(".form .-submit.button")')
            ->groupEnd()
            ->footer('naming.html');
?>