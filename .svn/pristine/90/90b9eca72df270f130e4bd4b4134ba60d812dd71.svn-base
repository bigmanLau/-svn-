var wRequest = require('../../utils/servers.js');
//获取应用实例
var app = getApp()
const appid = app.globalData.appid;
const appsecret = app.globalData.appsecret;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    openid: '',
    userid: '',
    codeTime: '获取验证码',
    code: 888888
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("携带注册码:==>", options.code)
    console.log("携带默认注册码:==>", this.data.code)
    if (options.code != undefined) {
      this.setData({
        code: options.code
      })
    }

    wRequest.login().then(res => {
      console.log(res.data.statusCode);
      if (res.data.statusCode == '1480920188') {
        console.log("未注册用户")
        wx.showToast({
          title: '未注册用户',
        })
      } else {
        wx.setStorageSync("token", res.data.attribute.token)
        wx.setStorageSync("userid", res.data.data)
        wx.showToast({
          title: '登录成功',
        })

        wx.switchTab({
          url: '../index/index',
        })
      }

    }, fail => {
      wx.hideLoading()
    });
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
  , bindPassChange: function (e) {
    this.setData({
      password: e.detail.value
    })
  }, bindUserChange: function (e) {
    this.setData({
      username: e.detail.value
    })
  }
  , doRegister() {
    wx.showLoading({
      title: '注册中',
    })
    wx.login({
      success: res => {
        let code = res.code;

        let data = {
          code: code, 
          appid: appid,
           appsercet: appsecret,
          mphone: this.data.username,
          smsCode: this.data.password,
          invitationCode: this.data.code
        };
        wRequest.register(data).then(res => {
          console.log("register", res)
          if (res.data.statusCode == "01010101") {
            console.log(res.data.msg)
            wx.showToast({
              title: res.data.msg,
            })

            wRequest.login().then(res => {
              console.log(res.data.statusCode);
              if (res.data.statusCode == '1480920188') {
                console.log("未注册用户")
                wx.showToast({
                  title: '未注册用户',
                })
              } else {
                wx.setStorageSync("token", res.data.attribute.token)
                wx.setStorageSync("userid", res.data.data)
                wx.showToast({
                  title: '登录成功',
                })

                wx.switchTab({
                  url: '../index/index',
                })
              }

            }, fail => {
              wx.hideLoading()
            });
          }
        })
      }
    });
  }, getCode() {
    if (!this.data.username) {
      wx.showToast({
        title: '手机号必填',
      })
      return;
    }
    if (this.data.codeTime != "获取验证码") {
      return;
    }
    var parms = {
      mphone: this.data.username,
      type: 3,
      role: 1
    }
    wRequest.getCode(parms).then(res => {
      console.log("code==>", res)
      if (res.data.statusCode == '1493022806') {
        wx.showToast({
          title: res.data.msg,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
        })
        this.time();
      }
    });
  }
  , wait: 60,
  time() {

    if (this.wait == 0) {

      this.data.codeTime = "获取验证码";
      this.setData({
        codeTime: this.data.codeTime
      })
      this.wait = 60;
    } else {

      this.data.codeTime = "重新发送(" + this.wait + ")";
      this.setData({
        codeTime: this.data.codeTime
      })
      this.wait--;
      setTimeout(() => {
        this.time()
      },
        1000)
    }
  }
})