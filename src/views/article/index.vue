<template>
  <div>
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己的组件 -->
          <!-- v-model背后：:value @input -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{ total }} 条结果</div>
      <!-- 表格组件 -->
      <!-- prop指定字段显示该字段的值 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- cover是一个对象 -->
            <el-image
              :src="scope.row.cover.images[0]"
              fit="contain"
              style="width:120px;height:80px"
            >
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info" plain>草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" type="primary" plain>待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success" plain>审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning" plain>审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger" plain>删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布日期"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align: center; margin-top: 30px">
        <!-- ；total="1000" 指定的总条数 -->
        <!-- @current-change="changePager" 页码改变事件 方法不加括号，接收默认传参 -->
        <!-- 筛选过数据后 当前页码也需要修改，选中对应的按钮 current-page属性 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入
export default {
  // 注册
  data () {
    return {
      // 筛选项表单数据 提交给后台的参数
      // axios提交的数据， 值为null是不会携带参数的
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉选项数据，不需要提交给后台
      channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },

  created () {
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 删除事件
    del (id) {
      // 点击删除，弹出一个框
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定
        await this.$http.delete(`articles/${id}`)
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 日期选择后事件
    changeDate (dateArr) {
      // 假如用户将数据清空也要考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选数据
    search () {
      // 筛选项是双向绑定的 拿着对应的数据发送请求即可 注意：重新筛选后，页码为第一页
      this.reqParams.page = 1
      this.getArticles()
    },

    async getArticles () {
      // axios get传参 url?key=value&key1=value1... 这样书写麻烦
      // axios get传参 第二传参是对象，发请求的时候自动拼接到地址栏后
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 列表数据
      this.articles = data.results
      // 列表总条数
      this.total = data.total_count
    },
    changePager (newPage) {
      // 修改获取时的页码
      this.reqParams.page = newPage
      this.getArticles()
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
