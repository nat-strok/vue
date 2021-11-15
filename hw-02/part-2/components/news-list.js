const NewsList = {
  name: 'NewsList',
  components: {
    NewsCard
  },
  props: ['newsList'],
  template: `
    <div>
        <news-card v-for="post in newsList" :key="post.id" :post="post"></news-card>
    </div>
    `
}