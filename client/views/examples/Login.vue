<template>
    
    <div>
        <!-- 登入容器 -->
        <div class="ts narrow container">
            
            <br>
            <br>
            
            <!-- 抬頭 -->
            <h1 class="ts center aligned header">
                歡迎回來
                <div class="sub header">很高興能夠再次見到你</div>
            </h1>
            <!-- / 抬頭 -->
            
            
            <!-- 主要片段 -->
            <div class="ts centered segment" style="max-width: 300px">
                
                <!-- 表單 -->
                <form class="ts form">
                
                    <!-- 單個欄位 -->
                    <div class="field">
                        <label>帳號</label>
                        <input type="text" placeholder="">
                    </div>
                    <!-- / 單個欄位 -->
                    
                    
                    <!-- 單個欄位 -->
                    <div class="field">
                        <label>密碼</label>
                        <input type="password" placeholder="">
                    </div>
                    <!-- / 單個欄位 -->
                    
                    
                    <!-- 登入按鈕 -->
                    <button class="ts positive fluid button" type="button">登入</button>
                    <!-- / 登入按鈕 -->
                    
                </form>
                <!-- / 表單 -->
                
            </div>
            <!-- / 主要片段 -->
            
        </div>
        <!-- /登入容器 -->
   </div>
    
</template>

<script>

export default 
{
    beforeCreate()
    {
        document.title = '登入範例 | Tocas UI'
    }
}
</script>