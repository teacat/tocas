<svelte:options tag="ts-accordion"/>

<style lang="sass" scoped>
@import "./Accordion"
</style>

<script>
    import { onMount }         from 'svelte';
    import { listenEvent }     from './../libraries/event'
    import { isTrue, isFalse } from './../libraries/data'

    export let divided  = null
    export let density  = ""
    export let multiple = null

    let items = []

    function collapseAll() {
        items.forEach(v => v.collapse())
    }

    export function expandAll() {
        items.forEach(v => v.expand())
    }

    function factory(element) {
        listenEvent(element, "itemexpand", (event) => {
            if (isFalse(multiple)) {
                collapseAll()
            }
            event.detail.item.expanded = true
        })
        listenEvent(element, "itemcollapse", (event) => {
            event.detail.item.expanded = false
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
    class:ts-accordion--multiple={isTrue(multiple)}
    class:ts-accordion--divided ={isTrue(divided)}
    class:ts-accordion--compact ={density === 'compact'}
    class:ts-accordion--relaxed ={density === 'relaxed'}
    use:factory
>
    <slot></slot>
</div>