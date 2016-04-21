<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('標籤', '那個5元，然後這個——無價。')
            ->headerGroup('說明', '<p>標籤會在沒有內容的時候自動隱藏，</p>
                                   <p>這也也很適合用來當作一個狀態指標，對於一個色盲使用者而言，</p>
                                   <p>標籤不應以顏色來引導他人，而是應該以形狀來敘述狀態，</p>
                                   <p>例如：在線（圓形）、暫離（正方形）、離線（三角形）。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '標籤具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的標籤。', 
           '<div class="ts label">
                <i class="fa fa-gift"></i>
                標籤
            </div>', 'label')
                
            /**
             * 圖片
             */
             
            ->single('圖片', '一個帶有圖片的標籤。', 
           '<div class="ts image label">
                <img src="../img/infinity-s/01.png">
                infinity-G™
            </div>
            <div class="ts image label">
                <img src="../img/infinity-s/02.png">
                いんふぃ™
            </div>
            <div class="ts image label">
                <img src="../img/infinity-s/03.png">
                Rhia™
                <div class="detail">
                    作曲担当
                </div>
            </div>', 'image')
                            
            /**
             * 吸附
             */
             
            ->single('吸附', '吸附在某個容器的角落或是內容中。', 
           '<div class="ts segment">
                <p>&nbsp;</p>
                <p>伊繁星最高協議，所有隸屬伊繁星旗下已發佈或是正於計劃中之產品皆須遵守此協議。</p>
                <p>&nbsp;</p>
                <div class="ts top right attached label">右上標籤</div>
                <div class="ts top left attached label">左上標籤</div>
                <div class="ts bottom right attached label">右下標籤</div>
                <div class="ts bottom left attached label">左下標籤</div>
            </div>', 'top, bottom, left, right, attached')
                            
            ->groupEnd()
            ->groupStart('外觀', '圖片具有不同的外觀。')
            
            /**
             * 彩帶
             */
             
            ->single('彩帶', '吸附在容器某一邊的彩帶。', 
           '<div class="ts segment">
                <div class="ts primary ribbon label">特色宣傳</div> 更簡潔，沒有像 Bootstrap 那樣雜亂的樣式名稱。（如：.m-l-1, .p-x-2, .p-a-3）
                
                <p>以意義為樣式命名的主要精神。</p>
                
                <p>以支援行動裝置為優先。</p>
                
                <p>更加彈性的格線系統，並達到 16 格線。</p>
                
                <p>可自訂元件顏色，甚至只需一行指令。</p>
                
                <div class="ts right ribbon label">我是右側標籤</div>
                
                <p>據有回饋力的動畫。</p>
                
                <p>元件之間可交互使用。</p> 
            </div>', 'ribbon, left, right')
            
            /**
             * 浮動
             */
             
            ->single('浮動', '標籤可以浮動在某個元素的角落。', 
           '<button class="ts primary button">
                已讀所有
                <div class="ts floating circular label">7</div>
            </button>
            <button class="ts warning button">
                檢視
                <div class="ts floating label">13</div>
            </button>', 'floating')
            
            ->groupEnd()
            ->groupStart('內容', '標籤的內容具有不同的性質。')
            
            /**
             * 詳細資料
             */
             
            ->single('詳細資料', '用以詮釋標籤的內容。', 
           '<div class="ts label">
                新郵件
                <div class="detail">689</div>
            </div>', 'detail')
            
            /**
             * 圖示
             */
             
            ->single('圖示', '在標籤內放置一些點綴或是具有功能的圖示。', 
           '<div class="ts left icon label">
                <i class="fa fa-envelope"></i>
                未讀郵件
                <div class="detail">142</div>
            </div>
            
            <div class="ts right icon label">
                吳雨藍
                <i class="fa fa-times"></i>
            </div>', 'left icon, right icon')
                            
            ->groupEnd()
            ->groupStart('外觀', '標籤具有不同的外觀。')
            
            /**
             * 對齊
             */
             
            ->single('尺寸', '標籤可以有不同的大小尺寸。', 
           '<div class="ts mini label">迷你</div>
            <div class="ts tiny label">微小</div>
            <div class="ts small label">小型</div>
            <div class="ts label">預設</div>
            <div class="ts medium label">適中</div>
            <div class="ts large label">大型</div>
            <div class="ts big label">巨大</div>
            <div class="ts huge label">超大</div>
            <div class="ts massive label">重量級</div>', 'mini, tiny, small, medium, large, big, huge, massive')
            
            /**
             * 圓形
             */
             
            ->single('圓形', '將標籤變成圓形。', 
           '<div class="ts circular label">
                1
            </div>
            <div class="ts circular label">
                99+
            </div>
            <div class="ts circular label">
                1234567
            </div>', 'circular')
            
            /**
             * 空的
             */
             
            ->single('空的', '一個空的標籤。', 
           '<div class="ts empty circular label"></div>
            <div class="ts empty triangle label"></div>
            <div class="ts empty square label"></div>
            <div class="ts empty circular primary label"></div>
            <div class="ts empty circular info label"></div>
            <div class="ts empty square positive label"></div>
            <div class="ts empty square negative label"></div>
            <div class="ts empty triangle info label"></div>
            <div class="ts empty triangle warning label"></div>', 'empty circular, empty triangle, empty square')
            
            /**
             * 語氣
             */
             
            ->single('語氣', '標籤也可以擁有不同的語氣。', 
           '<div class="ts circular primary label">9</div>
            <div class="ts circular info label">14</div>
            <div class="ts warning label">7</div>
            <div class="ts positive label">13</div>', 'primary, info, warning, positive, negative')
                            
            ->groupEnd()
            ->footer('elements/label.html');
?>