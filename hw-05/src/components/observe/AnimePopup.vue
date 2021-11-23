<template>

  <div>

    <div class="overlay"
         @click="$emit('closePopup')"></div>

    <div class="popup">
        <span class="popup-close"
              @click="$emit('closePopup')">&#10006;</span>

      <div class="popup-body">

        <img :src=summary.image_url alt="" />
        <div class="card-title"><strong>{{ summary.title }}</strong></div>
        <p class="card-title">Type: {{ summary.type }}</p>
        <p class="card-title">Episodes: {{ summary.episodes }}</p>
        <p class="card-title">Start_date: {{ summary.start_date }}</p>
        <p class="card-title">End_date: {{ summary.end_date }}</p>
        <p class="card-title">Members: {{ summary.members }}</p>
        <p class="card-title">Score: {{ summary.score }}</p>

      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'AnimePopup',
  props: {
    summary: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.popup {
  max-width: 300px;
  display: block;
  position: fixed;
  background-color: white;
  padding: 10px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 30px rgba(26, 23, 20, .4);
}

.popup img {
  width: 100%;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: .35;
  background-color: silver;
}

.popup-close {
  display: block;
  width: 12px;
  height: 12px;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: .7;
  cursor: pointer;
}

.popup-close:hover {
  opacity: 1;
}

.popup-body {
  padding-top: 18px;
}

p {
  font-size: 12px;
  padding: 5px 0 0;
  margin: 0;
}


</style>