<template>
    
    <div>
        <!-- 穹頂 -->
        <nav class="ts pure inverted info large flatted borderless fluid basic menu">
            <div class="ts very narrow container">
                <div class="header item">
                    聊天室
                </div>
                <a href="#!" class="item">
                    大廳
                </a>
                <a href="#!" class="item">
                    好友清單
                </a>
                <div class="right menu">
                    <a href="#!" class="item">
                        yamiodymel
                    </a>
                </div>
            </div>
        </nav>
        <!-- / 穹頂 -->
        
        <br>
        
        <!-- 主要容器 -->
        <div class="ts very narrow container grid">
            
            <!-- 左側聊天欄位 -->
            <div class="twelve wide column">
                
                <!-- 可捲動式片段 -->
                <div class="ts  segment" style="height: 250px; overflow: scroll">
                    
                    <!-- 聊天室元件 -->
                    <div class="ts chatroom">
                        <div class="content">
                            
                            <!-- 單個訊息 -->
                            <div class="right message">
                                <div class="author">
                                    yamiodymel
                                </div>
                                <div class="avatar">
                                    <img src="../images/image_placeholder_user.png">
                                </div>
                                <div class="content">
                                    <div class="text">
                                        早安！！！！
                                    </div>
                                    
                                    <div class="bulleted meta">
                                        <div class="item">12:33 PM</div>
                                    </div>
                                </div>
                            </div>
                            <!-- / 單個訊息 -->
                            
                            
                            <!-- 單個訊息 -->
                            <div class="left message">
                                <div class="author">
                                    karisu
                                </div>
                                <div class="avatar">
                                    <img src="../images/image_placeholder_user2.png">
                                </div>
                                <div class="content">
                                    <div class="text">
                                        嗨
                                    </div>
                                    
                                    <div class="bulleted meta">
                                        <div class="item">12:33 PM</div>
                                    </div>
                                </div>
                            </div>
                            <!-- / 單個訊息 -->
                            
                            
                            <!-- 單個訊息 -->
                            <div class="left message">
                                <div class="author">
                                    aoiCera
                                </div>
                                <div class="avatar">
                                    <img src="../images/image_placeholder_user3.png">
                                </div>
                                <div class="content">
                                    <div class="text">
                                        囉哈
                                    </div>
                                    
                                    <div class="bulleted meta">
                                        <div class="item">12:33 PM</div>
                                    </div>
                                </div>
                            </div>
                            <!-- / 單個訊息 -->
                            
                        </div>
                    </div>
                    <!-- / 聊天室元件 -->
                    
                    <br>
                    <br>
                    
                </div>
                <!-- / 可捲動式片段 -->
                
            </div>
            <!-- / 左側聊天欄位 -->
            
            
            <!-- 右側線上清單 -->
            <div class="four wide column">
                
                <!-- 片段群組 -->
                <div class="ts segments">
                    
                    <!-- 上部片段 -->
                    <div class="ts secondary segment">
                        <h4 class="ts header">
                            在線清單
                            <div class="smaller sub header">6 個人在線・最高 31 人</div>
                        </h4>
                    </div>
                    <!-- / 上部片段 -->
                    
                    
                    <!-- 下部片段 -->
                    <div class="ts secondary segment" style="height: 178px;">
                        
                        <!-- 會員清單 -->
                        <div class="ts link list">
                            <a href="#" class="item">yamiodymel</a>
                            <a href="#" class="item">aoiCera</a>
                            <a href="#" class="item">Orenji_Nozomi</a>
                            <a href="#" class="item">羽田白音</a>
                            <a href="#" class="item">hpcslag</a>
                            <a href="#" class="item">karisu</a>
                        </div>
                        <!-- / 會員清單 -->
                        
                    </div>
                    <!-- / 下部片段 -->
                    
                </div>
                <!-- / 片段群組 -->
                
            </div>
            <!-- / 右側線上清單 -->
            
            
            <!-- 底部主要區塊 -->
            <div class="sixteen wide column">
                
                <!-- 資訊網格系統 -->
                <div class="ts two column grid">
                    <div class="column">
                        目前身份：<strong>yamiodymel</strong>
                    </div>
                    <div class="right aligned column">
                        <div class="ts toggle checkbox">
                            <input type="checkbox" id="afk">
                            <label for="afk">暫離</label>
                        </div>
                    </div>
                </div>
                <!-- / 資訊網格系統 -->
                
                <br>
                
                <!-- 訊息輸入欄位 -->
                <div class="ts resizable fluid input">
                    <textarea></textarea>
                </div>
                <!-- / 訊息輸入欄位 -->
                
                <br>
                <br>
                
                <!-- 按鈕 -->
                <button class="ts small right floated primary button">送出</button>
                <button class="ts small right floated negative button" style="margin-right: 8px">退出聊天室</button>
                <!-- / 按鈕 -->
                
            </div>
            <!-- / 底部主要區塊 -->
            
        </div>
        <!-- / 主要容器 -->
   </div>
    
</template>

<script>

export default 
{
    beforeCreate()
    {
        document.title = '相簿範例 | Tocas UI'
    }
}
</script>