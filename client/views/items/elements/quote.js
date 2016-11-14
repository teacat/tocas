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
        title   : '引言',
        subTitle:
        `
            複製別人的話然後不犯法的方式。
        `
    },
    html:
    [
        {
            type       : normal,
            title      : '種類',
            description: '引言有多個種類。',
            link       : false
        },
        {
            type       : small,
            title      : '基本',
            description: `最基本的引言。`,
            link       : 'quote'
        },
        {
            type: 'example',
            code: `<p>臺灣是位於亞洲東部、太平洋西北側的島嶼，地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望；面積約3.6萬平方公里， 為世界第38大島嶼，其中7成為山地與丘陵，平原則主要集中於西部沿海，</p>
<blockquote class="ts quote">
    <p>臺灣是位於亞洲東部、太平洋西北側的島嶼，地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望；面積約3.6萬平方公里， 為世界第38大島嶼，其中7成為山地與丘陵，平原則主要集中於西部沿海，地形海拔變化大。由於地處熱帶及亞熱帶氣候區之交界，自然景觀與生態系資源相當豐富而多元。</p>
    <cite>維基百科</cite>
</blockquote>`,
            mark: 'quote'
        },
        {
            type       : small,
            title      : '次要',
            description: `次要的引言種類。`,
            link       : 'secondary'
        },
        {
            type: 'example',
            code: `<p>臺灣是位於亞洲東部、太平洋西北側的島嶼，地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望；面積約3.6萬平方公里， 為世界第38大島嶼，其中7成為山地與丘陵，平原則主要集中於西部沿海，</p>
<blockquote class="ts secondary quote">
    <p>臺灣是位於亞洲東部、太平洋西北側的島嶼，地處琉球群島與菲律賓群島之間，西隔臺灣海峽與歐亞大陸相望；面積約3.6萬平方公里， 為世界第38大島嶼，其中7成為山地與丘陵，平原則主要集中於西部沿海，地形海拔變化大。由於地處熱帶及亞熱帶氣候區之交界，自然景觀與生態系資源相當豐富而多元。</p>
    <cite>維基百科</cite>
</blockquote>`,
            mark: 'secondary'
        },
    ]
}