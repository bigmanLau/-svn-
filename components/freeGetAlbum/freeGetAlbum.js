var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, t = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        },
        noBorderBottom: {
            type: Boolean,
            value: !1
        },
        showMine: {
            type: Boolean,
            value: !1
        },
        isIndex: {
            type: Boolean,
            value: !1
        },
        indexReport: {
            type: Boolean,
            value: !1
        },
        isSucceed: {
            type: Boolean,
            value: !1
        },
        isFailed: {
            type: Boolean,
            value: !1
        },
        isOutOfNumber: {
            type: Boolean,
            value: !1
        },
        listIndex: {
            type: String,
            value: "-1"
        }
    },
    data: {
        isIOS: "ios" == wx.getSystemInfoSync().platform || "devtools" == wx.getSystemInfoSync().platform
    },
    attached: function() {
        this.countDown();
    },
    methods: {
        moduleClickReport: function(e) {
            wx.reportAnalytics("index_modules_click", {
                module_name: e
            });
        },
        toAlbumDetail: function(e) {
            var a = this.data, i = a.indexReport, o = a.listIndex, n = e.currentTarget.dataset, l = n.albumId, r = n.price, u = n.assistanceNumber;
            i ? (wx.reportAnalytics("shouyezhuli", {
                list_index: o,
                album_id: l
            }), this.moduleClickReport("免费领")) : wx.reportAnalytics("zhuli", {
                album_id: l,
                price: r,
                assistance_number: u
            }), (0, t.jumpTo)({
                url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + l + "&isAssistant=1&ispaid=1"
            });
        },
        checkDetail: function(t) {
            var a = e({}, t.currentTarget.dataset);
            this.triggerEvent("check", a);
        },
        keepShare: function(t) {
            var a = e({}, t.currentTarget.dataset);
            this.triggerEvent("share", a);
        },
        countDown: function() {
            var e = this, t = e.data, a = t.isFailed, i = t.isSucceed, o = t.isOutOfNumber;
            if (!(a || i || o)) {
                var n = e.data.album, l = n.leftTime, r = n.isInvalid;
                r || void 0 === r || (l -= 100, e.setData({
                    "album.leftTimeStr": e.millisecondToStr(l),
                    "album.leftTime": l
                }), l > 0 ? setTimeout(function() {
                    e.countDown();
                }, 100) : e.setData({
                    "album.isInvalid": !1
                }));
            }
        },
        millisecondToStr: function(e) {
            var t;
            if ((e /= 1e3) > -1) {
                var a = Math.floor(e / 3600), i = Math.floor(e / 60) % 60, o = e % 60;
                t = a < 10 ? "0" + a + ":" : a + ":", i < 10 && (t += "0"), t += i + ":", o < 10 && (t += "0"), 
                t += o.toFixed(1);
            }
            return t;
        }
    }
});