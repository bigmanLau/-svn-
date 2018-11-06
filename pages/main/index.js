// index.js
var wRequest = require('../../utils/servers.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    swiperCurrent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取产品介绍
    this.getList();
    this.guessYouLike();
    this.todayNewsAndHotCategorys();

  }, onReachBottom() {
    if (!this.isLoadingMarket) {
      this.isLoadingMarket = true;
      this.getList();
    }
  }, isLoadingMarket: false,

  getList() {
    var parms = {
      "params": {
        "courseType": "1",
        'pageNo': this.data.pageNum,
        'pageSize': 10
      }
    }
    wRequest.index(parms).then((res) => {

      let result = res.data.data
      this.setData({
        banners: result.banners,
        AssistanceAlbumList: result.secKillList
      })
    }, (res) => {

    });
  },

  guessYouLike() {
    var parms = {
      "params": {
        "deviceId": "4ddedeea8dbd17fc",
        "isPersonal": 1
      }
    }
    wRequest.guessYouLike(parms).then((res) => {
      let result = res.data.data
      let array = []
      for (let i = 0; i < 3; i++) {
        array.push(result.youLikeCourses[i])
      }
      this.setData({
        vipRecommends: array
      })
    }, (res) => {

    });
  },
  todayNewsAndHotCategorys(){
    var parms = {
      "params": {
        "deviceId": "4ddedeea8dbd17fc",
        "isPersonal": 1
      }
    }
    wRequest.todayNewsAndHotCategorys(parms).then((res) => {
      let result = res.data.data
      console.log(result)
      // let array = []
      // for (let i = 0; i < 3; i++) {
      //   array.push(result.youLikeCourses[i])
      // }
      this.setData({
        categories: result.hotCategorys
      })
    }, (res) => {

    });
  },

  onSwiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
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

  handleImageLoaded: function () {
    wx.hideLoading();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  goDetail: function (e) {
    wx.navigateTo({
      url: '../datadetail/index?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })

  }
})