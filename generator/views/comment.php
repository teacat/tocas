<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('留言', '如何引發網路戰爭？一，留言；二，等待。')
            ->headerGroup('說明', '<p>你可以變換留言中時間和文字的位置，</p>
                                   <p>這些在下面都有範例可供參考。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '留言具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的留言。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/01.png">
                    </div>
                    <div class="content">
                        <div class="author">infinity-G™</div>
                        <div class="metadata">
                            <a class="item">
                                Dec 13
                            </a>
                        </div>
                        <div class="text">
                            入稿版冬コミ新作ブランケットです。よろしくね。 
                        </div>
                    </div>
                </div>
                
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/02.png">
                    </div>
                    <div class="content">
                        <div class="author">いんふぃ™</div>
                        <div class="metadata">
                            <a>42 分鐘前</a>
                        </div>
                        <div class="text">
                            普通に知ってる
                        </div>
                    </div>
                </div>
            </div>', 'comments, comment')
              
            ->groupEnd()
            ->groupStart('內容', '留言包含了許多不同的內容。')
                            
            /**
             * 頭像
             */
             
            ->single('頭像', '用以顯示發言者、圖片的一個內容區塊。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/01.png">
                    </div>
                    <div class="content">
                        <div class="author">infinity-G™</div>
                    </div>
                </div>
            </div>', 'avatar')
                            
            /**
             * 中繼資料
             */
             
            ->single('中繼資料', '用以擺放時間、一些有關連的小型資料。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/01.png">
                    </div>
                    <div class="content">
                        <div class="author">infinity-G™</div>
                        <div class="metadata">
                            <a href="!#" class="item">
                                42 分鐘前
                            </a>
                        </div>
                    </div>
                </div>
            </div>', 'metadata')
                            
            /**
             * 動作
             */
             
            ->single('動作', '一個可以擺放這個留言所可以執行動作的區塊。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/02.png">
                    </div>
                    <div class="content">
                        <div class="author">いんふぃ™</div>
                        <div class="metadata">
                            <a>42 分鐘前</a>
                        </div>
                        <div class="text">
                            普通に知ってる
                        </div>
                        
                        <div class="actions">
                            <a href="!#">回覆</a>
                            <a href="!#">移除</a>
                        </div>
                    </div>
                </div>
            </div>', 'actions')
           
            /**
             * 留言框
             */
             
            ->single('留言框', '你也可以在留言內放置文字輸入框。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/02.png">
                    </div>
                    <div class="content">
                        <div class="reply">
                            <div class="ts fluid input">
                                <textarea placeholder="留言輸入於此..." style="min-height: 100px"></textarea>
                            </div>
                            <br>
                            <button class="ts medium floated right positive button">送出</button>
                        </div>
                    </div>
                </div>
            </div>', 'reply')
          
            ->groupEnd()
            ->groupStart('外觀', '留言擁有一些不同的外觀。')
          
            /**
             * 同列文字
             */
             
            ->single('同列文字', '留言的文字可以與作者名稱同列。', 
           '<div class="ts comments">
                <div class="comment">
                    <div class="avatar">
                        <img src="../img/infinity-s/01.png">
                    </div>
                    <div class="content">
                        <div class="author">infinity-G™</div>
                        
                        <div class="inline text">
                            入稿版冬コミ新作ブランケットです。よろしくね。 
                        </div>
                        <div class="metadata">
                            <a>Dec 13</a>
                        </div>
                    </div>
                </div>
            </div>', 'inline')

            ->groupEnd()
            ->footer('views/comment.html');
?>