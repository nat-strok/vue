const GuestCard = {
  name: 'GuestCard',
  props: {
    guest: {
      type: Object,
      required: true,
      checked: Boolean
    },
    value: String
  },
  data() {
    return {
      arr: Array
    }
  },
  methods: {

    // подсветка найденного текста
    // принимает в себя содержимое v-html и переданное из родителя значение value
    // заменяет value на <strong>value</strong>
    highlight(text) {
      let check = new RegExp(this.value, "ig");
      return text.replace(check, function (matchedText, a, b) {
        return ('<strong>' + matchedText + '</strong>');
      });
    }
  },
  template: `
    <div class="guest-card">
        <label><input type="checkbox" 
                        v-model="guest.checked"
                        v-on:click="$emit('checked')" >
          <div class="guest-info">
            <p class="guest-name" v-html="highlight(guest.name)"></p>
            <p v-html="highlight(guest.company)"></p>
            <p v-html="highlight(guest.email)"></p>
            <p v-html="highlight(guest.phone)"></p>
            <p v-html="highlight(guest.address)"></p>
          </div>
        </label>
    </div>
  `
}