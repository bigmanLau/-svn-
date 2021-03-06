//app.js
App({
  onLaunch: function (options) {
    if (options.scene){
      this.globalData.scene=options.scene
    }
   setInterval(()=>{
   
     if (this.globalData.headercookie){
       this.syncData()
     }
   },10*1000)
    
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
  },
  getPrevPage: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];

    return prevPage;
  },

  syncData(){
    wx.request({
      url: this.globalData.mainUrl2 + "account/synStatus",
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        'Cookie': this.globalData.headercookie,
        'timestamp': '' + new Date().getTime()

        // 'Set-Cookie': app.globalData.headercookie
      },
      success: (res) => {

  
        console.log("synStatus", res)
        let ret=res.data.data

        if ( ret ){
          console.log('myInvestorId',ret.myInvestorId );
          this.globalData.myInvestorId = ret.myInvestorId
        }
        if (ret.status && ret.status == 'login') {

          this.globalData.isBindInvestor = true
          this.globalData.islogin = true
        
       
        } else if (ret.status && ret.status == 'notbind') {
          this.globalData.notbind = true
          this.globalData.isBindInvestor = false
          this.globalData.islogin = false
        
        }
        else {
          this.globalData.islogin = false
          this.globalData.isBindInvestor = false

        }
        
      }, error: function (res) {
        console.log("synStatuserror", res)
      }
    })
  },
  onShow: function () {
    // wx.login({
    //   success: (res) => {
    //     if (res.code) {
    //       //发起网络请求  
    //       //console.log(res.code);
    //       let parms = {

    //         timestamp: new Date().getTime(),
    //         code: res.code
    //       };
    //       // 登录换取 session_key
    //       this.doOpenId(parms)
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   },// 成功
    //   fail: res => {

    //   }, complete: res => {

    //   }
    // });





    //暂时注释 数字密码判断
    // let pages = getCurrentPages()
    // // debugger
    //  let numberPass=wx.getStorageSync("numberPass")
    //  if (numberPass== "") {
    //    if(pages.length==0){
    //      wx.reLaunch({
    //        url: '/pages/authUser/index',
    //      })
    //      return
    //    }
    //     if (pages[0].route == "pages/authUser/index") {
    //       wx.reLaunch({
    //         url: '/pages/jinrishouye/index',
    //       })
    //       return
    //     }
    //     // wx.setStorageSync("needShow", true)
    //   }
    //   else {
      
    //    if (pages.length == 0) {
    //      wx.reLaunch({
    //        url: '/pages/shuzimima/index',
    //      })
    //      return
    //    }
    //     console.log(pages[pages.length - 1])
    //     if (pages[pages.length - 1].route)
    //       switch (pages[pages.length - 1].route) {
    //         case "pages/paisherenlian/index":
    //         case "../shuzimima/index":
    //           break;
    //         default:
    //           wx.reLaunch({
    //             url: '../shuzimima/index',
    //           })
    //           break;
    //       }
    //     //  if(pages[0].route!="pages/shuzimima/index"){
    //     //   wx.reLaunch({
    //     //     url: '../shuzimima/index',
    //     //   })
    //     // }
    //   }
    
   
    
   
  },
  onHide: function () {

    },
  getPass(){

    console.log("获取手势密码参数Cookie", this.globalData.headercookie)
    wx.request({
      url: this.globalData.mainUrl2 + "homePage/selectGestpw",
      method: 'POST',
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        'Cookie': this.globalData.headercookie,
        'timestamp': '' + new Date().getTime()

        // 'Set-Cookie': app.globalData.headercookie
      },
      success:  (res)=> {
        console.log("getpasssuccess",res)
        let pages = getCurrentPages()
        if (res.data.success) {
          if (res.data.data == null || res.data.data == "") {
          
            if (pages[0].route == "pages/authUser/index"){
            wx.reLaunch({
              url: '/pages/jinrishouye/index',
            })
            return
            }
            // wx.setStorageSync("needShow", true)
          }
          else {
            wx.setStorageSync("needShow", true)
        
            console.log(pages[pages.length-1])
            if (pages[pages.length - 1].route )
                switch (pages[pages.length - 1].route){
                  case "pages/paisherenlian/index":
                  case "../shuzimima/index":
                    break;
                  default:
                    wx.reLaunch({
                      url: '../shuzimima/index',
                    })
                    break;
                }
          //  if(pages[0].route!="pages/shuzimima/index"){
          //   wx.reLaunch({
          //     url: '../shuzimima/index',
          //   })
          // }
          }
        }
      }, error: function (res) {
        console.log("getpasserror",res)
      }
    })
  },
  globalData: {
    openid:"tesd",
    userInfo: null,

    //服务地址
    mainUrl: 'https://test.husky.wmzx.com/',
   
    // mainUrl2:"https://daysong.chwis.net/",     //测试据服务器
    mainUrl2: "https://wxt.jrqh.com.cn/",     //正式服务器
    
    // shareImageUrl: "https://daysong.chwis.net/images/share.png",     //测试服务器
    shareImageUrl: "https://wxt.jrqh.com.cn/images/share.png",     //正式服务器
    
    //socket地址
    webSocketUrl:'wss://taodan.mobi/elephant-websocket/websocket/ctp?account=',
    appid: 'wx06a640c02fc34576',
    
    //填写微信小程序secret  
    appsecret: 'dcd059dbc233ef9b507cdac567ecb11a',
    headercookie: '',
    sessionKey:'',
    openid: "",
    islogin:true,
    isBindInvestor:false,
    notbind:false,
    myInvestorId: null
  }
})