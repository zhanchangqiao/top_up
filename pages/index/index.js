//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: getApp().globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userinfo: {},
    listData: [
      {name:'语文',url:'/static/tabs/yuwen.png',progress:'20'},
      {name:'数学',url:'/static/tabs/shuxue.png',progress:'30'},
      {name:'英语',url:'/static/tabs/yingyu.png',progress:'40'},
      {name:'计算机',url:'/static/tabs/jisuanji.png',progress:'50'},
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // eventChannel.on('userinfo', function(data) {
    //   console.log(data)
    // })
    var userinfo = getApp().globalData.userinfo1
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
