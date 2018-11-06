var wRequest = require('../../utils/servers.js');
//获取应用实例
var app = getApp()
let i=0;
Page({
  data: {
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: true,
    interval: 2000,
    duration: 1000,
    loadingHidden: false,  // loading
    swiperCurrent: 0
    , indicatorDots2: true,
    vertical2: false,
    autoplay2: false,
    circular2: true,
    interval2: 2000,
    duration2: 1000,
    loadingHidden: false,  // loading
    swiperCurrent2: 0,
    toView:"gonggao1"
     , scrollAnimation: true,
     notice:[
    //    {
    //    id:"id1",
    //    title:"测试1"
    //  }, {
    //      id: "id2",
    //    title: "测试2"
    //    }, {
    //      id: "id3",
    //      title: "测试3"
    //  }, {
    //      id: "id4",
    //    title: "测试4"
    //  },
     
     
     ],
     pageNum:1
  
  },
  
  
  
  
  //轮播图的切换事件  
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  swiperChange2: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可  
    this.setData({
      swiperCurrent2: e.detail.current
    })
  },
  //点击指示点切换  
  chuangEvent: function (e) {
    console.log(e);
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  onLoad: function (options) {
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    // this.doLogin();
    
    that.getBanner();
    that.getNotice();
    that.getgroomProductList();
    that.getmarkList();
    that.trade4Home();

     
    
   

  },
   getBanner:function(){
    wRequest.banner().then((res) => {

      console.log(123, res.data.data.result)
      this.setData({
        banner: res.data.data.result
      })

    }, (res) => { console.log(456, res) });
  },
   trade4Home: function () {
     var parms = {
       'pageNo': 1,
       'pageSize': 10
     }
     wRequest.trade4Home().then((res) => {

       console.log("trade4Home", res.data.data.result)
       let arr = res.data.data.result;
       for (let i = 0; i < arr.length; i++) {
         switch (parseInt(arr[i].offsetFlag)) {
           case 0:
             arr[i].offsetFlag = "开仓";
             break;
           case 1:
             arr[i].offsetFlag = "平仓";
             break;
           case 2:
             arr[i].offsetFlag = "强平";
             break;
           case 3:
             arr[i].offsetFlag = "平今";
             break;
           case 4:
             arr[i].offsetFlag = "平昨";
             break;
           case 5:
             arr[i].offsetFlag = "强减";
             break;
           case 5:
             arr[i].offsetFlag = "本地强平";
             break;
         }
       }
      this.setData({
        trade4Home: arr
      })

     }, (res) => { console.log("trade4Home", res) });
  },
  getgroomProductList: function () {
    wRequest.groomProductList().then((res) => {

      console.log("groomProductList", res)
      let result = res.data.data;

      for (let i = 0; i < result.length; i++) {
        result[i].yieldRate = Math.round(result[i].yieldRate * 100) / 100;
      }
      this.setData({
        groomProductList: result
      })

    }, (res) => { console.log("groomProductList", res) });
  },
  getmarkList: function () {
    
    var parms = {
      'pageNo': this.data.pageNum,
      'pageSize': 5,
      'yieldRateDesc':'dsa'
    }
    wRequest.marketList(parms).then((res) => {
      if (this.data.pageNum== 1) {
        let result = res.data.data.result;

        for (let i = 0; i < result.length; i++) {
          
          result[i].yieldRate = Math.round(result[i].yieldRate * 100) / 100;
          var strs = new Array(); //定义一数组 
          strs = result[i].ctpProductNames.split(","); //字符分割 
          result[i].tag = strs;
          result[i].isRec = false;
          if(i<3){
            result[i].isRec =true;
          }
        }
        this.setData({
          marketList: result
        })
      } else {
        let result = res.data.data.result;

        for (let i = 0; i < result.length; i++) {
          result[i].yieldRate = Math.round(result[i].yieldRate * 100) / 100;
          var strs = new Array(); //定义一数组 
          strs = result[i].ctpProductNames.split(","); //字符分割 
          result[i].isRec = false;
          result[i].tag = strs;
        }
       


        var result2 = this.data.marketList.concat(result);

        this.setData({
          marketList: result2
        })

        if(result.length==0){
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }
     
     
      this.data.pageNum++;
      this.isLoadingMarket=false;

    }, (res) => { console.log("marketList", res);
      this.isLoadingMarket = false;
     });
  },
  getNotice: function () {
    wRequest.gonggao().then((res) => {

      console.log("gonggaoSuccess", res.data.data)
      this.setData({
        notice: res.data.data
        
      })
    // if (this.data.notice.length!=0){
    //   this.data.toView = this.data.notice[0].id;
    //   }
      if(this.data.notice.length>0){
     

      setInterval(doso => {
        
        if (i == this.data.notice.length) {
         
          this.setData({
            toView: this.data.notice[i-1].id,
            scrollAnimation: false 
          })
           i = 0;
          
        }else{
          this.setData({
            toView: this.data.notice[i].id,
            scrollAnimation: true
          })
          i++;
        }   
        
      }
        , 2000);


      }
    }, (res) => { console.log("gonggaoFail", res) });
  }
  ,goDetail:function(e){
    wx.navigateTo({
      url: '../datadetail/index?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })
      
  } //登录
  , doLogin: function () {


    var data = {
      'mphone': this.data.username,
      'pwd': this.data.password,
      'appType': 1

    }
    var that = this;
    wRequest.login(data).then((res) => {

      if (res.data.statusCode == '1480920188') {
        wx.showModal({
          title: '登录提示',
          content: '不存在该用户',
        })
        this.doRegister();

      } else if (res.data.statusCode == '00010101') {
        wx.showModal({
          title: '登录提示',
          content: '登录失败',
        })
      }
      else if (res.data.statusCode == '00010102') {
        wx.setStorageSync("token", res.data.attribute.token)
        console.log("登录成功",res.data);
        that.getBanner();
        that.getNotice();
        that.getgroomProductList();
        that.getmarkList();
       
      } else {
        wx.showModal({
          title: '登录提示',
          content: '其他错误',
        })
      }

    }, (res) => {


      //失败
      wx.showToast({
        title: '网络异常',
      })
    });


  },
  // 注册
   doRegister() {
    var data = {
      'mphone': this.data.username,
      'password': this.data.password,
      'role': 1,
      'invitationCode': '888888'

    }
    var that = this;
    wRequest.register(data).then((res) => {
      console.log(res)
      // if (res.data.statusCode == '1480920188') {
      //   wx.showModal({
      //     title: '登录提示',
      //     content: '不存在该用户',
      //   })

      // } else if (res.data.statusCode == '00010101') {
      //   wx.showModal({
      //     title: '登录提示',
      //     content: '登录失败',
      //   })
      // }
      // else if (res.data.statusCode == '00010102') {
      //   wx.showModal({
      //     title: '登录提示',
      //     content: '登录成功',
      //   })
      // } else {
      //   wx.showModal({
      //     title: '登录提示',
      //     content: '其他错误',
      //   })
      // }

    }, (res) => {


      //失败
      wx.showToast({
        title: '网络异常',
      })
    });
  }, goNotice(){
    wx.setStorageSync("selectItem",2);
      wx.switchTab({
        url: '../zhixunhudong/index',
      })
  }, scrollHandler(e){
    console.log("scrollHandler", e.detail.scrollTop)
    // if(e.detail.scrollTop)
  },onReachBottom(){
     if (!this.isLoadingMarket){
      this.isLoadingMarket=true;
     this.getmarkList();
    }
  }, isLoadingMarket:false,
  goPay(e){
    wx.navigateTo({
      url: '../gopay/index?id='+e.currentTarget.dataset.id,
    })
  }
})
