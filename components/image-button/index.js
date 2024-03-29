// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    },
    imageSrc: {
      type: String
    },
    bindgetuserinfo: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties.openType)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
     this.triggerEvent('getuserinfo',event.detail, {}) 
    }
  }
})
