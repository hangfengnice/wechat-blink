// pages/book/book.js
import {
  BookModel
} from '../../models/book'
import {
  random
} from '../../utils/common'

const bookModel = new BookModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {  
    books: [],
    searching: false,
    more: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Promise 对象
   bookModel.getHotList()
   .then(res => {
    // console.log(res)
    this.setData({
      books: res
    })
   })
  },

  onSearching(event){
    this.setData({
      searching: true
    })
  },

  onCancel(event){
    this.setData({
      searching: false
    })
  },
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
    this.setData({
      more: random(10)
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})