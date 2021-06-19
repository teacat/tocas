<svelte:options tag="ts-layout" />

<script>
    import { onMount } from "svelte";
</script>

<style lang="sass" scoped>
@import "./Layout"

.ts-layout
    display       : flex
    flex-direction: row

    $this: &

    &--full
        width : 100%
        height: 100%


</style>

<div class="ts-layout" />
