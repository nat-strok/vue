const GuestsWrap = {
  name: 'GuestsWrap',
  components: {
    GuestCard,
    GuestSearch,
    GuestBtnMore,
    GuestBtnActual
  },
  props: {
    title: {
      type: String,
      default: 'Guests list'
    }
  },
  data() {
    return {
      guests: guestsList,
      value: '',
      listDemo: guestsList,
      listDemoNumber: "",
      listDemoLength: 10
    }
  },
  methods: {

    // проверяет, содержит ли принимаемое выражение value инпута (в дальнейшем используется для filtered)
    // поскольку создать объект можно, если заполнено хотя бы одно поле, сначала проверяет,что item не пустой
    isFind(item) {
      if (item) {
        return String(item.toLowerCase()).indexOf(this.value) !== -1;
      }
    },

    // фильтрует массив контактов в зависимости от того, содержат ли свойства объектов заданное выражение
    // поиск производится только по полям, которые выводятся в карточке гостя
    // в переменную listDemoNumber передается длина списка (количество найденных объектов)
    guestListSearch(value) {
      const val = this.value;
      this.listDemo = this.guests.filter((obj) => {
        if (val === "") {
          return obj;
        } else {
          if (this.isFind(obj.name) || this.isFind(obj.company) || this.isFind(obj.email) || this.isFind(obj.phone) || this.isFind(obj.adress)) {
            return obj;
          }
          return false;
        }
      })
      this.listDemoNumber = this.listDemo.length;
    },

    // фильтрует массив контактов в зависимости от того, какая нажата кнопка - прибывшие или отсутствующие
    // при этом отключается поиск по строке (обнуляется значение value)
    // в переменную listDemoNumber передается длина списка (количество найденных объектов)
    guestListPresent(value) {
      this.value = '';
      this.listDemo = this.guests.filter(person => {
        if (value && person.checked) return person;
        if (!value && !person.checked) return person;
      });
      this.listDemoNumber = this.listDemo.length;
    },

    // добавляет в отмеченный чекбоксом объект поле checked и делает его реактивным
    checkGuest(guest) {
      if (guest.checked) {
        this.$set(this.guests, guest.checked, true)
      } else {
        this.$set(this.guests, guest.checked, false)
      }
    },
  },
  template: `
    <div class="container">
        <div>
            <div>
                <h1>{{title}}</h1>                
                <guest-search
                    v-model="value"
                    v-on:input="guestListSearch(value)"/>                    
                <guest-btn-actual
                    v-on:show-present="guestListPresent(true)"
                    v-on:show-absent="guestListPresent(false)"
                     />
                <span class="guest-number" 
                    v-show="this.listDemoNumber !== ''">Всего найдено: {{ this.listDemoNumber }}</span>
            </div>
            <div>
                <guest-card
                    v-for="guest in listDemo.slice(0, listDemoLength)"
                    :key="guest['_id']"
                    :guest="guest"
                    :value="value"
                    v-on:checked="checkGuest(guest)" 
                    />
            </div>
            <guest-btn-more
                :listDemoLength="listDemoLength"
                v-on:show-more="listDemoLength += 10"
                v-on:show-all="listDemoLength = listDemo.length"
                 />
        </div>
    </div>
  `
}