/**
 * 微信请求封装,支持回调函数
 */
//GET 请求方式
var app = getApp();
var mainUrl = app.globalData.mainUrl;
var appid = app.globalData.appid;
var appsecret = app.globalData.appsecret;
function wxGet(url) {
    return new Promise((resolve, reject)=>{
         wx.request({
           url: url,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function (res) {
                resolve(res);
            }, error: function (res) {
                reject(res);
            }
        })
    });
}
//POST请求方式
function wxPost(url, data){
    return new Promise((resolve, reject)=>{
        wx.request({
            url: url,
            method: 'POST',
            data: data,
            header: {
                 'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                resolve(res);
            }, error: function (res) {
                reject(res);
            }
        })
    });
}

function wxGet2(url, successCallback, errorCallback) {
  wx.request({
    url: url,
    method: 'GET',
    data: {},
    header: {
      'Accept': 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      successCallback(res);

    }, error: function () {
      errorCallback();
    }
  })
}
//POST请求方式
function wxPost2(url, data, successCallback, errorCallback) {
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Accept': 'application/json'
    },
    success: function (res) {
      successCallback(res);
    }, error: function () {
      errorCallback();
    }
  })
}

function getOpenId() {
  let appid = app.globalData.appid;
  let secret = app.globalData.appsecret;
  return new Promise((resolve, reject) => {
    //获取code
    wx.login({
      success: (res) => {
        let code = res.code;
        let url = mainUrl + '/base/get_openid?appid=' + appid + '&appsercet=' + appsecret + '&code=' + code;
        wxGet2(url, resolve, reject);
      }
    });

  });
}
function test(){
  var fun = {
    fun1:function(){
      //this = fun;
      var that =this;
      function fun2(){
        //this
      }
      fun2().call(this);

      fun3=>{
        //this
      }
    }
  };
}
function doLogin(){
  //this
  let appid = app.globalData.appid;
  let secret = app.globalData.appsecret;
  return new Promise((resolve) => {
    //获取code
    wx.login({
      success: res=> {
        let code = res.code;
        console.log("===>login code===="+code) 
        let url = mainUrl + '/authen/oauth.do?appid=' + appid + '&appsercet=' + appsecret + '&code=' + code;
        console.log(123);
        //return wxGet(url);
        resolve(wxGet(url));
      }
    });

  });
}
function register(){
  let appid = app.globalData.appid;
  let secret = app.globalData.appsecret;
  return new Promise((resolve, reject) => {
    //获取code
    wx.login({
      success: (res) => {
        let code = res.code;
        console.log("===>register code====" + code) 
        let url = mainUrl + '/account/oauth.do?appid=' + appid + '&appsercet=' + appsecret + '&code=' + code + '&invitationCode=888888' ;
        wxGet2(url, resolve, reject);
      }
    });

  });
}

//配置该方法才能被外部引用
module.exports = {
  wxPost: wxPost,
  wxGet: wxGet,
  getOpenId: getOpenId,
  doLogin:doLogin,
  register: register
}