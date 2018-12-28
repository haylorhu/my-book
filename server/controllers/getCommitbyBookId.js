const https = require('https')
const {
  mysql
} = require('../qcloud')

// 2. 入库
module.exports = async (ctx) => {
  const {
    bookid
  } = ctx.request.query
  console.log(ctx.request.query);


  console.log(bookid)
  if (bookid) {
    try {
      const findRes = await mysql('comments').select().where('bookid', bookid)
      console.log(findRes);
      ctx.state.data = {
        comment: findRes
      }
    } catch (e) {
      ctx.state.data = {
        msg: e.sqlMessage
      }
    }



  }


}
