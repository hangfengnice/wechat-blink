import config from '../config.js'
const tips = {
  1: "抱歉, 出现了一个错误",
  1005: "appkey无效",
  1007: `The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.`,
  3000: "期刊不存在"
}

class HTTP{
  request(params){
    if(!params.method){
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method, 
      header: {
        "content-type": "application/json",
        appkey: config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
          params.success(res.data)
        }else{
          console.log(res)
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) =>  {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: "none",
      duration: 2000
    })
  }
}

export {HTTP}
