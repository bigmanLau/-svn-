function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), a = function() {
    function a() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(this, a), this.option = t, this.page = getCurrentPages()[getCurrentPages().length - 1], 
        this.setData = this.page.setData.bind(this.page), this._initData(), this.__bindMethods();
    }
    return n(a, [ {
        key: "_initData",
        value: function() {
            var e = this.option, n = e.name, a = e.data;
            this.setData(t({}, "" + n, a));
        }
    }, {
        key: "__bindMethods",
        value: function() {
            var e = this.option, n = e.name, a = e.methods, i = e.prefix;
            for (var r in a) this.page["" + i + r] = a[r], this.setData(t({}, n + "." + r, "" + i + r));
        }
    } ]), a;
}();

exports.default = a;