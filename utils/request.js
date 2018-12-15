

class Request{
    // baseUrl = "https://api.apiopen.top/EmailSearch?number=1012002";
    // baseUrl = 'https://www.easy-mock.com/mock/5bf4d73dc713ab09b02bca8f/flea/api/v1';
    baseUrl = 'https://ikebo.cn/flea/api/v1';
    // baseUrl = "http://100.64.48.144:4000/flea/api/v1";

    request({url,method='GET',data={}}){
        return new Promise((resolve,reject)=>{
            wx.request({
                url: this.baseUrl + url,
                method:method,
                data:data,
                success:(res) => {
                    // console.log("res",res);
                    resolve(res);
                },
                fail:(err)=>{
                    reject(err);
                    console.log("err",err);
                }
            })
        })
    }

    uploadFile({filePath,name}){
        return new Promise((resolve,reject) => {
            wx.uploadFile({
                url:this.baseUrl + '/item/upload_img',
                filePath,
                name,
                success:(res) => {
                    console.log("uploadFile",res);
                    resolve(res);    
                },
                fail:(err) => {
                    console.log("uploadFileErr",err);
                    reject(err);                   
                }
            })
        })
    }

    _showError(){
        wx.showToast({
            title:'请求错误',
            icon:"none"
        })
    }
}

export {
    Request
}