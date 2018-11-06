var wRequest = require('../../utils/servers.js');
const app = getApp()
const mainUrl = app.globalData.mainUrl
var user = {};
Page({

  /**
  * 页面的初始数据
  */
  data: {
    codeTime:"验证码"
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
   
  },
  //监听手机号输入框
  inputPhone(e) {
    if (e.detail.value.length >= 11) {
      this.setData({
        mobile: e.detail.value
      })
      this.toLogin(e.detail.value);
    }
  },
  //监听图形验证码输入框
  inputVerfycodeChange(e) {
    this.setData({
      imgcodes: e.detail.value
    })
  },

  //获取手机验证码
  changeVerifycode(e) {
    if (this.data.codeTime != "验证码") {
      return;
    }
    let imgCode = this.data.imgcodes
    if (imgCode==undefined){
      wx.showToast({
        title: '请输入图片验证码',
      })
      return
    }
    if (imgCode.length < 4) {
      wx.showToast({
        title: '图片验证码长度不足',
      })
      return;
    }
    if (imgCode.length >= 4) {
      wRequest.goVerify({
        userStr: this.data.userStr,
        verifycode: imgCode
      }).then(res => {
      
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr:userStr
          })
          this.time();
        } else {
          console.log(res)
          wx.showModal({
            title: '提示',
            content: res.data.data.errorInfo,
          })
        }
      })


    }
  },

  //重新获取图片验证码
  changeCode() {
    if (this.data.mobile && this.data.mobile.length >= 11)
      this.getImgCode(this.data.mobile)
  },

  //获取userstr
  toLogin(mobile) {
    wRequest.toLogin({
      mobile: mobile,
      muid:app.globalData.openid
    }).then(res => {
      let userStr = res.data.attribute.userStr
      this.setData({
        userStr: userStr
      })
      this.getImgCode()
    })
  },

  //获取图片验证码
  getImgCode() {
    wRequest.getValidateCode({
      userStr: this.data.userStr
    }).then(res => {
      let userStr = res.data.attribute.userStr
   
      this.setData({
        imgCode: res.data.data,
        userStr: userStr
      })
    })
  },

  //登录
  loginSubmit(e) {
    let form = e.detail.value
    console.log(form)
    if (form.validateCode == null || form.validateCode.length <= 0) {
      wx.showToast({
        title: '请填写短信验证码',
      })
      return
    }
    let parms = {
      userStr: this.data.userStr,
      verifycode: form.verifycode,
      validateCode: form.validateCode
    }
 
    wRequest.loginSubmit(parms).then(res => {
      if(res.data.success){
        let userStr = res.data.attribute.userStr
        this.setData({
          userStr: userStr
        })
        //如果成功调用 next接口
        wx.setStorageSync("userStr", res.data.attribute.userStr)
        wRequest.goNext(res.data.data)
      }else{
      wx.showModal({
        title: '提示',
        content: res.data.data.errorInfo,
      })
      }
      
      //到上传图片 

    })

  },
  next(){
    wRequest.next({ userStr: this.data.userStr }).then(res=>{
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
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

      this.data.codeTime = "验证码(" + this.wait + ")";
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

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }, goNext() {
    wx.navigateTo({
      url: '../wenjuan/index',
    })
  }
})