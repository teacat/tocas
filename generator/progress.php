<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('進度列', '讓使用者知道他還要等多久，前提是不會卡在 99%。')
            ->headerGroup('說明', '<p>進度列可以透過 <span class="ts label">data-percent</span> 來變換進度。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '進度列具有多個不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的進度列架構。', 
           '<div class="ts small progress">
                <div class="bar">32%</div>
            </div>', 'progress')
                
            /**
             * 未知
             */
             
            ->single('未知', '顯示一個可能位於準備中的進度列。', 
           '<div class="ts small indeterminate progress">
                <div class="bar"></div>
            </div>', 'indeterminate')
            
            ->groupEnd()
            ->groupStart('內容', '進度列的內容有一些不一樣的元素。')
            
            /**
             * 進度列
             */
             
            ->single('進度列', '一個顯示進度最基本的「列」。', 
           '<div class="ts progress">
                <div class="bar"></div>
            </div>', 'bar')
            
            /**
             * 進度百分比
             */
             
            ->single('進度百分比', '專門顯示進度百分比的元素。', 
           '<div class="ts progress">
                <div class="bar">
                    69%
                </div>
            </div>', 'progress')
            
            ->groupEnd()
            ->groupStart('狀態', '進度列的有不同的狀態。')
            
            /**
             * 活動中
             */
             
            ->single('活動中', '顯示一個進度列正在進行中。', 
           '<div class="ts active progress">
                <div class="bar">&nbsp;</div>
            </div>', 'active')
            
            /**
             * 成功、正面的
             */
             
            ->single('成功、正面的', '將進度列調整的意義設置為正面的。', 
           '<div class="ts positive progress">
                <div class="bar"></div>
            </div>', 'positive')
                            
            /**
             * 警告
             */
             
            ->single('警告', '將一個進度列的意義設置為警告用。', 
           '<div class="ts warning progress">
                <div class="bar"></div>
            </div>', 'warning')
                            
            /**
             * 錯誤、否定的
             */
             
            ->single('錯誤、否定的', '將一個進度列的意義設置為錯誤、否定的。', 
           '<div class="ts negative progress">
                <div class="bar"></div>
            </div>', 'negative')
            
            ->groupEnd()
            ->groupStart('外觀', '進度列有多種外觀型態。')
            
            /**
             * 流動
             */
             
            ->single('流動', '讓進度列成為流動模式，適合用在要移除框線的時候。', 
           '<div class="ts fluid indeterminate progress">
                正在準備中
            </div>', 'fluid')
            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '進度列擁有不同的大小。', 
           '<div class="ts mini progress" data-percent="82%">
                <div class="bar">82%</div>
            </div>
            <div class="ts tiny progress" data-percent="23%">
                <div class="bar">23%</div>
            </div>
            <div class="ts small progress" data-percent="74%">
                <div class="bar">74%</div>
            </div>
            <div class="ts progress" data-percent="16%">
                <div class="bar">16%</div>
            </div>
            <div class="ts medium progress" data-percent="98%">
                <div class="bar">98%</div>
            </div>
            <div class="ts large progress" data-percent="32%">
                <div class="bar">32%</div>
            </div>
            <div class="ts big progress" data-percent="51%">
                <div class="bar">51%</div>
            </div>
            <div class="ts huge progress" data-percent="3%">
                <div class="bar">3%</div>
            </div>
            <div class="ts massive progress" data-percent="41%">
                <div class="bar">41%</div>
            </div>', 'mini, tiny, small, medium, large, big, huge, massive')
         
            ->groupEnd()
            ->footer('modules/progress.html');
?>