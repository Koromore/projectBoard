webpackJsonp([1],{"0E0D":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("woOf"),a=i.n(s),l=i("bOdI"),o=i.n(l),n=i("xxyk"),r={name:"document",props:{allBusinessList:Array,allClientIdList:Array,userclientIdList:Array,clickCloseNum:Number,searchWordData:Object},components:{taskDetail:n.a},data:function(){var t;return t={userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,taskId:0,openHistory:!1,editFileName:"",clientId:"",serviceId:"",isUsual:"",name:"",loading:!1,tab1_act:"",tab2_act:"",businessList:this.$store.state.businessList,moreShow:!1,clientIdList:this.$store.state.clientIdList,client:"广汽本田",fileHistoryList:[],fileHistoryLoading:!1,tableData:[],editable:[],pageNum:1,totalnum:0,fileList:[],listProFile:[],uploadUrl:"",dialogFileVisible:!1,editData:"",openTaskVisible:!1,taskData:{},suggest_list:[],statusList:[{value:1,label:"执行中"},{value:2,label:"完成"}],statusList_:[{value:2,label:"完成"},{value:4,label:"延期"}],statusListValue:"",drawer1:!1,listProFileResult:[],result:"",drawerLoading:!1,proExpertTime:"",pickerOptions:{},task_type:[],task_type_value:""},o()(t,"uploadUrl",""),o()(t,"dialogImageUrl",""),o()(t,"dialogVisible",!1),o()(t,"disabled",!1),o()(t,"listProFile_",[]),o()(t,"suggest_list",[]),o()(t,"fileList0",[]),o()(t,"updateBan",!1),o()(t,"dialogImageUrlResult",""),o()(t,"dialogVisibleResult",!1),o()(t,"disabledResult",!1),o()(t,"listProFileResult",[]),o()(t,"fileList1",[]),o()(t,"oldFileId",""),o()(t,"changeDoUserNameShow","true"),o()(t,"nextuserList",[]),o()(t,"nextuserValue",""),o()(t,"changeNameShow",!1),o()(t,"userValue",""),t},watch:{clientId:function(t,e){this.getTaskfilePageList()},serviceId:function(t,e){this.getTaskfilePageList()},isUsual:function(t,e){this.getTaskfilePageList()},clickCloseNum:function(t,e){this.moreShow=!1,this.rowClick()},searchWordData:function(t,e){this.name=t.value,this.searchHandle()}},beforeMount:function(){},mounted:function(){this.getTaskfilePageList();this.uploadUrl="/pmbs/file/upload?upType=0&demandType=0",this.pickerOptionsTime()},methods:{pickerOptionsTime:function(){this.proExpertTime;this.pickerOptions={disabledDate:function(t){return t.getTime()<Date.now()-864e5}}},fileClose:function(){this.listProFile=[]},handleRemoveResult:function(t){for(var e=t.response.data,i=this.listProFileResult,s=0;s<i.length;s++){i[s].localPath==e.path&&(i.splice(s,1),console.log("删除"))}this.listProFileResult=i},handleSuccessResult:function(t,e,i){if(0==t.errcode){var s=t.data,a=this.listProFileResult,l={proId:this.taskData.proId,taskId:this.taskData.taskId,fileId:"",updateUserId:this.userId,fileName:s.fileName,isPro:1,localPath:s.path,suffix:s.fileType};a.push(l),this.listProFileResult=a}},taskSave:function(t){this.$axios.post("/pmbs/api/task/save",t).then(this.taskSaveSuss)},taskSaveSuss:function(t){200==t.status&&(this.$message({message:t.data.msg,type:"success"}),this.drawer1=!1,this.drawer5=!1,this.result="",this.listProFile=[],this.listProFileResult=[],this.getTaskfilePageList())},empty:function(){this.drawer1=!1},handleSizeChange:function(){},handleCurrentChange:function(t){this.pageNum=t,this.getTaskfilePageList()},changeName:function(){this.changeNameShow=!0},enterDetail:function(t){this.taskId=t.taskId},fileRemove:function(){this.dialogFileVisible=!1},fileUpload:function(){var t=this,e={proId:this.editData.proId,taskId:this.editData.taskId,updateUserId:this.editData.updateUserId,clientName:this.editData.clientName,proName:this.editData.proName,realName:this.editData.realName,taskName:this.editData.taskName,oldFileId:this.editData.fileId.toString()};this.$axios.post("/pmbs/api/taskfile/importupdate",a()(e,this.listProFile[0])).then(function(e){t.getTaskfilePageList(),console.log(e),t.dialogFileVisible=!1})},handleExceed:function(t,e){this.$message({message:"只能重新上传一个文件！",type:"warning"})},handleRemove:function(t){for(var e=t.response.data,i=this.listProFile,s=0;s<i.length;s++){i[s].localPath==e.path&&i.splice(s,1)}this.listProFile=i},handleSuccess:function(t,e,i){if(0==t.errcode){var s=t.data,a=this.listProFile,l={fileName:s.fileName,localPath:s.path,suffix:s.fileType};a.push(l),this.listProFile=a}},tab1_change:function(t){var e=this.serviceId;this.serviceId=e==t?"":t},tab1_more:function(t){var e=this.moreShow;this.moreShow=!e},tab2_change:function(t,e){this.tab2_act==t?(this.tab2_act="",this.isUsual=""):(this.tab2_act=t,this.isUsual=e)},searchHandle:function(){this.getTaskfilePageList()},tableRowClassName:function(t){var e=t.row,i=t.rowIndex;e.index=i},rowClick:function(t,e,i){this.editable=new Array(this.tableData.length)},cellSave:function(t,e){var i=this;this.$axios.post("/pmbs/api/taskfile/updataTaskFileByFileId",{fileId:e.fileId,fileName:this.editFileName}).then(function(t){e.fileName=i.editFileName,i.editable=new Array(i.tableData.length)})},changeNum:function(t,e){this.editable=new Array(this.tableData.length),this.editable[t]=!0,this.saveItem=this.tableData[t],this.$set(this.editable,t,!0),this.$nextTick(function(){document.getElementsByClassName("editRemarkInput")[0].children[0].focus()}),this.editFileName=e.fileName},upload2:function(t,e){this.fileList=[],this.listProFile=[],this.editData=e,this.dialogFileVisible=!0},download:function(t){var e=t.localPath,i=document.createElement("a");i.download=t.fileName+"."+t.suffix,i.setAttribute("href","http://218.106.254.122:8084/pmbs/"+e),i.click()},lookHistory:function(t,e){var i=this;this.openHistory=!0;var s=e.fileId;this.fileHistoryLoading||(this.fileHistoryLoading=!0,this.$axios.post("/pmbs/api/taskfile/getTaskfileByEdition?fileId="+s,{}).then(function(t){if(i.fileHistoryLoading=!1,t.data&&0!=t.data.length){for(var e=t.data,s=0;s<e.length;s++){var a=e[s];e[s].updateTime=i.$time(a.updateTime)}i.fileHistoryList=e}else console.log("暂无数据")}).catch(function(){i.fileHistoryLoading=!1}))},getTaskfilePageList:function(t){if(!this.loading){this.loading=!0;var e={userid:this.userId,pageNum:this.pageNum,pageSize:30,clientId:this.clientId,serviceId:this.serviceId,isUsual:this.isUsual,name:this.name};this.$axios.post("/pmbs/api/taskfile/getTaskfilePageList",e).then(this.getTaskfilePageListSuss)}},getTaskfilePageListSuss:function(t){if(this.loading=!1,200==t.status){for(var e=t.data.items,i=0;i<e.length;i++){var s=e[i];e[i].updateTime=this.$time(s.updateTime)}this.totalnum=t.data.totalRows;var a=this.allClientIdList;e.forEach(function(t,i){a.forEach(function(s){t.clientId==s.value&&(e[i].clientName=s.label)})}),this.tableData=e}},closeDrawer:function(t){this.taskId=0,1==t&&this.getParams()},messageWin:function(t){this.$message({message:t,type:"success"})},messageWarning:function(t){this.$message({message:t,type:"warning"})},messageError:function(t){this.$message.error(t)}}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"document task"},[i("div",[i("el-row",[i("el-col",{staticClass:"top",attrs:{span:24}},[i("el-col",{attrs:{span:5}},[i("el-col",{staticClass:"title",attrs:{span:4}},[t._v("客户")]),t._v(" "),i("el-col",{attrs:{span:20}},[i("el-select",{staticClass:"filtrateClient",attrs:{filterable:"",clearable:"",placeholder:"全部",size:"small"},model:{value:t.clientId,callback:function(e){t.clientId=e},expression:"clientId"}},t._l(t.userclientIdList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1)],1),t._v(" "),i("el-col",{staticClass:"tab tab1",attrs:{span:7}},[i("el-button-group",[t._l(t.allBusinessList[0],function(e,s){return i("el-button",{key:s,class:[t.serviceId==e.businessId?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(i){return t.tab1_change(e.businessId)}}},[t._v(t._s(e.businessName))])}),t._v(" "),t.allBusinessList[1]?i("el-button",{class:[1==t.moreShow?"act more":"more"],staticStyle:{"border-left":"0"},attrs:{type:"primary",plain:"",size:"small",icon:"el-icon-more"},on:{click:function(e){return e.stopPropagation(),t.tab1_more()}}}):t._e()],2),t._v(" "),i("el-card",{directives:[{name:"show",rawName:"v-show",value:t.moreShow,expression:"moreShow"}],staticClass:"box-card"},t._l(t.allBusinessList,function(e,s){return i("el-button-group",{directives:[{name:"show",rawName:"v-show",value:0!=s,expression:"index != 0"}],key:s,staticClass:"moreBus"},t._l(e,function(e,s){return i("el-button",{key:s,class:[t.serviceId==e.businessId?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(i){return i.stopPropagation(),t.tab1_change(e.businessId)}}},[t._v(t._s(e.businessName))])}),1)}),1)],1),t._v(" "),i("el-col",{staticClass:"tab tab2",attrs:{span:4}},[i("el-button-group",[i("el-button",{class:["1"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(1,1)}}},[t._v("    专项    ")]),t._v(" "),i("el-button",{class:["2"==t.tab2_act?"act":""],attrs:{type:"primary",plain:"",size:"small"},on:{click:function(e){return t.tab2_change(2,0)}}},[t._v("    日常    ")])],1)],1),t._v(" "),i("el-col",{staticClass:"tab tab3",attrs:{span:8}})],1)],1)],1),t._v(" "),i("div",{staticClass:"table-main"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.tableData,"default-sort":{prop:"date",order:"descending"},"row-class-name":t.tableRowClassName,"header-cell-style":{background:"rgb(236, 235, 235)",color:"#000"}},on:{"row-click":t.rowClick}},[i("el-table-column",{attrs:{label:"文档","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{on:{click:function(i){return i.stopPropagation(),t.changeNum(e.$index,e.row)}}},[t.editable[e.$index]?i("div",[i("el-input",{staticClass:"editRemarkInput",attrs:{size:"mini"},model:{value:t.editFileName,callback:function(e){t.editFileName=e},expression:"editFileName"}},[i("el-button",{attrs:{slot:"append",type:"primary",size:"mini"},on:{click:function(i){return i.stopPropagation(),t.cellSave(e.$index,e.row)}},slot:"append"},[t._v("确认")])],1)],1):i("div",["doc"==e.row.suffix||"docx"==e.row.suffix?i("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==e.row.suffix||"xlsx"==e.row.suffix?i("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==e.row.suffix||"pptx"==e.row.suffix?i("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):i("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),i("span",[t._v(t._s(e.row.fileName))])])])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"clientName",label:"客户","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"proName",label:"项目","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"taskName",label:"任务","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{prop:"updateTime",label:"更新时间",sortable:"",width:"130"}}),t._v(" "),i("el-table-column",{attrs:{prop:"realName",label:"更新人",width:"100"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"重新上传",placement:"top"}},[e.row.doUserId==t.userId&&3!=e.row.status&&5!=e.row.status?i("el-button",{attrs:{size:"mini",icon:"el-icon-upload2"},on:{click:function(i){return t.upload2(e.$index,e.row)}}}):t._e()],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"下载文档",placement:"top"}},[i("el-button",{attrs:{size:"mini",icon:"el-icon-download"},on:{click:function(i){return t.download(e.row)}}})],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"任务详情",placement:"top"}},[i("el-button",{attrs:{size:"mini",icon:"el-icon-share"},on:{click:function(i){return t.enterDetail(e.row)}}})],1),t._v(" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"历史文档",placement:"top"}},[i("el-button",{attrs:{size:"mini",icon:"el-icon-time"},on:{click:function(i){return t.lookHistory(e.$index,e.row)}}})],1)]}}])})],1),t._v(" "),i("div",{staticClass:"paging"},[i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"current-page":t.pageNum,layout:"total, prev, pager, next","page-size":30,total:t.totalnum,background:""},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1),t._v(" "),i("el-drawer",{attrs:{title:"历史文档",visible:t.openHistory,"with-header":!1},on:{"update:visible":function(e){t.openHistory=e}}},[i("el-scrollbar",[i("div",{staticClass:"history-main"},[i("div",{staticClass:"title"},[t._v("历史")]),t._v(" "),i("el-timeline",{directives:[{name:"loading",rawName:"v-loading",value:t.fileHistoryLoading,expression:"fileHistoryLoading"}]},t._l(t.fileHistoryList,function(e){return i("el-timeline-item",{key:e.fileId,attrs:{timestamp:e.updateTime,placement:"top"}},[i("el-card",[i("h4",[t._v("更新人："+t._s(e.realName))]),t._v(" "),i("p",{staticClass:"fileName"},["doc"==e.suffix||"docx"==e.suffix?i("img",{attrs:{src:"static/images/document/word.png",width:"16",alt:"",srcset:""}}):"xls"==e.suffix||"xlsx"==e.suffix?i("img",{attrs:{src:"static/images/document/excle.png",width:"16",alt:"",srcset:""}}):"ppt"==e.suffix||"pptx"==e.suffix?i("img",{attrs:{src:"static/images/document/ppt.png",width:"16",alt:"",srcset:""}}):i("img",{attrs:{src:"static/images/document/other.png",width:"16",alt:"",srcset:""}}),t._v(" "),i("span",[t._v(t._s(e.fileName))])]),t._v(" "),i("p",[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(i){return t.download(e)}}},[t._v("\n                  下载\n                  "),i("i",{staticClass:"el-icon-download el-icon--right"})])],1)])],1)}),1),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:0==t.fileHistoryList.length,expression:"fileHistoryList.length==0"}]},[t._v("暂无历史数据")])],1)])],1),t._v(" "),i("taskDetail",{attrs:{taskId:t.taskId},on:{closeDrawer:t.closeDrawer}}),t._v(" "),i("el-dialog",{attrs:{close:t.fileClose,title:"修改附件",visible:t.dialogFileVisible},on:{"update:visible":function(e){t.dialogFileVisible=e}}},[i("div",[i("el-upload",{attrs:{action:t.uploadUrl,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"file-list":t.fileList,limit:1,"on-exceed":t.handleExceed}},[i("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("点击上传附件")])],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.fileRemove}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.fileUpload}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var u=i("VU/8")(r,c,!1,function(t){i("X6WZ")},"data-v-eb99671a",null);e.default=u.exports},X6WZ:function(t,e){}});