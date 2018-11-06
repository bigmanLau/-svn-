const anychatdefine = require('../../sdk/anychatdefine.js')
const anychat = require('../../sdk/anychat4wx.js')
const util = require('../../utils/util.js')
var wRequest = require('../../utils/servers.js');
const app = getApp()
let gc_page = {}
var interval;
let logs = []

// 客户端连接服务器，bSuccess表示是否连接成功，errorcode表示出错代码
anychat.OnAnyChatConnect = function () {
  let log = `${util.formatTime(new Date())}: OnAnyChatConnect(${gc_page.data.wss_ip}, ${gc_page.data.wss_port})`
  logs.push({ message: log })
  console.log("OnAnyChatConnect logs:", logs)
  gc_page.setData({
    logs: logs
  })
  // 执行登陆
 // gc_page.onTapLogin()
}
// 客户端登录系统，dwUserId表示自己的用户ID号，errorcode表示登录结果：0 成功，否则为出错代码，参考出错代码定义
anychat.OnAnyChatLoginSystem = function (dwUserId, errorcode) {
  let log = `${util.formatTime(new Date())}: OnAnyChatLoginSystem(${dwUserId}, ${errorcode}), nickname: ${gc_page.data.nickname}`
  logs.push({ message: log })
  console.log("OnAnyChatLoginSystem logs:", logs)
  gc_page.setData({
    logs: logs,
    user_id: dwUserId
  })
  //执行进入房间
  gc_page.onTapEnterRoom()

}
// 座席端进入房间，dwRoomId表示所进入房间的ID号，errorcode表示是否进入房间：0成功进入，否则为出错代码
anychat.OnAnyChatEnterRoom = function (dwRoomId, errorcode) {
  let log = `${util.formatTime(new Date())}: OnAnyChatEnterRoom(${dwRoomId}, ${errorcode})`
  logs.push({ message: log })
  console.log("OnAnyChatEnterRoom logs:", logs)
  gc_page.setData({
    logs: logs
  })
}
// 收到当前房间的在线用户信息，进入房间后触发一次，dwUserCount表示在线用户数（包含自己），dwRoomId表示房间ID
anychat.OnAnyChatRoomOnlineUser = function (dwUserCount, dwRoomId) {
  let log = `${util.formatTime(new Date())}: OnAnyChatRoomOnlineUser(${dwUserCount}, ${dwRoomId})`
  logs.push({ message: log })
  console.log("OnAnyChatRoomOnlineUser logs:", logs)
  gc_page.setData({
    logs: logs,
    userIdList: anychat.userIdList,
    target_id: anychat.userIdList[0],
    userIduserInfoMapping: anychat.userIduserInfoMapping
  })
}
// 用户进入（离开）房间，dwUserId表示用户ID号，bEnterRoom表示该用户是进入（1）或离开（0）房间
anychat.OnAnyChatUserAtRoom = function (dwUserId, bEnterRoom) {
  let log = `${util.formatTime(new Date())}: OnAnyChatUserAtRoom(${dwUserId}, ${bEnterRoom})`
  logs.push({ message: log })
  console.log("OnAnyChatUserAtRoom logs:", logs)
  gc_page.setData({
    logs: logs,
    userIdList: anychat.userIdList,
    userIduserInfoMapping: anychat.userIduserInfoMapping
  })
}
//收到用户透明通道消息
anychat.OnAnyChatTransBuffer = function (dwUserId, lpBuf, dwLen) {
  let log = `${util.formatTime(new Date())}: OnAnyChatTransBuffer(${dwUserId}, ${lpBuf})`
  logs.push({ message: log })
  console.log("OnAnyChatTransBuffer logs:", logs)
  gc_page.setData({
    logs: logs
  })
  let jsonbuf = {}
  try {
    jsonbuf = JSON.parse(decodeURIComponent(lpBuf))
  } catch (e) {
    console.log('OnAnyChatTransBuffer error', e)
  }
  if (jsonbuf.cmd == 'videocall') {
    gc_page.setData({
      target_id: dwUserId
    });
    console.log('gc_page', gc_page)
    gc_page.openCameraSpeak()
  }
}
// 网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，reason表示连接断开的原因
anychat.OnAnyChatLinkClose = function (close_info) {
  let log = `${util.formatTime(new Date())}: OnAnyChatLinkClose(${JSON.stringify(close_info)})`
  logs.push({ message: log })
  console.log("OnAnyChatLinkClose logs:", close_info)
  gc_page.setData({
    logs: logs
  })
}

