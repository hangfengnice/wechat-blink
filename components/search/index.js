// components/search/index.js
import {KeywordModel} from '../../models/keyword'
import {BookModel} from '../../models/book'
import {paginationBev} from '../behavious/pagination'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: "loadMore"
    }
  },
   /**
   * 组件的初始数据
   */
  data: { 
    historyWords: [],
    hotWords: [],
    searching: false,
    q:'',
    loading: false,
    loadingCenter: false
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
    loadMore(){
      if(!this.data.q){
        return
      }
      if(this._isLocked()){
        return
      }
      if(this.hasMore()){
        this._locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
        .then(res => {
          console.log(res)
          this.setMoreData(res.books)
          this._unLocked()
        }, () => {this._unLocked}) // 解锁
      }
    },

    _isLocked(){
      return this.data.loading ? true : false
    },
    _locked(){
      this.setData({
        loading : true
      })
    },
    _unLocked(){
      this.setData({
        loading : false
      })
    },

    onCancel(event){
      this.initialize()
       this.triggerEvent('cancel', {}, {})
    },
    onDeleteSearch(event){
      this.initialize()
      this._closeResult()
    },
    onConfirm(event){
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        console.log(res)
        this.setMoreData(res.books)
        this.setTotal(res.total)
        /* 正确了 在保存 */
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter: false
      })
    },
    _showResult(){
      this.setData({
        searching: true
      })
    },
    _closeResult(){
      this.setData({
        searching: false,
        q: ""
      })
    }
  }
})
