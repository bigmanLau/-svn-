function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

// var a = e(require("../../requests/api/wechatLogin")), t = e(require("../../requests/api/updateWechatUserInfo"));

Component({
    properties: {
        label: {
            type: String,
            value: ""
        },
        afterLogin: {
            type: String,
            value: ""
        }
    },
    data: {
        wxIsLoading: !1
    },
    attached: function() {},
    methods: {
        wechatLogin: function(e) {
            wx.showLoading();
            var t = this, n = e.detail.errMsg;
            t.setData({
                wxIsLoading: !0
            }), n.includes(":ok") ? wx.login({
                success: function(e) {
                    wx.getUserInfo({
                        withCredentials: !0,
                        success: function(n) {
                            var i = n.encryptedData, o = n.iv, s = n.userInfo, c = s.avatarUrl, r = s.nickName;
                            (0, a.default)({
                                js_code: e.code,
                                encryptedData: i,
                                iv: o
                            }).then(function(e) {
                                e.avatarUrl = c, e.wxNickName = r, e.loginType = "wx", 0 == e.ret && "微信小程序授权失败" !== e.msg ? t.loginSuccessful(t, e) : (wx.hideLoading(), 
                                t.setData({
                                    wxIsLoading: !1,
                                    globalMsg: "微信授权失败，请重试"
                                }));
                            }).catch(function(e) {
                                console.log(e);
                            });
                        }
                    });
                },
                fail: function(e) {
                    wx.hideLoading(), t.setData({
                        globalMsg: e
                    });
                }
            }) : (wx.hideLoading(), t.setData({
                wxIsLoading: !1,
                globalMsg: "微信授权失败"
            }));
        },
        loginSuccessful: function(e, a) {
            wx.hideLoading(), wx.setStorage({
                key: "USER_INFO",
                data: Object.assign({}, a, {
                    isLogin: !0
                }),
                success: function() {
                    var n = e.data.afterLogin, i = getCurrentPages(), o = i[i.length - 1];
                    o.setData({
                        isLogin: !0
                    }), n && n.split(",").forEach(function(e) {
                        o[e]();
                    }), wx.showToast({
                        title: "登录成功",
                        icon: "success",
                        mask: !0,
                        duration: 1e3,
                        success: function() {
                            e.setData({
                                wxIsLoading: !1,
                                isLogin: !0
                            });
                        }
                    }), (0, t.default)({
                        id: a.openId,
                        headImage: a.avatarUrl,
                        nickName: a.wxNickName || a.nickname
                    }).then(function(e) {
                        console.log("data.avatarUrl", a.avatarUrl), console.log("data.uid", a.uid), console.log("updateWechatUserInfoRes", e);
                    });
                },
                complete: function() {}
            });
        }
    }
});