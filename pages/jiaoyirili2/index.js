// pages/jiaoyirili2/index.js
var wRequest = require('../../utils/servers.js');
let calendar = require('../../utils/calendar.js');
let rili = require('../../utils/rilidata.js');
let riliday = require('../../utils/riliday.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollAnimation: true,
    banner: [],
    swiperCurrent: 1,
    lastCurrent: 0,
    isFirst: true,
    islogin: true,
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   islogin: app.globalData.islogin
    // })
    this.initDayArray()
  },

  initDayArray() {

    setTimeout(() => {
      let dat = new Date()
      var nian = dat.getFullYear(); //当前年份 
      var yue = dat.getMonth(); //当前月 
      var tian = dat.getDate(); //当前天  
      this.data.banner.push(calendar.createCalendar(nian, yue, 1))
      this.data.banner.push(calendar.createCalendar(nian, yue + 1, 1))
      this.data.banner.push(calendar.createCalendar(nian, yue + 2, 1))
      this.setData({
        banner: this.data.banner,
        startYear: nian,
        startMonth: yue + 1,
        currentDate: "" + nian + "" + (yue + 1) + "" + tian,
        day: tian
      })
      wx.hideLoading()

      this.getMonthData()
      console.log("yue", this.data.startMonth)
    }, 0)

  },
  getMonthData() {
    if (!this.data.islogin) {

      this.getMockMonth()
      return
    } else {
      let parms = {
        year: this.data.startYear,
        month: this.data.startMonth % 12 == 0 ? "12" : this.data.startMonth % 12

      }
      wRequest.monthData(parms)
        .then(res => {
          if (res.data.data != null) {
            let year = this.data.startYear
            let month = this.data.startMonth % 12 == 0 ? "12" : this.data.startMonth % 12
            if (month < 10) {
              month = "0" + month
            }
            let banner = this.data.banner[1];

            let prefix = year + "" + month
            let list = res.data.data
            // debugger
            for (let i = 0; i < list.length; i++) {
              for (let j = 0; j < banner.length; j++) {
                let day = ""

                if (banner[j].day < 10) {
                  day = "0" + banner[j].day
                } else {
                  day = banner[j].day
                }
                if (prefix + day == list[i].day && banner[j].type == 2) {
                  banner[j].orgs = list[i].types
                  banner[j].ineType = list[i].ineType
                }

              }

            }
            //console.log(banner)
            this.setData({
              banner: this.data.banner
            })

            let index = 0;
            let dat = new Date()
            var curYear = dat.getFullYear(); //当前年份 
            var curMon = dat.getMonth() + 1; //当前月 
            var curDate = dat.getDate(); //当前天 

            for (let i = 0; i < this.data.banner[1].length; i++) {
              if (this.data.banner[1][i].type == 2) {
                if (this.data.banner[1][i].day == this.data.day) {
                  index = i;
                }
                if (curYear == this.data.startYear && curMon == this.data.startMonth && curDate == this.data.banner[1][i].day) {
                  this.data.banner[1][i].isCurrentDateCheck = true;
                  this.data.banner[1][i].check = false;
                }
              }

            }
            // console.log("当前月份", curMon)
            if (this.data.isFirst) {
              this.dealDayData(index, this.data.day)
              this.data.isFirst = false
            }
          }
        })
      console.log("初始化月份信息", this.data.banner)
    }
  },
  getMockMonth() {
    let res = rili
    if (res.data != null) {
      let year = this.data.startYear
      let month = this.data.startMonth % 12 == 0 ? "12" : this.data.startMonth % 12
      if (month < 10) {
        month = "0" + month
      }
      let banner = this.data.banner[1];

      let prefix = year + "" + month
      let list = res.data
      // debugger
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < banner.length; j++) {
          let day = ""

          if (banner[j].day < 10) {
            day = "0" + banner[j].day
          } else {
            day = banner[j].day
          }
          if (prefix + day == list[i].day && banner[j].type == 2) {
            banner[j].orgs = list[i].types
            banner[j].ineType = list[i].ineType
          }

        }

      }
      this.setData({
        banner: this.data.banner
      })
      let index = 0;
      for (let i = 0; i < this.data.banner[1].length; i++) {
        if (this.data.banner[1][i].type == 2) {
          if (this.data.banner[1][i].day == this.data.day) {
            index = i;
          }
        }

      }
      if (this.data.isFirst) {
        this.dealDayData(index, this.data.day)
        this.data.isFirst = false
      }
    }
  },
  swiperChange(e) {
    let current = e.detail.current
    this.dealScroll(current)
  },
  getDetail(e) {
    let day = e.currentTarget.dataset.day
    let index = e.currentTarget.dataset.index
    // debugger
    this.dealDayData(index, day)
  },
  dealDayData(index, day) {
    for (let i = 0; i < this.data.banner[1].length; i++) {
      if (index == i) {

        if (!this.data.banner[1][i].isCurrentDateCheck) {
          this.data.banner[1][i].check = true
        }

      } else {
        this.data.banner[1][i].check = false
      }

    }
    this.setData({
      banner: this.data.banner
    })
    if (this.data.islogin) {
      this.getDate(day)
    } else {
      this.getMockDate()
    }

  },
  getMockDate(day) {
    let res = riliday
    let list = res.data
    if (list != null) {
      for (let i = 0; i < list.length; i++) {
        // debugger
        if (list[i].type == "1") {
          list[i].org = "大商所"
        } else if (list[i].type == "2") {
          list[i].org = "上期所"
        } else if (list[i].type == "3") {
          list[i].org = "郑商所"
        } else if (list[i].type == "4") {
          list[i].org = "中金所"
        } else if (list[i].type == "5") {
          list[i].org = "能源"
        }
      }
      this.setData({
        list: list
      })
    } else {
      this.setData({
        list: []
      })
    }
  },
  getDate(day) {
    let parms = {
      year: this.data.startYear,
      month: this.data.startMonth % 12 == 0 ? "12" : this.data.startMonth % 12,
      day: day
    }
    this.setData({
      year: this.data.startYear,
      month: this.data.startMonth % 12 == 0 ? "12" : this.data.startMonth % 12,
      day: day
    })
    wRequest.getDate(parms)
      .then(res => {
        let list = res.data.data
        if (list != null) {
          for (let i = 0; i < list.length; i++) {
            // debugger
            if (list[i].type == "1") {
              list[i].org = "大商所"
            } else if (list[i].type == "2") {
              list[i].org = "上期所"
            } else if (list[i].type == "3") {
              list[i].org = "郑商所"
            } else if (list[i].type == "4") {
              list[i].org = "中金所"
            } else if (list[i].type == "5") {
              list[i].org = "能源"
            }
          }
          this.setData({
            list: list
          })
        } else {
          this.setData({
            list: []
          })
        }
      })

  },
  goLastMonth() {
      this.dealScroll(this.data.swiperCurrent - 1)
  },
  goNextMonth() {
      this.dealScroll(this.data.swiperCurrent + 1)
  },
  //日历滚动
  dealScroll(current) {

    let changeIndex = current; //改变后的索引
    //首先判断左滑还是右滑动
    if (this.data.swiperCurrent - current > 0) {
      //左滑动
      changeIndex = 1;
      // console.log("变动月份", this.data.startMonth)
      this.dealLeftScroll(changeIndex);
      return

    } else if (this.data.swiperCurrent - current < 0) {
      //右滑动 
      changeIndex = 1;
      // console.log("变动月份", this.data.startMonth)
      this.dealRightScroll(changeIndex);
      return
    }
  },

  dealLeftScroll(changeIndex) {
    this.data.banner.splice(2, 2)
    let temp = []
    temp.push(calendar.createCalendar(this.data.startYear, this.data.startMonth - 2, 1))

    temp = temp.concat(this.data.banner)
    this.setData({
      banner: temp,
      swiperCurrent: changeIndex,
      startMonth: (--this.data.startMonth > 0 ? this.data.startMonth : 12)
    })
    if (this.data.startMonth % 12 == 0) {
      this.setData({
        startYear: this.data.startYear - 1,
      })
    }
    this.getMonthData()
  },
  dealRightScroll(changeIndex) {
    this.data.banner.splice(0, 1)
    let temp = []
    temp.push(calendar.createCalendar(this.data.startYear, this.data.startMonth + 2, 1))
    temp = this.data.banner.concat(temp)
    this.setData({
      banner: temp,
      swiperCurrent: changeIndex,
      startMonth: (++this.data.startMonth <= 12 ? this.data.startMonth : 1)
    })
    if (this.data.startMonth % 12 == 1) {
      this.setData({
        startYear: this.data.startYear + 1,
      })
    }
    this.getMonthData()
  },
  onShow() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})