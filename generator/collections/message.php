<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('訊息', '傳遞訊息至遠方。')
            ->headerGroup('說明', '<p>訊息長得和片段很類似，但訊息通常是簡短的文字，</p>
                                   <p>用以告訴使用者一些資訊。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '選單具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的訊息。', 
           '<div class="ts message">
                <div class="header">靜思語</div>
                <p>輸的時候失去最多的就是理智。</p>
            </div>', 'message')
                
            /**
             * 清單
             */
             
            ->single('清單', '一個帶有清單的訊息。', 
           '<div class="ts message">
                <div class="header">現已推出</div>
                <div class="list">
                    <li>虛擬實境擴充</li>
                    <li>肥宅模擬器 2016</li>
                </div>
            </div>', 'list')
                            
            /**
             * 圖示
             */
             
            ->single('圖示', '一個帶有圖示的訊息。', 
           '<div class="ts icon message">
                <i class="fa fa-gift"></i>
                <div class="content">
                    <div class="header">最新禮物</div>
                    <p>你收到了來自 ThisAV 的禮物。</p>
                </div>
            </div>', 'icon')
                            
            /**
             * 可關閉的
             */
             
            ->single('可關閉的', '一個可以關閉的訊息。', 
           '<div class="ts dismissable message">
                <div class="header">不喜歡我？</div>
                <p>那就關閉我吧。</p>
                <a href="#!" class="close"></a>
            </div>', 'dismissable')
                            
            ->groupEnd()
            ->groupStart('狀態', '訊息帶有一些不同的狀態。')
            
            /**
             * 隱藏
             */
             
            ->single('隱藏', '用來隱藏訊息。', 
           '<div class="ts hidden message">
                <p>你看不見我。</p>
            </div>', 'hidden')
            
            ->groupEnd()
            ->groupStart('外觀', '訊息有不同的外觀。')
            
            /**
             * 輕巧版
             */
             
            ->single('輕巧版', '讓訊息透過文字長度來決定寬度。', 
           '<div class="ts compact message">
                <p>可惡，好想知道她的名字啊！</p>
            </div>', 'compact')
                            
            /**
             * 主要
             */
             
            ->single('主要', '一個帶有主要訊息的樣式。', 
           '<div class="ts primary message">
                <div class="header">現已開始</div>
                <p>目前「osu! World Cup 2015」已開始進行直播。</p>
            </div>', 'primary')
                            
            /**
             * 警告
             */
             
            ->single('警告', '一個帶有警告意味的訊息。', 
           '<div class="ts warning message">
                <div class="header">您需要先登入！</div>
                <p>不好意思，您需要先登入才能夠執行這項動作。</p>
            </div>', 'warning')
                            
            /**
             * 資訊
             */
             
            ->single('資訊', '一個帶有資訊意味的訊息。', 
           '<div class="ts info message">
                <div class="header">需要一些時間</div>
                <p>你所上傳的影片會在稍後開始進行轉檔動作。</p>
            </div>', 'info')
                            
            /**
             * 肯定和否定
             */
             
            ->single('肯定和否定', '一個帶有正面或負面意味的訊息。', 
           '<div class="ts positive message">
                <div class="header">恭喜！</div>
                <p>你已經註冊成功。</p>
            </div>
            <div class="ts negative message">
                <div class="header">此文章已被刪除</div>
                <p>你欲拜訪的文章因違反規定而遭到刪除。</p>
            </div>', 'positive, negative')
                            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '訊息具有不同的大小可供使用。', 
           '<div class="ts mini message">
                <p>我是迷你。</p>
            </div>
            <div class="ts message">
                <p>我是一般訊息。</p>
            </div>
            <div class="ts huge message">
                <p>我是巨大。</p>
            </div>', 'mini, huge')
                            
            ->groupEnd()
            ->footer('collections/message.html');
?>