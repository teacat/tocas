<template>
    <article class="ts doubling four link cards">
        <router-link :to="card.link" class="ts card" v-for="card in cards">
            <div class="content">
                <div class="header" v-text="card.title"></div>
                <div class="meta">
                    <div v-text="card.class"></div>
                </div>
                <div class="description" v-text="card.description"></div>
            </div>
            <div class="symbol"><i class="icon" :class="card.symbol"></i>
        </router-link>
    </article>
</template>

<style lang="scss" scoped>
.card
{
    .content
    {
        .header
        {
            color: #5d5d5d;
        }

        .meta
        {
            color: #a5a5a5;
        }

        .description
        {
            color: #888888;
        }
    }
}
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