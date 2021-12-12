<template>

  <form class="task-form" @submit.prevent="onSubmit">
    <div>

      <c-input required
               type="text"
               v-model="newTask.name"
               placeholder="Название задачи"/>

      <c-input type="text"
               v-model="newTask.description"
               placeholder="Описание задачи"/>

      <c-input type="text"
               v-model="newTask.img"
               placeholder="Ссылка на картинку (JPG или PNG)"/>

    </div>
    <p class="error">
      <span v-show="wrongImgType">Формат изображения должен быть JPG или PNG. Если у вас нет подходящего изображения, оставьте это поле пустым</span>
    </p>
    <div>
      <button type="submit">Добавить</button>
    </div>
  </form>

</template>

<script>
import CInput from "@/components/forms/CInput"
import {mapState, mapGetters} from 'vuex';
import {A_UPDATE_TODOS} from "@/types/actions";

export default {
  name: 'TaskForm',
  components: {
    CInput
  },
  computed: {
    ...mapState({
    todosCount: store => store.todos.todosCount
    }),
    ...mapGetters([
        'activeUser'
    ])
  },
  data() {
    return {
      newTask: {
          id: "",
          userId: "",
          name: "",
          description: "",
          img: "",
          taskDate: "",
          type: "",
          isEdited: false,
          isDone: false,
        },
      wrongImgType: false
    }
  },
  methods: {

    // заполняет данные полей объекта, которые приходят не из формы
    // + проверяет, ввел ли пользователь урл картинки: если нет, подставляет заглушку
    completeTaskFields() {
      this.newTask.id = this.todosCount;
      this.newTask.userId = this.activeUser.id;
      this.newTask.img = !!this.newTask.img ? this.newTask.img : "https://ru.vuejs.org/images/logo.png";
      this.newTask.taskDate = new Date().toLocaleString();
      this.newTask.type = 'default';
      this.newTask.isEdited = false;
      this.newTask.isDone = false;
    },

    // проверяет расширение картинки
    isTrueImg(el) {
      let ext = el.split('?').shift().split('#').shift().split('.').pop();
      return ext === "jpg" || ext === "png";
    },

    // проверяет, что расширение файла в ссылке .png или .jpg (соответственно меняет переменную wrongImgType для вывода ошибки)
    // вызывает completeTaskFields (заполнение полей форм не из инпутов)
    // увеличивает на единицу счетчик для ID задач
    // передает данные во vuex (вызывает action A_UPDATE_TODOS)
    // очищает поля формы
    onSubmit() {
      if (!this.newTask.img || this.isTrueImg(this.newTask.img)) {
        this.wrongImgType = false;
        this.completeTaskFields();
        let newCount = this.todosCount + 1;
        this.$store.dispatch(A_UPDATE_TODOS, {act: 'add', task: this.newTask, counter: newCount});
        this.newTask = {};
      } else {
        this.wrongImgType = true;
      }
    }
  }
}
</script>

<style scoped>
.task-form {
  padding: 10px 20px 30px;
}
</style>
