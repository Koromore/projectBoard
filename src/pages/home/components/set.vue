<template>
  <div class="set">
    <el-row class="set">
      <!--  -->
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">业务类型</div>
        <div @click="table_tab(2)" :class="[tabs_activity==2 ? 'act' : '']">客户</div>
        <!-- <div @click="table_tab(3)" :class="[tabs_activity==3 ? 'act' : '']">会议模板</div> -->
        <div @click="table_tab(4)" :class="[tabs_activity==4 ? 'act' : '']">需求模板</div>
      </el-col>
      <!--  -->
      <el-col :span="24" class="add">
        <el-button
          v-show="tabs_activity==1"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="add_drawer()"
        >新增</el-button>
        <!-- <el-button
          v-show="tabs_activity==3"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="addconfer()"
        >新增模板</el-button>-->
        <el-dropdown v-show="tabs_activity==3" @command="conferCommand">
          <!-- <span class="el-dropdown-link">
            新增模板
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>-->
          <el-button size="small" type="primary">新增模板</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">例行</el-dropdown-item>
            <el-dropdown-item command="1">临时</el-dropdown-item>
            <el-dropdown-item command="2">专题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-show="tabs_activity==4"
          size="small"
          type="primary"
          :disabled="disabled"
          @click="addDemand()"
        >新增模板</el-button>
      </el-col>
      <!--------- 业务类型 --------->
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
          <el-table-column prop="businessName" label="名称"></el-table-column>

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
            :current-page="1"
            layout="total, prev, pager, next"
            :total="businessPage.totalRows"
            @current-change="businessListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!--------- 客户 --------->
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
            :current-page="1"
            layout="total, prev, pager, next"
            :page-size="30"
            :total="clientPage"
            @current-change="clientListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!--------- 会议模板 --------->
      <el-col :span="24" class="table table3" v-show="tabs_activity==3">
        <el-table
          v-loading="loading"
          ref="conferenceTable"
          :data="conferenceList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column prop="typeName" label="名称"></el-table-column>
          <el-table-column prop="sortName" label="会议类型"></el-table-column>
          <el-table-column prop="time" label="更新时间" sortable></el-table-column>
          <el-table-column prop="userName" label="创建人"></el-table-column>
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
            :current-page="1"
            layout="total, prev, pager, next"
            :total="businessPage.totalRows"
            @current-change="businessListPage"
          ></el-pagination>
        </el-col>
      </el-col>
      <!--------- 需求模板 --------->
      <el-col :span="24" class="table table4" v-show="tabs_activity==4">
        <el-table
          v-loading="loading"
          ref="depTypeTable"
          :data="depTypeList"
          style="width: 100%"
          height="100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
        >
          <el-table-column width="24"></el-table-column>
          <el-table-column prop="deptName" label="部门"></el-table-column>
          <el-table-column prop="typeName" label="任务类型"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" sortable></el-table-column>
          <el-table-column label="操作" width="210" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="addDemand(scope.row)">修改</el-button>
              <!-- <el-popconfirm title="确认执行此操作吗？" @onConfirm="delete_but(scope.row.businessId)"> -->
              <el-button
                size="mini"
                type="primary"
                slot="reference"
                @click="delDepType(scope.row.typeId)"
              >删除</el-button>
              <!-- </el-popconfirm> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="page">
          <el-pagination
            background
            :current-page="1"
            layout="total, prev, pager, next"
            :pageSize="30"
            :total="total"
            @current-change="depTypeListPage"
          ></el-pagination>
        </el-col>
      </el-col>
    </el-row>
    <!--------- 抽屉弹窗 --------->
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
    <!-- 抽屉新增会议模板 -->
    <el-drawer :title="drawerTitle" :visible.sync="drawerConfer">
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
    <!--------- 抽屉新增需求模板 start --------->
    <el-drawer :title="drawerTitle" :visible.sync="drawerDemand" @opened="drawerDemandOpened">
      <el-row class="addDemand" v-loading="drawerLoading">
        <el-scrollbar style="height: 100%">
          <el-col :span="24" class="new_name">
            <el-col :span="5" :offset="1" class="title snowflake">任务类型</el-col>
            <el-col :span="13">
              <el-input placeholder="请输入内容" v-model="typeName" clearable :disabled="disabled"></el-input>
            </el-col>
            <el-col :span="5" :offset="1" class="title snowflake">需求</el-col>
            <el-col :span="22" :offset="1" class="demandList">
              <el-table :data="depNeeds" style="width: 100%" height="100%" border>
                <el-table-column prop="name" label="需求名称">
                  <template slot-scope="scope">
                    <el-input
                      placeholder="请输入需求名称"
                      v-model="scope.row.needName"
                      clearable
                      :disabled="disabled"
                    ></el-input>
                    <!-- {{scope.row.needName}} -->
                  </template>
                </el-table-column>
                <el-table-column prop="hint" label="输入提示">
                  <template slot-scope="scope">
                    <el-input
                      placeholder="请输入提示"
                      v-model="scope.row.needDesc"
                      clearable
                      :disabled="disabled"
                    ></el-input>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="choice"
                  label="字段填写"
                  width="100"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.isMust" clearable placeholder="选择">
                      <el-option
                        v-for="item in choiceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-col>
        </el-scrollbar>
        <el-col :span="24" class="batton">
          <el-col :span="6" :offset="4">
            <el-button size="small" type="info">取消</el-button>
          </el-col>
          <el-col :span="6" :offset="4">
            <el-button size="small" type="primary" @click="depTypeSave">提交</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-drawer>
    <!--------- 抽屉新增需求模板 end --------->
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      loading: true,
      drawerLoading: false,
      loginState: true, // 避免多次点击
      drawerTitle: '',
      project_style: '',
      drawer: false,
      drawerConfer: false,
      drawerDemand: false,
      // 客户列表
      client_list: [],
      // 客户列表选择结果
      client: '',
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
      clientListPageNum: 1, // 客户列表分页
      ///////// 会议模板 /////////
      conferenceList: [], // 会议模板列表
      demandList: [],
      choiceList: [
        {
          value: 0,
          label: '可填'
        },
        {
          value: 1,
          label: '必填'
        }
      ],
      ///////// 需求模板 /////////
      depTypeDetail: {},
      // 新增
      typeId: '',
      typeName: '',
      depNeeds: [],
      depTypeList: [],
      // 分页
      total: 0,
      pageNum: 1,
      pageSize: 30
    }
  },
  // 钩子函数
  mounted() {
    // this.widthheight()
    // this.getlocalStorage()
    for (let i = 0; i < 10; i++) {
      // const element = array[i];
      this.depNeeds.push({
        deleteFlag: false,
        initUserId: this.$store.state.user.userId,
        needName: '', // 需求名字
        needDesc: '', // 输入提示
        isMust: '' // 0-可填 1-必填
      })
    }
    ///////// 业务类型列表获取 start /////////
    this.getBusinessListAjax()
    // ///////// 客户列表获取 start /////////
    // this.getClientListAjax()
    // ///////// 会议模板列表获取 start /////////
    // this.getmeetingType()
    // ///////// 需求模板列表获取 start /////////
    // this.getDepTypeList()
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
      if (e == 1) {
        ///////// 业务类型列表获取 start /////////
        this.getBusinessListAjax()
      } else if (e == 2) {
        ///////// 客户列表获取 start /////////
        this.getClientListAjax()
      } else if (e == 3) {
        ///////// 会议模板列表获取 start /////////
        this.getmeetingType()
      } else if (e == 4) {
        ///////// 需求模板列表获取 start /////////
        this.getDepTypeList()
      }
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
        .catch(res => {
          this.loading = false
        })
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
        .catch(res => {
          this.loading = false
        })
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

    ///////// 会议模板列表获取 start /////////
    getmeetingType() {
      // this.loading = true
      // if (data == undefined) {
      //   data = {}
      // }
      let data = {
        meetingType: {
          deleteFlag: false
        }
      }
      this.$axios
        .post('/pmbs/api/meetingType/listAjax', data)
        .then(res => {
          // console.log(res)
          if (res.status == 200) {
            let data = res.data.data
            data.items.forEach(element => {
              element.time =
                element.updateTime.year +
                '-' +
                element.updateTime.monthValue +
                '-' +
                element.updateTime.dayOfMonth +
                ' ' +
                element.updateTime.dayOfMonth +
                ':' +
                element.updateTime.hour
              // console.log(element)
            })
            this.conferenceList = data.items
            // console.log(data)
          }
        })
        .catch(res => {
          this.loading = false
        })
    },
    ///////// 会议模板列表获取 end /////////

    ///////// 需求模板列表获取 start /////////
    // /api/taskToNeed/listAjax
    getDepTypeList() {
      this.loading = true
      let data = {
        pageNum: this.pageNum,
        pageSize: 30,
        depType: {
          deleteFlag: false
        }
      }
      this.$axios
        .post('/pmbs/api/depType/listAjax', data)
        .then(res => {
          // console.log(res)
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            this.depTypeList = data.items
            this.total = data.totalRows
          }
        })
        .catch(res => {
          this.loading = false
        })
    },

    ///////// 需求模板列表获取 end /////////

    ///////// 需求模板列表分页 start /////////
    depTypeListPage(pageNum) {
      this.pageNum = pageNum
      this.getDepTypeList()
      this.$nextTick(() => {
        this.$refs.depTypeTable.bodyWrapper.scrollTop = 0
      })
    },
    ///////// 需求模板列表分页 end /////////

    ///////// 客户及关联业务获取 start /////////
    getBusinessByClientIds(data) {
      this.loading = true
      if (data == undefined) {
        data = {}
      }
      this.$axios
        .post('/pmbs/api/business/getBusinessByClientIds', data)
        .then(this.getBusinessByClientIdsSuss)
        .catch(res => {
          this.loading = false
        })
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
        .catch(res => {
          this.loading = false
        })
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
      this.$axios
        .post('/pmbs/client/save', data)
        .then(this.clientSaveSuss)
        .catch(res => {
          this.loading = false
        })
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
        .catch(res => {
          // this.loading = false
        })
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

    ///////// 新增会议模板 start /////////
    addconfer() {
      this.drawerConfer = true
      this.drawerTitle = '新增会议模板'
    },
    conferCommand() {
      this.drawerConfer = true
      this.drawerTitle = '新增会议模板'
    },
    ///////// 新增会议模板 end /////////

    ///////// 新增需求模板 start /////////
    // addDemand() {
    //   this.drawerDemand = true
    //   this.drawerTitle = '新增需求模板'
    // },
    drawerDemandOpened() {
      let depTypeDetail = this.depTypeDetail
      if (depTypeDetail.typeId) {
        this.drawerLoading = true
        this.drawerTitle = '修改需求模板'
        let data = {
          typeId: depTypeDetail.typeId
        }
        this.$axios
          .post('/pmbs/api/depType/show', data)
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              let data = res.data
              this.typeId = data.depType.typeId
              this.typeName = data.depType.typeName
              data.depNeeds.forEach((element, i) => {
                let isMust = ''
                if (element.isMust) {
                  isMust = 1
                } else {
                  isMust = 0
                }
                this.depNeeds[i].initUserId = element.initUserId
                this.depNeeds[i].needName = element.needName
                this.depNeeds[i].needDesc = element.needDesc
                this.depNeeds[i].isMust = isMust
              })
              this.drawerLoading = false
              // console.log(this.depNeeds)
            }
          })
          .catch(res => {
            this.drawerLoading = false
          })
      }else {
        this.drawerTitle = '新增需求模板'
      }
    },
    addDemand(prm) {
      // console.log(prm)
      this.drawerDemand = true
      this.depTypeDetail = prm
    },
    depTypeSave() {
      this.drawerLoading = true
      let depNeeds = this.depNeeds
      let list = []

      // console.log(depNeeds)
      depNeeds.forEach((element, i) => {
        if (element.needName) {
          // element.deleteFlag = true
          list.push(element)
        }
      })
      // console.log(list)
      let data = {
        depNeeds: list,
        depType: {
          deptId: this.deptId,
          typeId: this.typeId,
          typeName: this.typeName
        }
      }
      // console.log(data)
      if (this.typeName == '') {
        this.$message.error('信息不能为空')
        this.drawerLoading = false
      } else {
        this.$axios
          .post('/pmbs/api/depType/save', data)
          .then(res => {
            this.drawerLoading = false
            // console.log(res)
            if (res.status == 200) {
              this.drawerDemand = false
              this.$message.success(res.data.msg)
              ///////// 需求模板列表获取 start /////////
              this.getDepTypeList()
            }
          })
          .catch(res => {
            this.drawerLoading = false
          })
      }
    },
    delDepType(id) {
      this.$confirm('确认提交任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteType(id)
        })
        .catch(() => {
          console.log(id)
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
    deleteType(id) {
      let data = {
        typeId: id
      }
      this.$axios
        .post('/pmbs/api/depType/delete', data)
        .then(res => {
          // this.drawerLoading = true
          console.log(res)
          if (res.status == 200) {
            this.$message.success(res.data.msg)
            ///////// 需求模板列表获取 start /////////
            this.getDepTypeList()
          }
        })
        .catch(res => {
          this.drawerLoading = true
        })
    },
    ///////// 新增需求模板 end /////////
    // 取消按钮
    cancel() {},
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
  }
}
</script>
<style scoped lang="scss">
.set {
  height: 100%;
  .snowflake {
    background: url('/static/images/task/snowflake.png') left center no-repeat;
    background-size: 7px;
    padding: 0 9px;
    text-align: justify;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
  }
  .snowflake:after {
    display: inline-block;
    content: '';
    padding-left: 100%;
  }
}
.set .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.el-button + .el-button {
  margin: 0;
}
.set .add {
  /* width: 99px; */
  box-sizing: border-box;
  margin: 0 0 13px 13px;
}
.set .add button {
  width: 99px;
}
.set .tabs {
  font-size: 16px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.set .tabs div {
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
.set .tabs .act {
  border-bottom: 2px solid rgb(16, 142, 233);
  color: rgb(16, 142, 233);
}
.set .table {
  height: calc(100% - 182px);
}
.set .table .title,
.set .table .list {
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
.set .table .list:hover {
  background: #f7f7f7;
}
.set .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.set .table .title div {
  height: 48px;
  line-height: 48px;
}
.set .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.set .table .page {
  margin-top: 24px;
  text-align: center;
}
.set .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
  .title {
    text-align: center;
  }
  .title2 {
    margin-top: 64px;
  }
  .check_box {
    margin-top: 64px;
  }
  .check_box .el-checkbox {
    width: 64px;
  }
  .new_name {
    height: 40px;
    line-height: 40px;
  }
  .batton {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .batton {
    button {
      width: 39%;
    }
  }
}
.set .addDemand {
  height: calc(100%);
  box-sizing: border-box;
  // padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
  .el-col {
    margin-bottom: 18px;
  }
  .demandList {
    margin-bottom: 54px;
  }

  .check_box {
    margin-top: 64px;
  }
  .check_box .el-checkbox {
    width: 64px;
  }
  .new_name {
    height: 40px;
    line-height: 40px;
  }
  .batton {
    position: absolute;
    z-index: 9;
    bottom: 0;
    background: white;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: space-between;
    margin-bottom: 0;
    button {
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.el-dropdown-menu {
  width: 99px;
  text-align: center;
}
</style>
