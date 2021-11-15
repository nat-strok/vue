const ContactSearch = {
  name: 'ContactSearch',
  props: {
    value: String
  },
  methods: {
    resetInput(event) {
      event.target.reset();
    }
  },
  template: `
    <form v-on:submit.prevent="resetInput">
        <label>
            <input type="text"
                    v-bind:value="value"
                    v-on:input="$emit('input', $event.target.value.toLowerCase())" 
                    placeholder="Введите данные">
        </label>
    </form>
  `
}