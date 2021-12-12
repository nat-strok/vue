const users = 'users',
    counter = 'usersCount',
    id = 'activeId',
    todos = 'todos',
    todosCount = 'todosCount',
    todosHistory = 'todosHistory';

const localStrg = {

    getUsers() {
        return JSON.parse(localStorage.getItem(users))
    },
    getCounter() {
        return JSON.parse(localStorage.getItem(counter))
    },
    getActiveId() {
        return JSON.parse(localStorage.getItem(id))
    },
    getTodos() {
        return JSON.parse(localStorage.getItem(todos))
    },
    getTodosCount() {
        return JSON.parse(localStorage.getItem(todosCount))
    },
    getHistory() {
        return JSON.parse(localStorage.getItem(todosHistory))
    },

    updateActiveId(data) {
        localStorage.setItem(id, JSON.stringify(data));
    },
    updateUsers(dataUser, dataCounter) {
        localStorage.setItem(users, JSON.stringify(dataUser));
        localStorage.setItem(counter, JSON.stringify(dataCounter));
    },
    updateTodosCount(data) {
        localStorage.setItem(todosCount, JSON.stringify(data));
    },
    updateTodos(dataTodos, dataHistory) {
        localStorage.setItem(todos, JSON.stringify(dataTodos));
        localStorage.setItem(todosHistory, JSON.stringify(dataHistory));
    }
}

export default localStrg