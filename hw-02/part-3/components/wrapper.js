const Wrapper = {
    name: 'Wrapper',
    components: {
        ContactForm,
        ContactBtn,
        ContactCard,
        ContactSearch
    },
    data() {
        return {
            createBtn: {
                isActive: true,
                title: 'Создать контакт',
            },
            initId: 0,
            contacts: [],
            value: ''
        }
    },
    methods: {

        // переключает ключ, по которому работает условие показа формы для добавления контакта
        openForm() {
            this.createBtn.isActive = false;
        },

        // добавление объекта
        // принимает объект из contact-form и пушит его в массив с контактами
        // переключает ключ, по которому работает условие показа формы для добавления контакта
        // увеличивает на едингицу переменную для ID контакта
        // обнуляет value инпута
        addContact(value) {
            this.contacts.push(value);
            this.createBtn.isActive = true;
            this.initId += 1;
            this.value = "";
        },

        // удаление объекта
        // принимает id контакта (определяется в contact-card)
        // перебирает массив с контактами и удаляет объект с заданным id
        deleteContact(id) {
            for (let i = this.contacts.length - 1; i >= 0; --i) {
                if (this.contacts[i].id === id) {
                    this.contacts.splice(i,1);
                }
            }
        },

        // проверяет, содержит ли принимаемое выражение value инпута (в дальнейшем используется для filtered)
        // поскольку создать объект можно, если заполнено хотя бы одно поле, сначала проверяет,что item не пустой
        isFind(item) {
            if (item) {
                return String(item.toLowerCase()).indexOf(this.value) !== -1;
            }
        }
    },
    computed: {

        // фильтрует массив контактов в зависимости от того, содержат ли свойства объектов заданное выражение
        filtered: function () {
            const val = this.value;
            return this.contacts.filter((obj) => {
                if (val === "") {
                    return obj;
                } else {
                    if (this.isFind(obj.name) || this.isFind(obj.surname) || this.isFind(obj.phone)) {
                        return obj;
                    }
                    return false;
                }
            })
        }
    },
    template: `
    <div>        
        <div class="add-contact">    
            
            <contact-btn :typeBtn="createBtn" 
                            v-if="createBtn.isActive" 
                            @btnEvent="openForm"></contact-btn> 
                                   
            <contact-form   v-else                              
                            :initId="initId"
                            @submitContact="addContact"></contact-form>
        
        </div>
                           
        <div v-if="!contacts.length" class="contacts">Пока нет ни одного контакта</div>
        <div v-else>
        
            <contact-search v-model="value""></contact-search>
            <br />
            <span v-show="value !== ''">Всего найдено: {{ filtered.length }}</span>
            <br /><br />

            <contact-card   v-for="contact in filtered"
                            :key="contact.id" 
                            :contact="contact"
                            :contacts="contacts" @deleteById="deleteContact"></contact-card>
        
        </div>

    </div>
  `
}