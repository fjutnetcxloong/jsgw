const {saveCententTitle, getCententTitle} = require('../controller/depControllor')
const {SuccessModel, ErrorModel} = require('../config/model')

module.exports = {
    'helpContent' : async ctx =>{
        await ctx.render('helpContent')
    },
    //产品中心（存储[志强]）
    "add_centent_title": async ctx => {
        const data = await saveCententTitle(ctx.request.body)
        if (data) {
            ctx.body = new SuccessModel(data, "存储成功");
        } else {
            ctx.body = new ErrorModel('存储失败')
        }
    },
    //获取产品中心
    "get_centent_title": async ctx => {
        const ret = await getCententTitle();
        if (ret) {
            // let checked = ret.dataValues === true ? 'checked' : ''
            ctx.body = new SuccessModel(ret, "获取成功");
            return
        }
        ctx.body = new ErrorModel('获取失败')
    }
}
