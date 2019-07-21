import {HTTP} from '../utils/http-p'

class BookModel extends HTTP{
  getHotList(){
   return this.request({
     url: "book/hot_list",
   })
  }

  getMyBookCount(){
    return this.request({
      url: "book/favor/count",
    })
  }
  // book 细节
  getDetail(bid){
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  // book 喜欢
  getLikeStatus(bid){
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  // book pingl
  getComments(bid){
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
}

export {BookModel}
