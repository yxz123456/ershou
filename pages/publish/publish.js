import {tools} from "../../tools/tools.js";
import {Request} from "../../utils/request.js";

const request = new Request();
const app = getApp();
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
      color: "#85C7CA"
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
    chooseImgInfo:['图片选择成功','图片选择失败','只能选择7张图片'],
    //标签有没有被点击
    labelList: [false, false, false, false, false],
    //标签内的文本
    labelText:{
      0:{
        type:"学习用品",
        id:2
      },
      1:{
        type:"电子产品",
        id:3
      },
      2:{
        type:"生活用品",
        id:6
      },
      3:{
        type:"体育用品",
        id:1
      },
      4:{
        type:"其他",
        id:8
      },
      length:5
    },
    //选择的标签的信息
    labelInfo:"",
    //图片信息
    imgInfo:[],
    serverImg:[],
    // 是否发送
    isSend:false,

    //用户信息
    userInfo:{}
  },

  // 运动用品 学习用品 电子产品 -> 1 2 3 
  // 生活用品 其他用品 -> 6 8

  //标签转数字
  //点击后切换标签颜色
  changeLabelColor:function(index,ev){
    let labelList = this.data.labelList;
    let len = labelList.length;
    //取出当前标签的id
    let info = ev.target.dataset.id;
    for(let i = 0; i < len; i++){
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
    console.log(this.data.labelInfo);
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
    console.log(this.getInfo(ev));
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
      tools.infoAlert(str);
    }
  },
  //删除图片
  deleteImg(ev){
    let index = ev.currentTarget.dataset.index;
    let imgInfo = this.data.imgInfo;
    imgInfo.splice(index,1);
    this.setData({
      imgInfo:imgInfo
    })
  },
  //获取用户图片信息
  getPicture:function(){
    let newImgInfo = this.data.imgInfo;
    if(newImgInfo.length < 3){
      wx.chooseImage({
        //个数限制
        count:3-newImgInfo.length,
        sizeType: ['compressed'],
        //成功回调
        success:(res) =>{
          console.log(res);
          res.tempFilePaths.forEach((val,index)=>{
            newImgInfo.push(val);
          });
          this.setData({
            imgInfo:tools.map(newImgInfo)
          });
          //成功提示
          let str = this.data.chooseImgInfo[0];
          tools.infoAlert(str);
          console.log(this.data.imgInfo);
        },
        //失败回调
        fail:()=>{
          //失败提示
          let str = this.data.chooseImgInfo[1];
          tools.infoAlert(str);
        }
      })
    }
    else{
      let str = this.data.chooseImgInfo[2];
      tools.infoAlert(str);
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
    let title = this.data.title[0];
    let detail = this.data.detail[0];
    let tel = this.data.tel[0];
    let name = this.data.name[0];
    let img = tools.map(this.data.imgInfo).join('|');
    console.log(img.length);
    if (!title || !detail || !tel || !name || img.length == 0 || !this.checkLabel()){
      var str = this.data.waringInfo[1];
      tools.infoAlert(str);
      return;
    }
    else{
      //this.postData();
      this.post();
    }
  },
  //上传数据
  postData(){
    //数据
    let data = {
      itemName:this.data.title[0],
      des:this.data.detail[0],
      srcs:tools.map(this.data.serverImg).join('|'),
      type:this.data.labelInfo,
      realName:this.data.name[0],
      phoneNumber:this.data.tel[0]
    };
    return request.request({
        url:`/item/${this.data.userInfo.id}`,
        data,
        method:"POST",
    });

  },

  // postImg1(index,num,imgArr,imgInfo){
  //   if(index == num-1){
  //     return request.uploadFile({
  //       filePath:imgInfo[index],
  //       name:"img"
  //     })
  //   }
  //   return request.uploadFile({
  //     filePath:imgInfo[index],
  //     name:"img"
  //   }).then(res=>{
  //     //图片存储到本地
  //     data = JSON.parse(res.data);
  //     console.log(data);
  //     imgArr.push(data.data.imgServerPath);
  //     this.postImg(index+1,num,imgArr);
  //   })
  // },

  //上传图片
  postImg(){
    let imgInfo = this.data.imgInfo;
    //图片长度
    let len = imgInfo.length;
    console.log(len);
    //存服务器返回的数据
    let data;
    //存服务器返回的src
    let imgArr = [];

    for(let i = 0; i < len; i++){
      if(i == len - 1){
        return request.uploadFile({
          filePath:imgInfo[i],
          name:"img"
        })
      }
      request.uploadFile({
        filePath:imgInfo[i],
        name:"img"
      }).then(res=>{
        //图片存储
        data = JSON.parse(res.data);
        console.log(data);
        imgArr.push(data.data.imgServerPath);
        // console.log(imgArr);
        if(i == len - 2){
          this.setData({
            serverImg:imgArr,
            imgFinish:true       
          })
          console.log(this.data.serverImg)
        }
      })
    }
  },

  // 上传
  post(){
    // let imgInfo = this.data.imgInfo;
    
    // //存服务器返回的src
    // let imgArr = [];

    this.postImg()
    //图片上传
    .then(res=>{
      let imgArr = this.data.serverImg;
      //图片存储到本地
      let data = JSON.parse(res.data);
      console.log(data);
      imgArr.push(data.data.imgServerPath);
      // console.log(imgArr);
      this.setData({
        serverImg:imgArr,
        imgFinish:true
      })
      console.log(this.data.serverImg);
      return this.postData();
    })
    //数据上传
    .then(res => {
      tools.infoAlert("发布成功");
      //隔半秒跳转回主页
      setTimeout(() => {
        wx.switchTab({
          url:'../index/index'
        })
        // this.clearData();
      }, 1000);
      //清空数据
      
    })
    .catch(res =>{
      tools.infoAlert("发布失败");
      console.log("失败");
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:tools.getUserInfo()
    })
    console.log(this.data.userInfo);
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