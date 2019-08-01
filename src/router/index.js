// 定义router对象 导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'

Vue.use(VueRouter)

// 实例化对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // name 就是给当前路由取名字 $router.push(/login) 或者$router.push(name: 'login')
    { path: '/login', name: 'login', component: Login }
  ]
})

// 导出router
export default router
