<template>
    
    <div>
        <!-- 穹頂 -->
        <div class="ts fluid borderless pure basic big menu" style="margin-bottom: 0">
            <div class="ts very narrow container">
                <a href="#!" class="item">TeaMeow</a>
            </div>
        </div>
        <!-- / 穹頂 -->
        
        
        <!-- 聚焦看板 -->
        <div class="ts very padded horizontally fitted fluid jumbotron">
            <div class="ts very narrow container">
                
                <!-- 標題 -->
                <h1 class="ts header">
                    註冊會員
                    <div class="sub header">初次見面，歡迎加入 TeaMeow！</div>
                </h1>
                <!-- / 標題 -->
                
            </div>
        </div>
        <!-- / 聚焦看板 -->
        
        
        <!-- 主要容器 -->
        <div class="ts very narrow container">
            
            <br>
            
            <!-- 表單 -->
            <form class="ts relaxed form">
                
                <!-- 欄位群組 -->
                <div class="fields">
                    
                    <!-- 單個欄位 -->
                    <div class="basic success field">
                        <label>使用者帳號</label>
                        <input type="text" placeholder="">
                        <small>必須是英文字母或混搭數字，且最少 6 字，最多 24 字。</small>
                    </div>
                    <!-- / 單個欄位 -->
                    
                    
                    <!-- 單個欄位 -->
                    <div class="basic error field">
                        <label>暱稱</label>
                        <input type="text" placeholder="">
                        <small>替自己取一個獨一無二的暱稱，你可以在事後更改。</small>
                    </div>
                    <!-- / 單個欄位 -->
                    
                </div>
                <!-- / 欄位群組 -->
                
                
                <!-- 單個欄位 -->
                <div class="field">
                    <label>電子郵件地址</label>
                    <input type="text" placeholder="">
                </div>
                <!-- / 單個欄位 -->
                
                
                <!-- 單個欄位 -->
                <div class="field">
                    <label>密碼</label>
                    <input type="password" placeholder="">
                    <small>僅能是英文字母和數字，且最少 8 字，最多 80 字。</small>
                </div>
                <!-- /單個欄位 -->
                
                
                <!-- 欄位群組 -->
                <div class="fields">
                    
                    <!-- 單個欄位 -->
                    <div class="field">
                        <label>生日</label>
                        
                        <!-- 下拉式選單群組 -->
                        <div class="ts relaxed fluid separated dropdowns">
                            <select>
                                <option>1998</option>
                            </select>
                            <select>
                                <option>07</option>
                            </select>
                            <select>
                                <option>13</option>
                            </select>
                        </div>
                        <!-- / 下拉式選單群組 -->
                        
                        <small>我們會依照你的年齡決定你是否能看見敏感性內容。</small>
                    </div>
                    <!-- / 單個欄位 -->
                    
                    
                    <!-- 單個欄位 -->
                    <div class="field">
                        <label>性別</label>
                        
                        <!-- 單選方塊群組 -->
                        <div class="ts center aligned compact horizontal checkboxes">
                            <div class="ts radio checkbox">
                                <input type="radio" name="gender" id="genderMale" checked="checked">
                                <label for="genderMale">男性</label>
                            </div>
                            <div class="ts radio checkbox">
                                <input type="radio" name="gender" id="genderFemale">
                                <label for="genderFemale">女性</label>
                            </div>
                            <div class="ts radio checkbox">
                                <input type="radio" name="gender" id="genderThird">
                                <label for="genderThird">第三性</label>
                            </div>
                        </div>
                        <!-- / 單選方塊群組 -->
                        
                    </div>
                    <!-- / 單個欄位 -->
                    
                </div>
                <!-- / 欄位群組 -->
                
                
                <!-- 按鈕 -->
                <button class="ts fluid primary button" type="button">下一步</button>
                <!-- / 按鈕 -->
                
                
                <!-- 提示 -->
                <div class="ts center aligned mini basic fitted message">
                    按下「下一步」表示您也接受「伊繁星最高協議」、「個人隱私政策」、「使用者規範」。
                </div>
                <!-- / 提示 -->
                
            </form>
            <!-- / 表單 -->
            
        </div>
        <!-- / 主要容器 -->
   </div>
    
</template>

<script>

export default 
{
    beforeCreate()
    {
        document.title = '註冊範例 | Tocas UI'
    }
}
</script>