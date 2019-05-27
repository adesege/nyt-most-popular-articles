export const state = () => ({
  isLoading: false,
  articles: [],
});

export const mutations = {
  SET_IS_LOADING: (store, value) => {
    store.isLoading = value;
  },
  SET_ARTICLES: (store, payload) => {
    store.articles = payload;
  },
};

export const getters = {
  isLoading(store) {
    return store.isLoading;
  },
  articles(store) {
    return store.articles;
  },
};

export const actions = {
  async getArticles(context, payload) {
    context.commit('SET_IS_LOADING', true);
    const url =
      payload && 'articleId' in payload
        ? `/articles/${payload.articleId}`
        : '/articles';

    try {
      const response = await this.$axios
        .get(url)
        .catch(error => Promise.reject(error.response));
      context.commit('SET_IS_LOADING', false);
      context.commit('SET_ARTICLES', response.data);
    } catch (error) {
      context.commit('SET_IS_LOADING', false);
    }
  },
};
