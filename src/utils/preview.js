// 文档预览
export function preview(path, fileName) {
  console.log(path, fileName)
  let format = this.matchType(fileName)
  console.log(format)
  // 将反斜杠转化为正斜杠
  // path = path.replace("\\\\", "\/\/");
  // path = path.replace("\\", "\/");
  // path = path.replace("\\", "\/");
  // path = path.replace("\\", "\/");
  let url = 'http://pmbs.insun-china.com/pmbs/file/' + path + '/download'
  // 在线预览
  if (format == 'office') {
    // 文档预览
    let office = 'https://view.officeapps.live.com/op/view.aspx?src='
    // 新开页面跳转文档预览（需要域名）
    let newPage = window.open() // 防止浏览器拦截
    newPage.location.href = office + url
  } else if (format == 'image') {
    // 图片预览
    this.imgDialogVisible = true;
    // 图片路径
    this.previewImage = '/pmbs/file/' + path + '/download';
  } else if (format == 'pdf') {
    // 新开页面跳转pdf文档预览
    let newPage = window.open() // 防止浏览器拦截
    newPage.location.href = url
  }
}