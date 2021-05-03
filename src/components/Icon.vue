<script>
export default {
    name: 'Icon',
    props: {
        size    : String,
        fitted  : Boolean,
        disabled: Boolean,
        spinning: Boolean,
        circular: Boolean,
        rounded : Boolean,
        bordered: Boolean,
        emphasis: String,
        flip    : String,
        rotation: String,
        icon    : String,
        // spaced: Boolean,  TODO: space=start space=end?
    },
    computed: {
        classes: function() {
            var defaultClasses = {
                "ts-icon--fitted"                  : this.fitted,
                "ts-icon--disabled"                : this.disabled,
                "ts-icon--spinning"                : this.spinning,
                "ts-icon--circular"                : this.circular,
                "ts-icon--rounded"                 : this.rounded,
                "ts-icon--bodered"                 : this.bodered,
                "ts-icon--horizontally-flipped"    : this.flip === "horizontally",
                "ts-icon--vertically-flipped"      : this.flip === "vertically",
                "ts-icon--clockwise-rotated"       : this.rotation === "clockwise",
                "ts-icon--counterclockwise-rotated": this.rotation === "counterclockwise",
                "ts-icon--tiny"                    : this.size === "tiny",
                "ts-icon--small"                   : this.size === "small",
                "ts-icon--large"                   : this.size === "large",
                "ts-icon--big"                     : this.size === "big",
            }
            if (this.icon !== "") {
                defaultClasses["ts-icon--" + this.icon + "-icon"] = true
            }
            return defaultClasses
        }
    }
}
</script>

<style lang="sass" scoped>
@use "./../styles/libraries/colors" as *
@use "./../styles/libraries/properties" as *
@use "./../styles/libraries/icons" as *
@use "./../styles/libraries/icon-maps" as *

:root
    +var-scope(icon)

.ts-icon
    @extend %component
    +icons

    &__entity
        font-family: 'Icons'
        font-weight: normal
        font-style : normal
        display: inline-block
        text-decoration: inherit
        text-align: center
        width: 1.18em
        //height: 1em
        -webkit-font-smoothing: antialiased
        backface-visibility: hidden
        speak: none

    &--fitted
    &--disabled
    &--spinning
    &--circular
    &--rounded
    &--bordered
    &--horizontally-flipped
    &--vertically-flipped
    &--clockwise-rotated
    &--counterclockwise-rotated

    &--tiny
    &--small
    &--large
    &--big

.ts-icon
</style>

<template>
    <div class="ts-icon" v-bind:class="classes">
        <span class="ts-icon__entity"></span>
    </div>
</template>