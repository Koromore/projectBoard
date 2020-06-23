// 文档预览
export function preview(path){
  // let format = this.matchType(path)
  // 将反斜杠转化为正斜杠
  path = path.replace("\\\\", "\/\/");
  path = path.replace("\\", "\/");
  path = path.replace("\\", "\/");
  path = path.replace("\\", "\/");
  let url = 'http://pmbs.insun-china.com/pmbs/file' + path+'download'
  // 在线预览
  // if (format == 'office') {
    // 文档预览
    let office = 'https://view.officeapps.live.com/op/view.aspx?src='
    // 新开页面跳转文档预览（需要域名）
    let newPage = window.open() // 防止浏览器拦截
    newPage.location.href = office + url
  // }else if(format == 'image'){
  //   // 图片预览
  //   this.dialogVisible = true;
  //   // 图片路径
  //   this.previewImage ='/pms/upload' + path;
  // }else if(format == 'pdf'){
  //   // 新开页面跳转pdf文档预览
  //   let newPage = window.open() // 防止浏览器拦截
  //   newPage.location.href = url
  // }
}