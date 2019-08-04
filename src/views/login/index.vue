<!-- 登录页 -->
<template>
  <div class="box">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <!-- el-form表单容器 -->
      <!-- :model="loginForm" 绑定动态数据loginForm -->
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:236px; margin-right: 10px" placeholder="请输入验证码"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-form-item>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%" @click="login(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    // rule：当前校检的对象， 不会使用
    // value 当前校检字段的值
    // callback 一个回调函数
    // - 校检成功 callback();
    // - 校检失败 callback(new Errow("将来提示的内容"))
    var validateMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('请输入正确格式的电话号码'))
      }
      callback()
    }
    return {
      // 表单对象数据
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则数据
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (loginForm) {
      // 对整个表单进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 请求登录接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          // res 响应对象 包括响应主体
            .then(res => {
              // 存储用户信息
              store.setUser(res.data.data)
              // 跳转去首页
              this.$router.push('/')
              // catch() 监听错误
            }).catch(() => {
              // 错误提示 使用element-ui组件
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style>
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  /* contain: 等比例缩放完全在容器内显示  cover: 等比例缩放完全铺满容器*/
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
}
.my-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
}
.my-card img {
  display: block;
  width: 200px;
  margin: 0 auto 30px;
}
</style>
