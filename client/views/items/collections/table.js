var normal  = 'normal'
var large   = 'large'
var small   = 'small'
var tiny    = 'tiny'
var source  = 'source'
var example = 'example'
var imgPlaceholderSquare = require('../../images/image_placeholder_1-1.png')
var imgPlaceholderWide   = require('../../images/image_placeholder_16-9.png')
var imgPlaceholderLegacy = require('../../images/image_placeholder_4-3.png')
var imgPlaceholderUser   = require('../../images/image_placeholder_user.png')
var imgPlaceholderUser2  = require('../../images/image_placeholder_user2.png')
var imgPlaceholderUser3  = require('../../images/image_placeholder_user3.png')

export default
{
    header:
    {
        title   : '表格',
        subTitle:
        `
            呈現統計資料的好方法。
        `
    },
    html:
    [
        {
            type       : large,
            title      : '說明',
            description:
            `
                <p>表格不應用來當作網頁架構，而是用來呈現資料，</p>
                <p>如果你想要用類似的架構設計網頁，請參考格線系統。</p>
            `
        },
        {
            type       : normal,
            title      : '種類',
            description: '表格具有不同的種類。',
            link       : false
        },
        {
            type       : small,
            title      : '表格',
            description: `一個最基本的表格。`,
            link       : 'table'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>#</th>
            <th>姓名</th>
            <th>英文暱稱</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>卡莉絲</td>
            <td>Caris</td>
        </tr>
        <tr>
            <td>2</td>
            <td>橙希</td>
            <td>Orenji</td>
        </tr>
        <tr>
            <td>3</td>
            <td>吳雨藍</td>
            <td>Aoi</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th colspan="3">未到人數：3</th>
        </tr>
    </tfoot>
</table>`,
            mark: 'table'
        },
        {
            type       : small,
            title      : '網格的',
            description: `表格可以看起來像是一個網格表格。`,
            link       : 'celled'
        },
        {
            type: 'example',
            code: `<table class="ts celled table">
    <thead>
        <tr>
            <th>#</th>
            <th>姓名</th>
            <th>英文暱稱</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>卡莉絲</td>
            <td>Caris</td>
        </tr>
        <tr>
            <td>2</td>
            <td>橙希</td>
            <td>Orenji</td>
        </tr>
        <tr>
            <td>3</td>
            <td>吳雨藍</td>
            <td>Aoi</td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts very basic collapsing celled table">
    <thead>
        <tr>
            <th>員工</th>
            <th>答對題數</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <h6 class="ts image header">
                    <img src="${imgPlaceholderUser}" class="ts mini rounded image">
                    <div class="content">
                        雷莉亞
                        <div class="sub header">科學家</div>
                    </div>
                </h6>
            </td>
            <td>
                22
            </td>
        </tr>
        <tr>
            <td>
                <h6 class="ts image header">
                    <img src="${imgPlaceholderUser2}" class="ts mini rounded image">
                    <div class="content">
                        卡莉絲·伊繁特
                        <div class="sub header">初中生</div>
                    </div>
                </h6>
            </td>
            <td>
                13
            </td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts celled striped table">
    <thead>
        <tr><th colspan="3">
            Git 倉庫
        </th>
    </tr></thead>
    <tbody>
        <tr>
            <td class="collapsing">
                <i class="folder icon"></i> node_modules
            </td>
            <td>第一次 Commit！</td>
            <td class="right aligned collapsing">10 小時前</td>
        </tr>
        <tr>
            <td>
                <i class="folder icon"></i> test
            </td>
            <td>第一次 Commit！</td>
            <td class="right aligned">10 小時前</td>
        </tr>
        <tr>
            <td>
              <i class="folder icon"></i> build
            </td>
            <td>第一次 Commit！</td>
            <td class="right aligned">10 小時前</td>
        </tr>
        <tr>
            <td>
                <i class="file outline icon"></i> package.json
            </td>
            <td>第一次 Commit！</td>
            <td class="right aligned">10 小時前</td>
        </tr>
        <tr>
            <td>
                <i class="file outline icon"></i> Gruntfile.js
            </td>
            <td>第一次 Commit！</td>
            <td class="right aligned">10 小時前</td>
        </tr>
    </tbody>
</table>`,
            mark  : 'celled',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '定義',
            description: `表格中的第一個欄位都是該行的標題。`,
            link       : 'table'
        },
        {
            type: 'example',
            code: `<table class="ts definition table">
    <thead>
        <tr>
            <th></th>
            <th>參數</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>header()</td>
            <td>title[<em>string</em>]</td>
            <td>輸出網頁標頭。</td>
        </tr>
        <tr>
            <td>footer()</td>
            <td>path[<em>string</em>], name[<em>string</em>[<em>optional</em>]]</td>
            <td>於網頁最底部輸出內容，可同時儲存內容至一個檔案。</td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts compact celled definition table">
    <thead>
        <tr>
            <th></th>
            <th>真實姓名</th>
            <th>註冊日期</th>
            <th>電子郵件地址</th>
            <th>高級會員</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="collapsing">
                <div class="ts toggle checkbox">
                    <input type="checkbox" id="toggle1">
                    <label for="toggle1"></label>
                </div>
            </td>
            <td>吳雨藍</td>
            <td>2014/12/24</td>
            <td>aoi@misaka.net</td>
            <td>否</td>
        </tr>
        <tr>
            <td class="collapsing">
                <div class="ts toggle checkbox">
                    <input type="checkbox" id="toggle2">
                    <label for="toggle2"></label>
                </div>
            </td>
            <td>橙希</td>
            <td>2015/03/15</td>
            <td>orenji@aoi.com</td>
            <td>是</td>
        </tr>
        <tr>
            <td class="collapsing">
                <div class="ts toggle checkbox">
                    <input type="checkbox" id="toggle3">
                    <label for="toggle3"></label>
                </div>
            </td>
            <td>羽田白音</td>
            <td>2016/01/20</td>
            <td>shirone@yahoo.jp.com</td>
            <td>是</td>
        </tr>
    </tbody>
    <tfoot class="full-width">
        <tr>
            <th></th>
            <th colspan="4">
                <div class="ts right floated small primary labeled icon button">
                    <i class="user icon"></i> 新增使用者
                </div>
                <div class="ts small button">
                    核准
                </div>
                <div class="ts small disabled button">
                    全部核准
                </div>
            </th>
        </tr>
    </tfoot>
</table>`,
            mark  : 'definition',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '複雜結構',
            description: `表格可以用來呈現更具複雜性的結構。`,
            link       : 'structured'
        },
        {
            type: 'example',
            code: `<table class="ts celled structured table">
    <thead>
        <tr>
            <th rowspan="2">名稱</th>
            <th rowspan="2">種類</th>
            <th rowspan="2">檔案數量</th>
            <th colspan="3">程式語言</th>
        </tr>
        <tr>
            <th>Ruby</th>
            <th>JavaScript</th>
            <th>Python</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alpha 團隊</td>
            <td>專案 1</td>
            <td class="right aligned">2</td>
            <td class="center aligned">
                <i class="large positive checkmark icon"></i>
            </td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td rowspan="3">Beta 團隊</td>
            <td>專案 1</td>
            <td class="right aligned">52</td>
            <td class="center aligned">
                <i class="large positive checkmark icon"></i>
            </td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>專案 2</td>
            <td class="right aligned">12</td>
            <td></td>
            <td class="center aligned">
                <i class="large positive checkmark icon"></i>
            </td>
            <td></td>
        </tr>
        <tr>
            <td>專案 3</td>
            <td class="right aligned">21</td>
            <td class="center aligned">
                <i class="large positive checkmark icon"></i>
            </td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>`,
            mark: 'structured'
        },
        {
            type       : normal,
            title      : '狀態',
            description: '表格中的欄位可以具有不同的狀態。',
            link       : false
        },
        {
            type       : small,
            title      : '肯定和否定',
            description: `欄位或一整行都可以具有肯定或否定的含義。`,
            link       : 'positive-and-negative'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>名稱</th>
            <th>英文名稱</th>
            <th>計畫狀態</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>可憐</td>
            <td>Karen</td>
            <td class="positive"><i class="icon check"></i> 已完成</td>
            <td>多國語元支援的函式庫，協助網站跨國交際。</td>
        </tr>
        <tr class="positive">
            <td>美由紀</td>
            <td>Miyuki</td>
            <td><i class="icon check"></i> 已完成</td>
            <td>協助圖像處理的類別，必須要安裝 Imagick。</td>
        </tr>
        <tr>
            <td>卡莉絲</td>
            <td>Caris</td>
            <td class="negative"><i class="icon dont"></i> 尚未完成</td>
            <td>一個基於 HTML5 的遊戲引擎。</td>
        </tr>
    </tbody>
</table>`,
            mark: 'positive, negative'
        },
        {
            type       : small,
            title      : '錯誤',
            description: `錯誤和否定一樣，只是樣式名稱不同，適合用在錯誤的地方。`,
            link       : 'error'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>工作區域</th>
            <th>目前狀態</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>TeaMeow</td>
            <td class="positive"><i class="check icon"></i>已完成</td>
        </tr>
        <tr class="error">
            <td>Safari</td>
            <td><i class="close icon"></i>已停止</td>
        </tr>
        <tr>
            <td>Isuka</td>
            <td class="error"><i class="close icon"></i>發生錯誤</td>
        </tr>
    </tbody>
</table>`,
            mark: 'error'
        },
        {
            type       : small,
            title      : '警告',
            description: `表格內可以有單個或是多個欄位呈現一個警告的狀態。`,
            link       : 'warning'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>工作區域</th>
            <th>目前狀態</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Avane</td>
            <td class="warning"><i class="caution icon"></i>需要初始化</td>
        </tr>
        <tr>
            <td>Caris</td>
            <td>尚未啟動</td>
        </tr>
        <tr class="warning">
            <td>Isuka</td>
            <td><i class="caution icon"></i>需要檢查</td>
        </tr>
    </tbody>
</table>`,
            mark: 'warning'
        },
        {
            type       : small,
            title      : '啟用中',
            description: `顯示一行、欄位於啟用中，或是被選取的樣式。`,
            link       : 'active'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>使用者名稱</th>
            <th>電子郵件信箱</th>
            <th>生日</th>
        </tr>
    </thead>
    <tbody>
        <tr class="active">
            <td>yamiodymel</td>
            <td>yamiodymel@yamiodymel.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td>mac0017817</td>
            <td>mac0017817@mac0017817.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td class="active">shiroteacat</td>
            <td>shiroteacat@shiroteacat.com</td>
            <td>1998/07/13</td>
        </tr>
    </tbody>
    <tbody></tbody>
</table>`,
            mark: 'active'
        },
        {
            type       : small,
            title      : '已停用',
            description: `顯示一行、欄位已停用。`,
            link       : 'disabled'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th>使用者名稱</th>
            <th>電子郵件信箱</th>
            <th>生日</th>
        </tr>
    </thead>
    <tbody>
        <tr class="disabled">
            <td>yamiodymel</td>
            <td>yamiodymel@yamiodymel.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td>mac0017817</td>
            <td>mac0017817@mac0017817.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td class="disabled">shiroteacat</td>
            <td>shiroteacat@shiroteacat.com</td>
            <td>1998/07/13</td>
        </tr>
    </tbody>
    <tbody></tbody>
</table>`,
            mark: 'disabled'
        },
        {
            type       : normal,
            title      : '外觀',
            description: '表格可以透過額外的樣式來強化外觀。',
            link       : false
        },
        {
            type       : small,
            title      : '單行',
            description: `欄位可以保持單行而避免因擠壓而自動換行。`,
            link       : 'single-line'
        },
        {
            type: 'example',
            code: `<table class="ts single line table">
    <thead>
        <tr>
            <th>使用者名稱</th>
            <th>電子郵件信箱</th>
            <th>生日</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>yamiodymel</td>
            <td>yamiodymel@yamiodymel.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td>mac0017817</td>
            <td>mac0017817@mac0017817.com</td>
            <td>1998/07/13</td>
        </tr>
        <tr>
            <td>shiroteacat</td>
            <td>shiroteacat@shiroteacat.com</td>
            <td>1998/07/13</td>
        </tr>
    </tbody>
</table>`,
            mark: 'single line'
        },
        {
            type       : small,
            title      : '固定',
            description: `表格可以套用 <span class="ts horizontal label">table-layout: fixed</span> 來讓表格內容有固定的寬度。`,
            link       : 'fixed'
        },
        {
            type: 'example',
            code: `<table class="ts fixed table">
    <thead>
        <tr>
            <th>文章名稱</th>
            <th>狀態</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem Ipsum</td>
            <td>核准</td>
            <td>Etiam aliquet pulvinar sapien, et venenatis orci placerat vitae. Sed posuere bibendum ante et porttitor. Fusce auctor.</td>
        </tr>
        <tr>
            <td>Etiam aliquet</td>
            <td>核准</td>
            <td>Nulla sed ex eget ligula gravida condimentum non id dui. Donec rutrum accumsan augue vitae pretium.</td>
        </tr>
        <tr>
            <td>Aliquam</td>
            <td>拒絕</td>
            <td>Curabitur volutpat tristique erat ut pulvinar. Aliquam varius, mi ut convallis rhoncus, nunc dolor feugiat mi.</td>
        </tr>
    </tbody>
</table>`,
            mark: 'fixed'
        },
        {
            type       : tiny,
            title      : '和單行搭配的固定表格',
            description: `這將會讓的欄位遇到該換行時不進行換行，並以 <span class="ts horizontal label">...</span> 安插於文字後方。`
        },
        {
            type: 'example',
            code: `<table class="ts fixed single line table">
    <thead>
        <tr>
            <th>文章名稱</th>
            <th>狀態</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem Ipsum</td>
            <td>核准</td>
            <td>我是一個有點長的註釋，當我想要換行的時候卻會因為有了 "single line" 而不能換行，所以我的後面會顯示「...」。</td>
        </tr>
        <tr>
            <td>Etiam aliquet</td>
            <td>核准</td>
            <td>這是一個比較短的註釋。</td>
        </tr>
        <tr>
            <td>Aliquam</td>
            <td>拒絕</td>
            <td>短註釋。</td>
        </tr>
    </tbody>
</table>`,
            mark: 'fixed, single line'
        },
        {
            type       : small,
            title      : '自動重疊',
            description: `表格可以在行動裝置上自動重疊。`,
            link       : 'stackable'
        },
        {
            type: 'example',
            code: `<table class="ts stackable table">
    <thead>
        <tr>
            <th>文章名稱</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem Ipsum</td>
            <td>Etiam aliquet pulvinar sapien, et venenatis orci placerat vitae. Sed posuere bibendum ante et porttitor. Fusce auctor.</td>
        </tr>
        <tr>
            <td>Etiam aliquet</td>
            <td>Nulla sed ex eget ligula gravida condimentum non id dui. Donec rutrum accumsan augue vitae pretium.</td>
        </tr>
        <tr>
            <td>Aliquam</td>
            <td>Curabitur volutpat tristique erat ut pulvinar. Aliquam varius, mi ut convallis rhoncus, nunc dolor feugiat mi.</td>
        </tr>
    </tbody>
</table>`,
            mark: 'stackable'
        },
        {
            type       : small,
            title      : '可選擇行',
            description: `表格中的「行」可以像是支援選擇一樣，讓滑鼠移到上面或是點擊時有效果。`,
            link       : 'selectable'
        },
        {
            type: 'example',
            code: `<table class="ts selectable table">
    <thead>
        <tr>
            <th>工作區域</th>
            <th>目前狀態</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Safari</td>
            <td>已停止</td>
        </tr>
        <tr>
            <td>Isuka</td>
            <td>發生錯誤</td>
        </tr>
        <tr>
            <td>Karen</td>
            <td>尚未確認</td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts inverted selectable table">
    <thead>
        <tr>
            <th>工作區域</th>
            <th>目前狀態</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Safari</td>
            <td>已停止</td>
        </tr>
        <tr>
            <td>Isuka</td>
            <td>發生錯誤</td>
        </tr>
        <tr>
            <td>Karen</td>
            <td>尚未確認</td>
        </tr>
    </tbody>
</table>`,
            mark  : 'selectable',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '可選擇欄位',
            description: `表格中的欄位可以被選擇或是提供點擊事件。`,
            link       : 'selectable-column'
        },
        {
            type: 'example',
            code: `<table class="ts celled table">
    <thead>
        <tr>
            <th>名稱</th>
            <th>狀態</th>
            <th>編輯</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Yami</td>
            <td>沒有動作</td>
            <td class="selectable">
                <a href="#">編輯</a>
            </td>
        </tr>
        <tr>
          <td>Jamie</td>
          <td>已核准</td>
          <td class="selectable">
            <a href="#">編輯</a>
          </td>
        </tr>
        <tr class="warning">
            <td>John</td>
            <td>沒有動作</td>
            <td class="selectable warning">
                <a href="#">需要變更</a>
            </td>
        </tr>
        <tr>
            <td>Jamie</td>
            <td class="positive">已核准</td>
            <td class="selectable positive">
                <a href="#">核准</a>
            </td>
        </tr>
        <tr>
            <td>Jill</td>
            <td class="negative">已拒絕</td>
            <td class="selectable negative">
                <a href="#">移除</a>
            </td>
        </tr>
    </tbody>
</table>`,
            mark: 'selectable'
        },
        {
            type       : small,
            title      : '垂直對齊',
            description: `你可以改變表格中欄位的文字垂直對齊。`,
            link       : 'vertical-aligns'
        },
        {
            type: 'example',
            code: `<table class="ts striped table">
    <thead>
        <tr>
            <th>名稱</th>
            <th>狀態</th>
            <th>筆記</th>
        </tr>
    </thead>
    <tbody>
        <tr class="top aligned">
            <td>John</td>
            <td>已核准</td>
            <td class="top aligned">
                貼齊頂部<br>
                貼齊頂部
            </td>
        </tr>
        <tr>
            <td>Jamie</td>
            <td class="bottom aligned">貼齊底部</td>
            <td>
                記事錄<br>
                1<br>
                2<br>
            </td>
        </tr>
    </tbody>
</table>`,
            mark: 'top aligned, middle aligned, bottom aligned'
        },
        {
            type       : small,
            title      : '水平對齊',
            description: `表格中欄位的文字水平對齊也可以被改變，例如靠左對齊、右，甚至置中。`,
            link       : 'horizontal-aligns'
        },
        {
            type: 'example',
            code: `<table class="ts striped table">
    <thead>
        <tr>
            <th>名稱</th>
            <th>狀態</th>
            <th class="right aligned">筆記</th>
        </tr>
    </thead>
    <tbody>
        <tr class="center aligned">
            <td>Yami</td>
            <td>置中</td>
            <td class="right aligned">我靠右</td>
        </tr>
        <tr>
            <td>Jamie</td>
            <td>已核准</td>
            <td class="right aligned">靠右</td>
        </tr>
        <tr>
            <td>Jill</td>
            <td class="left aligned">靠左邊</td>
            <td class="right aligned">靠右</td>
        </tr>
    </tbody>
</table>`,
            mark: 'left aligned, center aligned, right aligned'
        },
        {
            type       : small,
            title      : '條紋',
            description: `讓表格具有條紋感。`,
            link       : 'striped'
        },
        {
            type: 'example',
            code: `<table class="ts striped table">
    <thead>
        <tr>
            <th>檔案名稱</th>
            <th>分類</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>file.php</td>
            <td>Controller</td>
            <td>用來處理檔案相關程式。</td>
        </tr>
        <tr>
            <td>star.php</td>
            <td>Controller</td>
            <td>處理星號程式。</td>
        </tr>
        <tr>
            <td>favorite.php</td>
            <td>Model</td>
            <td>處理最愛的項目。</td>
        </tr>
        <tr>
            <td>user.php</td>
            <td>View</td>
            <td>處理使用者頁面的模板視圖。</td>
        </tr>
        <tr>
            <td>database.php</td>
            <td>Model</td>
            <td>和資料庫負責聯繫的模型。</td>
        </tr>
    </tbody>
</table>`,
            mark: 'striped'
        },
        {
            type       : small,
            title      : '基本',
            description: `表格可以只剩下基本的構造線條。`,
            link       : 'basic'
        },
        {
            type: 'example',
            code: `<table class="ts basic table">
    <thead>
        <tr>
            <th>檔案名稱</th>
            <th>分類</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>file.php</td>
            <td>Controller</td>
            <td>用來處理檔案相關程式。</td>
        </tr>
        <tr>
            <td>star.php</td>
            <td>Controller</td>
            <td>處理星號程式。</td>
        </tr>
        <tr>
            <td>favorite.php</td>
            <td>Model</td>
            <td>處理最愛的項目。</td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts very basic table">
    <thead>
        <tr>
            <th>檔案名稱</th>
            <th>分類</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>file.php</td>
            <td>Controller</td>
            <td>用來處理檔案相關程式。</td>
        </tr>
        <tr>
            <td>star.php</td>
            <td>Controller</td>
            <td>處理星號程式。</td>
        </tr>
        <tr>
            <td>favorite.php</td>
            <td>Model</td>
            <td>處理最愛的項目。</td>
        </tr>
    </tbody>
</table>`,
            mark  : 'very basic, basic',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '閉合欄位',
            description: `欄位可以只占欄位內容需要的空間，而不是自動增寬留下過多的空白。`,
            link       : 'collapsing'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <tbody>
        <tr>
            <td class="collapsing">
              <i class="folder icon"></i> node_modules
            </td>
            <td>第一次 Commit！</td>
            <td>10 小時前</td>
        </tr>
        <tr>
            <td>
              <i class="folder icon"></i> test
            </td>
            <td>第一次 Commit！</td>
            <td>10 小時前</td>
        </tr>
        <tr>
            <td>
              <i class="folder icon"></i> build
            </td>
            <td>第一次 Commit！</td>
            <td>10 小時前</td>
        </tr>
    </tbody>
</table>`,
            mark: 'collapsing'
        },
        {
            type       : small,
            title      : '欄位均分',
            description: `你可以從 <span class="ts horizontal label">one</span> 至 <span class="ts horizontal label">ten</span> 來選出你要將欄位自動均分為幾等分。`,
            link       : 'column-count'
        },
        {
            type: 'example',
            code: `<table class="ts three column table">
    <thead>
        <tr>
            <th>#</th>
            <th>姓名</th>
            <th>英文暱稱</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>卡莉絲</td>
            <td>Caris</td>
        </tr>
        <tr>
            <td>2</td>
            <td>橙希</td>
            <td>Orenji</td>
        </tr>
        <tr>
            <td>3</td>
            <td>吳雨藍</td>
            <td>Aoi</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>3 個人</th>
            <th>2 個核准</th>
            <th></th>
        </tr>
    </tfoot>
</table>`,
            mark: 'three column'
        },
        {
            type       : small,
            title      : '欄位網格',
            description: `表格也可以利用像是網格系統一樣的功能來對欄位的寬度進行規劃。`,
            link       : 'column-width'
        },
        {
            type: 'example',
            code: `<table class="ts table">
    <thead>
        <tr>
            <th class="ten wide">名稱</th>
            <th class="six wide">狀態</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John</td>
            <td>已核准</td>
        </tr>
        <tr>
            <td>Jamie</td>
            <td>已核准</td>
        </tr>
        <tr>
            <td>Jill</td>
            <td>已否決</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>3 個人</th>
            <th>2 個核准</th>
        </tr>
    </tfoot>
</table>`,
            mark: 'ten wide, six wide'
        },
        {
            type       : small,
            title      : '閉合表格',
            description: `表格本身可以只占用最小寬度。`,
            link       : 'collapsing-table'
        },
        {
            type: 'example',
            code: `<table class="ts collapsing table">
    <thead>
        <tr>
            <th>#</th>
            <th>姓名</th>
            <th>英文暱稱</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>卡莉絲</td>
            <td>Caris</td>
        </tr>
        <tr>
            <td>2</td>
            <td>橙希</td>
            <td>Orenji</td>
        </tr>
        <tr>
            <td>3</td>
            <td>吳雨藍</td>
            <td>Aoi</td>
        </tr>
    </tbody>
</table>`,
            mark: 'celled'
        },
        {
            type       : small,
            title      : '增加內距',
            description: `你可以增加欄位的內距。`,
            link       : 'padded'
        },
        {
            type: 'example',
            code: `<table class="ts padded table">
    <thead>
        <tr>
            <th>文章名稱</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem Ipsum</td>
            <td>Etiam aliquet pulvinar sapien, et venenatis orci placerat vitae. Sed posuere bibendum ante et porttitor. Fusce auctor.</td>
        </tr>
        <tr>
            <td>Etiam aliquet</td>
            <td>Nulla sed ex eget ligula gravida condimentum non id dui. Donec rutrum accumsan augue vitae pretium.</td>
        </tr>
        <tr>
            <td>Aliquam</td>
            <td>Curabitur volutpat tristique erat ut pulvinar. Aliquam varius, mi ut convallis rhoncus, nunc dolor feugiat mi.</td>
        </tr>
    </tbody>
</table>
<br>
<table class="ts very padded table">
    <thead>
        <tr>
            <th>文章名稱</th>
            <th>註釋</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Lorem Ipsum</td>
            <td>Etiam aliquet pulvinar sapien, et venenatis orci placerat vitae. Sed posuere bibendum ante et porttitor. Fusce auctor.</td>
        </tr>
        <tr>
            <td>Etiam aliquet</td>
            <td>Nulla sed ex eget ligula gravida condimentum non id dui. Donec rutrum accumsan augue vitae pretium.</td>
        </tr>
        <tr>
            <td>Aliquam</td>
            <td>Curabitur volutpat tristique erat ut pulvinar. Aliquam varius, mi ut convallis rhoncus, nunc dolor feugiat mi.</td>
        </tr>
    </tbody>
</table>`,
            mark  : 'very padded, padded',
            remove: '<br>'
        },
        {
            type       : small,
            title      : '縮減',
            description: `表格的內距可以稍微縮減用以呈現更多的行數。`,
            link       : 'compact'
        },
        {
            type: 'example',
            code: `<table class="ts compact table">
    <thead>
        <tr>
            <th>檔案名稱</th>
            <th>分類</th>
            <th>說明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>file.php</td>
            <td>Controller</td>
            <td>用來處理檔案相關程式。</td>
        </tr>
        <tr>
            <td>star.php</td>
            <td>Controller</td>
            <td>處理星號程式。</td>
        </tr>
        <tr>
            <td>favorite.php</td>
            <td>Model</td>
            <td>處理最愛的項目。</td>
        </tr>
        <tr>
            <td>user.php</td>
            <td>View</td>
            <td>處理使用者頁面的模板視圖。</td>
        </tr>
        <tr>
            <td>database.php</td>
            <td>Model</td>
            <td>和資料庫負責聯繫的模型。</td>
        </tr>
    </tbody>
</table>`,
            mark: 'compact'
        },{
            type       : small,
            title      : '尺寸',
            description: `表格有不同的尺寸可供選擇。`,
            link       : 'sizes'
        },
        {
            type: 'example',
            code: `<table class="ts mini celled table">
    <tbody>
        <tr>
            <td>mini</td>
            <td>迷你</td>
            <td>這是一個迷你的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts tiny celled table">
    <tbody>
        <tr>
            <td>tiny</td>
            <td>微小</td>
            <td>這是一個微小的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts small celled table">
    <tbody>
        <tr>
            <td>small</td>
            <td>小的</td>
            <td>這是一個小的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts medium celled table">
    <tbody>
        <tr>
            <td>medium</td>
            <td>適中</td>
            <td>這是一個適中的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts large celled table">
    <tbody>
        <tr>
            <td>large</td>
            <td>大的</td>
            <td>這是一個大的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts big celled table">
    <tbody>
        <tr>
            <td>big</td>
            <td>大型</td>
            <td>這是一個大型的表格。</td>
        </tr>
    </tbody>
</table>
<table class="ts huge celled table">
    <tbody>
        <tr>
            <td>huge</td>
            <td>巨大</td>
            <td>這是一個巨大的表格。</td>
        </tr>
    </tbody>
</table>`,
            mark: 'mini, tiny, small, medium, large, big, huge'
        },
    ]
}