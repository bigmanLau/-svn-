function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    this.page = e, this.prefix = "_actionSheet_", this.init();
}

e(require("../../../requests/api/getPaidAlbum")), e(require("../../../requests/api/getPaidAlbumTrack")), 
e(require("../../../requests/api/getAlbumTrack")), e(require("../../../requests/api/getPlayPage")), 
e(require("../../../requests/api/getAlbumBoughtStatus")), e(require("../tab/tab")), 
e(require("../../../requests/api/getAlbum")), e(require("../../../requests/api/getTrackBoughtStatus"));

var a = getApp();

t.prototype.init = function() {
    this.appendEvents(), this.initData();
}, t.prototype.initData = function() {
    var e = this.page, t = (this.prefix, wx.getStorageSync("player_last_playlist_sounds"));
    e.setData({
        actionSheet: {
            playList: t,
            showActionSheet: !1
        }
    });
}, t.prototype.appendEvents = function() {
    var e = this.page;
    this.prefix;
    e.sheetCancel = function(t) {
        e.data.actionSheet.showActionSheet = !1, e.setData({
            actionSheet: e.data.actionSheet
        });
    }, e.playTrack = function(e) {
        a.player.pause();
        var t = e.currentTarget.dataset.trackId;
        a.player.play(t);
    }, e.pauseTrack = function(e) {
        a.player.pause();
    }, e.toggleTrack = function(t) {
        if (e.data.player.state.paused) {
            console.log("page.data.player.state", e.data.player.state);
            var r = t.currentTarget.dataset.trackId;
            a.player.play(r);
        } else a.player.pause();
    }, e.onTouchMove = function(e) {
        return !1;
    }, e.onActionSheetReachBottom = function(e) {};
}, module.exports = t;