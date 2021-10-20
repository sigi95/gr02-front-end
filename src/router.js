import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue';
import Home from './components/Home.vue'


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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
