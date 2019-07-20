// pages/classic/classic.js
import {ClassicModel} from '../../models/classsic'
import {LikeModel} from '../../models/like'
let classsicModel = new ClassicModel()
let likemodel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 最新的期刊  Storage
     classsicModel.getLatest(res => {
       console.log(res)
      this.setData({
        classic: res
      })
      // latestClassic currentClassic



     })
  },
  onLike(event){
    // console.log(event)
    let behavior = event.detail.behavior
    console.log(behavior)

    likemodel.like(behavior,this.data.classic.id,this.data.classic.type)

  },
  // 前往下一期 新一些的一期
  onNext(event){
     this._updateClassic('next')
  },
  // 前往旧的一期
  onPrevious(event){
    this._updateClassic('previous')
  },
  // 封装
  _updateClassic(nextOrPrevious){
    let index = this.data.classic.index
    classsicModel.getClassic(index, nextOrPrevious, res => {
      // console.log(res)
      this.setData({
        classic: res,
        latest: classsicModel.isLatest(res.index),
        first: classsicModel.isFirst(res.index)
      })
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
