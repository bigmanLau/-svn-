let app = getApp();
let appid = app.globalData.appid;
let appsecret = app.globalData.appsecret;
let mainUrl = app.globalData.mainUrl;
let mainUrl2 = app.globalData.mainUrl2;

let webSocketUrl = app.globalData.webSocketUrl;
let miniapps_id = app.globalData.miniapps_id;
let wxAPI = require('wxAPI.js');
let common = require('common.js');
// common.miniapps_id = miniapps_id;
module.exports = {

  index(parms){
    var url = mainUrl + "app/homeView/index.do";
    return this.wxPost(url, parms);
  },

  guessYouLike(parms) {
    var url = mainUrl + "app/homeView/guessYouLike.do";
    return this.wxPost(url, parms);
  },
  todayNewsAndHotCategorys(parms) {
    var url = mainUrl + "app/homeView/todayNewsAndHotCategorys.do";
    return this.wxPost(url, parms);
  },























  //登录
  login: function (parms) {
    // var url = mainUrl + "/authen/login.do";
    return new Promise((resolve) => {
      wx.showLoading({
        title: '登录中',
      })
      wx.login({
        success: res => {
          let code = res.code;
          let url = mainUrl + "/authen/oauth.do";
          let data = {
            code: code, appid: appid, appsercet: appsecret
          };
          resolve(this.wxPost(url, data));
        }
      });

    });

    // return this.wxPost(url, parms);
  },

  getQrcode(){
    var url = mainUrl2 + "homePage/getwxacodeunlimit"

    return this.wxGet(url );
  },
  collectFormId(formId){
    let parms={
      formId:formId
    }
    var url = mainUrl2 + "auth/collectFormId";
    return this.wxPost(url, parms);
  },
  //数字密码发送验证码
  sendCode(parms){
    var url = mainUrl2 + "homePage/sendCode";
    url += common.getGetStr(parms);
    return this.wxGet(url, parms);
  },
  //数字密码验证码验证
  validCode(parms) {
    var url = mainUrl2 + "homePage/validCode";
    url += common.getGetStr(parms);
    return this.wxGet(url, parms);
  },
  //判断是否绑定资金账户
  isBindInvestor(){
    var url = mainUrl2 + "homePage/isBindInvestor";
    return this.wxGet(url);
  },
  getCompanyDetail(parms){
    var url = mainUrl2 + "company/id";
    url += "?id=" + parms.id
    return this.wxGet(url);
  },
  //修改昵称
  isLogin(parms){
    var url = mainUrl2 + "account/isLogin";
    return this.wxPost(url, parms);
  },
  // 判断是否为登录状态
  updateName(parms) {
    var url = mainUrl2 + "homePage/updateName";
    return this.wxPost(url, parms);
  },
  //修改密码
  updatePw(parms) {
    var url = mainUrl2 + "homePage/updatePw";
    return this.wxPost(url, parms);
  },
  //重置密码
  resetPw(parms) {
    var url = mainUrl2 + "homePage/resetPw";
    return this.wxPost(url, parms);
  },
  //获取当前用户的授权资金账户列表
  investors(parms){
  var url = mainUrl2 + "auth/investors";
  return this.wxGet(url, parms);
  },
  //查询当前用户授权记录
  authlog(parms){
    var url = mainUrl2 + "auth/log";
    return this.wxGet(url, parms);
  },
  deauth(authId){
    let parms={
      authId: authId
    }
    var url = mainUrl2 + "auth/deauth";
    return this.wxPost(url, parms);
  },
  delAccount() {
    var url = mainUrl2 + "auth/delAccount";
    return this.wxPost(url);
  },
  modifyFname(parms){
    var url = mainUrl2 + "auth/modifyFname";
   
    return this.wxPost(url, parms);
  },
  modifyTname(parms){
    var url = mainUrl2 + "auth/modifyTname";
    url += common.getGetStr(parms);
    return this.wxGet(url, parms);
  },
  changeWeixin(){
    var url = mainUrl2 + "auth/changeWeixin";
    return this.wxPost(url);
  },
  unactive(parms){
    var url = mainUrl2 + "auth/unactive";
    return this.wxPost(url,parms);
  },
  createShare(){
    var url = mainUrl2 + "auth/createShare";
    return this.wxGet(url);
  },
  reqShare(shareId, formId){
    let parms={
      shareId: shareId,
      formId: formId,
      openid:app.globalData.openid
    }
    console.log("分享参数",parms)
    var url = mainUrl2 + "auth/reqShare";
    return this.wxPost(url,parms);
  },
  active(parms){
   
    var url = mainUrl2 + "auth/active";
    return this.wxPost(url,parms);
  },
  //设为主页显示
  autoShow(parms){
    var url = mainUrl2 + "auth/show";
    return this.wxPost(url, parms);
  },
  //发送授权码
  authsend(parms){
    var url = mainUrl2 + "auth/send";
    return this.wxPost(url, parms);
  },
  //监控授权我的资金账号
  authtophone(parms){
    var url = mainUrl2 + "auth/tophone";
    return this.wxPost(url, parms);
  },
  //解除绑定他人资金账号
  authunbind(parms){
    var url = mainUrl2 + "auth/unbind";
    return this.wxPost(url, parms);
  },
  //绑定他人资金账号
  authbind(parms){
    var url = mainUrl2 + "auth/bind";
    return this.wxPost(url, parms);
  },

  //排队
  queueUp(parms){
    var url = mainUrl2 + "video/queueUp";
    // url += "?investorId=" + parms.investorId 
    return this.wxPost(url, parms);
  },
  //获取排队信息
  queryQueue(parms){
    var url = mainUrl2 + "video/queryQueue";
    // url += "?investorId=" + parms.investorId 
    return this.wxPost(url, parms);
  },
  
  //查询是否成功 失败后返回原因
  queryStatus(parms) {
    var url = mainUrl2 + "video/queryStatus";
    // url += "?investorId=" + parms.investorId 
    return this.wxPost(url, parms);
  },
  //视频成功后执行
  videoSubmit(parms) {
    var url = mainUrl2 + "video/submit";
    // url += "?investorId=" + parms.investorId 
    return this.wxPost(url, parms);
  },
//资金帐号
  findDataByinvesId(parms){
    var url = mainUrl2 + "homePage/findDataByinvesId";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
//首页曲线
  account(parms) {
    var url = mainUrl2 + "homePage/account";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  account1(parms){
    var url = mainUrl2 + "homePage/account1";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取月日历数据
  monthData(parms){
    var url = mainUrl2 + "month";
    url += "?year=" + parms.year + "&month=" + parms.month
    return this.wxGet(url);
  },
 //查询手势密码
  selectGestpw(){
  var url = mainUrl2 + "homePage/selectGestpw";
  // url += "?investorId=" + parms.investorId 
  return this.wxPost(url);
},
//更新手势密码
  updateGestpw(parms){
    var url = mainUrl2 + "homePage/updateGestpw";
    // url += "?investorId=" + parms.investorId
    return this.wxPost(url, parms);
  },

//获取协议列表
  getAgreements(parms){
    var url = mainUrl2 + "agreement/getAgreements";
    return this.wxPost(url, parms);
  },
//返回协议内容
  readProtocal(parms){
    var url = mainUrl2 + "agreement/readProtocal";
    return this.wxPost(url, parms);
  },
  //预开户导航后的页面
  nextPage(){
    var url = mainUrl2 + "/preopen/navigation";
    let parms=null;
    return this.wxPost(url, parms);
  },
  //预约开户下一步
  goNext(pathName) {

    let paths = ["Account",//期货交易所选择界面
      "Adequacy",//客户类型设置页面
      "AdeUpload",//专业客户凭证上传界面			
      "Agreement",//协议签署页面
      "Cert",//证书设置界面
      "Collect",//身份证和签名上传页面
      'Department',//营业部选择页面
      'Depository',//银行信息绑定页面
      'Login',//登录页面
      'MajorQuestion',//专业客户问卷界面
      'Profile',//个人信息提交页面
      'Risk',//普通客户风险评估页面
      'Video',//视频确认页面
      "Cert",//证书页面
      "Protocol",//协议签署页面
      "Callback",//回访页面
      "Audit",//开户信息返回页面
      "Finish",//完成页面
      "Unknown"//调试用，错误页
    ]

    switch (pathName) {
      case "Login":
        wx.redirectTo({
          url: '../shoujihaoma/index',
        })
        break;
      break;
      case "Collect":
        wx.navigateTo({
          url: '../yuyuekaihuxiugai/index',
        })
        break;
      case "Department":
        wx.redirectTo({
          url: '../yuyingbumenxuanze/index',
        })
        break;
      case "Profile":
        wx.navigateTo({
          url: '../jibenziliao/index',
        })
        break;
      case "Depository":
        wx.navigateTo({
          url: '../banddingyinhang/index',
        })
        break;
      case "Risk":
        wx.navigateTo({
          url: '../wenjuan/index',
        })
      break;
      case "Agreement":
        wx.redirectTo({
          url: '../qianshuxieyi/index',
        })
      break;
      case "Video":
        wx.redirectTo({
          url: '../zhuyishixiang/index',
        })
        break;
      case "Cert":
      case "Protocol":
        wx.redirectTo({
          url: '../zhengshumima/index',
        })
      break;
      case "Callback":
        wx.redirectTo({
          url: '../huifang/index',
        })
      break;
      case "Audit":
        wx.redirectTo({
          url: '../shenqingtijiao/index',
        })
      break;
    }
   

  },
//获取交易详情
  getExchageDetail(parms){
  var url = mainUrl2 + "exchange/id";
  url += "?id=" + parms.id
  return this.wxGet(url);
},

//保存证书
  setCertPassword(parms){
    var url = mainUrl2 + "cert/saveCert";
  return this.wxPost(url, parms);
},
  getExchageDetail(parms) {
    var url = mainUrl2 + "exchange/id";
    url += "?id=" + parms.id
    return this.wxGet(url);
  },
  getQuestionList2(parms){
  var url = mainUrl2 + "callback/getQuestionList";
  return this.wxPost(url, parms);
  },
  submitAnswer2(parms){
   
    var url = mainUrl2 + "callback/submitAnswer";
    return this.wxPost(url, parms);
  },

  //登陆
  doLogin(parms){
    console.log(parms );
    var url = mainUrl2 + "account/login";
    return this.wxPost(url, parms);
  },
  //登出
  doLogout(parms){
    var url = mainUrl2 + "homePage/logout";
    return this.wxPost(url, parms);
  },
  //获取openid
  doOpenId(parms){
    var url = mainUrl2 + "account/openid";
    return this.wxPost(url, parms);
  },
  //验证手机
  goVerify(parms) {
    var url = mainUrl2 + "loginService/goVerify";
    return this.wxPost(url, parms);
  },

  //获取图形验证码
  getValidateCode(parms) {
    var url = mainUrl2 + "loginService/getValidateCode";
    return this.wxPost(url, parms);
  },
  //预开户获取用户信息
  toLogin(parms) {
    var url = mainUrl2 + "navigation/toLogin";
    return this.wxPost(url, parms);
  },
  //提交协议
  agreementSubmit(parms){
    var url = mainUrl + "agreement/submit";
    return this.wxPost(url, parms);
  },
  //开户登录
  loginSubmit(parms) {
    var url = mainUrl2 + "loginService/loginSubmit";
    return this.wxPost(url, parms);
  },
  //导航服务
  next(parms) {
    var url = mainUrl + "navigation/next";
    return this.wxPost(url, parms);
  },
  //开户上传身份证照片确认
  idCardSubmitConfirm(parms) {
    var url = mainUrl + "collect/submit";
    return this.wxPost(url, parms);
  },
  //获取营业部列表
  getBranchList(parms) {
    var url = mainUrl2 + "preopen/list";
    return this.wxPost(url, parms);
  },
  saveOpen(parms) {
    var url = mainUrl2 + "preopen/save";
    return this.wxPost(url, parms);
  },
  
  //选择营业部
  selectDepartment(parms) {
    var url = mainUrl2 + "department/selectDepartment";
    return this.wxPost(url, parms);
  },
  //确认营业部
  departmentSubmit(parms) {
    var url = mainUrl + "department/submit";
    return this.wxPost(url, parms);
  },
  //获取初始化信息（已知信息、添加字段、学历编码表、行业编码表、职业编码表、省份编码表）
  getInitInfo(parms) {
    var url = mainUrl + "profile/getInitInfo";
    return this.wxPost(url, parms);
  },
  //提交用户信息
  profileSubmit(parms) {
    var url = mainUrl + "profile/submit";
    return this.wxPost(url, parms);
  },
  //获取银行信息
  getBankList(parms) {
    var url = mainUrl + "depository/getBankList";
    return this.wxPost(url, parms);
  },
  //提交银行信息
  bankSubmit(parms) {
    var url = mainUrl + "depository/submit";
    return this.wxPost(url, parms);
  },
  //风险评估问卷
  getQuestionList(parms) {
    var url = mainUrl + "risk/getQuestionList";
    return this.wxPost(url, parms);
  },
  //提交答案，题目之间用’|’ 题目答案之间用’&’
  submitAnswer(parms) {
    var url = mainUrl + "risk/submitAnswer";
    return this.wxPost(url, parms);
  },
  //获取预开户结果
  getAuditResult(parms) {
    var url = mainUrl + "audit/getAuditResult";
    return this.wxPost(url, parms);
  },
  //获取交易快照持仓
  getAll(parms){
    var url = mainUrl2 + "position/all";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取交易快照未成交单
  getNotOrders(parms) {
    var url = mainUrl2 + "position/notorders";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取交易快照单日交易次数
  getCount(parms){
    var url = mainUrl2 + "stat/count";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取交易快照累计交易次数
  getAllCount(parms) {
    var url = mainUrl2 + "stat/allcount";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取交易快照当日手续费
  getCommission(parms) {
    var url = mainUrl2 + "stat/commission";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
  //获取交易所公告
  getExchange(parms){
    var url = mainUrl2 + "exchange/type";
    url += "?type="+parms.type+"&page="+parms.page+"&size="+parms.size
    return this.wxGet(url);
  },
  //获取期货公司公告
  getCompanyPage(parms){
    var url = mainUrl2 + "company/page";
    url += "?page=" + parms.page + "&size=" + parms.size
    return this.wxGet(url);
  },
  //获取期货公司未读公告
  notice(parms){
    var url = mainUrl2 + "company/notReadCount";
    url += "?notReadCount=" + parms.notReadCount + "&size=" + parms.size
    return this.wxPost(url);
  },
  //获取一日交易日历
  getDate(parms){
    var url = mainUrl2 + "date";
    url += "?year="+parms.year+"&month="+parms.month+"&date="+parms.day
    return this.wxGet(url);
  },
  //获取交易快照累计手续费
  getAllCommission(parms) {
    var url = mainUrl2 + "stat/allcommission";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },



  nextPost(parms) {
    console.log("参数", parms)
    var url = mainUrl + "navigation/next";
    return this.wxPost(url, parms);
  },

  //注册

  register: function (parms) {

    var url = mainUrl + "/account/oauth.do";
    return this.wxPost(url, parms);
  },


  //获取验证码
  getCode: function (parms) {
    var url = mainUrl + "/sms/send.do";
    return this.wxPost(url, parms);
  },







  //轮播图
  banner: function () {
    var url = mainUrl + "/banner/list.do";
    var parms = {
      'pageNo': 1,
      'pageSize': 10
    }
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },










  //公告列表
  gonggao: function () {
    var url = mainUrl + "/notice/list.do";
    var parms = {
      'pageNo': 1,
      'pageSize': 1
    }
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },




  //深度行情列表
  depthMarketDataList: function () {
    var url = mainUrl + "/product/depthMarketDataList.do";
    var parms = {
      'pageNo': 1,
      'pageSize': 10
    }
    url += common.getGetStr(parms);
    return this.wxGet(url);
  }






  ,
  //个人获取特别推荐产品
  groomProductList: function () {
    var url = mainUrl + "/market/groomProductList.do";
    var parms = {
      'pageNo': 1,
      'pageSize': 5
    }
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },





  //产品排行
  marketList: function (parms) {
    var url = mainUrl + "/market/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },



  //交易动态排行
  trade4Home: function (parms) {
    var url = mainUrl + "/product/trade4Home.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },







  //获取产品购买信息
  createPayOrder: function (parms) {
    var url = mainUrl + "/memberOrder/create.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },





  //获取产品介绍
  getIntroduce: function (parms) {
    var url = mainUrl + "/product/introduce.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },





  //获取合约列表
  getProductInstrumentList: function (parms) {
    var url = mainUrl + "/product/productInstrumentList.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },








  //获取盘口数据
  getlastDepthMarketData: function (parms) {
    var url = mainUrl + "/product/lastDepthMarketData.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },
















  //获取历史平仓或者当日成交 参数不同
  getTradeList: function (parms) {
    var url = mainUrl + "/product/tradeList.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },







  //获取数据统计
  getDetail: function (parms) {
    var url = mainUrl + "/product/detail.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },



  //获取产品日收益列表
  getProductyieldList: function (parms) {
    var url = mainUrl + "/productyield/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },





  //获取我的订阅
  getProductRss: function (parms) {
    var url = mainUrl + "/productRss/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },






  //获取我的关注
  getAttentionProduct: function (parms) {
    var url = mainUrl + "/attentionProduct/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },




  //获取我的订阅个人中心
  getBugLog: function (parms) {
    var url = mainUrl + "/memberOrder/bugLog.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },









  //获取持仓信息
  getProductItemList: function (parms) {
    var url = mainUrl + "/product/productItemList.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },









  //获取咨询列表
  getNewsList: function (parms) {
    var url = mainUrl + "/news/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },




  //获取支付凭证
  getPayCard: function (parms) {
    var url = mainUrl + "/pingpp/pay.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },






  //获取公告列表
  getNotice: function (parms) {
    var url = mainUrl + "/notice/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },





  //获取公告详情
  getNoticeDetail: function (parms) {
    var url = mainUrl + "/notice/detail.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },



  //获取资讯详情
  getNewsDetail: function (parms) {
    var url = mainUrl + "/news/detail.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },






  //获取直播列表
  getBrokerLive: function (parms) {
    var url = mainUrl + "/brokerLive/list.do";

    url += common.getGetStr(parms);
    return this.wxGet(url);
  },

 // 获取当前用户信息
  currentUserinfo: function (parms) {
    var url = mainUrl + "homePage/userinfo";
    url += common.getGetStr(parms);
    return this.wxGet(url);
  },









  // 创建订单，提交参数 productId 

  createOrderInfo: function (parms) {
    var url = mainUrl + "/memberOrder/createOrderInfo.do";
    url += common.getGetStr(parms);

    return this.wxGet(url);
  },






  //获取openId
  getOpenId: function () {
    //获取code
    return new Promise((resolve) => {
      wx.login({
        success: res => {
          let code = res.code;
          let url = mainUrl + 'authen/login/wechat';
          let data = {
            code: code, appid: appid, appsercet: appsecret
          };
          resolve(this.wxPost(url, data));
        }
      });
    });
  },



  connectWS: function (useid) {
    //websocket建立连接
    wx.connectSocket({
      url: webSocketUrl + useid,
    })
    // wx.connectSocket({
    //   url: webSocketUrl + "admin",
    // })
  },


  connectSuccess: function () {
    //连接成功
    return new Promise((resolve, reject) => {
      wx.onSocketOpen(function () {
        //  wx.sendSocketMessage({
        //    data: 'stock',
        //  })
        resolve();
        console.log("websocket连接成功")
      })
    })
  },

  connectFail() {

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
  },

  recieveData() {


  },


  //四舍五入
  round(num) {
    return Math.round(num * 10000) / 10000;
  },









  wxGet: function (url, showToast = false) {
  
    if (showToast) {
      wx.showLoading({
        title: '请求中',
      });
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'GET',
        data: {},
        header: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Cookie': app.globalData.storeCookie,
          'timestamp': '' + new Date().getTime()

        },
        success: function (res) {
          if (res.data && res.data.resultCode == 'AccessDenied' ) {
            // wx.reLaunch({
            //   url: '../authUser/index',
            // });
          }
          wx.hideLoading();
          resolve(res);
        }, error: function (res) {
          wx.hideLoading();
          if (reject) reject(res);
        }
      })
    });
  },
  wxPost: function (url, data,showToast=false) {
    if (showToast){
    wx.showLoading({
      title: '请求中',
    });
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: 'POST',
        data: data,
        header: {
          "Content-Type": "application/json;charset=utf-8",
          "appVersion":"1.6.4"
          
         // 'Set-Cookie': app.globalData.headercookie
        },
        success: function (res) {
          if (res.data && res.data.resultCode == 'AccessDenied') {
            // wx.reLaunch({
            //   url: '../authUser/index',
            // });
          }
          wx.hideLoading();
          resolve(res);
        }, error: function (res) {
          wx.hideLoading();
          if (reject) reject(res);
        }
      })
    });
  }
}