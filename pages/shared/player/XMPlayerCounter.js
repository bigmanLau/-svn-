function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    for (var e = 0, r = 0, n = t.length; r < n; r++) {
        var o = t[r], u = o.t;
        if (1 === o.s) {
            var a = t[r + 1];
            a && (e += a.t - u);
        }
    }
    return e / 1e3;
}

function r(t) {
    this.player = t;
}

var n = t(require("../../../requests/api/countPlayNumber")), o = t(require("../../../requests/api/countPlayInfo")), u = {};

r.prototype = {
    record: function(t, e, r) {
        var n = u[t] || [], o = {
            t: Date.now(),
            s: e,
            p: r || 0
        };
        n.push(o), u[t] = n;
    },
    countPlayNumber: function(t) {
        if (t) {
            console.log("播放次数统计：" + t);
            (0, n.default)({
                trackId: t
            });
        }
    },
    countPlayInfo: function(t) {
        var r = t.albumId, n = t.trackId;
        if (n) {
            var a = u[n], l = e(a), c = {
                trackId: n,
                albumId: r,
                startedAt: a[0].t,
                endedAt: a[a.length - 1].t,
                duration: l,
                breakSecond: a[a.length - 1].p
            };
            u[n] = [], console.log("播放信息统计：" + n), (0, o.default)(c);
        }
    }
}, module.exports = r;