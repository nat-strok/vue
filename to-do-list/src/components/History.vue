<template>

  <div class="history">
    <div v-for="(item, i) in history" :key="i">
      <hr>
      <p><span class="user">{{ item.user }}</span> {{ item.action }}<span class="task"> {{ item.todo.name }}</span> <br /> <span class="time">{{`(${item.date})`}}</span></p>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'History',
  components: {},
  computed: {
    ...mapState({
      history: state => state.todos.todosHistory,
      users: state => state.users.users
    })
  },
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style scoped>
.history {
  padding-top: 60px;
  font-size: var(--size-med);
  height: 100%;
  overflow-y: scroll;
  padding-right: 15px;
  /*padding-top: 20px;*/
}

.history::-webkit-scrollbar {
  width: 7px;
  background-color: var(--main-color-light);
}

.history::-webkit-scrollbar-thumb {
  width: 7px;
  background-color: var(--main-color-med);
}

.user {
  font-weight: bold;
}

.task {
  font-style: italic;
}

.time {
  font-size: var(--size-small);
}

hr {
  border-color: var(--main-color-extralight);
}
</style>
