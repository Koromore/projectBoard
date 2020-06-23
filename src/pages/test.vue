<template>
  <div class="test">
    <el-button @click="resetDateFilter">清除日期过滤器</el-button>
    <el-button @click="clearFilter">清除所有过滤器</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        :filter-method="filterHandler"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="100"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  // 页面名称
  name: 'test',
  // 接受父组件传值
  props: {},
  // 定义模板
  components: {},
  // Data数据
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }
      ]
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  mounted() {
    // test(){
    let data = {
      createTime: '2020-06-23T02:25:24.822Z',
      deleteFlag: true,
      depNeeds: [
        {
          createTime: {
            chronology: {
              calendarType: 'string',
              id: 'string'
            },
            dayOfMonth: 0,
            dayOfWeek: 'MONDAY',
            dayOfYear: 0,
            hour: 0,
            minute: 0,
            month: 'JANUARY',
            monthValue: 0,
            nano: 0,
            second: 0,
            year: 0
          },
          deleteFlag: true,
          initUserId: 0,
          isMust: true,
          needDesc: 'string',
          needId: 0,
          needName: 'string',
          typeId: 0,
          updateTime: {
            chronology: {
              calendarType: 'string',
              id: 'string'
            },
            dayOfMonth: 0,
            dayOfWeek: 'MONDAY',
            dayOfYear: 0,
            hour: 0,
            minute: 0,
            month: 'JANUARY',
            monthValue: 0,
            nano: 0,
            second: 0,
            year: 0
          }
        }
      ],
      deptId: 0,
      deptIdList: [0],
      deptName: 'string',
      doUserId: 0,
      doUserName: 'string',
      endTime: '2020-06-23T02:25:24.822Z',
      expertTime: '2020-06-23T02:25:24.822Z',
      faTask: 0,
      faTaskName: 'string',
      feedbackList: [
        {
          deleteFlag: true,
          deptName: 'string',
          feedback: 'string',
          feedbackFileList: [
            {
              createTime: '2020-06-23T02:25:24.822Z',
              deleteFlag: true,
              feedbackId: 0,
              fileId: 0,
              fileName: 'string',
              localPath: 'string',
              suffix: 'string',
              taskId: 0,
              updateTime: '2020-06-23T02:25:24.822Z'
            }
          ],
          feedbackId: 0,
          feedbackUserName: 'string',
          initUserId: 0,
          moreTaskId: 'string',
          nowUserId: 0,
          proId: 0,
          taskId: 0,
          updateTime: '2020-06-23T02:25:24.822Z'
        }
      ],
      ifUpdateStatus: true,
      ignore: true,
      initUserId: 0,
      initUserName: 'string',
      isIgnore: true,
      listOaUser: [
        {
          companyId: 0,
          companyName: 'string',
          deleteFlag: true,
          deptId: 0,
          deptName: 'string',
          email: 'string',
          headPortrait: 'string',
          isPass: true,
          isSubNode: true,
          jobDate: {
            date: 0,
            day: 0,
            hours: 0,
            minutes: 0,
            month: 0,
            nanos: 0,
            seconds: 0,
            time: 0,
            timezoneOffset: 0,
            year: 0
          },
          kqNumber: 'string',
          layer: 0,
          mail: 'string',
          postId: 0,
          postName: 'string',
          qq: 'string',
          realName: 'string',
          sex: true,
          subordinate: 0,
          telephone: 'string',
          unionId: 'string',
          userId: 0,
          userName: 'string',
          userPwd: 'string'
        }
      ],
      listUserId: [0],
      nowUserId: 0,
      operationDetail: 'string',
      operationType: 0,
      operationUserId: 0,
      overDesc: 'string',
      overTime: '2020-06-23T02:25:24.822Z',
      overUserId: 0,
      proExpertTime: '2020-06-23T02:25:24.822Z',
      proFileList: [
        {
          createTime: '2020-06-23T02:25:24.822Z',
          deleteFlag: true,
          fileId: 0,
          fileName: 'string',
          isPro: 0,
          localPath: 'string',
          oldProFileId: 0,
          pro: 0,
          proIdList: [0],
          ptId: 0,
          sortId: 0,
          suffix: 'string',
          updateTime: '2020-06-23T02:25:24.822Z'
        }
      ],
      proId: 0,
      proName: 'string',
      remark: 'string',
      startTime: '2020-06-23T02:25:24.822Z',
      status: 0,
      taskId: 0,
      taskName: 'string',
      taskToNeeds: [
        {
          content: 'string',
          deleteFlag: true,
          id: 0,
          needId: 0,
          needName: 'string',
          taskId: 0,
          updateTime: {
            chronology: {
              calendarType: 'string',
              id: 'string'
            },
            dayOfMonth: 0,
            dayOfWeek: 'MONDAY',
            dayOfYear: 0,
            hour: 0,
            minute: 0,
            month: 'JANUARY',
            monthValue: 0,
            nano: 0,
            second: 0,
            year: 0
          }
        }
      ],
      taskfileList: [
        {
          clientId: 0,
          clientName: 'string',
          createTime: '2020-06-23T02:25:24.822Z',
          deleteFlag: true,
          doUserId: 0,
          fileId: 'string',
          fileName: 'string',
          initUserId: 0,
          isHistory: 0,
          listUserId: [0],
          localPath: 'string',
          nowEdition: 'string',
          nowUserId: 0,
          oldFileId: 'string',
          proId: 0,
          proName: 'string',
          realName: 'string',
          sortId: 0,
          status: 0,
          suffix: 'string',
          taskId: 0,
          taskName: 'string',
          updateTime: '2020-06-23T02:25:24.822Z',
          updateUserId: 0,
          userName: 'string'
        }
      ],
      typeId: 0,
      typeName: 'string',
      updateTime: '2020-06-23T02:25:24.822Z'
    }
    // rZmk8WfCzgCsPtpt9PJwa28CrGpEt8nqm9LBng4YBtJEc7kxqe…GPa3Vi0y8Kihiwj4mFsVqXE2qCMOj0Vzi7il4CSRNwKOvX8EY
    // let datatst = this.$Encrypt(JSON.stringify(data))
    console.log(
      JSON.parse(
        this.$Decrypt(
          'xTPYEv7HZqB7nMZBoCyMwSB3s1Cn1A1A9dU2yZqY8m3Kqm63ZhzKUOd1SUnS0dTGCQknhHzrOnYSXyCG1Icix4ZyltZdCjepwPPoFS6kATOMMpw5iL7vlgducw7eSWGMTtQxgZcEsgT0JxWmhqInDxMsQrfkP9XGG9679BBgYgg8qoL1hn+w8Z1ApeiGYndkB4MZoDvhyeEnnUVqqVUFWKskUkYwR3hha8C62W7K3WIWOfcOrXmBnRK19ZBKQfd15rhhz9kXu2jNBz6CI9zybGY3AxwA/PEvZm8DeFS8HDuPG0kvd5o6igSuIw8jUkEuwjig7ENLCz49d1NaIXiJKEu35xWmXe/nIhGRC5ro0Wz7pWjUaZ5VUWK49rESS+PI72yCHYVFFhBeWjZoEjEFwoC77ZScQIuE6qOEbOZ3M4c='
        )
      )
    )
    // this.$axios
    //   .post('/pmbs/save', data)
    //   .then(res => {
    //     console.log(res)
    //     let data = this.$Decrypt(res.data)
    //     console.log(data)
    //   })
    // create(data).then(res=>{
    //     console.log(res)
    //   })
    // },
  },
  // 方法
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },

    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style scoped>
</style>
