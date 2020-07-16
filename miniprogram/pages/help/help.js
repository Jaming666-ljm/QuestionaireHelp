// miniprogram/pages/help/help.js
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
  saveImg(e){
    let url = e.currentTarget.dataset.url;
    //用户需要授权
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success:()=> {
              // 同意授权
              this.saveImg1(url);
            },
            fail: (res) =>{
              console.log(res);
            }
          })
        }else{
          // 已经授权了
          this.saveImg1(url);
        }
      },
      fail: (res) =>{
        console.log(res);
      }
    })   
  },
  saveImg1(url){
    wx.getImageInfo({
      src: url,
      success:(res)=> {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath:path,
          success:(res)=> { 
            console.log(res);
          },
          fail:(res)=>{
            console.log(res);
          }
        })
      },
      fail:(res)=> {
        console.log(res);
      }
    })
  },
})