<svelte:options tag="ts-accordion-item"/>

<style lang="sass" scoped>
@import "./AccordionItem"
</style>

<script>
    import { dispatchEvent } from './../libraries/event'
    import { isTrue }        from './../libraries/data'

    export let expanded = false

    let accordionItem = null

    export function collapse() {
       dispatchEvent(accordionItem, "itemcollapse", {
            item: accordionItem.getRootNode().host
        })
    }

    function toggle() {
        if (isTrue(expanded)) {
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

    function factory(element) {
        accordionItem = element

        dispatchEvent(element, "registeritem", {
            item: element.getRootNode().host
        })

        return {
            update(expandedValue) {
                if (isTrue(expandedValue)) {
                    expanded = ""
                    element.getRootNode().host.setAttribute("expanded", "")
                } else {
                    element.getRootNode().host.removeAttribute("expanded")
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
    class:ts-accordion-item--expanded={isTrue(expanded)}
    use:factory={expanded}
>
    <div class="ts-accordion-item__title" on:click={toggle}>
        <div class="ts-accordion-item__title__icon">
            <ts-icon icon={isTrue(expanded) ? 'chevron-down' : 'chevron-up'}></ts-icon>
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

    {#if $$slots.content && isTrue(expanded)}
    <div class="ts-accordion-item__content">
        <slot name="content"></slot>
    </div>
    {/if}
</div>