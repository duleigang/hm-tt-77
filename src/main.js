import Vue from 'vue'
import App from './App.vue'

// 控制台提示信息
Vue.config.productionTip = false

// main.js的职责
// 1 职责：导入项目需要的依赖资源（js包, css文件, 其他资源）
// 2 创建根实例

// 根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
