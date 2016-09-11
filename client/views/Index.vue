<template>
    <main>
        <doc-nav class="homepage"></doc-nav>
        <header class="ts fluid horizontally fitted extra padded jumbotron">
            <div class="ts center aligned narrow container">
                <h1 class="ts center aligned header">
                    Tocas UI 2
                    <br>
                    <small class="sub header">這裡迎來新世界</small>
                </h1>
                <br>
                <br>
                <br>
                <p>現在開始試用！</p>
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
        <section class="ts narrow container stackable two column grid">
                <div class="column">
                    <h2 class="ts header">更有意義</h2>
                    <p>Tocas UI 以更有意義的方式來命名類別名稱，</p>
                    <p>就像是你直接稱呼這個元素一樣地親切。</p>
                    <p>程式已經夠枯燥乏味了，別再讓人生也繼續枯燥下去。</p>
                </div>
                <div class="column">
                    <h3 class="ts header">HTML</h3>
                    <pre class="ts padded segment"><code class="hljs">&lt;div class=&quot;ts fluid buttons&quot;&gt;
    &lt;button class=&quot;ts button&quot;&gt;卡莉絲&lt;/button&gt;
    &lt;button class=&quot;ts button&quot;&gt;亞凡芽&lt;/button&gt;
    &lt;button class=&quot;ts warning button&quot;&gt;橙希&lt;/button&gt;
&lt;/div&gt;</code></pre>
                    <div class="ts fluid buttons">
                        <button class="ts button">卡莉絲</button>
                        <button class="ts button">亞凡芽</button>
                        <button class="ts warning button">橙希</button>
                    </div>
                </div>
        </section>
        <section class="ts narrow container relaxed grid">
            <div class="sixteen wide column">
                <h2 class="ts center aligned icon header">
                    <i class="gift icon" style="font-size: 128px"></i>
                    眾多搭配
                    <small class="sub header">
                        元件除了可以單獨使用，還可以混搭著使用
                    </small>
                </h2>
            </div>
            <div class="four wide column">
                <h4 class="ts header">圖片卡片</h4>
                <div class="ts card">
                    <div class="image">
                        <img src="./images/image_placeholder_4-3.png">
                    </div>
                    <div class="content">
                        <div class="header">iPhone 7 開賣！</div>
                        <div class="meta">
                            <a href="#!">兩天前</a>
                        </div>
                    </div>
                </div>
                <h4 class="ts header">垂直選單</h4>
                <div class="ts vertical inverted positive menu">
                    <a class="item">
                        <i class="picture icon"></i> 相片
                    </a>
                    <a class="item">
                        <i class="users icon"></i> 群組
                    </a>
                    <a class="item">
                        <i class="star icon"></i> 收藏
                    </a>
                </div>
                <h4 class="ts header">標籤</h4>
                <div class="ts label">
                    <i class="gift icon"></i>
                    標籤
                </div>
                <div class="ts image label">
                    <img src="./images/image_placeholder_user.png">Yami Odymel</div>
                <div class="ts image label">
                    <img src="./images/image_placeholder_user2.png">Xiaoan</div>
                <div class="ts image label">
                    <img src="./images/image_placeholder_user3.png">卡莉絲
                    <div class="detail">實況主</div>
                </div>
                <div class="ts circular primary label">9</div>
<div class="ts circular info label">14</div>
<div class="ts warning label">7</div>
<div class="ts positive label">13</div>
            </div>
            <div class="eight wide column">
                <h4 class="ts header">文章卡片</h4>
                <div class="ts card">
                    <div class="content">
                        <div class="header">
                            Yami Odymel
                        </div>
                        <div class="bulleted meta">
                            <div> @yamiodymel </div>
                            <div> 2 mins      </div>
                        </div>
                        <div class="description">
                            <p>看似最重要的東西卻沒能被妥善利用，</p>
                            <p>沒有人能發現這一點，因為他們早已活在過去，</p>
                            <p>才剛開始的序章卻被放在頁尾。</p>
                        </div>
                    </div>
                </div>
                <h4 class="ts header">圖案選單</h4>
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
                <h4 class="ts header">按鈕群組</h4>
                <div class="ts fluid buttons">
                    <button class="ts button">按鈕</button>
                    <button class="ts warning button">小心</button>
                    <button class="ts negative button">不好了！</button>
                    <button class="ts loading primary button">按鈕</button>
                </div>
                <h4 class="ts header">表單</h4>
                <div class="ts segment">
                    <form class="ts form">
                        <div class="field">
                            <label>真實姓名</label>
                            <div class="two fields">
                                <div class="field">
                                    <input type="text" placeholder="姓氏">
                                </div>
                                <div class="field">
                                    <input type="text" placeholder="名字">
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label>帳單地址</label>
                            <div class="fields">
                                <div class="twelve wide field">
                                    <input type="text" placeholder="道路地址">
                                </div>
                                <div class="four wide field">
                                    <input type="text" placeholder="縣市名稱">
                                </div>
                            </div>
                        </div>
                        <button class="ts button">送出</button>
                    </form>
                </div>
            </div>
            <div class="four wide column">
                <h4 class="ts header">讀取中的段落</h4>
                <div class="ts loading segment">
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
                <h4 class="ts header">浮起來的段落</h4>
                <div class="ts raised segment">
                    <p>你將看見一個魔法師的日常生活，</p>
                    <p>只要你能夠單身三十年，</p>
                    <p>你也可以跟我一樣成為魔法師。 </p>
                </div>
                <h4 class="ts header">留言</h4>
                <div class="ts segment">
                    <div class="ts comments">
                        <div class="comment">
                            <a class="avatar">
                                <img src="./images/image_placeholder_user.png">
                            </a>
                            <div class="content">
                                <a class="author">Mac Taylor</a>
                                <div class="metadata">
                                    <div>2 天前</div>
                                    <div>
                                        <i class="star icon"></i>
                                        5 次收藏
                                    </div>
                                </div>
                                <div class="text">
                                    如果你有去釣魚大賽，你可能會被禁止進入：<br>
                                    「我們不歡迎職業選手」
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
                                    <div>42 分鐘前</div>
                                </div>
                                <div class="text">
                                    你很機車人
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <doc-footer></doc-footer>
    </main>
</template>

<style lang="sass" scoped>
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
}
section
{
    h2
    {
        margin-bottom: 1em !important;
    }
}
</style>

<style lang="sass">
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
        document.title = 'Tocas UI'
    },
    mounted()
    {
        /** 重新 Hightlight 程式碼 */
        hljs.initHighlighting.called = false;
        hljs.initHighlighting()
    }
}
</script>