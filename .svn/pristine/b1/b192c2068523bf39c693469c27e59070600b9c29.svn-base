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

    this.getInitInfo()
  },
  getInitInfo() {

    wRequest.getBranchList({
      muid: 3
    }).then(res => {
      if (res.data.success) {
        //todo data实际要替换成res.data.data
        let data = res.data.data[0].userProfileInitInfo

        //处理学历数据
        let educationIds = []
        let educationNames = []
        for (var key in (data.educationMap)) {
          var temp = data.educationMap[key];
          educationIds.push(key)
          educationNames.push(temp)
        }
        this.setData({
          educationIds: educationIds,
          educationNames: educationNames
        })

        //处理职业数据
        let careerIds = []
        let careerNames = []
        for (var key in (data.careerMap)) {
          var temp = data.careerMap[key];
          careerIds.push(key)
          careerNames.push(temp)
        }
        this.setData({
          careerIds: careerIds,
          careerNames: careerNames
        })

        //处理行业数据
        let tradeIds = []
        let tradeNames = []
        for (var key in (data.tradeMap)) {
          var temp = data.tradeMap[key];
          tradeIds.push(key)
          tradeNames.push(temp)
        }
        this.setData({
          tradeIds: tradeIds,
          tradeNames: tradeNames
        })
        let userStr = res.data.attribute.userStr

        this.setData({
          userStr: userStr,
           userProfile: data.userProfile
        })
      } else {
        wx.showToast({
          title: '获取信息失败',
        })
      }
    })
  }

  , goNext() {
    wx.redirectTo({
      url: '../jibenziliaoqueren/index',
    })
  },

  bindItemChange(e){
  let index=e.detail.value
  this.setData({
    itemIndex: index
  })
  },
  bindItemChange2(e) {
    let index = e.detail.value
    this.setData({
      itemIndex2: index
    })
  },

  bindItemChange3(e) {
    let index = e.detail.value
    this.setData({
      itemIndex3: index
    })
  },

  onSubmit(e){
   let form=e.detail.value
   if (form.commaddr == "") {
     wx.showModal({
       title: '提示',
       content: '请填写联系地址',
     })
     return
   }
   if (form.postCode == "") {
     wx.showModal({
       title: '提示',
       content: '请填写邮编',
     })
     return
   }
   
   
   if (this.data.itemIndex==undefined){
     wx.showModal({
       title: '提示',
       content: '请选择职业',
     })
     return
   }
   if (this.data.itemIndex2 == undefined) {
     wx.showModal({
       title: '提示',
       content: '请选择学历',
     })
     return
   }
   if (this.data.itemIndex3 == undefined) {
     wx.showModal({
       title: '提示',
       content: '请选择行业',
     })
     return
   }
   form.career=this.data.careerIds[this.data.itemIndex]
   form.education=this.data.educationIds[this.data.itemIndex2]
   form.industryCode=this.data.tradeIds[this.data.itemIndex3]
    let userProfile=JSON.stringify(form)
   let parms={
     muid:app.globalData.openid,
     mnodeId: 3,
     userProfileStr: userProfile,
     id:this.data.id
   }
   console.log("参数",parms)
   wRequest.saveOpen(parms).then(res=>{
     if(res.data.success){
       //如果成功调用 next接口
       this.data.id=res.data.data.id
       wx.navigateTo({
         url: '../banddingyinhang/index',
       })
     }else{
       wx.showToast({
         title: '请求失败',
       })
     }
   })
  },
  next() {
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  }
})