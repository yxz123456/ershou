//index.js
//获取应用实例
import {tools} from "../../tools/tools.js";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '', //导航栏 中间的标题
      color: "#85C7CA"
    },// 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    info:{
      buttonText:"联系ta",
      labelText:"学习用品",
      imgInfo:["","","",""],
      phoneNumber:'15826855545'
    }
    
  },
  //打电话
  buttonTap(ev){
    wx.makePhoneCall({
      phoneNumber:ev.currentTarget.dataset.tel
    })
  },


  previewImage(ev){
    tools.previewImage(ev,this.data.info.imgInfo);
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
