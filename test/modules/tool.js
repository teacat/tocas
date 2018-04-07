

function testUnit(unit) {
    $form = $(`
        <div class="ts attached segment form" style="
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 3;
            width: 240px;
            overflow: scroll;
        ">
        </div>
    `)

    for (fieldset in unit) {
        $fieldset = $(`
        <fieldset>
            <legend>${fieldset}</legend>
            <div></div>
        </fieldset>
        `)
        for (func in unit[fieldset]) {
            $button = $(`
                <button class="ts fluid button"
                    style="
                        margin-bottom: 8px
                ">
                    ${func}
                </button>
            `)
            $button.on('click', unit[fieldset][func])
            $fieldset.find('div').append($button)
        }
        $form.append($fieldset)
    }
    $('body').css('padding', '50px').css('padding-left', 'calc(240px + 50px)').prepend($form)
}

