//app.js
import {Request} from "utils/request.js";
import {tools} from "tools/tools.js"

const request = new Request();
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.login()
    .then(res=>{
      return this.getSetting();
    })
    .then(res=>{
      this.getUserInfo();
    })
   
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     this.globalData.userCode = res.code;
    //     //获取用户信息
    //     this.getUserInfo();
    //   }
    // })
    
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     console.log(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       console.log(1);
    //       wx.getUserInfo({
    //         success: res => {
    //           this.globalData.userInfo = res.userInfo;
    //           // 获取用户信息
    //           // this.getUserInfo();
    //           console.log(123,res.userInfo);
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight;
        this.globalData.indexHeight = res.screenHeight*0.12 ;
        console.log(this.globalData.indexHeight);
        console.log("height",res);
      }
    })
  
  },
  globalData: {
    userInfo: null,
    share: false,  // 分享默认为false
    height: 0,
    userCode:null,
    indexHeight:0
  },

  login(){
    // 登录
    return new Promise((resolve,reject)=>{
      wx.login({
        success: res => {
          if(res.code){
            resolve(res);
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            this.globalData.userCode = res.code;
          }
        }
      })
    });
  },

  getSetting(){
    return new Promise((resolve,reject)=>{
      // 获取用户信息
      wx.getSetting({
        success: res => {
          console.log("getSetting",res);
          if (res.authSetting['scope.userInfo']) {
            resolve();
            wx.getUserInfo({
              success: res => {
                this.globalData.userInfo = res.userInfo;
                // console.log("userInfo",res.userInfo);
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    })
  },

  getUserInfo(){
    request.request({
      url:`/user/${this.globalData.userCode}`
    }).then(res=>{
      //用户数据储存到本地
      if(res.data.code == 1){
        let data = res.data
        if(this.globalData.userInfo){
          data.data.nickName = this.globalData.userInfo.nickName;
          data.data.avatarUrl = this.globalData.userInfo.avatarUrl;
        }
        tools.setLocalInfo('userInfo', data.data);
        console.log('用户数据缓存成功');
      }
    })
  }
})