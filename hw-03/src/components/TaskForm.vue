<template>

  <form v-on:submit.prevent="onSubmit">
    <h3>Добавить задачу:</h3>
    <div class="contact-form">
      <input type="text" v-model="taskName" placeholder="Название задачи">
      <input type="text" v-model="taskDescription" placeholder="Описание задачи">
      <input type="text" v-model="taskImg" placeholder="Ссылка на картинку">
    </div>
    <div>
      <button type="submit">Добавить</button> <br />
      <p v-show="!taskName || !taskDescription || !taskImg">Заполните все поля</p>
    </div>
  </form>

</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    idTaskCount: '',
  },
  data() {
    return {
      taskId: this.idTaskCount,
      taskName: null,
      taskDescription: null,
      taskImg: null,
      taskDate: null
    }
  },
  methods: {

    // создает новый объект и передает его в родительский элемент
    onSubmit() {
      if ((this.taskName && this.taskDescription && this.taskImg)) {
        let newTask = {
          taskId: this.idTaskCount,
          taskName: this.taskName,
          taskDescription: this.taskDescription,
          taskImg: this.taskImg,
          taskDate: new Date().toLocaleString(),
          isEdited: false,
          isDone: false
        };
        this.$emit('add', newTask);
        this.taskId = null;
        this.taskName = null;
        this.taskDescription = null;
        this.taskImg = null;
        this.taskDate = null
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
