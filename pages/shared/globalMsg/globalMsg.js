function t(t) {
    this.page = t, this.prefix = "_globalMsg_", this.init();
}

getApp();

t.prototype.init = function() {
    this.initData();
}, t.prototype.initData = function() {
    var t = this.page;
    this.prefix;
    t.setData({
        globalMsg: t.data.globalMsg || ""
    }), setInterval(function() {
        t.setData({
            globalMsg: ""
        });
    }, 5e3);
}, module.exports = t;