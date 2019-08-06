// main.js的职责
// 1 职责：导入项目需要的依赖资源（js包, css文件, 其他资源）
// 2 创建根实例

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入less文件
import '@/style/index.less'

// @是某一个路径别名 src路径别名 在vue-cli创建的项目下才可以使用
// 目录下有默认索引文件 index js 就是索引文件 js, index, json
import router from '@/router'

import axios from '@/api'
import myCom from '@/components'
Vue.use(myCom)

Vue.prototype.$http = axios

// 控制台提示信息
Vue.config.productionTip = false

// 使用依赖或者资源
Vue.use(ElementUI)

// 根实例
new Vue({
  // 挂载router
  router,
  render: h => h(App)
}).$mount('#app')
