const ContactForm = {
    name: 'ContactForm',
    props: ['initId'],
    data() {
        return {
            name: null,
            surname: null,
            phone: null,
            url: null,
            id: null,
        }
    },
    computed: {

        // проверяет, что хотя бы одно из полей заполнено
        // проверяется в onSubmit и используется для выведения сообщения о необходимости ввести данные
        isNotEmpty: function() {
            return !!(this.name || this.surname || this.phone || this.url);
        }
    },
    methods: {

        // создает новый объект и передает его в родительский элемент
        onSubmit() {
            if (this.isNotEmpty) {
                let newContact = {
                    name: this.name,
                    surname: this.surname,
                    phone: this.phone,
                    url: this.url,
                    id: this.initId
                };
                this.$emit('submitContact', newContact);
                this.name = null;
                this.surname = null;
                this.phone = null;
                this.url = null;
                this.id = null
            }
        },
    },
    template: `   
   <form v-on:submit.prevent="onSubmit">
      <div class="contact-form">
        <input v-model="name" placeholder="name">
        <input v-model="surname" placeholder="surname">
        <input v-model="phone" placeholder="phone">
        <input v-model="url" placeholder="url">
      </div>      
      <div>
        <input type="submit" value="Добавить контакт">
        <span v-show="!isNotEmpty">Введите данные</span>
      </div>    
    </form>
  `
}