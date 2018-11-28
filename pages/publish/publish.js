import {tools} from "../../tools/tools.js";
const app = getApp()
Page({
  //index.js
  //获取应用实例

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标
      title: '发布', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    // 各类信息
    title:[],
    detail:[],
    name:[],
    tel:[],
    //'标题必须15字以内','详细内容不能超过200字','名字不能超过8个字',
    waringInfo:['电话号码必须为11位','信息或标签不能为空'],
    chooseImgInfo:['图片选择成功','图片选择失败','只能选择6张图片'],
    //标签有没有被点击
    labelList: [false, false, false, false, false],
    //标签内的文本
    labelText:["学习用品","电子产品","生活用品","体育用品","其他"],
    //选择的标签的信息
    labelInfo:"",
    //图片信息
    imgInfo:["","",""]
  },

  //点击后切换标签颜色
  changeLabelColor:function(index,ev){
    var labelList = this.data.labelList;
    var len = labelList.length;
    var info = ev.target.dataset.text;
    for(var i = 0; i < len; i++){
      if(i == index){
        labelList[i] = !labelList[i];
      }
      else{
        labelList[i] = false;
      }
    }
    this.setData({
      labelList:labelList,
      labelInfo:info
    })
  },
  //1-5标签选择
  choose:function(ev){
    let index = ev.currentTarget.dataset.index;
    this.changeLabelColor(index,ev);
    
  },
  
  //限制信息提示
  errorAlert:function(str){
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 2000//持续的时间
    })
  },
  //获取信息
  getInfo:function(ev){
      var info = ev.detail.value;
      var length = (info+"").length;
      var dataList = [info,length];
      return dataList;
  },
  //获取标题内容
  getTitle:function(ev){
    this.setData({
      title:this.getInfo(ev)
    })
  },
  //获得详细描述
  getDetail: function (ev) {
    this.setData({
      detail: this.getInfo(ev)
    })
  },
  //获得用户姓名
  getUserName: function (ev) {
    this.setData({
      name: this.getInfo(ev)
    })
  },
  //获得用户电话
  getTel: function (ev) {
    this.setData({
      tel: this.getInfo(ev)
    })
    //判断是否为11位
    if(this.data.tel[1]!=11){
      var str = this.data.waringInfo[0];
      this.errorAlert(str);
    }
  },
  //获取用户图片信息
  getPicture:function(){
    let newImgInfo = ["","",""];
    if(newImgInfo.length <= 6){
      wx.chooseImage({
        //个数限制
        count:6,
        //成功回调
        success:(res) =>{
          res.tempFilePaths.forEach((val,index)=>{
            if(index <= 3){
              newImgInfo.splice(index,1,val);
            }
            else{
              newImgInfo.push(val);
            }
          });
          this.setData({
            imgInfo:newImgInfo
          });
          //成功提示
          let str = this.data.chooseImgInfo[0];
          this.errorAlert(str);
          console.log(this.data.imgInfo);
        },
        //失败回调
        fail:()=>{
          //失败提示
          let str = this.data.chooseImgInfo[1];
          this.errorAlert(str);
        }
      })
    }
    else{
      let str = this.data.chooseImgInfo[2];
      this.errorAlert(str);
    }
   
  },
  //查看图片详情
  previewImage(ev){
    tools.previewImage(ev,this.data.imgInfo);
  },
  //判断标签是否选择
  checkLabel:function(){
    var label = this.data.labelList;
    for(var i = 0; i < label.length; i++){
      if(label[i]){
        return true;
      }
    }
    return false;
  },
  //绑定发布按钮
  send:function(){
    var title = this.data.title[0];
    var detail = this.data.detail[0];
    var tel = this.data.tel[0];
    var name = this.data.name[0];
    var img = this.data.imgInfo;
    if (!title || !detail || !tel || !name || img.length==0 || !this.checkLabel()){
      var str = this.data.waringInfo[1];
      this.errorAlert(str);
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