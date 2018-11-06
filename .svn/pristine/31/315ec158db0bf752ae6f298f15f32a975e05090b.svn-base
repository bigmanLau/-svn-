var wRequest = require('../../utils/servers.js');
//获取应用实例

var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectItem: 1,
    selectItem2: 3,
    selectMonth:1,
    canScroll: true,
    isCscroll: false,
    ProductInstrumentList: [],
    Color: "redClass",
    Color2: "redClass",
    isService:false

  },
  myscrollStart() {
    this.setData({
      isCscroll: true
    })
  },
  myscrollEnd() {
    this.setData({
      isCscroll: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });

    this.setData({
      id: options.id,


    })
    wx.setNavigationBarTitle({
      title: options.name//页面标题为路由参数
    })


    wx.showLoading({
      title: '连接数据中...',
    })
    wRequest.depthMarketDataList().then(res => {
      wRequest.connectWS(wx.getStorageSync("userid"));
    });




    wRequest.connectSuccess().then(success => {
      console.log("sdfafafdadfagasg");


      //曲线图
      var windowWidth;
      var ratio;
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
        ratio = windowWidth / 750;
        console.log("===>" + ratio)
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }


      //获取产品介绍
      var id = options.id;

      var iparms = {
        id: id
      }
      wRequest.getIntroduce(iparms).then((res) => {

        console.log("introduce", res.data.data)
        res.data.data.createDate = res.data.data.createDate.split(" ")[0];
        res.data.data.yieldRate = Math.round(res.data.data.yieldRate * 100) / 100;
        res.data.data.withdrawOffer = Math.round(res.data.data.withdrawOffer * 10) / 10;
        res.data.data.oddsRatio = Math.round(res.data.data.oddsRatio * 10) / 10;

        this.setData({
          introduce: res.data.data
        })

      }, (res) => { console.log("introduce", res) });


      //获取历史平仓

      var tparms = {
        productId: id,
        pageNo: 1,
        pageSize: 10
      }
      wRequest.getTradeList(tparms).then((res) => {

        console.log("getTradeList", res.data.data.result)
        var arr = [];
        var result = res.data.data.result;
        for (let i = 0; i < result.length; i++) {
          if (parseInt(result[i].offsetFlag) != 0 && parseInt(result[i].offsetFlag) != 5) {
            arr.push(result[i])
          }
        }

        this.setData({
          tradeList: arr
        })

      }, (res) => { console.log("getTradeList", res) });


      //获取历当日成交

      var todtparms2 = {
        productId: id,
        pageNo: 1,
        pageSize: 1000,
        curTradingDayFlag: "Y"
      }
      wRequest.getTradeList(todtparms2).then((res) => {

        console.log("tradeList2", res.data.data.result)
        let arr = res.data.data.result;
        for (let i = 0; i < arr.length; i++) {

          switch (parseInt(arr[i].offsetFlag)) {
            case 0:
              arr[i].offsetFlag = "开仓";

              break;
            case 1:
              arr[i].offsetFlag = "平仓";
              break;
            case 2:
              arr[i].offsetFlag = "强平";
              break;
            case 3:
              arr[i].offsetFlag = "平今";
              break;
            case 4:
              arr[i].offsetFlag = "平昨";
              break;
            case 5:
              arr[i].offsetFlag = "强减";
              break;
            case 5:
              arr[i].offsetFlag = "本地强平";
              break;
          }
          let arr2 = [];
          arr2 = arr[i].tradeTime.split(":");
          let time = '';
          for (let j = 0; j < arr2.length; j++) {
            if (j == 0) {
              time += arr2[j] + "时";
            } else if (j == 1) {
              time += arr2[j] + "分";
            } else if (j == 2) {
              time += arr2[j] + "秒";
            }
          }
          arr[i].tradeTime = time;
        }
        this.setData({
          tradeList2: arr
        })

      }, (res) => { console.log("tradeList2", res) });




      //获取合约列表

      var pi = {
        id: id,
        pageNo: 1,
        pageSize: 100
      }
      wRequest.getProductInstrumentList(pi).then((res) => {

        console.log("ProductInstrumentList", res.data.data)
        if (res.data.data.length != 0) {
          this.setData({
            ProductInstrumentList: res.data.data,
            selectCode: res.data.data[0].code
          })
          this.getlastDepthMarketData(res.data.data[0].code);
        }
      }, (res) => { console.log("ProductInstrumentList", res) });


      //获取数据统计

      var dparms = {
        id: id,

      }
      wRequest.getDetail(dparms).then((res) => {
       
        console.log("getDetail", res.data.data)
    

        let data = res.data.data;
          if(data!=''){
          data.dynamicBalance = Math.round(data.dynamicBalance * 10) / 10;
          data.available = Math.round(data.available * 10) / 10;
          if (parseInt(data.positionProfitByTrade)>0){
            this.setData({
              Color2:"redClass"
            })
          } else if (parseInt(data.positionProfitByTrade)==0.0){
            this.setData({
              Color2: "blackClass"
            })
          } else if (parseInt(data.positionProfitByTrade)<0){
            this.setData({
              Color2: "greenClass"
            })
          }
          this.setData({
            Detail: data
            , isService: data.isService == "false" ? false : true
          })
          }
        


       


      }, (res) => { console.log("getDetailFail", res) });










      ////获取持仓信息

      var pItemparms = {
        id: id

      }

      wRequest.getProductItemList(pItemparms).then((res) => {

        console.log("getProductItemList", res.data.data)
        let result = res.data.data;

        for (let i = 0; i < result.length; i++) {
          result[i].positionRatio = Math.round(result[i].positiMatonRatio * 100) / 100;
        }
        this.setData({
          ProductItemList: result
        })

      }, (res) => { console.log("getProductItemList", res) });









      //获取产品收益列表

      var pparms = {
        productId: id,
        pageNo: 1,
        pageSize: 30,
        createDateDesc:'y'
      }
      wRequest.getProductyieldList(pparms).then((res) => {

        console.log("getProductyieldList", res.data.data)

        this.setData({
          ProductyieldList: res.data.data
        })



        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
          canvasId: 'lineCanvas',
          type: 'line',
          categories: simulationData.categories,
          animation: false,
          background: '#fff',
          series: [{
            name: '总收益率',
            data: simulationData.data,
            format: function (val, name) {
              return val + "%";
            }
           
          }],
          xAxis: {
            disableGrid: true
          },
          yAxis: {
            title: '总收益率 ',
            format: function (val) {
              return val.toFixed(2) + "%";
            },
            min: 0
          },
          width: windowWidth,
          height: 450 * ratio,
          dataLabel: false,
          dataPointShape: false,
          legend: false,
          extra: {
            lineStyle: 'curve'
          }
        });


      }, (res) => { console.log("getProductyieldList", res) });

      wx.hideLoading();
    });



    //接收数据
    wx.onSocketMessage((data) => {

      let obj = JSON.parse(data.data);

      if (obj._type == 'Product') {
        // console.log("socketProduct===>", obj);
        let product = JSON.parse(obj._data)
        product.yieldRate = wRequest.round(product.yieldRate);
        product.oddsRatio = wRequest.round(product.oddsRatio);

        product.dynamicBalance = Math.round(product.dynamicBalance * 10) / 10;
        product.available = Math.round(product.available * 10) / 10;
    
        if (parseInt(product.positionProfitByTrade) > 0) {
          this.setData({
            Color2: "redClass"
          })
        } else if (parseInt(product.positionProfitByTrade) == 0) {
          this.setData({
            Color2: "blackClass"
          })
        } else if (parseInt(product.positionProfitByTrade) < 0) {
          this.setData({
            Color2: "greenClass"
          })
        }
        this.setData({
          Detail: product
        })
      }


      if (obj._type == 'TradeData') {
        console.log("socketTradeData===>", obj);
        let product = JSON.parse(obj._data)

   


        switch (parseInt(product.offsetFlag)) {
          case 0:
            product.offsetFlag = "开仓";
            break;
          case 1:
            product.offsetFlag = "平仓";
            break;
          case 2:
            product.offsetFlag = "强平";
            break;
          case 3:
            product.offsetFlag = "平今";
            break;
          case 4:
            product.offsetFlag = "平昨";
            break;
          case 5:
            product.offsetFlag = "强减";
            break;
          case 5:
            product.offsetFlag = "本地强平";
            break;
        }

        let arr2 = [];
        arr2 = product.tradeTime.split(":");
        let time = '';
        for (let j = 0; j < arr2.length; j++) {
          if (j == 0) {
            time += arr2[j] + "时";
          } else if (j == 1) {
            time += arr2[j] + "分";
          } else if (j == 2) {
            time += arr2[j] + "秒";
          }
        }
        product.tradeTime = time;
        let recordList = this.data.tradeList2;


        recordList.unshift(product)
        this.setData({
          tradeList2: recordList
        })


      }

      if (obj._type == 'CtpProductPositionRatio') {
        console.log("socketCtpProductPositionRatio===>", obj);
        let product = JSON.parse(obj._data)

      }



      if (obj._type == 'CtpDisconnect') {
        console.log("socketCtpDisconnect===>", obj);
        let product = JSON.parse(obj._data)

      }


      if (obj._type == 'Productvar') {
        // console.log("socketProductvar===>", obj);
        let product = JSON.parse(obj._data);
        let instrumentCode = product.instrumentCode;
        let productId = product.productId;
        if (this.data.id == productId) {
          //判断是新增还是更新
          let recordList = this.data.ProductItemList;
          if (recordList.length > 0) {
            let currentIndex = 0;
            let isExist = recordList.some(function (item, index) {
              currentIndex = index;
              return item.instrumentCode == instrumentCode && item.direction == product.direction;
            })
            if (isExist) {
              recordList[currentIndex] = product;



              // recordList[currentIndex].positionRatio = Math.round(recordList[currentIndex].positionRatio * 100) / 100;

              this.setData({
                ProductItemList: recordList
              })

            } else {
              // product.positionRatio = Math.round(product.positionRatio * 100) / 100;
              recordList.push(product)
              this.setData({
                ProductItemList: recordList
              })
            }
          }
        }

      }
      if (obj._type == 'DepthMarketDataCur') {
        // console.log("socketDepthMarketDataCur===>", obj);
        let product = JSON.parse(obj._data)
        if (product.instrumentCode == this.data.selectCode) {
          let result = product;

          let percent1 = result.lastPrice - result.preSettlementPrice;
          percent1 = Math.round(percent1 * 100) / 100;
          let percent = (result.lastPrice - result.preSettlementPrice) / result.preSettlementPrice * 100;
          percent = Math.round(percent * 100) / 100;
          let minusA = result.openInterest - result.preOpenInterest;
          result.minusA = minusA;
          if (percent > 0) {
            this.setData({
              Color: "redClass"
            })
          } else if (percent == 0) {
            this.setData({
              Color: "blackClass"
            })
          } else {
            this.setData({
              Color: "greenClass"
            })
          }
          this.setData({
            getlastDepthMarketData: result,
            percent: percent,
            percent1: percent1
          })
        }

      }
    })


    wRequest.connectFail();


  },
  getlastDepthMarketData(instrumentCode) {
    ////获取持仓信息
    console.log("insCode", instrumentCode)
    var pItemparms = {
      instrumentCode: instrumentCode

    }

    wRequest.getlastDepthMarketData(pItemparms).then((res) => {

      console.log("getlastDepthMarketData", res.data.data)
      let result = res.data.data;

      let percent1 = result.lastPrice - result.preSettlementPrice;
      percent1 = Math.round(percent1 * 100) / 100;
      let percent = (result.lastPrice - result.preSettlementPrice) / result.preSettlementPrice * 100;
      percent = Math.round(percent * 100) / 100;
      let minusA = result.openInterest - result.preOpenInterest;
      result.minusA = minusA;
      this.setData({
        getlastDepthMarketData: result,
        percent: percent,
        percent1: percent1
      })
    }, (res) => { console.log("getlastDepthMarketData", res) });

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
    wx.closeSocket();
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
 changeItem: function (e) {
    this.setData({

      selectItem: e.currentTarget.dataset.id
    })
  }, changeItem2: function (e) {
    this.setData({

      selectItem2: e.currentTarget.dataset.id
    })
  }
  , changeMonth(e){
    this.setData({

      selectMonth: e.currentTarget.dataset.id
    })
    this.getLineList();
  },
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      background: '#7cb5ec'
    });
  }
  ,
  createSimulationData: function () {
    var categories = [];
    var data = [];
    var pArray = this.data.ProductyieldList;
    for (var i = 0; i < pArray.length; i++) {
      categories.push(pArray[i].createDate);
      data.push(pArray[i].value);
    }
    // data[4] = null;
    return {
      categories: categories,
      data: data
    }
  },
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '总收益率',
      data: simulationData.data,
      format: function (val, name) {
        return val + '%';
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },
  doCode(e) {
    let code = e.currentTarget.dataset.code;
    console.log("code", code)
    this.setData({
      selectCode: code
    })
    this.getlastDepthMarketData(code);
  },
  goPay(e) {
    wx.navigateTo({
      url: '../gopay/index?id=' + e.currentTarget.dataset.id,
    })
  },getLineList(){
    let pageSize;
    if(this.data.selectMonth==1){
      pageSize=30;
    }else if(this.data.selectMonth==2){
      pageSize=90;
    }else if(this.data.selectMonth==3){
      pageSize = 360;
    }
    var pparms = {
      productId: this.data.id,
      pageNo: 1,
      pageSize: pageSize,
      createDateDesc: 'y'
    }
    wRequest.getProductyieldList(pparms).then((res) => {

      console.log("getProductyieldList", res.data.data)

      this.setData({
        ProductyieldList: res.data.data
      })
      this.updateData();
  })
  }
  
})