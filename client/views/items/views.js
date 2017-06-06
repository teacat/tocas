export default
{
    header:
    {
        title   : '視圖型',
        subTitle:
        `
            偏於外觀類的元件。
        `
    },
    cards:
    [
        {
            title      : '卡片',
            class      : '.ts.card',
            link       : '/views/card',
            description: '用來彙整短篇文字、或是以區塊顯示碎片式內容的元素。',
            symbol     : 'id card'
        },
        {
            title      : '聊天室',
            class      : '.ts.chatroom',
            link       : '/views/chatroom/',
            description: '提供兩人或多人的聊天區域。',
            symbol     : 'users'
        },
        {
            title      : '留言',
            class      : '.ts.comment',
            link       : '/views/comment',
            description: '用以顯示一篇文章的留言區塊。',
            symbol     : 'comments outline'
        },
        {
            title      : '動態消息',
            class      : '.ts.feed',
            link       : '/views/feed/',
            description: '顯示所有人動態消息的元件。',
            symbol     : 'rss'
        },
        {
            title      : '項目',
            class      : '.ts.item',
            link       : '/views/item/',
            description: '區隔項目並作為統整的元件。',
            symbol     : 'th list'
        },
        {
            title      : '統計數據',
            class      : '.ts.statistic',
            link       : '/views/statistic/',
            description: '用來顯示純文字的統計數據、在數字下新增標籤闡述該數值含義。',
            symbol     : 'bar chart'
        },
    ]
}