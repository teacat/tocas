<template>
    <footer class="ts very padded horizontally fitted fluid secondary segment">
        <div class="ts narrow container">
            <ul class="ts relaxed link list">
                <li>
                    <a class="to top" href="#!" @click="toTop()">
                        <i class="arrow up icon"></i> {{ $t('footer.to_top') }}
                    </a>
                </li>
                <li>
                    <a href="//github.com/TeaMeow/TocasUI/">GitHub</a>
                </li>
                <li>
                    <router-link to="/examples/">{{ $t('footer.examples') }}</router-link>
                </li>
                <li>
                    <router-link to="/about/">{{ $t('footer.about') }}</router-link>
                </li>
            </ul>
            <p v-html="$t('footer.copyright')">
                
            </p>
            <p class="render time">
                {{ $t('footer.render') }}{{this.$store.state.renderTime}} ms
            </p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
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
