// 封装一个组件
// 注册所有components下的组件为全局组件

import MyBread from '@/components/my-bread'
import MyChannel from '@/components/my-channel'

// vue插件 暴露一个对象 对象中有一个选项 install 安装的意思
export default {
  install (Vue) {
    // Vue 为全局的Vue对象
    // 安装函数 当Vue.use(使用插件) install被调用
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
