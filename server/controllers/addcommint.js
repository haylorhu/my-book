const https = require('https')
const {
  mysql
} = require('../qcloud')
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930


// 2. 入库
module.exports = async (ctx) => {
  const {
    bookid,
    openid,
    comment
  } = ctx.request.body
  console.log(bookid,
    openid,
    comment)
  if (bookid && openid && comment) {
    try {
      await mysql('comments').insert({bookid,
        openid,
        comment})
      ctx.state.data={
        msg:'success'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
            msg: '评论失败:' + e.sqlMessage
        }
      }
    }
  }
}
