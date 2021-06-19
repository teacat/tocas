<svelte:options tag="ts-button"/>

<style lang="sass" scoped>
@import "./Button"
</style>

<script>
    import { onMount } from 'svelte';

    export let outlined = null
    export let linkOutlined = null
    export let attached = null
    export let secondary = null
    export let tertiary = null
    export let pulsing = null
    export let circular = null
    export let disabled = null
    export let loading = null
    export let labeled = null
    export let labeledIcon = null
    export let floated = null
    export let fluid = null
    export let size = null
    export let icon = null
    export let iconSize = null
    export let close = null
    export let fluid = null
    export let corner = null
    export let emphasis = null
    export let inverted = null
    export let quiet = null
    export let opinion = null
    export let basic = null
    export let link = null
    export let compact = null
    export let pressed = null
    export let decrease = null
    export let increase = null
    export let detailed = null
</script>

<div
    class="ts-divider"
    class:ts-divider--secondary     ="{secondary !== null}"
    class:ts-divider--hidden        ="{hidden    !== null}"
    class:ts-divider--fitted        ="{fitted    !== null}"
    class:ts-divider--clearing      ="{clearing  !== null}"
    class:ts-divider--start-aligned ="{align     === 'start'}"
    class:ts-divider--center-aligned="{align     === 'center'}"
    class:ts-divider--end-aligned   ="{align     === 'end'}"
    class:ts-divider--section       ="{section   !== null}"
    class:ts-divider--thick         ="{thickness === 'thick'}"
    class:ts-divider--thicker       ="{thickness === 'thicker'}"
    class:ts-divider--tiny          ="{size      === 'tiny'}"
    class:ts-divider--small         ="{size      === 'small'}"
    class:ts-divider--large         ="{size      === 'large'}"
    class:ts-divider--big           ="{size      === 'big'}"
    class:ts-divider--heading       ="{heading   !== null}"
>
    <!-- Text -->
    {#if $$slots.default}
    <div class="ts-divider__text">
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
    {/if}
    <!-- / Text -->

    <!-- Line Only -->
    {#if !$$slots.default}
    <div class="ts-divider__line"></div>
    {/if}
    <!-- / Line Only -->
</div>