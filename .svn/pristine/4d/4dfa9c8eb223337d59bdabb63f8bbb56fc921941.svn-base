const wxAPI = require('wxAPI.js');
module.exports = {
  //拼接请求地址
   miniapps_id:null,
   getGetStr:function (parms) {
    // parms.miniapps_id = this.miniapps_id;
    let str = "?",first=true;
    for(let key in parms){
      if (first){
        str+=key+"="+parms[key];
        first = !first;
      }else{
        str += "&" + key + "=" + parms[key];
      }
    }
    return str;
  },
  //获取openid失败
  getOpenidFailed:function(title){
    wxAPI.showModal({
      title: title||"获取openid失败，3秒后退出",
      showCancel: false,
      success: res => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
    let intval = setTimeout(() => {
      wx.navigateBack(intval);
      clearTimeout();
    }, 3 * 1000);
  }
}