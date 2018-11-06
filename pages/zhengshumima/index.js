// pages/chaxunmimaxiugai/index.js
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
  goNext(e) {
    // debugger
    if (e.detail.value.password == "" || e.detail.value.password2==""){
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
      })
      return
    }
    if (e.detail.value.password != e.detail.value.password2 ){
      wx.showModal({
        title: '提示',
        content: '两次输入密码不一致',
      })
      return
    }
    let parms = {
      userStr: wx.getStorageSync("userStr"),
      password: e.detail.value.password
    }
    wRequest.setCertPassword(parms)
      .then(res => {
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr: userStr
          })
          //如果成功调用 next接口
          this.next()
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data.errorInfo,
          })
        }
      })
  },

  next() {
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
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