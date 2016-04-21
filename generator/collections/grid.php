<?php
if(!class_exists('TocasUIDocumention'))
    require('../generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('網格系統', '用以設計網頁架構，比科技部的表格還要好太多了。')
            ->headerGroup('說明', '<p>網格系統較 Bootstrap 不同，同時彈性也較大，功能也更多，</p>
                                   <p>但初次接觸可能會令人頭痛。</p>
                                   <p>&nbsp;</p>
                                   <p>網格系統<strong>共有 16 格</strong>，而不是 12 格，</p>
                                   <p>在<strong>預設情況下欄位皆沒有響應式功能</strong>，你需要自行手動增加，</p>
                                   <p>如果你嫌太麻煩，你也可以直接在網格系統上設定自動響應式。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('教學', '網格系統由多個欄位組成，而這些欄位可以有不同屬性。')
          
            /**
             * 基本
             */
             
            ->single('基本', '一個基本的網格系統。', 
           '<div class="ts grid">
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
            </div>', 'grid')
                            
            /**
             * 欄位
             */
             
            ->single('欄位', '我們稱被劃分開來的區塊為「欄位」，而每個欄位的寬度都是可以自己決定的。', 
           '<div class="ts grid">
                <div class="four wide column"></div>
                <div class="three wide column"></div>
                <div class="eight wide column"></div>
                <div class="one wide column"></div>
                <div class="two wide column"></div>
                <div class="three wide column"></div>
                <div class="four wide column"></div>
                <div class="five wide column"></div>
                <div class="two wide column"></div>
            </div>', 'column')
                            
            /**
             * 列
             */
             
            ->single('列', '「列」用來確保「欄位」<strong>不會因為超過十六格而自動換行</strong>。
                            <br>
                            同時，「列」也可以確保自己是獨立的一行。', 
           '<div class="ts grid">
                <div class="row">
                    <div class="three wide column"></div>
                    <div class="three wide column"></div>
                    <div class="three wide column"></div>
                    <div class="three wide column"></div>
                </div>
                <div class="two wide column"></div>
                <div class="five wide column"></div>
                <div class="nine wide column"></div>
                <div class="row">
                    <div class="sixteen wide column"></div>
                    <div class="sixteen wide column"></div>
                    <div class="sixteen wide column"></div>
                    <div class="sixteen wide column"></div>
                </div>
            </div>', 'row')
                            
            /**
             * 較寬鬆的網格
             */
             
            ->single('較寬鬆的網格', '當你發現欄位和欄位之間太相近，你可以考慮透過 <span class="ts label">relaxed grid</span> 來增加欄位之間的間距。', 
           '<div class="ts grid">
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
            </div>
            <div class="ts relaxed grid">
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
                    <div class="four wide column"></div>
            </div>', 'relaxed')
            
            ->groupEnd()
            ->groupStart('欄位', '網格系統中最重要的部分。')
            
            /**
             * 自動換行
             */
             
            ->single('自動換行', '一旦該行的欄位超過十六格（寬度），就會自動換到下一行。', 
           '<div class="ts grid">
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
            </div>', null)

            /**
             * 內容
             */
             
            ->single('內容', '欄位不應該被套用任何自訂的樣式，<strong>欄位只是一個容器</strong>，
                              <br>
                              你可以在裡面放入你要的元素和樣式，<strong>而不是直接在欄位上更改</strong>。', 
           '<div class="ts three column grid">
                <div class="column">
                    <div class="ts segment">
                    Moon,
                    </div>
                </div>
                <div class="column">
                    <div class="ts secondary segment">
                    dalan!
                    </div>
                </div>
                <div class="column">
                    <div class="ts tertiary segment">
                    Hello
                    </div>
                </div>
            </div>', null)
            
            /**
             * 寬度
             */
             
            ->single('寬度', '欄位的寬度由 <span class="ts label">* wide</span> 決定，
                              <br>
                              例如 <span class="ts label">one wide</span> 就是一格，<span class="ts label">sixteen wide</span> 則是十六格。', 
           '<div class="ts grid">
                <div class="one wide column"></div>
                <div class="fifteen wide column"></div>
                <div class="three wide column"></div>
                <div class="thirteen wide column"></div>
                <div class="six wide column"></div>
                <div class="ten wide column"></div>
                <div class="four wide column"></div>
                <div class="twelve wide column"></div>
                <div class="sixteen wide column"></div>
            </div>', 'one wide, fifteen wide, three wide, thirteen wide, six wide, ten wide, four wide, twelve wide, sixteen wide')
               
            ->groupEnd()
            ->groupStart('列', '「列」用來整合、包覆欄位，甚至可以再細分寬度。')
            
            /**
             * 寬度細分
             */
             
            ->single('寬度細分', '你可以在列裡面設定這個列應該要佔整體的幾格。', 
           '<div class="ts four column grid">
                <div class="two column row">
                    <div class="column"></div>
                </div>
                <div class="column"></div>
                <div class="column"></div>
                <div class="column"></div>
                <div class="column"></div>
            </div>', 'two column')
            
            /**
             * 浮動欄位
             */
             
            ->single('浮動欄位', '列裡面的欄位可以是浮動的。', 
           '<div class="ts four column grid">
                <div class="four column row">
                    <div class="left floated column"></div>
                    <div class="right floated column"></div>
                </div>
                <div class="column"></div>
                <div class="column"></div>
                <div class="column"></div>
                <div class="column"></div>
            </div>', 'left floated, right floated')
            
            ->groupEnd()
            ->groupStart('網格', '網格是最外層的容器，也可以在這裡設置一些樣式。')
            
            /**
             * 多重網格
             */
             
            ->single('多重網格', '網格系統內可以在包含數個網格。', 
           '<div class="ts two column grid">
                <div class="column">
                    <div class="ts four column grid">
                        <div class="column"></div>
                        <div class="column"></div>
                        <div class="column"></div>
                        <div class="column"></div>
                    </div>
                </div>
                <div class="column"></div>
            </div>', 'grid')
            
            /**
             * 置中
             */
             
            ->single('置中', '網格系統內的欄位可以從中間開始。', 
           '<div class="ts four column centered grid">
                <div class="column"></div>
                <div class="column"></div>
            </div>', 'centered')
            
            /**
             * 置中
             */
             
            ->single('內容對齊', '網格系統內的欄位內容可以對齊左右，
                                  <br>
                                  這個設定可以配置於<strong>整個網格系統</strong>、<strong>單列</strong>、甚至<strong>單個欄位</strong>。', 
           '<div class="ts four column right aligned grid">
                <div class="column">置右的文字</div>
                <div class="two column left aligned row">
                    <div class="column">置左的文字</div>
                    <div class="right aligned column">置右的文字</div>
                </div>
            </div>', 'left aligned, right aligned')
            
            ->groupEnd()
            ->groupStart('響應式網格', '響應式網格可以在行動裝置或小型螢幕上自動縮放，
                                        <br>
                                        你甚至只需要加一個樣式，其他讓我們來就好了。')
            
            /**
             * 自動層疊
             */
             
            ->single('自動層疊', '自動層疊會在手機上時自動將所有欄位縮成一排。', 
           '<div class="ts stackable grid">
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
                <div class="four wide column"></div>
            </div>', 'stackable')
            
            /**
             * 倍數層疊
             */
            /* 
            ->single('倍數層疊', '倍數層疊會在裝置越小的時候讓欄位格數以倍數成長。', 
           '<div class="ts grid">
                <div class="doubling eight column row">
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
                <div class="doubling four column row">
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
                <div class="doubling six column row">
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
                <div class="doubling two column row">
                    <div class="column"></div>
                    <div class="column"></div>
                </div>
            </div>', 'doubling')*/
            
            /**
             * 手動調整
             */
             
            ->single('手動調整', '你可以自訂在不同裝置上欄位所佔的格數，你總共有這些裝置可供選擇：
                                  <br>
                                  <span class="ts label">mobile</span> 手機（橫、縱）
                                  <br>
                                  <span class="ts label">tablet</span> 平板（橫、縱）
                                  <br>
                                  <span class="ts label">computer</span> 電腦、筆記型電腦（橫、縱）
                                  <br>
                                  <span class="ts label">large screen</span> 大型螢幕、家用電腦
                                  <br>
                                  接下來透過 <span class="ts label">[<em>格數</em>] wide [<em>裝置</em>]</span> 使用這些裝置，就像 <span class="ts label">one wide computer</span> 即是在筆電上成為一格。
                                  <br>
                                  一個更進階的用法像這樣： <span class="ts label">five wide large screen one wide computer six wide tablet eight wide mobile column</span>
                                  <br>
                                  這意思代表：在大型螢幕上五格、一格在筆記型電腦、六格在平板、八格在行動裝置。請切記加入結尾的 <span class="ts label">column</span>。', 
           '<div class="ts grid">
                <div class="eight wide computer four wide mobile column"></div>
                <div class="eight wide computer four wide mobile column"></div>
                <div class="eight wide computer four wide mobile column"></div>
                <div class="eight wide computer four wide mobile column"></div>
                <div class="four wide computer eight wide mobile column"></div>
                <div class="four wide computer eight wide mobile column"></div>
                <div class="four wide computer eight wide mobile column"></div>
                <div class="four wide computer eight wide mobile column"></div>
            </div>', 'computer, mobile, large screen, tablet')
            
            /**
             * 手動隱藏
             */
             
            ->single('手動隱藏', '你可以透過 <span class="ts label">[<em>裝置</em>] only</span> 在不同裝置上隱藏特定列、欄位。', 
           '<div class="ts grid">
                <div class="eight wide computer only column"></div>
                <div class="eight wide computer only column"></div>
                <div class="four wide mobile only column"></div>
                <div class="four wide mobile only column"></div>
                <div class="four wide mobile only column"></div>
                <div class="four wide mobile only column"></div>
                <div class="large screen only row">
                    <div class="six wide column"></div>
                    <div class="six wide column"></div>
                    <div class="four wide column"></div>
                </div>
                <div class="eight wide tablet only eight wide mobile only column"></div>
                <div class="eight wide tablet only eight wide mobile only column"></div>
            </div>', 'computer only, mobile only, large screen only, tablet only')
                            
            ->groupEnd()
            ->footer('collections/grid.html');
?>