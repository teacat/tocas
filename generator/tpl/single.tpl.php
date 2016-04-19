<h3 class="ts type header">
    <?= $title; ?>
    <br>
    <span class="sub header"><?= $description; ?></span>
</h3>
 
 
<div class="ts segments example">
    
    <!-- 預覽 -->
    <div class="ts clearing preview segment">
        <?= $sourceCode; ?>
    </div>
    <!-- / 預覽 -->
    
    <!-- 原始碼 -->
    <pre class="ts secondary segment code" data-important-class="<?= $highlight; ?>"></pre>
    <!-- / 原始碼 -->
    
</div>