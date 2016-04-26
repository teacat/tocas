<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('輸入欄位', '再鍵入幾個字就是新的開始。')
            ->headerGroup('說明', '<p>輸入欄位也可作為搜尋欄位，支援在欄位中放入圖示，</p>
                                   <p>同時也可以由多個欄位層疊起來。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '輸入欄位具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的輸入欄位。', 
           '<div class="ts input">
                <input type="text" placeholder="文字欄位">
            </div>', 'input')
          
            ->groupEnd()
            ->groupStart('狀態', '輸入欄位有不同的狀態。')
            
            /**
             * 聚焦中
             */
             
            ->single('聚焦中', '當欄位正處於聚焦、輸入中的狀態。', 
           '<div class="ts focus input">
                <input type="text" placeholder="文字欄位">
            </div>', 'foucs')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '顯示一個欄位已經不可使用。', 
           '<div class="ts disabled input">
                <input type="text" placeholder="文字欄位">
            </div>
            <br>
            <div class="ts input">
                <input type="text" placeholder="文字欄位" disabled>
            </div>', 'disabled')
            
            /**
             * 錯誤
             */
             
            ->single('錯誤', '當一個欄位的內容並不正確的時候。', 
           '<div class="ts error input">
                <input type="text" placeholder="文字欄位">
            </div>', 'error')
            
            ->groupEnd()
            ->groupStart('群組', '輸入欄位可以是一個群組。')
            
            /**
             * 垂直群組
             */
             
            ->single('垂直群組', '將輸入欄位以垂直劃分並緊鄰上下的欄位。', 
           '<div class="ts vertical inputs">
                <div class="ts input">
                    <input type="text" placeholder="文字欄位">
                </div>
                <div class="ts input">
                    <input type="text" placeholder="文字欄位">
                </div>
                <div class="ts input">
                    <input type="text" placeholder="文字欄位">
                </div>
            </div>', 'inputs, vertical')
                            
            ->groupEnd()
            ->groupStart('外觀', '輸入欄位具有不同的外觀。')
            
            /**
             * 透明
             */
             
            ->single('透明', '欄位可以是背景、框線透明的。', 
           '<div class="ts transparent input">
                <input type="text" placeholder="文字欄位">
            </div>', 'transparent')
            
            /**
             * 流動
             */
             
            ->single('流動', '欄位的寬度可以取決於容器的寬度。', 
           '<div class="ts fluid input">
                <input type="text" placeholder="文字欄位">
            </div>', 'fluid')
            
            /**
             * 圖示
             */
             
            ->single('圖示', '可以在欄位的左或右邊放置圖示。', 
           '<div class="ts right icon medium input">
                <input type="text" placeholder="文字欄位">
                <i class="fa fa-search"></i>
            </div>
            <br>
            <div class="ts left icon medium input">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="文字欄位">
            </div>
            <br>
            <div class="ts right icon medium input">
                <input type="text" placeholder="這個圖示可以按 →">
                <i class="link fa fa-search"></i>
            </div>
            <br>
            <div class="ts right icon medium input">
                <input type="text" placeholder="我也可以 →">
                <i class="link circular fa fa-search"></i>
            </div>', 'right icon, left icon')
            
            /**
             * 圓形
             */
             
            ->single('圓形', '輸入欄位可以是圓形（圓角邊框）的。', 
           '<div class="ts circular input">
                <input type="text" placeholder="輸入欄位">
            </div>', 'circular')
            
            /**
             * 可調整尺寸
             */
             
            ->single('可調整尺寸', '可以讓使用者自由伸縮欄位的尺寸。', 
           '<div class="ts resizable input">
                <textarea placeholder="文字欄位"></textarea>
            </div>', 'resizable')
            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '不同的尺寸大小。', 
           '<div class="ts mini input">
                <input type="text" placeholder="迷你">
            </div>
            <div class="ts tiny input">
                <input type="text" placeholder="微小">
            </div>
            <div class="ts small input">
                <input type="text" placeholder="小型">
            </div>
            <div class="ts medium input">
                <input type="text" placeholder="適中">
            </div>
            <div class="ts input">
                <input type="text" placeholder="預設">
            </div>
            <div class="ts large input">
                <input type="text" placeholder="大型">
            </div>
            <div class="ts big input">
                <input type="text" placeholder="較大">
            </div>
            <div class="ts huge input">
                <input type="text" placeholder="更大">
            </div>
            <div class="ts massive input">
                <input type="text" placeholder="重量級">
            </div>', 'mini, tiny, small, medium, large, big, huge, massive')
            ->groupEnd()
            ->footer('elements/input.html');
?>