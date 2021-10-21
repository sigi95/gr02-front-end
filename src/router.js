import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue';

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import Tours from './components/Tours.vue'
import AddTour from './components/AddTour.vue'

const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    paht: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/tours',
    name: 'Tours',
    component: Tours
  },
  {
    path:'/tours/add/:id',
    name:'AddTour',
    component: AddTour
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
