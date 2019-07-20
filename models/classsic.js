import { HTTP } from "../utils/http";
// 最新一期
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
      }
    });
  }
  
  getClassic(index, nextOrPrevious, sCallback){
    this.request({
      url: 'classic/' + index + '/' + nextOrPrevious,
      success: res => sCallback(res)
    })
  }

  // // 获取上一期
  // getPrevious(index, sCallback){
  //   this.request({
  //     url: 'classic/' + index + '/previous',
  //     success: res => sCallback(res)
  //   })
  // }

  // getNext(){
  //   this.request({
  //     url: 'classic/' + index + '/next',
  //     success: res => sCallback(res)
  //   })
  // }

  isFirst(index){
    return index == 1 ? true : false
  }

  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
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
}

export {ClassicModel}
