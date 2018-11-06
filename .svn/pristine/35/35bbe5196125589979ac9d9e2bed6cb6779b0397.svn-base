var wRequest = require('../../utils/servers.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    exchangeIndex: 1, //1大连交易所,2上海交易所,3郑州交易所、4中国金融期货交易所 5能源
    tice: 0
  },
  selectTab(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
      list: []
    })
    if (index == 1) {
      this.page = 1
      this.allLoad = false
      this.getExchange()
    } else {
      this.page = 1
      this.allLoad = false
      this.getCompanyPage()
    }

  },
  changeExchangeIndex(e) {
    this.setData({
      exchangeIndex: e.currentTarget.dataset.index
    })
    this.page = 1
    this.allLoad = false
    this.getExchange()

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getExchange()
    this.notice()
  },
  onShow: function(options) {
    this.notice()
    this.getCompanyPage()
    console.log("页面显示")
  },
  page: 1,
  pageSize: 10,
  allLoad: false,
  getCompanyPage() {
    let parms = {
      page: this.page,
      size: this.pageSize
    };
    wRequest.getCompanyPage(parms)
      .then(res => {

        var ret = res.data.data;
        if (res && res.data.resultCode && res.data.resultCode == 'success') {

          if (this.page == 1) {

            this.setData({
              list: res.data.data
            })
          } else {
            let result = this.data.list.concat(res.data.data)
            this.setData({
              list: result
            })
          }
          if (res.data.data.length < this.pageSize) {
            this.allLoad = true
          } else {
            this.page++
          }
          this.isLoading = false
        } // data is success

      })
  },
  notice(){
   // if (this.allLoad) return
    let parms = {
      page: this.page,
      size: this.pageSize
    }
    wRequest.notice(parms)
      .then(res => {
        console.log("未读", res.data.data)
        if (this.page == 1) {
          this.setData({
            tice: res.data.data
          })
        }
      })
  },
  getExchange() {
    if (this.allLoad) return
    let parms = {
      page: this.page,
      type: this.data.exchangeIndex,
      size: this.pageSize
    }
    wRequest.getExchange(parms)
      .then(res => {
        if (this.page == 1) {
          this.setData({
            list: res.data.data
          })
        } else {
          let result = this.data.list.concat(res.data.data)
          this.setData({
            list: result
          })
        }
        if (res.data.data.length < this.pageSize) {
          this.allLoad = true
        } else {
          this.page++
        }
        this.isLoading = false
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.isLoading) {
      this.isLoading = true
      if (this.data.tabIndex == 1) {
        this.getExchange()
      } else {
        this.getCompanyPage()
      }
    }
  },
})