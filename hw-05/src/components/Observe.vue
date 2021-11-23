<template>
  <div>

    <h2>4. Observable</h2>

    <div v-if="!isLoaded">Loading...</div>

    <div class="cards-rows">
      <anime-card
          v-for="item in anime"
          :key="item.mal_id"
          :single-item="item"
          @openPopup="openPopup"/>

      <anime-popup :summary="animeItem"
                   v-if="popupIsActive"
                   @closePopup="closePopup"/>

    </div>

  </div>
</template>

<script>
import {actions, getters} from '../store'

import AnimeCard from './observe/AnimeCard'
import AnimePopup from './observe/AnimePopup';

export default {
  name: 'Observe',
  components: {
    AnimeCard,
    AnimePopup
  },
  data() {
    return {
      popupIsActive: false,
      animeItem: {
        type: Object,
        required: true
      }
    }
  },
  computed: {
    ...getters
  },
  beforeCreate() {
    const vm = this;
    setTimeout(() => {
      vm.getData();
    }, 500);
  },
  methods: {
    ...actions,
    closePopup() {
      this.popupIsActive = false;
    },
    openPopup(el) {
      this.popupIsActive = true;
      this.animeItem = el;
    }
  }
}
</script>

<style scoped>
.cards-rows {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

</style>