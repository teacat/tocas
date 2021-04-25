<svelte:options tag="my-wc"/>

<script>
$: console.log($$slots);
</script>

<slot name="foo"></slot>