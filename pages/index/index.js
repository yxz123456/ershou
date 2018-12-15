//index.js
//获取应用实例
import {tools} from "../../tools/tools.js";
import {Request} from "../../utils/request.js";
let request = new Request();
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 0, //是否显示左上角图标
      title: '武院二手市场', //导航栏 中间的标题
      color: "#85C7CA",
      indexHeight:app.globalData.indexHeight,
    },// 此页面 页面内容距最顶部的距离
    
    height:app.globalData.height * 2 + 20,
    //listItem
    publishInfo:[],
    
    userInfoFlag:tools.getUserInfo() && tools.getUserInfo().nickName
  },

  //获得所有item
  getAllItem(){
    return request.request({
      url:`/item/`
    })
  },
  //设置用户发布信息
  setPublishInfo(){
    let PublishInfo = [];
    this.getAllItem()
    .then(res=>{
      if(res){
        console.log("全部item",res.data.data)
        let dataArr = res.data.data;
        let temp = {};
        dataArr.forEach((val,index)=>{
          temp = val;
          //解析label信息
          temp.type = tools.getLabelInfo(temp.type);
          //格式化时间
          temp.time = tools.formatDate(temp.time);
          
          //格式化srcs
          temp.srcs = tools.formatSrc(temp.srcs);

          //获取详细描述
          temp.des = temp.des.slice(temp.itemName.length+1,temp.des.length);
        
          temp.num = dataArr.length -1 - index;
          temp.buttonText = "联系TA";
          temp.userInfo = {
            avatarUrl:temp.avatarUrl,
            nickName:temp.nickName
          }
          PublishInfo.push(temp);
        })
        // console.log(myPublishInfo);
        this.setData({
          publishInfo:PublishInfo.reverse()
        })
      }
      
    })
  },
  //打电话
  buttonTap(ev){
    wx.makePhoneCall({
      phoneNumber:ev.currentTarget.dataset.tel
    })
  },

  //查看图片详情
  previewImage(ev){
    let index = ev.target.dataset.num;
    
    tools.previewImage(ev,this.data.publishInfo[index].srcs);
  },

  //查看详情信息
  getDetailInfo(ev){
    console.log(ev);
    let index = ev.currentTarget.dataset.index;
    console.log(index);
    let itemId = this.data.publishInfo[index].id;
    wx.navigateTo({
      url:`../itemDetail/itemDetail?id=${itemId}`
    })
  },

  //判断是否能获取头像
  judgeUserInfo(){
    if(tools.getUserInfo() && tools.getUserInfo().nickName){
      this.setData({
        userInfoFlag:true
      })
    }
  },

  //获取用户头像
  getUserInfo(e) {
    let userInfo = tools.getUserInfo();
    
    userInfo.nickName = e.detail.userInfo.nickName;
    userInfo.avatarUrl = e.detail.userInfo.avatarUrl;

    tools.setLocalInfo("userInfo",userInfo);
    this.judgeUserInfo();
    console.log(e.detail.userInfo);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.judgeUserInfo();
    this.setPublishInfo();
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
    this.setPublishInfo();
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
    this.setPublishInfo();
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
