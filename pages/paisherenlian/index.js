// pages/paisherenlian/index.js
var upload = require('../../utils/uploadImg.js');
var wRequest = require('../../utils/servers.js');
var app = getApp()
var apiDomain = app.globalData.mainUrl2
Page({

  /**
   * 页面的初始数据
   */
  data: {
    investorId:"",
    idCard:"",
    chooseImgs:[],
    openCamera: false,
    success:false,
    ctx:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ctx: wx.createCameraContext()
    });
  },
  //资金账号输入
  investChange(e){
    if(e.detail.value.length>0){
      this.setData({
        investError:false
      })
    }
    this.setData({
      investorId: e.detail.value
    })

  },
  //身份证号输入
  idChange(e){
    this.setData({
       idCard:e.detail.value
     })
  },
  
  pickFace() {
    this.setData({
      openCamera: true
      , IDCardFront: null
    })
    // var that = this;
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有sourceType
    //   sourceType: ['camera'],
    //   success: (res) => {
    //     var tempFilePaths = res.tempFilePaths
    //     console.log(tempFilePaths)
    //     that.setData({
    //        IDCardFront: tempFilePaths[0]
    //     })
    //     var obj = {
    //       keyName: "photoFiles",
    //       filePath: tempFilePaths[0],
    //       investorId: this.data.investorId,
    //       fileName: "photoFiles",
    //       identity: "IDCardFront",
    //       idcardNumber: this.data.idCard
    //     }
    //     let hasExit = false
    //     for (let i = 0; i < this.data.chooseImgs.length; i++) {
    //       if (this.data.chooseImgs[i].identity == obj.identity) {
    //         this.data.chooseImgs[i] = obj;
    //         hasExit = true
    //       }
    //     }
    //     if (!hasExit) {
    //       that.data.chooseImgs.push(obj)
    //     }

    //     that.setData({
    //       chooseImgs: that.data.chooseImgs
    //     })
    //     console.log(this.data.chooseImgs)

    //   }
    // })
  }　
  ,
  uploadImgs() {
    if (this.data.chooseImgs.length<=0){
      wx.showModal({
        title: '提示',
        content: '请拍摄人脸',
      })
      return
    }
    wx.showLoading({
      title: '上传图片中',
    })
    this.uploadImg(this.data.chooseImgs[0].filePath, this.data.chooseImgs[0])

  },
  uploadImg(filePath, formData) {
    let uploadUrl = "checkIdentify/idcardcompare"
    console.log("图片路径", filePath)

    formData.userStr = this.data.userStr
    formData.idcardNumber = this.data.idCard
    formData.investorId = this.data.investorId
    formData.timestamp = new Date().getTime();
    console.log("图片携带参数", formData)

   // console.log('cookie', wx.getStorageSync("storeCookie") )
  
    wx.uploadFile({
        url: apiDomain + uploadUrl,
        filePath: filePath,
        name: 'photoFiles',
        header: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;charset=UTF-8',
          'Cookie': app.globalData.storeCookie
        },
      formData: formData,
      success: (res) => {
        // if (res.data.success){
          let json=JSON.parse(res.data)
          if(json.success){
           this.setData({
             success:true
           })
          //  app.getPrevPage().findDataByinvesId()
          //  app.getPrevPage().account()
          }else{
            this.toast(json.msg)
          }
          
          wx.hideLoading()
        // }else
      },
      fail: (res) => {
        console.log( res );
       // this.toast(res.msg)
        wx.hideLoading()
      }

    })
  },
  goNext(){
    if (this.data.openCamera ) {
      this.takePhoto();
      
      return;
    }
    if (this.data.investorId==""){
     this.setData({
       investError:true
     })
     this.toast("资金账号不能为空")
     return
    }
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if (reg.test(this.data.idCard) == false) {
     
      this.setData({
        idCardError:true
      })
      this.toast("身份证格式错误")
      return
    }else{
      this.setData({
        idCardError: false
      })
    }
    this.uploadImgs()
  }
  ,toast(msg){
    this.setData({
      msg:msg
    })
    console.log(this.data.msg)
    setTimeout(()=>{
   this.setData({
     msg:null
   })
    },1000)
  }
  , goHome(){
    wx.navigateTo({
      url: '../shuzimima/index?type=1',
    })
  },
   takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        var tempImagePath = res.tempImagePath
        console.log(tempImagePath)
        this.setData({
          IDCardFront: tempImagePath
        })
        var obj = {
          keyName: "photoFiles",
          filePath: tempImagePath,
          investorId: this.data.investorId,
          fileName: "photoFiles",
          identity: "IDCardFront",
          idcardNumber: this.data.idCard
        }
        let hasExit = false
        for (let i = 0; i < this.data.chooseImgs.length; i++) {
          if (this.data.chooseImgs[i].identity == obj.identity) {
            this.data.chooseImgs[i] = obj;
            hasExit = true
          }
        }
        if (!hasExit) {
          this.data.chooseImgs.push(obj)
        }

        this.setData({
          chooseImgs: this.data.chooseImgs
        })
        console.log(this.data.chooseImgs)


        this.setData({
          IDCardFront: res.tempImagePath,
          openCamera: false
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
    this.setData({
      openCamera: false
    })
    wx.showToast({
      title: '未打开摄像头权限',
    })
    wx.openSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    })
  }

})