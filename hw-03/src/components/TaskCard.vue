<template>
  <div class="task-card">

    <div v-show="task.isDone" class="green">{{ "Выполнено" }}</div>

    <img :src=task.taskImg width="50" height="50" alt="">
    <div v-show="!isEditing">{{ 'Задача: ' + task.taskName }}</div>
    <div v-show="!isEditing">{{ 'Описание: ' + task.taskDescription }}</div>

    <div v-show="isEditing">
      <div class='field'>
        <label>Название задачи</label>
        <input type='text' v-model="task.taskName">
        <div class='field'>
          <label>Описание задачи</label>
          <input type='text' v-model="task.taskDescription">
        </div>
        <div>
          <button @click="editTask(task.taskId)" class="btn-small">Сохранить</button>
          <button @click="isEditing = false" class="btn-small">Отмена</button>
        </div>
      </div>
    </div>

    <div>{{ "Создана: " + task.taskDate }}</div>

    <div v-show="task.isEdited">{{ "Отредактировано" }}</div>
    <button @click="deleteTask(task.taskId)">Удалить</button>
    <button @click="isEditing = true">Редактировать</button>
    <button @click="toggleDone(task.taskId)">Выполнено</button>


  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  data() {
    return {
      isEditing: false
    }
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {

    // передает в родительский компонент ID элемента, который выбран для удаления
    deleteTask(id) {
      this.$emit('deleteTask', id);
    },

    // передает в родительский компонент ID элемента, который выбран как выполненный (или наоборот - в зависимости от его исходного состояния)
    toggleDone(id) {
      this.$emit('toggleDone', id);
    },

    // завершает редактирование задачи (форма редактирования выводится по нажатию на кнопку Редактировать)
    // в родительский компонент передается ID измененной задачи
    // меняет значение isEditing на false (соответственно, скрывается форма редактирования), а поле задачи task.isEdited - на true (соответственно, задача отмечается отредактированной
    // здесь хорошо бы еще было сделать проверку, были ли реально внесены изменения в текст элемента, и отмечать его отредактированным только в случае, когда они были
    // но не хватило времени(
    editTask(task) {
      this.isEditing = false;
      this.task.isEdited = true;
      this.$emit('editTask', (task));

    }
  }
}
</script>

<style scoped>
.task-card {
  margin: 0 auto;
  padding: 20px 10px;
  max-width: 310px;
  box-sizing: border-box;
}

.green {
  color: white;
  font-weight: bold;
  display: block;
  padding: 3px;
  background-color: #52b790;
  max-width: 120px;
  margin: 10px auto;
  border-radius: 2px;
}

.btn-small {
  text-transform: none; padding: 3px;}
</style>
