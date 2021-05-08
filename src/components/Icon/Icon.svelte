<svelte:options tag="ts-icon"/>

<style lang="sass" scoped>
@import "./Icon"
</style>

<script>
    import { onMount } from 'svelte';

    export let size     = ""
    export let fitted   = null
    export let disabled = null
    export let spinning = null
    export let circular = null
    export let rounded  = null
    export let bordered = null
    export let emphasis = ""
    export let flip     = ""
    export let rotation = ""
    export let icon     = ""
    // spaced: Boolean,  TODO: space=start space=end?

</script>

<span
    class="ts-icon {icon !== '' && icon !== null ? `ts-icon--${icon}-icon` : ''} {emphasis !== '' && emphasis !== null ? `ts-icon--${emphasis}-emphasis` : ''}"

    class:ts-icon--tiny                    ="{size    === 'tiny'}"
    class:ts-icon--small                   ="{size    === 'small'}"
    class:ts-icon--large                   ="{size    === 'large'}"
    class:ts-icon--big                     ="{size    === 'big'}"
    class:ts-icon--fitted                  ="{fitted   !== null}"
    class:ts-icon--disabled                ="{disabled !== null}"
    class:ts-icon--spinning                ="{spinning !== null}"
    class:ts-icon--circular                ="{circular !== null}"
    class:ts-icon--rounded                 ="{rounded  !== null}"
    class:ts-icon--bordered                ="{bordered !== null}"
    class:ts-icon--horizontally-flipped    ="{flip     === 'horizontally'}"
    class:ts-icon--vertically-flipped      ="{flip     === 'vertically'}"
    class:ts-icon--clockwise-rotated       ="{rotation === 'clockwise'}"
    class:ts-icon--counterclockwise-rotated="{rotation === 'counterclockwise'}"
>
    <span class="ts-icon__entity"></span>
</span>