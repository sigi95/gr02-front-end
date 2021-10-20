import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue';
import Home from './components/Home.vue'
import Tours from './components/Tours.vue'


const routes = [
  {
    path: '/',
    name: 'root',
    component: App
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/tours',
    name: 'tours',
    component: Tours
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
