function dropdown(command) {
    return this.each(function() {
        ts(this).on('click', function(e) {
            var pa = ts(this)[0]

            if (quadrant(pa) == 2)
                ts(this).removeClass('upward downward leftward rightward').addClass('downward rightward');
            if (quadrant(pa) == 3)
                ts(this).removeClass('upward downward leftward rightward').addClass('upward rightward');
            if (quadrant(pa) == 1)
                ts(this).removeClass('upward downward leftward rightward').addClass('downward leftward');
            if (quadrant(pa) == 4)
                ts(this).removeClass('upward downward leftward rightward').addClass('upward leftward');

            /** Close the visible dropdowns first */
            contract('.ts.dropdown.visible')

            detect(this, e)
        });
    })
}

function detect(target, event) {
    var isDropdown = ts(target).hasClass('dropdown')
    var isDropdownText = ts(event.target).hasClass('text')
    var isDropdownImage = ts(event.target).hasClass('image')
    var hasDropdownParent = ts(event.target).parent().hasClass('dropdown')
    var parentIsItem = ts(event.target).parent().hasClass('item')
    var targetIsDropdown = ts(event.target).hasClass('dropdown')
    var isItem = ts(event.target).hasClass('item')
    var isTsMenuItem = ts(event.target).closest('.ts.menu')

    if ((isTsMenuItem && isDropdown && parentIsItem && targetIsDropdown) ||
        (isTsMenuItem && isDropdown && !parentIsItem && targetIsDropdown) ||
        (isTsMenuItem && isDropdown && hasDropdownParent && parentIsItem))
        expand(target)

    else if ((isDropdown && isItem) || (isDropdown && parentIsItem))
        contract('.ts.dropdown.visible')

    else if (isDropdown && isTsMenuItem)
        expand(target)

    else if (isDropdown && targetIsDropdown)
        expand(target)

    else if (isDropdown && isDropdownImage && hasDropdownParent)
        expand(target)

    else if (isDropdown && isDropdownText && hasDropdownParent)
        expand(target)
}


function contract(target) {
    ts(target)
        .css("z-index", "11")
        .removeClass('visible')
        .addClass('hidden')
        .addClass('animating')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            ts(target).removeClass('animating')
        })
}



function quadrant(el) {
    var position = el.getBoundingClientRect()
    var width = window.innerWidth
    var widthHalf = width / 2
    var height = window.innerHeight
    var heightHalf = height / 2

    if (position.left < widthHalf && position.top < heightHalf)
        return 2
    else if (position.left < widthHalf && position.top > heightHalf)
        return 3
    else if (position.left > widthHalf && position.top > heightHalf)
        return 4
    else if (position.left > widthHalf && position.top < heightHalf)
        return 1
}


function expand(target) {
    ts(target)
        .css("z-index", "12")
        .removeClass('hidden')
        .addClass('visible')
        .addClass('animating')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            ts(target).removeClass('animating')
        })
}