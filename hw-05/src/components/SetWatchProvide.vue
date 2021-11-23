<template>
  <div class="wrapper">

    <h2>2. Методы наблюдения & 3.Provide/injection</h2>

    <button @click="customTheme = !customTheme">{{ customTheme ? "Включить серую тему" : "Включить синюю тему" }}</button>
    <blue-theme>

      <c-form-n :customTheme="customTheme">

        <c-input v-model="defaultData.name" :customTheme="customTheme" />
        <c-input v-model="defaultData.age" :customTheme="customTheme" />

        <c-button @doSmtng="addInputs"
                  :customTheme="customTheme">{{ hideInputs ? "Еще фильтры" : "Скрыть фильтры" }}</c-button>

        <transition name="fade" appear>

          <div v-show="!hideInputs">
            <c-input v-model="defaultData.mobile" :customTheme="customTheme" />
            <c-input v-model="defaultData.address" :customTheme="customTheme" />
            <c-input v-model="defaultData.comment" :customTheme="customTheme" />
          </div>

        </transition>

      </c-form-n>

      <div class="results">
        <p v-if="counter">{{ "Измененных полей: " + counter }}</p>

        <c-button  v-if="counter"
                   @doSmtng="resetInputs"
                  :customTheme="customTheme">{{ "Обнулить значения" }}</c-button>

      </div>

    </blue-theme>

  </div>
</template>

<script>
import CInput from './provideInjection/CInput'
import CFormN from './provideInjection/CFormN'
import CButton from './provideInjection/CButton'
import BlueTheme from "./provideInjection/BlueTheme";

const initialData = {
  name: "Any Name",
  age: "120"
};

export default {
  name: 'SetWatchProvide',
  components: {
    CFormN,
    CInput,
    CButton,
    BlueTheme
  },
  data() {
    return {
      defaultData: Object.assign({}, initialData),
      isChanged: false,
      counter: 0,
      hideInputs: true,
      customTheme: false
    }
  },
  methods: {

    // обнуляет поля формы
    resetInputs() {
      this.defaultData = Object.assign({}, initialData);
      this.isChanged = false;
      this.counter = 0;
      this.hideInputs = true;
    },

    // добавляет изначально не прописанные поля в объект с помощью set
    // переключает свойство, отвечающее за то, чтобы эти поля были видны на форме
    addInputs() {
      if (!this.defaultData.hasOwnProperty('mobile')) {
        this.$set(this.defaultData, 'mobile', '');
        this.$set(this.defaultData, 'address', '');
        this.$set(this.defaultData, 'comment', '');
        this.hideInputs = false;
      } else {
        this.hideInputs = !this.hideInputs;
      }
    }
  },

  // проверяет, были ли изменены поля формы
  // перебирает соответствующие поля объекта и подсчитывает количество отличающихся от начального значения
  watch: {
    defaultData: {
      deep: true,
      handler: function (val) {
        this.counter = Object.keys(val).reduce((acc, el) => {
          if (!initialData[el] && val[el] || initialData[el] && val[el] !== initialData[el]) {
            acc++;
          }
          return acc;
        }, 0);
      }
    }
  }
}
</script>

<style>
.btn-block * {
  margin: 10px;
}

.results {
  padding: 0 20px;
}

.wrapper {
  padding-bottom: 30px;
}

.blueclass {
  background-color: #2c3e50;
  padding: 5px 8px;
  border-radius: 6px;
  color: white;
  min-width: 120px;
}

.greyclass {
  background-color: silver;
  padding: 5px 8px;
  border-radius: 3px;
  color: black;
  min-width: 120px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>