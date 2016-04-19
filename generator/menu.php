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
                <div class="item">首頁</div>
                <div class="item">關於</div>
                <div class="item">文件</div>
            </div>', 'menu, item')
                
            /**
             * 其次
             */
             
            ->single('其次', '一個比較不重要的選單。', 
           '<div class="ts secondary menu">
                <div class="item">動漫</div>
                <div class="item">休閒</div>
                <div class="item">音樂</div>
            </div>', 'secondary')
                            
            /**
             * 帶指標
             */
             
            ->single('帶指標', '一個帶有指示標記的選單。', 
           '<div class="ts pointing menu">
                <div class="item">風紀委員</div>
                <div class="active item">夏希</div>
                <div class="item">帝國</div>
            </div>', 'pointing')
                            
            /**
             * 帶指標的其次
             */
             
            ->single('帶指標的其次', '一個帶有指示標記卻又比較不重要的選單。', 
           '<div class="ts pointing secondary menu">
                    <div class="item">首頁</div>
                    <div class="active item">關於</div>
                    <div class="item">文件</div>
                </div>', 'pointing, secondary')
                            
            /**
             * 垂直
             */
             
            ->single('垂直', '一個垂直的選單。', 
           '<div class="ts vertical menu">
                <div class="item">首頁</div>
                <div class="item">關於</div>
                <div class="item">文件</div>
            </div>', 'vertical')
            
            ->groupEnd()
            ->groupStart('狀態', '一個選單帶有些不同的狀態。')
            
            /**
             * 啟用中
             */
             
            ->single('啟用中', '顯示這個項目正在使用、被啟用。', 
           '<div class="ts menu">
                <div class="item">首頁</div>
                <div class="active item">關於</div>
                <div class="item">文件</div>
            </div>', 'active')
            
            ->groupEnd()
            ->groupStart('內容', '一個選單具有不同內容。')
            
            /**
             * 重複選單
             */
             
            ->single('重複選單', '一個選單內可以再放置一個相同層級的選單。', 
           '<div class="ts menu">
                <div class="item">首頁</div>
                <div class="item">關於</div>
                <div class="item">文件</div>
                <div class="right menu">
                    <div class="item">檔案</div>
                    <div class="item">Github</div>
                </div>
            </div>', 'menu')
                            
            ->groupEnd()
            ->groupStart('外觀', '選單具有不同的外觀。')
                            
            /**
             * 圖示
             */
             
            ->single('圖示', '用來擺放圖示的選單。', 
           '<div class="ts icon menu">
                <div class="item">
                    <i class="fa fa-search"></i>
                </div>
                <div class="item">
                    <i class="fa fa-download"></i>
                </div>
                <div class="item">
                    <i class="fa fa-upload"></i>
                </div>
            </div>', 'icon')
                            
            /**
             * 減少框線
             */
             
            ->single('減少框線', '選單也可以選擇不要有內部框線。', 
           '<div class="ts borderless menu">
                <div class="item">
                    亞凡芽
                </div>
                <div class="item">
                    卡莉絲
                </div>
                <div class="item">
                    夏希
                </div>
            </div>', 'borderless')
                            
            /**
             * 縮減
             */
             
            ->single('縮減', '項目可以不要有垂直或是水平內距。', 
           '<div class="ts menu">
                <div class="horizontally fitted item">
                    水平縮減
                </div>
                <div class="vertically fitted item">
                    垂直縮減
                </div>
                <div class="item">
                    一般選項
                </div>
            </div>', 'horizontally')
                            
            /**
             * 寬鬆
             */
             
            ->single('寬鬆', '選單可以套用更寬鬆的樣式。', 
           '<div class="ts relaxed menu">
                <div class="item">
                    亞凡芽
                </div>
                <div class="item">
                    卡莉絲
                </div>
                <div class="item">
                    夏希
                </div>
            </div>', 'relaxed')
                            
            ->groupEnd()
            ->footer('elements/input.html');
?>