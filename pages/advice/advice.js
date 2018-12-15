import {tools} from "../../tools/tools.js";
import {Request} from "../../utils/request.js";
let request = new Request();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '', //导航栏 中间的标题
      color: "#85C7CA"
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    //限制信息
    alertInfo:["吐槽信息不能为空哦"],
    //是否发送
    isSend:false,
    //吐槽信息
    TuCaoInfo:["",0]
  },
  //返回
  back:function(){
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },
  //限制信息提示
  errorAlert: function (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 2000//持续的时间
    })
  },
  //获取信息
  getInfo: function (ev) {
    var info = ev.detail.value;
    var length = (info + "").length;
    var dataList = [info, length];
    return dataList;
  },
  //获取吐槽内容
  getTuCao: function (ev) {
    this.setData({
      TuCaoInfo: this.getInfo(ev)
    });
    console.log(this.data.TuCaoInfo);
  },

  //吐槽按钮
  sendTuCao:function(){
    let info = this.data.TuCaoInfo;
    if(info[1] == 0){
      let str = this.data.alertInfo[0];
      this.errorAlert(str);
    }
    else{
      request.request({
        url:"/advice",
        data:{
          advice:this.data.TuCaoInfo[0]
        },
        method:"POST",
      }).then(res=>{
        console.log(res);
        setTimeout(()=>{
          wx.switchTab({
            url:"../index/index"
          })
        },1000)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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
    
  }
})