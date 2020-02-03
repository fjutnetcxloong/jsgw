// 分享评论
const {
    SuccessModel,
    ErrorModel
} = require('../config/model')
const {upEvaluate, getEvaluate, delEvaluate} = require('../controller/evaluateController')
// console.log(upEvaluate)
module.exports = {
    "up_evaluate": async ctx => {
        const {id, content, username} = ctx.request.body
        // console.log(id, content, name)
        if (!id) {
            ctx.body = new ErrorModel('这条分享不存在')
            return 
        }

        const ret = await upEvaluate(id, content, username)
        if (ret) {
            ctx.body = new SuccessModel('success')
            return
        }
        ctx.body = new ErrorModel('分享不存在')
    },
    "get_evaluate": async ctx => {
        // console.log('数据的撒即可到哈萨克的')
        const {id} = ctx.request.body
        if (!id) {
            ctx.body = new ErrorModel('这条分享不存在')
            return 
        }

        const ret = await getEvaluate(id)
        if (ret) {
            ctx.body = new SuccessModel(ret, 'success')
            return
        }
        ctx.body = new ErrorModel('暂无评论')
    },
    "del_evaluate": async ctx => {
        const {id} = ctx.request.body
        if (!id) {
            ctx.body = new ErrorModel('id error')
            return
        }

        const ret = await delEvaluate(id)
        if (ret) {
            // console.log(ret, "啥抠脚大汉萨科技的哈师大接口")
            ctx.body = new SuccessModel('success')
            return
        }
        ctx.body = new ErrorModel('删除失败')
    }
}