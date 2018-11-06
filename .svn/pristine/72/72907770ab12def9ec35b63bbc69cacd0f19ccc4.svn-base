// pages/main/index.js
var wxlocker = require("../../utils/wxlocker.js");
const userId = wx.getStorageSync("userId")
var wRequest = require('../../utils/servers.js');

Page({
  data: {
    title: '请设置手势密码',
    resetHidden: false,
    titleColor: ""
  },
  onLoad: function (options) {
    if(options.type==1){
    
    }else{
      this.selectGestpw()
      // wx.setStorageSync("passwordxx", JSON.stringify(data))
    }
    // 页面初始化 options为页面跳转所带来的参数
   
    
  

   
  },
   selectGestpw() {
  //   wRequest.selectGestpw().then(res => {
    
  //     if (res.data.success ) {
        
  //       // debugger
  //       wx.setStorageSync("passwordxx", res.data.data)
  //       wxlocker.lock.init();
  //       this.initState();
  //     } else {
  //       wx.showModal({
  //         title: '提示',
  //         content: res.data.msg,
  //       })
  //     }
  //   })
  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //设置提示语与重置按钮
  initState: function () {
    var resetHidden = wxlocker.lock.resetHidden;
    var title = wxlocker.lock.title;
    var titleColor = wxlocker.lock.titleColor;
    this.setData({
      resetHidden: resetHidden,
      title: title,
      titleColor: titleColor
    });
  },
  touchS: function (e) {//touchstart事件绑定
    wxlocker.lock.bindtouchstart(e);
  },
  touchM: function (e) {//touchmove事件绑定
    wxlocker.lock.bindtouchmove(e);
  },
  touchE: function (e) {//touchend事件绑定
    
    wxlocker.lock.bindtouchend(e, this.lockSucc);
    this.initState();
  },
  lockSucc: function (pwd) {//解锁成功的回调函数
    console.log("解锁成功！");
  
    if(pwd!=undefined&&pwd!=""){
      let parms={
        oldPw: this.data.oldPw,
        newPw: pwd

      }
      wRequest.updateGestpw(parms).then(res=>{
        if (res.data.success == "success") {
          wx.reLaunch({
            url: '../guide/index',
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success:(res)=>{
              this.lockreset()
            }
          })
        }
      })
    }else{
      wx.reLaunch({
        url: '../jinrishouye/index',
      })
    }
    //do something
    // console.log(pwd)
  },
  lockreset: function () {
    wxlocker.lock.updatePassword();
    this.initState();
  }
})