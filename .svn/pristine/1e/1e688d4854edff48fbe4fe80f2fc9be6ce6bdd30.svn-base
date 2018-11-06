module.exports = {
    switchTab:function(url){
        wx.switchTab({
            url: url
        })
    },
    navigateTo:function(url){
        wx.navigateTo({
            url: url
        })
    },
    redirectTo:function(url){
        wx.redirectTo({
            url: url
        })
    },
    reLaunch:function(url){
        wx.reLaunch({
            url: url
        })
    },
    showLoading:function(obj){
        return new Promise((resolve,reject)=>{
            wx.showLoading({ 
                title:obj&&obj.title||"正在加载数据...",
                mask:true,
                success:(e)=>{
                    resolve(e);
                },
                fail:(e)=>{
                    wx.hideLoading();
                }
            });
        });
    },
    showModal:function(obj){
        wx.showModal({
            title:obj.title||"请求失败！",
            content:obj.content||"",
            showCancel:obj.showCancel||false,
            cancelText:obj.cancelText||"",
            cancelColor:obj.cancelColor||"#000",
            confirmText:obj.confirmText||"返回",
            confirmColor:obj.confirmColor||"#000",
            success:(res)=>{
                if(obj.success)obj.success(res);
            },
            fail:()=>{
                if(obj.fail)obj.success();
            }
        });
    },
    showToast:function(obj){
      if (typeof (obj)==="undefined")obj={};
      wx.showToast({
        title: obj.title||"亲~没有数据了"
      })
    }
}