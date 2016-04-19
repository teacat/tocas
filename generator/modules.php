<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();
$TocasUIDoc->pureHeader('模塊', '較獨立的元件。')
           ->cards(['淡化幕'   => ['class'       => '.ts.dimmer',
                                 'description' => '新增一層暗幕用以遮蔽特定元素。',
                                 'link'        => 'modules/dimmer.html'],

                    '下拉選單' => ['class'       => '.ts.dropdown',
                                   'description' => '類似於滑鼠右鍵功能表的下拉元件。',
                                   'link'        => 'modules/dropdown.html'],
                    
                    '進度列' => ['class'       => '.ts.progress',
                                 'description' => '切分兩個話題或是元件用的分隔線。',
                                 'link'        => 'modules/progress.html'],
                                 
                    '吸附'   => ['class'       => '.ts.sticky',
                                 'description' => '當捲軸越過某元素時，可使該元素吸附於頂部而不是離開可視範圍。',
                                 'link'        => 'modules/sticky.html']])
            ->pureFooter('modules.html'); ?>