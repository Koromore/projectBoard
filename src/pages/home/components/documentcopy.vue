<template>
  <div id="document" class="document">
    <div>
      <el-row>
        <el-col :span="24" class="top">
          <el-col :span="5" class>
            <el-col :span="4" class="title">客户</el-col>
            <el-col :span="20">
              <el-select
                v-model="clientId"
                filterable
                clearable
                placeholder="全部"
                size="small"
                class="filtrateClient"
              >
                <el-option
                  v-for="item in userclientIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>
          <el-col :span="7" class="tab tab1">
            <el-button-group>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab1_change(item.businessId)"
                :class="[serviceId==item.businessId ? 'act' : '']"
                v-for="(item, index) in allBusinessList[0]"
                :key="index"
              >{{item.businessName}}</el-button>
              <el-button
                type="primary"
                plain
                size="small"
                icon="el-icon-more"
                @click.stop="tab1_more()"
                :class="[moreShow==true ? 'act more' : 'more']"
                v-if="allBusinessList[1]"
                style="border-left: 0;"
              ></el-button>
            </el-button-group>
            <el-card class="box-card" v-show="moreShow">
              <el-button-group
                v-for="(items, index) in allBusinessList"
                :key="index"
                v-show="index != 0"
                class="moreBus"
              >
                <el-button
                  type="primary"
                  plain
                  size="small"
                  @click.stop="tab1_change(item.businessId)"
                  :class="[serviceId==item.businessId ? 'act' : '']"
                  v-for="(item, index) in items"
                  :key="index"
                >{{item.businessName}}</el-button>
              </el-button-group>
            </el-card>
          </el-col>
          <el-col :span="4" class="tab tab2">
            <el-button-group>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab2_change(1,1)"
                :class="[tab2_act=='1' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;专项&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
              <el-button
                type="primary"
                plain
                size="small"
                @click="tab2_change(2,0)"
                :class="[tab2_act=='2' ? 'act' : '']"
              >&nbsp;&nbsp;&nbsp;&nbsp;日常&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-button-group>
          </el-col>
          <el-col :span="8" class="tab tab3">
            <!-- <el-input
              @keyup.enter.native="searchHandle"
              placeholder="搜索"
              size="small"
              v-model="name"
              class="sousuo"
            >
              <el-button @click="searchHandle" slot="append" size="small" icon="el-icon-search"></el-button>
            </el-input>-->
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-col :span="24" class="tabs" v-if="userId != 152">
      <div @click="table_tab(0)" :class="[tabs_activity==0 ? 'act' : '']">客户资料</div>
      <div @click="table_tab(1)" :class="[tabs_activity==1 ? 'act' : '']">策划方案</div>
      <div @click="table_tab(2)" :class="[tabs_activity==2 ? 'act' : '']">执行方案</div>
      <div @click="table_tab(3)" :class="[tabs_activity==3 ? 'act' : '']">其他资料</div>
    </el-col>
    <div class="table-main">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        height="100%"
        ref="documentTable"
        :default-sort="{prop: 'date', order: 'descending'}"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
      >
        <el-table-column label="文档" show-overflow-tooltip>
          <template slot-scope="scope">
            <div @click.stop="changeNum(scope.$index,scope.row)">
              <div v-if="editable[scope.$index]">
                <el-input v-model="editFileName" size="mini" class="editRemarkInput">
                  <el-button
                    @click.stop="cellSave(scope.$index,scope.row)"
                    slot="append"
                    type="primary"
                    size="mini"
                  >确认</el-button>
                </el-input>
              </div>
              <div v-else>
                <img
                  v-if="scope.row.suffix == 'doc' || scope.row.suffix == 'docx'"
                  src="static/images/document/word.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'xls' || scope.row.suffix == 'xlsx'"
                  src="static/images/document/excle.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="scope.row.suffix == 'ppt' || scope.row.suffix == 'pptx'"
                  src="static/images/document/ppt.png"
                  width="16"
                  alt
                  srcset
                />
                <img v-else src="static/images/document/other.png" width="16" alt srcset />
                <span>{{ scope.row.fileName }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="proName" label="项目" show-overflow-tooltip></el-table-column>
        <el-table-column prop="taskName" label="任务" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" sortable width="130"></el-table-column>
        <el-table-column prop="realName" label="更新人" width="100"></el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="重新上传" placement="top">
              <el-button
                v-if="scope.row.doUserId == userId && scope.row.status!=3 && scope.row.status!=5"
                @click="upload2(scope.$index, scope.row)"
                size="mini"
                icon="el-icon-upload2"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载文档" placement="top">
              <el-button @click="download(scope.row)" size="mini" icon="el-icon-download"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="任务详情" placement="top">
              <el-button @click="enterDetail(scope.row)" size="mini" icon="el-icon-share"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="历史文档" placement="top">
              <el-button
                @click="lookHistory(scope.$index,scope.row)"
                size="mini"
                icon="el-icon-time"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            layout="total, prev, pager, next"
            :page-size="30"
            :total="totalnum"
            background
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-drawer title="历史文档" :visible.sync="openHistory">
      <el-scrollbar>
        <div class="history-main">
          <!-- <div class="title">历史</div> -->
          <el-timeline v-loading="fileHistoryLoading">
            <el-timeline-item
              v-for="item in fileHistoryList"
              :key="item.fileId"
              :timestamp="item.updateTime"
              placement="top"
            >
              <el-card>
                <h4>更新人：{{item.realName}}</h4>
                <p class="fileName">
                  <!-- <i class="el-icon-folder"></i> -->
                  <img
                    v-if="item.suffix == 'doc' || item.suffix == 'docx'"
                    src="static/images/document/word.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'xls' || item.suffix == 'xlsx'"
                    src="static/images/document/excle.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img
                    v-else-if="item.suffix == 'ppt' || item.suffix == 'pptx'"
                    src="static/images/document/ppt.png"
                    width="16"
                    alt
                    srcset
                  />
                  <img v-else src="static/images/document/other.png" width="16" alt srcset />
                  <span>{{item.fileName}}</span>
                </p>
                <p>
                  <el-button @click="download(item)" size="small" type="primary">
                    下载
                    <i class="el-icon-download el-icon--right"></i>
                  </el-button>
                </p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <p v-show="fileHistoryList.length==0">暂无历史数据</p>
        </div>
      </el-scrollbar>
    </el-drawer>

    <!--------- 任务详情 start --------->
    <taskDetail :taskId="taskId" @closeDrawer="closeDrawer"></taskDetail>
    <!--------- 任务详情 end --------->
    <!-- 重新上传弹框 -->
    <el-dialog :close="fileClose" title="修改附件" :visible.sync="dialogFileVisible">
      <div>
        <el-upload
          :action="uploadUrl"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button size="mini" type="primary">点击上传附件</el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fileRemove">取 消</el-button>
        <el-button type="primary" @click="fileUpload">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import taskDetail from '@/pages/template/taskDetail'

export default {
  name: 'document',
  props: {
    allBusinessList: Array,
    allClientIdList: Array,
    userclientIdList: Array,
    clickCloseNum: Number,
    searchWordData: Object
  },
  components: {
    taskDetail
  },
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      taskId: 0,
      tabs_activity: 0,
      openHistory: false, //控制文档历史记录侧栏状态
      editFileName: '', //修改的文件名
      clientId: '', //客户ID
      serviceId: '', //
      isUsual: '', //是否是专项
      name: '', //搜索的关键字
      loading: false, //是否正在加载中
      // 项目类型1选择
      tab1_act: '',
      // 项目类型2选择
      tab2_act: '',
      businessList: this.$store.state.businessList, // 业务列表
      moreShow: false, // 显示更多业务
      clientIdList: this.$store.state.clientIdList, //客户列表
      client: '广汽本田',
      fileHistoryList: [], //文件历史数据
      fileHistoryLoading: false, //侧栏文件是否正在加载中
      tableData: [], //文件列表数据
      editable: [], //控制文件名修改
      pageNum: 1, //当前的页码
      totalnum: 0, //总页码
      fileList: [], //上传的文件
      listProFile: [], // 上传文件信息列表
      uploadUrl: '', //上传文件的接口地址
      dialogFileVisible: false, //控制显示重新上传附件的弹框
      editData: '', //用于修改附件赋值的临时存储
      openTaskVisible: false, //显示任务详情侧栏
      // 任务详情
      taskData: {},
      suggest_list: [],
      // 状态列表
      statusList: [
        { value: 1, label: '执行中' },
        { value: 2, label: '完成' }
      ],
      statusList_: [
        { value: 2, label: '完成' },
        { value: 4, label: '延期' }
      ],
      statusListValue: '',
      drawer1: false,
      listProFileResult: [],
      result: '',
      // taskData: [],
      drawerLoading: false,
      // 禁止选择当前时间之前的时间
      proExpertTime: '',
      pickerOptions: {},
      // 项目类型选择
      task_type: [],
      task_type_value: '',
      // 上传附件
      uploadUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      listProFile_: [], // 上传文件信息列表
      suggest_list: [], // 任务反馈意见列表
      fileList0: [],
      // 上传文档
      updateBan: false, // 上传文档禁止
      dialogImageUrlResult: '',
      dialogVisibleResult: false,
      disabledResult: false,
      listProFileResult: [], // 上传文件信息列表
      fileList1: [],
      oldFileId: '',
      // 更换执行人
      changeDoUserNameShow: 'true',
      nextuserList: [], // 下属信息
      nextuserValue: '', // 修改后执行人
      // 详情内更换执行人
      changeNameShow: false,
      userValue: '' // 修改后执行人
    }
  },
  // 侦听器
  watch: {
    clientId: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    },
    // 业务类型侦听
    serviceId: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    },
    // 专项/日常侦听
    isUsual: function(newQuestion, oldQuestion) {
      this.getTaskfilePageList()
    },
    clickCloseNum: function(newQuestion, oldQuestion) {
      this.moreShow = false
      // console.log(this.clickCloseNum)
      this.rowClick()
    },
    // 搜索关键字
    searchWordData: function(newQuestion, oldQuestion) {
      // console.log(newQuestion)
      this.name = newQuestion.value
      this.searchHandle()
      // console.log(oldQuestion)
    }
  },
  // 钩子函数
  beforeMount() {},
  mounted() {
    this.name = this.searchWordData.value
    this.getTaskfilePageList()
    let upType = 0
    let demandType = 0
    let uploadUrl = `/pmbs/file/upload?upType=${upType}&demandType=${demandType}`
    this.uploadUrl = uploadUrl
    this.pickerOptionsTime() // 禁用时间函数
  },
  methods: {
    ///////// 选项卡 start /////////
    table_tab(e) {
      this.pageNum = 1
      this.pageNum_ = 1
      this.tabs_activity = e
    },
    ///////// 选项卡 end /////////
    pickerOptionsTime() {
      let expertTime = this.proExpertTime
      this.pickerOptions = {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7
            // || time.getTime() > new Date(expertTime).getTime()
          )
        }
      }
    },
    fileClose() {
      //监听重新上传弹框关闭 清空数据
      this.listProFile = []
    },
    // 上传文件
    handleRemoveResult(file) {
      // console.log(file)
      let data = file.response.data
      let listProFileResult = this.listProFileResult
      for (let i = 0; i < listProFileResult.length; i++) {
        let element = listProFileResult[i]
        if (element.localPath == data.path) {
          listProFileResult.splice(i, 1)
          console.log('删除')
        }
      }
      this.listProFileResult = listProFileResult
    },
    // 上传回调
    handleSuccessResult(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFileResult = this.listProFileResult
        // console.log(listProFile)
        let listProFileResultData = {
          proId: this.taskData.proId, // 项目ID
          taskId: this.taskData.taskId, // 任务ID
          fileId: '', // 文档ID
          updateUserId: this.userId, // 上传人ID
          fileName: resData.fileName, //'文档名称',
          isPro: 1, // '项目任务需求（0-项目需求，1-任务需求）',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFileResult.push(listProFileResultData)
        this.listProFileResult = listProFileResult
      }
    },
    ///////// 任务新增/修改/完成 start /////////
    taskSave(data) {
      // console.log(this.new_task.presetTime)
      // console.log(expertTime)
      this.$axios.post('/pmbs/api/task/save', data).then(this.taskSaveSuss)
    },
    // 任务新增/修改/完成回调
    taskSaveSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        // this.projectListJoin = res.data.data
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.drawer1 = false
        this.drawer5 = false
        this.result = ''
        this.listProFile = []
        this.listProFileResult = []
        this.getTaskfilePageList()
      }
    },
    ///////// 任务新增/修改/完成 end /////////
    // 取消按钮empty
    empty() {
      this.drawer1 = false
    },
    handleSizeChange() {},
    //下一页
    handleCurrentChange(page) {
      this.$nextTick(() => {
        this.$refs.documentTable.bodyWrapper.scrollTop = 0
      })
      this.pageNum = page
      this.getTaskfilePageList()
    },
    /**
     * [enterDetail 进入详情]
     */
    // 详情内修改执行人
    changeName() {
      this.changeNameShow = true
    },
    enterDetail(taskData) {
      this.taskId = taskData.taskId
    },
    //取消附件上传
    fileRemove: function() {
      this.dialogFileVisible = false
    },
    //上传文件修改附件
    fileUpload: function() {
      var taskfile = {
        proId: this.editData.proId,
        taskId: this.editData.taskId,
        updateUserId: this.editData.updateUserId,
        clientName: this.editData.clientName,
        proName: this.editData.proName,
        realName: this.editData.realName,
        taskName: this.editData.taskName,
        oldFileId: this.editData.fileId.toString()
      }

      this.$axios
        .post(
          '/pmbs/api/taskfile/importupdate',
          Object.assign(taskfile, this.listProFile[0])
        )
        .then(res => {
          this.getTaskfilePageList()
          console.log(res)
          this.dialogFileVisible = false
        })
    },
    handleExceed: function(file, fileList) {
      this.$message({
        message: '只能重新上传一个文件！',
        type: 'warning'
      })
    },
    // 删除
    handleRemove(file) {
      let data = file.response.data
      let listProFile = this.listProFile
      for (let i = 0; i < listProFile.length; i++) {
        let element = listProFile[i]
        if (element.localPath == data.path) {
          listProFile.splice(i, 1)
        }
      }
      this.listProFile = listProFile
    },
    // 上传回调
    handleSuccess(res, file, fileList) {
      // console.log('上传附件成功')
      if (res.errcode == 0) {
        let resData = res.data
        let listProFile = this.listProFile
        let listProFileData = {
          fileName: resData.fileName, //'附件名称',
          localPath: resData.path, //'本地路径',
          suffix: resData.fileType //'文档后缀'
        }
        listProFile.push(listProFileData)
        this.listProFile = listProFile
      }
    },
    // 查询按钮
    tab1_change(id) {
      // console.log(e)
      let serviceId = this.serviceId
      // let tab1_act = this.tab1_act
      if (serviceId == id) {
        this.serviceId = ''
      } else {
        this.serviceId = id
      }
    },
    tab1_more(e) {
      let moreShow = this.moreShow
      this.moreShow = !moreShow
    },
    //
    tab2_change(e, id) {
      if (this.tab2_act == e) {
        this.tab2_act = ''
        this.isUsual = '' //0 是日常 1是专项
      } else {
        this.tab2_act = e
        this.isUsual = id //0 是日常 1是专项
      }
    },
    // 搜索处理
    searchHandle: function() {
      this.getTaskfilePageList()
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex
    },
    rowClick: function(row, event, column) {
      //点击行的时候隐藏所有
      this.editable = new Array(this.tableData.length)
    },
    /**
     * [cellSave 保存文档名修改]
     */
    cellSave: function(rowIndex, row) {
      this.$axios
        .post('/pmbs/api/taskfile/updataTaskFileByFileId', {
          fileId: row.fileId,
          fileName: this.editFileName
        })
        .then(res => {
          // console.log(res)
          //更新数据 复原状态
          row.fileName = this.editFileName
          this.editable = new Array(this.tableData.length)
        })
      //成功后关闭
    },
    changeNum(index, row) {
      // console.log(row.doUserId)
      let userId = this.userId
      // console.log(userId)
      // if (row.doUserId == userId) {
        //设置是否可以编辑
        this.editable = new Array(this.tableData.length)
        this.editable[index] = true
        this.saveItem = this.tableData[index]
        this.$set(this.editable, index, true)
        //让input自动获取焦点
        this.$nextTick(function() {
          var editInputList = document.getElementsByClassName('editRemarkInput')
          editInputList[0].children[0].focus()
        })
        // 绑定当前点击的文件名
        this.editFileName = row.fileName
      // } else {
      //   this.messageWarning('您不是该任务执行人，无法修改文档名称！')
      // }
    },
    /**
     * [upload2 重新上传]
     */
    upload2(index, row) {
      this.fileList = [] //先清空之前的文件列表
      this.listProFile = []
      this.editData = row //用于后面提交数据
      this.dialogFileVisible = true //显示上传弹框
    },
    /**
     * [download 下载附件]
     */
    download(row) {
      console.log(row)
      let localPath = row.localPath
      let a = document.createElement('a')
      // a.download = `${row.fileName}.${row.suffix}`
      // a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.setAttribute(
        'href',
        'http://218.106.254.122:8084/pmbs/file/' + localPath + '/download'
      )
      a.click()
    },
    /**
     * [lookHistory 文档历史记录]
     */
    lookHistory(index, row) {
      // console.log(row);
      this.openHistory = true
      let fileId = row.fileId //项目ID查询

      if (!this.fileHistoryLoading) {
        this.fileHistoryLoading = true
        this.$axios
          .post('/pmbs/api/taskfile/getTaskfileByEdition?fileId=' + fileId, {})
          .then(res => {
            this.fileHistoryLoading = false

            if (res.data && res.data.length != 0) {
              let data = res.data
              for (let i = 0; i < data.length; i++) {
                const element = data[i]
                data[i].updateTime = this.$time(element.updateTime)
              }
              this.fileHistoryList = data
            } else {
              console.log('暂无数据')
            }
          })
          .catch(() => {
            this.fileHistoryLoading = false
          })
      }
    },
    // 获取文档列表
    getTaskfilePageList(data) {
      if (!this.loading) {
        this.loading = true

        let data = {
          userid: this.userId,
          pageNum: this.pageNum,
          pageSize: 30,
          clientId: this.clientId, //客户ID
          serviceId: this.serviceId, //
          isUsual: this.isUsual, //是否是专项
          name: this.name //搜索的关键字
        }
        this.$axios
          .post('/pmbs/api/taskfile/getTaskfilePageList', data)
          .then(this.getTaskfilePageListSuss)
      }
    },
    // 获取文档列表回调
    getTaskfilePageListSuss(res) {
      // console.log(res)
      this.loading = false
      if (res.status == 200) {
        let data = res.data.items
        for (let i = 0; i < data.length; i++) {
          let element = data[i]
          data[i].updateTime = this.$time(element.updateTime)
        }
        this.totalnum = res.data.totalRows
        let clientIdList = this.allClientIdList
        data.forEach((element, i) => {
          clientIdList.forEach(element_ => {
            if (element.clientId == element_.value) {
              data[i].clientName = element_.label
            }
          })
        })
        this.tableData = data
        // console.log(data)
      }
    },
    // 关闭任务详情回调
    closeDrawer(res) {
      // console.log(res)
      this.taskId = 0
      if (res == 1) {
        this.getParams()
      }
    },
    // 消息提示
    messageWin(message) {
      // 成功提示
      this.$message({
        message: message,
        type: 'success'
      })
    },
    messageWarning(message) {
      // 警告提示
      this.$message({
        message: message,
        type: 'warning'
      })
    },
    messageError(message) {
      // 错误提示
      this.$message.error(message)
    }
  }
}
</script>
<style lang="scss" scoped>
#document {
  height: 100%;
  .tabs {
    font-weight: 700;
    font-size: 16px;
    box-sizing: border-box;
    margin: 13px 0 13px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    div {
      margin-right: 32px;
      height: 32px;
      line-height: 32px;
      color: rgba(164, 167, 170, 1);
      box-sizing: border-box;
      padding-bottom: 13px;
      cursor: pointer;
    }
    .act {
      border-bottom: 2px solid black;
      color: black;
    }
  }
}

