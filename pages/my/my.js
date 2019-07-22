// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户是否授权
    this.userAuthorized()
    // wx.getUserInfo({
    //   success: data => {
    //     console.log(data)
    //   }
    // })
  },
  userAuthorized(){
    wx.getSetting({
      success(data){
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success(data){
              console.log(data)
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
    console.log(userInfo)
  },

  
})