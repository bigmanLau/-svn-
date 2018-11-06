// pages/zizhanghaobangdiingzhanghao/index.js
var wRequest = require('../../utils/servers.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //绑定他人资金账号
  authbind(e) {
    if(e.detail.value.code==""){
      wx.showModal({
        title: '提示',
        content: '请输入正确授权码',
      })
      return
    }
    let parms = {
      code: e.detail.value.code
    }
    wRequest.authbind(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) {
            wx.navigateBack({

            })
          }

        })
      }  else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})