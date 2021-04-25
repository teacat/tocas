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
        heading  : Boolean,
    },
    computed: {
        classes: function() {
            return {
                "divider--secondary"     : this.secondary,
                "divider--hidden"        : this.hidden,
                "divider--fitted"        : this.fitted,
                "divider--clearing"      : this.clearing,
                "divider--start-aligned" : this?.align === "start",
                "divider--center-aligned": this?.align === "center",
                "divider--end-aligned"   : this?.align === "end",
                "divider--section"       : this.section,
                "divider--thick"         : this.thickness === "thick",
                "divider--thicker"       : this.thickness === "thicker",
                "divider--heading"       : this.heading,
            }
        }
    }
}
</script>

<style lang="sass">
.divider
    --gap: 1rem
    margin-top   : var(--gap)
    margin-bottom: var(--gap)
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
        --gap: 0

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
        --gap: 3rem

    // Thick
    &--thick
        --thickness: 3px

    // Thicker
    &--thicker
        --thickness: 5px

.divider
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
            border-bottom: var(--thickness, 1px) solid #000
    &__line
        border-bottom: var(--thickness, 1px) solid #000
</style>

<template>
    <div class="divider" v-bind:class="classes">
        <!-- Text -->
        <div class="divider__text" v-if="this.$slots.default">
            <div class="divider__text__start">
                <div class="divider__text__line"></div>
            </div>
            <div class="divider__text__center">
                <slot></slot>
            </div>
            <div class="divider__text__end">
                <div class="divider__text__line"></div>
            </div>
        </div>
        <!-- / Text -->

        <!-- Line Only -->
        <div class="divider__line" v-if="!this.$slots.default"></div>
        <!-- / Line Only -->
    </div>
</template>