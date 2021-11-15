const NewsCard = {
  inheritAttrs: false,
  name: 'NewsCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  template: `
      <div class="post">
          <div class="head-post">{{ post.title }}</div>
          <div>{{ post.body }}</div>
      </div>
  
  `
}