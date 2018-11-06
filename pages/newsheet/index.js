// index.js
var wRequest = require('../../utils/wxRequest.js');
//获取应用实例
var app = getApp()
var mainUrl = app.globalData.mainUrl;
var appid = app.globalData.appid;
var appsecret = app.globalData.appsecret;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [1, 2, 3],
    team_name: '选择',
    manager_name: '选择',
    project_name: '',
    work_place: '',
    work_reason: '',
    isTipsShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = mainUrl + "/workSheet/get_select_list";
    var that=this;
    wRequest.wxGet(url).then((res) => {
      var teamName=[];
      var manageName = [];
      for(let i=0;i<res.data.team.length;i++){
        teamName.push(res.data.team[i].team_name);
      }
      for (let i = 0; i < res.data.manage.length; i++) {
        manageName.push(res.data.manage[i].name);
      }
      that.setData({
        teamArray: teamName,
        teamArray2:res.data.team,
        manageArray: manageName,
        manageArray2:res.data.manage
      })
    }, (res) => {
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }, bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      team_name: this.data.teamArray[e.detail.value],
      selectTeam: this.data.teamArray2[e.detail.value]
    })
  }, bindManageChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      manager_name: this.data.manageArray[e.detail.value],
      selectManage: this.data.manageArray2[e.detail.value]
    })
  }, bindProjectNameChange: function (e) {
    this.setData({
      project_name: e.detail.value
    })
  }
  , bindWorkPlaceChange: function (e) {
    this.setData({
      work_place: e.detail.value
    })
  }
  , bindWorkReasonChange: function (e) {
    console.log('bindWorkReasonChange，携带值为', e.detail.value)
    this.setData({
      work_reason: e.detail.value
    })
  }, onSubmit: function () {
    var that = this;
    var canSubmit = true;
    if (this.data.project_name == '') {
      that.setData({
        tips: '项目名称不能为空',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();


    }else
    if (this.data.work_plac == '') {

      that.setData({
        tips: '项目名称不能为空',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();

    } else if (this.data.work_place == '') {

      that.setData({
        tips: '施工部位不能为空',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();
    } else
    if (this.data.team_name == '' || this.data.team_name == '选择') {

      that.setData({
        tips: '请选择班组',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();
    } else
    if (this.data.manager_name == '' || this.data.manager_name == '选择') {

      that.setData({
        tips: '请选择生产经理',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();
    } else
    if (this.data.work_reason == '') {

      that.setData({
        tips: '使用事由不能为空',
        isTipsShow: true
      })
      canSubmit = false;
      that.timeout();
    } else

    if (canSubmit) {
      var url = mainUrl + "/workSheet/new_sheet";
      var loginObj = wx.getStorageSync('loginObj');
      var data={
        'team_id':this.data.selectTeam.id,
        'work_place':this.data.work_place,
        'work_reason':this.data.work_reason,
        'project_name':this.data.project_name,
        'operator_id': loginObj.id,
        'manage_id': this.data.selectManage.id
      };
      wx.showLoading({
        title: '请求中',
      })
      wRequest.wxPost(url, data).then((res) => {
        wx.hideLoading();
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        prevPage.onLoad();
        wx.showToast({
          title: '工单已发送',
          success:function(){
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },500)
            
          }
        })
       
      }, (res) => {
        wx.hideLoading();

      })
    }

  }, timeout: function () {
    var that = this;
    setTimeout(function () {
      
      that.setData({

        isTipsShow: false
      })
      
      return;
    }, 500);
    
  }
})