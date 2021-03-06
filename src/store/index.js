// 模块 获取用户 设置用户
// 存储信息的时候
// 1 约定信息的KEY是什么：const KEY = 'hm-tt-77-user'
// 2 存储信息的值是什么，用户信息对象 字符串格式 json

const KEY = 'hm-tt-77-user'
export default {
  setUser (user) {
    // 存储用户信息到 sessionStorage
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    // 清除用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
