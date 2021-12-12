import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Todos from '../views/Todos';
import TodosCompleted from '../views/TodosCompleted';
import Registration from '../views/Registration';
import Auth from '../views/Auth';
import Menu from '@/components/layout/Menu';
import EventBoard from '@/components/layout/EventBoard';
import LogOut from '@/components/layout/LogOut';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      menu: Menu,
      sidebar: EventBoard
    },
    children: [
      {
        path: '/auth',
        name: 'Auth',
        parent: '/',
        component: Auth
      },
      {
        path: '/registration',
        name: 'Registration',
        parent: '/',
        component: Registration
      }
    ]
  },
  {
    path: '/todos',
    name: 'Todos',
    components: {
      default: Todos,
      menu: Menu,
      sidebar: EventBoard,
      logout: LogOut
    },
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '/todos-completed',
    name: 'TodosCompleted',
    components:  {
      default: TodosCompleted,
      menu: Menu,
      sidebar: EventBoard,
      logout: LogOut
    },
    meta: {
      requiredAuth: true
    }
  },
  {
    path: '*',
    name: 'Page404',
    components: {
      default: () => import(/* webpackChunkName: "Page404" */ '../views/Page404'),
      menu: () => import(/* webpackChunkName: "Menu" */ '@/components/layout/Menu')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// проверяет, требует ли страница, чтобы пользователь был залогинен
// если страница только для залогиненных пользователей, а пользователь не залогинен, перенаправляет на попап аутентификации
// если пользователь залогинен и находится не на странице для залогиненных пользователей, перенаправляет его на 'Todos'
// (страницу 404 он не увидит, что бы ни вводил в адресной строке, считаем, что если уж вошел, то хочет пользоваться именно списком задач)
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('activeId') >= 0;

  if (to.meta.requiredAuth && !isAuth) next({name: "Auth"});
  else next();

  if (!to.meta.requiredAuth && isAuth) next({name: "Todos"});
  else next();
});


export default router
