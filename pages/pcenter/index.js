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
    nick: '',
    isModal: false, //弹窗开闭
    phone: '',
  },
  goAuth() {
    wx.navigateTo({
      url: '../authUser/index',
    })
  },

  onLoad: function() {

  },
  goSale() {
    if (app.globalData.islogin) {
      wx.navigateTo({
        ur: '../anquanzhongxin/index'
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  },
  /** nnsh
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this;

    that.setData({
      currentTab: e.detail.current
    });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {

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
  qrCode: function(e) {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  switchTab: function() {
    wx.navigateTo({
      url: '../qrcode/index'
    })
  },
  onShow() {
    var that = this
    this.setData({
      islogin: app.globalData.islogin,
      notbind: app.globalData.notbind
    })
    wRequest.currentUserinfo().then(res => {
      if (res.data && res.data.success) {
        let result = res.data.data;
        console.log(result);
        that.setData({
          nick: result.nick,
          investorName: result.investorName,
          phone: result.phone,
          investorId: result.investorId
        });

        if (!result.investorId) {

          this.setData({
            isModal: true
          })
        }
      } else {
        // wx.showModal({
        //   title: '提示',
        //   content: res.message,
        // })
      }


    });

    this.goLogin()
  },
  goLogin() {

    if (app.globalData.islogin || app.globalData.notbind) {

    } else {
      wx.reLaunch({

        url: '../xieyi/index',
      })
    }


  },
  onShareAppMessage: function() {

  },
  logout: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  aboutus: function() {
    wx.navigateTo({
      url: '../aboutus/index',
    })
  },
  mysub: function() {
    wx.navigateTo({

      url: '../mysub/index',
    })
  },
  markdown: function() {


    wx.navigateTo({
      url: '../markdown2/index',
    })
  },
  myconsole() {
    wx.navigateTo({
      url: '../myconsole/index',
    })
  },
  goBand() {
    wx.navigateTo({
      url: '../paisherenlian/index',
    })
  },
  goSafe() {
    if (app.globalData.islogin) {
      wx.navigateTo({
        url: '../anquanzhongxin/index',
      })
    } else {
      wx.showToast({
        title: "请先登录",
      })
    }
  }


})