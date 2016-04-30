<?php if ($title !== '') {  ?>
<h3 class="ts type header">
    <?= $title; ?>
    <br>
    <span class="sub header"><?= $description; ?></span>
</h3>
<?php } ?>
 
 
<div class="ts segments example">
    
    
    <!-- 預覽 -->
    <div class="ts clearing preview segment" <?= $empty ? 'style="display: none"' : ''; ?>>
        <?= $sourceCode; ?>
    </div>
    <!-- / 預覽 -->
    
    <!-- 原始碼 -->
    <pre class="ts secondary segment code" <?= $highlight ? "data-important-class='$highlight'" : '' ?>></pre>
    <!-- / 原始碼 -->
    
    <!-- JavaScript 原始碼 -->
    <?php if($jsCode) { ?>
    <pre class="ts tertiary segment js code">
        <code class="javascript">
            <?= $jsCode; ?>
        </code>
        
        <div class="ts bottom right attached label">Javascript</div>
    </pre>
    <!-- / JvaScript 原始碼 -->
    
    <!-- 執行按鈕 -->
    <button class="ts bottom attached fluid info button" onclick="<?= $jsCode; ?>">執行</button>
    <!-- / 執行按鈕 -->
    <?php } ?>
</div>