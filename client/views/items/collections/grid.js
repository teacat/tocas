var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'


export default
{
    header:
    {
        title   : '網格系統',
        subTitle: 
        `
            用以設計網頁架構，比科技部的表格還要好太多了。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>Tocas UI 的網格系統和 Bootstrap 的較為不同，</p>
                <p>比起 Bootstrap來說，Tocas UI 且更具彈性與更強大的功能還更加地自動化。</p>
                <p>為了方便展示網格系統，我們將背景加上了灰色，在實際應用中將會是透明的。</p>
            `
        },
        {
            type       : normal,
            title      : '教學',
            description: '網格系統由多個欄位組成，而這些欄位可以有不同屬性。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `一個基本的網格系統，這可以用來規劃你網頁上的排版。`,
            link       : 'grid'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>`,
            mark: 'grid'
        },
        {
            type       : small,
            title      : '欄位',
            description: 
            `
                <p>我們稱被劃分開來的區塊為「欄位」，而每個欄位的寬度都是可以自己決定的。</p>
                <p>一個網格系統被劃分為<strong>十六格</strong>，這將使的你的網格系統更加地具有彈性，</p>
                <br>
                <p>這個範例的第一行有<strong>四個欄位</strong>，這意味著每一個欄位都是<strong>四格寬</strong>，</p>
                <p>而四格寬的欄位共有<strong>四個</strong>，那就是 <span class="ts horizontal label">4 * 4 = 16 </span> 也就剛好符合了一行所能夠承受的<strong>最大格數（十六格）</strong>，</p>
                <br>
                而另一行是則是由<strong>兩格寬</strong>、<strong>八格寬</strong>還有<strong>六格寬</strong>的欄位所組成，這意味著 <span class="ts horizontal label">2 + 8 + 6 = 16 </span>，也就剛好達到了一行的最大格數。</p>
                
            `,
            link: 'column'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="two wide column"></div>
    <div class="eight wide column"></div>
    <div class="six wide column"></div>
</div>`,
            mark: 'column'
        },
        {
            type       : small,
            title      : '列',
            description: 
            `
                <p>「列」用來確保「欄位」<strong>不會因為超過十六格而自動換行</strong>。</p>
                <p>同時「列」也可以確保自己是獨立的一行。</p>
            `,
            link: 'row'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="row">
        <div class="three wide column"></div>
        <div class="three wide column"></div>
        <div class="three wide column"></div>
        <div class="three wide column"></div>
    </div>
    <div class="two wide column"></div>
    <div class="five wide column"></div>
    <div class="nine wide column"></div>
    <div class="row">
        <div class="sixteen wide column"></div>
        <div class="sixteen wide column"></div>
        <div class="sixteen wide column"></div>
        <div class="sixteen wide column"></div>
    </div>
</div>`,
            mark: 'row'
        },
        {
            type       : small,
            title      : '較寬鬆的網格',
            description: `當你發現欄位和欄位之間太相近，你可以考慮透過 <span class="ts horizontal label">relaxed grid</span> 來增加欄位之間的間距。`,
            link       : 'relaxed'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>
<div class="ts relaxed grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>`,
            mark: 'relaxed'
        },
        {
            type       : normal,
            title      : '欄位',
            description: '網格系統中最重要的部分。',
            link       : false
        },
        {
            type       : small,
            title      : '自動換行',
            description: `一旦該行的欄位超過十六格（意指「寬度」，而<strong>不是欄位數量</strong>），就會自動換到下一行。`,
            link       : 'auto-wrap'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>`,
        },
        {
            type       : small,
            title      : '內容',
            description: 
            `
                <p>欄位<strong>不應該被套用任何自訂的樣式</strong>，欄位只是一個容器，</p>
                <p>你應該在裡面放入你要的元素和樣式，而<strong>不是直接在欄位上更改</strong>。</p>
            `,
            link: 'content'
        },
        {
            type: 'example',
            code: `<div class="ts three column grid">
    <div class="column">
        <div class="ts segment">Moon,</div>
    </div>
    <div class="column">
        <div class="ts secondary segment">dalan!</div>
    </div>
    <div class="column">
        <div class="ts tertiary segment">Hello</div>
    </div>
</div>`,
            mark: 'column'
        },
        {
            type       : small,
            title      : '寬度',
            description: 
            `   
                <p>欄位的寬度由 <span class="ts horizontal label">* wide</span> 決定，例如 <span class="ts horizontal label">one wide</span> 就是一格，<span class="ts horizontal label">sixteen wide</span> 則是十六格。</p>
                <p>十六格剛好會符合一行最大的寬度，八格則是填滿一行的一半。</p>
            `,
            link: 'wide'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="one wide column"></div>
    <div class="fifteen wide column"></div>
    <div class="three wide column"></div>
    <div class="thirteen wide column"></div>
    <div class="six wide column"></div>
    <div class="ten wide column"></div>
    <div class="four wide column"></div>
    <div class="twelve wide column"></div>
    <div class="sixteen wide column"></div>
</div>`,
            mark: 'one wide, fifteen wide, three wide, thirteen wide, six wide, ten wide, four wide, twelve wide, sixteen wide'
        },
        {
            type       : normal,
            title      : '列',
            description: '「列」用來整合、包覆欄位，甚至可以再細分寬度。',
            link       : false
        },
        {
            type       : small,
            title      : '寬度細分',
            description: 
            `
                <p>你可以在「列」裡面規劃這一列應該要有幾個欄位，</p>
                <p>例如 <span class="ts horizontal label">two column</span> 就能夠指定這一列有<strong>兩個欄位</strong>，也就是一格欄位有<strong>八格寬</strong>，
                <p>因為一列最多允許十六格，為了達成一列中有兩個欄位，即是 <span class="ts horizontal label">16 / 2 = 8</span>。</p>
                <br>
                <p>當你了解如何善用寬度細分，你也能夠將一列切成三個欄位，甚至四個、五個，</p>
                <p>而不會因為欄位寬度無法除盡十六而作罷。</p>
            `,
            link: 'column-row'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="two column row">
        <div class="column"></div>
        <div class="column"></div>
    </div>
</div>`,
            mark: 'two column'
        },
        {
            type       : small,
            title      : '浮動欄位',
            description: `列裡面的欄位可以是浮動的。`,
            link       : 'floated'
        },
        {
            type: 'example',
            code: `<div class="ts four column grid">
    <div class="four column row">
        <div class="left floated column"></div>
        <div class="right floated column"></div>
    </div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>`,
            mark: 'left floated, right floated'
        },
        {
            type       : normal,
            title      : '網格',
            description: '網格是最外層的容器。',
            link       : false
        },
        {
            type       : small,
            title      : '多重網格',
            description: `網格系統內可以還可以再有另一個網格系統。`,
            link       : 'multi-grids'
        },
        {
            type: 'example',
            code: `<div class="ts two column grid">
    <div class="column">
        <div class="ts four column grid">
            <div class="column"></div>
            <div class="column"></div>
            <div class="column"></div>
            <div class="column"></div>
        </div>
    </div>
    <div class="column"></div>
</div>`,
            mark: 'grid'
        },
        {
            type       : small,
            title      : '寬度細分',
            description: 
            `
                <p>這和「列」的寬度細分相同，但你可以<strong>直接在網格上進行細分</strong>，</p>
                <p>例如 <span class="ts horizontal label">four column</span> 就能夠指定網格系統的一行會有<strong>四個欄位</strong>，也就是一格欄位有<strong>四格寬</strong>，
                <p>因為一列最多允許十六格，為了達成一列中有四個欄位，即是 <span class="ts horizontal label">16 / 4 = 4</span>。</p>
                <br>
                <p>透過這種方法不需要手動設定每一個欄位要有幾格寬，十分地方便。</p>
            `,
            link: 'column-grid'
        },
        {
            type: 'example',
            code: `<div class="ts four column grid">
    <div class="two column row">
        <div class="column"></div>
    </div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
    <div class="column"></div>
</div>`,
            mark: 'four column, two column'
        },
        {
            type       : small,
            title      : '置中',
            description: `網格系統內的欄位可以從中間開始。`,
            link       : 'centered'
        },
        {
            type: 'example',
            code: `<div class="ts four column centered grid">
    <div class="column"></div>
    <div class="column"></div>
</div>`,
            mark: 'centered'
        },
        {
            type       : small,
            title      : '內容對齊',
            description: 
            `
                <p>網格系統內的欄位內容可以對齊左右，</p>
                <p>這個設定可以配置於整個網格系統、單列、甚至單個欄位。</p>
            `,
            link: 'aligned'
        },
        {
            type: 'example',
            code: `<div class="ts right aligned four column grid">
    <div class="column">置右的文字</div>
    <div class="left aligned two column row">
        <div class="column">置左的文字</div>
        <div class="right aligned column">置右的文字</div>
    </div>
</div>`,
            mark: 'left aligned, right aligned'
        },
        {
            type       : normal,
            title      : '響應式網格',
            description: 
            `
                <p>響應式網格可以在行動裝置或小型螢幕上自動縮放，</p>
                <p>你甚至只需要加一個樣式，其他讓我們來就好了。</p>
            `,
            link       : false
        },
        {
            type       : small,
            title      : '自動層疊',
            description: `自動層疊會在手機上時自動將所有欄位縮成一排。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<div class="ts stackable grid">
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '雙倍層疊',
            description: `這會讓你的欄位在手機和平板上以雙倍的寬度增加，例如一個<strong>四格寬</strong>的欄位會在平板上成為<strong>八格寬</strong>。`,
            link       : 'doubling'
        },
        {
            type: 'example',
            code: `<div class="ts doubling grid">
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="two wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
    <div class="four wide column"></div>
</div>`,
            mark: 'doubling'
        },
        {
            type       : small,
            title      : '手動調整',
            description: 
            `  
                <p>你可以自訂在不同裝置上欄位所佔的格數，你總共有這些裝置可供選擇。</p>
                <table class="ts small stackable definition table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>&lt; 767px</th>
                            <th>&gt; 767px</th>
                            <th>&gt; 991px</th>
                            <th>&gt; 1199px</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>樣式名稱</td>
                            <td><span class="ts horizontal label">mobile</span></td>
                            <td><span class="ts horizontal label">tablet</span></td>
                            <td><span class="ts horizontal label">computer</span></td>
                            <td><span class="ts horizontal label">large screen</span></td>
                        </tr>
                        <tr>
                            <td>裝置稱呼</td>
                            <td>行動裝置</td>
                            <td>平板</td>
                            <td>一般電腦</td>
                            <td>大型螢幕</td>
                        </tr>
                    </tbody>
                </table>
                <p>透過 <span class="ts horizontal label">[格數] wide [裝置]</span> 使用這些裝置，就像 <span class="ts horizontal label">one wide computer</span> 即是在電腦上成為一格寬。</p>
            `,
            link: 'manual-tweaks'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="eight wide computer four wide mobile column"></div>
    <div class="eight wide computer four wide mobile column"></div>
    <div class="eight wide computer four wide mobile column"></div>
    <div class="eight wide computer four wide mobile column"></div>
    <div class="four wide computer eight wide mobile column"></div>
    <div class="four wide computer eight wide mobile column"></div>
    <div class="four wide computer eight wide mobile column"></div>
    <div class="four wide computer eight wide mobile column"></div>
</div>`,
            mark: 'computer, mobile'
        },
        {
            type       : small,
            title      : '手動隱藏',
            description: 
            `
                你可以透過 <span class="ts horizontal label">[裝置] only</span> 在不同裝置上隱藏特定列、欄位。
            `,
            link: 'only'
        },
        {
            type: 'example',
            code: `<div class="ts grid">
    <div class="eight wide computer only column"></div>
    <div class="eight wide computer only column"></div>
    <div class="four wide mobile only column"></div>
    <div class="four wide mobile only column"></div>
    <div class="four wide mobile only column"></div>
    <div class="four wide mobile only column"></div>
    <div class="large screen only row">
        <div class="six wide column"></div>
        <div class="six wide column"></div>
        <div class="four wide column"></div>
    </div>
    <div class="eight wide tablet only eight wide mobile only column"></div>
    <div class="eight wide tablet only eight wide mobile only column"></div>
</div>`,
            mark: 'computer only, mobile only, large screen only, tablet only'
        },
    ]
}