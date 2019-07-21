import config from '../config.js'
const tips = {
  1: "抱歉, 出现了一个错误",
  1005: "appkey无效",
  1007: `The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.`,
  3000: "期刊不存在"
}

class HTTP{
  request({url, data={}, method="GET"}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data={}, method='GET'){ 
 
    wx.request({
      url: config.api_base_url + url,
      method: method, 
      header: {
        "content-type": "application/json",
        appkey: config.appkey
      },
      data: data,
      success: (res) => {
        let code = res.statusCode.toString()
        if(code.startsWith('2')){
         resolve(res.data)
        }else{
          reject()
          console.log(res)
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) =>  {
        reject()
        this._show_error(1)
      }
    })
  }

  _show_error(error_code){
    if(!error_code){
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[0],
      icon: "none",
      duration: 2000
    })
  }
}

export {HTTP}
