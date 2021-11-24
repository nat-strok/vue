<template>
  <div id="slider">

    <transition-group tag="div" :name="transitionName">

      <div class="slide" v-if="show" :key="currentSlide">
        <p class="number">{{ slides[currentSlide] }}</p>
      </div>

    </transition-group>

    <div class="btn btn-prev" @click="slide(1)"></div>
    <div class="btn btn-next" @click="slide(-1)"></div>

  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      currentSlide: 0,
      transitionName: "fade",
      show: false,
      slides: [1, 2, 3, 4, 5]
    }
  },
  methods: {

    // принимает значение 1  или -1 в зависимости от того, какая кнопка на слайдере кликнута
    // меняет класс анимации (чтобы менялось направление движения слайда)
    // вычисляет номер следующего слайда
    slide(dir) {
      if (dir === 1) {
        this.transitionName = "slide-next";
      } else {
        this.transitionName = "slide-prev";
      }
      let max = this.slides.length;
      this.currentSlide = (this.currentSlide + dir + max) % max;
    }
  },
  mounted() {
    this.show = true;
  }
}
</script>

<style scoped>
#slider {
  width: 100%;
  height: 100px;
  position: relative;
}

.slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid silver;
  border-radius: 12px;
}

.number {
  font-size: 72px;
  font-weight: bold;
}

.btn {
  font-size: 24px;
  z-index: 10;
  cursor: pointer;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  position: absolute;
  top: calc(50% - 35px);
  left: 0;
  transition: transform 0.5s;
}

.btn-next {
  left: auto;
  right: 0;
}

.btn::before {
  display: block;
  position: absolute;
  top: 0;
}

.btn-prev::before  {
  content: "\276E";
  left: 28px;
}

.btn-next::before  {
  content: "\276F";
  right: 28px;
}

.btn:hover {
  transform: scale(1.3);
}

/* animation */

/* on start */
.fade-enter-active {
  transition: opacity 3s;
}
.fade-enter {
  opacity: 0;
}

/* on process */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 1.5s ease-in-out;
}
.slide-next-enter {
  transform: translate(100%);
}
.slide-next-leave-to {
  transform: translate(-100%);
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 1.5s ease-in-out;
}
.slide-prev-enter {
  transform: translate(-100%);
}
.slide-prev-leave-to {
  transform: translate(100%);
}

</style>
