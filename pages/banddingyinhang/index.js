var wRequest = require('../../utils/servers.js');
// let bank = require("../../utils/mockbanklist.js")
var upload = require('../../utils/uploadImg.js');
var app = getApp()
var apiDomain = app.globalData.mainUrl2
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseImgs: [],
    bankAccounts: [],
    bankImgs: [],
    id: null,
    orgMcontent: null,
    OrgBankAccountStr: null,

    cardIndex: 0
  },
  goadd() {
    if (this.data.chooseImgs[this.data.cardIndex] != undefined) {
      // debugger
      let bankImgs = []
      let count = 0;
      for (let i = 0; i < this.data.chooseImgs.length; i++) {

        for (let j = 0; j < this.data.bankImgs.length; j++) {
          if (this.data.bankImgs[j].bankItem.bankName == this.data.chooseImgs[i].bankItem.bankName) {
            count++

          }
        }

      }
      if (count >= this.data.chooseImgs.length) {
        wx.showModal({
          title: '提示',
          content: '一个银行只能添加一张卡',
        })
        return;

      }
      for (let i = 0; i < this.data.chooseImgs.length; i++) {
        this.data.chooseImgs[i].bankItem.bankAccount = this.data.bankAccounts[i]
        bankImgs.push(this.data.chooseImgs[i])
      }


      this.setData({
        cardIndex: ++this.data.cardIndex,
        bankImgs: bankImgs,
        BANK_CARD: ""
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.getBankList()
  },
  getBankList() {

    wRequest.getBranchList({
        muid: 4
      })
      .then(res => {
        console.log(res)
        if (res.data.success) {
          let bankList = []
          let bank = res.data.data[0].banks
          for (let i = 0; i < bank.length; i++) {
            bankList.push(bank[i].bankName)
          }
          this.setData({
            bank: bank,
            bankList: bankList
          })
        } else {
          wx.showToast({
            title: '获取银行列表失败',
          })
        }


      })
  },
  //识别图片
  checkBankCard(filePath, formData) {
    wx.showLoading({
      title: '图片识别中',
    })
    let uploadUrl = "checkIdentify/bankcard"
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
        wx.hideLoading()
        if (result.success) {
          this.data.bankAccounts[this.data.cardIndex] = result.data[0].itemstring
          this.setData({
            bankAccounts: this.data.bankAccounts
          })
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
          content: "网络异常",
          showCancel: false
        })
      }

    })
  },
  bindItemChange(e) {
    let index = e.detail.value
    this.setData({
      itemIndex: index
    })

    if (this.data.chooseImgs.length > this.data.cardIndex) {
      this.data.chooseImgs[this.data.cardIndex].pinyin = this.data.bank[index].pinyin
      this.data.chooseImgs[this.data.cardIndex].bankItem = {}
      this.data.chooseImgs[this.data.cardIndex].bankItem.bankCode = this.data.bank[index].bankCode
      this.data.chooseImgs[this.data.cardIndex].bankItem.bankName = this.data.bank[index].bankName
      this.data.chooseImgs[this.data.cardIndex].bankItem.bankPinyin = this.data.bank[index].pinyin

      this.data.chooseImgs[this.data.cardIndex].bankItem.bankAccount = this.data.bankAccounts[this.data.cardIndex] ? this.data.bankAccounts[this.data.cardIndex] : ""

      this.data.chooseImgs[this.data.cardIndex].bankAccountStr = JSON.stringify(this.data.chooseImgs[this.data.cardIndex].bankItem)
    }

  },
  bankAccountChange(e) {
    this.setData({
      bankAccount: e.detail.value
    })
    if (this.data.chooseImgs.length > 0) {
      this.data.chooseImgs[this.data.cardIndex].bankItem.bankAccount = this.data.bankAccount
      this.data.chooseImgs[this.data.cardIndex].bankAccountStr = JSON.stringify(this.data.chooseImgs[this.data.cardIndex].bankItem)
    }
  },
  pickCards() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: (res) => {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          BANK_CARD: tempFilePaths[0]
        })

        var obj = {
          keyName: "photoFiles",
          filePath: tempFilePaths[0],
          fileName: "photoFiles",
          identity: "BANK_CARD" + this.data.cardIndex,
          picType: "front",
          muid: app.globalData.openid,
          mnodeId: "4",
          pinyin: this.data.itemIndex ? this.data.bank[this.data.itemIndex].pinyin : ""
        }
        if (this.data.itemIndex) {
          obj.bankItem = {}
          obj.bankItem.bankCode = this.data.bank[this.data.itemIndex].bankCode
          obj.bankItem.bankName = this.data.bank[this.data.itemIndex].bankName
          obj.bankItem.bankPinyin = this.data.bank[this.data.itemIndex].pinyin
          obj.bankItem.bankAccount = this.data.bankAccount
          console.log(obj);
        } else {
          obj.bankAccountStr = ""
        }
        let hasExit = false
        for (let i = 0; i < this.data.chooseImgs.length; i++) {
          if (this.data.chooseImgs[i].identity == obj.identity) {
            this.data.chooseImgs[i] = obj;
            hasExit = true
          }
        }
        // debugger
        if (!hasExit) {
          that.data.chooseImgs.push(obj)
        }

        that.setData({
          chooseImgs: that.data.chooseImgs
        })
        console.log(this.data.chooseImgs)
        this.checkBankCard(tempFilePaths[0], obj)
      }
    })
  },
  uploadImgs() {
    if (this.data.chooseImgs.length <= 0) {
      wx.showToast({
        title: '请选择图片',
      })
      return
    }
  
    for (let i = 0; i < this.data.chooseImgs.length; i++) {
      // debugger
      if (this.data.chooseImgs[i].pinyin == null || this.data.chooseImgs[i].pinyin == "") {
        wx.showToast({
          title: '请选择银行',
        })
        return
      }
      
    }

    wx.showLoading({
      title: '上传图片...' + (this.count + 1) + "/" + this.data.chooseImgs.length,
    })


    this.uploadImg()



  },
  index: 0,
  uploadImg() {
    let index = this.index
    let url = "preopen/save"
    this.data.chooseImgs[index].bankItem.bankAccount = this.data.bankAccounts[index]
    var bankAccountStr = new Array();
    bankAccountStr.push(this.data.chooseImgs[index].bankItem)
    this.data.chooseImgs[index].bankAccountStr = JSON.stringify(bankAccountStr)
    this.data.chooseImgs[index].picType = this.data.chooseImgs[index].pinyin
    let imgs = this.data.chooseImgs
    imgs[index].id = this.data.id
    imgs[index].orgMcontent = this.data.orgMcontent
    imgs[index].OrgBankAccountStr = this.data.OrgBankAccountStr

    imgs[index].bankAccountStr = JSON.stringify(bankAccountStr)
    console.log("图片参数", imgs[index])
    wx.uploadFile({
      url: apiDomain + url,
      filePath: imgs[index].filePath,
      name: 'photoFiles',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data;charset=UTF-8',
        'Cookie': wx.getStorageSync("storeCookie")
      },
      formData: imgs[index],
      success: (res) => {
        // debugger
        let result = JSON.parse(res.data)

        if (result.success) {
          this.data.id = result.data.id
          this.data.orgMcontent = result.data.orgMcontent
          this.data.OrgBankAccountStr = result.data.OrgBankAccountStr
          this.count++;

          if (this.count >= this.data.chooseImgs.length) {
            this.index = 0;
            wx.showLoading({
              title: '上传完毕',
            })
            setTimeout(() => {
              wx.navigateTo({
                url: '../wenjuan/index',
              })
            }, 1000)
          } else {

            wx.showLoading({
              title: '上传图片...' + (this.count + 1) + "/" + this.data.chooseImgs.length,
            })
            this.index++
              this.uploadImg()
          }

        }

      },
      fail: (res) => {
        wx.showToast({
          title: '上传图片失败',
        })
      }

    })
  },
  count: 0,
  dealSuccess() {
    //上传成功之后 要调用身份证确认接口 然后到 选择营业部选择
    let user = {}
    user.bankAccounts = []
    let item = this.data.chooseImgs[0].bankItem
    user.bankAccounts.push(item)


    let parms = {
      userStr: this.data.userStr,
      // user: user
      bankAccounts: JSON.stringify(user.bankAccounts)
    }
    console.log(parms)


    wRequest.bankSubmit(parms).then(res => {
      this.data.userStr = res.data.attribute.userStr
      this.next()
    })
  },
  next() {
    wRequest.next({
      userStr: this.data.userStr
    }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  },
  goNext() {
    wx.navigateTo({
      url: '../jibenziliao/index',
    })
  }
})