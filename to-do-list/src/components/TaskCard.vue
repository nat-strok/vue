<template>

    <div class="task-card" :class="task.colorType">

      <div v-if="task.isDone" class="green-done">{{ "Выполнено" }}</div>

      <div v-if="!isEditing">
        <img class="task-card-img" @error="replaceByDefault" :src=task.img width="40" height="40" alt="">
        <div class="task-card-name" v-html="task.name"></div>
        <div class="task-card-desc" v-html="task.description"></div>
      </div>

      <div v-else class="task-card-form">
        <c-input type="text" v-model="task.name">Название задачи:</c-input>
        <c-input type="text" v-model="task.description">Описание задачи:</c-input>
        <c-input type="text" v-model="task.img">Адрес картинки:</c-input>

        <div class="btns-small">
          <button @click="editTask">Сохранить</button>
          <button @click="isEditing = false">Отмена</button>
        </div>
      </div>

      <div class="tasks-type">
        <div v-for="item in taskType" :key="item.name"
             @click.stop="changeType(item)"
             v-bind:class="[item.name, item.name === task.colorType ? 'active' : '']">
        </div>
      </div>

      <div>
        <div class="task-card-small-txt">
          <span v-html="`Создано: ${task.taskDate}`"></span>
          <span v-show="task.isEdited" v-html="`, отредактировано`"></span>
        </div>

        <div class="task-card-btns">
          <button v-if="!isAction" @click="isAction = !isAction">Действия</button>

          <div v-else>
            <span class="btn" @click="deleteTask">&#10006;</span>
            <span class="btn" @click="changeBtns">&#9998;</span>
          </div>

          <button @click="toggleDone(task.id)" v-html="task.isDone ? taskToDone.no : taskToDone.yes"></button>
        </div>
      </div>

    </div>
</template>

<script>
import CInput from "@/components/forms/CInput";
import {A_UPDATE_TODOS} from "@/types/actions";

export default {
  name: 'TaskCard',
  components: {
    CInput
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isAction: false,
      defaultTask: Object.assign({}, this.task),
      taskToDone: {
        yes: '&#10004; Выполнено',
        no: '&#10006; Не выполнено'
      },
      taskType: {
        red: {name: 'red'},
        yellow: {name: 'yellow'},
        green: {name: 'green'}
      }
    };
  },
  methods: {

    // проверяет, загружается ли картинка по ссылке, если нет - подменяет ссылку на ссылку со стандартной картинкой
    replaceByDefault(e) {
      e.target.src = 'https://ru.vuejs.org/images/logo.png'
    },

    // меняет отображение кнопок (Действия - Удаление, Редактирование)
    changeBtns() {
      this.isEditing = true;
      this.isAction = !this.isAction;
    },

    // проверяет, есть ли изменения в редактируемых полях
    // используется в функции editTask
    isChanged(oldVal, newVal) {
      return oldVal.name !== newVal.name || oldVal.description !== newVal.description || oldVal.img !== newVal.img;
    },


    // следующие функции работают по одному принципу:
    // принимают объект задачи и передают в A_UPDATE_TODOS вместе со строкой, определяющей действие (для истории изменений)

    // удаление задачи
    deleteTask() {
      this.$store.dispatch(A_UPDATE_TODOS, {act: 'delete', task: this.task});
    },

    // переключение выполнено/не выполнено
    toggleDone() {
      this.$store.dispatch(A_UPDATE_TODOS, {act: 'done', task: this.task});
    },

    // изменение типа задачи (красный, желтый, зеленый)
    // проверяет, идентичен ли тип задачи тому, на который кликнули
    // если да - меняет тип на "default"
    // если нет - меняет на выбранный тип
    changeType(item) {
      if (this.task.colorType === item.name) {
        this.task.colorType = 'default';
      } else {
        this.task.colorType = item.name;
      }
      this.$store.dispatch(A_UPDATE_TODOS, {act: 'type', task: this.task});
    },

    // редактирование задачи
    // принимает объект task, проверяет, есть ли изменения
    // если есть - передает объект в A_UPDATE_TODOS
    // если нет - меняет значение isEditing на false (соответственно, скрывается форма редактирования)
    editTask() {
      if (this.isChanged(this.defaultTask, this.task)) {
        this.$store.dispatch(A_UPDATE_TODOS, {act: 'edit', task: this.task});
      }
      this.isEditing = false;
    },
  }
};
</script>

<style scoped>
.task-card {
  border: 1px solid silver;
  margin: 10px auto;
  padding: 20px 10px 15px 10px;
  max-width: 300px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.green-done {
  color: white;
  font-weight: bold;
  display: block;
  padding: 4px 10px;
  background-color: #52b790;
  margin: -21px -11px 21px;
  width: auto;
}

.btns-small {
  display: flex;
  justify-content: flex-start;
  column-gap: 20px;
  margin: 20px 0;
}
.btns-small button {
  text-transform: none;
  padding: 3px;
}

.task-card-img {
  float: left;
  margin: 0 10px 10px 0;
}

.task-card-name {
  font-weight: bold;
  margin-bottom: 2px;
}

.task-card-small-txt {
  font-size: var(--size-small);
  margin: 12px 0;
  padding-right: 20px;
}

.tasks-type {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  bottom: 5px;
  right: 0;
}

.tasks-type > div {
  width: 22px;
  height: 20px;
  border-radius: 25px 0 0 25px;
  margin-bottom: 10px;
  opacity: .4;
}

.tasks-type > div:hover {
  opacity: .8;
}

.tasks-type > div.active {
  opacity: 1;
  width: 32px;
  /*order: 1;*/
}

.tasks-type > div.green {background-color: var(--main-color-primary)}
.tasks-type > div.yellow {background-color: gold}
.tasks-type > div.red {background-color: tomato}

.task-card.green {background-color: var(--main-color-extralight)}
.task-card.yellow {background-color: rgba(255, 215, 0, 0.15)}
.task-card.red {background-color: rgba(255, 99, 71, 0.15)}

.task-card-btns {
  display: flex;
  justify-content: flex-start;
  column-gap: 20px;
  margin: 25px 30px 0 0;
}

.task-card-btns > div {
  display: flex;
  justify-content: flex-start;
  column-gap: 20px;
}

.task-card-btns span.btn {
  min-width: auto;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 22px;
  line-height: 30px;
}

.task-card-btns button {
  height: 30px;
}

</style>
