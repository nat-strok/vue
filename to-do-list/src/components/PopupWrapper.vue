<template>
  <div>

    <div class="overlay" @click="closePopup"></div>
    <transition name="fade" appear>
    <div class="popup">
        <span class="popup-close" @click="closePopup">&#10006;</span>
      <div class="popup-body">
        <slot />
      </div>
    </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'PopupWrapper',
  methods: {
    closePopup() {
      this.$router.push({name: "Home"});
    }
  }
}
</script>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  opacity: .7;
  background-color: silver;
}

.popup {
  position: fixed;
  max-width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  width: 65vw;
  margin: auto;
  padding: 50px 30px 30px;
  box-shadow: 10px 10px 30px rgba(26, 23, 20, .4);
  background-color: #fff;
}

.popup-close {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 20px;
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

</style>