.document .top {
  height: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.document .top .filtrateClient {
  width: 100%;
}
.document .top .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.document .top .tab3 {
  /*height: 36px;*/
  border: none;
  color: white;
}
.document .top .tab3 .sousuo {
  width: 320px;
  /*height: 36px;*/
  border: none;
  color: white;
}
.document .top .tab1 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.document .top .tab2 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.document .top .tab3 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.document .top .tab1 button:nth-of-type(3) {
  border-left: 0;
}
.document .top .tab1 .box-card {
  width: 272px;
  padding: 0 8px;
  position: absolute;
  top: 36px;
  left: 50%;
  margin-left: -147px;
  z-index: 9999;
}
.document .top .tab1 .box-card >>> .el-card__body {
  padding: 9px 0;
}
.document .top .tab1 .box-card .moreBus {
  margin-bottom: 9px;
}
.document .top button {
  width: 72px;
  padding: 9px;
}
.document .top .more {
  width: 32px;
  padding: 9px;
}
.document .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab1 >>> .el-button,
.document .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.document .top .tab1 >>> .el-button:nth-of-type(4) {
  border-left: none;
}
.document .top .tab1 >>> .el-button:hover,
.document .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.document .top .tab1 >>> .el-button.act,
.document .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.el-button + .el-button {
  margin: 0;
}
.history-main {
  padding: 20px;
  box-sizing: border-box;
}
.history-main .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.table-main {
  height: calc(100% - 150px);
  margin-top: 13px;
}
.fileName {
  margin-bottom: 20px;
  font-size: 22px;
}
.fileName span {
  font-size: 14px;
}
.paging {
  margin-top: 24px;
  text-align: center;
}
/*  */
</style>
