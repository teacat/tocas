# ts-divider

```
sass src/styles/tocas.scss:dist/tocas.css
vue-cli-service build --target wc --name accordion ./src/main.js

vue-cli-service build --target wc --name accordion ./src/components/Accordion.vue --inline-vue
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<meta charset="utf-8">
<title>ts demo</title>
<script src="https://unpkg.com/vue"></script>
<script src="./ts.js"></script>



<ts-accordion>
    <ts-accordion-item>
        <div slot="header">Header 1</div>
        <div slot="description">Description 1</div>
        <div slot="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
    </ts-accordion-item>
    <ts-accordion-item expanded>
        <div slot="header">Header 2</div>
        <div slot="description">Description 2</div>
        <div slot="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
    </ts-accordion-item>
</ts-accordion>


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