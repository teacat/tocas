<template>
    <nav class="ts horizontally scrollable large fluid borderless pure basic menu">
        <div class="ts narrow container">
            <router-link class="item" to="/">Tocas UI</router-link>
            <router-link class="item" to="/getting-started/">{{ $t('nav.getting_started') }}</router-link>
            <router-link class="item" to="/elements/">{{ $t('nav.elements') }}</router-link>
            <router-link class="item" to="/collections/">{{ $t('nav.collections') }}</router-link>
            <router-link class="item" to="/modules/">{{ $t('nav.modules') }}</router-link>
            <router-link class="item" to="/views/">{{ $t('nav.views') }}</router-link>
            <!--<router-link class="item" to="/animation/">{{ $t('nav.animation') }}</router-link>-->
            <router-link class="item" to="/rwd/">{{ $t('nav.rwd') }}</router-link>
            <div class="right menu">
                <!--<a class="item" href="#!" @click="changeLang">{{ language }}</a>-->
                <a class="item" href="//patreon.com/yamiodymel">{{ $t('nav.donate') }}</a>
                <a class="item" href="//github.com/TeaMeow/TocasUI/">Github</a>
            </div>
        </div>
    </nav>
</template>

<script>
import Vue from 'vue'

export default
{
    name: 'DocNav',
    data(){
        return {
            language: "English"
        }
    },
    methods:
    {
        changeLang() {
            if (this.language === "English") {
                this.language = "正體中文"
                Vue.config.lang = 'en_US'
            } else {
                this.language = "English"
                Vue.config.lang = 'zh_TW'
            }
        }
    }
}
</script>