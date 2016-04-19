<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('片段', '碎片化的文字聚集地。')
            ->headerGroup('說明', '<p>片段通常可以拿來包裝文章內容，</p>
                                   <p>但他不適合獨立當作一個卡片使用。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '片段具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的片段。', 
           '<div class="ts segment">
                <p>烈日高照，前方的道路什麼都看不見，</p>
                
                <p>「很高興能和你見面。」一個細微的聲音好似那邊傳來，</p>
                 
                <p>明明不清楚前方的事物，卻感覺自己正在邁向的是一個新世界。</p>
                
            </div>', 'segment')
                
            /**
             * 抬舉
             */
             
            ->single('抬舉', '片段可以加深陰影，看起來像被抬舉，或是浮在空中。', 
           '<div class="ts raised segment">
                <p>在最糟糕的事情發生之前，</p>
                
                <p>我儘可能地想找出原因，</p>
                 
                <p>原來是 — 自己。</p>
                
            </div>', 'raised, segment')
            
            ->groupEnd()
            ->groupStart('群組', '可以聚集多個片段為一體。')
            
            /**
             * 片段們
             */
             
            ->single('片段們', '片段可以組合成一個群組。', 
           '<div class="ts segments">
                <div class="ts segment">
                    任何人皆自由且平等。
                </div>
                <div class="ts segment">
                    莫忘初衷。
                </div>
                <div class="ts segment">
                    永遠不放棄。
                </div>
                <div class="ts segment">
                    為全民、大眾所設計、運作並傾聽。
                </div>
            </div>', 'segments')
            
            ->groupEnd()
            ->groupStart('狀態', '片段可以處於不同的狀態。')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '淡化片段，用以顯示這個片段不再可用。', 
           '<div class="ts disabled segment">
                <p>那傢伙不常說話，但是從她的言行舉止中，</p>
                <p>好像有什麼是能被發現的。</p>
            </div>', 'disabled')
                            
            /**
             * 讀取中
             */
             
            ->single('讀取中', '片段可以顯示一個正在讀取的圖示。', 
           '<div class="ts loading segment">
                橙希其實是傲嬌。
            </div>', 'loading')
            
            ->groupEnd()
            ->groupStart('外觀', '透過一些其他用法加強片段的外觀。')
            
            /**
             * 語氣
             */
             
            ->single('語氣', '語氣用來強調，或者讓一個片段更不被受矚目。', 
           '<div class="ts segment">
                在同個屋簷下，做著那一成不變的事情，
            </div>
            <div class="ts secondary segment">
                就算沒有外星人來襲擊，
            </div>
            <div class="ts tertiary segment">
                偶爾也會發生一些意想之外的事情。
            </div>', 'secondary, tertiary')
                            
            /**
             * 對齊
             */
             
            ->single('對齊', '可以更改文字的對齊位置。', 
           '<div class="ts left aligned segment">
                置左
            </div>
            <div class="ts center aligned segment">
                置中
            </div>
            <div class="ts right aligned segment">
                置右
            </div>', 'left aligned, center aligned, right aligned')
                            
            ->groupEnd()
            ->footer('elements/input.html');
?>