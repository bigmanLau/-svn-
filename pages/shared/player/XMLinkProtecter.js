function r(r) {
    if (!r) return "";
    var e, t, n, o, i, a = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1 ];
    for (o = (r = r.toString()).length, n = 0, i = ""; n < o; ) {
        do {
            e = a[255 & r.charCodeAt(n++)];
        } while (n < o && -1 == e);
        if (-1 == e) break;
        do {
            t = a[255 & r.charCodeAt(n++)];
        } while (n < o && -1 == t);
        if (-1 == t) break;
        i += String.fromCharCode(e << 2 | (48 & t) >> 4);
        do {
            if (61 == (e = 255 & r.charCodeAt(n++))) return i;
            e = a[e];
        } while (n < o && -1 == e);
        if (-1 == e) break;
        i += String.fromCharCode((15 & t) << 4 | (60 & e) >> 2);
        do {
            if (61 == (t = 255 & r.charCodeAt(n++))) return i;
            t = a[t];
        } while (n < o && -1 == t);
        if (-1 == t) break;
        i += String.fromCharCode((3 & e) << 6 | t);
    }
    return i;
}

function e(r, e) {
    for (var t, n = [], o = 0, i = "", a = 0; a < 256; a++) n[a] = a;
    for (a = 0; a < 256; a++) o = (o + n[a] + r.charCodeAt(a % r.length)) % 256, t = n[a], 
    n[a] = n[o], n[o] = t;
    for (var d = o = a = 0; d < e.length; d++) o = (o + n[a = (a + 1) % 256]) % 256, 
    t = n[a], n[a] = n[o], n[o] = t, i += String.fromCharCode(e.charCodeAt(d) ^ n[(n[a] + n[o]) % 256]);
    return i;
}

function t(r, e) {
    for (var t = [], n = 0; n < r.length; n++) {
        for (var o = 0, o = r[n] >= "a" && r[n] <= "z" ? r[n].charCodeAt(0) - 97 : r[n] - 0 + 26, i = 0; i < 36; i++) if (e[i] == o) {
            o = i;
            break;
        }
        t[n] = o > 25 ? o - 26 : String.fromCharCode(o + 97);
    }
    return t.join("");
}

function n(r) {
    this._randomSeed = r, this.cg_hun();
}

function o() {}

!function(r) {
    r && r.__esModule;
}(require("../../../utils/es6-promise.min"));

var i = require("../../../constants/constants");

n.prototype = {
    cg_hun: function() {
        this._cgStr = "";
        var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890", e = r.length, t = 0;
        for (t = 0; t < e; t++) {
            var n = this.ran() * r.length, o = parseInt(n);
            this._cgStr += r.charAt(o), r = r.split(r.charAt(o)).join("");
        }
    },
    cg_fun: function(r) {
        var r = r.split("*"), e = "", t = 0;
        for (t = 0; t < r.length - 1; t++) e += this._cgStr.charAt(r[t]);
        return e;
    },
    ran: function() {
        return this._randomSeed = (211 * this._randomSeed + 30031) % 65536, this._randomSeed / 65536;
    },
    cg_decode: function(r) {
        var e = "", t = 0;
        for (t = 0; t < r.length; t++) {
            var n = r.charAt(t), o = this._cgStr.indexOf(n);
            -1 !== o && (e += o + "*");
        }
        return e;
    }
}, o.prototype.query = function(o, a, d) {
    var c = wx.getStorageSync("USER_INFO"), f = c.uid, h = void 0 === f ? 0 : f, u = c.token, s = void 0 === u ? "" : u, l = c.realUid, g = void 0 === l ? 0 : l;
    0 == h && (h = g);
    var m = {
        uid: h,
        token: s,
        device: "pc"
    };
    wx.request({
        url: "https://mpay.ximalaya.com/mobile/track/pay/" + o.id,
        data: m,
        header: {
            "content-type": "application/x-www-form-urlencoded",
            cookie: i.TOKEN_ID + "&_token=" + h + "&" + s
        },
        method: "GET",
        success: function(i) {
            if (m = i.data, o.linkData = m, m.ret) d(m); else {
                var c = e(t("dg3utf1k6yxdwi09", [ 19, 1, 4, 7, 30, 14, 28, 8, 24, 17, 6, 35, 34, 16, 9, 10, 13, 22, 32, 29, 31, 21, 18, 3, 2, 23, 25, 27, 11, 20, 5, 15, 12, 0, 33, 26 ]), r(m.ep)).split("-"), f = new n(m.seed).cg_fun(m.fileId), h = c[1], u = c[0], s = c[2], l = c[3], g = m.duration;
                f = "/" === f[0] ? f : "/" + f;
                var p = m.domain + "/download/" + m.apiVersion + f + "?sign=" + encodeURIComponent(h) + "&buy_key=" + encodeURIComponent(u) + "&timestamp=" + l + "&token=" + encodeURIComponent(s) + "&duration=" + g;
                o.src = p, a(o);
            }
        },
        fail: function(r) {
            d(r);
        }
    });
}, module.exports = o;