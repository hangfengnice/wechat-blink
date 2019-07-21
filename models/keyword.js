// 业务级
import {HTTP} from '../utils/http-p'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory(){
    const words = wx.getStorageSync(this.key)
    return words ? words : [] 
  }

  getHot(){
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addToHistory(keyword){
    let words = this.getHistory() 
    const has = words.includes(keyword)
    if(!has){
      if(words.length == this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
    
  }
}

export {KeywordModel}