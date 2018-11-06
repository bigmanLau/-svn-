var chart = require("../../utils/chart.js");
var chart2 = require("../../utils/chart.js");
var wxCharts2 = require('../../utils/wxcharts2.js');
var lineChart = null;
let columnChart = null;
var wRequest = require('../../utils/servers.js');
var util = require('../../utils/util.js');
let ctx1,ctx2=null;
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas_tag: 1,
    chartIndex: 1,//曲线选择 1为收益 2为复权,
    orderIndex: 1,//持仓报单模块 1为持仓 2为未成交单 3为条件单
    countIndex: 1,//交易次数选择 1为当日 2为累计
    moneyIndex: 1,//手续费选择，1为当日 2为累计
    investorId: "999200850",
    isShowCommission: true,
    isShowCount: true,
    isShowOrder: true,
    isLogin:false
  },
  changeShowDetail() {
    this.setData({
      isShowDetail: !this.data.isShowDetail
    })
  }
  ,
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
    this.setData({
      canvas_tag: e.currentTarget.dataset.id
    })
    // if (this.data.chartIndex == 1) {
    //   this.account()
    // } else {
    this.account()
    // }

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
    } else {

      lineChart.changeLineColor("#2A9EF1")
      this.updateData()
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
  touchHandler: function (e) {
    // console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 1; i++) {
      categories.push('2018-1-' + (i + 1));
      data.push(Math.random() * (200 - 10) + 10);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
onUnload(){
console.log("unload------")
ctx1=null
ctx2=null
},


  
  isInteger(obj) {
    return Math.round(obj) === obj   //是整数，则返回true，否则返回false
  },
  //收益数据整合
  createSimulationData2: function () {
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
  createSimulationData3: function () {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({
      islogin: app.globalData.islogin,
      authId:options.authId
    })
    chart.resetChart()
    chart2.resetChart()

    if (this.data.islogin){
    // this.initChart()
    this.findDataByinvesId()
    // this.account()
    this.getAll()
    this.getNotOrders()
    this.getCount()
    this.getAllCount()
    this.getCommission()
    this.getAllCommission()
     
   
    }else{
      this.mockData()
      this.drawColumn()
      this.drawPie()
    }
  },
  mockData(){
    let mockall={

    }
  },
  drawColumn(){
    let value = [80, 70, 60, 15, 25, 55]
    let name = ['焦炭', '白糖', '铁矿石', '玉米', '螺纹钢', '豆柏']
    let colors = ["red", "red", "red", "green", "green", "green"]
    this.drawNewColumn2(name, value, colors)
  },
  drawColumnReal(namelist, valuelist, colorlist) {
    ctx1 = chart.draw(this, 'canvas4', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: namelist
      },
      series: [
        {
    
          category: "bar",
          colors: colorlist,
          data: valuelist
        }


      ]
    });
  },
  drawPie(){
    ctx2=chart.draw(this, 'canvas2', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: ['螺纹钢', '焦煤  ', '白糖  ', '玉米  ', '铁矿石','其他  ' ]
      },
      series: [
        {
          name: ['螺纹钢', '焦煤  ', '白糖  ', '玉米  ', '铁矿石', '其他  '],
          category: "pie",
          data: [40, 38, 39, 28, 27,15]
        }
   

      ]
    });
  },
  drawPieReal(namelist,valuelist) {
    ctx2 = chart.draw(this, 'canvas3', {
      // title: {
      //   text: "2017城市人均收入(万)",
      //   color: "#333333"
      // },
      xAxis: {
        data: namelist
      },
      series: [
        {
          name: namelist,
          category: "pie",
          data: valuelist
        }


      ]
    });

  }
  
  //获取资金账号信息
  , findDataByinvesId() {
    let parms = {

    }
    wRequest.findDataByinvesId(parms).then((res) => {
	  if ( res.data.data == null ) return;
      let poundageList = res.data.data.poundageList
      let lossList = res.data.data.lossList
      let profitList = res.data.data.profitList
      let poundageName=[]
      let poundageValue = []
      for (let k in poundageList){
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
      

      chart.resetChart()
      chart2.resetChart()

      if(finalName.length>0)
        this.drawNewColumn(finalName, finalValue, colorlist)

      if(poundageName.length>0)
     this.drawPieReal(poundageName, poundageValue)
      this.setData({
        account: res.data.data
      })
      this.setData({
        poundageName: poundageName,
        finalName: finalName
      })

    }, (res) => { console.log("account", res) });
  }
  //获取收益曲线
  // , account() {
  //   let typeValue;

  //   switch (this.data.canvas_tag + "") {
  //     case "1":
  //       typeValue = "iw"
  //       break;
  //     case "2":
  //       typeValue = "MM"
  //       break;
  //     case "3":
  //       typeValue = "yyyy"
  //       break;
  //     case "4":
  //       typeValue = "0"
  //       break;
  //   }
  //   var parms = {
  //     type: typeValue
  //   }

  //   wRequest.account(parms).then((res) => {
  //     console.log("account", res.data)
  //     this.setData({
  //       line: res.data.data
  //     })
  //     if (res.data.data.length > 0) {
    
  //       // this.updateData()
  //     }

  //   }, (res) => { console.log("account", res) });
  // }
  //获取持仓
  , getAll() {
    let parms = {

    }
    wRequest.getAll(parms).then((res) => {
      console.log("getall", res.data)
      this.setData({
        all: res.data.data
      })

    }, (res) => { console.log("getall", res) });
  },
  //获取未成交单
  getNotOrders() {
    let parms = {

    }
    wRequest.getNotOrders(parms).then((res) => {
      // console.log("account", res.data)
      this.setData({
        NoOrder: res.data.data
      })

    }, (res) => { console.log("getNotOrders", res) });
  }
  //获取单日交易次数
  , getCount() {
    let parms = {

    }
    wRequest.getCount(parms).then((res) => {
      // console.log("account", res.data)
      this.setData({
        count: res.data.data,
        today: util.formatTime2(new Date())
      })

    }, (res) => { console.log("getCount", res) });
  }
  , getAllCount() {
    let parms = {

    }
    wRequest.getAllCount(parms).then((res) => {
      // console.log("account", res.data)
      this.setData({
        allcount: res.data.data
      })

    }, (res) => { console.log("getAllCount", res) });
  }
  , getCommission() {
    let parms = {

    }
    wRequest.getCommission(parms).then((res) => {
      // console.log("account", res.data)
      this.setData({
        commission: res.data.data
      })

    }, (res) => { console.log("commission", res) });
  }
  , getAllCommission() {
    let parms = {

    }
    wRequest.getAllCommission(parms).then((res) => {
      // console.log("account", res.data)
      this.setData({
        allcommission: res.data.data,

      })
    }, (res) => { console.log("getAllCommission", res) });

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
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
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
  }, drawNewColumn2(namelist, valuelist, colorlist) {
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
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      yAxis: {
        format: function (val) {
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