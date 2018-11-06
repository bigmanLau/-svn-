// pages/demo/demo.js
// let City = require('../../utils/allcity.js');
// let bumen = require('../../utils/mock_bumen.js');
let wRequest = require('../../utils/servers.js');
Page({

  data: {

  },
  bindtap(e) {
    console.log(e.detail)
    wx.setStorageSync("branchNo", e.detail.branch_no)
    wx.setStorageSync("branchName", e.detail.name)
    wx.navigateBack({
      
    })
  },
  input(e) {
    this.value = e.detail.value
  },
  searchMt() {
    // 当没有输入的时候，默认inputvalue 为 空字符串，因为组件 只能接受 string类型的 数据 
    if (!this.value) {
      this.value = '';
    }
    this.setData({
      value: this.value
    })
  }, onLoad() {
    //  this.dealdata(bumen)
     this.dealdata(wx.getStorageSync("bumenlist"))
  },
  dealdata(bumen) {
    let arr = bumen.sort(this.compare)
    this.toUpperCase(arr)

    let bume = this.resetData(arr)
    console.log(bume)
    this.setData({
      city: bume
    })
  }
  //重新整理数据
  , resetData(arr) {

    var map = {},
      dest = [];
    for (var i = 0; i < arr.length; i++) {
      var ai = arr[i];
      let obj = {}
      obj.key = ai.branch_city
      obj.name = ai.branch_name
      obj.branch_no = ai.branch_no
      //  ai.title=ai.branch_city
      if (!map[ai.branch_city]) {
        dest.push({
          title: ai.branch_city,
          item: [obj]
        });
        map[ai.branch_city] = ai;
      } else {
        for (var j = 0; j < dest.length; j++) {
          var dj = dest[j];
          if (dj.title == ai.branch_city) {
            dj.item.push(obj);
            break;
          }
        }
      }
    }
    //  console.log(dest)
    return dest

  }
  //数组排序
  , compare(obj1, obj2) {
    var val1 = obj1.branch_city;
    var val2 = obj2.branch_city;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }
  ,
  //索引转大写
  toUpperCase(arr) {
    arr.forEach((item) => {
      let alphab = item.branch_city
      alphab = alphab.toUpperCase()
      item.branch_city = alphab
    })


  }
})