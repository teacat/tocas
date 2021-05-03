<script>
import Icon from './Icon.vue'

export default {
    name: 'AccordionItem',
    components: {
        Icon
    },
    props: {
        divided : Boolean,
        density : String,
        expanded: Boolean,
    },
    data: function() {
        return {
            //isActive: this.expanded
        }
    },
    computed: {
        classes: function() {
            return {
                "ts-accordion-item--expanded": this.expanded,
                "ts-accordion-item--divided" : this.divided,
                "ts-accordion-item--compact" : this?.density === "compact",
                "ts-accordion-item--relaxed" : this?.density === "relaxed",
            }
        }
    },
    mounted() {
        this.$el.dispatchEvent(new CustomEvent("registeritem", { detail: { item: this }, bubbles: true, composed: true}))
    },
    beforeDestroy() {
        this.$el.dispatchEvent(new CustomEvent("unregisteritem", { detail: { item: this }, bubbles: true, composed: true}))
    },
    watch: {
        expanded: {
            immediate: true,
            handler (val, oldVal) {
                console.log(val, oldVal)
            }
        }
    },
    methods: {
        expand() {
            this.$el.dispatchEvent(new CustomEvent("itemexpand", { detail: { item: this }, bubbles: true, composed: true}))

            /*if (!this.$parent.multiple) {
                this.$el.dispatchEvent(new CustomEvent("itemchange", { detail: { index: this.getIndex() }, bubbles: true, composed: true}))
                //this.$parent.collapseAll()

            }
            this.expanded = true
            this.$parent.activeIndex = this.getIndex()*/
        },
        collapse() {
            this.$el.dispatchEvent(new CustomEvent("itemcollapse", { detail: { item: this }, bubbles: true, composed: true}))

            // this.expanded = false
            // this.$parent.activeIndex = -1
        },
        toggle() {
            if (this.expanded) {
                this.collapse()
            } else {
                this.expand()
            }
        },
        getIndex() {
            if (this.$parent.$children.indexOf(this) == -1) {
                this.$index = this.$root.$children.length;
            } else {
                return this.$parent.$children.indexOf(this);
            }
        },
    }
}
</script>

<style lang="sass" scoped>
@use "./../styles/libraries/colors" as *
@use "./../styles/libraries/properties" as *

:root
    +var-scope(accordion-item)



.ts-accordion-item
    @extend %component



    //
    &--expanded
        .ts-accordion-item__title__icon

    // Divided
    &--divided

    // Compact
    &--compact


    // Relaxed
    &--relaxed

.ts-accordion-item
    +define(header-color     , get-current-foreground-color(900))
    +define(description-color, get-current-foreground-color(600))
    +define(content-color    , get-current-foreground-color(800))
    +define(divider-color    , get-current-foreground-color(300))

    &:first-child
        border-top: none

    &:not(:first-child)
        border-top: 1px solid get(divider-color)
        margin-top: .5rem
        padding-top: .5rem

    &__title
        display: flex

        &:hover
            cursor: pointer

        &__main
            //flex: 1

            &__header
                color: get(header-color)

            &__description
                color: get(description-color)
        &__icon
            margin-inline-end: 1rem

    &__content
        color: get(content-color)
</style>

<template>
    <div class="ts-accordion-item" v-bind:class="classes">
        <div class="ts-accordion-item__title" v-on:click="toggle">
            <div class="ts-accordion-item__title__icon">
                <Icon icon="chevron-down" v-if="this.expanded"></Icon>
                <Icon icon="chevron-up"   v-if="!this.expanded"></Icon>
            </div>
            <div class="ts-accordion-item__title__main">
                <div class="ts-accordion-item__title__main__header" v-if="this.$slots.header">
                    <slot name="header"></slot>
                </div>
                <div class="ts-accordion-item__title__main__description" v-if="this.$slots.description">
                    <slot name="description"></slot>
                </div>
            </div>
        </div>
        <div class="ts-accordion-item__content" v-if="this.$slots.content && this.expanded">
            <slot name="content"></slot>
        </div>
    </div>
</template>