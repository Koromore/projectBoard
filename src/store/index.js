import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import action from './action'

Vue.use(Vuex)
// 项目群ID150  项目部ID93 内容营销部64
export default new Vuex.Store({
  state: {
    user: {}, // 员工信息
    // user: { userId: 152, deptId: 1, realName:'谭运猛'}, //员工信息
    // user: { userId: 28 }, //员工信息
    // user: { userId: 527, deptId: 91, subordinate: 91, realName: '付德全' }, //员工信息
    // user: { userId: 134, deptId: 150, realName: '成志朋' }, //员工信息
    // user: { userId: 6, deptId: 41, subordinate:41, realName: '宋秀' }, //员工信息
    // user: { userId: 3914, deptId: 155, subordinate:41, realName: '鄢然' }, //员工信息
    // user: { userId: 266, deptId: 134, realName: '冯永强' }, //员工信息
    // user: { userId: 40, deptId: 134, realName: '桂婷' }, //员工信息
    // user: { userId: 403, deptId: 121, realName: '林成伟' }, //员工信息
    // user: { userId: 579, deptId: 151, realName: '杨菊玲' }, //员工信息
    // user: { userId: 982, deptId: 91, realName: '赵吉' }, //员工信息
    // user: { userId: 4001, deptId: 51, realName: '石杨' }, //员工信息
    // user: { userId: 365, deptId: 117, realName: '杨欢' }, //员工信息
    // user: { userId: 147, deptId: 51, subordinate:51, realName: '张倩' }, //员工信息
    // user: { userId: 33, deptId: 121, realName: '聂玲' }, //员工信息
    // user: { userId: 10, deptId: 102, realName: '陆彪' }, //员工信息
    // user: { userId: 194, deptId: 45, realName: '卢雄飞' }, //员工信息
    // user: { userId: 9, deptId:27,subordinate:27, realName: '郑开喜' }, //员工信息
    // user: { userId: 4023, deptId:51, realName: '刘特' }, //员工信息
    // user: { userId: 3714, deptId:91, realName: '杨梦倩' }, //员工信息
    // user: { userId: 3820, deptId:91, realName: '黄震宇' }, //员工信息
    // user: { userId: 830, deptId:91, realName: '唐攀' }, //员工信息
    // user: { userId: 719, deptId:45, realName: '李小曼' }, //员工信息
    // user: { userId: 231, deptId:105, realName: '蔡玲' }, //员工信息
    // user: { userId: 585, deptId:45, realName: '方全书' }, //员工信息
    // user: { userId: 41, deptId:153, realName: '冯萌' }, //员工信息
    // user: { userId: 28, deptId:90, realName: '田莉霞' }, //员工信息
    // user: { userId: 3910, deptId:51, realName: '黄天倚' }, //员工信息
    // user: { userId: 484, deptId:90, realName: '朱双' }, //员工信息
    // user: { userId: 3823, deptId:91, realName: '翟俊雄' }, //员工信息
    // user: { userId: 3947, deptId:45, realName: '朱竑睿' }, //员工信息
    // user: { userId: 194, deptId:45, realName: '卢雄飞' }, //员工信息
    // user: { userId: 585, deptId:45, realName: '方全书' }, //员工信息
    // user: { userId: 103, deptId:90, realName: '张旗' }, //员工信息
    // user: { userId: 946, deptId:91, realName: '陈磊' }, //员工信息
    // user: { userId: 877, deptId:150, realName: '肖坤' }, //员工信息
    // user: { userId: 3775, deptId:45, realName: '马寅波' }, //员工信息
    // user: { userId: 783, deptId:91, realName: '郭树钢' }, //员工信息
    // user: { userId: 415, deptId:153, realName: '褚艳珍' }, //员工信息
    // user: { userId: 3713, deptId:91, realName: '方兵' }, //员工信息
    // user: { userId: 539, deptId:121, realName: '刘定寰' }, //员工信息
    // user: { userId: 54, deptId:125, realName: '胡婷' }, //员工信息
    // user: { userId: 548, deptId:119, realName: '韩攀' }, //员工信息
    // user: { userId: 764, deptId:91, realName: '刘婵' }, //员工信息
    // user: { userId: 3985, deptId:102, realName: '朱俊' }, //员工信息
    // user: { userId: 768, deptId:45, realName: '张航' }, //员工信息
    // user: { userId: 572, deptId:118, realName: '赵颖慧' }, //员工信息
    token: '', // 登录令牌
    userSign: '', // 用户信息带参
    // isLogin: 'error', //error/success, // 是否登陆
    isLogin: 'success', //error/success, // 是否登陆
    isRouterAlive: true, // 控制页面刷新
    projectListNum: 1,
    proExpertTime: '',
    projectPageNum: 1,
    projectPageNum_: 1
  },
  action: {

  },
  mutations: {
    // 项目列表我参与/我发起显示
    projectListShow(state, data) {
      state.projectListNum = data
    },
    // 项目列表我发起分页记录
    projectPageNumRecord(state, data) {
      state.projectPageNum = data
      // console.log('我发起'+state.projectPageNum)
    },
    // 项目列表我参与分页记录
    projectPageNumRecord_(state, data) {
      state.projectPageNum_ = data
      // console.log('我参与'+state.projectPageNum_)
    },
    /**
     * [reload 控制页面刷新]
     */
    beginReload(state) {
      // this.$store.commit('beginReload');

      //         this.$nextTick(()=>{
      //             this.$store.commit('endReload');
      //         })
      state.isRouterAlive = false;
    },
    /**
     * [endReload 恢复页面]
     */
    endReload(state) {
      state.isRouterAlive = true;
    },
    //登录
    login(state, data) {
      // 将获取到的user，token和微信标识存在vuex内
      state.user = data.user;
      state.token = data.token;
      state.userSign = data.userSign;
      // state.isLogin = window.sessionStorage.getItem('isLogin') || 'error';
      // 将获取到的user，token和微信标识存在缓存内
      localStorage.user = JSON.stringify(data.user);
      localStorage.token = data.token;
      localStorage.userSign = data.userSign;

    },
    /**
     * [clearToken 清除token信息]
     */
    clearToken(state, data) {
      console.log('拦截错误信息,应该跳登录了');
      // window.sessionStorage.setItem('isLogin','error');
      // state.isLogin = 'error';

      //清空 localStorage 的值 并跳转扫码页
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userSign');
      window.location.replace('http://guoxin.insun-china.com/hrm');

    },
    //退出登录
    logout(state, data) {
      window.sessionStorage.setItem('isLogin', 'error');
      state.isLogin = 'error';
      //清空 localStorage 的值
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userSign');
    }
  }
})