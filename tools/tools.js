//获得本地存储的用户信息

let tools = {
    getUserInfo(target){
        let targetInfo = JSON.parse(wx.getStorageSync(target));
        return targetInfo;
      }
}


export {
    tools
};