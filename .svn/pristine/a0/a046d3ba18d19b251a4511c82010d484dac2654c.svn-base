var wRequest = require('../../utils/servers.js');
//获取应用实例
var app = getApp()
var mainUrl = app.globalData.mainUrl;
var appid = app.globalData.appid;
var appsecret = app.globalData.appsecret;
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
   
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    nickname:''
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据


  },
  /** 
  * 滑动切换tab 
  */
  bindChange: function (e) {

    var that = this;

    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    console.log(e);
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  qrCode:function(e){
     wx.scanCode({
  success: (res) => {
    console.log(res)
  }
})
  },
  switchTab:function(){
     wx.navigateTo({
      url:'../qrcode/qrcode'
    })
  },
  onShareAppMessage: function () {
  
  }, logout:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }, aboutus:function(){
    wx.navigateTo({
      url: '../aboutus/index',
    })
  }, mysub: function () {
    wx.navigateTo({

      url: '../mysub/index',
    })
  }, markdown:function () {
 

    wx.navigateTo
      ({
        url: '../markdown2/index',
      })
  },
  myconsole(){
    wx.navigateTo
      ({
        url: '../myconsole/index',
      })
  }


})