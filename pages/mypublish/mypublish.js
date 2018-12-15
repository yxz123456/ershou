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
    //listItem列表数据
    
    publishInfo:[],
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    arr:[1,2,3,4,5,6],
    userInfo:{}
  },
  //返回
  back: function () {
    wx.switchTab({
      url: '/pages/personal/personal',
    })
  },

  //删除按钮
  buttonTap(ev){
    // console.log(ev)
    let index = ev.target.dataset.num;
    console.log(index);
    wx.showModal({
      title:"提示",
      content:"您确定要删除吗？",
      success:(res)=>{
        if(res.confirm){
          this.deleteItem(index);
          tools.infoAlert("删除成功");
        }
      },
      fail(){
        console.log(0);
      }
    })
  },
  //物品删除
  deleteItem(index){
    request.request({
      url:`/item/${this.data.publishInfo[index].id}`,
      method:"DELETE",
      data:""
    }).then(res=>{
      console.log("shanchu");
      this.setMyPublishInfo();
      // this.data.publishInfo.splice(index,1);
      // let publishArr = this.data.publishInfo;
      // this.setData({
      //   publishInfo:publishArr
      // })
    })
  },

  //查看图片详情
  previewImage(ev){
    let index = ev.target.dataset.num;
    
    tools.previewImage(ev,this.data.publishInfo[index].srcs);
  },


  //获取我的发布
  getMyPublish(){
    return request.request({
      url:`/user/publish/${this.data.userInfo.id}`
    }); 
  },

  //设置用户发布信息
  setMyPublishInfo(){
    let myPublishInfo = [];
    this.getMyPublish().then(res=>{
      console.log(res.data.data)
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

        temp.num = dataArr.length -1 - index;
        temp.buttonText = "删除";
        temp.userInfo = tools.getUserInfo();
        myPublishInfo.push(temp);
      })
      // console.log(myPublishInfo);
      this.setData({
        publishInfo:myPublishInfo.reverse()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:tools.getUserInfo()
    })
    this.setMyPublishInfo();
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
    this.setData({
      userInfo:tools.getUserInfo()
    })
    this.setMyPublishInfo();
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
    wx.startPullDownRefresh();
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