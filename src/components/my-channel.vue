<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// computed 计算属性使用场景：当你需要一个新数据，需要依赖data中的数据
// watch 侦听器的使用场景：当你需要监听某一个属性的变化，去做一些开销较大操作（向后台发请求 异步操作）
//   watch: {
//     'reqParams.channel_id': function (newval, oldval) {
//       if (newval === '') {
//         this.reqParams.channel_id = null
//       }
//     }
//   },
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
    //   myVlaue: null,
    // 下拉频道选项数据
      channelOptions: []
    }
  },
  created () {
    // 获取频道下拉选项数据
    this.getchannelOptions()
  },
  methods: {
    // 获取频道下拉选项数据
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 为空字符时，要处理成null
      if (val === '') val = null
      // 将数据提交给父组件
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang="less">
</style>
