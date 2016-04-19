<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('圖片', '搭拉，這看起來跟你本人不太像。')
            ->headerGroup('說明', '<p>圖片在不指定大小的情況下，</p>
                                   <p>預設最大至少可以填滿整個容器。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '圖片具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的圖片。', 
           '<img class="ts small image" src="../img/photo-steps.png">', 'image')
                
            ->groupEnd() 
            ->groupStart('狀態', '圖片具有不同的狀態。')
                            
            /**
             * 隱藏
             */
             
            ->single('隱藏', '隱藏一個圖片。', 
           '<img class="ts hidden image" src="../img/photo-steps.png">', 'hidden')
                            
            /**
             * 已停用
             */
             
            ->single('已停用', '顯示一個圖片已經過時、不可用。', 
           '<img class="ts disabled small image" src="../img/photo-steps.png">', 'disabled')
                            
            ->groupEnd()
            ->groupStart('外觀', '圖片具有不同的外觀。')
            
            /**
             * 頭像
             */
             
            ->single('頭像', '頭像的大小會自動調整成比文字稍微大一些。', 
           '<img class="ts avatar image" src="../img/infinity-s/02.png">
            いんふぃ', 'avatar')
            
            /**
             * 框線
             */
             
            ->single('框線', '新增一個預設顏色的框線。', 
           '<img class="ts small bordered image" src="../img/people/01.png">', 'bordered')
            
            /**
             * 流動
             */
             
            ->single('流動', '會填滿整個容器的圖片。', 
           '<img class="ts fluid image" src="../img/infinity-s/01.png">', 'fluid')
            
            /**
             * 圓角
             */
             
            ->single('圓角', '會加一些少許的圓角在圖片角落。', 
           '<img class="ts small rounded image" src="../img/infinity-s/03.png">', 'rounded')
            
            /**
             * 圓型
             */
             
            ->single('圓型', '將圖片變成圓形。', 
           '<img class="ts small circular image" src="../img/infinity-s/04.png">', 'circular')
            
            ->groupEnd()
            ->groupStart('狀態', '你可以隨時透過樣式類別切換一個標題的狀態。')
            
            /**
             * 垂直對齊
             */
             
            ->single('垂直對齊', '將圖片對齊上、下或中間。', 
           '<img class="ts mini top aligned image" src="../img/photo-tocas.png">
            垂直置頂
            <div class="ts divider"></div>
            <img class="ts mini middle aligned image" src="../img/photo-tocas.png">
            垂直置中
            <div class="ts divider"></div>
            <img class="ts mini bottom aligned image" src="../img/photo-tocas.png">
            垂直置障', 'top aligned, bottom aligned, middle aligned')
            
            /**
             * 水平置中
             */
             
            ->single('水平置中', '將圖片水平置中。', 
           '<img class="ts small centered image" src="../img/people/02.png">', 'centered')
                            
            /**
             * 帶空白
             */
             
            ->single('帶空白', '新增一些空白在圖片的左右旁。', 
           '亞凡芽 <img class="ts mini spaced image" src="../img/photo-avane.png"> 是一個基於 PHP 的模板引擎，
            很適合用在具有 MVC 架構的大型應用程式中，其中亞凡芽還支援了動態 CSS 名稱，你可以隨機命名類別名稱，
            或者是將類別名稱轉換成 Emoji（表情符號），也可以將 JavaScript 檔案匯集成一個檔案。
            Tocas 是一個基於 CSS3 的 <img class="ts mini spaced image" src="../img/photo-tocas.png"> 網頁介面框架，
            以行動裝置為主，同時也支援自訂顏色，還有更具有語意的類別名稱。', 'spaced')
                            
            /**
             * 左右浮動
             */
             
            ->single('左右浮動', '讓圖片浮動置左或置右。', 
           '<img class="ts tiny left floated image" src="../img/people/03.png">
            <p>保障任何人的著作權，其中包括二次創作，二次創作僅可在原作者未聲明否決下進行發佈和創作，
            在未經原作允許下衍生任何具有原作之內容，基於衍生理念與內容為判決要點，
            
            原作必須基於合理使用之理念提出移除、上訴任何非符合合理使用概念的衍生內容，
            
            合理使用的理念如下：
            
            使用目的及性質
            其著重點在於內容是否有所轉化，如衍生創作另有新意，非僅複製原作內容。
            版權作品性質
            <img class="ts tiny right floated image" src="../img/people/04.png">
            以真實、事實所闡述之作品較虛構作品來的能夠符合合理使用。
            使用版權作品的多寡
            引用少量的原創著作比起引用大量來要的符合合理使用，但倘若原創著作成為衍生著作之核心內容，
            
            即使少量的原創著作被引用，也較不可能符合合理使用之原則。
            使用行為對於版權作品的市場或價值之影響
            透過原創著作的內容而進行獲利並造成原創著作部分損害，較不符合合理使用之原則。</p>', 'left floated, right floated')
               
            /**
             * 尺寸
             */
             
            ->single('尺寸', '更改圖片的大小。', 
           '<img class="ts mini image" src="../img/people/01.png">
            <img class="ts tiny image" src="../img/people/02.png">
            <img class="ts small image" src="../img/people/03.png">
            <img class="ts medium image" src="../img/people/04.png">', 'mini, tiny, small, medium, large, big')
            
            ->groupEnd()
            ->groupStart('群組', '圖片可以是一個群組。')
            
            /**
             * 對齊
             */
             
            ->single('尺寸', '群組內的圖片大小將會符合群組所設定的尺寸。', 
           '<div class="ts small images">
                <img src="../img/photo-steps.png">
                <img src="../img/photo-steps.png">
                <img src="../img/photo-steps.png">
            </div>', 'small, images')
                            
            ->groupEnd()
            ->footer('elements/input.html');
?>