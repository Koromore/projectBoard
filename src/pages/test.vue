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
      depType: {
        createTime: '2020-06-22T01:41:56.186Z',
        deleteFlag: true,
        deptId: 0,
        typeId: 0,
        typeName: 'string',
        updateTime: '2020-06-22T01:41:56.186Z'
      },
      ids: 'string',
      limit: 0,
      offset: 0,
      orderBys: 'string',
      pageNum: 0,
      pageSize: 0,
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
      ]
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
