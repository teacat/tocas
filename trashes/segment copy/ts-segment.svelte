<svelte:options tag="ts-segment" />

<script>
    import { onMount } from "svelte";

    // indicated
    export let indicated = null;
    // outlined
    export let outlined = null;
    // basic
    export let basic = null;
    // disabled
    export let disabled = null;
    // secondary
    export let secondary = null;
    // tertiary
    export let tertiary = null;
    // left_floated
    export let left_floated = null;
    // right_floated
    export let right_floated = null;
    // piled
    export let piled = null;
    // stacked
    export let stacked = null;
    // tall_stacked
    export let tall_stacked = null;
    // centered
    export let centered = null;
    // compact
    export let compact = null;
    // raised
    export let raised = null;
    // top_attached
    export let top_attached = null;
    // attached
    export let attached = null;
    // bottom_attached
    export let bottom_attached = null;
    // left_aligned
    export let left_aligned = null;
    // center_aligned
    export let center_aligned = null;
    // right_aligned
    export let right_aligned = null;
    // clearing
    export let clearing = null;
</script>

<style lang="sass">
    @import ./styles/_ts-segment
</style>

<div
    class="ts segment"
    class:indicated={indicated !== null}
    class:outlined={outlined !== null}
    class:basic={basic !== null}
    class:disabled={disabled !== null}
    class:secondary={secondary !== null}
    class:tertiary={tertiary !== null}
    class:left-floated={left_floated !== null}
    class:right-floated={right_floated !== null}
    class:piled={piled !== null}
    class:stacked={stacked !== null}
    class:tall-stacked={tall_stacked !== null}
    class:centered={centered !== null}
    class:compact={compact !== null}
    class:raised={raised !== null}
    class:top-attached={top_attached !== null}
    class:attached={attached !== null}
    class:bottom_attached={bottom_attached !== null}
    class:left-aligned={left_aligned !== null}
    class:center-aligned={center_aligned !== null}
    class:right-aligned={right_aligned !== null}
    class:clearing={clearing !== null}
>
    <slot />
</div>
