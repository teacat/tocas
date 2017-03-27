<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');

if(!class_exists('TocasUIDocumention'))
    if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('按鈕', '一個重要的按鈕，我們將它視為核彈按鈕般，精心設計和呵護。')
            ->headerGroup('說明', '<p>按鈕具有多種樣式和語意，請注意的是，語意和顏色不同，</p>
                                   <p>請不要為了要新增紅色按鈕，就建立一個「負面」按鈕。</p>
                                   <p>請務必遵循 CSS 樣式中的含意。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '一個按鈕具有多個不同的種類。')
          
            /**
             * 按鈕
             */
             
            ->single('按鈕', '一個正常的按鈕。', 
           '<button class="ts button">
                按鈕
            </button>', 'button')
                            
            /**
             * 基本語氣
             */
             
            ->single('基本語氣', '用來讓一個按鈕擁有不同的意思，但卻不帶有肯定或否定語氣。', 
           '<button class="ts primary button">主要</button>
            <button class="ts warning button">警告</button>
            <button class="ts info button">資訊</button>
            <button class="ts inverted button">相反色</button>', 'primary, warning, info, inverted')
                            
            /**
             * 肯定和否定
             */
             
            ->single('肯定和否定', '讓按鈕帶有肯定或否定的意思。', 
           '<button class="ts positive button">肯定</button>
            <button class="ts negative button">否定</button>', 'positive, negative')
                            
            /**
             * 圖案
             */
             
            ->single('圖案', '只顯示圖案的按鈕。', 
           '<button class="ts icon button"><i class="fa fa-heart"></i></button>', 'icon')
           
            /**
             * 基本
             */
             
            ->single('基本', '讓按鈕只帶有基本的架構。', 
           '<button class="ts positive basic button">確定</button>
            <button class="ts negative basic button">拒絕</button>
            <button class="ts basic button">取消</button>', 'basic')
                            
            /**
             * 標籤
             */
             
            ->single('標籤', '帶有標籤的按鈕。', 
           '<div class="ts labeled left button">
                <div class="ts basic label">689</div>
                <button class="ts button">加入募集</button>
            </div>', 'labeled')
          
            ->groupEnd()
            ->groupStart('群組', '將多個按鈕組成一列，或是擁有同樣性質。')
          
            /**
             * 按鈕們
             */
             
            ->single('按鈕們', '按鈕可以組合成一個群組。', 
           '<div class="ts buttons">
                <button class="ts warning button">橙希</button>
                <button class="ts primary button">雨藍</button>
                <button class="ts inverted button">卡莉絲</button>
            </div>', 'buttons')
          
            ->groupEnd()
            ->groupStart('狀態', '你可以隨時透過樣式類別切換一個按鈕的狀態。')
            
            /**
             * 已啟用
             */
             
            ->single('已啟用', '用以顯示這個按鈕已經被啟用、觸發。', 
           '<button class="ts active button">按鈕</button>', 'active')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '用以顯示這個按鈕已經被禁止按下。', 
           '<button class="ts disabled button">按鈕</button>', 'disabled')
            
            /**
             * 讀取中
             */
             
            ->single('讀取中', '按鈕也可以變成讀取狀態。', 
           '<button class="ts loading button">按鈕</button>', 'loading')
            
            ->groupEnd()
            ->groupStart('外觀', '你可以更改按鈕的位置、大小、或者形狀。')
            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '按鈕可以有不同的大小尺寸。', 
           '<button class="ts mini button">迷你</button>
            <button class="ts tiny button">微小</button>
            <button class="ts small button">小型</button>
            <button class="ts button">預設</button>
            <button class="ts medium button">適中</button>
            <button class="ts large button">大型</button>
            <button class="ts big button">巨大</button>
            <button class="ts huge button">超大</button>
            <button class="ts massive button">重量級</button>', 'mini, tiny, small, medium, large, big, huge, massive')
                            
            /**
             * 浮動
             */
             
            ->single('浮動', '按鈕可以向左或向右浮動對齊。', 
           '<button class="ts floated left button">向左浮動</button>
            <button class="ts floated right button">向右浮動</button>', 'floated left, floated right')                
                            
            /**
             * 垂直附著
             */
             
            ->single('垂直附著', '按鈕可以垂直附著在某個元素的上下端。', 
           '<button class="ts top attached button">附著於上</button>
            <div class="ts top attached bottom attached segment">
                <p>TeaMeow 是一個社群網站，就像是你正在使用的 Facebook 或是 Twitter，</p>
                <p>不過我們強調的是「自由」和「日常」，我們不會整天刪你文章。</p>
            </div>
            <button class="ts bottom attached button">附著於下</button>', 'top attached, bottom attached')
            
            /**
             * 輕巧版
             */
             
            ->single('輕巧版', '縮小按鈕的內距。', 
           '<button class="ts mini compact button">迷你按鈕</button>
            <button class="ts compact button">按鈕</button>', 'compact')
            
            /**
             * 流動
             */
             
            ->single('流動', '讓按鈕保持最長寬度。', 
           '<button class="ts fluid button">流動按鈕</button>', 'fluid')
            
            /**
             * 圓形
             */
             
            ->single('圓形', '按鈕可以是圓形的。', 
           '<button class="ts circular large icon button"><i class="fa fa-gift"></i></button>
            <button class="ts circular positive button">知道了！</button>', 'circular')
            
            /**
             * 抬舉
             */
             
            ->single('抬舉', '按鈕可以看起來像被抬舉，或是浮在空中。', 
           '<button class="ts raised info button">下載</button>
            <button class="ts raised button">取消</button>', 'raised')
            
            ->groupEnd()
            ->footer('elements/button.html');
?>