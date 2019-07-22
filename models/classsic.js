import { HTTP } from "../utils/http";
// 最新一期
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
        // 缓存
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    });
  }
  
  getClassic(index, nextOrPrevious, sCallback){
    // 缓存中寻找 or API 获取到新的就重新写入
    // key 确定 key
    let key = nextOrPrevious == 'next' ? this._getKey(index +1) : this._getKey(index - 1)

    let classic = wx.getStorageSync(key)
    // 缓存中没有 向服务器发送请求
    if(!classic){
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
  }

  isFirst(index){
    return index == 1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  getMyFavor(success){
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }
   // 把当前期刊 值 存到 Storage
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }
   // 取值
  _getLatestIndex(){
   let index =  wx.getStorageSync('latest')
   return index
  }

  _getKey(index){
    let key = 'classic-' + index
    return key
  }
}

export {ClassicModel}
