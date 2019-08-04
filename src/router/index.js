// 定义router对象 导出给main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import NotFound from '@/views/404'
// import store from '../store';

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
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 提供函数 beforeEach 前置守卫
// to 去的路由对象  from来自哪里的路由对象
// router.beforeEach((to, from, next) => {
// 判断是不是登录页面
// if (to.path === '/login') return next()
// 判断是不是登录过      next('/login'): 拦截登录
// if (!store.getUser().token) return next('/login')
// 两者都不是 放行
// next()
// if (to.path !== '/login' && !store.getUser().token) return next('/login')
// })

// 导出router
export default router
