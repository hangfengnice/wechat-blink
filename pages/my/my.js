// pages/my/my.js
import {
  ClassicModel
} from '../../models/classsic'
import {
  BookModel
} from '../../models/book'
const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户是否授权
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
  },
  getMyFavor(){
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  getMyBookCount(){   
    bookModel.getMyBookCount()
    .then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },
  userAuthorized(){
    wx.getSetting({
      success:(data) => {
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:(data) => {
              console.log(data)
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }else{
          console.log("no login")
        }
      }
    }) 
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  onJumpToAbout(){
    wx.navigateTo({
      url: "/pages/about/about"
    })
  },
  onStudy(){
    wx.navigateTo({
      url: "/pages/course/course"
    })
  }
})