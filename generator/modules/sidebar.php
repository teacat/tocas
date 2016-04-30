<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('側邊欄', '誰在叫我做元素我就咬誰(✿ﾟ▽ﾟ)。')
            ->headerGroup('說明', '<p>側邊欄通常<strong>帶有一個推動欄位</strong>，用來將整個網頁推向某處</p>
                                   <p>並且在同一時間顯示側邊欄。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '側邊欄具有多個不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本帶有側邊欄的整體網頁架構。', 
           '<div class="ts sidebar vertical menu">
                <a href="#!" class="item">A</a>
                <a href="#!" class="item">B</a>
                <a href="#!" class="item">C</a>
                <a href="#!" class="item">D</a>
            </div>
            <div class="pusher">
                <!-- 網頁會被推動的元素 -->
            </div>
            ', 'sidebar', "ts('.sidebar').sidebar('toggle');", true)
            
            ->groupEnd()
            ->groupStart('狀態', '側邊欄在不同時候擁有不同狀態。')
            
            /**
             * 顯示
             */
             
            ->single('顯示', '側邊欄預設都是隱藏的，直到你手動顯示他。', 
           '<div class="ts visible sidebar">
            </div>', 'visible', null, true)
            
            /**
             * 淡化推動欄位
             */
             
            ->single('淡化推動欄位', '推動欄位預設不會自動淡化，你可以新增一個淡化樣式給它。', 
           '<div class="dimmed pusher">
            </div>', 'dimmed', null, true)
            
            ->groupEnd()
            ->groupStart('外觀', '側邊欄的外觀有些可變的樣式。')
            
            /**
             * 方向性
             */
             
            ->single('方向性', '一個側邊欄可以在上下左右任何一側。', 
           '<div class="ts left sidebar"></div>
           <div class="ts right sidebar"></div>
           <div class="ts top sidebar"></div>
           <div class="ts bottom sidebar"></div>', 'left, right, top, bottom', null, true)
            
            /**
             * 寬度
             */
             
            ->single('寬度', '你可以手動變更側邊欄的寬度。', 
           '<div class="ts very thin sidebar"></div>
           <div class="ts thin sidebar"></div>
           <div class="ts wide sidebar"></div>
           <div class="ts very wide sidebar"></div>', 'very thin, thin, very wide, wide', null, true)
            
            ->groupEnd()
            ->footer('modules/sidebar.html');
?>