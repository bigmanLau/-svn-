// index.js
var wRequest = require('../../utils/servers.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取产品介绍
    this.getList();

  }, onReachBottom() {
    if (!this.isLoadingMarket) {
      this.isLoadingMarket = true;
      this.getList();
    }
  }, isLoadingMarket: false,

  getList() {
    var parms = {
      'pageNo': this.data.pageNum,
      'pageSize': 10
    }
    wRequest.getProductRss(parms).then((res) => {
      if (this.data.pageNum == 1) {
        let result = res.data.data.result;

        for (let i = 0; i < result.length; i++) {
          result[i].yieldRate = Math.round(result[i].yieldRate * 100) / 100;
          var strs = new Array(); //定义一数组 
          strs = result[i].ctpProductNames.split(","); //字符分割 
          result[i].tag = strs;
          if (result[i].serviceDay<0){
            result[i].serviceDay=0;
          }
        }
        this.setData({
          marketList: result
        })
      } else {
        let result = res.data.data.result;

        for (let i = 0; i < result.length; i++) {
          result[i].yieldRate = Math.round(result[i].yieldRate * 100) / 100;
          var strs = new Array(); //定义一数组 
          strs = result[i].ctpProductNames.split(","); //字符分割 
          result[i].tag = strs;
          if (result[i].serviceDay < 0) {
            result[i].serviceDay = 0;
          }
        }



        var result2 = this.data.marketList.concat(result);

        this.setData({
          marketList: result2
        })

        if (result.length == 0) {
          wx.showToast({
            title: '已经没有数据了',
          })
        }
      }


      this.data.pageNum++;
      this.isLoadingMarket = false;

    }, (res) => {
      console.log("marketList", res);
      this.isLoadingMarket = false;
    });
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
 goDetail: function (e) {
    wx.navigateTo({
      url: '../datadetail/index?id=' + e.currentTarget.dataset.id + "&name=" + e.currentTarget.dataset.name,
    })

  }
})