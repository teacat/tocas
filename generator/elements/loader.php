<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('讀取指示器', '讓使用者能夠稍微在等待你一下。')
            ->headerGroup('說明', '<p>讀取指示器有兩個種類，一個是讀取中，另一個則是未知，</p>
                                   <p>未知通常用在還在準備的狀態，</p>
                                   <p>例如檔案讀取中，一旦檔案讀取完畢開始上傳，</p>
                                   <p>就可以改用讀取中的狀態。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '讀取指示器具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的讀取指示器。', 
           '<p>看似最重要的東西卻沒能被妥善利用，</p>
            <p>沒有人能發現這一點，因為他們早已活在過去，</p>
             
            <p>才剛開始的序章卻被放在頁尾。</p>
            <div class="ts active loader"></div>', 'loader')
                
            /**
             * 帶有文字
             */
             
            ->single('帶有文字', '一個底部帶有文字的讀取指示器。', 
           '<div class="ts segment">
                <p>看似最重要的東西卻沒能被妥善利用，</p>
                
                <p>沒有人能發現這一點，因為他們早已活在過去，</p>
                 
                <p>才剛開始的序章卻被放在頁尾。</p>
                
                <div class="ts active dimmer">
                    <div class="ts text loader">讀取中</div>
                </div>
            </div>', 'text')
            
            ->groupEnd()
            ->groupStart('狀態', '讀取指示器帶有不同的狀態。')
            
            /**
             * 未知
             */
             
            ->single('未知', '用以顯示未知、或是準備中的狀態。', 
           '<div class="ts segment">
                <p></p>
                <div class="ts active dimmer">
                    <div class="ts indeterminate text loader">
                        準備資料中
                    </div>
                </div>
            </div>', 'indeterminate')

            /**
             * 啟用中
             */
             
            ->single('啟用中', '如果沒有淡化器，那就必須啟用讀取指示器，否則讀取指示器不會出現。', 
           '<div class="ts segment">
                <div class="ts active text loader">讀取中</div>
            </div>', 'active')
            
            ->groupEnd()
            ->groupStart('外觀', '讀取指示器有不同的外觀、尺寸。')
            
            /**
             * 同列區塊
             */
             
            ->single('同列區塊', '將讀取指示器從浮動改為一個區塊。', 
           '<div class="ts active inline loader"></div>
            <div class="ts active inline medium loader"></div>
            <div class="ts active inline large loader"></div>
            <div class="ts active inline big loader"></div>', 'inline')
                            
            /**
             * 置中區塊
             */
             
            ->single('置中區塊', '讀取指示器就算是區塊也可以置中。', 
           '<div class="ts active centered inline loader"></div>
            <div class="ts active centered inline medium loader"></div>
            <div class="ts active centered inline large loader"></div>
            <div class="ts active centered inline big loader"></div>', 'centered')
                            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '讀取指示器具有許多不同的尺寸。', 
           '<div class="ts active inline mini loader"></div>
            <div class="ts active inline tiny loader"></div>
            <div class="ts active inline small loader"></div>
            <div class="ts active inline loader"></div>
            <div class="ts active inline medium loader"></div>
            <div class="ts active inline large loader"></div>
            <div class="ts active inline big loader"></div>
            <div class="ts active inline huge loader"></div>
            <div class="ts active inline massive loader"></div>', 'mini, tiny, small, medium, large, big, huge, massive')
                            
            /**
             * 用在容器中
             */
             
            ->single('用在容器中', '讀取指示器具有許多不同的尺寸。', 
           '<div class="ts segment">
                <p>&nbsp;</p>
                <div class="ts active text mini loader">讀取中</div>
            </div>
            <div class="ts segment">
                <p>&nbsp;</p>
                <div class="ts active text loader">讀取中</div>
            </div>
            <div class="ts segment">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                
                <div class="ts active text large loader">讀取中</div>
            </div>', null)
                            
            ->groupEnd()
            ->footer('elements/loader.html');
?>