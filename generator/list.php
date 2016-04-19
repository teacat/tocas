<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('清單', '一個這個，一個那個。')
            ->headerGroup('說明', '<p>標籤會在沒有內容的時候自動隱藏，</p>
                                   <p>這也也很適合用來當作一個狀態指標，對於一個色盲使用者而言，</p>
                                   <p>標籤不應以顏色來引導他人，而是應該以形狀來敘述狀態，</p>
                                   <p>例如：在線（圓形）、暫離（正方形）、離線（三角形）。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '清單具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的清單。', 
           '<div class="ts list">
                <div class="item">橙希</div>
                <div class="item">卡莉絲</div>
                <div class="item">吳雨藍</div>
                <div class="item">亞凡芽</div>
            </div>', 'list, item')
                
            /**
             * 以 ul 為主
             */
             
            ->single('以 ul 為主', '你也可以透過 ul 來達到更方便的清單效果。', 
           '<ul class="ts list">
                <li>橙希</li>
                <li>卡莉絲</li>
                <li>吳雨藍</li>
                <li>亞凡芽</li>
            </ul>', 'list, item')
                            
            /**
             * 黑點
             */
             
            ->single('黑點', '一個帶有黑點的清單。', 
           '<div class="ts bulleted list">
                <div class="item">橙希</div>
                <div class="item">卡莉絲</div>
                <div class="item">吳雨藍</div>
                <div class="item">亞凡芽</div>
            </div>', 'bulleted')

            /**
             * 中間點
             */
             
            ->single('中間點', '你也可以採用「中間點」來當作項目的代表記號。', 
           '<div class="ts middoted list">
                <div class="item">橙希</div>
                <div class="item">卡莉絲</div>
                <div class="item">吳雨藍</div>
                <div class="item">亞凡芽</div>
            </div>', 'middoted')
            
            /**
             * 連結
             */
             
            ->single('連結', '一個專門擺放連結的清單。', 
           '<div class="ts link list">
                <a href="#!" class="active item">橙希</a>
                <a href="#!" class="item">卡莉絲</a>
                <a href="#!" class="item">吳雨藍</a>
                <a href="#!" class="item">亞凡芽</a>
            </div>', 'link')
            
            ->groupEnd()
            ->groupStart('內容', '清單包含了各式各樣的內容。')
            
            /**
             * 項目
             */
             
            ->single('項目', '項目是清單中最基本的內容。', 
           '<div class="ts list">
                <div class="item">英梨梨</div>
                <div class="item">詩羽</div>
                <div class="item">加藤惠</div>
            </div>', 'item')
            
            /**
             * 連結
             */
             
            ->single('連結', '清單也可以是存放許多連結的地方。', 
           '<div class="ts list">
                <a href="#!" class="item">九條可憐</a>
                <a href="#!" class="item">豬熊陽子</a>
                <a href="#!" class="item">小路綾</a>
            </div>', null)

            /**
             * 圖片
             */
             
            ->single('圖片', '清單的項目可以包含圖片。', 
           '<div class="ts list">
                <div class="item">
                    <div class="image">
                        <img src="../img/infinity-s/01.png">
                    </div>
                    <div class="content">
                        <div class="header">infinity-G™☆3日目東ユ46b</div>
                        <div class="meta">@infinity_AW</div>
                    </div>
                </div>
                <div class="item">
                    <div class="image">
                        <img src="../img/infinity-s/02.png">
                    </div>
                    <div class="content">
                        <div class="header">いんふぃ™☆3日目東ユ-46b</div>
                        <div class="meta">@AW_infi</div>
                    </div>
                </div>
                <div class="item">
                    <div class="image">
                        <img src="../img/infinity-s/03.png">
                    </div>
                    <div class="content">
                        <div class="header">Rhia™☆3日目東ユ-46b</div>
                        <div class="meta">@infinityG_Rhia</div>
                    </div>
                </div>
            </div>', 'image')
            
            /**
             * 標題
             */
             
            ->single('標題', '清單的項目可以包含一個標題。', 
           '<div class="ts list">
                <div class="item">
                    <div class="content">
                        <div class="header">infinity-G™☆3日目東ユ46b</div>
                        『黄昏ウィズ - Twilight Invocation -』もストアにて大好評配信中！
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="header">いんふぃ™☆3日目東ユ-46b</div>
                        更新情報や最新情報は@infinity_AWをご確認ください。
                    </div>
                </div>
                <div class="item">
                    <div class="content">
                        <div class="header">Rhia™☆3日目東ユ-46b</div>
                        『黄昏ウィズ』をスマホとPCへリリース中。
                    </div>
                </div>
            </div>', 'header')
            
            ->groupEnd()
            ->groupStart('外觀', '清單具有不同的外觀。')
            
            /**
             * 水平清單
             */
             
            ->single('水平清單', '清單可以是水平排列的。', 
           '<div class="ts horizontal list">
                <div class="item">首頁</div>
                <div class="item">文件</div>
                <div class="item">關於</div>
            </div>', 'horizontal')
            
            /**
             * 水平清單和黑點
             */
             
            ->single('水平清單和黑點', '水平清單也可以搭配黑點。', 
           '<div class="ts bulleted horizontal list">
                <div class="item">首頁</div>
                <div class="item">文件</div>
                <div class="item">關於</div>
            </div>
            <br>
            <div class="ts middoted horizontal list">
                <div class="item">首頁</div>
                <div class="item">文件</div>
                <div class="item">關於</div>
            </div>', 'bulleted, middoted')
                            
            /**
             * 寬鬆
             */
             
            ->single('寬鬆', '一個間距較大的寬鬆清單。', 
           '<div class="ts relaxed horizontal list">
                <div class="item">千導院楓</div>
                <div class="item">粒櫻杏子</div>
                <div class="item">若葉昴</div>
            </div>
            <br>
            <div class="ts relaxed list">
                <div class="item">天野望</div>
                <div class="item">火井向百合</div>
                <div class="item">成海遙香</div>
            </div>', 'relaxed')
                            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '不同的尺寸大小。', 
           '<div class="ts mini horizontal list">
                <div class="item">迷你</div>
                <div class="item">迷你</div>
            </div>
            <div class="ts tiny horizontal list">
                <div class="item">微小</div>
                <div class="item">微小</div>
            </div>
            <div class="ts small horizontal list">
                <div class="item">小型</div>
                <div class="item">小型</div>
            </div>
            <div class="ts medium horizontal list">
                <div class="item">適中</div>
                <div class="item">適中</div>
            </div>
            <div class="ts horizontal list">
                <div class="item">預設</div>
                <div class="item">預設</div>
            </div>
            <div class="ts large horizontal list">
                <div class="item">較大</div>
                <div class="item">較大</div>
            </div>
            <div class="ts big horizontal list">
                <div class="item">大型</div>
                <div class="item">大型</div>
            </div>
            <div class="ts huge horizontal list">
                <div class="item">超大</div>
                <div class="item">超大</div>
            </div>
            <div class="ts massive horizontal list">
                <div class="item">重量級</div>
                <div class="item">重量級</div>
            </div>', 'mini, tiny, small, medium, large, big, huge, massive')
                            
            ->groupEnd()
            ->footer('elements/input.html');
?>