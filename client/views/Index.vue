<template>
    <main>
        <doc-nav class="homepage"></doc-nav>

        <!-- 聚焦看板 -->
        <header class="ts fluid horizontally fitted extra padded jumbotron">
            <div class="ts center aligned narrow container">
                <h1 class="ts center aligned header">
                    Tocas UI 2
                    <br>
                    <small class="sub header">{{ $t('homepage.slogan') }}</small>
                </h1>
                <br>
                <br>
                <br>
                <p>{{ $t('homepage.try_now') }}</p>
                <div class="ts three column stackable grid">
                    <div class="column"></div>
                    <div class="column">
                        <div class="ts fluid input">
                            <input type="text" onClick="this.setSelectionRange(0, this.value.length)" value='<link rel="stylesheet" href="//cdn.rawgit.com/TeaMeow/TocasUI/master/dist/tocas.min.css">'>
                        </div>
                    </div>
                    <div class="column"></div>
                </div>
            </div>
        </header>
        <!-- / 聚焦看板 -->


        <!-- 開場白 -->
        <section id="openWhiteDesu">

            <div class="ts narrow container relaxed stackable grid">

                <!-- 左側說明 -->
                <div class="eight wide column">
                    <h2 class="ts header">{{ $t('homepage.meaningful') }}</h2>
                    <p>{{ $t('homepage.meaningful_desc1') }}</p>
                    <p>{{ $t('homepage.meaningful_desc2') }}</p>
                    <p>{{ $t('homepage.meaningful_desc3') }}</p>
                    <p>&nbsp;</p>
                </div>
                <!-- / 左側說明 -->


                <!-- 右側示範 -->
                <div class="eight wide column">
                    <h3 class="ts header">HTML</h3>
                    <pre class="ts padded segment"><code class="hljs">&lt;div class=&quot;ts fluid buttons&quot;&gt;
    &lt;button class=&quot;ts button&quot;&gt;{{ $t('homepage.caris') }}&lt;/button&gt;
    &lt;button class=&quot;ts button&quot;&gt;{{ $t('homepage.avane') }}&lt;/button&gt;
    &lt;button class=&quot;ts warning button&quot;&gt;{{ $t('homepage.orenji') }}&lt;/button&gt;
&lt;/div&gt;</code></pre>
                    <div class="ts fluid buttons">
                        <button class="ts button">{{ $t('homepage.caris') }}</button>
                        <button class="ts button">{{ $t('homepage.avane') }}</button>
                        <button class="ts warning button">{{ $t('homepage.orenji') }}</button>
                    </div>
                </div>
                <!-- / 右側示範 -->


                <!-- 分割線欄位 -->
                <div class="sixteen wide column">
                    <div class="ts section divider"></div>
                </div>
                <!-- / 分割線欄位 -->


                <!-- 左側說明 -->
                <div class="sixteen wide column">
                    <h2 class="ts header">{{ $t('homepage.structful') }}</h2>
                    <p>{{ $t('homepage.structful_desc1') }}</p>
                    <p>{{ $t('homepage.structful_desc2') }}</p>
                    <p>{{ $t('homepage.structful_desc3') }}</p>
                    <p>&nbsp;</p>
                </div>
                <!-- / 左側說明 -->


                <!-- 左側示範 -->
                <div class="eight wide column">
                    <h3 class="ts header">Tocas UI</h3>
                    <pre class="ts padded segment"><code class="hljs">&lt;nav class=&quot;ts menu&quot;&gt;
    &lt;a class=&quot;header item&quot;&gt;{{ $t('homepage.nav_example1') }}&lt;/a&gt;
    &lt;a class=&quot;active item&quot;&gt;{{ $t('homepage.nav_example2') }}&lt;/a&gt;
    &lt;a class=&quot;item&quot;&gt;{{ $t('homepage.nav_example3') }}&lt;/a&gt;
    &lt;a class=&quot;item&quot;&gt;{{ $t('homepage.nav_example4') }}&lt;/a&gt;
    &lt;a class=&quot;item&quot;&gt;{{ $t('homepage.nav_example5') }}&lt;/a&gt;
