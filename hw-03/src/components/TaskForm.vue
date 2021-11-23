<template>

  <form class="task-form" v-on:submit.prevent="onSubmit">
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
      <p v-show="wrongImgType">Формат изображение должен быть JPG или PNG</p>
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
      wrongImgType: false
    }
  },
  methods: {

    // проверяет, что все поля формы заполнены
    // HW-04: если да, проверяет, что расширение файла в ссылке .png или .jpg (соответственно меняет переменную wrongImgType для вывода ошибки)
    // если нет, меняет значение notEmpty и показывается сообщение "Заполните все поля"
    // передает объект со значениями из формы и событие add
    // очищает поля формы
    onSubmit() {
      if ((this.newTask.name && this.newTask.description && this.newTask.img)) {
        if (this.checkImg(this.newTask.img)) {
          this.notEmpty = true;
          this.wrongImgType = false;
          this.$emit('update:task', this.newTask);
          this.$emit('add');
          this.newTask = {};
        } else {
          this.wrongImgType = true;
          return;
        }
      } else {
        this.notEmpty = false;
        return;
      }
    },
    checkImg(el) {
      let ext = el.split('?').shift().split('#').shift().split('.').pop();
      return ext === "jpg" || ext === "png";
    }
  }
}
</script>

<style scoped>
.task-form {
  background-color: silver;
  padding: 10px 0;
  margin: 30px 0 40px;
}

</style>
