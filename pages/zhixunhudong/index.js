// index.js
var wRequest = require('../../utils/servers.js');
//获取应用实例

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectItem: 1,
    isShowMessage: true,
    npageNum: 1,
    noticepageNum: 1,
    zpageNum:1,
    qpageNum:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.getStorage({
      key: 'loginObj',
      success: function (res) {
        console.log(res)
        that.setData({
          nickname: res.data.name
        })

      },
    })
    this.getNewsList();
    this.getNoticeList();
    this.getLiveList();
    this.getQuestionList();
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
    if (wx.getStorageSync("selectItem")) {

      this.setData({
        selectItem: wx.getStorageSync("selectItem")
      })
      wx.clearStorageSync();

    }
  },
  isLoadingN: false,
  isLoadingNotice: false,
  isLoadingZ: false,
  isLoadingQ:false,
  getNewsList() {

    //获取咨询列表

    var tparms = {
      'pageType': 2,
      'pageNo': this.data.npageNum,
      'pageSize': 10
    }
    wRequest.getNewsList(tparms).then((res) => {

      if (this.data.npageNum == 1) {
        let result = res.data.data.result;


        this.setData({
          newsList: result
        })
      } else {
        let result = res.data.data.result;
        var result2 = this.data.newsList.concat(result);

        this.setData({
          newsList: result2
        })

        if (result.length == 0) {
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }


      this.data.npageNum++;
      this.isLoadingN = false;

    }, (res) => {
      console.log("getNewsList", res);
      this.isLoadingN = false;
    });

  }



  ,
  getNoticeList() {

    //获取公告列表

    var tparms = {

      'pageNo': this.data.npageNum,
      'pageSize': 10
    }
    wRequest.getNotice(tparms).then((res) => {

      if (this.data.noticepageNum == 1) {
        let result = res.data.data;


        this.setData({
          noticeList: result
        })
      } else {
        let result = res.data.data;
        var result2 = this.data.noticeList.concat(result);

        this.setData({
          noticeList: result2
        })

        if (result.length == 0) {
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }


      this.data.noticepageNum++;
      this.isLoadingNotice = false;

    }, (res) => {
      console.log("getNewsList", res);
      this.isLoadingNotice = false;
    });

  },




  getLiveList() {

    //获取直播列表

    var tparms = {

      'pageNo': this.data.zpageNum,
      'pageSize': 10
    }
    wRequest.getBrokerLive(tparms).then((res) => {

      if (this.data.zpageNum == 1) {
        let result = res.data.data.result;


        this.setData({
          LiveList: result
        })
      } else {
        let result = res.data.data.result;
        var result2 = this.data.LiveList.concat(result);

        this.setData({
          LiveList: result2
        })

        if (result.length == 0) {
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }


      this.data.zpageNum++;
      this.isLoadingZ = false;

    }, (res) => {
      console.log("getNewsList", res);
      this.isLoadingZ = false;
    });

  },





  getQuestionList() {

    //获取问答列表

    var tparms = {

      'pageNo': this.data.qpageNum,
      'pageSize': 10
    }
    wRequest.getQuestionList(tparms).then((res) => {

      if (this.data.qpageNum == 1) {
        let result = res.data.data.result;


        this.setData({
          questionList: result
        })
      } else {
        let result = res.data.data.result;
        var result2 = this.data.questionList.concat(result);

        this.setData({
          questionList: result2
        })

        if (result.length == 0) {
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }


      this.data.qpageNum++;
      this.isLoadingQ = false;

    }, (res) => {
      console.log("getNewsList", res);
      this.isLoadingQ = false;
    });

  },










  onReachBottom() {
    if (!this.isLoadingN && !this.isLoadingNotice && !this.isLoadingZ && !this.isLoadingQ) {
      if(this.data.selectItem==1){
        this.isLoadingN = true;
        this.getNewsList();
      }else if(this.data.selectItem==2){
        this.isLoadingNotice = true;
        this.getNoticeList();
      } else if (this.data.selectItem == 3) {
        this.isLoadingZ = true;
        this.getLiveList();
      } else if (this.data.selectItem == 4) {
        this.isLoadingQ = true;
        this.getQuestionList();
      }
     
    }
  },
 clickItem: function (e) {
    this.setData({
      selectItem: e.currentTarget.dataset.id
    })
  }, goGonggaoDetail: function (e) {
    wx.navigateTo({
      url: '../gonggaodetail/index?id='+e.currentTarget.dataset.id,
    })
  }, goZixunDetail(e){
    wx.navigateTo({
      url: '../zixundetail/index?id=' + e.currentTarget.dataset.id,
    })

  },
  
  
  
  chat: function () {
    this.setData({
      isShowMessage: false

    })
  }, cancel: function () {
    this.setData({
      isShowMessage: true

    })
  }, 
  
  isLoading:false,
  submit: function (e) {
  console.log("dadfsa==>",e)
    if(this.isLoading){
      return;
    }
    this.isLoading=true;
    let parms={
      content: e.detail.value.questionContent,
      formId: e.detail.formId
    }
    wx.showLoading({
      title: '提交中',
    })
    wRequest.saveQuestion(parms).then((res) => {
      if (res.data.statusCode =='1481509367'){
        this.data.qpageNum=1;
      this.getQuestionList();
      this.setData({
        isShowMessage: true

      })
      wx.showToast({
        title: '提交成功',
      })
      this.isLoading=false;
      }else{
        wx.showToast({
          title: '提交失败',
        })
        this.isLoading = false;
      }
    }, (res) => {
      this.isLoading = false;
      this.setData({
        isShowMessage: true

      })
      
    });


   
  }
})