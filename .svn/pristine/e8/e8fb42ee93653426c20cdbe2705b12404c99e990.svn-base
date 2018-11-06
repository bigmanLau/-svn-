var wRequest = require('../../utils/servers.js');
let app=getApp()
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
  
    let parms = {
      muid: 2
    }
    wRequest.getBranchList(parms).then(res => {

      if (res.data.success) {
        wx.setStorageSync("bumenlist", res.data.data[0].departments)
    
      } else {
        wx.showToast({
          title: "获取失败",
        })
      }
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
   this.setData({
     branchNo: wx.getStorageSync("branchNo"), 
     branchName: wx.getStorageSync("branchName")
   })
  }

 
  , goNext(){
    if (wx.getStorageSync("branchNo")==""){
      wx.showModal({
        title: '提示',
        content: '请选择营业部',
      })
      return
    }
    let parms={
      muid: app.globalData.openid,
       branchNo: wx.getStorageSync("branchNo"),
       mnodeId: 2,
       id: this.data.id
    }
    wRequest.saveOpen(parms).then(res=>{
      if(res.data.success){
        //确认营业部
           this.data.id=res.data.data.id
       
           wx.navigateTo({
             url: '../jibenziliao/index',
           })
       
      }else{
       wx.showToast({
         title: res.data.msg,
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
})