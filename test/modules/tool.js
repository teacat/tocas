

function testUnit(unit) {
    $form = $(`
        <div class="ts attached segment form" style="
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            width: 240px;
            overflow: scroll;
        ">
            <fieldset>
                <legend>Core Panel</legend>
                <div></div>
            </fieldset>
            <fieldset>
                <legend>Method Panel</legend>
                <div></div>
            </fieldset>
        </div>
    `)
    for (coreFunction in unit.core) {
        $button = $(`
                <button class="ts fluid button"
                    style="
                        margin-bottom: 8px
                ">
                    ${coreFunction}
                </button>
            `)
        $button.on('click', unit.core[coreFunction])
        $form.find('fieldset:first-child').append($button)
    }
    for (methodFunction in unit.method) {
        $button = $(`
                <button class="ts fluid button"
                    style="
                        margin-bottom: 8px
                ">
                    ${methodFunction}
                </button>
            `)
        $button.on('click', unit.method[methodFunction])
        $form.find('fieldset:nth-child(2)').append($button)
    }
    $('body').css('padding', '50px').css('padding-left', 'calc(240px + 50px)').prepend($form)
}

