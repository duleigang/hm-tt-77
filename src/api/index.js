// 配置一个axios 导出配置好的axios
import axios from 'axios'
import store from '@/store'

// 进行配置
// 1 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// headers配置请求头信息
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 进行导出
export default axios
