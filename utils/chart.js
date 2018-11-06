
module.exports = {
  draw: init,
  resetChart: resetChart,
  saveCanvans: saveCanvans
}

let util = require("chartUtils.js");
let canvasId = '';
let pageObj = null;
let chartOpt = {
  chartPieCount: 0,
  hideXYaxis: false,
  axisMark: [],
  barLength: 0,
  barNum: 0,
  // bgColor: "transparent",
  lineColor: "#c2c2c2",
  bgColor: "#ffffff",
  chartWidth: 0,
  chartHeight: 0,
  legendWidth: 0,
  legendHeight: 0,
  chartSpace: 10,
  textSpace: 5,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  axisLeft: 0,
  axisBottom: 0,
  axisTop: 0
}
let dataSet = {
  hideYaxis: false,
  title: {
    color: "#394655",
    size: 16,
    text: ""
  },
  legend: {
    color: "",
    size: 12
  },
  color1: ['#EF4B4C', '#53B75D'],
  color: ['#EF4B4C', '#53B75D', '#FEE746', '#B9A39B', '#C18734', '#9EC3AD', '#6D9BA3', '#7E9C82', '#DAEE59', '#CFDCED'],
  color2: ['#F2DA11', '#527BE7', '#C169FF', '#2A9EF1', '#FE8441', '#F9A400'],
  xAxis: {
    color: "#666666",
    size: 12,
    data: []
  },
  series: [
    {
      name: "",
      category: "bar",
      data: []
    },
    {
      name: "",
      category: "line",
      data: []
    }
  ]
}
function resetChart(){
   chartOpt = {
    chartPieCount: 0,
    hideXYaxis: false,
    axisMark: [],
    barLength: 0,
    barNum: 0,
    // bgColor: "transparent",
    lineColor: "#c2c2c2",
    bgColor: "#ffffff",
     yTitle: "金额(万元)",
    chartWidth: 0,
    chartHeight: 0,
    legendWidth: 0,
    legendHeight: 0,
    chartSpace:5,
    barSpace:20,
    textSpace: 5,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    axisLeft: 0,
    axisBottom: 0,
    axisTop: 0
  }
  let dataSet = {
    hideYaxis: false,

    title: {
      color: "#394655",
      size: 16,
      text: ""
    },
    legend: {
      color: "",
      size: 12
    },
    color: ['#EF4B4C', '#53B75D', '#FEE746', '#B9A39B', '#C18734', '#9EC3AD', '#6D9BA3', '#7E9C82', '#DAEE59', '#CFDCED'],
    color2: ['#53B75D', '#4768BE', '#2A9EF1', '#FE8441', '#FBBA1C', '#EF4B4C'],
    xAxis: {
      color: "#666666",
      size: 12,
      data: []
    },
    series: [
      {
        name: "",
        category: "bar",
        data: []
      },
      {
        name: "",
        category: "line",
        data: []
      }
    ]
  }
}

function init(page, canvas, data) {
  canvasId = canvas;
  pageObj = page;
  checkData(data);

  let ctx = initCanvas(page, canvasId);
  drawChart(ctx);
  return ctx
}
/**
 * 初始化Canvas
 */
function initCanvas(page, canvasId) {
  let ctx = wx.createCanvasContext(canvasId);
  let Sys = wx.getSystemInfoSync();

  chartOpt.chartWidth = Sys.windowWidth;
  chartOpt.chartHeight = Sys.windowWidth * 0.8;//Canvas组件的宽高比

  chartOpt.legendWidth = dataSet.legend.size * 1.3;
  chartOpt.legendHeight = dataSet.legend.size * 0.8;

  chartOpt.top = chartOpt.left = chartOpt.chartSpace;
  chartOpt.right = chartOpt.chartWidth - chartOpt.chartSpace;
  chartOpt.bottom = chartOpt.chartHeight - chartOpt.chartSpace;

  //3个数字的文字长度
  let textWidth = util.mesureText('100', dataSet.xAxis.size);
  let legendHeight = dataSet.series.length > 1 ? (chartOpt.legendHeight + chartOpt.chartSpace * 2) : 0;

  chartOpt.axisLeft = chartOpt.left + (dataSet.hideYaxis ? 0 : textWidth + chartOpt.textSpace);
  chartOpt.axisBottom = chartOpt.bottom - dataSet.xAxis.size - chartOpt.textSpace - legendHeight;
  chartOpt.axisTop = chartOpt.top + dataSet.title.size + chartOpt.textSpace + dataSet.xAxis.size * 2;
  chartOpt.axisLeft=50
  console.log("chartopt",chartOpt)

  //更新页面Canvas的宽度、高度
  page.setData({
    chartWidth: chartOpt.chartWidth,
    chartHeight: chartOpt.chartHeight
  });

  return ctx;
}
/**
 * 检查并更新图表数据
 */
