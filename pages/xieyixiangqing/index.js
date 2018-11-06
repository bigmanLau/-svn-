var wRequest = require('../../utils/servers.js');
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goback(){
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var parms = {
      userStr: wx.getStorageSync("userStr"),
      econtract_id: options.econtract_id
    }
    wRequest.readProtocal(parms)
      .then(res => {
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr: userStr
            ,
            article: res.data.data
          })
          WxParse.wxParse('article', 'html', res.data.data, this, 5);

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data.errorInfo,
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