// pages/yuyuekaihuyindao/index.js
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
  
  },
  goNext(e){
    let url = e.currentTarget.dataset.url;
    url ? wx.navigateTo({ url: url }) : "";
  }, nextPage(){
    wRequest.nextPage().then(res => {
      if (res){
        if (res.data.success) {
          wRequest.goNext(res.data.data)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }

      }
    })
  
  }
})