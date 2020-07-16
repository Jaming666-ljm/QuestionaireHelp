// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env:cloud.DYNAMIC_CURRENT_ENV})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=cloud.database();
  const collection=db.collection('questionaires')
  let res = await collection.where({_openid:wxContext.OPENID}).get()
  let num
  let res2=await db.collection('userInfo').where({_openid:wxContext.OPENID}).get()
 
  console.log(num)
  return {userquestions:res.data,questionNum:res2.data}
}