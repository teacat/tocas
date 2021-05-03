<script>
export default {
    name: 'Divider',
    props: {
        secondary: Boolean,
        hidden   : Boolean,
        fitted   : Boolean,
        clearing : Boolean,
        align    : String,
        section  : Boolean,
        thickness: String,
        size     : String,
        heading  : Boolean,
    },
    computed: {
        classes: function() {
            return {
                "ts-divider--secondary"     : this.secondary,
                "ts-divider--hidden"        : this.hidden,
                "ts-divider--fitted"        : this.fitted,
                "ts-divider--clearing"      : this.clearing,
                "ts-divider--start-aligned" : this?.align === "start",
                "ts-divider--center-aligned": this?.align === "center",
                "ts-divider--end-aligned"   : this?.align === "end",
                "ts-divider--section"       : this.section,
                "ts-divider--thick"         : this.thickness === "thick",
                "ts-divider--thicker"       : this.thickness === "thicker",
                "ts-divider--tiny"          : this.size === "tiny",
                "ts-divider--small"         : this.size === "small",
                "ts-divider--large"         : this.size === "large",
                "ts-divider--big"           : this.size === "big",
                "ts-divider--heading"       : this.heading,
            }
        }
    }
}
</script>

<style lang="sass" scoped>
@use "./../styles/libraries/colors" as *
@use "./../styles/libraries/properties" as *

:root
    +var-scope(divider)

.ts-divider
    @extend %component

    +define(color        , get-current-foreground-color(600))
    +define(divider-color, get-current-foreground-color(300))
    +define(gap          , 1rem)
    +define(thickness    , 1px)
    +define(font-weight  , normal)
    +define(font-size    , absolute-size(medium))

    font-weight  : get(font-weight)
    font-size    : get(font-size)
    color        : get(color)
    margin-top   : get(gap)
    margin-bottom: get(gap)

    // Secondary
    &--secondary
        margin-left : auto
        margin-right: auto
        width       : 80%

    // Hidden
    &--hidden
        visibility: hidden

    // Fitted
    &--fitted
        +override(gap, 0)

    // Clearing
    &--clearing
        clear: both

    // Align
    &--start-aligned
        .divider
            &__text
                &__start
                    display: none
    &--center-aligned
    &--end-aligned
        .divider
            &__text
                &__end
                    display: none
    // Section
    &--section
        +override(gap, 3rem)

    // Thick
    &--thick
        +override(thickness, 3px)
    // Thicker
    &--thicker
        +override(thickness, 5px)

    // Heading
    &--heading
        +override(font-weight, bold)
        +override(color      , get-current-foreground-color(900))

    // Tiny
    &--tiny
        +override(font-size, absolute-size(tiny))
    // Small
    &--small
        +override(font-size, absolute-size(small))
    // Large
    &--large
        +override(font-size, absolute-size(large))
    // Big
    &--big
        +override(font-size, absolute-size(big))

.ts-divider
    &__text
        display    : flex
        align-items: center

        &__start,
        &__end
            flex: 1
        &__start
            margin-inline-end: 1rem
        &__end
            margin-inline-start: 1rem
        &__line
            border-bottom: get(thickness) solid get(divider-color)
    &__line
        border-bottom: get(thickness) solid get(divider-color)
</style>

<template>
    <div class="ts-divider" v-bind:class="classes">
        <!-- Text -->
        <div class="ts-divider__text" v-if="this.$slots.default">
            <div class="ts-divider__text__start">
                <div class="ts-divider__text__line"></div>
            </div>
            <div class="ts-divider__text__center">
                <slot></slot>
            </div>
            <div class="ts-divider__text__end">
                <div class="ts-divider__text__line"></div>
            </div>
        </div>
        <!-- / Text -->

        <!-- Line Only -->
        <div class="ts-divider__line" v-if="!this.$slots.default"></div>
        <!-- / Line Only -->
    </div>
</template>