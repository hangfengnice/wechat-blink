// components/classic/music/index.js
import {classicBeh} from '../classic-beh'
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png"
  },
  /**
   * 组件的方法列表
   */
  attached(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached(event){
    // mMgr.stop()
  },
  methods: {
    onPlay(){
      // 图片切换

      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
        mMgr.startTime = 20
        mMgr.singer = '200'

      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
        mMgr.title = this.properties.title
      }
    },

    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch(){
      mMgr.onPlay(() => {
        console.log('play')
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        console.log('pause')
        this._recoverStatus()
      })
      // 关掉背景页面的界面
      mMgr.onStop(() => {
        console.log('stop')
        this._recoverStatus()
      })
      // 自然的播放完成
      mMgr.onEnded(() => {
        console.log('end')
        this._recoverStatus()
      })
    }
  }
})
