export const articlesUrl = () => ({
  uri: '/articles',
});

export const articleUrl = ({ articleId }) => ({
  uri: `/articles/${articleId}`,
});
