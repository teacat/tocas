<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();
$TocasUIDoc->pureHeader('外觀型', '偏於外觀類的元件。')
           ->cards(['卡片'   => ['class'       => '.ts.card',
                                 'description' => '',
                                 'link'        => 'views/card.html'],

                    '聊天室' => ['class'       => '.ts.chatroom',
                                 'description' => '網頁排版的基礎架構系統。',
                                 'link'        => 'views/chatroom.html'],
                    
                    '留言'   => ['class'       => '.ts.comment',
                                 'description' => '用來提示、顯示簡短的訊息。',
                                 'link'        => 'views/comment.html']])
            ->pureFooter('views.html'); ?>