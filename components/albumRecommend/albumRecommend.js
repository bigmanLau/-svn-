var a = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        },
        category_name: {
            type: String,
            value: ""
        },
        ispaid: {
            type: String,
            value: ""
        },
        isAssistant: {
            type: Number,
            value: 0
        },
        isLast: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    attached: function() {},
    methods: {
        toAlbumDetail: function(t) {
            var e = t.currentTarget.dataset, i = e.albumId, l = e.ispaid, u = e.isAssistant;
            console.log("toAlbumDetail", t.currentTarget.dataset), wx.reportAnalytics("haoketuijian", {
                albumid: i
            }), 1 != l ? (0, a.jumpTo)({
                url: "../albumDetail/albumDetail?albumId=" + i
            }) : (0, a.jumpTo)({
                url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + i + "&ispaid=1" + (1 == u ? "&isAssistant=1" : "")
            });
        }
    }
});