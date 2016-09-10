<template>
    <nav class="ts large fluid borderless pure basic menu">
        <div class="ts narrow container">
            <router-link class="item" to="/">Tocas UI</router-link>
            <router-link class="item" to="/getting-started/">從這開始</router-link>
            <router-link class="item" to="/elements/">一般元素</router-link>
            <router-link class="item" to="/collections/">聚合型</router-link>
            <router-link class="item" to="/modules/">模塊</router-link>
            <router-link class="item" to="/views/">視圖型</router-link>
            <div class="right menu">
                <a class="item" href="https://patreon.com/yamiodymel">贊助</a>
                <a class="item" href="https://github.com/TeaMeow/TocasUI/">Github</a>
            </div>
        </div>
    </nav>
</template>

<script>
export default
{
    name: 'DocNav'
}
</script>