Component({
    properties: {
        pageType: {
            type: String,
            value: ""
        },
        albumId: {
            type: Number,
            value: 0
        },
        down: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        goToHomePage: function() {
            wx.switchTab({
                url: "/pages/index/index"
            }), "activityDetail" == this.data.pageType && wx.reportAnalytics("gotoindex", {
                albumid: this.data.albumId
            });
        }
    }
});