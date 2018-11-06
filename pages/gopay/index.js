// index.js
var wRequest = require('../../utils/servers.js');
//获取应用实例
var app = getApp()
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
     let id=options.id;
     var parms={
       productId:id,
       payType:'wx_lite'
     }
     wRequest.createPayOrder(parms).then(
       
       (res) => {
     console.log("getOrder",res)
     this.setData({
       orderNo: res.data.data
     })
     
        }, 
     
     
     (res) => { 

     })

     wRequest.createOrderInfo(parms).then(

       (res) => {
         console.log("createOrderInfo", res)
         this.setData({
           orderInfo: res.data.data
         })

       },


       (res) => {

       })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }, pay: function (e) {
    var that = this;
    wx.showLoading({
      title: '请求中',
    })
    let parms2 = {
      orderNo: that.data.orderNo,
      formId: e.detail.formId
    }
    wRequest.getPayCard(parms2).then(

      (res) => {

        var str = res.data.data;
        var l = JSON.parse(str);
        console.log("getPayCard", l)
        this.setData({
          payParms: l.credential.wx_lite
        })

    

        wx.requestPayment({
          'timeStamp': this.data.payParms.timeStamp,
          'nonceStr': this.data.payParms.nonceStr,
          'package': this.data.payParms.package,
          'signType': 'MD5',
          'paySign': this.data.payParms.paySign,
          'success': function (res) {
            console.log(res)
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            wx.hideLoading();
            that.setData({
              isCoverShow: false,
              asking: false,
              loadingHidden: true
            })
          },
          'fail': function (res) {
            wx.showModal({
              title: '支付失败',
              icon: 'fail',
              showCancel: false,
              duration: 1000
            })
            wx.hideLoading();
            that.setData({
              asking: false,
              loadingHidden: true
            })
          }
        })




      },


      (res) => {
        wx.hideLoading();
      })
   

  }
})