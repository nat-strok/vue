<template>
  <div class="task-cards-box">

    <div v-if="customList().length">
      <h3>Список задач</h3>

      <div :class="['show-row', hideShowRow]" @click="showRow.state = !showRow.state">
        <span v-html="showRow.state ? showRow.textCol : showRow.textRow"></span>
      </div>

      <c-input type="text"
               v-model="searchedText"
               placeholder="Поиск">
        <template v-slot:btn>
          <button @click="searchedText=''">Очистить поиск</button>
        </template>
      </c-input>

      <div class="type-sort">
        <p>Сортировать по цвету</p>
        <span v-for="item in colors" :key="item.name"
              :class="['type-btn-sort', item.name, item.isActive ? 'active' : '']"
              @click="item.isActive = !item.isActive">
        </span>
      </div>
    </div>

    <div v-else>Здесь пока нет задач</div>

    <div :class="[showRow.state ? showRow.row : showRow.col]">
      <div v-for="task in searchedList(filteredList())" :key="task.id" class="card">
        <transition name="fade" tag="div" appear>
          <task-card :task="task" />
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
import CInput from "@/components/forms/CInput";
import TaskCard from "@/components/TaskCard";
import {mapState} from 'vuex';

export default {
  name: 'TaskCardWrapper',
  components: {
    CInput,
    TaskCard
  },
  computed: {
    ...mapState({
      todos: state => state.todos.todos,
      activeId: state => state.users.activeId
    }),
  },
  data() {
    return {
      showRow: {
        state: false,
        textRow: 'Показывать в виде строк',
        textCol: 'Показывать в одну колонку',
        col: "tasks-in-column",
        row: "tasks-in-row",
      },
      hideShowRow: '',
      colors: {
        red: {
          isActive: true,
          name: 'red'
        },
        yellow: {
          isActive: true,
          name: 'yellow'
        },
        green: {
          isActive: true,
          name: 'green'
        },
        white: {
          isActive: true,
          name: 'default'
        }
      },
      searchedText: ""
    }
  },
  methods: {

    // выводит отфильтрованные списки в зависимости от того, какая страница - с выполненными или невыполненными задачами
    // customList() {
    //   return this.todos.filter(item => item.userId === this.activeId && !item.isDone);
    // },
    customList() {
      if (this.$route.path === "/todos") {
        return this.todos.filter(item => item.userId === this.activeId && !item.isDone);
      } else if (this.$route.path === "/todos-completed") {
        return this.todos.filter(item => item.userId === this.activeId && item.isDone);
      }
    },

    // перебирает объект color, собирает в массив названия цветов, которые isActive
    // (изначально все isActive, по клику на кнопку это свойство переключается true/false)
    // используется в filteredList
    activeColors() {
      let colorArr = [];
      for (let key in this.colors) {
        if (this.colors[key].isActive) colorArr.push(this.colors[key].name);
      }
      return colorArr;
    },

    // проверяет, содержит ли принимаемое выражение value инпута (в дальнейшем используется для searchedList)
    isFind(item) {
      return String(item.toLowerCase()).indexOf(this.searchedText.toLowerCase()) !== -1;
    },

    // фильтр по цвету задачи
    // перебирает результат функции customList(), если есть совпадения поля colorType с элементами массива - такие элементы выводятся
    filteredList() {
      return this.customList().filter(item => {
        if (this.activeColors().includes(item.colorType)) return item;
      })
    },

    // фильтрует массив объектов в зависимости от того, содержат ли свойства объектов заданное выражение
    // поиск производится только по полям name и description
    searchedList(arr) {
      return arr.filter((item) => {
        if (this.searchedText === "") return item;
        if (this.isFind(item.name) || this.isFind(item.description)) return item;
      })
    },

    // при ширине экрана, меньшей чем 700px, скрывает ссылку по которой можно переключить отображение карточек в строку/колонку
    handleResizeShow() {
      this.hideShowRow = window.matchMedia('(max-width: 700px)').matches
          ? 'hide' : ''
    }
  },

  // навешивает слушатель события, который при изменении размера экрана вызывает функцию handleResizeShow
  mounted() {
    this.handleResizeShow()
    window.addEventListener('resize', this.handleResizeShow)
  },
  // убирает EventListener 'resize'
  destroyed() {
    window.removeEventListener('resize', this.handleResizeShow)
  }
}
</script>

<style scoped>
.task-cards-box {
  position: relative;
}

.show-row {
  position: absolute;
  top: 4px;
  right: 0;
  color: var(--blue-link);
  cursor: pointer;
}

.show-row.hide {
  display: none;
}

.card {
  min-width: 300px;
  gap: 0;
}

.tasks-in-column,
.tasks-in-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

.tasks-in-column {
  flex-direction: column;
}

.tasks-in-row {
  flex-direction: row;
  flex-wrap: wrap;
}

.type-sort {
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  gap: 20px;
  padding: 20px 0 30px;
}

.type-sort p {
  width: 100%;
  text-align: center;
  margin: 0;
}

.type-btn-sort {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: var(--border-thin);
  position: relative;
}

.type-btn-sort.active::after {
  position: absolute;
  content: "";
  top: 5px;
  left: 5px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.2);
}

.green {background-color: #52b790; border-color: #52b790;}
.yellow {background-color: gold; border-color: gold;}
.red {background-color: tomato; border-color: tomato;}

.type-btn-sort.active {
  transform: scale(1.4);
}

</style>
