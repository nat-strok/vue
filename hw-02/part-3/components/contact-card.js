const ContactCard = {
  name: 'ContactCard',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDelete(i) {
      this.$emit('deleteById', i)
    }
  },
  template: `
  <div class="contact-card">
      <div><strong>{{ contact.name }}</strong></div>
        <div>{{ contact.surname }}</div>
        <div>{{ contact.phone }}</div>
        <img :src=contact.url width="50">
        <button v-on:click="onDelete(contact.id)" 
                class="delete-btn" 
                type="button">Удалить</button>
  </div>  
  `
}