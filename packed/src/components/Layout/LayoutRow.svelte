<svelte:options tag="ts-layout-row" />

<script>
    import { onMount } from "svelte";
</script>

<style lang="sass" scoped>
@import "./LayoutRow"

.ts-layout-row
    display       : flex
    flex-direction: column

    $this: &

    > #{$this}__cell:not(:last-child)
        border-bottom: 1px solid var(--gray-300)
</style>

<div class="ts-layout-row" />
