function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

// var t = n(require("../../requests/api/getSignInInfo")), i = n(require("../../requests/api/signIn")), o = require("../../utils/util");

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        continuousSignInCount: 0,
        todaySignIn: !1,
        signing: !1
    },
    attached: function() {
        this.getSignInInfo();
    },
    methods: {
        switchShow: function() {
            this.setData({
                show: !this.data.show
            }), this.data.show ? wx.reportAnalytics("signin_img", {}) : this.setData({
                signing: !1
            });
        },
        signIn: function() {
            var n = this, t = this.data, o = t.signing, s = t.continuousSignInCount;
            o || (this.setData({
                signing: !0
            }), (0, i.default)().then(function(t) {
                1 == t.ret && (wx.showToast({
                    title: "签到成功",
                    icon: "success"
                }), n.setData({
                    continuousSignInCount: s + 1,
                    todaySignIn: !0,
                    signing: !1
                }));
            }).catch(function(t) {
                n.setData({
                    signing: !1
                }), console.log(t);
            }), wx.reportAnalytics("signin", {}));
        },
        getSignInInfo: function() {
            var n = this;
            (0, t.default)().then(function(t) {
                console.log("getSignInInfo", t);
                t.ret;
                var i = t.data, o = i.continuousSignInCount, s = void 0 === o ? 0 : o, a = i.todaySignIn, e = void 0 !== a && a;
                n.setData({
                    continuousSignInCount: s,
                    todaySignIn: e,
                    signing: !1
                }), e || n.setData({
                    show: !0
                });
            }).catch(function(t) {
                n.setData({
                    signing: !1
                }), console.log(t);
            });
        },
        toPaidRank: function(n) {
            this.switchShow(), (0, o.jumpTo)({
                url: "/pages/paidRank/paidRank"
            }), wx.reportAnalytics("topaidranklaftersignin", {});
        },
        nothing: function() {}
    }
});