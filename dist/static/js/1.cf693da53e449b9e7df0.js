webpackJsonp([1],{vgv4:function(t,e){},ydW9:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("lHA8"),i=s.n(a),n=s("c/Tr"),r=s.n(n),l=s("bOdI"),o=s.n(l),c=s("xxyk"),u={name:"task",props:{allBusinessList:Array,userclientIdList:Array,clickCloseNum:Number,searchWordData:Object},components:{taskDetail:c.a},data:function(){var t;return t={userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,loading:!1,taskId:0,task_type:[],task_type_value:"",pageNum0:1,pageNum1:1,businessList:this.$store.state.businessList,moreShow:!1,clientIdList:this.$store.state.clientIdList,clientId:"",serviceId:"",isUsual:"",status:"",drawer1:!1,drawer2:!1,drawer3:!1,drawer2_task:"",drawer3_task:"",changeDoUserNameShow:"true",nextuserList:[],nextuserValue:"",loginState:!0,filtratePro:[],filtrateDep:[],tasklist:[],initiateTaskListTota:0,tasklist_:[],participateTaskListTota:0,tableData2:[],result:"",resultBan:!1,cause:"",tabs_activity:1,tab1_act:"",tab2_act:"",suggest_list:[],statusList:[{value:1,label:"执行中"},{value:2,label:"完成"}],statusList_:[{value:2,label:"完成"},{value:4,label:"延期"}],statusListValue:"",taskData:{},proExpertTime:"",pickerOptions:{},taskFeedbackId:"",projFeedbackId:"",feedbackContent:"",feedbackFileList:[],dialogImageUrl:"",dialogVisible:!1,disabled:!1,uploadUrl:"",listProFile:[]},o()(t,"suggest_list",[]),o()(t,"fileList0",[]),o()(t,"updateBan",!1),o()(t,"dialogImageUrlResult",""),o()(t,"dialogVisibleResult",!1),o()(t,"disabledResult",!1),o()(t,"uploadUrl",""),o()(t,"listProFileResult",[]),o()(t,"fileList1",[]),o()(t,"oldFileId",""),o()(t,"changeNameShow",!1),o()(t,"userValue",""),t},watch:{clientId:function(t,e){var s=this.tabs_activity;this.findTaskList(s)},serviceId:function(t,e){var s=this.tabs_activity;this.findTaskList(s)},isUsual:function(t,e){var s=this.tabs_activity;this.findTaskList(s)},status:function(t,e){var s=this.tabs_activity;this.findTaskList(s)},tabs_activity:function(t,e){if(152!=this.userId){var s=this.tabs_activity;this.findTaskList(s)}},clickCloseNum:function(t,e){this.moreShow=!1,this.changeDoUserNameShow="true"},searchWordData:function(t,e){console.log(t);var s=t.value,a=this.tabs_activity;this.getTasklist(a,s)}},methods:{pickerOptionsTime:function(){var t=this.proExpertTime;this.pickerOptions={disabledDate:function(e){return e.getTime()<Date.now()-864e5||e.getTime()>new Date(t).getTime()}}},widthheight:function(){window.innerWidth,window.innerHeight},table_tab:function(t){this.tabs_activity=t},tab1_change:function(t){var e=this.serviceId;this.serviceId=e==t?"":t},tab1_more:function(t){var e=this.moreShow;this.moreShow=!e},tab2_change:function(t,e){this.tab2_act==t?(this.tab2_act="",this.isUsual=""):1==t?(this.tab2_act=1,this.isUsual=e):2==t&&(this.tab2_act=2,this.isUsual=e)},tab3_change:function(t){var e=this.status;this.status=e==t?"":t},feedback:function(t){this.drawer2=!0,this.drawer2_task=t.proName+"-"+t.taskName,this.taskFeedbackId=t.taskId,this.projFeedbackId=t.proId,0!=this.feedbackFileList.length&&(this.$refs.upload.clearFiles(),this.feedbackFileList=[])},sponsor_achieve:function(t){var e=this;this.$confirm("是否确认此操作？","确认信息",{distinguishCancelAndClose:!0,confirmButtonText:"确认",cancelButtonText:"取消"}).then(function(){var s=new Date(new Date(t.expertTime).getTime()+864e5),a=new Date,i={proId:t.proId,taskId:t.taskId,expertTime:t.expertTime,status:3,operationDetail:"",operationType:14,operationUserId:e.userId};s<a&&(i.status=5),e.approveTask(i)}).catch(function(t){e.$message({type:"info",message:"已取消"})})},approveTask:function(t){var e=this;this.$axios.post("/pmbs/api/task/approveTask",t).then(function(t){200==t.status&&(e.messageWin(t.data.msg),e.getTasklist(e.tabs_activity))})},join_redact:function(t){var e=this;this.$confirm("是否忽略此任务","确认信息",{distinguishCancelAndClose:!0,confirmButtonText:"确认",cancelButtonText:"取消"}).then(function(){var s="taskId="+t;e.ignoreTask(s)}).catch(function(t){e.$message({type:"info",message:"放弃"})})},join_achieve:function(t,e,s){4==s&&(this.drawer3=!0,this.drawer3_task=e)},ignoreTask:function(t){var e=this;this.$axios.post("/pmbs/api/task/ignoreTask?"+t).then(function(t){200==t.status&&(e.messageWin(t.data.msg),e.getTasklist(e.tabs_activity))})},filterName:function(t,e){return e.name===t},filterDepartment:function(t,e){return e.department===t},task_detail:function(t,e){this.taskId=t.taskId},changeDoUserName:function(t,e){this.changeDoUserNameShow=t,this.getNextuserList(e)},getNextuserList:function(t){var e=t,s=[];if(null!=e)for(var a=0;a<e.length;a++){var i=e[a],n={value:i.userId,label:i.realName};s.push(n)}this.nextuserList=s},changeDoUserNameAffirm:function(t){var e=this.nextuserValue;""==e?this.changeDoUserNameShow="true":(t.doUserId=e,t.proFileList=[],this.$axios.post("/pmbs/api/task/save",t).then(this.changeDoUserNameAffirmSuss))},changeDoUserNameAffirmSuss:function(t){200==t.status&&(this.messageWin("执行人修改成功"),this.getTasklist(1),this.changeDoUserNameShow="true")},findTaskList:function(t){var e={type:0,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status},pageNum:1,pageSize:30},s={type:1,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status},pageNum:1,pageSize:30};0==t?this.getTasklistAjax(e):1==t&&this.getTasklistAjax_(s)},unique:function(t){return r()(new i.a(t))},getTasklist:function(t,e){var s={type:0,task:{initUserId:this.userId},pageNum:1,pageSize:30},a={type:1,task:{initUserId:this.userId},pageNum:1,pageSize:30};void 0!=e&&""!=e&&(s.task.taskName=e,a.task.taskName=e),0==t?this.getTasklistAjax(s):1==t&&this.getTasklistAjax_(a)},getTasklistAjax:function(t){this.loading=!0,this.$axios.post("/pmbs/api/task/listAjax",t).then(this.getTasklistAjaxSuss)},getTasklistAjaxSuss:function(t){if(this.loading=!1,200==t.status){var e=t.data.data.items;this.tasklist=e,this.initiateTaskListTota=t.data.data.totalRows}},getTasklistAjax_:function(t){this.loading=!0,this.$axios.post("/pmbs/api/task/listAjax",t).then(this.getTasklistAjax_Suss)},getTasklistAjax_Suss:function(t){if(this.loading=!1,200==t.status){var e=t.data.data.items;this.tasklist_=e,this.participateTaskListTota=t.data.data.totalRows}},taskSave:function(t){this.$axios.post("/pmbs/api/task/save",t).then(this.taskSaveSuss)},taskSaveSuss:function(t){200==t.status&&(this.messageWin(t.data.msg),this.result="",this.listProFile=[],this.listProFileResult=[],this.getTasklist(0))},taskDelete:function(t){var e="?id="+t;this.$axios.post("/pmbs/api/task/delete"+e).then(this.taskDeleteSuss)},taskDeleteSuss:function(t){if(200==t.status)t.data},handleRemoveFeedback:function(t){for(var e=this.feedbackFileList,s=t.response.data,a=0;a<e.length;a++){e[a].localPath==s.path&&e.splice(a,1)}this.feedbackFileList=e},handleSuccessFeedback:function(t){var e=t.data,s=this.feedbackFileList,a=new Date,i={createTime:a,deleteFlag:!1,feedbackId:"",fileId:"",fileName:e.fileName,localPath:e.path,suffix:e.fileType,taskId:"",updateTime:a};s.push(i)},exceed:function(){this.messageWarning("只能上传一个文件")},feedbackClose:function(){this.$refs.feedbackUpload.clearFiles(),this.feedbackFileList=[],this.feedbackContent=""},taskFeedback:function(){for(var t=(new Date).getTime(),e=this.taskFeedbackId,s=this.feedbackFileList,a=0;a<s.length;a++){s[a];s[a].taskId=e}var i={feedback:this.feedbackContent,feedbackFileList:s,initUserId:this.userId,proId:this.projFeedbackId,taskId:e,updateTime:t};console.log(i),""==i.feedback?this.messageError("信息不能为空"):this.$axios.post("/pmbs/api/project/taskfeedback",i).then(this.taskFeedbackSuss)},taskFeedbackSuss:function(t){200==t.status&&(this.messageWin("反馈成功"),this.drawer2=!1,this.feedbackContent="",this.taskFeedbackId="",this.getTasklist(0))},cancel:function(){this.drawer1=!1},initiateTaskList:function(t){var e=this;this.pageNum0=t,this.$nextTick(function(){e.$refs.initiateTable.bodyWrapper.scrollTop=0});var s={type:0,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status,taskName:this.searchWordData.value},pageNum:t,pageSize:30};this.getTasklistAjax(s)},participateTaskList:function(t){var e=this;this.pageNum1=t,this.$nextTick(function(){e.$refs.joinTable.bodyWrapper.scrollTop=0});var s={type:1,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status,taskName:this.searchWordData.value},pageNum:t,pageSize:30};this.getTasklistAjax_(s)},changeName:function(){this.changeNameShow=!0},download:function(t){var e=t.localPath,s=document.createElement("a");s.setAttribute("href","http://218.106.254.122:8084/pmbs/file/"+e+"/download"),s.click()},empty:function(){this.drawer3=!1,this.drawer2=!1,this.feedbackContent="",this.result=""},closeDrawer:function(t){this.taskId=0;var e=this.tabs_activity;if(1==t)if(0==e){var s={type:0,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status},pageNum:this.pageNum0};this.getTasklistAjax(s)}else if(1==e){var a={type:1,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,task:{initUserId:this.userId,status:this.status},pageNum:this.pageNum1,pageSize:30};this.getTasklistAjax_(a)}},pathPrpjectDetails:function(t,e){this.$router.push({path:"/home/components/project_details",query:{id:t,type:e}})},messageWin:function(t){this.$message({message:t,type:"success"})},messageWarning:function(t){this.$message({message:t,type:"warning"})},messageError:function(t){this.$message.error(t)}},mounted:function(){152==this.userId&&(this.tabs_activity=0);var t=this.searchWordData.value;this.getTasklist(this.tabs_activity,t)}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"task"}},[s("el-row",{staticClass:"task"},[s("el-col",{staticClass:"top",attrs:{span:24}},[s("el-col",{attrs:{span:5}},[s("el-col",{staticClass:"title",attrs:{span:4}},[t._v("客户")]),t._v(" "),s("el-col",{attrs:{span:20}},[s("el-select",{staticClass:"filtrateClient",attrs:{filterable:"",clearable:"",placeholder:"全部",size:"small"},model:{value:t.clientId,callback:function(e){t.clientId=e},expression:"clientId"}},t._l(t.userclientIdList,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab1",attrs:{span:7}},[s("el-button-group",[t._l(t.allBusinessList[0],function(e,a){return s("el-button",{key:a,class:[t.serviceId==e.businessId?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(s){return t.tab1_change(e.businessId)}}},[t._v(t._s(e.businessName))])}),t._v(" "),t.allBusinessList[1]?s("el-button",{class:[1==t.moreShow?"act more":"more"],staticStyle:{"border-left":"0"},attrs:{type:"primary",plain:"",size:"small",icon:"el-icon-more"},on:{click:function(e){return e.stopPropagation(),t.tab1_more()}}}):t._e()],2),t._v(" "),s("el-card",{directives:[{name:"show",rawName:"v-show",value:t.moreShow,expression:"moreShow"}],staticClass:"box-card"},t._l(t.allBusinessList,function(e,a){return s("el-button-group",{directives:[{name:"show",rawName:"v-show",value:0!=a,expression:"index != 0"}],key:a,staticClass:"moreBus"},t._l(e,function(e,a){return s("el-button",{key:a,class:[t.serviceId==e.businessId?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(s){return s.stopPropagation(),t.tab1_change(e.businessId)}}},[t._v(t._s(e.businessName))])}),1)}),1)],1),t._v(" "),s("el-col",{staticClass:"tab tab2",attrs:{span:4}},[s("el-button-group",[s("el-button",{class:["1"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(1,1)}}},[t._v("专项")]),t._v(" "),s("el-button",{class:["2"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(2,0)}}},[t._v("日常")])],1)],1),t._v(" "),s("el-col",{staticClass:"tab tab3",attrs:{span:8}},[s("el-button-group",[s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.tab3_change(1)}}},[t._v("新任务")]),t._v(" "),s("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(e){return t.tab3_change(4)}}},[t._v("延期")]),t._v(" "),s("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(e){return t.tab3_change(2)}}},[t._v("审核中")]),t._v(" "),s("el-button",{attrs:{type:"success",size:"small"},on:{click:function(e){return t.tab3_change(1)}}},[t._v("执行中")])],1)],1)],1),t._v(" "),152!=t.userId?s("el-col",{staticClass:"tabs",attrs:{span:24}},[s("div",{class:[1==t.tabs_activity?"act":""],on:{click:function(e){return t.table_tab(1)}}},[t._v("我参与")]),t._v(" "),s("div",{class:[0==t.tabs_activity?"act":""],on:{click:function(e){return t.table_tab(0)}}},[t._v("我发起")])]):t._e(),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:1==t.tabs_activity,expression:"tabs_activity==1"}],staticClass:"table table2",attrs:{span:24}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"joinTable",staticStyle:{width:"100%"},attrs:{data:t.tasklist_,height:"100%","header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"},align:"left"}},[s("el-table-column",{attrs:{prop:"taskName",label:"任务名称","show-overflow-tooltip":"","min-width":"115"},scopedSlots:t._u([{key:"default",fn:function(e){return s("el-link",{attrs:{type:"primary"},on:{click:function(s){return t.task_detail(e.row,1)}}},[t._v(t._s(e.row.taskName))])}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"proName",label:"所属项目","show-overflow-tooltip":"","min-width":"115"},scopedSlots:t._u([{key:"default",fn:function(e){return s("el-link",{nativeOn:{click:function(s){return t.pathPrpjectDetails(e.row.proId,0)}}},[t._v(t._s(e.row.proName))])}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"status",label:"状态",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isIgnore?s("span",{staticClass:"state_color3"},[t._v("忽略")]):1==e.row.status?s("span",{staticClass:"state_color1"},[t._v("执行中")]):2==e.row.status?s("span",{staticClass:"state_color2"},[t._v("审核中")]):3==e.row.status?s("span",{staticClass:"state_color3"},[t._v("完成")]):4==e.row.status?s("span",{staticClass:"state_color4"},[t._v("延期")]):5==e.row.status?s("span",{staticClass:"state_color3"},[t._v("延期完成")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"doUserName",label:"执行人",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{directives:[{name:"show",rawName:"v-show",value:t.changeDoUserNameShow!=e.$index,expression:"changeDoUserNameShow != scope.$index"}],staticClass:"doUserName"},[s("span",[t._v(t._s(e.row.doUserName))]),t._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:1!=e.row.isIgnore&&e.row.listOaUser.length>1&&2!=e.row.status&&3!=e.row.status&&5!=e.row.status,expression:"scope.row.isIgnore != true && scope.row.listOaUser.length > 1 && scope.row.status != 2 && scope.row.status != 3 && scope.row.status != 5"}],attrs:{src:"static/images/task/change.png",width:"18",alt:"",srcset:""},on:{click:function(s){return s.stopPropagation(),t.changeDoUserName(e.$index,e.row.listOaUser)}}})]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.changeDoUserNameShow==e.$index,expression:"changeDoUserNameShow == scope.$index"}]},[s("el-select",{staticStyle:{width:"99px"},attrs:{filterable:"",placeholder:"请选择",size:"mini",clearable:""},model:{value:t.nextuserValue,callback:function(e){t.nextuserValue=e},expression:"nextuserValue"}},t._l(t.nextuserList,function(t){return s("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1),t._v(" "),s("el-button",{attrs:{slot:"append",type:"primary",size:"mini"},on:{click:function(s){return s.stopPropagation(),t.changeDoUserNameAffirm(e.row)}},slot:"append"},[t._v("确认")])],1)]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"expertTime",label:"预计时间",sortable:"",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.expertTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"overTime",label:"完成时间",sortable:"",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.overTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"initUserName",label:"下达人",width:"80"}}),t._v(" "),s("el-table-column",{attrs:{prop:"taskfileList","show-overflow-tooltip":"",label:"成果",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return 0!=e.row.taskfileList.length?s("div",{staticClass:"taskfile",on:{click:function(s){return t.download(e.row.taskfileList[0])}}},["doc"==e.row.taskfileList[0].suffix||"docx"==e.row.taskfileList[0].suffix?s("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==e.row.taskfileList[0].suffix||"xlsx"==e.row.taskfileList[0].suffix?s("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==e.row.taskfileList[0].suffix||"pptx"==e.row.taskfileList[0].suffix?s("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):s("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),s("el-link",{staticClass:"filenametext",attrs:{type:"primary"}},[t._v(t._s(e.row.taskfileList[0].fileName))])],1):t._e()}}],null,!0)}),t._v(" "),152!=t.userId?s("el-table-column",{attrs:{prop:"operation",label:"操作",width:"160","filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return 1!=e.row.isIgnore&&1!=e.row.isIgnore&&e.row.doUserId==t.userId&&2!=e.row.status&&3!=e.row.status&&5!=e.row.status?[s("el-button",{attrs:{slot:"reference",size:"mini",type:"info"},on:{click:function(s){return t.join_redact(e.row.taskId)}},slot:"reference"},[t._v("忽略")]),t._v(" "),s("el-button",{attrs:{slot:"reference",size:"mini",type:"primary"},on:{click:function(s){return t.task_detail(e.row,1)}},slot:"reference"},[t._v("完成")])]:void 0}}],null,!0)}):t._e()],1),t._v(" "),s("el-col",{staticClass:"page",attrs:{span:24}},[s("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","page-size":30,total:t.participateTaskListTota},on:{"current-change":t.participateTaskList}})],1)],1),t._v(" "),s("el-col",{directives:[{name:"show",rawName:"v-show",value:0==t.tabs_activity,expression:"tabs_activity==0"}],staticClass:"table table1",attrs:{span:24}},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"initiateTable",staticStyle:{width:"100%"},attrs:{data:t.tasklist,height:"100%","header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"},"row-style":{text_aling:"left"}}},[s("el-table-column",{attrs:{prop:"taskName",label:"任务名称","show-overflow-tooltip":"","min-width":"210"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-link",{attrs:{type:"primary"},on:{click:function(s){return t.task_detail(e.row,0)}}},[t._v(t._s(e.row.taskName))]),t._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.row.faTaskName,placement:"bottom"}},[0!=e.row.faTask?s("span",{staticClass:"faTask"},[t._v("父")]):t._e()])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"proName",label:"所属项目","column-key":"name","show-overflow-tooltip":"","min-width":"210"},scopedSlots:t._u([{key:"default",fn:function(e){return s("el-link",{nativeOn:{click:function(s){return t.pathPrpjectDetails(e.row.proId,0)}}},[t._v(t._s(e.row.proName))])}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"deptName",label:"部门","min-width":"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"status",label:"状态","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isIgnore?s("span",{staticClass:"state_color3"},[t._v("忽略")]):1==e.row.status?s("span",{staticClass:"state_color1"},[t._v("执行中")]):2==e.row.status?s("span",{staticClass:"state_color2"},[t._v("审核中")]):3==e.row.status?s("span",{staticClass:"state_color3"},[t._v("完成")]):4==e.row.status?s("span",{staticClass:"state_color4"},[t._v("延期")]):5==e.row.status?s("span",{staticClass:"state_color3"},[t._v("延期完成")]):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"expertTime",label:"预计时间",sortable:"","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.$date(e.row.expertTime)))]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"tag",label:"操作","min-width":"160","filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return 1!=e.row.isIgnore&&1!=e.row.isIgnore?[1!=e.row.isIgnore&&1==e.row.status||2==e.row.status||4==e.row.status?s("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(s){return t.feedback(e.row)}}},[t._v("反馈")]):t._e(),t._v(" "),1!=e.row.isIgnore&&2==e.row.status?s("el-button",{attrs:{slot:"reference",size:"mini",type:"primary"},on:{click:function(s){return t.sponsor_achieve(e.row)}},slot:"reference"},[t._v("完成")]):t._e()]:void 0}}],null,!0)})],1),t._v(" "),s("el-col",{staticClass:"page",attrs:{span:24}},[s("el-pagination",{attrs:{background:"",layout:"total, prev, pager, next","page-size":30,total:t.initiateTaskListTota},on:{"current-change":t.initiateTaskList}})],1)],1),t._v(" "),s("taskDetail",{attrs:{taskId:t.taskId},on:{closeDrawer:t.closeDrawer}}),t._v(" "),s("el-drawer",{attrs:{title:t.drawer2_task,visible:t.drawer2},on:{"update:visible":function(e){t.drawer2=e},close:t.feedbackClose}},[s("el-row",{staticClass:"feedback"},[s("el-col",{attrs:{span:24}},[s("el-col",{staticClass:"title snow",attrs:{span:6}},[t._v("反馈")]),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-input",{attrs:{type:"textarea",rows:9,placeholder:"请输入内容",maxlength:"300","show-word-limit":""},model:{value:t.feedbackContent,callback:function(e){t.feedbackContent=e},expression:"feedbackContent"}})],1),t._v(" "),s("el-col",{staticClass:"title",staticStyle:{"margin-top":"24px"},attrs:{span:6}},[t._v("附件")]),t._v(" "),s("el-col",{staticClass:"Upload",attrs:{span:24}},[s("el-upload",{ref:"feedbackUpload",staticClass:"elementUpload",attrs:{action:"/pmbs/file/upload?upType=1&demandType=1","on-remove":t.handleRemoveFeedback,"on-success":t.handleSuccessFeedback,limit:1,"on-exceed":t.exceed}},[s("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("点击上传文档")]),t._v(" "),s("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传一个文件")])],1)],1)],1),t._v(" "),s("el-col",{staticClass:"batton",attrs:{span:24}},[s("el-button",{attrs:{size:"small",type:"info"},on:{click:t.empty}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.taskFeedback}},[t._v("提交")])],1)],1)],1),t._v(" "),s("el-drawer",{attrs:{title:t.drawer3_task,visible:t.drawer3},on:{"update:visible":function(e){t.drawer3=e}}},[s("el-row",{staticClass:"feedback"},[s("el-col",{attrs:{span:24}},[s("el-col",{staticClass:"title",attrs:{span:6}},[t._v("延期原因")]),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-input",{attrs:{type:"textarea",rows:9,placeholder:"请输入内容",maxlength:"300","show-word-limit":""},model:{value:t.cause,callback:function(e){t.cause=e},expression:"cause"}})],1)],1),t._v(" "),s("el-col",{staticClass:"batton",attrs:{span:12,offset:7}},[s("el-button",{attrs:{size:"small",type:"info"},on:{click:t.empty}},[t._v("取消")]),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"}},[t._v("提交")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var p=s("VU/8")(u,d,!1,function(t){s("vgv4")},"data-v-de0fd116",null);e.default=p.exports}});