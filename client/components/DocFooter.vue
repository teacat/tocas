<template>
    <footer class="ts very padded horizontally fitted fluid secondary segment">
        <div class="ts narrow container">
            <ul class="ts relaxed link list">
                <li>
                    <a class="to top" href="#!" @click="toTop()">
                        <i class="arrow up icon"></i> 回到頂部
                    </a>
                </li>
                <li>
                    <a href="//github.com/TeaMeow/TocasUI/">Github</a>
                </li>
                <li>
                    <router-link to="/examples/">實際範例</router-link>
                </li>
                <li>
                    <router-link to="/about/">關於</router-link>
                </li>
            </ul>
            <p>
                由 <a href="http://www.facebook.com/yamiodymel">Yami Odymel</a> 所設計，
                還有<a href="https://github.com/TeaMeow/TocasUI/graphs/contributors">貢獻者們</a>的愛心 ❤️。
                原始碼授權方式為 <a href="https://github.com/TeaMeow/TocasUI/blob/master/LICENSE">MIT</a>，
                文件則為 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh_TW">CC BY 4.0</a>，
                還請盡情地使用和分享，或者是一同改進 :)
            </p>
            <p class="render time">
                本頁渲染速度：{{this.$store.state.renderTime}} ms
            </p>
        </div>
    </footer>
</template>

<style lang="sass" scoped>
.segment
{
    margin-top: 3em !important;
}
ul.ts.list li:before
{
    display: none;
}
.ts.link.list
{
    margin: 0;
    list-style-type: none !important;
    
    li
    {
        display: inline-block;
        
        a
        {
            color: #666;
            margin-right: 1.5em;
            
            &:hover
            {
                color: #333;
            }
        }
    }
    
    .to.top
    {
        opacity: 0.7;
    }
}

p
{
    margin-top: 1.5em;
    font-size: 13px;
    color: #a0a0a0;
    
    a
    {
        color: #598ab9;
        
        &:hover
        {
            color: #3b5d7d;
        }
    }
}

.render.time
{
    margin-top: 3em;
    opacity   : 0.6;
}
</style>

<script>
export default
{
    name   : 'DocFooter',
    methods:
    {
        toTop()
        {
            window.scrollTo(0, 0);
        }
    }
}
</script>