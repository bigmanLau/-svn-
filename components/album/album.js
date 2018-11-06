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
        noBorderBottom: {
            type: Boolean,
            value: !1
        },
        hasTotalCount: {
            type: Boolean,
            value: !1
        },
        vertical: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    attached: function() {},
    methods: {
        moduleClickReport: function(a) {
            wx.reportAnalytics("index_modules_click", {
                module_name: a
            });
        },
        toAlbumDetail: function(e) {
            var t = e.currentTarget.dataset, l = t.albumId, i = t.ispaid, u = (t.isAssistant, 
            t.category);
            this.moduleClickReport(u), 1 != i ? (0, a.jumpTo)({
                url: "../albumDetail/albumDetail?albumId=" + l
            }) : (0, a.jumpTo)({
                url: "../paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + l + "&ispaid=1"
            });
        }
    }
});