
const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    // const {page} = ctx.request.query
    // const size = 10
    const books = await mysql('books')
                  .select('*')

    ctx.state.data = {
        list: books
    }
}
