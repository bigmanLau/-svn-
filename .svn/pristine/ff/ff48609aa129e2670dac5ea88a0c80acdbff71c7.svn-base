// pages/yuyuekaihuxiugai/index.js
var upload = require('../../utils/uploadImg.js');
var wRequest = require('../../utils/servers.js');
var app = getApp()
var apiDomain = app.globalData.mainUrl2

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseImgs: [],
    isNeedShow: true,
    imgSize: 3,
    imgIndex: 0,
    isSelect:false
  },
changeSelect(){
this.setData({
  isSelect:!this.data.isSelect
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (wx.getStorageSync("isNeedShowToolbar") != "") {
      this.setData({
        isNeedShow: false
      })
    }
    this.setData({
      userStr: wx.getStorageSync("userStr")
    })

  },
  changeShow() {
    this.setData({
      isNeedShow: false
    })
    wx.setStorageSync("isNeedShowToolbar", "false")
  },
  //选取身份证正面照
  pickIDCardFront() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          IDCardFront: tempFilePaths[0]
        })
        var obj = {
          keyName: "photoFiles",
          filePath: tempFilePaths[0],
          fileName: "photoFiles",
          identity: "IDCardFront",
          muid: app.globalData.openid,
          mnodeId: 1,
         id:this.data.id,
          picType: "front",
          type:0
        }
        let hasExit = false
        for (let i = 0; i < this.data.chooseImgs.length; i++) {
          if (this.data.chooseImgs[i].identity == obj.identity) {
            this.data.chooseImgs[i] = obj;
            hasExit = true
          }
        }
        if (!hasExit) {
          that.data.chooseImgs.push(obj)
        }

        that.setData({
          chooseImgs: that.data.chooseImgs
        })
        console.log(this.data.chooseImgs)
        this.checkIdcard(tempFilePaths[0],obj)
      }
    })
  },
  //校验身份证
  checkIdcard(filePath, formData) {
    wx.showLoading({
      title: '图片识别中',
    })
    let uploadUrl = "checkIdentify/idcard"
      console.log("图片路径", filePath)

      formData.userStr = this.data.userStr
      console.log("图片携带参数", formData)
      wx.uploadFile({
        url: apiDomain + uploadUrl,
        filePath: filePath,
        name: 'photoFiles',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          'Cookie': wx.getStorageSync("storeCookie")
        },
        formData: formData,
        success: (res) => {
          let result = JSON.parse(res.data)
          if (result.data){
            if ("null" != result.data.code){
              let cardStrObj = result.data
              wx.setStorageSync("cardStrObj", cardStrObj)
            }
           
          }
          wx.hideLoading()
          if (result.success) {
            
          } else {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: result.msg ? result.msg : "识别失败,请重新上传",
              showCancel: false
            })
          }
        },
        fail: (res) => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: "网路异常",
            showCancel: false
          })
        }

      })
    },
  pickIDCardBack() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          IDCardBack: tempFilePaths[0]
        })
        var obj = {
          keyName: "photoFiles",
          filePath: tempFilePaths[0],
          fileName: "photoFiles",
          identity: "IDCardBack",
          muid: app.globalData.openid,
          mnodeId: 1,
          id: this.data.id,
          picType: "back",
          type:1
        }
        let hasExit = false
        for (let i = 0; i < this.data.chooseImgs.length; i++) {
          if (this.data.chooseImgs[i].identity == obj.identity) {
            this.data.chooseImgs[i] = obj;
            hasExit = true
          }
        }
        if (!hasExit) {
          that.data.chooseImgs.push(obj)
        }

        that.setData({
          chooseImgs: that.data.chooseImgs
        })
        console.log(this.data.chooseImgs)
        this.checkIdcard(tempFilePaths[0], obj)
      }
    })
  },

  pickSignature() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          Signature: tempFilePaths[0]
        })
        var obj = {
          keyName: "photoFiles",
          filePath: tempFilePaths[0],
          fileName: "photoFiles",
          identity: "Signature",
          muid: app.globalData.openid,
          mnodeId: 1,
          id: this.data.id,
          picType: "signature"
        }
        let hasExit = false
        for (let i = 0; i < this.data.chooseImgs.length; i++) {
          if (this.data.chooseImgs[i].identity == obj.identity) {
            this.data.chooseImgs[i] = obj;
            hasExit = true
          }
        }
        if (!hasExit) {
          that.data.chooseImgs.push(obj)
        }

        that.setData({
          chooseImgs: that.data.chooseImgs
        })
        console.log(this.data.chooseImgs)

      }
    })
  },

  uploadImgs() {
    if(!this.data.isSelect){
      wx.showModal({
        title: '提示',
        content: '请勾选同意',
      })
      return;
    }
    if (this.data.chooseImgs.length >2){
      wx.showLoading({
        title: '图片...(' + (this.data.imgIndex + 1) + "/" + this.data.imgSize + ')',
      })
    }
 
    if (this.data.chooseImgs.length>2){
      this.uploadImg(this.data.chooseImgs[this.data.imgIndex].filePath,
        this.data.chooseImgs[this.data.imgIndex])
    }else{
        wx.showModal({
          title: '提示',
          content: '请上传图片',
          showCancel: false
        })
        return false
    
    }
  },
  uploadImg(filePath, formData) {
    let uploadUrl = "preopen/save"
    console.log("图片路径", filePath)
    let cardStrObj= wx.getStorageSync("cardStrObj", cardStrObj)
    formData.cardStr = JSON.stringify(cardStrObj)
    formData.userStr = this.data.userStr
    console.log("图片携带参数", formData)
    wx.uploadFile({
      url: apiDomain + uploadUrl,
      filePath: filePath,
      name: 'photoFiles',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Cookie': wx.getStorageSync("storeCookie")
      },
      formData: formData,
      success: (res) => {
        let result = JSON.parse(res.data)
         if (result.success) {
          this.data.imgIndex++
          this.setData({
            orgMcontent: result.data.orgMcontent
          })
         
          if(this.data.imgIndex<3){
            wx.showLoading({
              title: '图片...(' + (this.data.imgIndex + 1) + "/" + this.data.imgSize + ')',
            })
          this.data.chooseImgs[this.data.imgIndex].orgMcontent = this.data.orgMcontent
          this.data.chooseImgs[this.data.imgIndex].id = result.data.id
          this.uploadImg(this.data.chooseImgs[this.data.imgIndex].filePath,
            this.data.chooseImgs[this.data.imgIndex])
          }else{
            this.data.id = result.data.id
            this.data.chooseImgs[0].id=result.data.id
            this.data.imgIndex=0
            this.goNext()
          }
        }else{
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: result.msg,
            showCancel:false
          })
        }
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content:"网路异常",
          showCancel: false
        })
      }

    })
  },
  
  next() {
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  },
  goNext() {
    wx.navigateTo({
      url: '../yuyingbumenxuanze/index',
    })
  },


})