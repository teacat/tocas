<?php
if(!class_exists('TocasUIDocumention'))
    require('generator.php');
$TocasUIDoc = new TocasUIDocumention();
$TocasUIDoc->pureHeader('普通元素', '沒有特別分類的元素。')
           ->cards(['按鈕'   => ['class'       => '.ts.button',
                                 'description' => '供使用者點擊和做相關回饋的元件。',
                                 'link'        => 'elements/button.html'],

                    '核取方塊' => ['class'       => '.ts.checkbox',
                                   'description' => '讓使用者進行勾取、選取動作的核取方塊。',
                                   'link'        => 'elements/checkbox.html'],
                    
                    '分隔線' => ['class'       => '.ts.divider',
                                 'description' => '切分兩個話題或是元件用的分隔線。',
                                 'link'        => 'elements/divider.html'],
                                 
                    '標題'   => ['class'       => '.ts.header',
                                 'description' => '用以分隔文字內容、或帶有圖示的標題。',
                                 'link'        => 'elements/header.html'],
                                 
                    '圖片'   => ['class'       => '.ts.image',
                                 'description' => '顯示圖片、大頭貼、置入於文章的圖片元素。',
                                 'link'        => 'elements/image.html'],
                                 
                    '輸入欄位' => ['class'       => '.ts.input',
                                   'description' => '提供使用者輸入資料的欄位。',
                                   'link'        => 'elements/input.html'],
                                 
                    '聚焦看板' => ['class'       => '.ts.jumbotron',
                                   'description' => '一個巨大的文字容器，用於吸引使用者注意，或是擺放於首頁。',
                                   'link'        => 'elements/jumbotron.html'],
                                 
                    '標籤'   => ['class'       => '.ts.label',
                                 'description' => '特別標註文字用的標籤，也可用做計數徽章，或是特別圖示。',
                                 'link'        => 'elements/label.html'],
                                 
                    '清單'   => ['class'       => '.ts.list',
                                 'description' => '水平或是垂直的清單，可以是一個連結清單，例如擺放於頁腳等。',
                                 'link'        => 'elements/list.html'],
                                 
                    '讀取指示器' => ['class'       => '.ts.loader',
                                     'description' => '讀取、上傳時的讀取指示器。',
                                     'link'        => 'elements/loader.html'],
                                 
                    '片段'   => ['class'       => '.ts.segment',
                                 'description' => '包含短篇文章的片段容器，適合用來包覆文字。',
                                 'link'        => 'elements/segment.html'],
                                 
                    '容器'   => ['class'       => '.ts.container',
                                 'description' => '將文字內容、集中在網頁中部，避免螢幕過寬文字導致過寬。',
                                 'link'        => 'elements/container.html']])
            ->pureFooter('elements.html'); ?>