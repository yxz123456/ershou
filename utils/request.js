

class Request{
    // baseUrl = "https://api.apiopen.top/EmailSearch?number=1012002";
    baseUrl = 'https://www.easy-mock.com/mock/5bf4d73dc713ab09b02bca8f/flea/api/v1';
    // baseUrl = 'https://ikebo.cn/flea/api/v1';

    request({url,method='GET',data={}}){
        return new Promise((resolve,reject)=>{
            wx.request({
                url: this.baseUrl + url,
                method:method,
                data:data,
                success:(res) => {
                    resolve(res);
                },
                fail:(res)=>{
                    reject(res);
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