&lt;/nav&gt;</code></pre>
                    <p>&nbsp;</p>
                </div>
                <!-- / 左側示範 -->


                <!-- 右側示範 -->
                <div class="eight wide column">
                    <h3 class="ts header">Bootstrap v4</h3>
                    <pre class="ts padded segment"><code class="hljs">&lt;nav class=&quot;navbar navbar-light bg-faded&quot;&gt;
    &lt;a class=&quot;navbar-brand&quot;&gt;{{ $t('homepage.nav_example1') }}&lt;/a&gt;
    &lt;ul class=&quot;nav navbar-nav&quot;&gt;
        &lt;li class=&quot;nav-item active&quot;&gt;
            &lt;a class=&quot;nav-link&quot;&gt;{{ $t('homepage.nav_example2') }}&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link&quot;&gt;{{ $t('homepage.nav_example3') }}&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link&quot;&gt;{{ $t('homepage.nav_example4') }}&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a class=&quot;nav-link&quot;&gt;{{ $t('homepage.nav_example5') }}&lt;/a&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;</code></pre>
                </div>
                <!-- / 右側示範 -->

            </div>

        </section>
        <!-- / 開場白 -->


        <!-- 展示元件 -->
        <section id="components">

            <!-- 展示網格 -->
            <div class="ts narrow container relaxed stackable grid">

                <div class="sixteen wide column">

                    <!-- 區塊標題 -->
                    <h2 class="ts center aligned icon header">
                        <i class="gift icon" style="font-size: 128px"></i>
                        {{ $t('homepage.mixed') }}
                        <small class="sub header">
                            {{ $t('homepage.mixed_desc1') }}
                        </small>
                    </h2>
                    <!-- / 區塊標題 -->

                </div>

                <!-- 左側展示欄位 -->
                <div class="four wide column">

                    <!-- 圖片卡片 -->
                    <h4 class="ts header">{{ $t('homepage.image_card') }}</h4>
                    <div class="ts card">
                        <div class="image">
                            <img src="./images/image_placeholder_4-3.png">
                        </div>
                        <div class="content">
                            <div class="header">{{ $t('homepage.image_card_header') }}</div>
                            <div class="meta">
                                <a href="#!">{{ $t('homepage.image_card_meta') }}</a>
                            </div>
                        </div>
                    </div>
                    <!-- / 圖片卡片 -->


                    <!-- 垂直選單 -->
                    <h4 class="ts header">{{ $t('homepage.vertical_menu') }}</h4>
                    <div class="ts vertical inverted positive menu">
                        <a class="item">
                            <i class="picture icon"></i> {{ $t('homepage.vertical_menu_picture') }}
                        </a>
                        <a class="item">
                            <i class="users icon"></i> {{ $t('homepage.vertical_menu_group') }}
                        </a>
                        <a class="item">
                            <i class="star icon"></i> {{ $t('homepage.vertical_menu_favorite') }}
                        </a>
                    </div>
                    <!-- / 垂直選單 -->


                    <!-- 標籤 -->
                    <h4 class="ts header">{{ $t('homepage.label') }}</h4>
                    <div class="ts label">
                        <i class="gift icon"></i>
                        {{ $t('homepage.label') }}
                    </div>
                    <div class="ts image label">
                        <img src="./images/image_placeholder_user.png">Yami Odymel</div>
                    <div class="ts image label">
                        <img src="./images/image_placeholder_user2.png">Xiaoan</div>
                    <div class="ts image label">
                        <img src="./images/image_placeholder_user3.png">{{ $t('homepage.caris') }}
                        <div class="detail">{{ $t('homepage.label_gamer') }}</div>
                    </div>
                    <div class="ts circular primary label">9</div>
                    <div class="ts circular info label">14</div>
                    <div class="ts warning label">7</div>
                    <div class="ts positive label">13</div>
                    <!-- / 標籤 -->

                </div>
                <!-- / 左側展示欄位 -->


                <!-- 中間展示欄位 -->
                <div class="eight wide column">

                    <!-- 文章卡片 -->
                    <h4 class="ts header">{{ $t('homepage.text_card') }}</h4>
                    <div class="ts card">
                        <div class="content">
                            <div class="header">
                                Yami Odymel
                            </div>
                            <div class="middoted meta">
                                <div>@yamiodymel</div>
                                <div>2 mins     </div>
                            </div>
                            <div class="description">
                                <p>{{ $t('homepage.text_card_desc1') }}</p>
                                <p>{{ $t('homepage.text_card_desc2') }}</p>
                                <p>{{ $t('homepage.text_card_desc3') }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- / 文章卡片 -->


                    <!-- 圖案選單 -->
                    <h4 class="ts header">{{ $t('homepage.icon_menu') }}</h4>
                    <div class="ts icon inverted info borderless menu">
                        <a class="item">
                            <i class="bell icon"></i>
                        </a>
                        <a class="item">
                            <i class="music icon"></i>
                        </a>
                        <a class="item">
                            <i class="search icon"></i>
                        </a>
                    </div>
                    <!-- / 圖案選單 -->


                    <!-- 按鈕群組 -->
                    <h4 class="ts header">{{ $t('homepage.button_group') }}</h4>
                    <div class="ts fluid buttons">
                        <button class="ts button">{{ $t('homepage.button') }}</button>
                        <button class="ts warning button">{{ $t('homepage.button_careful') }}</button>
                        <button class="ts negative button">{{ $t('homepage.button_watchout') }}</button>
                        <button class="ts loading primary button">{{ $t('homepage.button') }}</button>
                    </div>
                    <!-- / 按鈕群組 -->


                    <!-- 表單 -->
                    <h4 class="ts header">{{ $t('homepage.form') }}</h4>
                    <div class="ts segment">
                        <form class="ts form">
                            <div class="field">
                                <label>{{ $t('homepage.form_realname') }}</label>
                                <div class="two fields">
                                    <div class="field">
                                        <input type="text" :placeholder="$t('homepage.form_firstname')">
                                    </div>
                                    <div class="field">
                                        <input type="text" :placeholder="$t('homepage.form_name')">
                                    </div>
                                </div>
                            </div>
                            <button class="ts button">{{ $t('homepage.form_submit') }}</button>
                        </form>
                    </div>
                    <!-- / 表單 -->

                </div>
                <!-- / 中間展示欄位 -->


                <!-- 右側展示欄位 -->
                <div class="four wide column">

                    <!-- 讀取中的段落 -->
                    <h4 class="ts header">{{ $t('homepage.loading_segment') }}</h4>
                    <div class="ts loading segment">
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                    <!-- / 讀取中的段落 -->


                    <!-- 浮起來的段落 -->
                    <h4 class="ts header">{{ $t('homepage.floating_segment') }}</h4>
                    <div class="ts raised segment">
                        <blockquote class="ts quote">
                            <p>{{ $t('homepage.segment_quote_desc1') }}</p>
                            <p>{{ $t('homepage.segment_quote_desc2') }}</p>
                            <p>{{ $t('homepage.segment_quote_desc3') }} </p>
                        </blockquote>
                    </div>
                    <!-- / 浮起來的段落 -->


                    <!-- 留言 -->
                    <h4 class="ts header">{{ $t('homepage.comment') }}</h4>
                    <div class="ts segment">
                        <div class="ts comments">
                            <div class="comment">
                                <a class="avatar">
                                    <img src="./images/image_placeholder_user.png">
                                </a>
                                <div class="content">
                                    <a class="author">Mac Taylor</a>
                                    <div class="metadata">
                                        <div>{{ $t('homepage.comment_1_time') }}</div>
                                        <div>
                                            <i class="star icon"></i>
                                            {{ $t('homepage.comment_1_favorite') }}
                                        </div>
                                    </div>
                                    <div class="text" v-html="$t('homepage.comment_1_desc1')">
                                    </div>
                                </div>
                            </div>
                            <div class="comment">
                                <a class="avatar">
                                    <img src="./images/image_placeholder_user2.png">
                                </a>
                                <div class="content">
                                    <a class="author">Yami Odymel</a>
                                    <div class="metadata">
                                        <div>{{ $t('homepage.comment_2_time') }}</div>
                                    </div>
                                    <div class="text">
                                        {{ $t('homepage.comment_2_desc1') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / 留言 -->

                </div>
                <!-- / 右側展示欄位 -->

            </div>
            <!-- / 展示網格 -->

        </section>
        <!-- / 展示元件 -->


        <!-- 客戶引言 -->
        <section id="quotes">
            <div class="ts narrow container">

                <!-- 區塊標題 -->
                <h2 class="ts center aligned icon header">
                    <i class="smile icon" style="font-size: 128px"></i>
                    {{ $t('homepage.feels') }}
                    <small class="sub header">
                        {{ $t('homepage.feels_desc1') }}
                    </small>
                </h2>
                <!-- / 區塊標題 -->


                <!-- 使用者網格 -->
                <div class="ts four column stackable grid">

                    <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/hiram.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Hiram Huang</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>Gan 我快哭了</p>
                            <p>感動屎了</p>
                            <p>我的淚</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/tsundere.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Tsundere Chen</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>等很久了</p>
                            <p>請問什麼時候換 TeaMeow v1.0.0？</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/sciuridae.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Sciuridae</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>洨安都做好 Tocas UI 了</p>
                            <p>我們該開個洨安教</p>
                            <p>信洨安，得永生</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/jasper.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Jasper Yu</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>潮爆了 所以我說那個始春呢</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/chris.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Chris</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>哪時候 TeaMeow 的 Messenger 會出現</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/sean.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Sean</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>One Tocas UI a Page Keep the Designer away</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/choukai.png">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Choukai</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>快來用 Tocas UI</p>
                            <p>這真是，太潮惹！</p>
                            <p>三朝★身寸☆惹ㄦ</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->


                     <!-- 單個使用者 -->
                    <div class="center aligned column">

                        <!-- 頭像 -->
                        <img class="ts bordered small circular image" src="./images/users/henry.jpg">
                        <!-- / 頭像 -->


                        <!-- 名稱 -->
                        <h4 class="ts header">Henry Wu</h4>
                        <!-- / 名稱 -->


                        <!-- 引言 -->
                        <blockquote>
                            <p>希望2.0趕快出來</p>
                        </blockquote>
                        <!-- / 引言 -->

                    </div>
                    <!-- / 單個使用者 -->

                </div>
                <!-- / 使用者網格 -->

            </div>
        </section>
        <!-- / 客戶引言 -->

        <doc-footer></doc-footer>
    </main>
</template>

<style lang="scss" scoped>
header
{
    padding-top   : 7em !important;
    padding-bottom: 7em !important;
    background    : linear-gradient(to bottom, #e7eae3 0%,#f9fcf7 100%) !important;
    margin-bottom : 3.5em !important;

    p
    {
        color    : #656565;
        font-size: 16px;
    }

    h1
    {
        font-size: 5rem !important;

        small
        {
            font-size: 2rem !important;
        }
    }

    @media (max-width: 767px)
    {
        h1
        {
            font-size: 3em !important;

            small
            {
                font-size: .5em !important;
            }
        }
    }
}
section
{
    &:first-of-type
    {
        margin-top : -4em;
        padding    : 5em 0 6em;
    }
    &:not(:first-of-type)
    {
        padding: 4em 0 6em;
    }
    &:last-of-type
    {
        margin-bottom: -3em;
    }

    h2
    {
        margin-bottom: 1em !important;

        &.icon.header
        {
            margin-bottom: 2em !important;
        }
    }
}
#openWhiteDesu
{
    background-color: #fff;

    .ts.header
    {
        color: #646464;
    }

    p
    {
        color    : #848181;
        font-size: 16px;
    }

    .padded.segment
    {
        overflow-x: auto;
    }
}
#components
{
    background-color: #fbfbfb;

    .ts.header
    {
        .sub.header
        {
            color: #848181;
        }
    }

    .ts.label {
        margin-top: 4px;
        margin-bottom: 4px;
    }
}
#quotes
{
    background-color: #616161;
    padding-bottom  : 4em;

    .ts.header
    {
        color: #EEE;
    }

    h2.ts.header
    {
        color: #FFF;

        .sub.header
        {
            color: #dadada;
        }
    }

    .ts.small.image
    {
        width: 130px;
    }

    blockquote
    {
        text-align   : left !important;
        box-sizing   : border-box;
        position     : relative;
        display      : inline-block;
        width        : calc(100% - 2em);
        margin       : 0;
        text-align   : left;
        padding      : 1em;
        margin-bottom: 4em;
        font-size    : 15px;
        color        : #d4d4d4;
        border       : 3px solid #525252;
        background   : #525252;
        border-radius: 5px;

        &:after
        {
            display     : block;
            position    : absolute;
            top         : -10px;
            left        : calc(50% - 15px);
            z-index     : 1;
            content     : "";
            border-style: solid;
            border-width: 0 15px 10px;
            border-color: #525252 transparent;
            width       : 0;
        }
    }
}
</style>

<style lang="scss">
nav.homepage
{
    background-color: #e7eae3 !important;
}
</style>


<script>
import DocNav    from '../components/DocNav'
import DocFooter from '../components/DocFooter'

export default
{
    name      : 'Index',
    components:
    {
        DocNav,
        DocFooter
    },
    beforeCreate()
    {
        window.RENDER_STARTED_TIME = new Date().getTime()
        document.title = 'Tocas UI'
    },
    mounted()
    {
        /** 重新 Hightlight 程式碼 */
        hljs.initHighlighting.called = false;
        hljs.initHighlighting()

        this.$store.dispatch('CALCULATE_RENDER_TIME', {time       : new Date().getTime(),
                                                       startedTime: window.RENDER_STARTED_TIME})
    }
}
</script>