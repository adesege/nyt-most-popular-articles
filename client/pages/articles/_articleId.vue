<template>
  <section id="news-details">
    <div class="nav-back-arrow">
      <i class="material-icons" @click="goToHome">
        arrow_back_ios
      </i>
    </div>
    <div class="news-details-wrapper">
      <div class="news-metadata">
        <p><i class="material-icons"> menu </i> {{ articles.source }}</p>
        <p><i class="material-icons"> visibility </i> {{ articles.views }}</p>
        <p>
          <i class="material-icons"> calendar_today </i>
          {{ articles.publishedDate }}
        </p>
      </div>
      <img :src="articles.thumbnailUrl" class="news-details-image" />
      <section class="news-body">
        <h1 class="news-title">{{ articles.title }}</h1>
        <p v-if="articles.byline" class="news-byline">{{ articles.byline }}</p>
        <p class="news-abstract">{{ articles.abstract }}</p>
        <p class="news-tags">
          <i class="material-icons">
            label
          </i>
          {{ articles.keywords }}
        </p>
      </section>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      articles: 'articles/articles',
    }),
  },
  async fetch(context) {
    const articles = context.store.getters['articles/articles'];

    if (
      !Array.isArray(articles) &&
      articles !== null &&
      articles instanceof Object
    ) {
      return;
    }

    await context.store.dispatch('articles/getArticles', {
      articleId: context.params.articleId,
    });
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
#news-details {
  position: relative;

  &:hover .nav-back-arrow {
    opacity: 1;
    width: 50px;
  }

  .nav-back-arrow {
    position: absolute;
    height: 100%;
    width: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    opacity: 0;
    transition: opacity 1s;

    .material-icons {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      height: fit-content;
      color: #fff;
      left: 15px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 10px;
    }
  }

  .material-icons {
    vertical-align: middle;
    margin-right: 5px;
  }

  .news-body {
    padding: 15px;
  }

  .news-details-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
  }

  .news-metadata {
    display: flex;
    justify-content: space-between;
    background-color: #f7f7f7;
    padding: 15px 15px 5px 15px;
    color: #737373;
    flex-wrap: wrap;

    p {
      margin-bottom: 10px;
    }
  }

  .news-title {
    font-size: 20px;
    font-weight: 500;
    margin: 5px 0 10px 0;
  }

  .news-abstract {
    margin-top: 20px;
  }

  .news-tags {
    margin-top: 30px;
  }
}
</style>
