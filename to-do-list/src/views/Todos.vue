<template>
  <div class="container">

    <div :class="['task-form-box', customTheme ? green.main : coral.main]">
      <div @click="addNew = !addNew"
            v-html="addNew ? 'Скрыть форму добавления задач' : 'Создать задачу'"
            :class="['task-form-link', addNew ? 'close' : 'open']"></div>
      <div v-show="addNew">
        <task-form />
      </div>
    </div>

    <task-card-wrapper />

  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm";
import TaskCardWrapper from "@/components/TaskCardWrapper";
import {mapState} from "vuex";

export default {
  name: 'Todos',
  inject: ['green', 'coral'],
  computed: {
    ...mapState({
      customTheme: state => state.theme
    })
  },
  components: {
    TaskForm,
    TaskCardWrapper
  },
  data() {
    return {
      addNew: false
    }
  },
}
</script>

<style scoped>
.task-form-box {
  background-color: var(--main-color-extralight);
  margin: 30px 0 40px;
  position: relative;
}

.task-form-link {
  background-color: var(--main-color-light);
  font-weight: bold;
  cursor: pointer;
  padding: 15px 20px;
}
.task-form-link::before {
  position: absolute;
  display: block;
  content: "\2039";
  top: 15px;
  right: 20px;
  width: 20px;
  height: 20px;
  border-radius: var(--rad-round);
  background-color: rgba(50, 50, 50, 0.5);
  font-size: 24px;
  font-weight: lighter;
  text-align: center;
  line-height: 16px;
  color: var(--white);
}

.task-form-link.open::before {
  transform: rotate(-90deg);
}

.task-form-link.close::before {
  transform: rotate(90deg);
}

</style>
