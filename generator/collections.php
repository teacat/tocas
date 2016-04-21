<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();
$TocasUIDoc->pureHeader('聚合型', '專門收藏、集合資料用的元件。')
           ->cards(['選單'     => ['class'       => '.ts.menu',
                                   'description' => '',
                                   'link'        => 'collections/menu.html'],

                    '網格系統' => ['class'       => '.ts.grid',
                                   'description' => '網頁排版的基礎架構系統。',
                                   'link'        => 'collections/grid.html'],
                                   
                    '表格'     => ['class'       => '.ts.table',
                                   'description' => '用以展示資料的表格。',
                                   'link'        => 'collections/table.html'],
                    
                    '提示訊息' => ['class'       => '.ts.message',
                                   'description' => '用來提示、顯示簡短的訊息。',
                                   'link'        => 'collections/message.html']])
            ->pureFooter('collections.html'); ?>