var wxCharts = require('../../utils/wxcharts.js');
var wxCharts2 = require('../../utils/wxcharts2.js');
var chart = require("../../utils/chart.js");
var chart2 = require("../../utils/chart.js");
let ctx1, ctx2 = null;
var lineChart = null;
let columnChart = null;
var wRequest = require('../../utils/servers.js');
var util = require('../../utils/util.js');
let app = getApp()
const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()


let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月 获取当月的总天数
let getDays = function(year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function(year, month, day, _th, index) {
  let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  day = day > daysNum ? 1 : day
  // let monthsNum = year === nowYear ? nowMonth : 12
  let monthsNum = year === nowYear ? nowMonth : 12 - nowMonth

  let years = []
  let months = []
  let days = []
  let yearIdx = 9999
  let monthIdx = 0
  let dayIdx = 0

  // 重新设置年份列表
  for (let i = nowYear - 1; i <= nowYear; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIdx = idx
    }
  })
  if (year === nowYear) {
    // 重新设置月份列表
    for (let i = 1; i <= monthsNum; i++) {
      months.push(i)
    }
  } else {
    for (let i = 12 - monthsNum + 1; i <= 12; i++) {
      months.push(i)
    }
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIdx = idx
    }
  })
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    days.push(i)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIdx = idx
    }
  })
  if (index == 1) {
    _th.setData({
      years: years, //年份列表
      months: months, //月份列表
      days: days, //日期列表
      value: [yearIdx, monthIdx, dayIdx],
      year: year,
      month: month,
      day: day
    })
  } else {
    _th.setData({
      years2: years, //年份列表
      months2: months, //月份列表
      days2: days, //日期列表
      value2: [yearIdx, monthIdx, dayIdx],
      year2: year,
      month2: month,
      day2: day
    })
  }

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas_tag: 1,
    chartIndex: 1, //曲线选择 1为收益 2为复权,
    orderIndex: 1, //持仓报单模块 1为持仓 2为未成交单 3为条件单
    countIndex: 1, //交易次数选择 1为当日 2为累计
    moneyIndex: 1, //手续费选择，1为当日 2为累计
    investorId: "999200850",
    isShowCommission: true,
    isShowCount: true,
    isShowOrder: true,
    isLogin: true,
    years: [],
    months: [],
    days: [],
    year: nowYear,
    month: nowMonth,
    day: nowDay,
    years2: [],
    months2: [],
    days2: [],
    year2: nowYear,
    month2: nowMonth,
    day2: nowDay,
    value: [9999, 1, 1],
    value2: [9999, 1, 1],
    isShowPickTime: false,
    islogin: false
  },
  account2() {
    let typeValue;

    switch (this.data.canvas_tag) {
      case "1":
        typeValue = "iw"
        break;
      case "2":
        typeValue = "MM"
        break;
      case "3":
        typeValue = "0"
        break;
      case "4":
        typeValue = "sixMonths"
        break;
    }
    var parms = {
      type: 1,
      beginDate: this.data.beginDate,
      endDate: this.data.endDate
    }


    wRequest.account1(parms).then((res) => {
      console.log("account3", res.data)
      if (res.data.data == null) return;
      this.setData({
        line: res.data.data.incomeEntities
      })
      if (res.data.data.incomeEntities != null && res.data.data.incomeEntities.length != 0) {
        this.updateData()
      }

      this.setNewChartData(res)
      this.setData({
        account3: res.data.data
      })

    }, (res) => {
      console.log("account2", res)
    });
  },
  changeShowDetail() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  },
  bindChange: function(e) {
    let val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this, 1)
  },
  bindChange2: function(e) {
    let val = e.detail.value
    setDate(this.data.years2[val[0]], this.data.months2[val[1]], this.data.days2[val[2]], this, 2)
  },
  changeShowCommission() {
    this.setData({
      isShowCommission: !this.data.isShowCommission
    })
  },
  changeCountShow() {
    this.setData({
      isShowCount: !this.data.isShowCount
    })
  },
  changeOrderShow() {
    this.setData({
      isShowOrder: !this.data.isShowOrder
    })
  },
  canvasTap(e) {

    if (e.currentTarget.dataset.id == 5) {
      this.setData({
        customIndex: e.currentTarget.dataset.id
      })
      this.changeShowPicker()
      return
    } else {
      this.setData({
        canvas_tag: e.currentTarget.dataset.id
      })
      this.account3()
    }




  },
  cancalShow() {
    this.setData({
      isShowPickTime: !this.data.isShowPickTime
    })
    this.account3()
  },
  changeShowPicker() {

    this.setData({
      isShowPickTime: !this.data.isShowPickTime
    })

  },
  //切换曲线显示
  changeChart(e) {
    let index = e.currentTarget.dataset.index
    this.data.chartIndex = index

    if (this.data.line == null || this.data.line.length == 0) {
      return;
    }
    if (this.data.chartIndex == 1) {

      lineChart.changeLineColor("#3c3c3c")
      this.updateData()
    } else if (this.data.chartIndex == 2) {

      lineChart.changeLineColor("#2A9EF1")
      this.updateData()
    } else {
      lineChart.changeLineColor("#FE8441")
      this.updateData()

    }
  },
  //切换曲线显示
  changeChart2(e) {
    let index = e.currentTarget.dataset.index
    this.data.chartIndex = index

    if (this.data.chartIndex == 1) {

      lineChart.changeLineColor("#3c3c3c")
      this.updateData2()
    } else if (this.data.chartIndex == 2) {

      lineChart.changeLineColor("#2A9EF1")
      this.updateData2()
    } else {
      lineChart.changeLineColor("#FE8441")
      this.updateData2()

    }
  },
  //切换持仓 未成交单 条件单
  changeOrder(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      orderIndex: index
    })
  },
  changeCount(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      countIndex: index
    })
  },
  changeMoney(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      moneyIndex: index
    })
  },
  touchMove() {

  },
  touchHandler: function(e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function(item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < 6; i++) {
      categories.push('2018-1-' + (i + 1));
      data.push(Math.random());
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  canvasTap2(e) {
    this.setData({
      canvas_tag: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 5) {
      this.changeShowPicker()
      return
    }
    this.updateData2()

  },
  showerror() {
    this.isError = true;
    wx.showModal({
      title: '提示',
      content: '结束时间不能小于开始时间',
      showCancel: false
    })
    return
  },
  submitTime() {
    this.isError = false;
    if (this.data.years[this.data.value[0]] <= this.data.years2[this.data.value2[0]]) {
      if (this.data.years[this.data.value[0]] == this.data.years2[this.data.value2[0]]) {
        if (this.data.months[this.data.value[1]] <= this.data.months2[this.data.value2[1]]) {

          if (this.data.months[this.data.value[1]] == this.data.months2[this.data.value2[1]]) {
            if (this.data.days[this.data.value[2]] < this.data.days2[this.data.value2[2]]) {

            } else {
              this.showerror()
            }
          }

        } else {
          this.showerror()
        }
      }
    } else {
      this.showerror()
    }
    if (!this.isError) {
      let startTime = this.data.years[this.data.value[0]] + "-" +
        this.data.months[this.data.value[1]] + "-" +
        this.data.days[this.data.value[2]]
      let endTime = this.data.years2[this.data.value2[0]] + "-" +
        this.data.months2[this.data.value2[1]] + "-" +
        this.data.days2[this.data.value2[2]]
      console.log(startTime)
      console.log(endTime)
      this.setData({
        beginDate: startTime,
        endDate: endTime,
        canvas_tag: this.data.customIndex
      })
      if (app.globalData.islogin) {
        this.account2()
      } else {
        this.updateData2()
      }
      this.changeShowPicker()
    }



  },
  updateData2: function() {
    var simulationData = this.createSimulationData();
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data.sort(),
        format: function(val, name) {
          if (this.isInteger(val)) {
            return val
          } else {
            return val.toFixed(2);
          }
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor: "#737373"
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: (val) => {
          if (this.isInteger(val)) {
            return val + "%"
          } else {
            return val.toFixed(2) + "%";
          }

        },

        disableGrid: true,
        fontColor: "#737373"
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      title: false,
      legend: false,
      dataPointShape: false,
      extra: {
        lineStyle: 'line'
      }
    });
  },

  updateData: function() {
    let simulationData;

    if ((this.data.chartIndex + "") == 1) {
      simulationData = this.createSimulationData2();
    } else if ((this.data.chartIndex + "") == 2) {
      simulationData = this.createSimulationData3();

    } else {
      simulationData = this.createSimulationData4();
    }
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: false,
      // background: '#f5f5f5',
      series: [{
        name: '成交量1',
        data: simulationData.data,
        format: (val, name) => {
          if (this.isInteger(val)) {
            return val
          } else {
            return val.toFixed(2);
          }
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor: "#737373"
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: (val) => {
          var suffix = "%";
          if (this.data.chartIndex  == 2 ) {
            suffix = ""
          }
          if (this.isInteger(val)) {
            return val + suffix
          } else {
            return val.toFixed(2) + suffix;
          }
        },

        disableGrid: true,
        fontColor: "#696969"
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      title: false,
      legend: false,
      dataPointShape: false,
      extra: {
        lineStyle: 'line'
      }
    });
  },
  isInteger(obj) {
    return Math.round(obj) === obj //是整数，则返回true，否则返回false
  },
  //收益数据整合
  createSimulationData2: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < this.data.line.length; i++) {
      categories.push(this.data.line[i].day);
      data.push(this.data.line[i].income);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  //复权数据整合
  createSimulationData3: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < this.data.line.length; i++) {
      categories.push(this.data.line[i].day);
      data.push(this.data.line[i].reinstated);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  createSimulationData4: function() {
    var categories = [];
    var data = [];
    for (var i = 0; i < this.data.line.length; i++) {
      categories.push(this.data.line[i].day);
      data.push(this.data.line[i].annualreturn ? this.data.line[i].annualreturn : 0);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.scene)
    if (app.globalData.scene && (app.globalData.scene == 1007 || app.globalData.scene == 1008)) {
      // this.setData({
      //   showReturn:true
      // })
      this.setData({
        islogin: false
      })
      app.globalData.scene = ""
    } else {
      this.setData({
        islogin: app.globalData.islogin
      })
    }


    chart.resetChart()
    chart2.resetChart()
    if (!this.data.islogin) {
      this.updateData2()
      this.drawColumn()
      this.drawPie()
      this.mockData()
      setDate(this.data.year, this.data.month, this.data.day, this, 1)
      setDate(this.data.year2, this.data.month2, this.data.day2, this, 2)
    } else {

      setDate(this.data.year, this.data.month, this.data.day, this, 1)
      setDate(this.data.year2, this.data.month2, this.data.day2, this, 2)

      // this.initChart()
      // this.findDataByinvesId()

      this.account3()

      this.getAll()
      this.getNotOrders()
      this.getCount()
      this.getAllCount()
      this.getCommission()
      this.getAllCommission()



    }

  },
  goback() {
    app.globalData.scene = ""
    wx.reLaunch({
      url: '../jinrishouye/index',
    })
  },
  setNewChartData(res) {
    if (res.data.data == null) return;
    let poundageList = res.data.data.poundageList
    let lossList = res.data.data.lossList
    let profitList = res.data.data.profitList
    let poundageName = []
    let poundageValue = []
    if (poundageList != null && poundageList.length > 0) {


      for (let k in poundageList) {
        poundageName.push((poundageList[k].name))
        poundageValue.push(poundageList[k].value)

      }


    }
    let finalName = []
    let finalValue = []
    let colorlist = []
    if (profitList != null && profitList.length > 0) {
      for (let k in profitList) {
        finalName.push((profitList[k].name))


        colorlist.push("#EF4B4C")

        finalValue.push(Math.abs(profitList[k].value))
      }
    }
    // finalName.push("10年期国债")
    // colorlist.push("#53B75D")
    // finalValue.push(Math.abs(0.1))
    if (lossList != null && lossList.length > 0) {
      for (let k in lossList) {
        finalName.push((lossList[k].name))


        colorlist.push("#53B75D")

        finalValue.push(Math.abs(lossList[k].value))
      }
    }

    chart.resetChart()
    chart2.resetChart()
    if (finalValue.length > 0) {
      this.drawNewColumn(finalName, finalValue, colorlist)
    }
    if (poundageValue.length > 0)
      this.drawPieReal(poundageName, poundageValue)

    this.setData({
      poundageName: poundageName,
      finalName: finalName
    })


  },
  mockData() {
    let mockall = {

    }
  },
  drawColumn() {
    let value = [80, 70, 60, 15, 25, 55]
    let name = ['焦炭', '白糖', '铁矿石', '玉米', '螺纹钢', '豆柏']
    let colors = ["red", "red", "red", "green", "green", "green"]
    this.drawNewColumn2(name, value, colors)
    // this.drawNewColumn(['焦炭', '白糖', '铁矿石', '玉米', '螺纹钢', '豆柏'], [80, 70, 60, 15, 25, 55], ["red", "red", "red", "green", "green", "green"])
    // ctx1 = chart.draw(this, 'canvas1', {
    //   // title: {
    //   //   text: "2017城市人均收入(万)",
    //   //   color: "#333333"
    //   // },
    //   xAxis: {
    //     data: ['焦炭', '白糖', '铁矿石', '玉米', '螺纹钢', '豆柏']
    //   },
    //   series: [
    //     {
    //       name: "第一季度",
    //       category: "bar",
    //       colors: ["red", "red", "red","green", "green", "green" ],
    //       data: [80, 70, 60, 15, 25, 55]
    //     }


    //   ]
    // });
  },
  drawPie() {
    ctx2 = chart.draw(this, 'canvas2', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: ['螺纹钢', '焦煤  ', '白糖  ', '玉米  ', '铁矿石', '其他  ']
      },
      series: [{
          name: ['螺纹钢', '焦煤  ', '白糖  ', '玉米  ', '铁矿石', '其他  '],
          category: "pie",
          data: [40, 38, 39, 28, 27, 15]
        }


      ]
    });
  }
  //获取资金账号信息
  ,
  findDataByinvesId() {
    let parms = {

    }
    wRequest.findDataByinvesId(parms).then((res) => {
      if (res.data.data == null) return;
      let poundageList = res.data.data.poundageList
      let lossList = res.data.data.lossList
      let profitList = res.data.data.profitList
      let poundageName = []
      let poundageValue = []
      for (let k in poundageList) {
        poundageName.push((poundageList[k].name))
        poundageValue.push(poundageList[k].value)
      }
      let finalName = []
      let finalValue = []
      let colorlist = []

      for (let k in profitList) {
        finalName.push((profitList[k].name))


        colorlist.push("red")

        finalValue.push(Math.abs(profitList[k].value))
      }
      for (let k in lossList) {
        finalName.push((lossList[k].name))


        colorlist.push("green")

        finalValue.push(Math.abs(lossList[k].value))
      }




      this.drawNewColumn(finalName, finalValue, colorlist)
      this.drawPieReal(poundageName, poundageValue)
      this.setData({
        account: res.data.data
      })

    }, (res) => {
      console.log("findDataByinvesId", res)
    });
  },

  account3() {

    let typeValue;

    switch (this.data.canvas_tag + "") {
      case "1":
        typeValue = "iw"
        break;
      case "2":
        typeValue = "MM"
        break;
      case "3":
        typeValue = "0"
        break;
      case "4":
        typeValue = "sixMonths"
        break;
    }
    var parms = {
      type: typeValue
    }

    wRequest.account1(parms).then((res) => {
      console.log("account3", res.data)
      if (res.data.data == null) return;
      this.setData({
        line: res.data.data.incomeEntities
      })
      if (res.data.data.incomeEntities != null && res.data.data.incomeEntities.length != 0) {
        this.updateData()
      }

      this.setNewChartData(res)
      this.setData({
        account3: res.data.data
      })

    }, (res) => {
      console.log("account", res)
    });
  }
  //获取持仓
  ,
  getAll() {
    let parms = {

    }
    wRequest.getAll(parms).then((res) => {
      console.log("getall", res.data)
      this.setData({
        all: res.data.data
      })

    }, (res) => {
      console.log("getall", res)
    });
  },
  //获取未成交单
  getNotOrders() {
    let parms = {

    }
    wRequest.getNotOrders(parms).then((res) => {

      this.setData({
        NoOrder: res.data.data
      })

    }, (res) => {
      console.log("getNotOrders", res)
    });
  }
  //获取单日交易次数
  ,
  getCount() {
    let parms = {

    }
    wRequest.getCount(parms).then((res) => {

      this.setData({
        count: res.data.data,
        today: util.formatTime2(new Date())
      })

    }, (res) => {
      console.log("getCount", res)
    });
  },
  getAllCount() {
    let parms = {

    }
    wRequest.getAllCount(parms).then((res) => {

      this.setData({
        allcount: res.data.data
      })

    }, (res) => {
      console.log("getAllCount", res)
    });
  },
  getCommission() {
    let parms = {

    }
    wRequest.getCommission(parms).then((res) => {

      this.setData({
        commission: res.data.data
      })

    }, (res) => {
      console.log("commission", res)
    });
  },
  getAllCommission() {
    let parms = {

    }
    wRequest.getAllCommission(parms).then((res) => {

      this.setData({
        allcommission: res.data.data,

      })
    }, (res) => {
      console.log("getAllCommission", res)
    });

  },
  drawPieReal(namelist, valuelist) {

    ctx2 = chart.draw(this, 'canvas3', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: namelist
      },
      series: [{
          name: namelist,
          category: "pie",
          data: valuelist
        }
      ]
    });

  },
  drawColumnReal(namelist, valuelist, colorlist) {
    for (let i = 0; i < valuelist.length; i++) {
      valuelist[i] = valuelist[i].toFixed(1)
    }
    console.log(valuelist)

    ctx1 = chart.draw(this, 'canvas4', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: namelist
      },
      series: [{

          category: "bar",
          colors: colorlist,
          data: valuelist
        }


      ]
    });
  },
  drawNewColumn(namelist, valuelist, colorlist) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts2({
      canvasId: 'canvas4',
      type: 'column',
      animation: false,
      categories: namelist,
      colors: colorlist,
      dataLabel: false,
      series: [{
        name: '品种',
        data: valuelist,
        format: function(val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function(val) {
          return val;
        },
        title: "金额(万元)",
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 25
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  drawNewColumn(namelist, valuelist, colorlist) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts2({
      canvasId: 'canvas4',
      type: 'column',
      animation: false,
      categories: namelist,
      colors: colorlist,
      dataLabel: false,
      series: [{
        name: '品种',
        data: valuelist,
        format: function(val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function(val) {
          return val;
        },
        title: "金额(万元)",
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 25
        }
      },
      width: windowWidth,
      height: 200,
    });
  },
  drawNewColumn2(namelist, valuelist, colorlist) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts2({
      canvasId: 'canvas1',
      type: 'column',
      animation: false,
      categories: namelist,
      colors: colorlist,
      dataLabel: false,
      series: [{
        name: '品种',
        data: valuelist,
        format: function(val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function(val) {
          return val;
        },
        title: "金额(万元)",
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 25
        }
      },
      width: windowWidth,
      height: 200,
    });
  }
})