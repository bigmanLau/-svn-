
var wRequest = require('../../utils/servers.js');
let app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestionList() 
  },
  getQuestionList(){
   
    let parms={
      muid: 5,
      userStr:wx.getStorageSync("userStr")
    }
    wRequest.getQuestionList2(parms).then(res=>{
        if(res.data.success){
          let userStr = res.data.attribute.userStr
          this.setData({
            userStr: userStr
          })
          this.dealWenJuanList(res.data.data)
        }else{
          wx.showToast({
            title: '获取问卷失败',
          })
        }

       
       
       
    })
  },
  dealWenJuanList(data){
    let wenjuanList=data
     for(let i=0;i<wenjuanList.length;i++){
       wenjuanList[i].answers = []
       let isMulti=false
       if (wenjuanList[i].question_type==1){
          isMulti=true
       }else{
         isMulti = false
       }
       for (let key in wenjuanList[i].answer_content){
      
          let obj={
            keyName:key,
            // value: wenjuanList[i].answer_content[key],
            value: wenjuanList[i].answer_content[key],
            
            isSelect:false ,
            isMulti: isMulti
          }
          wenjuanList[i].answers.push(obj)
         
       }
     }
     this.setData({
       list:wenjuanList
     })
  },
  changeSelect(e){
  
   let parent=e.currentTarget.dataset.index
   let child = e.currentTarget.dataset.childindex
   let parentObj=this.data.list[parent]
   let obj=parentObj.answers[child]
   //如果是多选
   if (obj.isMulti){
     if (obj.isSelect) {
       obj.isSelect=false;
     }else{
       obj.isSelect =true;
     }

   }else{
     //如果是单选
     if(obj.isSelect){
       obj.isSelect=false;
     }else{
       for (let i = 0; i < parentObj.answers.length;i++){
         parentObj.answers[i].isSelect=false;
       }
   
       obj.isSelect = true;
     }
   }
   this.setData({
     list:this.data.list
   })
  },
  goNext() {
    //拼接数据提交
    let data=this.data.list
    let answer=[]
    for(let i=0;i<data.length;i++){
      //单选
      if (data[i].question_type==0){
        for(let j=0;j<data[i].answers.length;j++){
          if(data[i].answers[j].isSelect){
            answer.push(data[i].question_no+"&"+data[i].answers[j].keyName)
          }
        }
      }else{
        //多选
        let item = ""
        let isFirst = true
        for (let j = 0; j < data[i].answers.length; j++) {
          
         
          
          if (data[i].answers[j].isSelect) {
            // debugger
            if (isFirst){
              item += data[i].question_no + "&" 
              item += data[i].answers[j].keyName 
              isFirst=false;
            }else{
              item += "^" + data[i].answers[j].keyName 
              
            }
          }
        }
        answer.push(item)
      }
    }
    if (answer.length<this.data.list.length){
      wx.showToast({
        title: '请回答所有题目',
      })
      return
    }
      let parms={
        muid: app.globalData.openid,
         userStr:this.data.userStr,
        answers: answer.join("|")
      } 
      
      wRequest.submitAnswer2(parms).then(res=>{
      if(res.data.success){
        let userStr = res.data.attribute.userStr
        this.setData({
          userStr: userStr
        })
        //如果成功调用 next接口
       this.next()
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.data.errorInfo,
        })
      }
    })
  },
  next() {
    wRequest.next({ userStr: this.data.userStr }).then(res => {
      wx.setStorageSync("userStr", res.data.attribute.userStr)
      wRequest.goNext(res.data.data)
    })
  }
})