function checkData(data) {

  if (data.title != undefined) {
    if (data.title.color != undefined && data.title.color != '') {
      dataSet.title.color = data.title.color;
    }
    dataSet.title.text = data.title.text;

  }
  if (data.color != undefined && data.color != [] && data.color.length > 0) {
    dataSet.color = data.color;
  }
  dataSet.xAxis.data = data.xAxis.data;


  dataSet.series = data.series;

  let value = new Array();
  for (let i = 0; i < dataSet.series.length; i++) {
    let item = dataSet.series[i];
    let itemLenght = item.data.length;
    if (itemLenght > chartOpt.barLength) {
      chartOpt.barLength = itemLenght;
    }
    for (let k = 0; k < itemLenght; k++) {
      value.push(item.data[k]);
    }
    if (item.category == 'bar') {
      chartOpt.barNum += 1;

    }
    if (item.category == 'pie') {
      chartOpt.hideXYaxis = true;
      for (let k = 0; k < itemLenght; k++) {
        chartOpt.chartPieCount +=Number(item.data[k]);
      }
    }


  }

  let minNum = Math.min.apply(null, value);
  let maxNum = Math.max.apply(null, value);
  //计算Y轴刻度尺数据
  chartOpt.axisMark = util.calculateY(minNum, maxNum, 5);
}
/**
 * 绘制图表
 */
function drawChart(ctx) {
  drawBackground(ctx);
  drawTitle(ctx);

  if (!chartOpt.hideXYaxis) {
    let series = dataSet.series;
    drawXaxis(ctx);
    drawYaxis(ctx);
  }

  // drawBarChart(ctx);
  drawCharts(ctx);
  ctx.draw();
}
/**
 * 绘制图表背景
 */
function drawBackground(ctx) {
  if (chartOpt.bgColor != "" && chartOpt.bgColor != "transparent") {
    ctx.setFillStyle(chartOpt.bgColor);
    ctx.fillRect(0, 0, chartOpt.chartWidth, chartOpt.chartHeight);
  }
}
/**
 * 绘制标题
 */
function drawTitle(ctx) {
  let title = dataSet.title;
  if (title.text != '') {

    let textWidth = util.mesureText(title.text, title.size);
    ctx.setFillStyle(title.color);
    ctx.setFontSize(title.size)
    ctx.setTextAlign('left');
    ctx.fillText(title.text, (chartOpt.chartWidth - textWidth) / 2, chartOpt.top + title.size);
  }

}
/**
 * 绘制X轴刻度尺
 */
function drawXaxis(ctx) {
  let width = (chartOpt.right - chartOpt.axisLeft) / (chartOpt.barLength + 1);
  //绘制X轴横线
  ctx.setStrokeStyle("#666666");
  ctx.setLineWidth(0.5);
  ctx.setLineCap('round');
  ctx.moveTo(chartOpt.axisLeft, chartOpt.axisBottom)
  ctx.lineTo(chartOpt.right - width, chartOpt.axisBottom)
  ctx.stroke();


  
  let data = dataSet.xAxis.data;

  //绘制X轴显示文字
  for (let i = 0; i < data.length+1; i++) {
   
    let textX = (width * (i + 1)) - (width / 2) + chartOpt.axisLeft;
    ctx.setFillStyle(dataSet.xAxis.color);
    ctx.setFontSize(8);
    ctx.setTextAlign('center');
    if(i!=data.length){
      if(data.length==1){
        ctx.fillText(data[i], textX+width/2, chartOpt.axisBottom + dataSet.xAxis.size + chartOpt.textSpace);
      }else{
        ctx.fillText(data[i], textX, chartOpt.axisBottom + dataSet.xAxis.size + chartOpt.textSpace);
      }

    }else{
      ctx.setFillStyle("#999999");
      ctx.setFontSize(8);
      ctx.setTextAlign('center');
      ctx.fillText("品种", textX - chartOpt.textSpace/2, chartOpt.axisBottom + dataSet.xAxis.size );
    }
  
  }
}
/**
 * 绘制Y轴刻度尺
 */
