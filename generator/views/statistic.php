<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('統計數據', '平均可能不超過 8 —— 公分。')
            ->headerGroup('說明', '<p>統計數據可以在數據下顯示一個說明標籤，</p>
                                   <p>用來敘述該數字的含意。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '統計數據具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的統計數據。', 
           '<div class="ts statistic">
                <div class="value">
                    42,689
                </div>
                <div class="label">
                    拜訪次數
                </div>
            </div>', 'statistic, value, label')
            
            /**
             * 標籤於上
             */
             
            ->single('標籤於上', '標籤也可以在統計數據的上方，你只需要變更順序。', 
           '<div class="ts statistic">
                <div class="label">
                    會員總數
                </div>
                <div class="value">
                    999+
                </div>
            </div>', 'statistic, value, label')
            
            /**
             * 群組
             */
             
            ->single('群組', '一個統計數據群組。', 
           '<div class="ts statistics">
                <div class="statistic">
                    <div class="value">
                        724
                    </div>
                    <div class="label">
                        下載次數
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        916
                    </div>
                    <div class="label">
                        檢視次數
                    </div>
                </div>
            </div>', 'statistics')
            
            ->groupEnd()
            ->groupStart('內容', '統計數據中包有不同性質的內容。')
            
            /**
             * 數值
             */
             
            ->single('數值', '包含主要統計數據的數字、數值，其中也可以帶有圖示、文字或圖片。', 
           '<div class="ts statistics">
                <div class="statistic">
                    <div class="value">
                        724
                    </div>
                    <div class="label">
                        下載次數
                    </div>
                </div>
                <div class="statistic">
                    <div class="text value">
                        三千六百<br>八十萬
                    </div>
                    <div class="label">
                        檢視次數
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        <i class="fa fa-flag"></i>
                        32
                    </div>
                    <div class="label">
                        已佔據
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        <img class="ts circular inline image" src="../img/infinity-s/01.png">
                        Infinity-S
                    </div>
                    <div class="label">
                        人氣最高
                    </div>
                </div>
            </div>', 'text, value')
            
            /**
             * 標籤
             */
             
            ->single('標籤', '用來告訴使用者這個數據的含義。', 
           '<div class="ts statistic">
                <div class="value">
                    315
                </div>
                <div class="label">
                    點擊次數
                </div>
            </div>', 'label')
            
            ->groupEnd()
            ->groupStart('外觀', '你也可以更改統計數據的外觀。')
            
            /**
             * 水平統計數據
             */
             
            ->single('水平統計數據', '讓統計數據以水平的方式擺放。', 
           '<div class="ts horizontal statistic">
                <div class="value">
                    315
                </div>
                <div class="label">
                    點擊次數
                </div>
            </div>', 'horizontal')
            
            /**
             * 水平統計數據群組
             */
             
            ->single('', '', 
           '<div class="ts horizontal statistics">
                <div class="statistic">
                    <div class="value">
                        724
                    </div>
                    <div class="label">
                        下載次數
                    </div>
                </div>
                <div class="statistic">
                    <div class="value">
                        916
                    </div>
                    <div class="label">
                        檢視次數
                    </div>
                </div>
            </div>', 'horizontal')
            
            ->groupEnd()
            
            ->footer('views/statistic.html');
?>