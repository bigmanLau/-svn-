let app=getApp()
let wRequest=require("../../utils/servers.js")
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
    let userInfo = wx.getStorageSync("userInfo");
    let sessionKey = wx.getStorageSync("sessionKey");
    app.globalData.sessionKey = sessionKey;
    if (userInfo == null || sessionKey === ''  ) {
       wx.navigateTo({
         url: '../authUser/index'
       })
    }

     
  },


  onGotUserInfo: function (e) {
    
    if (e.detail.errMsg =="getUserInfo:ok"){
      wx.setStorageSync("userInfo",e.detail.userInfo)
      this.getopenid()
    }else{
    wx.showModal({
      title: '提示',
      content:"登录失败"
    })
    }
  },
     

  getPhoneNumber: function (e) { // 手机授权登录
   
    let userInfo = wx.getStorageSync( "userInfo" );
    let _sessionKey = wx.getStorageSync("sessionKey");
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权,无法登录',
        success: function (res) { }
      });
    } else {
      let sceneId = wx.getStorageSync("sceneId");
      if (sceneId == null ){
        sceneId = "";
      }
      let loginParam = {
        encryptedData: e.detail.encryptedData,
        sessionKey: _sessionKey,
        openid: app.globalData.openid,
        iv: e.detail.iv,
        nickName: userInfo.nickName,
        sceneId: sceneId
      };
      console.log(loginParam)
      this.doLogin(loginParam);
    } // end else . 
  },
  
  getopenid(){
    //调用登录接口
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success:  (res)=> {
        wx.getUserInfo({
          success:  (res2) =>{
            console.log(res2);
            app.globalData.userInfo = res2.userInfo;
            let parms = {
              appid:app.globalData.appid,
              appsercet: app.globalData.appsecret,
              code: res.code
            }
            wRequest.doOpenId(parms).then(res=>{
              
              app.globalData.headercookie = res.header['Set-Cookie'];
              if (res.data.resultCode=="success"){
                let result=res.data.data
                app.globalData.session_key = result.sessionKey;
                app.globalData.openid =result.openid;
                this.doLogin(res2)
              }else{
                wx.showModal({
                  title: '提示',
                  content: res.message,
                })
              }             
            });
          
          }
        });
      }
    })
  },
  doLogin(parms){
    // debugger
    wRequest.doLogin(parms).then(res => {
       if (res.data.resultCode == "success") {
        let result = res.data.data
         wx.setStorage({
           key: "user",
           data: res.data.data,
           success: function () {
             wx.reLaunch({
               url: '../jinrishouye/index',
             });
           }
         });
      } else {
        wx.showModal({
          title: '提示',
          content: res.message,
        })
      }
    });
  } // end of do login
  , getMemberInfo (obj) {
    var that = this;
    wx.request({
      url: app.ServerUrl() + '/api/login.php',
      method: 'POST',
      data: obj,
      success:  (res)=> {
        if (parseInt(res.data.err) == 0) {
          let result = res.data.result
          app.globalData.userInfo = result;
          app.globalData.token = result.token;
          app.globalData.sessionid = result.sessionid;
          wx.reLaunch({
            url: '../jinrishouye/index',
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.msg
          })
        }
      }
    })
  },
})