function drawYaxis(ctx) {

  //绘制Y轴横线
  ctx.setLineWidth(0.5);
  ctx.setLineCap('round');

  let height = (chartOpt.axisBottom - chartOpt.axisTop) / (chartOpt.axisMark.length - 1);
  //绘制Y轴显示数字
  let textWidth = util.mesureText(chartOpt.yTitle, 8) + 2*chartOpt.textSpace ;
  for (let i = 0; i < chartOpt.axisMark.length+1; i++) {
    let y = chartOpt.axisBottom - height * i;
    
    if (i > 0) {
      if (i != chartOpt.axisMark.length) {
      ctx.setStrokeStyle(chartOpt.lineColor);
        util.drawDashLine(ctx, chartOpt.axisLeft, y, chartOpt.right - textWidth, y);
      }
    }

    if (!dataSet.hideYaxis) {
      ctx.setFillStyle(dataSet.xAxis.color);
      ctx.setFontSize(dataSet.xAxis.size)
      ctx.setTextAlign('right');
      if (i != chartOpt.axisMark.length){
        ctx.fillText(chartOpt.axisMark[i], chartOpt.axisLeft - chartOpt.textSpace, y + chartOpt.textSpace);
      }else{
        ctx.setFillStyle("#999999");
        ctx.setFontSize(8)
        ctx.setTextAlign('right');
        let width = util.mesureText(chartOpt.yTitle, 8);
        ctx.fillText(chartOpt.yTitle, chartOpt.axisLeft - chartOpt.textSpace + width/2, y + chartOpt.textSpace*4);
      }
     
      
    }
  }
}

/**
 * 绘制图例
 */
function drawLegend(ctx) {
  let series = dataSet.series;
  let  minWidth=0
  for (let i = 0; i < series.length; i++) {
    let names = series[i].name;
    let isPie = series[i].category == 'pie';
  //  for(let j=0;j<names.length;j++){
  //    if (j == 0) {
  //      minWidth = util.mesureText(names[j], dataSet.xAxis.size)
  //    }else{
  //      if (minWidth > util.mesureText(names[j], dataSet.xAxis.size)) {
  //        minWidth = util.mesureText(names[j], dataSet.xAxis.size)
  //      }
  //    }
  //    break
  //  }

  }

  for (let i = 0; i < series.length; i++) {
    let names = series[i].name;
    let isPie = series[i].category == 'pie';
    let textWidth = util.mesureText(isPie?names[0]:names, dataSet.xAxis.size);
   

    if (series[i].category == 'pie') {
      let legendWidth = chartOpt.legendWidth + textWidth + chartOpt.chartSpace *8;
      let startX = (chartOpt.chartWidth / 2) - (legendWidth * (isPie ? names.length*2/3 : series.length)) / 2;
      for (let k = 0; k < names.length; k++) {
      
        let x = startX + (legendWidth*2/3) * k;
        let y = chartOpt.bottom - chartOpt.legendHeight;

        ctx.setFillStyle(dataSet.xAxis.color);
        ctx.setFontSize(10)
        ctx.setTextAlign('left');
        ctx.fillText(names[k], x + chartOpt.textSpace + chartOpt.legendWidth, chartOpt.bottom);

        let color = getColor(k);
        ctx.setFillStyle(color);
        ctx.fillRect(x+chartOpt.legendWidth-chartOpt.textSpace, y + chartOpt.legendHeight / 3, chartOpt.legendWidth/3, chartOpt.legendHeight*2/3);
      }
    } else {
      let legendWidth = chartOpt.legendWidth + textWidth + chartOpt.barSpace * 2;
      let startX = (chartOpt.chartWidth / 2) - (legendWidth * (isPie ? names.length : series.length)) / 2;
      let x = startX + legendWidth * i + chartOpt.legendWidth * i;
      let y = chartOpt.bottom - chartOpt.legendHeight;

      ctx.setFillStyle(dataSet.xAxis.color);
      ctx.setFontSize(dataSet.legend.size)
      ctx.setTextAlign('left');
      ctx.fillText(series[i].name, x + chartOpt.barSpace + chartOpt.legendWidth, chartOpt.bottom);

      let color = getColor(i);
      ctx.setFillStyle(color);
      ctx.setLineWidth(2);
      ctx.setStrokeStyle(color);
      if (series[i].category == 'bar') {
        ctx.fillRect(x, y + 1, chartOpt.legendWidth, chartOpt.legendHeight);
      } else if (series[i].category == 'line') {
        let lx = x + chartOpt.legendWidth / 2;
        let ly = y + chartOpt.legendHeight / 2 + 1;
        ctx.beginPath();
        ctx.moveTo(x, ly);
        ctx.lineTo(x + chartOpt.legendWidth, ly);
        ctx.stroke();
        ctx.closePath();
        drawPoint(ctx, lx, ly, chartOpt.legendHeight / 2, color);
        drawPoint(ctx, lx, ly, chartOpt.legendHeight / 4, chartOpt.bgColor);
      }
    }
  }
}
/**
 * 绘制数据标签
 */
