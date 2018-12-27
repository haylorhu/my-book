
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {id} = ctx.request.query
    // const size = 10
    const books = await mysql('books')
                  .where('id',id)

    ctx.state.data = {
        list: books
    }
}
