//获得本地存储的用户信息

let tools = {
    //设置本地信息
    setLocalInfo(key,value=""){
        let info = JSON.stringify(value);
        wx.setStorageSync(key,info);
    },

    //获取本地信息
    getLocalInfo(key){
        let targetInfo = JSON.parse(wx.getStorageSync(key));
        return targetInfo;
    },

    //查看图片详情
    previewImage(ev,imgInfo){
        let srcArr = imgInfo;
        let index = ev.currentTarget.dataset.index;
        wx.previewImage({
          urls:srcArr,
          current:srcArr[index]
        })
    },

    //获取用户信息
    getUserInfo(){
        return this.getLocalInfo('userInfo');
    },

    //数组去除空项
    map(arr){
        let newArr = [];
        arr.forEach(function(val,index){
            if(val){
                newArr.push(val);
            }
        })
        return newArr;
    }
}


export {
    tools
};