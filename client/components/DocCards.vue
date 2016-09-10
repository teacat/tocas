<template>
    <article class="ts doubling four link cards">
        <router-link :to="card.link" class="ts card" v-for="card in cards">
            <div class="content">
                <div class="header" v-text="card.title"></div>
                <div class="meta">
                    <div v-text="card.class"></div>
                </div>
                <div class="description" v-text="card.description">
                </div>
            </div>
        </router-link>
    </article>
</template>

<style>
</style>

<script>
export default
{
    name : 'DocCards',
    props:
    {
        cards: {}
    }
}
</script>