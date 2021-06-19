<svelte:options tag="ts-divider"/>

<style lang="sass" scoped>
@import "./Divider"
</style>

<script>
    import { onMount } from 'svelte';

    export let secondary = null
    export let hidden    = null
    export let fitted    = null
    export let clearing  = null
    export let align     = ''
    export let section   = null
    export let thickness = ''
    export let size      = ''
    export let heading   = null
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