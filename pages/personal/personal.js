import {tools} from "../../tools/tools.js";
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '', //导航栏 中间的标题
      color:"#85C7CA"
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    userInfo:""
  },
  toAttestation:function(){
    wx.navigateTo({
      url: '../attestation/attestation'　　// 个人认证
    })
  },
  toMyPublish:function(){
    wx.navigateTo({
      url: '../mypublish/mypublish'　　// 我的发布
    })
  },
  toTuCao:function(){
    wx.navigateTo({
      url: '../advice/advice'　　// 吐槽页面
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获得用户信息
    this.setUserInfo();
  },

  //设置用户信息
  setUserInfo(){
    let userInfo = tools.getLocalInfo('userInfo');
    this.setData({
      userInfo:userInfo
    })
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