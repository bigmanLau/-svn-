function t(t) {
    this.page = t, this.prefix = "_player_", this.init();
}

var a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../actionSheet/actionSheet")), e = getApp(), n = require("../../../utils/util.js");

t.prototype.init = function() {
    this.wrapFns(), this.appendEvents(), this.bindEvents(), this.initData();
}, t.prototype.initData = function() {
    var t = this.page, n = e.player, r = this.prefix, o = n.getData();
    t.ActionSheet = new a.default(t), n.soundId ? n.getSound(n.soundId, function(a, e) {
        t.setData({
            player: Object.assign({
                hidden: !0,
                tapNextBtn: r + "tapNextBtn",
                tapPrevBtn: r + "tapPrevBtn",
                tapPlayBtn: r + "tapPlayBtn",
                tapPauseBtn: r + "tapPauseBtn",
                tapPlaylistBtn: r + "tapPlaylistBtn",
                tapHistoryBtn: r + "tapHistoryBtn",
                tapSeekBar: r + "tapSeekBar",
                touchstartHandler: r + "touchstartHandler",
                touchendHandler: r + "touchendHandler",
                touchmoveHandler: r + "touchmoveHandler",
                tapSoundBlock: r + "tapSoundBlock"
            }, o)
        });
    }) : t.setData({
        player: Object.assign({
            hidden: !0,
            tapNextBtn: r + "tapNextBtn",
            tapPrevBtn: r + "tapPrevBtn",
            tapPlayBtn: r + "tapPlayBtn",
            tapPauseBtn: r + "tapPauseBtn",
            tapPlaylistBtn: r + "tapPlaylistBtn",
            tapHistoryBtn: r + "tapHistoryBtn",
            tapSeekBar: r + "tapSeekBar",
            touchstartHandler: r + "touchstartHandler",
            touchendHandler: r + "touchendHandler",
            touchmoveHandler: r + "touchmoveHandler",
            tapSoundBlock: r + "tapSoundBlock"
        }, o)
    });
}, t.prototype.wrapFns = function() {
    var t = this, a = this.page;
    n.wrapFn(a, "onHide", function() {
        a.setData({
            "player.hidden": !0
        });
    }), n.wrapFn(a, "onShow", function() {
        a.setData({
            "player.hidden": !1
        });
    }), n.wrapFn(a, "onUnload", function() {
        a.setData({
            "player.hidden": !0
        }), t.unBindEvents();
    });
}, t.prototype.appendEvents = function() {
    var t = this.page, a = this.prefix, r = e.player;
    t[a + "tapPrevBtn"] = function() {
        r.prev();
    }, t[a + "tapNextBtn"] = function() {
        r.next();
    }, t[a + "tapPlayBtn"] = function() {
        r.play(), wx.reportAnalytics("play_sound", {
            play_sound_souce: "底部播放锚点"
        });
    }, t[a + "tapPauseBtn"] = function() {
        r.pause();
    }, t[a + "tapHistoryBtn"] = function(a) {
        !1 !== t.tapHistoryBtn && n.jumpTo({
            url: "../historyList/historyList"
        });
    }, t[a + "tapPlaylistBtn"] = function(a) {
        var e = wx.getStorageSync("player_last_playlist_sounds");
        t.setData({
            actionSheet: {
                playList: e,
                showActionSheet: !0
            }
        });
    }, t[a + "tapSeekBar"] = function(a) {
        if (t.data.player.state.paused) r.play(); else if (t.data.playSliderInfo) {
            var e = t.data.playSliderInfo, n = e.width, o = e.left, i = (a.touches[0].clientX - o) / n;
            i > 1 ? i = 1 : i < 0 && (i = 0);
            var p = i * t.data.player.sound.duration;
            r.seek(p);
        }
    }, t[a + "touchmoveHandler"] = function(a) {
        if (!t.data.player.state.paused && t.data.player.playerCtrlHolded && t.data.playSliderInfo) {
            var e = t.data.playSliderInfo, n = e.width, r = e.left, o = (a.touches[0].clientX - r) / n;
            o > 1 ? o = 1 : o < 0 && (o = 0);
            var i = o * t.data.player.sound.duration;
            t.setData({
                currentPosition: i
            });
        }
    }, t[a + "touchstartHandler"] = function(a) {
        t.data.player.state.paused || t.setData({
            "player.playerCtrlHolded": !0
        });
    }, t[a + "touchendHandler"] = function(a) {
        t.data.player.state.paused || (t.setData({
            "player.playerCtrlHolded": !1
        }), r.seek(t.data.currentPosition));
    }, t[a + "tapSoundBlock"] = function(t) {
        var a = t.currentTarget.dataset.trackId, e = wx.getStorageSync("USER_INFO").isLogin || !1;
        n.jumpTo({
            url: "/pages/soundPage/soundPage?trackId=" + a + "&isLogin=" + e
        });
    }, t[a + "playerStateChange"] = function(a) {
        t.setData({
            "player.state": a
        });
    }, t[a + "playerFocusId"] = function(a) {
        t.setData({
            "player.playerFocusId": a
        });
    }, t[a + "soundchange"] = function(a) {
        var e = wx.getStorageSync("player_history_playlist") || [];
        (e = e.filter(function(t) {
            return t.albumId !== a.albumId;
        })).unshift(a), wx.setStorage({
            key: "player_history_playlist",
            data: e
        }), t.setData({
            "player.sound": a
        });
    }, t[a + "inStart"] = function(a) {
        t.setData({
            "player.inStart": a
        });
    }, t[a + "inEnd"] = function(a) {
        t.setData({
            "player.inEnd": a
        });
    }, t[a + "playlistChange"] = function(a, e) {
        t.setData({
            "player.playlist": a,
            actionSheet: {
                playlist: e
            }
        });
    };
}, t.prototype.unBindEvents = function() {
    var t = this.page, a = e.player, n = this.prefix;
    a.removeListener("playerStateChange", t[n + "playerStateChange"]), a.removeListener("playerFocusId", t[n + "playerFocusId"]), 
    a.removeListener("soundchange", t[n + "soundchange"]), a.removeListener("inEnd", t[n + "inEnd"]), 
    a.removeListener("inStart", t[n + "inStart"]), a.removeListener("playlistChange", t[n + "playlistChange"]);
}, t.prototype.bindEvents = function() {
    var t = this.page, a = e.player, n = this.prefix;
    a.on("playerStateChange", t[n + "playerStateChange"]), a.on("playerFocusId", t[n + "playerFocusId"]), 
    a.on("soundchange", t[n + "soundchange"]), a.on("inEnd", t[n + "inEnd"]), a.on("inStart", t[n + "inStart"]), 
    a.on("playlistChange", t[n + "playlistChange"]);
}, module.exports = t;