var app = getApp()
var apiDomain = app.globalData.mainUrl
var imagePaths = [] //图片路径数组
var index = 0 // 要上传图片的索引
var cb = function () { } //回调函数
var inProgress = false // 是否正在上传图片中
var mparms = '';
var uploadUrl = "";
var wRequest = require('servers.js');
var sucFun = function () {
  cb({
    success: true,
    index: index
  })

  ++index

  if (index < imagePaths.length) {
    setTimeout(uploadFile, 50)
  } else { //上传结束
    inProgress = false
  }
}

var errorFun = function () {

  cb({
    success: false,
    path: null,
    index: index
  })

  ++index

  if (index < imagePaths.length) {
    setTimeout(uploadFile, 50)
  } else { //上传结束
    inProgress = false
  }
}

var uploadFile = function () {
  var parms = mparms;
  wx.uploadFile({
    url: apiDomain + uploadUrl,
    filePath: imagePaths[index].filePath,
    name: 'photoFiles',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      'Cookie': wx.getStorageSync("storeCookie")
    },
    formData: imagePaths[index],
    success: function (resp) {
      if (resp.statusCode == 200) {
        var data = {}

        try {
          data = JSON.parse(resp.data)
          console.log(data)

          sucFun(data)


        } catch (e) {
          errorFun(e)
        }

      } else {
        errorFun()
      }
    },
    fail: function () {
      errorFun()
    }

  })
}

//cb 是上传结束的回调函数
exports.uploadMany = function (arr, url, funCB) {
  if (inProgress) {
    wx.showLoading({
      title: '还有图片在上传中',
    })
    return;
  }
  uploadUrl = url
  inProgress = true
  imagePaths = arr //图片路径数组
  index = 0 // 要上传图片的索引

  if (funCB != null && typeof funCB == 'function') {
    cb = funCB
  }
  if (imagePaths.length == 0) {
    // wx.showToast({
    // 	title: '数组不能为空'
    // })
    wRequest.wxPost2(apiDomain + uploadUrl, mparms)
      .then(res => {
        if (res.statusCode == 200) {
          var data = {}
          if (res.data.success) {
            sucFun();
          } else {

            errorFun()
          }

        } else {
          errorFun()
        }
      }, fail => {
        errorFun()
      })
    return;
  }


  setTimeout(uploadFile, 50)
}