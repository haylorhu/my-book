const https = require('https')
const {
  mysql
} = require('../qcloud')
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url,res=>{
      let urlData =''
      res.on('data',data=>{
        urlData += data
      })
      res.on('end',res=>{
        const bookinfo = JSON.parse(urlData)
        if(bookinfo.title){
          resolve(bookinfo)
        }
        reject(bookinfo)
      })

    })
  })
}

// 2. 入库
module.exports = async (ctx) => {
  const {
    isbn,
    openid
  } = ctx.request.body
  console.log(123)
  console.log(isbn, openid)
  if (isbn && openid) {
    const findRes = await mysql('books').select().where('isbn',isbn)
    if(findRes.length){
        ctx.state = {
            code:-1,
            data:{
                msg:'图书已经存在'
            }
        }
        return
    }
  }
  let url = 'https://api.douban.com/v2/book/isbn/' +isbn
  const bookinfo = await getJSON(url)
  console.log(bookinfo);
  const rate = bookinfo.rating.average
  console.log(rate);
  
  const { title, image, alt, publisher, summary ,price} = bookinfo
  const tags = bookinfo.tags.map(v=>{
    return `${v.title} ${v.count}`
  }).join(',')
  console.log("tas:",tags);
  const author = bookinfo.author.join(',')
  console.log("author132132132131",author);
  try{
    console.log(123213);
    
    await mysql('books').insert({
      isbn,openid,rate,title, image, alt, publisher, summary ,price,tags,author
    })
    ctx.state.data = {
      title,
      msg:'success'
    }
  }catch(e){
    ctx.state = {
      code:-1,
      data:{
        msg:'新增失败:'+e.sqlMessage
      }
    }
  }


}