function drawToolTips(ctx, text, x, y, color) {
  ctx.setFillStyle(color);
  ctx.setFontSize(dataSet.xAxis.size)
  ctx.setTextAlign('center');
  ctx.fillText(text, x, y);
}
/**
 * 画图
 */
function drawCharts(ctx) {
  let series = dataSet.series;
  for (let i = 0; i < series.length; i++) {
    let category = series[i].category;
    let barWidth = (chartOpt.right - chartOpt.axisLeft) / (chartOpt.barLength+1);
    let barHeight = chartOpt.axisBottom - chartOpt.axisTop;
    let maxMark = chartOpt.axisMark[chartOpt.axisMark.length - 1];

    if (category == "bar") {
      barWidth = barWidth - chartOpt.barSpace;
      drawBarChart(ctx, i, series, barWidth, barHeight, maxMark);
    } else if (category == "line") {
      drawLegend(ctx);
      drawLineChart(ctx, i, series, barWidth, barHeight, maxMark);
    } else if (category == 'pie') {
      drawLegend(ctx);
      drawPieChart(ctx, i, series);
    }
  }
}
/**
 * 绘制柱状图
 */
function drawBarChart(ctx, i, series, barWidth, barHeight, maxMark) {
  let item = series[i];
  let colors=item.colors
  let itemWidth = barWidth /( chartOpt.barNum);

  for (let k = 0; k < item.data.length+1; k++) {
    let itemHeight = barHeight * (item.data[k] / maxMark);
   
    let barSpace=20

    let x = (barWidth * k + chartOpt.axisLeft + k * barSpace + (barSpace * 2)*(2.0/item.data.length) + (i * itemWidth));
    let y = chartOpt.axisBottom - itemHeight;
    let color;
  
    if (colors&&k<colors.length){
    if (colors[k]){
      if (colors[k]=="green"){
        color = "#53B75D"
    }else{
        color = "#EF4B4C"
    }
    }else{
      color = "#53B75D"
    }
    }
    // let color = getColor2(series.length <= 1 ? k : i);
    ctx.setFillStyle(color);
    if(i!=item.data.length)
    ctx.fillRect(x, y, itemWidth, itemHeight);
//bigman 是否显示数值大小
    // drawToolTips(ctx, item.data[k], x + itemWidth / 2, y - chartOpt.textSpace, color);
  }
}
/**
 * 绘制折线图
 */