anychat.OnSignalingError = function (error_info) {
  let log = `${util.formatTime(new Date())}: OnSignalingError(${JSON.stringify(error_info)})`
  logs.push({ message: log })
  console.log("OnSignalingError logs:", error_info)
  gc_page.setData({
    logs: logs
  })
}

Page({
  data: {
    process: 'init',//'init', 'main'
    wss_ip: 'anychat.chwis.net',
    wss_port: '443',
    app_id: 'B2078329-FDB9-2746-87B1-A44DF6720612',
    nickname: 'chaoB2342e',
    room_no: 6,
    user_id: -1,
    target_id: 0,
    userIdList: [],
    userIduserInfoMapping: {},
    anychat_local_id: 'anychat_local_id',
    anychat_remote_id: 'anychat_remote_id',
    pusher_rtmpurl: '',
    puller_rtmpurl: '',
    logs: []
  },
  //转换前后摄像头
  onTapSwitchCamera: function () {
    if (anychat.currentDevice == "user") {
      anychat.BRAC_SelectVideoCapture(1, "environment")
    } else if (anychat.currentDevice == "environment") {
      anychat.BRAC_SelectVideoCapture(1, "user")
    }
  },
  onInputWssIp: function (e) {
    this.setData({
      wss_ip: e.detail.value
    });
  },
  onInputWssPort: function (e) {
    this.setData({
      wss_port: e.detail.value
    });
  },
  onInputAppId: function (e) {
    this.setData({
      app_id: e.detail.value
    });
  },
  onInputNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    });
  },
  onInputRoomNo: function (e) {
    this.setData({
      room_no: e.detail.value
    });
  },
  //连接
  onTapConnect: function () {
    anychat.BRAC_Connect(this.data.wss_ip, this.data.wss_port)
  },
  //登陆
  onTapLogin: function () {

    anychat.BRAC_LoginEx(this.data.nickname, -1, this.data.nickname, this.data.app_id, 0, '', '');
  },
  onTapSyncData: function () {
    anychat.BRAC_ObjectControl(anychatdefine.ANYCHAT_OBJECT_TYPE_AREA, anychatdefine.ANYCHAT_INVALID_OBJECT_ID,
      anychatdefine.ANYCHAT_OBJECT_CTRL_SYNCDATA, this.data.user_id, 0, 0, 0, "");
  },
  //加入房间
  onTapEnterRoom: function () {
    anychat.BRAC_EnterRoom(this.data.room_no, '', 0);
  },
  //离开房间
  onTapLeaveRoom: function () {
    anychat.BRAC_LeaveRoom();
  },
  onSelectUser: function (e) {
    this.setData({
      target_id: e.detail.value
    });
  },
  //登出
  onTapLogout: function (e) {
    anychat.BRAC_Logout();
    anychat.BRAC_Release();
  },
  onTapTransBuffer: function () {
    anychat.BRAC_TransBuffer(this.data.target_id, encodeURIComponent(JSON.stringify({
      cmd: 'test jsonbuf'
    })))
  },
  openCameraSpeak: function () {
    anychat.BRAC_UserCameraControl(-1, 1) //打开自己摄像头
    anychat.BRAC_UserSpeakControl(-1, 1) //打开自己麦克风
    anychat.BRAC_UserCameraControl(this.data.target_id, 1) //打开对方摄像头
    anychat.BRAC_UserSpeakControl(this.data.target_id, 1) //打开对方麦克风
    this.setData({
      process: 'main',
      pusher_rtmpurl: anychat.pusher_rtmpurl[-1],
      puller_rtmpurl: anychat.puller_rtmpurl[this.data.target_id]
    });
    console.info('onTapSession', {
      process: 'main',
      pusher_rtmpurl: anychat.pusher_rtmpurl[-1],
      puller_rtmpurl: anychat.puller_rtmpurl[this.data.target_id]
    })
    anychat.BRAC_SetVideoPos(-1, this.data.anychat_local_id)
    anychat.BRAC_SetVideoPos(this.data.target_id, this.data.anychat_remote_id)
  },
  closeCameraSpeak: function () {
    anychat.BRAC_UserCameraControl(-1, 0) //打开自己摄像头
    anychat.BRAC_UserSpeakControl(-1, 0) //打开自己麦克风
    anychat.BRAC_UserCameraControl(this.data.target_id, 0) //打开对方摄像头
    anychat.BRAC_UserSpeakControl(this.data.target_id, 0) //打开对方麦克风
  },
  onTapSession: function () {
    if (this.data.target_id == 0) return
    anychat.BRAC_TransBuffer(this.data.target_id, encodeURIComponent(JSON.stringify({
      cmd: 'videocall'
    })))
    this.openCameraSpeak();
  },
  onTapHangout: function () {
    this.closeCameraSpeak();
    anychat.BRAC_LeaveRoom();
    anychat.BRAC_Release();
    this.setData({
      process: 'init'
    })
    setTimeout(() => {
      wx.reLaunch({ url: 'index' });
    }, 1000)
  },
  OnPushStream: function (e) {
    console.log('OnPushStream: ', e.detail.code)
  },
  OnPullStream: function (e) {
    console.log('OnPullStream: ', e.detail.code)
  },
  onLoad: function () {
    gc_page = getCurrentPages()[0]
    //连接->登陆->加入房间->选择用户开始
    this.onTapConnect()


    console.info('gc_page & app: ', gc_page, app)
  },
  onUnload: function () {
    this.closeCameraSpeak();
    anychat.BRAC_LeaveRoom();
    anychat.BRAC_Release();
    anychat.BRAC_Logout();
  },
  startVideo() {
    this.setData({
      target_id: this.data.userIdList[0],
      isStart: true
    })
   this.queueUp()
    
  },
  closeVideo() {//关闭视频后查询是否成功如果成功执行成功接口 否则提示原因
    this.onTapLeaveRoom()
    let parms = {
      userStr: this.data.userStr
    }
    wRequest.queryStatus(parms).then(res => {
      console.log(res)
      debugger
      if (res.data.success) {
        let userStr = res.data.attribute.userStr
        this.setData({//设置userStr
          userStr: userStr
        })
        //成功后  调用成功接口
        wRequest.videoSubmit(parms).then(res => {
         console.log(res)
          if (res.data.success){//提交成功后跳到下一个页面
            let userStr = res.data.attribute.userStr
            this.setData({
              userStr: userStr
            })
            this.next()
             }else{

             }
        })
          }else{
            //提示不通过原因
        wx.showModal({
          title: '提示',
          content: res.data.msg ? res.data.msg : "获取失败",
          showCancel: false
        })
          }
       }
    )
  }
  , 
  next(){
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  },queueUp(){
    let parms={
      userStr:wx.getStorageSync("userStr")
    }

    wRequest.queueUp(parms).then(res=>{
      console.log(res)
      if (res.data.resultCode != "error") {
        let userStr = res.data.attribute.userStr
        this.setData({
          userStr:userStr
        })
        //开启聊天
        // this.onTapSession()
       interval= setInterval(()=>{
         this.queryQueue()
        },2000)
        setTimeout(()=>{
        clearInterval(interval)
        },20000)
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.message,
          success:(res)=>{
            wx.reLaunch({
              url: '../jinrishouye/index',
            })
          }
        })
      }

      
    })
  }
  // 获取排队信息
  , queryQueue() {
    let parms = {
      userStr: this.data.userStr
    }
   

    wRequest.queryQueue(parms).then(res => {

      if (res.data.resultCode != "error") {
        if (res.data.success) {
          let userStr = res.data.attribute.userStr
          this.setData({//设置userStr
            userStr: userStr
          })}
        if (res.data.data && res.data.data.videoMedia) {
          debugger//成功获取到坐席信息 
          clearInterval(interval) //关闭循环
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr: userStr
          })
          let videoMedia = res.data.data.videoMedia
          console.log(videoMedia)
          this.setData({
            wss_ip: videoMedia.mediaIp
          });
          this.setData({
            user_id: videoMedia.mediaUserId
          });
          this.setData({
            target_id: videoMedia.mediaEmpId
          });
          //开启聊天
          this.onTapSession()
        }
       
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          success: (res) => {
            wx.reLaunch({
              url: '../jinrishouye/index',
            })
          }
        })
      }
    })
  }
})
