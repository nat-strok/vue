<template>
  <div>

    <h2>1. HOC</h2>

    <form>
      <input type="text" v-model="fields.firstField">
      <input type="text" v-model="fields.secondField">
      <btn-log :inputValue="fields" @resetForm="resetInputs">Сохранить</btn-log>
    </form>

  </div>
</template>

<script>

import CButton from './global/CButton'
import { BtnLog } from './hoc/BtnLog'

export default {
  name: 'Hoc',
  components: {
    BtnLog: BtnLog(CButton)
  },
  data() {
    return {
      fields: {
        firstField: "",
        secondField: "",
      }
    }
  },
  methods: {

    // обнуление полей формы после отправки данных
    resetInputs() {
      this.fields = {
        firstField: "",
        secondField: "",
      }
    }
  }
}
</script>

<style scoped>

</style>