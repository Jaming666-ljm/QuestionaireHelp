// pages/homePage/homePage.js
Page({

  /**
   * 组件的初始数据
   */
  data: {
    showchose:true,
    query:{
      pagenum:1,
      side:'校内',
      order:'最新',
      class:'行为调查',
      key:''
    }
  },
  onReachBottom:async function(){
    const pagenum='query.pagenum'
    this.setData({[pagenum]:this.data.query.pagenum++})
    let res=await this.getdata(this.data.query)
    this.setData({
      questionaires:this.data.questionaires.concat(res)
    })
  },
  onLoad:async function(){
    let s='query.class'
    console.log(this.data[s])
    let res=await this.getdata(this.data.query)
    this.setData({
      questionaires:res
    })
  },
  /**
   * 组件的方法列表
   */
  getdata:async function(index){
    const db=wx.cloud.database()
    const collection=db.collection('questionaires')
    let patternstr=index.key.split(' ').join('|')
    let pattern=new RegExp(patternstr,'g')
    let order=index.order=='最新'? 'date':'num'
    let res=await collection.where({
      keyword:pattern,
      class:index.class,
      side:index.side
    }).orderBy(order,'desc').skip((index.pagenum-1)*10).limit(10).get()
    return  res.data
  },
  getdataBykeyword:async function(e){
    const key='query.key'
    this.setData({[key]:e.detail.value})
    let res=await this.getdata(this.data.query)
    this.setData({
      questionaires:res
    })
  },
  showchosebox:function(){
    this.setData({showchose:(!this.data.showchose)})
  },
  formsubmit:async function(e){
    const ord='query.order'
    const side='query.side'
    const cla='query.class'
    this.setData({[ord]:e.detail.value.order,[side]:e.detail.value.side,[cla]:e.detail.value.class})
    let res=await this.getdata(this.data.query)
    this.setData({
      questionaires:res,
      showchose:(!this.data.showchose)
    })
  },
  Toquestion:function(e){
    let that=this
    wx.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']){
          wx.navigateToMiniProgram({
            appId: 'wxd947200f82267e58',
            path:e.currentTarget.dataset.url
          })
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

})
