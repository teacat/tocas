import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['../views/Index'], resolve)
const GettingStarted = resolve => require(['../views/GettingStarted'], resolve)
const Examples = resolve => require(['../views/Examples'], resolve)
const ExampleBlog = resolve => require(['../views/examples/Blog'], resolve)
const ExampleLogin = resolve => require(['../views/examples/Login'], resolve)
const ExampleRegistration = resolve => require(['../views/examples/Registration'], resolve)
const ExampleGallery = resolve => require(['../views/examples/Gallery'], resolve)
const ExampleChatroom = resolve => require(['../views/examples/Chatroom'], resolve)
const ExampleNotes = resolve => require(['../views/examples/Notes'], resolve)
const About = resolve => require(['../views/About'], resolve)
const Elements = resolve => require(['../views/Elements'], resolve)
const Collections = resolve => require(['../views/Collections'], resolve)
const Views = resolve => require(['../views/Views'], resolve)
const Modules = resolve => require(['../views/Modules'], resolve)
const Button = resolve => require(['../views/elements/Button'], resolve)
const Container = resolve => require(['../views/elements/Container'], resolve)
const Divider = resolve => require(['../views/elements/Divider'], resolve)
const Header = resolve => require(['../views/elements/Header'], resolve)
const Icon = resolve => require(['../views/elements/Icon'], resolve)
const Image = resolve => require(['../views/elements/Image'], resolve)
const Input = resolve => require(['../views/elements/Input'], resolve)
const Jumbotron = resolve => require(['../views/elements/Jumbotron'], resolve)
const Slate = resolve => require(['../views/elements/Slate'], resolve)
const List = resolve => require(['../views/elements/List'], resolve)
const Label = resolve => require(['../views/elements/Label'], resolve)
const Loader = resolve => require(['../views/elements/Loader'], resolve)
const Quote = resolve => require(['../views/elements/Quote'], resolve)
const Segment = resolve => require(['../views/elements/Segment'], resolve)
const Step = resolve => require(['../views/elements/Step'], resolve)
const Typography = resolve => require(['../views/elements/Typography'], resolve)
const Card = resolve => require(['../views/views/Card'], resolve)
const Chatroom = resolve => require(['../views/views/Chatroom'], resolve)
const Comment = resolve => require(['../views/views/Comment'], resolve)
const Feed = resolve => require(['../views/views/Feed'], resolve)
const Item = resolve => require(['../views/views/Item'], resolve)
const Statistic = resolve => require(['../views/views/Statistic'], resolve)
const Breadcrumb = resolve => require(['../views/collections/Breadcrumb'], resolve)
const Form = resolve => require(['../views/collections/Form'], resolve)
const Grid = resolve => require(['../views/collections/Grid'], resolve)
const Menu = resolve => require(['../views/collections/Menu'], resolve)
const Message = resolve => require(['../views/collections/Message'], resolve)
const Table = resolve => require(['../views/collections/Table'], resolve)
const Accordion = resolve => require(['../views/modules/Accordion'], resolve)
const Calendar = resolve => require(['../views/modules/Calendar'], resolve)
const Checkbox = resolve => require(['../views/modules/Checkbox'], resolve)
const Dimmer = resolve => require(['../views/modules/Dimmer'], resolve)
const Dropdown = resolve => require(['../views/modules/Dropdown'], resolve)
const Progress = resolve => require(['../views/modules/Progress'], resolve)
const Slider = resolve => require(['../views/modules/Slider'], resolve)
const Popup = resolve => require(['../views/modules/Popup'], resolve)
const Modal = resolve => require(['../views/modules/Modal'], resolve)
const RWD = resolve => require(['../views/RWD'], resolve)
Vue.use(Router)

export default new Router
({
    mode  : 'history',
    routes:
    [
        {
            path     : '/',
            component: Index
        },
        {
            path     : '/getting-started/',
            component: GettingStarted
        },
        {
            path     : '/examples/',
            component: Examples
        },
        {
            path     : '/examples/blog',
            component: ExampleBlog
        },
        {
            path     : '/examples/login',
            component: ExampleLogin
        },
        {
            path     : '/examples/registration',
            component: ExampleRegistration
        },
        {
            path     : '/examples/gallery',
            component: ExampleGallery
        },
        {
            path     : '/examples/chatroom',
            component: ExampleChatroom
        },
        {
            path     : '/examples/notes',
            component: ExampleNotes
        },
        {
            path     : '/about/',
            component: About
        },
        {
            path     : '/elements/',
            component: Elements
        },
        {
            path     : '/collections/',
            component: Collections
        },
        {
            path     : '/modules/',
            component: Modules
        },
        {
            path     : '/views/',
            component: Views
        },
        {
            path     : '/elements/button',
            component: Button
        },
        {
            path     : '/elements/container',
            component: Container
        },
        {
            path     : '/elements/divider',
            component: Divider
        },
        {
            path     : '/elements/header',
            component: Header
        },
        {
            path     : '/elements/icon',
            component: Icon
        },
        {
            path     : '/elements/image',
            component: Image
        },
        {
            path     : '/elements/input',
            component: Input
        },
        {
            path     : '/elements/jumbotron',
            component: Jumbotron
        },
        {
            path     : '/elements/slate',
            component: Slate
        },
        {
            path     : '/elements/label',
            component: Label
        },
        {
            path     : '/elements/list',
            component: List
        },
        {
            path     : '/elements/loader',
            component: Loader
        },
        {
            path     : '/elements/quote',
            component: Quote
        },
        {
            path     : '/elements/segment',
            component: Segment
        },
        {
            path     : '/elements/step',
            component: Step
        },
        {
            path     : '/elements/typography',
            component: Typography
        },

        {
            path     : '/views/card',
            component: Card
        },
        {
            path     : '/views/chatroom',
            component: Chatroom
        },
        {
            path     : '/views/comment',
            component: Comment
        },
        {
            path     : '/views/feed',
            component: Feed
        },
        {
            path     : '/views/item',
            component: Item
        },
        {
            path     : '/views/statistic',
            component: Statistic
        },

        {
            path     : '/collections/breadcrumb',
            component: Breadcrumb
        },
        {
            path     : '/collections/form',
            component: Form
        },
        {
            path     : '/collections/grid',
            component: Grid
        },
        {
            path     : '/collections/menu',
            component: Menu
        },
        {
            path     : '/collections/message',
            component: Message
        },
        {
            path     : '/collections/table',
            component: Table
        },
        
        {
            path     : '/modules/accordion',
            component: Accordion
        },
        {
            path     : '/modules/calendar',
            component: Calendar
        },
        {
            path     : '/modules/checkbox',
            component: Checkbox
        },
        {
            path     : '/modules/dimmer',
            component: Dimmer
        },
        {
            path     : '/modules/dropdown',
            component: Dropdown
        },
        {
            path     : '/modules/progress',
            component: Progress
        },
        {
            path     : '/modules/slider',
            component: Slider
        },
        {
            path     : '/modules/popup',
            component: Popup
        },
        {
            path     : '/modules/modal',
            component: Modal
        },
        {
            path     : '/rwd/',
            component: RWD
        },
        {
            path    : '*',
            redirect: '/'
        }
    ]
})