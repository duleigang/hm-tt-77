// 定义router对象 导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

// 实例化对象
const router = new VueRouter({
  // 路由规则
  routes: [
    // name 就是给当前路由取名字 $router.push(/login) 或者$router.push(name: 'login')
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      // name: 'home',
      component: Home,
      // redirect: '/welcome',
      children: [
        // { path: '/welcome', name: 'welcome', component: Welcome }
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})

// 导出router
export default router
