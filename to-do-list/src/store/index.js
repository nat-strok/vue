import Vue from 'vue';
import Vuex from 'vuex';
import users from './users';
import todos from './todos';
import testUser from "@/data/testUser";
import testTodos from "@/data/testTodos";
import localStrg from "@/api/localStrg";

import {
  A_SAVE_INIT_DATA,
  A_CHANGE_THEME
} from "@/types/actions";

import {
  SET_ACTIVE_ID,
  SET_COUNTER,
  SET_USERS,
  SET_TODOS,
  SET_TODOS_COUNTER,
  SET_HISTORY,
  SET_THEME
} from "@/types/mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: true
  },
  mutations: {
    [SET_THEME](state, payload) {
      state.theme = payload;
    },
  },
  actions: {
    // начальные данные
    // 1) если localStorage пуст: из файла testUser в LS отправляются данные тестового юзера и тестовый список задач, из vuex - счетчик ID пользователей и пустой activeId
    // 2) если в localStorage есть данные: данные из LS записываются во vuex с помощью соответствующих мутаций
    // отправку и подтягивание данных из LS вынесла в отдельный файл, потому что внутри действий и мутаций получалось громоздко, плохо читался код
    [A_SAVE_INIT_DATA]({ commit, state }) {
      if (!localStrg.getUsers() || !localStrg.getCounter()) {
        localStrg.updateActiveId(state.users.activeId);
        localStrg.updateTodosCount(state.todos.todosCount);
        localStrg.updateUsers(testUser, state.users.usersCount);
        localStrg.updateTodos(testTodos, state.todos.todosHistory);
      }
      commit(SET_ACTIVE_ID, localStrg.getActiveId());
      commit(SET_USERS, localStrg.getUsers());
      commit(SET_COUNTER, localStrg.getCounter());
      commit(SET_TODOS, localStrg.getTodos());
      commit(SET_TODOS_COUNTER, localStrg.getTodosCount());
      commit(SET_HISTORY, localStrg.getHistory());
    },

    [A_CHANGE_THEME]({ commit, state }, params) {
      commit(SET_THEME, params);
      }
  },
  modules: {
    users,
    todos}
})
