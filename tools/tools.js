//获得本地存储的用户信息
import {Request} from "../utils/request.js";
let request = new Request();
let tools = {
    //设置本地信息
    setLocalInfo(key,value=""){
        //如果是用户信息，且有头像和名字
        console.log("用户信息",value.nickName)
        console.log(value.avatarUrl)
        if(key == "userInfo" && value.nickName != null){
            this.updateUserInfo(value).then(res=>{
                console.log("存name",res);
            })
        }
        let info = JSON.stringify(value);
        wx.setStorageSync(key,info);
    },
    
    //更新用户头像和姓名
    updateUserInfo(info){
        return request.request({
            url:`/user/avatar/${info.id}`,
            data:{
                avatarUrl:info.avatarUrl,
                nickName:info.nickName
            },
            method:"POST"
        });
    },

    //获取本地信息
    getLocalInfo(key){
        if(wx.getStorageSync(key)){
            let targetInfo = JSON.parse(wx.getStorageSync(key));
            return targetInfo;
        }
    },

    //查看图片详情
    previewImage(ev,imgInfo){
        let srcArr = imgInfo;
        let index = ev.currentTarget.dataset.index;
        console.log(index);
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
    },

    //获取标签信息
    getLabelInfo(num){
        switch(num){
            case 1: return "体育用品";
            case 2: return "学习用品";
            case 3: return "电子用品";
            case 6: return "生活用品";
            case 8: return "其他";
        }
    },

    //srcs转数组
    formatSrc(srcs){
        let srcArr = srcs.split("|");
        let newSrcArr = srcArr.map((val,index)=>{
            return "https://ikebo.cn/flea" + val;
        })
        while(1){
            if(newSrcArr.length < 3){
                newSrcArr.push("");
            }else{
                return newSrcArr;
            }
        }
        
    },
    //格式化日期
    formatDate(string){
        let arr = string.split(" ");
        return arr[3]+"-"+this.formatMonth(arr[2])+"-"+arr[1] + " "+arr[4];
    },

    //转换月份
    formatMonth(str){
        switch(str){
            case "Jan": return "01";
            case "Feb": return "02";
            case "Mar": return "03";
            case "Apr": return "04";
            case "May": return "05";
            case "Jun": return "06";
            case "Jul": return "07";
            case "Aug": return "08";
            case "Sep": return "09";
            case "Oct": return "10";
            case "Nov": return "11";
            case "Dec": return "12";
        }
    },

    //消息提示
    infoAlert:function(str){
        wx.showToast({
          title: str,
          icon: 'none',
          duration: 2000//持续的时间
        })
      },
}


export {
    tools
};