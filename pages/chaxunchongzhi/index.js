// pages/chaxunmimaxiugai/index.js
var wRequest = require('../../utils/servers.js');
var initData = '修改中,请耐心等待'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTime: '验证码',
    text: initData,
    flag: true,
    flag1: false
  }, inputPhone(e) {
    if (e.detail.value.length == 11) {
      this.setData({
        phone: e.detail.value
      })

    }
  },
  inputCode(e) {
    this.setData({
      code: e.detail.value
    })
  }, returnf(e) {
    wx.navigateBack()
  },
  //获取手机验证码
  changeVerifycode(e) {
    if (this.data.codeTime != "验证码") {
      return;
    }

    wRequest.sendCode({
      phone: this.data.phone
    }).then(res => {

      if (res.data.success) {

        this.time();
      } else {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      }
    })

  }
  , wait: 60,
  time() {

    if (this.wait == 0) {

      this.data.codeTime = "验证码";
      this.setData({
        codeTime: this.data.codeTime
      })
      this.wait = 60;
    } else {

      this.data.codeTime = "重新获取验证码(" + this.wait + ")";
      this.setData({
        codeTime: this.data.codeTime
      })
      this.wait--;
      setTimeout(() => {
        this.time()
      },
        1000)
    }
  },
  onSubmit() {
    if (this.data.phone == null || this.data.phone.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '请输入正确手机号码',
      })
      return
    }
    if (this.data.code == null || this.data.code.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '请输入验证码',
      })
      return
    }
    let parms = {
      code: this.data.code
    }
    wRequest.validCode(parms).then(res => {

      if (res.data.success) {
        var form=new Object()
        form.type = 2
        wx.showLoading({
          title: '请稍后',
        })
        wRequest.resetPw(form).then(res => {
          wx.hideLoading()
          if (res.data.success) {
            wx.showModal({
              title: '提交成功',
              showCancel: false,
              content: res.data.msg,
              success: function (res) {
                wx.navigateBack({ changed: true });//返回上一页
              }

            })
 

            

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })

          }
        })


      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
        })
      }
    })
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
    //获取是否有重置密码任务

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