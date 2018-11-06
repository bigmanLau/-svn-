let app = getApp()
let wRequest = require("../../utils/servers.js")
//js
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow:false
  },
  onLoad: function (e) {
   if(wx.getStorageSync("indexXieyi")!=""){
     this.setData({
         isShow:false
     })
     console.log(e)
     var scene = decodeURIComponent(e.scene)
     console.log("authUser scene：" + scene)

     // session_key 已经失效，需要重新执行登录流程
     wx.login({
       success: (res) => {
         // debugger
         if (res.code) {
           //发起网络请求  
           //console.log(res.code);
           let parms = {
             //  appid: app.globalData.appid,
             //  appsercet: app.globalData.appsecret,
             timestamp: new Date().getTime(),
             code: res.code
           };
           // 登录换取 session_key
           wRequest.doOpenId(parms).then(res => {
             let ret = res.data.data;
             if (res.data.resultCode == "success") {
               var storeCookie = res.header['Set-Cookie'];
               // console.log(  storeCookie + '->' + res.header[ 'Set-Cookie' ]) ;
               if (typeof (storeCookie) == 'undefined' || storeCookie == '') {
                 let setCookie = "tsessionid=" + ret.sessionId + "; Path=/td; HttpOnly";
                 wx.setStorageSync("storeCookie", setCookie);
               } else {
                 wx.setStorageSync("storeCookie", storeCookie);
               }


               app.globalData.headercookie = res.header['Set-Cookie'];
               app.globalData.sessionKey = ret.sessionKey;
               app.globalData.openid = ret.openid;

              
               if (ret.status && ret.status == 'login') {
                 // wx.reLaunch({
                 //   url: '../jinrishouye/index',
                 // });

                //注释数字密码判断
                //  if (ret.gestpw != "") {
                //    wx.setStorageSync("numberPass", ret.gestpw)
                //    wx.reLaunch({
                //      url: '../shuzimima/index',
                //    })
                //  } else {
                //    wx.setStorageSync("numberPass", "")

                //    wx.reLaunch({
                //      url: '../jinrishouye/index',
                //    });
                //  }
                app.globalData.islogin=true


                 wx.navigateBack({
                   
                 })
               }

               // let arr = ["1", "2", "3", "4", "5", "6"]
               // this.updatePass(JSON.stringify(arr))

               let userInfo = wx.getStorageSync("userInfo");
               if (userInfo == null) {
                 wx.showModal({
                   title: '授权',
                   content: '请授权获取和用户信息',
                 });
               }
             } // end get success. 
           });
         } else {
           console.log('获取用户登录态失败！' + res.errMsg)
         }
       } // 成功
     });// end of wx login.
   }else{
     this.setData({
       isShow: true
     })
   }
   
  },

  bindGetUserInfo: function (e) {

    if (e.detail.errMsg == 'getUserInfo:ok') {
      let sceneId = wx.getStorageSync("sceneId");
      if (sceneId == null) {
        sceneId = "";
      }
      console.log(e)
      let loginParam = {
        encryptedData: e.detail.encryptedData,
        sessionKey: app.globalData.sessionKey ,
        openid: app.globalData.openid,
        iv: e.detail.iv,
        nickName: e.detail.userInfo.nickName,
        sceneId: sceneId,
        avatarUrl:e.detail.userInfo.avatarUrl
      };
      console.log(loginParam)
      this.doLogin(loginParam);
    } else {
      wx.showModal({
        title: '授权',
        content: '获取用户信息异常',
      });
    }
  }
  , updatePass(pwd) {
    let parms = {
      oldPw: null,
      newPw: pwd

    }
    wRequest.updateGestpw(parms)
  },
  goAgree(){
    this.setData({
      isShow:!this.data.isShow
    })
    wx.setStorageSync("indexXieyi", true)
   
    // var scene = decodeURIComponent(e.scene)
    // console.log("authUser scene：" + scene)

    // session_key 已经失效，需要重新执行登录流程
    wx.login({
      success: (res) => {
        // debugger
        if (res.code) {
          //发起网络请求  
          //console.log(res.code);
          let parms = {
            //  appid: app.globalData.appid,
            //  appsercet: app.globalData.appsecret,
            timestamp: new Date().getTime(),
            code: res.code
          };
          // 登录换取 session_key
          wRequest.doOpenId(parms).then(res => {
            let ret = res.data.data;
            if (res.data.resultCode == "success") {
              var storeCookie = res.header['Set-Cookie'];
              // console.log(  storeCookie + '->' + res.header[ 'Set-Cookie' ]) ;
              if (typeof (storeCookie) == 'undefined' || storeCookie == '') {
                let setCookie = "tsessionid=" + ret.sessionId + "; Path=/td; HttpOnly";
                this.globalData.storeCookie = setCookie;

              } else {
                this.globalData.storeCookie = storeCookie;

              }


              app.globalData.headercookie = res.header['Set-Cookie'];
              app.globalData.sessionKey = ret.sessionKey;
              app.globalData.openid = ret.openid;
        
     
              if (ret.status && ret.status == 'login') {
                // wx.reLaunch({
                //   url: '../jinrishouye/index',
                // });
                if (ret.gestpw != "") {
                  wx.setStorageSync("numberPass", ret.gestpw)
                  wx.reLaunch({
                    url: '../shuzimima/index',
                  })
                } else {
                  wx.setStorageSync("numberPass", "")

                  wx.reLaunch({
                    url: '../jinrishouye/index',
                  });
                }
              }

              // let arr = ["1", "2", "3", "4", "5", "6"]
              // this.updatePass(JSON.stringify(arr))

              let userInfo = wx.getStorageSync("userInfo");
              if (userInfo == null) {
                wx.showModal({
                  title: '授权',
                  content: '请授权获取和用户信息',
                });
              }
            } // end get success. 
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      } // 成功
    });// end of wx login.
  },
  doLogin(parms) {
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
  } // end o
})