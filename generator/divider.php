<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('分隔線', '這裡開啟了另一個話題。')
            ->groupStart('種類', '分隔線具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的分隔線。', 
           '<p>我是微笑小安安，歡迎來到小安網站。</p>
            <div class="ts divider"></div>
            <p>你將會在這裡看見一個魔法師的日常生活，</p>
            <p>沒錯，只要你能夠單身三十年，你也可以跟我一樣成為魔法師。</p>', 'divider')
            
            /**
             * 水平分隔線
             */
             
            ->single('水平分隔線', '水平分隔線可以在中間插入文字。', 
           '<p>嗶嗶嗶。</p>
            <div class="ts horizontal divider">我是分隔線</div>
            <p>沒錯，你可以在分隔線中間插入一小段文字，</p>
            <p>而且只需要一個元素。</p>', 'horizontal')
                            
            ->groupEnd()
            ->footer('elements/divider.html');
?>