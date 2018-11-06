// pages/guide/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:["img/1.png","img/2.png","img/3.png","img/4.png","img/5.png"]
    ,index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  next(){
   if(this.data.index<this.data.imgs.length-1){
     this.setData({
       index:this.data.index+1
     })
   }else{
     wx.reLaunch({
       url: '../jinrishouye/index',
     })
   }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})