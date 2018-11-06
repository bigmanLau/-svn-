function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    this.page = e, this.init();
}

var n = e(require("../../../requests/api/getVerifyCode")), a = e(require("../../../requests/api/getLoginToken"));

getApp();

t.prototype.init = function() {
    this.appendEvents(), this.initData();
}, t.prototype.initData = function() {
    this.page;
}, t.prototype.appendEvents = function() {
    var e = this.page;
    this.prefix;
    e.closeModal = function(t) {
        e.setData({
            showModal: !1
        });
    }, e.inputVerifyCheckCode = function(t) {
        e.setData({
            checkCode: t.detail.value
        });
    }, e.inputFocus = function(t) {
        e.setData({
            isInputing: !0
        });
    }, e.inputBlur = function(t) {
        e.setData({
            isInputing: !1
        });
    }, e.sendCheckCode = function(t) {
        var i = this, s = e.data.phoneNum, o = e.data.verifyCodeRes.checkUUID;
        (0, a.default)().then(function(t) {
            var a = t.token, c = e.data.checkCode;
            (0, n.default)(s, a, c, o).then(function(t) {
                var n = t.ret;
                212 == n ? e.setData({
                    globalMsg: t.msg,
                    verifyCodeRes: t,
                    checkCode: ""
                }) : 0 == n && (e.setData({
                    showModal: !1,
                    globalMsg: t.msg,
                    isSending: !0,
                    seconds: 60
                }), clearInterval(e.verifyIntervalId), e.verifyIntervalId = setInterval(function() {
                    i.data.seconds || (clearInterval(e.verifyIntervalId), i.setData({
                        isSending: !1,
                        seconds: 60
                    })), i.setData({
                        seconds: --i.data.seconds
                    });
                }, 1e3));
            }).catch(function(e) {
                console.log(e);
            });
        });
    };
}, module.exports = t;