<template>
  <div class="list-wrapper">

    <a href="#"
       v-show="!isShown"
       @click="isShown = !isShown">Вывести разноцветный список</a>
    <p>разный фон строк - директива classBuilder <br /> рамка вокруг блока - директива afterLoop</p>

    <div v-if="isShown"
         v-for="(task, i) in taskList"
         :key="task.id"
         v-after-loop="{arr: taskList, index: i, func: makeBorder, border: '1px solid silver'}">

      <div class="colored"
           v-class-builder="{id: task.id, classPattern: task.currentClass}">
        {{ task.name }}
      </div>

    </div>
  </div>

</template>


<script>
import afterLoop from './Directives/afterLoop'
import classBuilder from './Directives/classBuilder'
export default {
  name: 'Directives',
  directives: {
    afterLoop,
    classBuilder
  },
  data () {
    return {
      taskList: [{
        id: 0,
        name: "Lorem ipsum",
        currentClass: 'color'
      }, {
        id: 1,
        name: "dolor sit amet",
        currentClass: 'color'
      }, {
        id: 2,
        name: "consectetur adipiscing elit",
        currentClass: 'color'
      }, {
        id: 3,
        name: "sed do eiusmod tempor",
        currentClass: 'color'
      }, {
        id: 4,
        name: "incididunt ut labore",
        currentClass: 'color'
      }, {
        id: 5,
        name: "et dolore magna aliqua",
        currentClass: 'color'
      }],
      listSmall: false,
      isShown: false,
    }
  },
  methods: {

    // по окончании цикла, который выводит элементы списка, применяет к родительскому элементу обводку
    makeBorder(el, style) {
      el.style.border = style;
      el.style.padding = '10px';
    }
  }
}
</script>

<style scoped>
.list-wrapper {
  margin: 50px 0;
}
.colored {
  padding: 10px;
}
.color-1 {
  background-color: rgba(82, 183, 144, 0.3);
}
.color-2 {
  background-color: rgba(250, 235, 215, 0.5);
}
.color-3 {
  background-color: rgba(100, 149, 237, 0.3);
}
.color-4 {
  background-color: rgba(255, 127, 80, 0.3);
}
.color-5 {
  background-color: rgba(169, 169, 169, 0.5);
}
.color-6 {
  background-color: rgba(189, 183, 107, 0.3);
}

</style>
