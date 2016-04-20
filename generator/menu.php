<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('選單', '從這裡到達任何地方。')
            ->headerGroup('說明', '<p>選單在螢幕過小時會更改為捲動式，</p>
                                   <p>而不會變更為響應式設計。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '選單具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的選單。', 
           '<div class="ts menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'menu, item')
                
            /**
             * 其次
             */
             
            ->single('其次', '一個比較不重要的選單。', 
           '<div class="ts secondary menu">
                <a href="#!" class="item">動漫</a>
                <a href="#!" class="item">休閒</a>
                <a href="#!" class="item">音樂</a>
                <div class="right menu">
                    <div class="item">
                        <div class="ts right icon medium input">
                            <input type="text" placeholder="文字欄位">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                </div>
                
            </div>', 'secondary')
                            
            /**
             * 帶指標
             */
             
            ->single('帶指標', '一個帶有指示標記的選單。', 
           '<div class="ts pointing menu">
                <a href="#!" class="item">風紀委員</a>
                <a href="#!" class="active item">夏希</a>
                <a href="#!" class="item">帝國</a>
            </div>', 'pointing')
                            
            /**
             * 帶指標的其次
             */
             
            ->single('帶指標的其次', '一個帶有指示標記卻又比較不重要的選單。', 
           '<div class="ts pointing secondary menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="active item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'pointing, secondary')
                            
            /**
             * 垂直
             */
             
            ->single('垂直', '一個垂直的選單。', 
           '<div class="ts vertical menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'vertical')
            
            ->groupEnd()
            ->groupStart('狀態', '一個選單帶有些不同的狀態。')
            
            /**
             * 啟用中
             */
             
            ->single('啟用中', '顯示這個項目正在使用、被啟用。', 
           '<div class="ts menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="active item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'active')
            
            ->groupEnd()
            ->groupStart('內容', '一個選單具有不同內容。')
            
            /**
             * 標誌
             */
             
            ->single('標誌', '項目也可以含有標誌性文字。', 
           '<div class="ts info borderless menu">
                <div class="brand item">首頁</div>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'brand')
            
            /**
             * 重複選單
             */
             
            ->single('重複選單', '一個選單內可以再放置一個相同層級的選單。', 
           '<div class="ts menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
                <div class="right menu">
                    <a href="#!" class="item">檔案</a>
                    <a href="#!" class="item">Github</a>
                </div>
            </div>', 'menu')
            
            /**
             * 帶輸入欄位選單
             */
             
            ->single('帶輸入欄位選單', '選單內也可以放置輸入欄位，例如這樣。', 
           '<div class="ts info borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
                <div class="right menu">
                    <div href="#!" class="item">
                        <div class="ts right icon small transparent inverted input">
                            <input type="text" placeholder="文字欄位">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                </div>
            </div>', 'menu')
                            
            ->groupEnd()
            ->groupStart('外觀', '選單具有不同的外觀。')
            
            /**
             * 語意
             */
             
            ->single('語意', '選單也具有不同語意，你也能搭配減少框線的樣式。', 
           '<div class="ts primary menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts primary borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts info menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts info borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts warning menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts warning borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'primary, info, warning')
            
            /**
             * 肯定和否定
             */
             
            ->single('肯定和否定', '選單也能帶有肯定和否定的語氣。', 
           '<div class="ts positive menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts positive borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts negative menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>
            <div class="ts negative borderless menu">
                <a href="#!" class="item">首頁</a>
                <a href="#!" class="item">關於</a>
                <a href="#!" class="item">文件</a>
            </div>', 'negative, positive')
            
            /**
             * 圖示
             */
             
            ->single('圖示', '用來擺放圖示的選單。', 
           '<div class="ts icon menu">
                <a href="#!" class="item">
                    <i class="fa fa-search"></i>
                </a>
                <a href="#!" class="item">
                    <i class="fa fa-download"></i>
                </a>
                <a href="#!" class="item">
                    <i class="fa fa-upload"></i>
                </a>
            </div>', 'icon')
                            
            /**
             * 減少框線
             */
             
            ->single('減少框線', '選單也可以選擇不要有內部框線。', 
           '<div class="ts borderless menu">
                <a href="#!" class="item">
                    亞凡芽
                </a>
                <a href="#!" class="item">
                    卡莉絲
                </a>
                <a href="#!" class="item">
                    夏希
                </a>
            </div>', 'borderless')
                    
            /**
             * 縮減
             */
             
            ->single('縮減', '項目可以不要有垂直或是水平內距。', 
           '<div class="ts menu">
                <a href="#!" class="horizontally fitted item">
                    水平縮減
                </a>
                <a href="#!" class="vertically fitted item">
                    垂直縮減
                </a>
                <a href="#!" class="item">
                    一般選項
                </a>
            </div>', 'horizontally')
                            
            /**
             * 寬鬆
             */
             
            ->single('寬鬆', '選單可以套用更寬鬆的樣式。', 
           '<div class="ts relaxed menu">
                <a href="#!" class="item">
                    亞凡芽
                </a>
                <a href="#!" class="item">
                    卡莉絲
                </a>
                <a href="#!" class="item">
                    夏希
                </a>
            </div>', 'relaxed')
                            
            ->groupEnd()
            ->footer('collections/menu.html');
?>