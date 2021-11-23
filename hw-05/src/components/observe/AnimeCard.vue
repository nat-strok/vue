<template>

  <div class="card" @click="$emit('openPopup', singleItem)">
      <div class="card-title">{{ singleItem.title }}</div>
      <div><img :src=singleItem.image_url alt="" /></div>
  </div>

</template>

<script>
export default {
  name: 'AnimeCard',
  props: {
    singleItem: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  max-width: 120px;
  padding: 10px;
  border: 1px solid silver;
  border-radius: 2px;
  margin: 10px;
  position: relative;
}

.card img {
  max-width: 100%;
}

.card-title {
  padding-bottom: 6px;
}

</style>