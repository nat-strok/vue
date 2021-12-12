<template>

  <div :class="['sidebar', sideBarClass, showHistory ? '' : 'hide', customTheme ? green.main : coral.main]">
    <div class="btn-show"
         @click="showHistory = !showHistory"
         v-html="showHistory ? '&lsaquo;' : '&rsaquo;'">
    </div>

    <div class="container">
      <history/>
    </div>
  </div>

</template>

<script>
import History from "@/components/History";
import {mapState} from "vuex";
export default {
  name: 'EventBoard',
  components: {
    History
  },
  inject: ['green', 'coral'],
  computed: {
    ...mapState({
      customTheme: state => state.theme
    })
  },
  data() {
    return {
      showHistory: true,
      sideBarClass: 'desktop-sidebar'
    }
  },
  methods: {

    // меняет значение переменной sideBarClass в зависимости от ширины экрана
    // необходимо для того, чтобы на узком экране не показывался по умолчанию сайдбар,
    // т.к. это второстепенная информация и не должен перекрывать основной контент страницы
    handleResize() {
      this.sideBarClass = window.matchMedia('(max-width: 579px)').matches
          ? 'mobile-sidebar' : 'desktop-sidebar'
    }
  },

  // навешивает слушатель события, который при изменении размера экрана вызывает функцию handleResize
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  // убирает EventListener 'resize'
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.btn-show {
  position: absolute;
  display: block;
  top: 20px;
  right: -13px;
  width: 35px;
  height: 35px;
  border-radius: var(--rad-round);
  background-color: var(--main-color-primary);
  font-size: 42px;
  font-weight: lighter;
  text-align: center;
  line-height: 28px;
  color: var(--white);
  cursor: pointer;
}

.sidebar {
  position: fixed;
  top: 30px;
  left: 0;
  height: calc(100vh - 30px);
  padding-left: 20px;
  background-color: var(--main-color-extralight);
  border-right-width: 7px;
  border-right-style: solid;
  border-right-color: var(--main-color-extralight);
}

.sidebar.desktop-sidebar {
  width: 220px;
}

.sidebar.mobile-sidebar.hide {
  width: 95vw;
}

.sidebar.desktop-sidebar.hide .btn-show,
.sidebar.mobile-sidebar:not(.hide) .btn-show {
  right: -20px;
}

.sidebar.mobile-sidebar .btn-show {
  transform: rotate(180deg);
}

.sidebar.desktop-sidebar.hide,
.sidebar.mobile-sidebar:not(.hide) {
  width: 30px;
  padding: 0;
  border-right-width: 7px;
  border-right-style: solid;
  border-right-color: var(--main-color-extralight);
}

.sidebar.desktop-sidebar.hide .container,
.sidebar.mobile-sidebar:not(.hide) .container {
  display: none;
}

.container {
  height: 100%;
}
</style>