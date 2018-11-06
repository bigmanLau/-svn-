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
    wRequest.getBugLog(parms).then((res) => {
      if (this.data.pageNum == 1) {
        let result = res.data.data.result;

        this.setData({
          marketList: result
        })
      } else {
        let result = res.data.data.result;

       



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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})