const ContactBtn = {
  name: 'ContactBtn',
  inheritAttrs: false,
  props: {
    typeBtn: Object
  },
  data() {
    return {
      title: this.typeBtn.title
    }
  },
  template: `
      <div>
        <button v-on:click="$emit('btnEvent')">{{ title }}</button>
      </div>
  `
}