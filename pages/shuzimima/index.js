
// pages/main/index.js

const userId = wx.getStorageSync("userId")
var wRequest = require('../../utils/servers.js');
let timeout;
let callback
Page({
  data: {
    title: '请输入密码',
    resetHidden: false,
    titleColor: "",
    passwords: [],
    isFirst:false
  },
  onLoad: function (options) {
    this.setData({
      type:options.type!=null?options.type:"",
      otype:options.otype!=null?options.otype:""
    })
    if (options.type == 1) {
       //第一次设置密码
      this.data.isFirst=true
    } else if(options.type==2){

      if(this.data.otype==0){
        //修改密码
        this.selectGestpw()
        this.setData({
          title: "请输入原密码",
          isReset:true
        })
      }else if(this.data.otype==1){
//忘记密码
        this.setData({
          title: "请输入新密码"
        })
      }
   
    }else{
      //查询密码
      this.selectGestpw()
      // wx.setStorageSync("passwordxx", JSON.stringify(data))
    }
    // 页面初始化 options为页面跳转所带来的参数

  },
  inputPass(e) {
    let num = e.currentTarget.dataset.number
    // if (!this.isInArray(this.data.passwords, value)) {
      if(this.data.passwords.length<6){
    this.data.passwords.push(num)
      this.setData({
        passwords: this.data.passwords,
        current: num
      })
      if(this.data.passwords.length==6)
{
        if (this.data.isFirst) {
          //存密码
          console.log("存密码", JSON.stringify(this.data.passwords))
          this.updatePass(JSON.stringify(this.data.passwords))
        } else {
          if(this.data.type==2){
            if(this.data.isReset){
              if(this.data.otype==1){
                  //更新密码 修改密码
                this.updatePass(JSON.stringify(this.data.passwords))
              }else if(this.data.otype==0){
                if (JSON.stringify(this.data.passwords) == this.data.oldPw) {
                  this.resetPass()
                  this.setData({
                    title: "请输入新密码",
                    isReset: false
                  })
                } else {
                  this.resetPass()
                  this.setData({
                    title: "密码错误,请重新输入",
                    isReset: true
                  })
                }
              }
          
            }else{
              //更新密码
              this.data.isReset=false
              this.updatePass(JSON.stringify(this.data.passwords))
            }
          
          }else{
          //验证密码
          if (JSON.stringify(this.data.passwords) == wx.getStorageSync("passwordxx")) {
            wx.reLaunch({
              url: '../jinrishouye/index',
            })
          }else{
            this.setData({
              title:"密码错误"
            })
            this.resetPass()
          }
        }
        }
      }
      timeout =setTimeout(()=>{
      clearTimeout(timeout)
       this.setData({
          current:100
        })
     }, 50)
     
    } 
        
    
  },
  resetPass(){
    this.setData({
      passwords:[]
    })
  },
  isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  },
  selectGestpw() {
      wRequest.selectGestpw().then(res => {

        if (res.data.success ) {
         this.setData({
           oldPw:res.data.data
         })
       
          wx.setStorageSync("passwordxx", res.data.data)
         
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      })
  },

  
  updatePass(pwd){
    let parms = {
      orgPw: this.data.oldPw,
      newPw: pwd,
      type:this.data.otype
    }
    wRequest.updateGestpw(parms).then(res => {
      if (res.data.success) {
        if(this.data.type==2){
           this.setData({
             title:"修改密码成功"
           })
           wx.setStorageSync("numberPass", pwd)
           setTimeout(()=>{
            wx.reLaunch({
              url: '../jinrishouye/index',
            })
           },1000)
        }else{
          wx.reLaunch({
            url: '../guide/index',
          })
        }
       
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          success: (res) => {
            this.resetPass()
          }
        })
      }
    })
  },
  delPass(){
    this.setData({
      current:50
    })
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      this.setData({
        current: 100
      })
    }, 50)
    this.data.passwords.shift(1)
    this.setData({
      passwords:this.data.passwords
    })
  },
  forgetPass(){
    this.setData({
      current: 99
    })
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      this.setData({
        current: 100
      })
    }, 50)
  wx.reLaunch({
    url: '../shoushimimaxiugai1/index?otype=1',
  })
  }
  
})