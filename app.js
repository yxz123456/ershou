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

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.userCode = res.code;
        this.getUserInfo();
        console.log(res)        
        let code = res.code
        let url = `https://ikebo.cn/flea/api/v1/user/${code}`
        wx.request({
          url: url,
          success: (res) => {
            console.log(res)
            let data = res.data
            if (data.code === 1) {
              wx.setStorageSync('user', data.data);
              console.log('用户数据缓存成功');
            }
          }
        })
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              
              //将用户头像存储在本地
              tools.setLocalInfo('userInfo',res.userInfo);
        
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取设备顶部窗口的高度（不同设备窗口高度不一样，根据这个来设置自定义导航栏的高度）
    //这个最初我是在组件中获取，但是出现了一个问题，当第一次进入小程序时导航栏会把
    //页面内容盖住一部分,当打开调试重新进入时就没有问题，这个问题弄得我是莫名其妙
    //虽然最后解决了，但是花费了不少时间
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    })
  
  },
  globalData: {
    userInfo: null,
    share: false,  // 分享默认为false
    height: 0,
    userCode:null,
  },
  getUserInfo(){
    request.request({
      url:`/user/${1}`
    }).then(res=>{
      console.log(res);
    })
  }


})