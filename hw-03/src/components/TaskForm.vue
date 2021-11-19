<template>

  <form v-on:submit.prevent="onSubmit">
    <h3>Добавить задачу:</h3>
    <div>
      <input type="text" v-model="newTask.name" placeholder="Название задачи">
      <input type="text" v-model="newTask.description" placeholder="Описание задачи">
      <input type="text" v-model="newTask.img" placeholder="Ссылка на картинку">
    </div>
    <div>
      <button type="submit">Добавить</button>
      <br/>
      <p v-show="!notEmpty">Заполните все поля</p>
    </div>
  </form>

</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    idTaskCount: '',
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newTask: this.task,
      notEmpty: true,
    }
  },
  methods: {

    // проверяет, что все поля формы заполнены
    // если нет, меняет значение notEmpty и показывается сообщение "Заполните все поля"
    // передает объект со значениями из формы и событие add
    // очищает поля формы
    onSubmit() {
      if ((this.newTask.name && this.newTask.description && this.newTask.img)) {
        this.notEmpty = true;
        this.$emit('update:task', this.newTask);
        this.$emit('add');
        this.newTask = {};
      } else {
        this.notEmpty = false;
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
