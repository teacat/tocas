import Vue     from 'vue'
import {sync}  from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import App     from './App.vue'
import router  from './router'
import store   from './store'
import zh_TW   from './locales/zh_TW.js'
import en_US   from './locales/en_US.js'

sync(store, router)

const app = new Vue
({
    router,
    store,
    ...App
})


Vue.use(VueI18n)
Vue.config.lang = 'zh_TW'

Vue.locale('zh_TW', zh_TW)
Vue.locale('en_US', en_US)

export {app, router, store}