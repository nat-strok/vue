import localStrg from '@/api/localStrg'

import {
    SET_USERS,
    SET_COUNTER,
    SET_ACTIVE_ID,
    SET_USERS_ADD_NEW,
    SET_TEST_USER
} from '@/types/mutations'

import {
    A_LOGIN,
    A_REG_NEW_USER,
    A_SET_TEST_USER
} from '@/types/actions';

export default ({
    state: {
        users: [],
        usersCount: 1,
        activeId: '',
    },
    getters: {
        activeUser: state => {
            const index = state.users.findIndex(item => item.id === state.activeId);
            return state.users[index];
        }
    },
    mutations: {
        [SET_USERS](state, payload) {
            state.users = payload;
        },
        [SET_COUNTER](state, payload) {
            state.usersCount = payload;
        },
        [SET_ACTIVE_ID](state, payload) {
            if (payload >= 0) {
                state.activeId = payload;
            } else {
                state.activeId = '';
            }
        },
        [SET_USERS_ADD_NEW](state, payload) {
            state.users.push(payload);
        },
        [SET_TEST_USER](state, payload) {
            state.activeId = payload;
        }

    },
    actions: {

        // логин существующего пользователя
        // принимает ID пользователя, который логинится (или пустое значение, если пользователь нажал на кнопу выход)
        // меняет значение activeId во vuex и LS
        [A_LOGIN]({ commit, state }, params) {
            localStrg.updateActiveId(params.id);
            commit(SET_ACTIVE_ID, params.id);
        },

        // регистрация и логин нового пользователя
        // принимает объект, в котором объект с новым пользователем и обновленный счетчик для ID
        // пушит объект нового пользователя в массив users,
        // обновляет значения usersCount, activeId
        // все обновленные во vuex данные обновляет и в localStorage
        [A_REG_NEW_USER]({ commit, state }, params) {
            commit(SET_USERS_ADD_NEW, params.user);
            commit(SET_COUNTER, params.count);
            commit(SET_ACTIVE_ID, params.user.id);
            localStrg.updateActiveId(params.user.id);
            localStrg.updateUsers(state.users, params.count);
        },

        // логин под тестовым пользователем
        // устанавливает значение activeId равным 0 (ID тестового пользователя) по vuex и LS
        [A_SET_TEST_USER]({ commit }) {
            commit(SET_TEST_USER, 0);
            localStrg.updateActiveId(0);
        }
    }
})
