var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var expandedSource = 'expandedSource'

export default
{
    header:
    {
        title   : '響應式',
        subTitle: 
        `
            協助你能夠在不同裝置上更加地得心應手。
        `
    },
    html: 
    [
        {
            type       : large,
            title      : '說明',
            description: 'Tocas UI 內建數個響應式輔助樣式，這可以協助你在指定裝置上顯示或是隱藏一些元素。'
        },
        {
            type             : normal,
            title            : '輔助樣式',
            description      : '這裡會介紹各種可用的輔助樣式。',
            link             : false,
            expandableExample: false
        },
        {
            type       : small,
            title      : '樣式列表',
            description: 
            `
                <p>這裡是輔助樣式的螢幕尺寸判斷基準表格。</p>
                <table class="ts small stackable table">
                    <thead>
                        <tr>
                            <th>樣式名稱</th>
                            <th>裝置稱呼</th>
                            <th>當螢幕尺寸 .. 出現</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="ts horizontal label">mobile only</span></td>
                            <td>僅行動裝置</td>
                            <td>&lt; 768px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">mobile or tablet only</span></td>
                            <td>行動裝置或平板</td>
                            <td>&lt; 992px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">tablet only</span></td>
                            <td>僅平板裝置</td>
                            <td>&gt; 767px && &lt; 992px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">computer only</span></td>
                            <td>僅電腦螢幕</td>
                            <td>&gt; 992 && &lt; 1200px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">tablet or large device only</span></td>
                            <td>平板或大型裝置</td>
                            <td>&gt; 767px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">large device only</span></td>
                            <td>僅大型裝置</td>
                            <td>&gt; 992px</td>
                        </tr>
                        <tr>
                            <td><span class="ts horizontal label">large screen only</span></td>
                            <td>僅大型螢幕</td>
                            <td>&gt; 1200px</td>
                        </tr>
                    </tbody>
                </table>`,
            link             : 'helper-classes',
            expandableExample: false
        },
        {
            type       : small,
            title      : '僅行動裝置',
            description: 
            `
                套用了這個樣式的容器僅會出現在<strong>行動裝置</strong>（手機、掌上型遊戲機）的橫和直立畫面。
            `,
            link             : 'mobile-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="mobile only">我只會出現在行動裝置。</div>`,
            mark: 'mobile only'
        },
        {
            type       : small,
            title      : '行動裝置或平板',
            description: 
            `
                這將會使你的容器出現在<strong>行動裝置</strong>或是<strong>平板螢幕</strong>（如 Nexus 7、iPad）上，
                在其他裝置時則會隱藏容器。
            `,
            link             : 'mobile-or-tablet-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="mobile or tablet only">我只會出現在行動或者是平板裝置。</div>`,
            mark: 'mobile or tablet only'
        },
        {
            type       : small,
            title      : '僅平板裝置',
            description: 
            `
                套用此樣式後容器、元素僅會出現在平板螢幕上。
            `,
            link             : 'tablet-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="tablet only">我只會出現在平板上。</div>`,
            mark: 'tablet only'
        },
        {
            type       : small,
            title      : '僅電腦螢幕',
            description: 
            `
                套用後僅會在電腦螢幕上看見該元素、容器，所謂的電腦螢幕即是<strong>筆記型電腦等小型螢幕</strong>，
                而<strong>非</strong>家用桌機的 21～24 寸或電視螢幕。
            `,
            link             : 'computer-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="computer only">你只能在電腦螢幕上看見我。</div>`,
            mark: 'computer only'
        },
        {
            type       : small,
            title      : '平板或大型裝置',
            description: 
            `
                這個樣式將會讓你的元素、容器僅出現在<strong>平板螢幕</strong>或者是<strong>大型裝置</strong>中，
                大型裝置為<strong>電腦螢幕和大於電腦螢幕以上寬度的顯示裝置</strong>（如電視）。
            `,
            link             : 'tablet-or-large-device-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="tablet or large device only">只要不是行動裝置通常都看得見我。</div>`,
            mark: 'tablet or large device only'
        },
        {
            type       : small,
            title      : '僅大型裝置',
            description: 
            `
                套用此樣式將會讓你的元素或是容器僅出現在大型裝置（如：電腦螢幕、電視）中。
            `,
            link             : 'large-device-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="large device only">我不會出現在平板，但會出現在電腦或是電視中！</div>`,
            mark: 'large device only'
        },
        {
            type       : small,
            title      : '僅大型螢幕',
            description: 
            `
                「大型螢幕」和「大型裝置」<strong>有所不同</strong>，大型螢幕意指<strong>筆記型電腦以上的螢幕</strong>（如：家用桌機的寬型螢幕、電視機）。
            `,
            link             : 'large-screen-only',
            expandableExample: false
        },
        {
            type: source,
            code: `<div class="large screen only">我只會出現在大型螢幕裡（不會出現在筆記型電腦中）！</div>`,
            mark: 'large screen only'
        },
    ]
}