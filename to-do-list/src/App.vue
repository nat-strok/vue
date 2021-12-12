<template>

  <div id="outer">
    <div :class="['theme-line', customTheme ? 'coral' : 'green']" @click="changeTheme">{{ customTheme ? "Включить розовую тему" : "Включить зеленую тему" }}</div>
    <theme>
      <div id="app">
        <router-view name="sidebar"/>
        <div id="content">
          <router-view name="menu"/>
          <router-view name="logout"/>
          <transition name="fade" tag="div" appear>
            <router-view/>
          </transition>
        </div>
      </div>
    </theme>
  </div>

</template>

<script>
import router from './router'
import {A_CHANGE_THEME, A_SAVE_INIT_DATA} from "@/types/actions";
import Theme from "@/theme/Theme";
import {mapState} from 'vuex';

export default {
  name: 'App',
  components: {
    Theme
  },
  computed: {
    ...mapState({
      customTheme: state => state.theme
    })
  },
  data() {
    return {
      routs: router.options.routes,
    }
  },
  methods: {
    changeTheme() {
      this.$store.dispatch(A_CHANGE_THEME, !this.customTheme);
    }
  },
  beforeCreate() {
    this.$store.dispatch(A_SAVE_INIT_DATA);
  }
}
</script>

<style>
* {box-sizing: border-box;}

body {
  margin: 0;
  overflow-x: hidden;
}

body::-webkit-scrollbar {
  width: 7px;
  background-color: var(--grey-light);
}

body::-webkit-scrollbar-thumb {
  width: 7px;
  background-color: var(--grey);
}

#outer {
  position: relative;
}

.theme-line {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: var(--size-primary);
  font-weight: bold;
  width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  height: 30px;
  text-align: right;
  padding: 0 20px;
  line-height: 30px;
  cursor: pointer;
  color: var(--black);
  background-color: var(--main-color-light);
  z-index: 1;
}

.green {
  --main-color-primary: #52b790;
  --main-color-med: #97d4bc;
  --main-color-light: #bae2d3;
  --main-color-extralight: #eef8f4;
  --rad-round: 9999px;
}

.coral {
  --main-color-primary: #ff7f50;
  --main-color-med: #ffb296;
  --main-color-light: #ffccb9;
  --main-color-extralight: #fff2ee;
  --rad-round: 10px;
}

:root {
  --grey-dark: rgb(102, 102, 102);
  --grey: rgba(192, 192, 192, 0.7);
  --grey-light: rgba(230, 230, 230, 1);;
  --grey-extralight: rgba(242, 242, 242, 1);
  --blue-primary: rgba(44, 62, 80, 1);
  --white: #fff;
  --black: #000;
  --blue-link: #245480;
  --red-error: darkred;
  --border-thin: 1px solid rgba(0, 0, 0, .4);
  --size-primary: 16px;
  --size-med: 14px;
  --size-small: 13px;
  --rad: 3px;
}

#app {
  margin-top: 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--size-primary);
  text-align: left;
  color: var(--blue-primary);
  position: relative;
  width: 100vw;
}

#content {
  display: block;
  padding: 20px;
  max-width: calc(100% - 40px);
  margin: 0 0 0 auto;
}

.sidebar.desktop-sidebar:not(.hide) + #content,
.sidebar.mobile-sidebar.hide + #content {
  max-width: calc(100% - 220px);
}

.sidebar.mobile-sidebar.hide + #content {
  display: none;
}

h1,
.head {
  font-size: 24px;
  text-align: center;
  padding-bottom: 20px;
}

.btn,
button {
  display: inline-block;
  font-size: var(--size-med);
  color: var(--black);
  border-radius: var(--rad);
  border: var(--border-thin);
  outline: none;
  padding: 5px 6px;
  min-width: 100px;
  text-align: center;
  text-decoration: none;
  background-color: var(--grey-light);
  box-shadow: 1px 1px 3px rgba(26, 23, 20, .2);
  cursor: pointer;
  transition: all 0.4s ease;
}
.btn:hover,
button:hover {
  background-color: var(--grey-extralight);
}

a {
  color: var(--blue-link);
  text-decoration: underline;
  cursor: pointer;
}
a:hover {text-decoration: none;}

.popup a {
  display: inline-block;
  margin-top: 20px;
  font-size: var(--size-med);
}

.input-lane {
  display: flex;
  column-gap: 20px;
  margin-top: 15px;
  text-align: left;
}

.input-lane label {
  display: flex;
  flex: 1;
  flex-flow: wrap row;
  justify-content: space-between;
  align-items: center;
  gap: 10px 20px;
  font-size: var(--size-med);
}
.input-lane span {
  min-width: 90px;
  max-width: 90px;
  text-align: left;
}

.input-lane input {
  border-radius: var(--rad);
  border: var(--border-thin);
  flex: 1 0 180px;
  padding: 5px;
}

.popup .input-lane input {
  max-width: calc(100% - 100px);
}

p.error {
  color: var(--red-error);
  min-height: 18px;
  margin: 6px 0;
  font-size: var(--size-small);
}

.fade-enter-active, .fade-live-active {transition: opacity .3s;}
.fade-enter, .fade-leave-to {opacity: 0;}
</style>
