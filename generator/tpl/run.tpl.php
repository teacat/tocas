<?php if ($title !== '') {  ?>
<h3 class="ts type header">
    <?= $title; ?>
    <br>
    <span class="sub header"><?= $description; ?></span>
</h3>
<?php } ?>
 
 
<div class="ts segments example">
    
    <!-- 預覽 -->
    <div class="ts clearing preview segment">
        
    </div>
    <!-- / 預覽 -->
    
    <!-- 原始碼 -->
    <pre class="ts secondary segment code"><?= $sourceCode; ?></pre>
    <!-- / 原始碼 -->
    
    <!-- 執行按鈕 -->
    <button class="ts bottom attached fluid info button">執行</button>
    <!-- / 執行按鈕 -->
    
</div>