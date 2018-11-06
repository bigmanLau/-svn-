// pages/yuyuekaihuyindao/index.js
var wRequest = require('../../utils/servers.js');

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
    this.getAgreements()
  },
  changCheck(){
    this.setData({
      isCheck:!this.data.isCheck
    })
  },
  getAgreements(){
    let parms={
      userStr:wx.getStorageSync("userStr")
    }
    wRequest.getAgreements(parms)
    .then(res=>{
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          for(let i=0;i<res.data.data.length;i++){
            res.data.data[i].isRead=false;
          }
          this.setData({
            userStr: userStr
            ,list:res.data.data,
          })
          
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data.errorInfo,
          })
        }
      
    })
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

  },
  goNext(e) {
    if(!this.data.isCheck){
      wx.showModal({
        title: '提示',
        content: '请选择同意签署',
      })
      return
    } 
    for(let i=0;i<this.data.list.length;i++){
     
      if(this.data.list[i].isRead==false){
        let content="请阅读第"+(i+1)+"条协议"
    
        wx.showModal({
          title: '提示',
          content: content,
        })
        return
      }
    }
    let parms={
      userStr:this.data.userStr
    }
    wRequest.agreementSubmit(parms)
      .then(res => {
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr: userStr
          })
          //如果成功调用 next接口
          this.next()
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.data.errorInfo,
          })
        }
      })
  },
 
  next(){
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  }
  ,
  getNextTap(e){
    let index = e.currentTarget.dataset.index
    this.data.list[index].isRead = true;
    let url = e.currentTarget.dataset.url;
    
    url ? wx.navigateTo({ url: url }) : "";
    
  }
})