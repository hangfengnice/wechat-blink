// components/search/index.js
import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
   /**
   * 组件的初始数据
   */
  data: { 
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    inputValue: ''
  },

  lifetimes: {
    attached: function() {
      this.setData({
        historyWords: keywordModel.getHistory()
      })
      // 热门搜索
      keywordModel.getHot().then(res => {
        // console.log(res.hot)
        this.setData({
          hotWords: res.hot
        })
      })
    }
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
       this.triggerEvent('cancel', {}, {})
    },
    onDelete(event){
      this.setData({
        searching: false
      })
    },
    onConfirm(event){
      this.setData({
        searching: true
      })
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        console.log(res)
        this.setData({
          dataArray: res.books,
          inputValue: q
        })
        /* 正确了 在保存 */
        keywordModel.addToHistory(q)

      })
    }
  }
})
