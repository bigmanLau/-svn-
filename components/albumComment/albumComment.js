String.prototype.padEnd || (String.prototype.padEnd = function(t, e) {
    return t >>= 0, e = String(e || " "), this.length > t ? String(this) : ((t -= this.length) > e.length && (e += e.repeat(t / e.length)), 
    String(this) + e.slice(0, t));
}), Component({
    properties: {
        comment: {
            type: Object,
            value: null
        }
    },
    data: {
        scoreWidth: 0,
        scoreStr: "",
        scoreNum: 0
    },
    attached: function() {
        this.data.comment;
        var t = this.data.comment.score, e = Math.ceil(t);
        this.setData({
            scoreStr: t.toString().padEnd(3, ".0"),
            scoreNum: e
        });
    },
    methods: {
        parseURL: function(t) {
            return t.includes("null", -1) ? "" : t.includes("http") ? t : "http" + t;
        }
    }
});