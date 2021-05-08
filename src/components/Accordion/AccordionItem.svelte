<svelte:options tag="ts-accordion-item"/>

<style lang="sass" scoped>
@import "./AccordionItem"
</style>

<script>
    import { dispatchEvent } from './../libraries/event'

    export let expanded = false
    let accordionItem = null

    function callCollapse() {
        dispatchEvent(accordionItem, "itemcollapse", {
            item: accordionItem.getRootNode().host
        })
    }

    function collapse() {
        expanded = false
    }

    function toggle() {
        if (expanded) {
            collapse()
        } else {
            expand()
        }
    }

    function expand() {
        dispatchEvent(accordionItem, "itemexpand", {
            item: accordionItem.getRootNode().host
        })
    }

    function factory(element, x) {
        accordionItem = element

        expanded = x === true || (x !== false && x !== null)

        dispatchEvent(element, "registeritem", {
            item: element.getRootNode().host
        })

        return {
            update(x) {
                console.log(x)
                expanded = x === true || (x !== false && x !== null)
                if (expanded) {
                    console.log(element.getRootNode().host.setAttribute("expanded", ""))
                } else {
                    console.log(element.getRootNode().host.removeAttribute("expanded"))
                }

            },

            destroy() {
                dispatchEvent(element, "unregisteritem", {
                    item: element.getRootNode().host
                })
            }
        }
    }
</script>

<div
    class="ts-accordion-item"
    class:ts-accordion-item--expanded="{expanded}"
    use:factory={expanded}
>
    <div class="ts-accordion-item__title" on:click={toggle}>
        <div class="ts-accordion-item__title__icon">
            <ts-icon icon="{expanded ? 'chevron-down' : 'chevron-up'}"></ts-icon>
        </div>
        <div class="ts-accordion-item__title__main">
            {#if $$slots.header}
            <div class="ts-accordion-item__title__main__header">
                <slot name="header"></slot>
            </div>
            {/if}
            {#if $$slots.description}
            <div class="ts-accordion-item__title__main__description">
                <slot name="description"></slot>
            </div>
            {/if}
        </div>
    </div>

    {#if $$slots.content && expanded}
    <div class="ts-accordion-item__content">
        <slot name="content"></slot>
    </div>
    {/if}
</div>