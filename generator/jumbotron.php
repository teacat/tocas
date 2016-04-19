<?php
require('generator.php');
$TocasUIDoc = new TocasUIDocumention();

$TocasUIDoc ->header('聚焦看板', '現在，是時候閃耀了。')
            ->headerGroup('說明', '<p>聚焦看板不應該被拿來當作擺放很多元素的容器，</p>
                                   <p>這應該只被拿來當作頁頭，用來當作擺放標題或少許元件的地方。</p>
                                   <p>&nbsp;</p>
                                   <p>&nbsp;</p>')
            ->groupStart('種類', '一個聚焦看板具有多個不同的種類。')
          
            /**
             * 聚焦看板
             */
             
            ->single('聚焦看板', '一個正常的聚焦看板。', 
           '<div class="ts jumbotron">
                <h2 class="ts header">
                    搜尋結果
                    <div class="sub header">總共有 325 個搜尋結果，費時 0.021 秒。</div>
                </h2>
                <br>
                <button class="ts info button">查看更多</button>
            </div>', 'jumbotron')
          
            /**
             * 基本語氣
             */
             
            ->single('基本語氣', '用來讓一個聚焦看板擁有不同的意思，但卻不帶有肯定或否定語氣。', 
           '<div class="ts primary jumbotron">
                <h2 class="ts header">
                    主要看板
                    <div class="sub header">用來告訴使用者一個主要的資訊。</div>
                </h2>
            </div>
            <div class="ts info jumbotron">
                <h2 class="ts header">
                    資訊看板
                    <div class="sub header">用於顯示一些資訊。</div>
                </h2>
            </div>
            <div class="ts warning jumbotron">
                <h2 class="ts header">
                    警告看板
                    <div class="sub header">警告一下使用者的看板。</div>
                </h2>
            </div>
            <div class="ts inverted jumbotron">
                <h2 class="ts header">
                    相反色看板
                    <div class="sub header">一個相反色的看板。</div>
                </h2>
            </div>', 'primary, warning, info, inverted')
            
            /**
           * 肯定和否定
           */
           
            ->single('肯定和否定', '讓聚焦看板帶有肯定或否定的意思。', 
           '<div class="ts positive jumbotron">
                <h2 class="ts header">
                    肯定看板
                    <div class="sub header">一個帶有正面消息的看板。</div>
                </h2>
            </div>
            <div class="ts negative jumbotron">
                <h2 class="ts header">
                    否定看板
                    <div class="sub header">帶有非正面消息的資訊看板。</div>
                </h2>
            </div>', 'positive, negative')
            
            /**
             * 全頁高度
             */
           
            ->single('全頁高度', '讓聚焦看板填滿整個螢幕。', 
           '<div class="ts full page jumbotron">
                <h1 class="ts header">
                    全螢幕聚焦看板
                    <div class="sub header">這真是太神奇了。</div>
                </h1>
            </div>', 'full page')
            
            /**
             * 基本
             */
             
            ->single('基本', '讓聚焦看板只帶有基本的架構。', 
           '<div class="ts basic jumbotron">
                <h3 class="ts header">
                    基本架構
                    <div class="sub header">一個僅有基本架構的聚焦看板。</div>
                </h3>
            </div>', 'basic')
            
            ->groupEnd()
            ->groupStart('狀態', '你可以隨時透過樣式類別切換一個聚焦看板的狀態。')
            
            /**
             * 已停用
             */
             
            ->single('已停用', '顯示這個看板已經被停用了。', 
           '<div class="ts disabled jumbotron">
                <h3 class="ts header">
                    別看這裡
                    <div class="sub header">我已經不重要了。</div>
                </h3>
            </div>', 'disabled')
            
            ->groupEnd()
            ->groupStart('外觀', '你可以更改聚焦看板的位置、大小、或者形狀。')
            
            /**
             * 尺寸
             */
             
            ->single('尺寸', '聚焦看板可以有不同的大小尺寸。', 
           '<div class="ts mini jumbotron">
                <h3 class="ts header">迷你</h3>
            </div>
            <div class="ts tiny jumbotron">
                <h3 class="ts header">微小</h3>
            </div>
            <div class="ts small jumbotron">
                <h3 class="ts header">小型</h3>
            </div>
            <div class="ts jumbotron">
                <h3 class="ts header">預設</h3>
            </div>
            <div class="ts medium jumbotron">
                <h3 class="ts header">適中</h3>
            </div>
            <div class="ts large jumbotron">
                <h3 class="ts header">大型</h3>
            </div>
            <div class="ts big jumbotron">
                <h3 class="ts header">巨大</h3>
            </div>
            <div class="ts huge jumbotron">
                <h3 class="ts header">超大</h3>
            </div>
            <div class="ts massive jumbotron">
                <h3 class="ts header">重量級</h3>
            </div>', 'mini, tiny, small, medium, large, big, huge, massive')
            
            /**
             * 漸層
             */
             
            ->single('漸層', '聚焦看板的背景可以成為漸層。', 
           '<div class="ts gradient info jumbotron">
                <h2 class="ts header">
                    漸層看板
                    <div class="sub header">這是一個帶有漸層的聚焦看板。</div>
                </h2>
            </div>
            <div class="ts gradient positive jumbotron">
                <h2 class="ts header">
                    我有漸層
                    <div class="sub header">漸層可以用在任何語意上的聚焦看板。</div>
                </h2>
            </div>
            <div class="ts gradient warning jumbotron">
                <h2 class="ts header">
                    我也是
                    <div class="sub header">而我也是帶有漸層的看板。</div>
                </h2>
            </div>', 'gradient')
            
            /**
             * 流動
             */
             
            ->single('流動', '讓看板保持最長寬度而且移除邊角。', 
           '<div class="ts fluid jumbotron">
                <h3 class="ts header">
                    流動看板
                    <div class="sub header">很適合用來填滿螢幕左右側。</div>
                </h3>
            </div>', 'fluid')
            
            /**
             * 抬舉
             */
             
            ->single('抬舉', '聚焦看板可以看起來像被抬舉，或是浮在空中。', 
           '<div class="ts raised jumbotron">
                <h3 class="ts header">
                    抬舉看板
                    <div class="sub header">我有更深重的陰影。</div>
                </h3>
            </div>', 'raised')
            
            ->groupEnd()
            ->footer('elements/jumbotron.html');
?>