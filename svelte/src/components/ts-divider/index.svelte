<svelte:options tag="my-wc"/>

<script>
    import { onMount } from 'svelte';

	export let component = null;

    onMount(() => {
        console.log($$slots)
    })

</script>

<div bind:this={component}></div>

<p>SHOW: { $$slots.wow }</p>
<slot name="wow"></slot>