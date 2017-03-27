<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('標題', '那數公分的大小落差，就足以形容事態的嚴重。')
            ->headerGroup('說明', '<p>標題的大小是依照 Github 的 Markdown 所制定的，</p>
                                   <p>原因是這樣的大小剛好符合一般文件的標準，且達到閱讀舒適的作用。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '標題具有多個不同的種類。')
          
            /**
             * 基本標題
             */
             
            ->single('基本標題', '基於 h1 到 h6 的標題。', 
           '<h1 class="ts header">標題 1</h1>
            <h2 class="ts header">標題 2 </h2>
            <h3 class="ts header">標題 3 </h3>
            <h4 class="ts header">標題 4 </h4>
            <h5 class="ts header">標題 5 </h5>
            <h6 class="ts header">標題 6 </h6>', 'header')
                            
            /**
             * 自訂標題
             */
             
            ->single('自訂標題', '不透過 h1 到 h6 訂製標題大小，而是透過指定尺寸。', 
           '<div class="ts huge header">巨大</div>
            <div class="ts large header">大型</div>
            <div class="ts medium header">中等</div>
            <div class="ts small header">小型</div>
            <div class="ts tiny header">微小</div>
            <div class="ts mini header">迷你</div>', 'huge, large, medium, small, tiny, mini')
                            
            /**
             * 副標題
             */
             
            ->single('副標題', '比正常標題還要稍微小一號的副標題。', 
           '<h1 class="ts sub header">副標題 1</h1>
            <h2 class="ts sub header">副標題 2 </h2>
            <h3 class="ts sub header">副標題 3 </h3>
            <h4 class="ts sub header">副標題 4 </h4>
            <h5 class="ts sub header">副標題 5 </h5>
            <h6 class="ts sub header">副標題 6 </h6>', 'sub')
                            
            /**
             * 圖示標題
             */
             
            ->single('圖示標題', '帶有圖示的標題。', 
           '<h3 class="ts center aligned icon header">
                <i class="fa fa-gift"></i>
                挑選禮物
                <div class="sub header">
                    為你的女朋友，喔不，你沒有女朋友。
                </div>
            </h3>', 'icon')
            
            ->groupEnd()
            ->groupStart('內容', '一些用以擺放在標題內不同的內容元素。')
            
            /**
             * 標題中的副標題
             */
             
            ->single('標題中的副標題', '用來詮釋主標題的副標題。', 
           '<h4 class="ts header">
                大標題
                <div class="sub header">然後我是子標題。</div>
            </h4>', 'sub')
            
            ->groupEnd()
            ->groupStart('狀態', '你可以隨時透過樣式類別切換一個標題的狀態。')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '用以顯示這個標題已經被停用。', 
           '<h3 class="ts disabled header">已停用標題</h3>', 'disabled')
               
            ->groupEnd()
            ->groupStart('外觀', '你可以點綴標題的樣式。')
            
            /**
             * 分隔線
             */
             
            ->single('分隔線', '每個標題都可以在底下新增分隔線。', 
           '<h1 class="ts dividing header">標題 1</h1>
            <h2 class="ts dividing header">標題 2 </h2>
            <h3 class="ts dividing header">標題 3 </h3>
            <h4 class="ts dividing header">標題 4 </h4>
            <h5 class="ts dividing header">標題 5 </h5>
            <h6 class="ts dividing header">標題 6 </h6>', 'dividing')
            
            /**
             * 對齊
             */
             
            ->single('對齊', '標題可以置中、置左或者置右。', 
           '<h5 class="ts left aligned header">我置左</h5>
            <h5 class="ts center aligned header">我置中</h5>
            <h5 class="ts right aligned header">我置障</h5>', 'left aligned, center aligned, right aligned')
                            
            /**
             * 浮動
             */
             
            ->single('浮動', '標題也可以是浮動對齊的。', 
           '<h5 class="ts left floated header">向左浮動</h5>
            <h5 class="ts right floated header">向右浮動</h5>', 'left floated, right floated')
                            
            ->groupEnd()
            ->footer('elements/header.html');
?>