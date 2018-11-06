var wRequest = require('../../utils/wxRequest.js');
//获取应用实例
var app = getApp()
var mainUrl = app.globalData.mainUrl;
var appid = app.globalData.appid;
var appsecret = app.globalData.appsecret;
Page({

  /**
   * 页面的初始数据
   */
  data: {
   leftTitle:'',
   rightTitle:'',
   threeTitle:'',
   fourTitle: '',
   
   threeShow:false,
   
   isSelect:1,
   state:1 ,//三个状态 1. 审核中 2. 同意 3. 驳回
   role_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
   var loginObj=wx.getStorageSync('loginObj');
   that.setData({
     role_id: parseInt(loginObj.role_id)
     
   })
   switch (parseInt(loginObj.role_id)){
     case 1:
       console.log("我是经办人");
       that.setData({
         leftTitle:"待审核",
         rightTitle:"审核完成",
         threeShow: false,
       })
       break;
     case 2:
       console.log("我是生产经理");
       that.setData({
         leftTitle: "待处理",
         rightTitle: "审核中",
         threeTitle: '审核完成',
         fourTitle:'已处理',
         threeShow: true,
       })
       break;
     case 3:
       console.log("我是经办人");
       that.setData({
         leftTitle: "待处理",
         rightTitle: "审核中",
         threeTitle: '审核完成',
         fourTitle: '已处理',
         threeShow: true,

       })
       break;
     case 4:
       console.log("我是项目经理");
       that.setData({
         leftTitle: "待处理",
         rightTitle: "已处理",
         threeShow: false,
       })
       break;
      
   }
   this.getList();
  },

  
  getList: function () {
    var that=this;
    var loginObj = wx.getStorageSync('loginObj');
    var url = mainUrl + "/workSheet/get_list";
    var data={
      'type':this.data.isSelect,
      'id': loginObj.id,
      'role_id': loginObj.role_id,
      
    }
    wx.showNavigationBarLoading();
   wRequest.wxPost(url,data).then((res)=>{
     wx.hideNavigationBarLoading();
        that.setData({
          list:res.data,
          role_id: loginObj.role_id
          })
   },(res)=>{
     wx.hideNavigationBarLoading();
     
     })
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
  
  }, addSheet:function(){
    wx.navigateTo({
      url: '../newsheet/index',
    })
  }, goItem:function(e){
  
    wx.navigateTo({
      url: '../detail/index?id=' + e.currentTarget.dataset.id + "&state=" + e.currentTarget.dataset.state + "&recieve_id=" + e.currentTarget.dataset.recieve_id + "&type=" + this.data.isSelect,
    })
  }, selectItem:function(e){
    this.setData({
      isSelect:e.currentTarget.dataset.id
    })
    this.getList();
  }
})