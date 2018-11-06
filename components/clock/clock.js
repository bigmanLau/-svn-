Component({
    properties: {
        initTime: {
            type: Number,
            value: 864e5
        },
        endLabel: {
            type: String,
            value: ""
        },
        unit: {
            type: Boolean,
            value: !1
        },
        millisecond: {
            type: Boolean,
            value: !0
        },
        step: {
            type: Number,
            value: 100
        }
    },
    data: {},
    attached: function() {
        var t = this, e = this.data, i = e.step, a = e.initTime;
        this.setData({
            time: a
        }), this.timerId = setInterval(function() {
            t.tick();
        }, i);
    },
    detached: function() {
        clearInterval(this.timerId);
    },
    methods: {
        tick: function() {
            var t = this.data, e = t.time, i = t.step;
            if (e - i <= 0) return this.setData({
                time: 0
            }), clearInterval(this.timerId), void this.triggerEvent("end", {}, {
                bubbles: !0,
                composed: !0
            });
            this.setData({
                time: e - i
            });
        }
    }
});