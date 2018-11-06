var wRequest = require('../../utils/servers.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeTime: "验证码"
  },
  inputPhone(e) {
    if (e.detail.value.length == 11) {
      this.setData({
        phone: e.detail.value
      })

    }
  },
  inputCode(e){
    this.setData({
      code:e.detail.value
    })
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
  onSubmit(){
    if(this.data.phone==null||this.data.phone.length<=0){
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
    let parms={
      code:this.data.code
    }
    wRequest.validCode(parms).then(res=>{
      
      if(res.data.success){
        wx.navigateTo({
          url: '../shuzimima/index?type=2&otype='+this.data.otype,
        })
      }else{
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
      this.setData({
        otype:options.otype
      })
  },

})