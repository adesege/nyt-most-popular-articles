<template>
  <div class="app-listing-wrapper">
    <div
      v-for="article in articles"
      :key="article.id"
      class="app-listing-card"
      @click="goToArticle(article.articleId)"
    >
      <img :src="article.thumbnailUrl" class="app-listing-image" />
      <div class="app-listing-details">
        <h1 class="app-listing-news-title">
          {{ article.title }}
        </h1>
        <div class="app-listing-meta">
          <p v-if="article.byline" class="app-listing-author">
            {{ article.byline }}
          </p>
          <p class="app-listing-calendar">
            <i class="material-icons"> calendar_today</i
            >{{ article.publishedDate }}
          </p>
        </div>
      </div>
      <i class="material-icons"> chevron_right </i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToArticle(articleId) {
      return this.$router.push(`/articles/${articleId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$font-size: 16px;
$line-height: 1.1;
$lines-to-show: 2;

.app-listing-wrapper {
  .app-listing-card {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
      background-color: #f7f7f7;
    }

    .app-listing-details {
      width: 75%;
      margin: 0 10px;
    }

    .app-listing-meta {
      color: #737373;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .app-listing-calendar {
        .material-icons {
          font-size: 14px;
          vertical-align: top;
          margin-right: 5px;
        }
      }

      p {
        margin-bottom: 5px;
      }
    }

    .app-listing-news-title {
      display: block;
      display: -webkit-box;
      height: $font-size * $line-height * $lines-to-show;
      margin: 0 auto;
      font-size: $font-size;
      font-weight: 500;
      line-height: $line-height;
      -webkit-line-clamp: $lines-to-show;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #737373;
      margin-bottom: 10px;
    }

    .app-listing-image {
      width: 40px;
      height: 40px;
      background-color: #999;
      border-radius: 50%;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