function drawLineChart(ctx, i, series, barWidth, barHeight, maxMark) {
  let item = series[i];
  let color = getColor(i);
  ctx.setLineWidth(2);
  ctx.setStrokeStyle(color);
  ctx.beginPath();
  for (let k = 0; k < item.data.length; k++) {
    let point = getLinePoint(k, item, barWidth, barHeight, maxMark);
    if (k == 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
  ctx.stroke();
  ctx.closePath();
  for (let k = 0; k < item.data.length; k++) {
    let point = getLinePoint(k, item, barWidth, barHeight, maxMark);
    drawPoint(ctx, point.x, point.y, 3, color);
    drawPoint(ctx, point.x, point.y, 1, chartOpt.bgColor);
    drawToolTips(ctx, item.data[k], point.x, point.y - chartOpt.chartSpace, color);
  }
}
function getLinePoint(k, item, barWidth, barHeight, maxMark) {
  let x = barWidth * k + chartOpt.axisLeft + barWidth / 2;
  let y = chartOpt.axisBottom - (barHeight * (item.data[k] / maxMark));
  return { x: x, y: y }
}
function drawPoint(ctx, x, y, radius, color) {
  ctx.setFillStyle(color);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}
/**
 * 绘制饼图
 */
function drawPieChart(ctx, i, series) {
  let item = series[i];

  let x = (chartOpt.right - chartOpt.left) / 2 + chartOpt.left;
  let radius = (chartOpt.axisBottom - chartOpt.axisTop) / 3;
  let y = (chartOpt.axisBottom - chartOpt.axisTop) / 2 + chartOpt.axisTop

  let lastAngel = 0;
  for (let k = 0; k < item.data.length; k++) {
    let color = getColor(k,1);
    let curAngel = 2 / chartOpt.chartPieCount * item.data[k];
    let precent = 100 / chartOpt.chartPieCount * item.data[k];

    drawPieToolTips(ctx, item.data[k] + "(" + Math.round(precent) + "%)", color, x, y, radius, lastAngel, curAngel);

    ctx.setFillStyle(color);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, (lastAngel - 0.5) * Math.PI, (lastAngel + curAngel - 0.5) * Math.PI);
    ctx.fill();
    ctx.closePath();
    lastAngel += curAngel;

  }
}
/**
 * 绘制饼图数据标签
 */
function drawPieToolTips(ctx, value, color, x, y, radius, lastAngel, curAngel) {
  let textWidth = util.mesureText(value, dataSet.xAxis.size);
  let cosc = Math.cos((lastAngel - 0.5 + curAngel / 2) * Math.PI);
  let sinc = Math.sin((lastAngel - 0.5 + curAngel / 2) * Math.PI);
  let x1 = (radius) * cosc + x;
  let y1 = (radius) * sinc + y;

  let x2 = (radius + 20) * cosc + x;
  let y2 = (radius + 20) * sinc + y;

  ctx.setFillStyle(color);
  ctx.setTextAlign(x2 < x1 ? 'right' : 'left');
  ctx.setFontSize(dataSet.xAxis.size);
  ctx.setStrokeStyle(color);
  ctx.setLineWidth(1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  if (x1 >= x && y1 < y) {
    ctx.quadraticCurveTo(x2, y2, x2 + 15, y2)
    ctx.fillText(value, x2 + 15 + chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
  } else if (x1 >= x && y1 >= y) {
    ctx.quadraticCurveTo(x2, y2, x2 + 15, y2)
    ctx.fillText(value, x2 + 15 + chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
  } else if (x1 < x && y1 >= y) {
    ctx.quadraticCurveTo(x2, y2, x2 - 15, y2)
    ctx.fillText(value, x2 - 15 - chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
  } else if (x1 < x && y1 < y) {
    ctx.quadraticCurveTo(x2, y2, x2 - 15, y2)
    ctx.fillText(value, x2 - 15 - chartOpt.textSpace, y2 + dataSet.xAxis.size / 2);
  }
  ctx.stroke();
  ctx.closePath();
}

function getColor2(index) {

    let cLength = dataSet.color1.length;
    if (index >= cLength) {
      return dataSet.color1[index % 2];
    } else {
      return dataSet.color1[index];
    }

  }

/**
 * 获取柱状图颜色值，循环渲染
 */
function getColor(index,tag) {
if(tag==1){
  let cLength = dataSet.color2.length;
  if (index >= cLength) {
    return dataSet.color2[index % cLength];
  } else {
    return dataSet.color2[index];
  }
}else{
  let cLength = dataSet.color2.length;
  if (index >= cLength) {
    return dataSet.color2[index % cLength];
  } else {
    return dataSet.color2[index];
  }
}

}
/**
 * 保存图表为图片
 */
function saveCanvans(func) {
  wx.canvasToTempFilePath({
    canvasId: canvasId,
    success: function (res) {
      console.log(res.tempFilePath)
      // wx.previewImage({
      //   urls: [res.tempFilePath],
      // })
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(ress) {
          console.log(ress)
        }
      })
    }
  })
}