function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../component"));

exports.default = function(n) {
    var i = n.data.list.length, s = 100 / i + "%";
    wx.getSystemInfo({
        success: function(t) {
            s = t.windowWidth / i;
        }
    });
    var r = s * n.data.index;
    return new a.default({
        name: "Tab",
        prefix: "_Tab_",
        data: e({}, n.data, {
            length: i,
            offsetLeft: r,
            width: s
        }),
        methods: {
            switch: function(t) {
                var e = t.target.dataset.index, a = 0;
                this.data.Tab.index !== e && (a = s * e, this.setData({
                    Tab: Object.assign(this.data.Tab, {
                        index: e,
                        offsetLeft: a
                    })
                }), "function" == typeof n.callback && n.callback(e));
            },
            updateTab: function(e) {
                var a = Object.assign(this.data.Tab, {
                    list: e
                });
                this.setData(t({}, "Tab", a));
            },
            setIndex: function(e) {
                var a = Object.assign(this.data.Tab, {
                    index: e,
                    offsetLeft: r = s * e
                });
                this.setData(t({}, "Tab", a));
            }
        }
    });
};