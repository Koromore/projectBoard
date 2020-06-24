<template>
  <el-dialog title="发送人员" :visible.sync="dialogVisibleSend" width="30%" @close="closeSend">
    <!-- 发送人员 start -->
    <el-col :span="16">
      <el-select
        v-model="add_list"
        filterable
        clearable
        placeholder="请选择"
        size="small"
        ref="knowInput"
      >
        <el-option
          v-for="item in pop.userList"
          :key="item.index"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <!-- {{add_list}} -->
    </el-col>
    <el-col :span="6" :offset="2">
      <el-button size="small" type="primary" @click="showInput">添加</el-button>
    </el-col>
    <el-col :span="24" class="know_pop">
      <el-tag
        :key="tag.index"
        v-for="(tag, index) in dynamicTags0"
        closable
        :disable-transitions="false"
        @close="handleClose(tag,index)"
        class="know_pop_list"
      >{{tag}}</el-tag>
    </el-col>
    <!-- 发送人员 end -->
    <!-- {{dynamicTags0}}
    {{dynamicTagsId}}-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleSend = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisibleSend = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'dialogVisibleSend',
  props: {
    dialogDocFor: Number
  },
  inject: ['pop'],
  components: {},
  data() {
    return {
      // dialogVisibleSend
      // 对话框开关
      dialogVisibleSend: false,

      // 添加人物列表
      add_list: '',
      add_list0: '',
      dynamicTags0: [], // 知晓人
      dynamicTagsId: [] // 知晓人
    }
  },
  // 侦听器
  watch: {
    dialogDocFor: function(newData, oldData) {
      // console.log(newData)
      this.dialogVisibleSend = true
      console.log(this.pop)
    }
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    // 添加知晓人标签
    showInput() {
      let list = this.dynamicTags0
      let listId = this.dynamicTagsId
      let add_list = this.add_list
      let userList = this.pop.userList
      let cf = true
      if (add_list != '') {
        let add_list_data = ''
        for (let i = 0; i < userList.length; i++) {
          const element = userList[i]
          if (element.value == add_list) {
            add_list_data = element.label
          }
        }
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          if (element == add_list_data) {
            this.messageWarning('请勿重复添加')
            cf = false
          }
        }
        if (cf) {
          list.push(add_list_data)
          listId.push(add_list)
          this.add_list = ''
        }
      } else if (add_list == '') {
        this.messageWarning('信息为空')
      }
    },
    // 对话框
    closeSend() {
      this.dynamicTags0 = []
      this.dynamicTagsId = []
    },
    // 删除知晓人标签
    handleClose(tag, index) {
      this.dynamicTags0.splice(this.dynamicTags0.indexOf(tag), 1)
      this.dynamicTagsId.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
