<svelte:options tag="my-wc2"/>

<script>
    import { onMount } from 'svelte';

	export let component = null;

	onMount(async () => {
		component.getRootNode().host.setAttribute("expanded", "")
	});
</script>

<div bind:this={component}></div>

<div class="header">
	<p>SHOW: { $$slots.header }</p>
	<slot name="header"></slot>
</div>
<div class="content">
	<p>SHOW: { $$slots.content }</p>
	<slot name="content"></slot>
</div>