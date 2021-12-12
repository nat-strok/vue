import localStrg from '@/api/localStrg'

import {
  SET_TODOS,
  SET_TODOS_COUNTER,
  SET_TODO_ADD_NEW,
  SET_TODO_DELETE,
  SET_TODO_EDIT_CONTENT,
  SET_TODO_TYPE,
  SET_TODO_DONE,
  SET_HISTORY,
  SET_NEW_HISTORY
} from '@/types/mutations';

import {
  A_UPDATE_TODOS
} from '@/types/actions';

export default ({
  state: {
    todos: [],
    todosCount: 6,
    todosHistory: []
  },
  getters: {
    currentTasksList(state, getters, rootState) {
      return state.todos.filter(item => {
        if (item.userId === rootState.users.activeId && !item.isDone) return item;
      });
    },
    doneTasksList(state, getters, rootState) {
      return state.todos.filter(item => {
        if (item.userId === rootState.users.activeId && item.isDone) return item;
      });
    },
  },
  mutations: {
    [SET_TODOS](state, payload) {
      state.todos = payload;
    },
    [SET_TODOS_COUNTER](state, payload) {
      state.todosCount = payload;
    },
    [SET_HISTORY](state, payload) {
      state.todosHistory = payload;
    },

    // добавляет в массив todos новую задачу
    [SET_TODO_ADD_NEW](state, payload) {
      state.todos.push(payload);
    },

    // фильтрует массив todos так, чтобы он не содержал удаляемую задачу
    [SET_TODO_DELETE](state, payload) {
      state.todos = state.todos.filter(item => item.id !== payload.id);
    },

    // находит в массиве todos по id переданный из компонента объект
    // заменяет значения редактируемых полей и поля isEdited
    // поскольку сам факт того, что хоть одно из полей было изменено, проверяется в компоненте,
    // мне показалось, что здесь проще перезаписать все, а не проверять, какое именно из полей поменялось
    [SET_TODO_EDIT_CONTENT](state, payload) {
      state.todos.forEach((item) => {
        if (item.id === payload.id) {
          item.name = payload.name;
          item.description = payload.description;
          item.img = payload.img;
          item.isEdited = true;
        }
      });
    },

    // меняет значение поля type на принятое из компонента
    [SET_TODO_TYPE](state, payload) {
      state.todos.forEach((item) => {
        if (item.id === payload.id) {
          item.type = payload.type;
        }
      });
    },

    // меняет значение поля isDone на противоположное
    [SET_TODO_DONE](state, payload) {
      state.todos.forEach((item) => {
        if (item.id === payload.id) {
          item.isDone = !item.isDone;
        }
      });
    },

    // составляет объект newEvent и добавляет его в массив todosHistory
    // имя пользователя берет из модуля users
    // тип действия и объект задачи принимает в payload
    // в поле date добавляет дату
    // добавляет новый элемент в начало массива
    [SET_NEW_HISTORY](state, payload) {
      let newEvent = {
        user: this.getters.activeUser.name,
        action: payload.action,
        todo: payload.item,
        date: new Date().toLocaleString()
      };
      state.todosHistory.unshift(newEvent);
    }
  },
  actions: {
    [A_UPDATE_TODOS]({commit, state}, params) {
      switch (params.act) {
        case 'add':
          commit(SET_TODO_ADD_NEW, params.task);
          commit(SET_TODOS_COUNTER, params.counter);
          commit(SET_NEW_HISTORY, {item: params.task, action: ' добавил задачу '});
          localStrg.updateTodosCount(state.todosCount);
          break;
        case 'delete':
          commit(SET_TODO_DELETE, params.task);
          commit(SET_NEW_HISTORY, {item: params.task, action: ' удалил задачу '});
          break;
        case 'edit':
          commit(SET_TODO_EDIT_CONTENT, params.task);
          commit(SET_NEW_HISTORY, {item: params.task, action: ' отредактировал задачу '});
          break;
        case 'type':
          commit(SET_TODO_TYPE, params.task);
          let newType;
          if (params.task.type === 'red') {
            newType = 'красный';
          } else if (params.task.type === 'yellow') {
            newType = 'желтый';
          } else if (params.task.type === 'green') {
            newType = 'зеленый';
          } else {
            newType = 'нейтральный';
          }
          commit(SET_NEW_HISTORY, {item: params.task, action: ` поменял тип на "${newType}" в задаче `});
          break;
        case 'done':
          commit(SET_TODO_DONE, params.task);
          if (params.task.isDone) {
            commit(SET_NEW_HISTORY, {item: params.task, action: ' отметил выполненной задачу '});
          } else {
            commit(SET_NEW_HISTORY, {item: params.task, action: ' отметил невыполненной задачу '});
          }
          break;
      }
      localStrg.updateTodos(state.todos, state.todosHistory);
    },
  },
  modules: {}
});