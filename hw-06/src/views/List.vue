<template>
  <div class="list">
    <h1>List page</h1>

    <div v-for="item in list" :key="item.id">
      <router-link :to="{name: 'Item', params: {id: item.id, data: {text1: item.text1, text2: item.text2}}}"> {{ item.title }} </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      list: {
        first: {
          id: 1,
          title: 'Some First Link',
          text1: 'Some First text like...',
          text2: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'
        },
        second: {
          id: 2,
          title: 'Some Second Link',
          text1: 'Some Second text like...',
          text2: 'consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas v consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas'
        }
      }
    }
  }
}
</script>