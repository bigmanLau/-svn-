function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    this.audioManager = {}, this.sounds = {}, this.soundId = "", this.playerFocusId = "", 
    this.playlist = [], this.notSample = !1, this.canPlay = !0, this.audioManager = wx.getBackgroundAudioManager(), 
    this.closeTime = 0, this.closeFlag = !1, this.state = {
        paused: !0
    }, this.sound = {}, this.options = {
        getPlayerStateStep: 1e3
    }, this.playerCounter = new r(this), this.linkProtect = new l(), Object.assign(this.options, t), 
    this.bindEvents(), this.initLast();
}

var a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, n = require("../../../utils/util"), s = t(require("../../../requests/api/getBaseInfo")), i = t(require("../../../requests/api/getPlaylist")), o = require("../../../utils/EventEmitter.js"), r = require("./XMPlayerCounter.js"), l = require("./XMLinkProtecter.js");

getApp();

e.prototype = {
    initLast: function() {
        try {
            var t = wx.getStorageSync("player_last_playlist_sounds"), e = wx.getStorageSync("player_last_playlist"), a = wx.getStorageSync("player_last_sound");
            t && this.cacheSounds(t), this.playlist = e || [], a && (a.id && e && t ? (this.soundId = a.id, 
            this.playerFocusId = a.id, this.sound = a, this.cacheSounds([ a ]), this.select(a.id)) : (wx.removeStorageSync("player_last_sound"), 
            wx.removeStorageSync("player_last_playlist"), wx.removeStorageSync("player_last_playlist_sounds")));
        } catch (t) {
            wx.clearStorage();
        }
    },
    getData: function() {
        return {
            soundId: this.soundId,
            playerFocusId: this.playerFocusId,
            state: this.state,
            playlist: this.playlist,
            sound: this.sound
        };
    },
    setSounds: function(t) {
        this.sounds = t;
    },
    cacheSounds: function(t) {
        for (var e = 0; e < t.length; e++) {
            var n = t[e];
            n = this.parseSound(n), this.sounds[n.id] = a({}, this.sounds[n.id] || {}, n);
        }
    },
    setSound: function(t) {
        this.sounds[t.id] = t;
    },
    getSound: function(t, e) {
        var n = this, i = this, o = i.sounds[t];
        wx.showLoading({
            mask: !0,
            title: "加载中 ..."
        }), o && o.src && o.albumTitle ? (e(null, o), wx.hideLoading()) : (0, s.default)(t).then(function(s, r) {
            if (-1 !== s.ret) {
                var l = i.parseSound(s);
                if (o = i.sounds[t] = a({}, o, l), l.isPay || l.isPaid) {
                    try {
                        n.linkProtect.query(o, function(t) {
                            e(null, t);
                        }, function(t) {});
                    } catch (t) {
                        console.log(t);
                    }
                    wx.hideLoading();
                } else e(null, l), wx.hideLoading();
            } else wx.hideLoading();
        }).catch(function(t) {
            e("网络异常，请稍后再试"), wx.hideLoading();
        });
    },
    availablePlayUrl: function(t) {
        return t.playPathAacv164 || t.playPathAacv224 || t.playUrl32 || t.playUrl64 || t.play_url_24_m4a || t.play_url_32 || t.play_url_64 || t.play_url_64_m4a || t.play_url_amr || t.playUrl24M4a || t.playUrl64M4a || t.playUrlAmr || "";
    },
    parseSound: function(t) {
        return Object.assign({}, t, {
            id: t.trackId || t.id,
            isPay: void 0 !== t.isPaid && !!t.isPaid || !!t.is_paid,
            src: this.availablePlayUrl(t)
        });
    },
    getIndex: function(t) {
        return this.playlist.indexOf(t);
    },
    select: function(t, e) {
        var a = this, s = a.sounds[t] || {}, i = s.is_free, o = s.isFree, r = s.track_bought_status, l = s.trackBoughtStatus, u = s.isPay, d = s.is_paid, c = (s.isPaid, 
        s.sample_duration, s.sampleDuration), h = s.unlocked;
        if (console.log("sound", s), a.canPlay = !u || r || l || i && h || o && h || h || !1, 
        0 == c && !i && !r && d) return a.notSample = !0, a.soundId = t, a.stop(), s.isFree = s.is_free, 
        s.calcPlaytimes = (0, n.numToString)(s.playtimes), s.calcDuration = (0, n.formatDuration)(s.duration), 
        s.albumTitle = s.album_title, s.albumId = s.albumId, s.albumImage = s.cover_url_small, 
        s.coverLarge = s.cover_url_large, s.title = s.track_title, a.sound = s, a.playerFocusId = t, 
        a.emit("playerFocusId", t), void a.emit("soundchange", s);
        var p = this.playerCounter;
        if (e = e || function() {}, a.sound = s, a.emit("playerFocusId", t), this.playerFocusId = t, 
        this.soundId != t) {
            var y = this.sounds[this.soundId];
            a.emit("soundchange2", y);
            var g = a.audioManager;
            if (!g.paused) if (a.noNeedCountPlayInfo) a.noNeedCountPlayInfo = !1; else try {
                p.record(a.soundId, 2, g.currentTime), p.countPlayInfo(a.sound || {});
            } catch (t) {
                console.log(t);
            }
            a.getSound(t, function(s, i) {
                s ? e(s) : (a.soundId = t, a.sound = i, i.calcPlaytimes = (0, n.numToString)(i.playtimes), 
                i.calcDuration = (0, n.formatDuration)(i.duration), wx.setStorageSync("player_last_sound", i), 
                a.sound.albumId != wx.getStorageSync("player_last_album").albumId && wx.setStorageSync("player_last_album", {
                    albumId: i.albumId,
                    priceTypeEnum: i.priceTypeEnum
                }), a.emit("soundchange", i), e(null, i));
            });
        } else e(null, this.sounds[t]);
    },
    selectPrev: function(t) {
        var e = this.getIndex(this.soundId), a = e > 0 ? e - 1 : this.playlist.length - 1, n = this.playlist[a];
        this.select(n, t);
    },
    selectNext: function(t) {
        var e = this.getIndex(this.soundId), a = e < this.playlist.length - 1 ? e + 1 : 0, n = this.playlist[a];
        this.select(n, t);
    },
    parseSoundToAudio: function(t) {
        return Object.assign({}, t, {
            dataUrl: t.src,
            title: t.title,
            coverImgUrl: t.coverLarge || t.coverMiddle || t.coverSmall || "https://img.alicdn.com/imgextra/i2/732450928/TB22yXCbipnpuFjSZFIXXXh2VXa_!!732450928.png",
            success: function() {}
        });
    },
    play: function(t) {
        var e = this;
        t = t || this.soundId, this.select(t, function(t, a) {
            e._play(a);
        });
    },
    prev: function() {
        var t = this, e = this.soundId;
        if (t.pause(), this.inStart(e)) {
            var a = this.sounds[e];
            (0, i.default)(a.albumId, a.trackId, !1).then(function(a) {
                for (var n = a.data, s = [], i = 0; i < n.length; i++) {
                    var o = n[i];
                    s.push(o.trackId);
                }
                t.cacheSounds(n), t.prependPlaylist(s), t.inStart(e) ? t.emit("inStart", !0, e) : (t.emit("inEnd", !1, e), 
                t.selectPrev(function(e, a) {
                    t._play(a);
                }));
            });
        } else t.emit("inEnd", !1, e), this.selectPrev(function(e, a) {
            t._play(a);
        });
    },
    next: function() {
        var t = this;
        this.more(function() {
            t.pause(), t.selectNext(function(e, a) {
                t._play(a);
            });
        });
    },
    _play: function(t) {
        var e = this, a = e.audioManager;
        try {
            if (e.canPlay) if (a.src !== t.src) {
                var n = e.parseSoundToAudio(t), s = n.dataUrl, i = n.title, o = n.coverImgUrl, r = n.albumTitle, l = n.nickname, u = n.trackId;
                a.title = i, a.epname = r || "", a.singer = l || "", a.coverImgUrl = o, a.src = s, 
                a.webUrl = "http://m.ximalaya.com/share/sound/" + u;
            } else a.play(); else e.stop();
        } catch (t) {
            console.log("_play_error", t);
        }
    },
    more: function(t) {
        var e = this, a = this.soundId;
        if (this.inEnd(a)) {
            var n = this.sounds[a];
            (0, i.default)(n.albumId, n.trackId, !0).then(function(n) {
                for (var s = n.data, i = [], o = 0; o < s.length; o++) {
                    var r = s[o];
                    i.push(r.trackId);
                }
                e.cacheSounds(s), e.appendPlaylist(i), e.inEnd(a) ? e.emit("inEnd", !0, a) : (e.emit("inStart", !1, a), 
                t && t());
            });
        } else this.emit("inStart", !1, a), t && t();
    },
    inStart: function(t) {
        return 0 === this.playlist.indexOf(t);
    },
    inEnd: function(t) {
        return this.playlist.indexOf(t) === this.playlist.length - 1;
    },
    seek: function(t) {
        try {
            this.audioManager.seek(t);
        } catch (t) {}
    },
    stop: function() {
        var t = this;
        try {
            t.audioManager.stop(), t.emit("stop", t.soundId), t.emit("playerStateChange", t.getState());
        } catch (t) {
            console.log("stopErr", t);
        }
    },
    pause: function() {
        try {
            this.audioManager.pause(), self.emit("pause", self.soundId), self.emit("playerStateChange", self.getState());
        } catch (t) {}
    },
    getSounds: function(t) {
        for (var e = [], a = 0; a < t.length; a++) {
            var n = t[a], s = this.sounds[n];
            e.push(s);
        }
        return e;
    },
    setPlaylist: function(t) {
        var e = this.getSounds(t);
        this.playlist = t, wx.setStorage({
            key: "player_last_playlist",
            data: t
        }), wx.setStorage({
            key: "player_last_playlist_sounds",
            data: e
        }), this.emit("playlistChange", t, e);
    },
    prependPlaylist: function(t) {
        for (var e = this.playlist, a = 0; a < t.length; a++) {
            var n = t[a];
            -1 === e.indexOf(n) && e.unshift(n);
        }
        this.setPlaylist(e);
    },
    appendPlaylist: function(t) {
        for (var e = this.playlist, a = 0; a < t.length; a++) {
            var n = t[a];
            -1 === e.indexOf(n) && e.push(n);
        }
        this.setPlaylist(e);
    },
    getPlaylist: function() {
        return this.playlist;
    },
    getState: function() {
        var t = this.audioManager, e = {
            duration: t.duration,
            currentPosition: t.currentTime,
            paused: t.paused,
            src: t.src,
            startTime: t.startTime,
            buffered: t.buffered,
            title: t.title,
            epname: t.epname,
            singer: t.singer,
            coverImgUrl: t.coverImgUrl,
            webUrl: t.webUrl
        };
        return e.calcCurrentPosition = (0, n.formatDuration)(e.currentPosition || 0), e;
    },
    bindEvents: function() {
        var t, e = this, a = this.playerCounter, s = this.audioManager;
        s.timerRun = (0, n.debounce)(function() {
            return console.log("timerRun"), !!(+new Date() - e.closeTime >= 0 && e.closeFlag) && (e.pause(), 
            e.closeFlag = !1, console.log("timerRun_succ"), !0);
        }, 6e4), s.onPlay(function() {
            e.emit("play", e.soundId), e.emit("playerStateChange", e.getState()), t !== e.soundId && (t = e.soundId, 
            a.record(e.soundId, 1, 0), a.countPlayNumber(e.soundId));
        }), s.onPause(function() {
            console.log("audioManager.onPause");
            var t = e.soundId;
            e.emit("pause", e.soundId), e.emit("playerStateChange", e.getState());
            var n = s.currentTime;
            try {
                a.record(t, 0, n);
            } catch (t) {
                console.log(t);
            }
        }), s.onEnded(function() {
            if (!s.timerRun()) {
                var t = e.soundId;
                e.noNeedCountPlayInfo = !0, e.emit("stop", e.soundId), e.emit("playerStateChange", e.getState()), 
                e.noNeedNext ? e.noNeedNext = !1 : e.next();
                var n = s.currentTime;
                try {
                    a.record(t, 2, n), a.countPlayInfo(e.sound);
                } catch (t) {
                    console.log(t);
                }
            }
        }), s.onTimeUpdate(function() {
            e.closeFlag && s.timerRun();
            var t = e.getState();
            e.emit("playerStateChange", t);
        }), s.onNext(function() {
            console.log("audioManager.onNext"), e.next();
        }), s.onPrev(function() {
            e.prev();
        }), s.onStop(function() {
            console.log("audioManager.onStop");
        }), s.onError(function(t) {
            console.log("audioManagerErr", t), e.prev();
        });
    }
}, (0, n.inherits)(e, o), module.exports = e;