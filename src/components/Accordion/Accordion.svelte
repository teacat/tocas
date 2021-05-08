<svelte:options tag="ts-accordion"/>

<style lang="sass" scoped>
@import "./Accordion"
</style>

<script>
    import { onMount } from 'svelte';
    import { listenEvent } from './../libraries/event'
    import { isWanted, notWanted } from './../libraries/data'

    export let divided  = null
    export let density  = ""
    export let multiple = null
    let items = []

    function collapseAll() {
        items.forEach(v => v.expanded = false)
    }

    function expandAll() {
        items.forEach(v => v.expanded = true)
    }

    function factory(element) {
        listenEvent(element, "itemexpand", (event) => {
            if (notWanted(multiple)) {
                collapseAll()
            }
            event.detail.item.expanded = true
        })
        listenEvent(element, "itemcollapse", (event) => {
            event.detail.item.expanded = null
        })

        listenEvent(element, "registeritem", (event) => {
            items = [...items, event.detail.item]
        })

        listenEvent(element, "unregisteritem", (event) => {
            items = items.filter((v) => v !== event.detail.item)
        })

        return {
            update() {

            },

            destroy() {
            }
        }
    }
</script>

<div
    class="ts-accordion"
    class:ts-accordion--multiple="{isWanted(multiple)}"
    class:ts-accordion--divided ="{isWanted(divided)}"
    class:ts-accordion--compact ="{density === 'compact'}"
    class:ts-accordion--relaxed ="{density === 'relaxed'}"
    use:factory
>
    <slot></slot>
</div>