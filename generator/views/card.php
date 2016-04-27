<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('卡片', '隨心所欲，像漢堡一樣，拼湊出你喜歡的。')
            ->headerGroup('說明', '<p>卡片的內容可以是由各式各樣的元素組成，</p>
                                   <p>這一個特點請參考「內容」的介紹區塊。</p>
                                   <p>&nbsp;</p>
                                   <p>卡片和片段事實上外觀相同（它們來自同個樣式），</p>
                                   <p>但你不應該因為外觀一樣，就將原本應該用卡片顯示的內容以片段代替，</p>
                                   <p>請別忘記：雖然外觀一樣，但是內在卻不一樣。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '卡片具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的卡片。', 
           '<div class="ts card">
                <div class="image">
                    <img src="../img/infinity-s/05.jpg">
                </div>
    
                <div class="content">
                    <div class="header">
                        いんふぃ™
                    </div>
                    <div class="meta">
                        <a>@AW_infi</a>
                        <a>Jan 2</a>
                    </div>
                    <div class="description">
                    <p>
                        【お知らせ】
                        冬コミで頒布した新作ブランケット、新刊同人誌、本編ディスク、
                        過去グッズ等すべての通信販売を開始しました！
                        http://shop.infinity-s.jp
                    </p>
                    </div>
                </div>
            </div>', 'card')
                
            /**
             * 多個卡片
             */
             
            ->single('多個卡片', '一個卡片列，這將使得卡片都保持相同高度。', 
           '<div class="ts cards">
                <div class="ts card">
                    <div class="content">
                        <div class="header">
                            Yami Odymel
                        </div>
                        <div class="description">
                            <p>看似最重要的東西卻沒能被妥善利用，</p>
                            <p>沒有人能發現這一點，因為他們早已活在過去，</p>
                            <p>才剛開始的序章卻被放在頁尾。</p>
                        </div>
                    </div>
                </div>
                
                <div class="ts card">
                    <div class="content">
                        <div class="header">
                            いんふぃ™
                        </div>
                        <div class="description">
                            <p>
                                infinity-S最新作、『黄昏ウィズ - Twilight Invocation』
                                Google PlayおよびApp Storeにて好評配信中！
                            </p>
                        </div>
                    </div>
                </div>
            </div>', 'cards')
                            
            ->groupEnd()
            ->groupStart('內容', '卡片是由多種內容所組成的，你可以在此任意挑選並組合搭配。')
            
            /**
             * 內容
             */
             
            ->single('內容', '一個放置文字的區塊。', 
           '<div class="ts card">
                <div class="content">
                    【お知らせ】
                    冬コミで頒布した新作ブランケット、新刊同人誌、本編ディスク、
                    過去グッズ等すべての通信販売を開始しました！
                    http://shop.infinity-s.jp
                </div>
            </div>', 'content')
            
            /**
             * 圖片
             */
             
            ->single('圖片', '一個用以放置圖片的區塊。', 
           '<div class="ts card">
                <div class="image">
                    <img style="height: 200px; width: 100%; object-fit: cover" src="../img/events.png">
                </div>
                
                <div class="content">
                    <p>伊繁星最高協議——第六條：</p>
                    <p>設計一項產品，或是任何服務，</p>
                    <p>都應抱持原本創作的理念，</p>
                    <p>不得因自我、商業利益進而更改創作理念。</p>
                </div>
            </div>', 'image')
                            
            /**
             * 標題
             */
             
            ->single('標題', '用以放置人名、標題、名稱的區塊。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">
                        いんふぃ™
                    </div>
                    <div class="description">
                        <p>冬コミの売り上げも底をつき、当サークル運用資金が0円になりました。</p>
                    </div>
                </div>
            </div>', 'header')
                            
            /**
             * 說明
             */
             
            ->single('說明', '用來解釋的區塊。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">
                        文青短文精選
                    </div>
                    <div class="description">
                        <p>路，就是一條直直的。</p>
                        <p>哥 抽的不是菸 是筋。</p>
                    </div>
                </div>
            </div>', 'description')
                            
            /**
             * 中繼資料
             */
             
            ->single('中繼資料', '放置時間、標籤、短資料的區塊。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">
                        いんふぃ™
                    </div>
                    <div class="meta">
                        <a>
                            @AW_infi
                        </a>
                        <a>
                            Jan 2
                        </a>
                    </div>
                    <div class="description">
                        <p>
                            映画のように没入できる『シネマティックノベル』をリリースしている『infinity-G™』および『いんふぃ™』です。
                            最新作『ALLiWs』を2016年8月リリース予定。
                        </p>
                    </div>
                </div>
            </div>', 'meta')
                            
            /**
             * 中繼資料內的清單
             */
             
            ->single('中繼資料內的清單', '你也可以在資料區塊內使用清單改變樣式。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">
                        いんふぃ™
                    </div>
                    <div class="meta">
                        <div class="ts horizontal middoted link list">
                            <a class="item">
                                @AW_infi
                            </a>
                            <a class="item">
                                Jan 2
                            </a>
                        </div>
                    </div>
                </div>
            </div>', 'list')
                            
            /**
             * 連結
             */
             
            ->single('連結', '你可以將一些區塊轉換成連結。', 
           '<div class="ts card">
                <a class="image" href="#!">
                    <img style="height: 200px; width: 100%; object-fit: cover" src="../img/infinity-s/05.jpg">
                </a>
                <div class="content">
                    <a class="header" href="#!">
                        いんふぃ™
                    </a>
                    <div class="meta">
                        <a href="#!">
                            @AW_infi
                        </a>
                        <a href="#!">
                            Jan 2
                        </a>
                    </div>
                </div>
            </div>', 'meta')
            
            /**
             * 按鈕
             */
             
            ->single('按鈕', '你也可以把按鈕放入卡片中。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">
                        いんふぃ™
                    </div>
                    <div class="meta">
                        <a>@AW_infi</a>
                        <a>5h</a>
                    </div>
                    <div class="description">
                        <p>
                            今のゲーム制作用PCをPV制作もできるようリプレースするためには最低20万円の投資が必要だと判明した(ヨドバシ基..
                        </p>
                    </div>
                </div>
                <div class="ts attached bottom buttons">
                    <button class="ts button">完成預覽</button>
                </div>
            </div>', 'attached, bottom, buttons')
                            
            /**
             * 代表性符號
             */
             
            ->single('代表性符號', '放入一個代表這張卡片性質的符號。', 
           '<div class="ts card">
                <div class="content">
                    <p>任何已發布或是計畫中之產品及服務，</p>
                    <p>皆不得用來刻意偏頗大眾想法、喜好、甚至混淆視聽，</p>
                    <p>且該產品及服務不得擁有自我立場。</p>
                    <div class="symbol">
                        <i class="fa fa-warning"></i>
                    </div>
                </div>
            </div>', 'symbol')
                            
            /**
             * 額外內容
             */
             
            ->single('額外內容', '一個與這個卡片有關連的額外內容。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">絕園的暴風雨</div>
                    <div class="meta">
                        <a>2014-11-24 22:13</a>
                    </div>
                    <div class="description">
                        <p>正氣和狂氣，理性和知性，自信和確信，</p>
                        <p>在悲劇性的不合理世界，故事開始了。</p>
                    </div>
                </div>
                <div class="extra content">
                    <i class="fa fa-eye"></i> 934 次欣賞
                </div>
            </div>', 'extra content')
            
            ->groupEnd()
            ->groupStart('外觀', '卡片具有不同的外觀。')
            
            /**
             * 語意
             */
             
            ->single('語意', '一個卡片可以帶有不同的意思。', 
           '<div class="ts primary card">
                <div class="content">
                    <p>
                        Jajjimento（ジャッジメント）中文涵意是風紀委員，這是用來驗證表單的 PHP 類別。
                    </p>
                </div>
            </div>
            <div class="ts warning card">
                <div class="content">
                    <p>
                        夏希是一個基於 PHP 的時間類別，用以取得現在的時間，或者是數天後的現在時刻。
                    </p>
                </div>
            </div>
            <div class="ts info card">
                <div class="content">
                    <p>
                        帝國是一個基於 PHP 的權限管理系統，建立一個帝國需要細心的規劃。
                    </p>
                </div>
            </div>', 'primary, warning, info')
            
            /**
             * 基本語意
             */
             
            ->single('基本語意', '結構較簡易的語意。', 
           '<div class="ts primary basic card">
                <div class="content">
                    <p>
                        Jajjimento（ジャッジメント）中文涵意是風紀委員，這是用來驗證表單的 PHP 類別。
                    </p>
                </div>
            </div>
            <div class="ts warning basic card">
                <div class="content">
                    <p>
                        夏希是一個基於 PHP 的時間類別，用以取得現在的時間，或者是數天後的現在時刻。
                    </p>
                </div>
            </div>
            <div class="ts info basic card">
                <div class="content">
                    <p>
                        帝國是一個基於 PHP 的權限管理系統，建立一個帝國需要細心的規劃。
                    </p>
                </div>
            </div>', 'primary, warning, info, basic')
                            
            /**
             * 肯定與否定
             */
             
            ->single('肯定與否定', '卡片也可以帶有肯定或否定的意思。', 
           '<div class="ts positive card">
                <div class="content">
                    <div class="header">正面！</div>
                    <p>這是一個比較正面的卡片。</p>
                </div>
            </div>
            <div class="ts negative card">
                <div class="content">
                    <div class="header">負面 :(</div>
                    <p>我是一張比較負面的卡片。</p>
                </div>
            </div>', 'positive, negative')
                            
            /**
             * 問答
             */
             
            ->single('問答', '一個帶有肯定與否定按鈕的卡片。', 
           '<div class="ts positive card">
                <div class="content">
                    <div class="header">請問</div>
                    <div class="description">
                        <p>比起小明，您是否更喜歡小安？</p>
                    </div>
                    <div class="symbol">
                        <i class="fa fa-question-circle"></i>
                    </div>
                </div>
                <div class="ts attached bottom buttons">
                    <button class="ts positive button">是的</button>
                    <button class="ts negative button">不是</button>
                    
                </div>
            </div>', 'positive, negative')
            
            /**
             * 簡潔問答
             */
             
            ->single('簡潔問答', '一個將按鈕獨立擺放的問答。', 
           '<div class="ts postive card">
                <div class="content">
                    <div class="header">請問</div>
                    <div class="description">
                        <p>比起小明，您是否更喜歡小安？</p>
                    </div>
                    <div class="symbol">
                        <i class="fa fa-question-circle"></i>
                    </div>
                </div>
                <div class="extra right aligned content">
                    <button class="ts primary button">是的</button>
                    <button class="ts button">不是</button>
                    
                </div>
            </div>', 'positive, negative')
            
            /**
             * 浮動內容
             */
             
            ->single('浮動內容', '卡片內的元素可以置左或置右浮動。', 
           '<div class="ts card">
                <div class="content">
                    <div class="header">絕園的暴風雨</div>
                    <div class="meta">
                        <a>1457 次欣賞</a>
                        <a class="right floated">2014-01-05 16:18</a>
                    </div>
                    <div class="description">
                        <p>事到如今裝成受害者才更卑劣。</p>
                    </div>
                </div>
            </div>', 'floated, right')
            
            /**
             * 流動
             */
             
            ->single('流動', '卡片可以完全符合容器的寬度。', 
           '<div class="ts fluid card">
                <div class="content">
                    <div class="header">卡莉絲</div>
                    <div class="meta">
                        <a>Tocas 聚合</a>
                    </div>
                    <div class="description">
                        <p>⠠⠁ ⠏⠑⠗⠎⠕⠝ ⠺⠓⠕ ⠋⠗⠕⠍ ⠞⠓⠑ ⠍⠁⠛⠊⠉⠁⠇ ⠺⠕⠗⠇⠙⠂ ⠏⠑⠗⠓⠁⠏⠎ ⠝⠕⠞⠂</p>
                        
                        <p>⠠⠊⠋ ⠠⠊ ⠞⠑⠇⠇ ⠽⠕⠥ ⠞⠓⠁⠞ ⠠⠉⠁⠗⠊⠎ ⠊⠎ ⠁⠉⠞⠥⠁⠇⠇⠽ ⠁ ⠑⠧⠊⠇⠂ </p>
                        
                        <p>⠺⠊⠇⠇ ⠽⠕⠥ ⠎⠞⠊⠇⠇ ⠞⠗⠥⠎⠞ ⠍⠑⠦</p>
                        
                        <p>⠠⠏⠇⠑⠁⠎⠑⠂ ⠎⠁⠽ ⠽⠑⠎⠲</p>
                    </div>
                </div>
            </div>', 'fluid')
                            
            ->groupEnd()
            ->footer('views/card.html');
?>