import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router
({
    mode  : 'history',
    routes:
    [
        {
            path     : '/',
            component: require('../views/GettingStarted')
        },
        {
            path     : '/elements/button',
            component: require('../views/elements/Button')
        },
        {
            path     : '/elements/container',
            component: require('../views/elements/Container')
        },
        {
            path     : '/elements/divider',
            component: require('../views/elements/Divider')
        },
        {
            path     : '/elements/header',
            component: require('../views/elements/Header')
        },
        {
            path     : '/elements/icon',
            component: require('../views/elements/Icon')
        },
        {
            path     : '/elements/image',
            component: require('../views/elements/Image')
        },
        {
            path     : '/elements/input',
            component: require('../views/elements/Input')
        },
        {
            path     : '/elements/jumbotron',
            component: require('../views/elements/Jumbotron')
        },
        {
            path     : '/elements/label',
            component: require('../views/elements/Label')
        },
        {
            path     : '/elements/list',
            component: require('../views/elements/List')
        },
        {
            path     : '/elements/loader',
            component: require('../views/elements/Loader')
        },
        {
            path     : '/elements/quote',
            component: require('../views/elements/Quote')
        },
        {
            path     : '/elements/segment',
            component: require('../views/elements/Segment')
        },
        {
            path     : '/elements/step',
            component: require('../views/elements/Step')
        },
        {
            path     : '/elements/typography',
            component: require('../views/elements/Typography')
        },
        
        {
            path     : '/views/card',
            component: require('../views/views/Card')
        },
        {
            path     : '/views/chatroom',
            component: require('../views/views/Chatroom')
        },
        {
            path     : '/views/comment',
            component: require('../views/views/Comment')
        },
        {
            path     : '/views/feed',
            component: require('../views/views/Feed')
        },
        {
            path     : '/views/item',
            component: require('../views/views/Item')
        },
        {
            path     : '/views/statistic',
            component: require('../views/views/Statistic')
        },
        
        {
            path     : '/collections/breadcrumb',
            component: require('../views/collections/Breadcrumb')
        },
        {
            path     : '/collections/form',
            component: require('../views/collections/Form')
        },
        {
            path     : '/collections/grid',
            component: require('../views/collections/Grid')
        },
        {
            path     : '/collections/menu',
            component: require('../views/collections/Menu')
        },
        {
            path     : '/collections/message',
            component: require('../views/collections/Message')
        },
        {
            path     : '/collections/table',
            component: require('../views/collections/Table')
        },
        
        {
            path     : '/modules/accordion',
            component: require('../views/modules/Accordion')
        },
        {
            path     : '/modules/calendar',
            component: require('../views/modules/Calendar')
        },
        {
            path     : '/modules/checkbox',
            component: require('../views/modules/Checkbox')
        },
        {
            path     : '/modules/dimmer',
            component: require('../views/modules/Dimmer')
        },
        {
            path     : '/modules/dropdown',
            component: require('../views/modules/Dropdown')
        },
        {
            path     : '/modules/progress',
            component: require('../views/modules/Progress')
        },
    ]
})