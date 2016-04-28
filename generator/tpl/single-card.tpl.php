<div class="column">
    <a class="ts fluid centered card" href="<?= $link; ?>">
        <div class="content">
            <div class="header"><?= $title; ?> <?= isset($wip) ? '<span class="ts tiny warning label">未完成</span>' : ''; ?></div>
            <div class="meta">
                <span><?= $class; ?></span>
            </div>
            <div class="description">
                <p><?= $description; ?></p>
            </div>
        </div>
    </a>
</div>