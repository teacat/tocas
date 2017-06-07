$_ = (selector) ->

# Get 會取得選擇器內的指定元素，並且回傳一個 DOM 元素而非選擇器。
$_.fn.get = (index) ->

# Each 會遍歷整個選擇器陣列。
$_.fn.each = (index, element) ->

# Eq 會取得選擇器的指定元素，然後繼續回傳僅帶有該元素的選擇器。
$_.fn.eq = (index) ->

# Parent 會回傳元素的父元素選擇器。
$_.fn.parent = (selector) ->

# Closest 會回傳最接近指定的父元素選擇器。
$_.fn.closest = (selector) ->

# Find 會在目前元素中搜尋指定元素並回傳其選擇器。
$_.fn.find = (selector) ->

# Append 會將元素插入在目前選擇器元素的內部最後面。
$_.fn.append = (element) ->

# AppendTo 會將目前選擇器元素插入到指定元素的內部最後面。
$_.fn.appendTo = (selector) ->

# Prepend 會將元素插入在目前選擇器元素的內部最前面。
$_.fn.prepend = (element) ->

# PrependTo 會將目前選擇器元素插入到指定元素的內部最前面。
$_.fn.prependTo = (selector) ->

# Attr 會取得或是建立新的標籤到目前的選擇器元素。
$_.fn.attr = (name, value) ->

# RemoveAttr 會移除目前選擇器元素的指定標籤。
$_.fn.removeAttr = (name) ->

# AddClass 會在目前選擇器元素插入新的樣式類別名稱。
$_.fn.addClass = (name) ->

# RemoveClass 會移除目前選擇器元素的指定樣式類別。
$_.fn.removeClass = (name) ->

# HasClass 會回傳選擇器元素是否帶有指定樣式類別，是布林值。
$_.fn.hasClass = (name) ->

# CSS 會將選擇器元素套用指定的 CSS 樣式。
$_.fn.css = (name, value) ->

# On 會綁定並註冊一個事件監聽器。
$_.fn.on = ->

# One 會綁定一次性的事件監聽器，當被觸發之後就會被移除。
$_.fn.one = ->

# Off 會註銷一個事件監聽器。
$_.fn.off = ->

# Text 會變更或取得選擇器元素的內容文字。
$_.fn.text = ->

# Val 會變更或取得選擇器元素的值。
$_.fn.val = ->

# HTML 會變更或取得選擇器元素的 HTML。
$_.fn.html = ->

# Prop 會變更或取得選擇器元素的屬性，例如 `.src`、`.width`。
$_.fn.prop = ->

# Data 會在選擇器元素中存放資料，類似 Attr 但頁面不可見。
$_.fn.data = ->