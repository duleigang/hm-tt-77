<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse ? 64 + 'px':200 + 'px'">
      <div class="logo" :class="{minlogo:isCollapse}"></div>
      <!--element-ui只中 使用vue-router的模式，使用该模式会在激活导航时以index左为path进行路由跳转 -->
      <!-- 先挂载router -->
      <!-- $route一般是调路由数据的；$router一般是调路由方法的 -->
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition=false

        :default-active="$route.path"

        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown" @command='chageMenu'>
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            {{ name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item icon="el-icon-setting"  @click.native="setting()">个人设置</el-dropdown-item> -->
            <!-- <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item> -->
            <el-dropdown-item icon="el-icon-setting"  command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由的出口，显示组件的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: 'this.name',
      photo: 'this.photo'
    }
  },
  created () {
    // 本地获取用户信息
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    // 切换菜单栏的展开与收起。默认展开
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    // click是原生的点击事件，只支持原生dom
    // 期望，把事件绑定在组件解析后的原生dom上 @click.native
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()
      // this.$router.push('/login')
      this.$router.push({ name: 'login' })
    },
    // 绑定事件不加括号的原因：为了接收默认参数
    // menuType是变量，可能是setting也可能是logout
    // this[menuType] = setting() / logout();
    chageMenu (menuType) {
      this[menuType]()
    }
  }
}
</script>

<style>
/* 标签名称其实就是解析后的类名 */
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.logo {
  width: 100%;
  height: 60px;
  background: #024 url("../../assets/images/logo_admin.png") no-repeat center /
    140px auto;
}
.minlogo {
  background-size: 36px auto;
  background-image: url("../../assets/images/logo_admin_01.png");
}
.el-aside {
  background: #002033;
}
.el-header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}
.el-icon-s-fold {
  font-size: 26px;
  vertical-align: middle;
}
.text {
  vertical-align: middle;
  padding-left: 10px;
}
.my-dropdown {
  float: right;
}
.el-dropdown-link {
  font-weight: 700;
}
.el-dropdown img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.el-menu {
  border-right: none;
}
</style>
