<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('表格', '呈現統計資料的好方法。')
            ->headerGroup('說明', '<p>表格不應用來當作網頁架構，而是用來呈現資料，</p>
                                   <p>如果你想要用類似的架構設計網頁，請參考格線系統。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '表格具有不同的種類。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個最基本的表格。', 
           '<table class="ts table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>姓名</td>
                        <td>英文暱稱</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>卡莉絲</td>
                        <td>Caris</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>橙希</td>
                        <td>Orenji</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>吳雨藍</td>
                        <td>Aoi</td>
                    </tr>
                <tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">未到人數：3</th>
                    </tr>
                </tfoot>
            </table>', 'table')
            
            /**
             * 定義
             */
             
            ->single('定義', '表格中的第一個欄位都是該行的標題。', 
           '<table class="ts definition table">
                <thead>
                    <tr>
                        <th></th>
                        <th>參數</th>
                        <th>說明</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>header()</td>
                        <td>title[ <em>string</em>]</td>
                        <td>輸出網頁標頭。</td>
                    </tr>
                    <tr>
                        <td>footer()</td>
                        <td>path[ <em>string</em>], name[ <em>string</em> [ <em>optional</em>]]</td>
                        <td>於網頁最底部輸出內容，可同時儲存內容至一個檔案。</td>
                    </tr>
                <tbody>
            </table>', 'definition')
        
            ->groupEnd()
            ->groupStart('狀態', '表格中的欄位可以具有不同的狀態。')
        
            /**
             * 肯定和否定
             */
             
            ->single('肯定和否定', '欄位或一整行都可以具有肯定或否定的含義。', 
           '<table class="ts table">
                <thead>
                    <tr>
                        <td>名稱</td>
                        <td>英文名稱</td>
                        <td>計畫狀態</td>
                        <td>說明</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>可憐</td>
                        <td>Karen</td>
                        <td class="positive">
                            <i class="fa fa-check"></i> 已完成
                        </td>
                        <td>多國語元支援的函式庫，協助網站跨國交際。</td>
                    </tr>
                    <tr class="positive">
                        <td>美由紀</td>
                        <td>Miyuki</td>
                        <td>
                            <i class="fa fa-check"></i> 已完成
                        </td>
                        <td>協助圖像處理的類別，必須要安裝 Imagick。</td>
                    </tr>
                    <tr>
                        <td>卡莉絲</td>
                        <td>Caris</td>
                        <td class="negative">
                            <i class="fa fa-times"></i> 尚未完成
                        </td>
                        <td>一個基於 HTML5 的遊戲引擎。</td>
                    </tr>
                <tbody>
            </table>', 'positive, negative')
            
            /**
             * 錯誤
             */
             
            ->single('錯誤', '錯誤和否定一樣，只是樣式名稱不同，適合用在錯誤的地方。', 
           '<table class="ts table">
                <thead>
                    <tr>
                        <td>工作區域</td>
                        <td>目前狀態</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TeaMeow</td>
                        <td class="positive">
                            <i class="fa fa-check"></i> 已完成
                        </td>
                    </tr>
                    <tr class="error">
                        <td>Safari</td>
                        <td>
                            <i class="fa fa-times"></i> 已停止
                        </td>
                    </tr>
                    <tr>
                        <td>Isuka</td>
                        <td class="error">
                            <i class="fa fa-times"></i> 發生錯誤
                        </td>
                    </tr>
                <tbody>
            </table>', 'error')
            
            /**
             * 啟用中
             */
             
            ->single('啟用中', '顯示一行、欄位於啟用中，或是被選取的樣式。', 
           '<table class="ts table">
                <thead>
                    <tr>
                        <td>使用者名稱</td>
                        <td>電子郵件信箱</td>
                        <td>生日</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="active">
                        <td>yamiodymel</td>
                        <td>yamiodymel@yamiodymel.com</td>
                        <td>1998/07/13</td>
                    </tr>
                    <tr>
                        <td>mac0017817</td>
                        <td>mac0017817@mac0017817.com</td>
                        <td>1998/07/13</td>
                    </tr>
                    <tr>
                        <td class="active">shiroteacat</td>
                        <td>shiroteacat@shiroteacat.com</td>
                        <td>1998/07/13</td>
                    </tr>
                <tbody>
            </table>', 'active')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '顯示一行、欄位已停用。', 
           '<table class="ts table">
                <thead>
                    <tr>
                        <td>使用者名稱</td>
                        <td>電子郵件信箱</td>
                        <td>生日</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="disabled">
                        <td>yamiodymel</td>
                        <td>yamiodymel@yamiodymel.com</td>
                        <td>1998/07/13</td>
                    </tr>
                    <tr>
                        <td>mac0017817</td>
                        <td>mac0017817@mac0017817.com</td>
                        <td>1998/07/13</td>
                    </tr>
                    <tr>
                        <td class="disabled">shiroteacat</td>
                        <td>shiroteacat@shiroteacat.com</td>
                        <td>1998/07/13</td>
                    </tr>
                <tbody>
            </table>', 'disabled')
            
            ->groupEnd()
            ->groupStart('外觀', '表格可以透過額外的樣式來強化外觀。')
            
            /**
             * 條紋
             */
             
            ->single('條紋', '讓表格具有條紋感。', 
           '<table class="ts striped table">
                <thead>
                    <tr>
                        <td>檔案名稱</td>
                        <td>分類</td>
                        <td>說明</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>file.php</td>
                        <td>Controller</td>
                        <td>用來處理檔案相關程式。</td>
                    </tr>
                    <tr>
                        <td>star.php</td>
                        <td>Controller</td>
                        <td>處理星號程式。</td>
                    </tr>
                    <tr>
                        <td>favorite.php</td>
                        <td>Model</td>
                        <td>處理最愛的項目。</td>
                    </tr>
                    <tr>
                        <td>user.php</td>
                        <td>View</td>
                        <td>處理使用者頁面的模板視圖。</td>
                    </tr>
                    <tr>
                        <td>database.php</td>
                        <td>Model</td>
                        <td>和資料庫負責聯繫的模型。</td>
                    </tr>
                <tbody>
            </table>', 'striped')
            
            ->groupEnd()
            ->footer('elements/input.html');
?>