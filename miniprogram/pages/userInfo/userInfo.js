// miniprogram/pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    questionNum:0,
    userquestions:[],
  },
  ongetuserinfo:async function(e){
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log("获取用户信息成功", res)
              that.setData({
                name: res.userInfo.nickName,
                imgurl:res.userInfo.avatarUrl,
                islogin:!that.data.islogin
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
          wx.cloud.callFunction({name:'getuser'}).then((res)=>{
            console.log(res)
            const db=wx.cloud.database()
            let num
            if(res.result.questionNum.length==0){
              db.collection('userInfo').add({
                data:{num:0}
              })
              num=0
            }
            else num=res.result.questionNum[0].num
            that.setData({
              userquestions:res.result.userquestions,
              questionNum:num
            })
          })
          //查询已填写的问卷数
        } else {
          console.log("未授权=====")
        }
      }
    })

    
  },
  Toquestion:function(e){
    wx.navigateToMiniProgram({
      appId: 'wxd947200f82267e58',
      path:e.currentTarget.dataset.url
    })
  },
  tohelp:function(){
    wx.navigateTo({
      url:'../help/help'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ongetuserinfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})