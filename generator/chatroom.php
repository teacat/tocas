<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('聊天室', '雙人，或者多人的聊天場所。')
            ->headerGroup('說明', '<p>聊天室是一個簡單的聊天元件，可供多人或雙人使用，</p>
                                   <p>同時底部的按鈕排序也是可以隨意更換的。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('主要區塊', '組成聊天室的主要區塊。')
          
            /**
             * 聊天室框架
             */
             
            ->single('聊天室框架', '一個聊天室框架是最基本的。', 
           '<div class="ts chatroom">
                <div class="header"></div>
                <div class="content"></div>
                <div class="footer"></div>
            </div>', 'chatroom, header, content, footer')
                
            /**
             * 流動框架
             */
             
            ->single('流動框架', '聊天室的框架也可以是 100% 的寬度。', 
           '<div class="ts fluid chatroom">
                <div class="header"></div>
                <div class="content"></div>
                <div class="footer"></div>
            </div>', 'fluid')
                            
            /**
             * 標頭
             */
             
            ->single('標頭', '標頭用以放置標題、按鈕。', 
           '<div class="ts chatroom">
                <div class="header">
                    <div class="title">
                        INFINITY-G™ 同好會
                    </div>
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-cog"></i>
                        </div>
                        <div class="item">
                            <i class="fa fa-times"></i>
                        </div>
                    </div>
                </div>
            </div>', 'header, title, actions')
            
            /**
             * 通知列
             */
             
            ->single('通知列', '通知列可以在聊天視窗中提醒使用者一些消息。', 
           '<div class="ts chatroom">
                <div class="header">
                    <div class="title">
                        INFINITY-G™ 同好會
                    </div>
                </div>
                <div class="notification">請注意，管理員並不會詢問您密碼。</div>
            </div>', 'notification')
                            
            /**
             * 整體
             */
             
            ->single('整體', '一個健全的聊天室應該長這樣。', 
           '<div class="ts chatroom">
                <div class="header">
                    <div class="title">
                        <div class="ts empty circular positive label"></div>
                        單身俱樂部
                    </div>
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-cog"></i>
                        </div>
                        <div class="item">
                            <i class="fa fa-times"></i>
                        </div>
                    </div>
                </div>
                
                <div class="notification">
                    請注意，管理員並不會向您索取相關密碼。
                </div>
                <div class="content">
                    <div class="left message">
                        <div class="avatar">
                            <img src="../img/photo-steps.png">
                        </div>
                        <div class="content">
                            <p>
                                我都沒有女朋友。
                            </p>
                            <div class="meta">
                                <div class="item">
                                    12:32 PM
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left message">
                        <div class="avatar">
                            <img src="../img/people/01.png">
                        </div>
                        <div class="content">
                            <p>
                                我也沒有男朋友啊。
                            </p>
                            <div class="meta">
                                <div class="item">
                                    12:32 PM
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="divider">
                        9 月 23 日
                    </div>
                    <div class="right message">
                        <div class="content">
                            <p>
                                我懂，我也沒有
                            </p>
                            <div class="meta">
                                <div class="item">
                                    12:33 PM
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="right message">
                        <div class="content">
                            <p>
                                等等，三洨？
                            </p>
                            <div class="meta">
                                <div class="item">
                                    12:34 PM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-smile-o"></i>
                        </div>
                    </div>
                    <div class="input">
                        <div class="ts medium fluid input">
                            <input type="text" placeholder="訊息">
                        </div>
                    </div>
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>', null)
            
            ->groupEnd()
            ->groupStart('內容主體 ', '聊天室的內容主體具有一些不同的用法。')
            
            /**
             * 內容
             */
             
            ->single('內容', '用來擺放對話內容的區塊。', 
           '<div class="ts chatroom">
                <div class="content">
                    <div class="left message">
                        <div class="content">
                            <p>
                                聽說你最近都在打混。
                            </p>
                        </div>
                    </div>
                </div>
            </div>', 'left, message, right, avatar, content')
                            
            /**
             * 右邊的內容
             */
             
            ->single('右邊的內容', '內容也可以來自於右邊。', 
           '<div class="ts chatroom">
                <div class="content">
                    <div class="right message">
                        <div class="content">
                            <p>
                                聽說你最近都在打混。
                            </p>
                        </div>
                    </div>
                </div>
            </div>', 'right')
                            
            /**
             * 帶有頭像的內容
             */
             
            ->single('帶有頭像的內容', '聊天內容也可以具有頭像。', 
           '<div class="ts chatroom">
                <div class="content">
                    <div class="right message">
                        <div class="avatar">
                            <img src="../img/photo-steps.png">
                        </div>
                        <div class="content">
                            <p>
                                聽說你最近都在打混。
                            </p>
                        </div>
                    </div>
                </div>
            </div>', 'avatar')
                            
            /**
             * 中繼資料
             */
             
            ->single('中繼資料', '可以在聊天內容下方插入一些中繼資料。', 
           '<div class="ts chatroom">
                <div class="content">
                    <div class="left message">
                        <div class="avatar">
                            <img src="../img/photo-steps.png">
                        </div>
                        <div class="content">
                            <p>
                                聽說你最近都在打混。
                            </p>
                            <div class="meta">
                                <div class="item">
                                    12:32 PM
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>', 'meta, item')
                            
            /**
             * 分隔線
             */
             
            ->single('分隔線', '用來區分兩個對話之間的分隔點。', 
           '<div class="ts chatroom">
                <div class="content">
                    <div class="left message">
                        <div class="content">
                            <p>
                                你最近還好嗎？
                            </p>
                        </div>
                    </div>
                    <div class="divider">
                        昨天
                    </div>
                    <div class="right message">
                        <div class="content">
                            <p>
                                我很好啊，怎麼了嗎？
                            </p>
                        </div>
                    </div>
                </div>
            </div>', 'divider')
            
            ->groupEnd()
            ->groupStart('底部 ', '用來擺放聊天室的輸入欄位和其相關功能。')
            
            /**
             * 底部
             */
             
            ->single('底部', '基本的底部區塊。', 
           '<div class="ts chatroom">
                <div class="footer">
                    <div class="input">
                        <div class="ts medium fluid input">
                            <input type="text" placeholder="訊息">
                        </div>
                    </div>
                </div>
            </div>', 'input')
                            
            /**
             * 功能區塊
             */
             
            ->single('功能區塊', '可以用來擺放額外選項的區塊。', 
           '<div class="ts chatroom">
                <div class="footer">
                    <div class="input">
                        <div class="ts medium fluid input">
                            <input type="text" placeholder="訊息">
                        </div>
                    </div>
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-smile-o"></i>
                        </div>
                        <div class="item">
                            <i class="fa fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>', 'actions, item')
                            
            /**
             * 左右兩方的功能區塊
             */
             
            ->single('左右兩方的功能區塊', '功能區塊也可以擺在左右邊。', 
           '<div class="ts chatroom">
                <div class="footer">
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-smile-o"></i>
                        </div>
                    </div>
                    <div class="input">
                        <div class="ts medium fluid input">
                            <input type="text" placeholder="訊息">
                        </div>
                    </div>
                    <div class="actions">
                        <div class="item">
                            <i class="fa fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>', 'list, item')
            
            ->groupEnd()
            ->footer('elements/input.html');
?>