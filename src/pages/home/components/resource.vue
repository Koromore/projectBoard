<template>
  <div class="resource">
    <el-row class="resource">
      <!--  -->
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">模特</div>
        <div @click="table_tab(2)" :class="[tabs_activity==2 ? 'act' : '']">摄影师</div>
        <div @click="table_tab(3)" :class="[tabs_activity==3 ? 'act' : '']">场地</div>
      </el-col>
      <!--  -->
      <el-col :span="24" class="add" :style="addBut">
        <el-button
          v-show="tabs_activity==3"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="add_drawer()"
          :style="addBut"
        >场地</el-button>
      </el-col>
      <!-- 模特 -->
      <el-col :span="24" class="table table1" v-show="tabs_activity==1">
        <el-table
          v-loading="loading"
          ref="businessTable"
          :data="businessList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column width="48" type="index"  label="序号"></el-table-column>
          <el-table-column prop="businessName" label="艺名/姓名"></el-table-column>
          <el-table-column prop="businessName" label="性别"></el-table-column>
          <el-table-column prop="businessName" label="客户-车型"></el-table-column>
          <el-table-column prop="businessName" label="标签"></el-table-column>
          <el-table-column prop="businessName" label="是否合作"></el-table-column>
          <el-table-column prop="businessName" label="拍摄次数"></el-table-column>
          <el-table-column prop="businessName" label="评分" sortable></el-table-column>

          <el-table-column prop="tag" label="操作" width="210" filter-placement="bottom-end">
            <template>
              <el-button
                size="mini"
                type="info"
              >评论</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="businessPage.totalRows"
            @current-change="businessListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!-- 客户 -->
      <el-col :span="24" class="table table2" v-show="tabs_activity==2">
        <el-table
          v-loading="loading"
          ref="filterTable"
          :data="clientList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column prop="clientName" label="客户"></el-table-column>
          <el-table-column prop="businessList" label="业务">
            <template slot-scope="scope">
              <span
                v-for="(items, index) in scope.row.businessList"
                :key="index"
                v-show="items != null"
              >
                <span v-if="index != 0">、</span>
                {{items.businessName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="client_change(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="30"
            :total="clientPage"
            @current-change="clientListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!-- 会议模板 -->
      <el-col :span="24" class="table table3" v-show="tabs_activity==3">
        <el-table
          v-loading="loading"
          ref="businessTable"
          :data="businessList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column prop="businessName" label="名称"></el-table-column>
          <el-table-column prop="businessName" label="会议类型"></el-table-column>
          <el-table-column prop="businessName" label="更新时间" sortable></el-table-column>
          <el-table-column prop="businessName" label="创建人"></el-table-column>
          <el-table-column prop="tag" label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="business_change(scope.row.businessId,scope.row.businessName)"
              >修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="delete_but(scope.row.businessId)">
                <el-button size="mini" type="primary" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="businessPage.totalRows"
            @current-change="businessListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!-- 需求模板 -->
      <el-col :span="24" class="table table4" v-show="tabs_activity==4">
        <el-table
          v-loading="loading"
          ref="businessTable"
          :data="businessList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column prop="businessName" label="部门"></el-table-column>
          <el-table-column prop="businessName" label="任务类型"></el-table-column>
          <el-table-column prop="businessName" label="更新时间" sortable></el-table-column>
          <el-table-column label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="business_change(scope.row.businessId,scope.row.businessName)"
              >修改</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="delete_but(scope.row.businessId)">
                <el-button size="mini" type="primary" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="businessPage.totalRows"
            @current-change="businessListPage"
          ></el-pagination>
        </el-col>
      </el-col>
    </el-row>
    <!-- 抽屉 -->
    <el-drawer :title="drawerTitle" :visible.sync="drawer">
      <el-row class="add_box">
        <el-col :span="24" class="new_name">
          <el-col :span="6" class="title title1">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_name" clearable :disabled="disabled"></el-input>
          </el-col>
          <el-col :span="6" class="title title2" v-show="tabs_activity == 2">业务</el-col>
          <el-col :span="13" class="check_box" v-show="tabs_activity == 2">
            <!-- 业务类型列表 -->
            <el-checkbox-group v-model="businessListCheck">
              <el-checkbox
                :label="items.businessId"
                v-for="items in businessList"
                :key="items.index"
              >{{items.businessName}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-col>
        <el-col :span="20" :offset="2" class="batton">
          <el-button size="small" type="info">取消</el-button>
          <el-button size="small" type="primary" @click="putIn">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      loading: true,
      loginState: true, // 避免多次点击
      drawerTitle: '',
      project_style: '',
      drawer: false,
      // 客户列表
      client_list: [
        {
          value: '广汽本田',
          label: '广汽本田'
        },
        {
          value: '吉利',
          label: '吉利'
        },
        {
          value: '沃尔沃',
          label: '沃尔沃'
        }
      ],
      // 客户列表选择结果
      client: '广汽本田',
      businessList: [], // 业务类型列表
      clientList: [], // 客户列表
      clientListPageData: {}, // 客户分页信息
      tabs_activity: 1, // 1-业务类型 2-客户
      operation: 1, // 1-新增 2-修改
      transferId: '', // 新增/修改时传递的ID
      disabled: false, // 按钮禁用
      // 新增
      new_name: '',
      // 选中的业务类型
      businessListCheck: [],

      businessPage: {}, // 业务分页信息
      clientPage: 0, // 客户分页信息
      businessListPageNum: 1, // 业务列表分页
      clientListPageNum: 1 // 客户列表分页
    }
  },
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    },
    test(res, res2) {
      // console.log(res)
      // console.log(res2)
    },
    drawer_show() {
      this.drawer = true
    },
    // 选项卡
    table_tab(e) {
      this.tabs_activity = e
      // if (e == 1) {
      //   this.disabled = false
      //   this.addBut = 'display: block;'
      // } else if (e == 2) {
      //   this.disabled = true
      //   this.addBut = 'display: none;'
      // }
    },
    ///////// 业务类型列表获取 start /////////
    getBusinessListAjax(data) {
      this.loading = true
      if (data == undefined) {
        data = {}
      }
      this.$axios
        .post('/pmbs/api/business/listAjax', data)
        .then(this.getBusinessListAjaxSuss)
    },
    // 业务类型列表获取回调 //
    getBusinessListAjaxSuss(res) {
      this.loading = false
      if (res.status == 200) {
        this.businessList = res.data.data.items
        this.businessPage = res.data.data
        // pageRows
      }
    },
    ///////// 业务类型列表获取 end /////////

    ///////// 客户列表获取 start /////////
    getClientListAjax(data) {
      this.loading = true
      if (data == undefined) {
        data = {}
      }
      this.$axios
        .post('http://pms.guoxinad.com.cn/pas/clientapi/allListAjax', data)
        .then(this.getClientListAjaxSuss)
    },
    // 客户列表获取回调
    getClientListAjaxSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data

        let clientList = []
        let clientListPageData = {
          page1: [],
          page2: [],
          page3: [],
          page4: [],
          page5: [],
          page6: [],
          page7: [],
          page8: [],
          page9: []
        }
        let page = 1
        data.forEach((element, index) => {
          // data[index].businessList = []
          let clientListData = {
            clientId: element.clientId,
            clientName: element.clientName,
            businessList: []
          }
          clientList.push(clientListData)
          if (index <= 29) {
            clientListPageData.page1.push(clientListData)
          } else if (index > 29 && index <= 59) {
            clientListPageData.page2.push(clientListData)
          } else if (index > 59 && index <= 89) {
            clientListPageData.page3.push(clientListData)
          }
        })
        // this.clientList = clientListPageData['page1']
        this.clientPage = data.length
        this.clientListPageData = clientListPageData
        let pageData = {
          clientList: clientListPageData.page1
        }
        this.getBusinessByClientIds(pageData)
      }
    },
    ///////// 客户列表获取 end /////////
    ///////// 客户及关联业务获取 start /////////
    getBusinessByClientIds(data) {
      this.loading = true
      if (data == undefined) {
        data = {}
      }
      this.$axios
        .post('/pmbs/api/business/getBusinessByClientIds', data)
        .then(this.getBusinessByClientIdsSuss)
    },
    // 客户列表获取回调
    getBusinessByClientIdsSuss(res) {
      this.loading = false
      if (res.status == 200) {
        let data = res.data
        this.clientList = data
        // this.clientPage = res.data.data
      }
    },
    ///////// 客户及关联业务获取 end /////////
    // 新增按钮
    add_drawer() {
      this.drawer = true
      this.operation = 1
      this.drawerTitle = '业务类型新增'
      this.transferId = ''
      this.new_name = ''
      this.businessListCheck = []
    },
    ///////// 业务类型修改 start /////////
    business_change(id, name) {
      this.drawer = true
      this.operation = 2
      this.drawerTitle = '业务类型修改'
      this.transferId = id
      this.new_name = name
    },
    ///////// 业务类型修改 end /////////

    ///////// 客户修改按钮 start /////////
    client_change(data) {
      // console.log(data)
      this.drawer = true
      this.operation = 2
      this.transferId = data.clientId
      this.new_name = data.clientName
      this.drawerTitle = '客户业务类型修改'
      let businessListCheck = []
      for (let i = 0; i < data.businessList.length; i++) {
        let element = data.businessList[i]
        businessListCheck.push(element.businessId)
      }
      this.businessListCheck = businessListCheck
      // .clientId,scope.row.clientName
    },
    ///////// 客户修改按钮 end /////////

    // 提交按钮--包含业务类型和客户的新增和修改
    putIn() {
      this.drawer = false
      let tabs_activity = this.tabs_activity
      let data = {}
      // console.log(tabs_activity)
      // console.log(data)
      if (tabs_activity == 1) {
        // 业务类型新增/修改
        data = {
          businessId: this.transferId, // 业务类型id
          businessName: this.new_name // 业务类型名称
        }
        if (data.businessName == '') {
          this.messageError('信息不能为空')
        } else {
          this.businessSave(data)
        }
      } else if (tabs_activity == 2) {
        // 客户新增/修改
        let businessList = []
        let businessListData = this.businessList
        // console.log(businessListData)
        let businessListCheck = this.businessListCheck
        let businessListCheckValue = []
        for (let i = 0; i < businessListCheck.length; i++) {
          let elementi = businessListCheck[i]
          let data = {}
          // data.businessId = elementi
          for (let j = 0; j < businessListData.length; j++) {
            let elementj = businessListData[j]
            if (elementi == businessListData[j].businessId) {
              businessListCheckValue.push(businessListData[j].businessName)
              data.businessId = elementi
              data.businessName = businessListData[j].businessName
            }
          }
          // console.log(data)
          if (data.businessId) {
            businessList.push(data)
          }
        }
        // console.log(businessList)
        // console.log(businessListCheckValue)
        // console.log(businessListCheck)
        data = {
          clientId: this.transferId, // 客户ID
          // clientName: this.new_name, // 客户名称
          businessList: businessList // 包含的业务类型
        }
        // console.log(data.businessList)
        if (data.clientName == '' || data.businessList.length == 0) {
          this.messageError('信息不能为空')
        } else {
          this.clientSave(data)
        }
      }
    },
    ///////// 业务类型新增/修改 start /////////
    businessSave(res) {
      let data = res
      this.loading = true
      this.$axios
        .post('/pmbs/api/business/save', data)
        .then(this.businessSaveSuss)
    },
    // 业务类型新增/修改回调 start //
    businessSaveSuss(res) {
      if (res.status == 200) {
        // 获取业务类型列表
        let pageNum = this.businessListPageNum
        let clientListPageData = this.clientListPageData
        let pageData = {
          clientList: clientListPageData[`page${pageNum}`]
        }
        let data = {
          pageNum: this.clientListPageNum,
          pageSize: 30
        }
        this.getBusinessByClientIds(pageData)
        this.getBusinessListAjax(data)
        // 新增/修改成功提示
        this.messageWin(res.data.msg)
        // 清空输入框（重置参数）
        this.transferId = ''
        this.new_name = ''
        this.drawer = false
        this.loading = false
      }
    },
    ///////// 业务类型新增/修改 end /////////

    ///////// 客户关联业务修改 start /////////
    clientSave(res) {
      let data = res
      this.loading = true
      this.$axios.post('/pmbs/client/save', data).then(this.clientSaveSuss)
    },
    // 客户关联业务修改回调
    clientSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // 获取客户列表
        let clientListPageData = this.clientListPageData
        let page = this.clientListPageNum
        let pageData = {
          clientList: clientListPageData[`page${page}`]
        }
        this.getBusinessByClientIds(pageData)
        // 新增/修改成功提示
        this.messageWin(res.data.msg)
        // 清空输入框（重置参数）
        this.transferId = ''
        this.new_name = ''
        this.businessListCheck = []
        this.drawer = false
        this.loading = false
      }
    },
    ///////// 客户关联业务修改 end /////////

    // 删除按钮
    delete_but(e) {
      let tabs_activity = this.tabs_activity
      let data = {}

      if (tabs_activity == 1) {
        data = e
        this.businessDelete(data)
      } else if (tabs_activity == 2) {
        data = e
        this.clientDelete(data)
      }
    },
    ///////// 业务类型删除请求发送 start /////////
    businessDelete(res) {
      let data = '?id=' + res
      // console.log(data)
      this.$axios
        .post('/pmbs/api/business/delete' + data)
        .then(this.businessDeleteSuss)
    },
    // 业务类型删除请求回调
    businessDeleteSuss(res) {
      if (res.status == 200) {
        // 获取业务类型列表
        let data = {
          pageNum: this.businessListPageNum,
          pageSize: 30
        }
        this.getBusinessListAjax(data)
        // 业务类型删除成功提示
        this.messageWin(res.data.msg)
      }
    },
    ///////// 业务类型删除请求发送 end /////////
    // 客户删除请求发送
    // clientDelete(res) {
    //   let data = {
    //     clientId: res
    //   }
    //   this.$axios.post('/pmbs/client/delete', data).then(this.clientDeleteSuss)
    // },
    // // 客户删除请求回调
    // clientDeleteSuss(res) {
    //   if (res.status == 200) {
    //     // 消息提示
    //     this.messageWin(res.data.msg)
    //     // 重新获取客户列表
    //     let data = {
    //       pageNum: this.clientListPageNum
    //     }
    //     this.getClientListAjax(data)
    //   }
    // },
    ///////// 业务类型分页 start /////////
    businessListPage(page) {
      this.businessListPageNum = page
      let data = {
        pageNum: page,
        pageSize: 30
      }
      this.getBusinessListAjax(data)
    },
    ///////// 业务类型分页 end /////////
    ///////// 客户分页 start /////////
    clientListPage(page) {
      this.clientListPageNum = page
      let clientListPageData = this.clientListPageData
      // let data = clientListPageData[`page${page}`]
      let pageData = {
        clientList: clientListPageData[`page${page}`]
      }
      // console.log(data)
      // this.clientList = data
      this.getBusinessByClientIds(pageData)
    },
    ///////// 客户分页 end /////////
    // 消息提示
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
  },
  // 钩子函数
  mounted() {
    // this.widthheight()
    // this.getlocalStorage()
    this.getBusinessListAjax()
    this.getClientListAjax()
  }
}
</script>
<style scoped>
.resource {
  height: 100%;
}
.resource .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.el-button + .el-button {
  margin: 0;
}
.resource .add {
  /* width: 99px; */
  box-sizing: border-box;
  margin: 0 0 13px 13px;
}
.resource .add button {
  width: 99px;
}
.resource .tabs {
  font-size: 16px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.resource .tabs div {
  width: 130px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  border-bottom: 1px solid rgb(164, 167, 170);
  padding-bottom: 13px;
  cursor: pointer;
}
.resource .tabs .act {
  border-bottom: 2px solid rgb(16, 142, 233);
  color: rgb(16, 142, 233);
}
.resource .table {
  height: calc(100% - 182px);
}
.resource .table .title,
.resource .table .list {
  width: 100%;
  height: 48px;
  font-size: 14px;
  box-sizing: border-box;
  padding-left: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.resource .table .list:hover {
  background: #f7f7f7;
}
.resource .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.resource .table .title div {
  height: 48px;
  line-height: 48px;
}
.resource .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.resource .table .page {
  margin-top: 24px;
  text-align: center;
}
.resource .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.resource .add_box .title {
  text-align: center;
}
.resource .add_box .title2 {
  margin-top: 64px;
}
.resource .add_box .check_box {
  margin-top: 64px;
}
.resource .add_box .check_box .el-checkbox {
  width: 64px;
}
.resource .add_box .new_name {
  height: 40px;
  line-height: 40px;
}
.resource .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.resource .add_box .batton button {
  width: 39%;
}
</style>
