var wRequest = require('../../utils/servers.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onSubmit(e){
    let form=e.detail.value
    if(form.orgPw==null||form.orgPw==""){
      wx.showModal({
        title: '提示',
        content: '请输入原密码',
      })
      return
    }
  
    if (form.newPw == null || form.newPw == "") {
      wx.showModal({
        title: '提示',
        content: '请输入新密码',
      })
      return
    }
    if (form.newPw2 == null || form.newPw1 == ""||form.newPw!=form.newPw2) {
      wx.showModal({
        title: '提示',
        content: '两次输入密码不一致',
      })
      return
    }
    form.type=2
    wRequest.updatePw(form).then(res=>{
      if(res.data.success){
        wx.showModal({
          title: '提示',
          content: "修改成功",
          success:res=>{
             wx.navigateBack({
               
             })
          }
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