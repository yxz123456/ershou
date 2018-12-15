// pages/itemDetail/itemDetail.js
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
      showCapsule: 1, //是否显示左上角图标
      title: '', //导航栏 中间的标题
      color: "#85C7CA",
      // indexHeight:app.globalData.indexHeight,
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    itemid:null,
    detailInfo:{}
  },

  getDetailInfo(){
    request.request({
      url:`/item/${this.data.itemid}`
    }).then(res=>{
      console.log(res);
      this.formatInfo(res);
    });
  },

  formatInfo(res){
    let temp = res.data.data;
     //解析label信息
     temp.type = tools.getLabelInfo(temp.type);
     //格式化时间
     temp.time = tools.formatDate(temp.time);
     
     //格式化srcs
     temp.srcs = tools.formatSrc(temp.srcs);

     //获取详细描述
     temp.des = temp.des.slice(temp.itemName.length+1,temp.des.length);
  
     temp.buttonText = "联系TA";
     temp.userInfo = {
       avatarUrl:temp.avatarUrl,
       nickName:tools.getUserInfo().nickName
     }
     this.setData({
       detailInfo:temp
     })
  },
   //查看图片详情
   previewImage(ev){
    tools.previewImage(ev,this.data.detailInfo.srcs);
  },

  //打电话
  callUser(){
    wx.makePhoneCall({
      phoneNumber:this.data.detailInfo.phoneNumber
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      itemid:options.id
    })
    this.getDetailInfo();
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