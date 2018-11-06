var a = require("../../utils/util");

Component({
    properties: {
        album: {
            type: Object,
            value: {}
        }
    },
    data: {
        albumCoverDefault: "https://s1.xmcdn.com/css/img/common/default/user100.jpg",
        isIos: "ios" == wx.getSystemInfoSync().platform
    },
    attached: function() {},
    methods: {
        toAlbumDetail: function(t) {
            var e = this.data.album.albumId;
            (0, a.jumpTo)({
                url: "/pages/paidPackage/pages/albumDetailPaid/albumDetailPaid?albumId=" + e + "&ispaid=1"
            });
        }
    }
});