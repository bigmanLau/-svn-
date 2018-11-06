var wRequest = require('../../utils/wxRequest.js');
//获取应用实例
var app = getApp()
var mainUrl = app.globalData.mainUrl;
var appid = app.globalData.appid;
var appsecret = app.globalData.appsecret;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: 1,
    selectName: '选择',
    focus: false,
    isCheckShow: false,
    isSelectShow: true,
    work_reason: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginObj = wx.getStorageSync('loginObj');
    var id = options.id;
    var state = options.state;
    var typeValue = options.type;
    var recieve_id = options.recieve_id;

    if (loginObj.role_id == 1 && typeValue == 1) {
      that.setData({
        isCommentShow: false
      })
    } else if (loginObj.role_id == 2 || loginObj.role_id == 3) {
      that.setData({
        isCommentShow: false
      })
    } else {
      that.setData({
        isCommentShow: true
      })
    }

    console.log("---->>" + recieve_id)
    that.setData({
      id: id,
      recieve_id: recieve_id
    })
    var statePic;
    if (loginObj.role_id != 1) {
      //不是经办人
      if (state == 3 || state == 4) {
        if (state == 3) {
          that.setData({
            selectId: 2
          })
        }
        that.setData({
          isCheckShow: true
        })
      }
    }
    if (typeValue == 4) {
      that.setData({
        isCheckShow: false
      })
    }
   
    if (loginObj.role_id == 4) {
      //项目经理
      that.setData({
        isSelectShow: false
      })
      if(typeValue==2){
        that.setData({
          isCheckShow: false,
          isCommentShow:false
        })
      }
    } else if (loginObj.role_id == 2) {
      that.setData({
        selectTitle: '项目商务经理'
      })
    } else if (loginObj.role_id == 3) {
      that.setData({
        selectTitle: '项目经理'
      })
    }

    //  1 待审核 2同意 3驳回 4待处理 5.处理完成
    if (state == 1) {
      statePic = '/images/check.png';
    } else if (state == 2) {
      statePic = '/images/pass.png';
    } else if (state == 3) {
      statePic = '/images/disagree.png';
    } else if (state == 4) {
      statePic = '/images/todo.png';

      //获取下拉列表

      var url = mainUrl + "/workSheet/get_detail_select";
      var data = {

        'role_id': loginObj.role_id
      }
      wRequest.wxPost(url, data).then((res) => {
        var selectIdArray = [];
        var selectNameArray = [];

        for (let i = 0; i < res.data.length; i++) {
          selectIdArray.push(res.data[i].id);
          selectNameArray.push(res.data[i].name);

        }
        that.setData({
          selectIdArray: selectIdArray,
          selectNameArray: selectNameArray,
        })
      }, (res) => {
      })

    } else if (state == 5) {
      statePic = '/images/finish.png';
    }
    this.setData({
      statePic: statePic,
      state: state
    })


    var url = mainUrl + "/workSheet/get_detail";
    var data = {
      'sheet_id': id,
      'id': loginObj.id,
      'role_id': loginObj.role_id
    }
    wRequest.wxPost(url, data).then((res) => {
      that.setData({
        detail: res.data
      })
    }, (res) => {
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }, bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.selectNameArray[e.detail.value])
    this.setData({
      selectItemId: this.data.selectIdArray[e.detail.value],
      selectName: this.data.selectNameArray[e.detail.value]
    })
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

  }, selectItem: function (e) {
    console.log(e.currentTarget.dataset.id)

    this.setData({
      selectId: e.currentTarget.dataset.id
    })

  }, onSubmit: function (e) {
    var that = this;
    var canSubmit = true;
    var work_reason = e.detail.value.work_reason;
    if (this.data.selectId == 1) {
      var loginObj = wx.getStorageSync('loginObj');
      if (loginObj.role_id == 4) {

      } else {


        if (this.data.selectName == '' || this.data.selectName == '选择') {

          that.setData({
            tips: '请选择' + that.data.selectTitle,
            isTipsShow: true
          })
          canSubmit = false;
          that.timeout();
        }
      }
      if (canSubmit) {
        var url = mainUrl + "/workSheet/agree";
        var data = {
          'man_id': that.data.selectItemId,
          'sheet_id': that.data.id,
          'recieve_id': that.data.recieve_id,
          'role_id': loginObj.role_id
        }
        wx.showLoading({
          title: '请求中',
        })
        wRequest.wxPost(url, data).then((res) => {
          wx.hideLoading();
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.onLoad();
          wx.showToast({
            title: '工单已处理',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 500)

            }
          })
        }, (res) => {
        })
      }
    } else {
      var loginObj = wx.getStorageSync('loginObj');



      if (work_reason == '') {

        that.setData({
          tips: '请填写驳回原因',
          isTipsShow: true
        })
        canSubmit = false;
        that.timeout();
      }

      if (canSubmit) {
        var url = mainUrl + "/workSheet/dis_agree";
        var data = {
          'role_id': loginObj.role_id,
          'sheet_id': that.data.id,
          'man_id': loginObj.id,
          'comment': work_reason
        }
        wx.showLoading({
          title: '请求中',
        })
        wRequest.wxPost(url, data).then((res) => {
          wx.hideLoading();
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.onLoad();
          wx.showToast({
            title: '工单已处理',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 500)

            }
          })
        }, (res) => {
        })
      }
    }
  }, timeout: function () {
    var that = this;
    setTimeout(function () {

      that.setData({

        isTipsShow: false
      })

      return;
    }, 500);

  }, bindWorkReasonChange: function (e) {
    console.log('bindWorkReasonChange，携带值为', e.detail.value)
    this.setData({
      work_reason: e.detail.value
    })
  }
})