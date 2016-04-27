<?php
if(!class_exists('TocasUIDocumention'))
    require('generator.php');
$TocasUIDoc = new TocasUIDocumention();
$TocasUIDoc->pureHeader('外觀型', '偏於外觀類的元件。')
           ->cards(['卡片'   => ['class'       => '.ts.card',
                                 'description' => '用來彙整短篇文字、或是以區塊顯示碎片式內容的元素',
                                 'link'        => 'views/card.html'],

                    '聊天室' => ['class'       => '.ts.chatroom',
                                 'description' => '提供兩人或多人的聊天區域。',
                                 'link'        => 'views/chatroom.html'],
                    
                    '留言'   => ['class'       => '.ts.comment',
                                 'description' => '用以顯示一篇文章的留言區塊。',
                                 'link'        => 'views/comment.html'],
                    
                    '統計數據' => ['class'       => '.ts.statistic',
                                   'description' => '用來顯示純文字的統計數據、在數字下新增標籤闡述該數值含義。',
                                   'link'        => 'views/statistic.html']])
            ->pureFooter('views.html'); ?>