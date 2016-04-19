<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('核取方塊', '好了，下一個。')
            ->headerGroup('說明', '<p>核取方塊有提供多種樣式，例如標準方塊、開關、群組，</p>
                                   <p>很適合在不同的時間點使用。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '核取方塊有多個不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的核取方塊。', 
           '<div class="ts checkbox">
                <input type="checkbox">
                <label>核取方塊</label>
            </div>', 'checkbox')
                            
            ->groupEnd()
            ->footer('elements/input.html');
?>