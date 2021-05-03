<script>
export default {
    name: 'Accordion',
    props: {
        divided : Boolean,
        density : String,
        multiple: Boolean,
    },
    data: function() {
        return {
            activeIndex: -1,
            items      : []
        }
    },
    mounted() {
        this.$el.addEventListener("itemexpand", (event) => {
            event.stopPropagation()
            console.log("itemexpand", event.detail)
            this.collapseAll()
            console.log(event.detail.item.$el)
            event.detail.item.$el.setAttribute("expanded", "")
            event.detail.item.$el.getRootNode().host.setAttribute("expanded", "")
            event.detail.item.expanded = true
            //event.detail.item.expand()
        })

        this.$el.addEventListener("itemcollapse", (event) => {
            event.stopPropagation()
            console.log("itemcollapse", event.detail)
            event.detail.item.$el.removeAttribute("expanded")
            event.detail.item.$el.getRootNode().host.removeAttribute("expanded")
            event.detail.item.expanded = false
            //event.detail.item.collapse()
        })

        this.$el.addEventListener("itemregister", (event) => {
            event.stopPropagation()
            console.log("registeritem", event.detail.item)
            this.items = [...this.items, event.detail.item]
            console.log("result", this.items)
        })

        this.$el.addEventListener("itemunregister", (event) => {
            event.stopPropagation()
            console.log("UNregisteritem", event.detail.item)
            this.items = this.items.filter((v) => v !== event.detail.item)
            console.log("result", this.items)
        })
    },
    methods: {
        collapseAll() {
            this.items.forEach(v => v.collapse())
            //this.$children.forEach(v =>  v.collapse())
        },
        expandAll() {
            this.items.forEach(v => v.expand())
            //this.$children.forEach(v =>  v.expand())
        },
        updateIndex(index) {
            this.activeIndex = index
        },
    },
    computed: {
        classes: function() {
            return {
                "ts-accordion--divided": this.divided,
                "ts-accordion--compact": this?.density === "compact",
                "ts-accordion--relaxed": this?.density === "relaxed",
            }
        }
    }
}
</script>

<style lang="sass" scoped>
@use "./../styles/libraries/colors" as *
@use "./../styles/libraries/properties" as *

:root
    +var-scope(accordion)

.ts-accordion
    @extend %component

    // Divided
    &--divided

    // Compact
    &--compact
        .ts-accordion-item

    // Relaxed
    &--relaxed
</style>

<template>
    <div class="ts-accordion" v-bind:class="classes">
        {{ this.activeIndex }}
        <slot></slot>
    </div>
</template>