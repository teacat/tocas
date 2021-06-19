<script>
import Divider   from './playground/Divider.vue'
import Accordion from './playground/Accordion.vue'
import Icon      from './playground/Icon.vue'

export default {
    name: 'App',
    components: {
        Divider,
        Accordion,
        Icon
    },
    data: function() {
        return {
            view: 'Divider'
        }
    },
    methods: {
        changeView(name) {
            this.view = name
        }
    }
}
</script>

<style lang="sass">


</style>

<template>
    <div id="app">
        <button v-on:click="changeView('Accordion')">Accordion</button>
        <button v-on:click="changeView('Divider')">Divider</button>
        <button v-on:click="changeView('Icon')">Icon</button>

        <!-- -->
        <component v-bind:is="view"></component>
    </div>
</template>