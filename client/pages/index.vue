<template>
  <section id="app-listing">
    <app-article-list :articles="articles" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import AppArticleList from '~/components/AppArticleList.vue';

export default {
  components: {
    AppArticleList,
  },
  computed: {
    ...mapGetters({
      articles: 'articles/articles',
    }),
  },
  async fetch(context) {
    const articles = context.store.getters['articles/articles'];
    if (Array.isArray(articles) && articles.length !== 0) {
      return;
    }

    await context.store.dispatch('articles/getArticles');
  },
};
</script>

<style lang="scss" scoped>
#app-listing {
  width: 400px;
  max-width: 100%;
  background-color: #fafafa;
  margin: auto;
}
</style>
