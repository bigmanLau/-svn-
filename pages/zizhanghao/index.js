// pages/zizhanghao/index.js
var wRequest = require('../../utils/servers.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectItem: 1,
    islogin: false,
    myInvestorId: null,
    hiddenmodalput: true,
    val:[],
  },

  //点击按钮痰喘指定的hiddenmodalput弹出框
  modalinput: function (e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.array2[index]
    // var val = this.data.array2[index].nickName
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      val: this.data.array2[index].nickName,
    })
  },
  //取消按钮
  cancel: function (e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.array2[index]
    item.nickName = this.data.val,
    this.setData({
      hiddenmodalput: true,
      array2: this.data.array2,
    });
    this.modifyFname1(item.authId, item.nickName)
  },
  //确认按钮
  confirm: function (e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.array2[index]
    this.setData({
      hiddenmodalput: true,
      array2: this.data.array2
    })
    this.modifyFname(item.authId, item.nickName)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      islogin: app.globalData.islogin,
      notbind: app.globalData.notbind,
     // myInvestorId: app.globalData.myInvestorId
    })

    // console.log('this {}', this.data.notbind, app.globalData.myInvestorId )
    this.shareAccountTap()
  },

  //获取当前用户的授权资金账户列表
  investors() {
    let parms = {

    }
    wRequest.investors(parms).then(res => {

      // debugger
      if (res.data.resultCode == "success") {
        let array1 = []
        let array2 = []

        if (res.data.data.length > 0) {
          
          this.setData({
            myInvestorId: res.data.data[0].investorId
          })
          array1.push(res.data.data[0])
        }
        for (let i = 1; i < res.data.data.length; i++) {
          res.data.data[i].disable = true
          array2.push(res.data.data[i])
        }
      
        this.setData({
          array1: array1,
          array2: array2,
        });
      } else {
        /* wx.showModal({
           title: '资金账号',
           content: res.data.message,
           showCancel: false,
           confirmText: '知道了',
           success: function(res) {}
          });
          */
      }
    })
  },
  // changeEdit2(e) {
  //   let index = e.currentTarget.dataset.index
  //   let item = this.data.array2[index]
  //   if (item.disable) {
  //     item.disable = false;
  //     this.setData({
  //       array2: this.data.array2
  //     })
  //   } else {
  //     item.disable = true;
  //     this.setData({
  //       array2: this.data.array2
  //     })
  //     this.modifyFname(item.authId, item.nickName)
  //   }
  //   console.log("index", this.data.array2[index])
  // },
  changeEdit(e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.sList[index]
    if (item.disable) {
      item.disable = false;
      this.setData({
        sList: this.data.sList
      })
    } else {
      item.disable = true;
      this.setData({
        sList: this.data.sList
      })
      this.modifyTname(item.authId, item.nickName)
    }

  },
  goMain() {
    wx.navigateTo({
      url: '../jiaoyikuaizhao/index',
    })
  },
  goChild(e) {
    let authId = this.data.array2[e.currentTarget.dataset.index].authId
    wx.navigateTo({
      url: '../jiaoyikuaizhao2/index?authId=' + authId,
    })
  },
  //查询当前用户授权记录
  authlog() {
    let parms = {

    }
    wRequest.authlog(parms).then(res => {
      if (res.data.resultCode == "success") {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].disable = true
        }
        this.setData({
          sList: res.data.data
        })
      } else {
        this.setData({
          sList: []
        })
      }
    })
  },
  doDeal(e) {

    let index = e.currentTarget.dataset.index
    let item = this.data.sList[index]

    let authId = item.authId
    if (item.mauth == 1) {
      wx.showModal({
        title: '提示',
        content: '是否确定解除',
        success: res => {
          if (res.confirm) {
            this.unactive(authId)
          }
        }
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '是否确定激活',
        success: res => {
          if (res.confirm) {
            this.active(authId)
          }
        }
      })

    }
  },
  delAccount() {
    wx.showModal({
      title: '提示',
      content: '是否确定删除主账号，好友将一并删除',
      success: res => {
        if (res.confirm) {
          wRequest.delAccount().then(res => {
            if (res.data.resultCode == "success") {
              this.setData({
                myInvestorId: null
              })
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: (res) => {
                  this.investors()
                  this.authlog()
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: function (res) { }

              })
            }
          })
        }
      }
    })

  },
  inputTname(e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.sList[index]
    item.nickName = e.detail.value
    this.setData({
      sList: this.data.sList
    })
  },
  inputFname(e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.array2[index]
    item.nickName = e.detail.value
    this.setData({
      array2: this.data.array2
    })
    // console("val", e.detail.value)
  },
  modifyTname(authId, nickName) {

    let parms = {
      authId: authId,
      nickName: nickName
    }
    wRequest.modifyTname(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: (res) => {
            this.investors()
            this.authlog()
          }

        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  modifyFname(authId, nickName) {
    let parms = {
      authId: authId,
      nickName: nickName
    }
    wRequest.modifyFname(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: (res) => {
            this.investors()
            this.authlog()
          }

        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  modifyFname1(authId, nickName) {
    let parms = {
      authId: authId,
      nickName: nickName
    }
    wRequest.modifyFname(parms).then(res => {
      if (res.data.resultCode == "success") {
          this.investors()
          this.authlog()
      } 
    })
  },
  changeWeixin() {
    wx.showModal({
      title: '提示',
      content: '是否确定更换微信号',
      success: res => {
        if (res.confirm) {
          wRequest.changeWeixin().then(res => {
            if (res.data.resultCode == "success") {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: (res) => {

                }

              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: function (res) { }

              })
            }
          })
        }
      }
    })

  },
  active(authId) {
    let parms = {
      authId: authId
    }
    wRequest.active(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: (res) => {
            this.investors()
            this.authlog()
          }

        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  unactive(authId) {

    let parms = {
      authId: authId
    }
    wRequest.unactive(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: (res) => {
            this.investors()
            this.authlog()
          }

        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  unbind2(e) {
    let index = e.currentTarget.dataset.index
    let authId = this.data.zList[index].authId
    this.authunbind(authId)
  },
  unbind(e) {
    let index = e.currentTarget.dataset.index
    let authId = this.data.sList[index].authid
    this.authunbind(authId)
  },
  makeShow2() {
    wx.showModal({
      title: '提示',
      content: '是否确定设置为首页',
      success: res => {
        if (res.confirm) {
          let authId = this.data.array1[0].authId
          let parms = {
            authId: authId
          }
          wRequest.autoShow(parms).then(res => {
            if (res.data.resultCode == "success") {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: (res) => {
                  this.investors()
                  this.authlog()
                }

              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: function (res) { }

              })
            }
          })
        }
      }
    })

  },
  makeShow(e) {
    wx.showModal({
      title: '提示',
      content: '是否确定设置为首页',
      success: res => {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          let authId = this.data.array2[index].authId
          let parms = {
            authId: authId
          }
          wRequest.autoShow(parms).then(res => {
            if (res.data.resultCode == "success") {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: (res) => {
                  this.investors()
                  this.authlog()
                }

              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: function (res) { }

              })
            }
          })
        }
      }
    })

  },
  //解除绑定他人资金账号
  authunbind(authId) {
    let parms = {
      authId: authId
    }
    wRequest.authunbind(parms).then(res => {
      if (res.data.resultCode == "success") {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: (res) => {
            this.investors()
            this.authlog()
          }

        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          confirmText: '知道了',
          success: function (res) { }

        })
      }
    })
  },
  deauth(e) {
    wx.showModal({
      title: '提示',
      content: "是否确定取消关注",

      success: (res) => {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          let authId = this.data.array2[index].authId
          wRequest.deauth(authId).then(res => {
            if (res.data.resultCode == "success") {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: (res) => {
                  this.investors()
                  this.authlog()
                }

              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.message,
                showCancel: false,
                confirmText: '知道了',
                success: function (res) { }

              })
            }
          })
        }
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
    this.investors()
    this.authlog()
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
  clickItem: function (e) {
    console.log(e)
    this.setData({
      selectItem: e.detail.target.dataset.id
    })
    wRequest.collectFormId(e.detail.formId)
  },
  clickItem2(e) {
    this.setData({
      selectItem: e.currentTarget.dataset.id
    })
  },
  bindAccountTap() {
    wx.navigateTo({
      url: '../zizhanghaobangdiingzhanghao/index',
    })
  },

  shareAccountTap() {
    wRequest.createShare().then(res => {
      if (res.data.resultCode == "success") {

        this.setData({
          shareId: res.data.data.id
        })
      }
    })
  },
  onShareAppMessage() {

    return {
      path: 'pages/jinrishouye/index?shareId=' + this.data.shareId,
      imageUrl: app.globalData.shareImageUrl, // "https://daysong.chwis.net/td/images/share.png",
      success: (res) => {
        if (res.confirm) {

          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        }

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})