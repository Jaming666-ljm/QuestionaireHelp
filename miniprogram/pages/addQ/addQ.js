// miniprogram/pages/addQ/addQ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    binurl:'',
    qtitle:'',
    qintroduction:'',
    qkey:'',
    qurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  choseimg:function(){
    wx.chooseImage({
      count:1,
      success: (res) => {
        this.setData({
          binurl:res.tempFilePaths[0]
        })
      },
    })
  },
  formsubmit:async function(e){
    let that=this
    wx.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']){
          this.addQ(e)
        }
        else{
          wx.showModal({
            content:'请先登录',
            success:function(res){
              if(res.confirm){wx.switchTab({
                url: '../userInfo/userInfo',
              })}
              else{
                return
              }
            }
          })
        }
      }
    
    })
  },
  addQ:async function(e){
    const db=wx.cloud.database();
    const collection=db.collection("questionaires");
    if(e.detail.value.title.length&&e.detail.value.keyword.length&&e.detail.value.url.length&&e.detail.value.introduction.length&&this.data.binurl.length==0){
      wx.showModal({
        content: '请添加缺省的内容/二维码!',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            return
          }
        }
      })
    }
    let id=e.detail.value.url.split('/');
    id=id[id.length-1].split('.')[0];
    let path='pages/wjxqList/wjxqList?activityId='+id;
    try{const res=await collection.add({
      data:{
        title:e.detail.value.title,
        keyword:e.detail.value.keyword,
        path:path,
        url:this.data.binurl,
        introduction:e.detail.value.introduction,
        side:e.detail.value.side,
        class:e.detail.value.class,
        num:0,
        date:new Date().toLocaleString()
      } 
    })
    this.setData({
      binurl:'',
      qtitle:'',
      qintroduction:'',
      qkey:'',
      qurl:''
    })
    wx.showModal({
      content: '发布成功!即将跳转到发布注意事项,请根据教程操作',
      showCancel:false,
      success:function(res){
        if(res.confirm){
          wx.navigateTo({
            url: '../help/help',
          })
        }
      }
    })
    
  }catch(err){console.log(err)}
  }
})