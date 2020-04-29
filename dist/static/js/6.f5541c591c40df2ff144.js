webpackJsonp([6],{"2rGD":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("lHA8"),i=e.n(s),n=e("c/Tr"),o=e.n(n),r={name:"statistics",data:function(){return{userId:this.$store.state.user.userId,deptId:this.$store.state.user.deptId,statisticsData:{},businessNameData:[],businessListData:[],statusNameData:[],statusListData:[],clientNameData:[],clientStatusData:[],clientIdListData:[]}},methods:{widthheight:function(){window.innerWidth,window.innerHeight},getStatisticsData:function(){var t="?userId="+this.userId;this.$axios.post("/pmbs/api/statistic/listAjax"+t).then(this.getStatisticsDataSuss)},getStatisticsDataSuss:function(t){if(200==t.status){this.statisticsData=t.data.data;for(var a=t.data.data,e=a.listBusiness,s=[],n=[],r=this.clientIdListData,l=function(t){var a=e[t];s.push(a.businessName);var l=[],c=a.listProject;null==c&&(c=[]);for(var u=function(t){var a=c[t];r.forEach(function(t){t.value==a.clientId&&l.push(t.label)})},h=0;h<c.length;h++)u(h);var d=o()(new i.a(l)),p={value:c.length,name:a.businessName,clientList:d};n.push(p)},c=0;c<e.length;c++)l(c);this.businessNameData=s,this.businessListData=n;var u=a.listProjectStatus,h=[],d=[];for(c=0;c<u.length;c++){var p=u[c],g={};g.value=p.proNum,g.name=p.status,h.push(p.status),d.push(g)}this.statusNameData=h,this.statusListData=d;for(var m=a.listClient,f=[],v=[],b=0;b<m.length;b++){var D=m[b];f.push(D.clientName)}this.clientNameData=f;for(var L={name:"延期",type:"bar",stack:"广告",data:[],nodeClick:"link"},_={name:"审核中",type:"bar",stack:"广告",data:[],nodeClick:"link"},x={name:"执行中",type:"bar",stack:"广告",data:[],nodeClick:"link"},y=0;y<m.length;y++){for(var C=m[y],w=0,S=0;S<C.projectList.length;S++){4==C.projectList[S].status&&w++}L.data.push(w)}for(var j=0;j<m.length;j++){for(var N=m[j],B=0,I=0;I<N.projectList.length;I++){2==N.projectList[I].status&&B++}_.data.push(B)}for(var F=0;F<m.length;F++){for(var k=m[F],A=0,E=0;E<k.projectList.length;E++){1==k.projectList[E].status&&A++}x.data.push(A)}v.push(L),v.push(_),v.push(x),this.clientStatusData=v,this.business_gantt(s,n),this.project_state_gantt(),this.client_state_gantt()}},business_gantt:function(t,a){var e=this.$echarts.init(document.getElementById("business")),s=this.businessNameData,i=this.businessListData;e.setOption({title:{text:"业务占比",padding:16},color:["#85AFE4","#778CD5","#737ACE","#6F69C6","#B8B3F3","#DDDBF9","#90CFF2","#8BBFE8"],tooltip:{trigger:"item",position:"bottom",formatter:function(t,a,e){for(var s="",i=0;i<t.data.clientList.length;i++){s+=t.data.clientList[i]+"<br/>"}return"\n            "+t.name+"\n            ("+t.percent+"%)<br/>\n            "+s+"\n            "}},legend:{type:"scroll",icon:"circle",orient:"horizontal",bottom:10,data:s},series:[{name:"业务类型",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"30",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:i}]})},project_state_gantt:function(){var t=this.$echarts.init(document.getElementById("project_state")),a=this.statusNameData,e=this.statusListData;t.setOption({title:{text:"项目状态",padding:16},color:["#23D7BB","#f5b96a","#C9C9C9","#FF0000"],tooltip:{trigger:"item",formatter:"{b}({d}%)"},legend:{icon:"circle",orient:"horizontal",bottom:10,align:"auto",data:a},series:[{name:"项目状态",type:"pie",radius:["50%","70%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"30",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:e}]})},client_state_gantt:function(){var t=this,a=this.$echarts.init(document.getElementById("client_state")),e=this.clientNameData,s=this.clientStatusData;s[0].barWidth=81;var i=0;e.length<=3?i=100:e.length>3&&(i=3/e.length*100),a.setOption({title:{text:"客户状态",subtextStyle:{align:"center",rich:{a:{}}},padding:16},color:["#FF0000","#F5B96A","#23D7BB"],tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:["延期","审核中","执行中"],top:16},grid:{left:"3%",right:"4%",bottom:"10%",containLabel:!0},xAxis:[{type:"category",clientNameData:e,data:e,triggerEvent:!0,axisLabel:{formatter:function(t){var a="",e=t.length,s=Math.ceil(e/6);if(e>6)for(var i=0;i<s;i++){var n=6*i,o=n+6;a+=i==s-1?t.substring(n,e):t.substring(n,o)+"\n"}else a=t;return a}}}],yAxis:[{type:"value"}],dataZoom:[{show:!0,realtime:!0,zoomLock:!0,start:0,end:i},{type:"inside",realtime:!0,zoomOnMouseWheel:!1,start:0,end:i}],series:s}),a.on("click",function(a){var e="";a.name?e=a.name:a.value&&(e=a.value),t.$router.push({path:"/home/components/project",query:{name:e}})})},getAllClientapiList:function(){this.$axios.post("http://pms.guoxinad.com.cn/pas/clientapi/allListAjax").then(this.getAllClientapiListSuss)},getAllClientapiListSuss:function(t){if(200==t.status){var a=[];t.data.forEach(function(t){var e={value:t.clientId,label:t.clientName};a.push(e)}),this.clientIdListData=a}}},beforeMount:function(){this.getAllClientapiList()},mounted:function(){this.widthheight(),this.getStatisticsData()}},l={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"statistics"}},[a("el-row",{staticClass:"statistics"},[a("el-col",{staticClass:"gantt_box",attrs:{span:10}},[a("div",{attrs:{id:"business"}})]),this._v(" "),a("el-col",{staticClass:"gantt_box",attrs:{span:10,offset:1}},[a("div",{attrs:{id:"project_state"}})]),this._v(" "),a("el-col",{staticClass:"gantt_box",attrs:{span:21}},[a("div",{attrs:{id:"client_state"}})])],1)],1)},staticRenderFns:[]};var c=e("VU/8")(r,l,!1,function(t){e("435u")},"data-v-27e79afe",null);a.default=c.exports},"435u":function(t,a){}});