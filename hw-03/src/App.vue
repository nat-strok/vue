<template>
  <div id="app">


    <div v-show="logIn">Вы вошли как <strong>{{ currentUser }}</strong></div>

    <button type="button"
            v-html="logIn ? popupBtn.textChange : popupBtn.textStart"
            v-on:click="popup.isActive = true">
    </button>

    <task-form v-show="logIn"
               :idTaskCount="usersData[curUs].idTaskCount"
               @add="addTask" />

    <div v-show="logIn" v-for="task in usersData[curUs].taskList" :key="task.id">

      <task-card :task="task"
                 @deleteTask="deleteTask"
                 @editTask="editTask"
                 @toggleDone="toggleDone" />

    </div>

    <popup-wrapper :popup="popup" v-show="popup.isActive">

      <!--          :pass.sync="newUserPassword"-->
      <login-popup
          :user.sync="newUserData"
          @submitUser="logInSubmit" />
      <div v-show="wrongUserData" class="error">Неверный логин или пароль</div>

    </popup-wrapper>

  </div>
</template>

<script>
import TaskForm from './components/TaskForm'
import TaskCard from './components/TaskCard'
import PopupWrapper from './components/PopupWrapper'
import LoginPopup from './components/LoginPopup'

export default {
  name: 'App',
  components: {
    TaskForm,
    TaskCard,
    PopupWrapper,
    LoginPopup
  },
  data() {
    return {
    usersData: [
      {
        userId: 0,
        userName: 'user1',
        userPassword: '1',
        idTaskCount: 2,
        taskList: [{
            taskId: 0,
            taskName: "Task 1 User1",
            taskDescription: "Task 1 User1 info",
            taskImg: "https://ru.vuejs.org/images/logo.png",
            taskDate: "11/17/2021, 11:37:39 PM",
            isEdited: false,
            isDone: false,
          }, {
            taskId: 1,
            taskName: "Task 2 User1",
            taskDescription: "Task 2 User1 info",
            taskImg: "https://ru.vuejs.org/images/logo.png",
            taskDate: "11/17/2021, 11:37:39 PM",
            isEdited: false,
            isDone: false,
          }]
      },
      {
        userId: 1,
        userName: 'user2',
        userPassword: '2',
        idTaskCount: 1,
        taskList: [{
          taskId: 0,
          taskName: "Task 1 User2",
          taskDescription: "Task 1 User2 info",
          taskImg: "https://ru.vuejs.org/images/logo.png",
          taskDate: "11/17/2021, 11:37:39 PM",
          isEdited: false,
          isDone: false,
        }],
      }],

      curUs: 1,
      currentUser: "",
      idUserCount: 2,
      logIn: false,
      wrongUserData: false,
      newUserData: {},

      popupBtn: {
        textStart: 'Залогиниться',
        textChange: 'Поменять пользователя'
      },
      popup: {
        isActive: true
      }
    }
  },
  mounted() {

    // получение данных из localStorage
    if (localStorage.getItem('usersData')) {
      try {
        this.usersData = JSON.parse(localStorage.getItem('usersData'));
      } catch(e) {
        console.log('Error');
      }
    }
  },
  watch: {

    // запись данных в localStorage при изменении usersData
    usersData: function () {
      localStorage.setItem('usersData', JSON.stringify(this.usersData));
    },
    deep: true
  },
  methods: {

    // используется в logInSubmit
    // принимает данные из login-popup и собирает их в объект новый пользователь
    // перезаписывает в curUs ID создаваемого ползователя (используется для обработки задач этого юзера)
    // перезаписывает счетчик ID пользователей, увеличивая его на единицу
    // пушит объект с новым пользователем в usersData
    // записывает имя пользователя в переменную currentUser
    createNewUser() {
      let newUser = {
        userId: this.idUserCount,
        userName: this.newUserData.name,
        userPassword: this.newUserData.password,
        idTaskCount: 0,
        taskList: []
      };
      this.curUs = this.idUserCount;
      this.idUserCount = this.idUserCount + 1;
      this.usersData.push(newUser);
      this.currentUser = newUser.userName;
    },

    // используется в logInSubmit
    // производит действия, которые нужны по окончании успешного завершения логина:
    // меняет значения переменных, в соответствии с которыми показывается или скрывается контент
    // и обнуляет значения переменных, которые принимали логин/пароль
    closeLoginForm() {
      this.wrongUserData = false;
      this.logIn = true;
      this.newUserData.name = null;
      this.newUserData.password = null;
      this.popup.isActive = false;
    },

    // логин с верификацией
    // проверяет, что данные получены
    // проверяет по массиву usersData, есть ли такой пользователь
    // если есть - проверяет, что пароль совпадает (если нет, ф-ция прерывается и перезаписываются переменные, которые показывают соответствующий контент)
    // если нет - создает нового пользователя (вызывается функция createNewUser)
    // вызывает функцию closeLoginForm, которая перезаписывает необходимые переменные
    logInSubmit() {
      if (this.newUserData.name && this.newUserData.password) {
        const index = this.usersData.findIndex(item => item.userName === this.newUserData.name);
        this.curUs = index;
        if (index >= 0) {
          if (this.usersData[index].userPassword !== this.newUserData.password) {
            this.wrongUserData = true;
            this.logIn = false;
            return false;
          }
          this.currentUser = this.usersData[index].userName;
        } else {
          this.createNewUser();
        }
        this.closeLoginForm();
      }
    },

    // добавление задачи
    // принимает объект из task-card и пушит его в массив задач активного пользователя
    // увеличивает на единицу счетчик для присвоения ID задачам того же пользователя
    addTask(value) {
      if (!value) return;
      this.usersData[this.curUs].taskList.push(value);
      this.usersData[this.curUs].idTaskCount += 1;
    },

    // удаление задачи
    // принимает из task-card ID задачи
    // фильтрует массив так, чтобы он не содержал задачу с принятым ID
    deleteTask(id) {
      this.usersData[this.curUs].taskList = this.usersData[this.curUs].taskList.filter(el => el.taskId !== id);
    },

    // переключение выполнено/не выполнено
    // принимает из task-card ID задачи
    // перебирает массив задач активного пользователя
    // в элементе с принятым ID меняет значение поля isDone на противоположное
    toggleDone(id) {
      this.usersData[this.curUs].taskList.forEach(el => {
        if (el.taskId === id) el.isDone = !el.isDone;
      });
    },

    // редактирование задачи
    // принимает из task-card ID задачи
    // перезаписывает в поля этой задачи новые значения
    editTask(val) {
      this.usersData[this.curUs].taskList.forEach((el, i) => {
        if (el.taskId === val.id) el[i] = val;
      });
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 2px;
  padding: 6px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin: 20px 10px;
  min-width: 120px;
  box-shadow: 3px 3px 5px rgba(26, 23, 20, .3);
  background-color: lightgrey;
  text-transform: uppercase;
  transition: all 0.4s ease;
}

button:hover {
  transform: scale(1.15);
}

input[type=text] {
  border: 1px solid rgba(0, 0, 0, .4);
  border-radius: 2px;
  padding: 6px;
  margin: 10px;
}

.error {
  color: darkred;
}



</style>