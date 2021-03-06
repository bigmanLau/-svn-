var wRequest = require('../../utils/servers.js');
let riliday = require('../../utils/riliday.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isLogin:true
  },
  goNext(e){
   let index=e.currentTarget.dataset.index
   this.setData({
     selectIndex: index,
     day: this.data.weeksList[index-1]
   })
   
  //  this.getWeek(index)
   this.getDate()
  },
  getMockDate(day) {
    let res = riliday
    let list = res.data
    if (list != null) {
      for (let i = 0; i < list.length; i++) {
        // debugger
        if (list[i].type == "1") {
          list[i].org = "大商所"
        } else if (list[i].type == "2") {
          list[i].org = "上期所"
        } else if (list[i].type == "3") {
          list[i].org = "郑商所"
        } else if (list[i].type == "4") {
          list[i].org = "中金所"
        } else if (list[i].type == "5") {
          list[i].org = "能源"
        }
      }
      this.setData({
        list: list
      })
    } else {
      this.setData({
        list: []
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date(options.year , options.month-1 ,+options.day)
    let index=this.CalculateWeek(options.year, options.month , +options.day)
    
    this.setData({
      year: options.year,
      month: options.month  ,
      day: options.day
    })
  
    
    this.setData({
      dayIndex: index-1,
      currentIndex: index,
      selectIndex: index
    })
  
   this.getDate()
   this.getWeeksList(date,index)
  },
  getWeeksList(date,index){
    let firstDay = date.getDate() - index + 1
    let lastDay = date.getDate() + 7 - index
    
    let weeksList=[]
    for (let i = firstDay; i <= lastDay;i++){
      
      weeksList.push(i)
    }
    // debugger
    this.setData({
      weeksList:weeksList
    })
  },
  //获取本周第i天日期
   getWeek(i) {
    var now = new Date(); 
    var firstDay= new Date(now - (now.getDay() ) * 86400000);
    firstDay.setDate(firstDay.getDate() + parseInt(i));
    let mon = Number(firstDay.getMonth()) +1; 
    this.setData({
      year: now.getFullYear(),
      month:mon,
      day: firstDay.getDate()
    })
   
  }
  ,  CalculateWeek(y, m, d) {
    // console.log("年月日",y,m,d)
    //这里决定开始日期是1为周日 7为周六
    let arr = "1234567".split("");
    // with (document.all) {
    let vYear = parseInt(y, 10);
    let vMonth = parseInt(m, 10);
    let vDay = parseInt(d, 10);
    // }
    let week = arr[new Date(y, m - 1, d).getDay()];
    // debugger
    return week;
  },
  getDate(){
    if(!this.data.isLogin){
      this.getMockDate()
      return
    }else{
 
    let parms={
      year:this.data.year,
      month:this.data.month,
      day:this.data.day
    }
    wRequest.getDate(parms)
    .then(res=>{
      let list=res.data.data
      if (list != null) {
        for (let i = 0; i < list.length; i++) {
          // debugger
          if (list[i].type == "1") {
            list[i].org = "大商所"
          } else if (list[i].type == "2") {
            list[i].org = "上期所"
          } else if (list[i].type == "3") {
            list[i].org = "郑商所"
          } else if (list[i].type == "4") {
            list[i].org = "中金所"
          } else if (list[i].type == "5") {
            list[i].org = "能源"
          }
        }
      for(let i=0;i<list.length;i++){
        if (this.getLength(list[i].content)>80){
          list[i].isShrink =true
          list[i].shortContent = list[i].content.substring(0, this.get60Index(list[i].content))
        }else{
          list[i].shortContent = list[i].content
        }
      }
      this.setData({
        list:list
      })
      }
    })

    }
  },
  getLength(str){
    var l = str.length;
    var blen = 0;
    for (let i = 0; i < l; i++) {
      if ((str.charCodeAt(i) & 0xff00) != 0) {
        blen++;
      }
      blen++;
    }
    return blen
  }
  ,get60Index(str){
    var l = str.length;
    var blen = 0;
    let i=0;
    for ( ; i < l; i++) {
      if ((str.charCodeAt(i) & 0xff00) != 0) {
        blen++;
      }
      blen++;
      if(blen>80){
        break;
      }
    }
    return i
  },
  goOpen(e){
    let index=e.currentTarget.dataset.index
    this.data.list[index].isShrink=!this.data.list[index].isShrink
    this.setData({
        list:this.data.list
    })

  }
})