const {getModules, changeModuleNumber, changeModuleStatus} = require('../controller/indexManage');
const {SuccessModel, ErrorModel} = require('../config/model')

module.exports = {
    'indexManage': async (ctx, next) => {
        await ctx.render('indexManage')
    },
    //获取模块列表
    'indexModule': async (ctx, next) => {
        const res = await getModules();
        if (res) {
            ctx.body = new SuccessModel(res, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //修改模块排序
    'changeModuleNumber': async (ctx, next) => {
        const res = await changeModuleNumber(ctx.request.body.module_number, ctx.request.body.id)
        if (res) {
            ctx.body = new SuccessModel("修改成功")
            return;
        }
        ctx.body = new ErrorModel('修改失败')
    },
    //修改模块状态
    'changeModuleStatus': async (ctx, next) => {
        const res = await changeModuleStatus(ctx.request.body.status, ctx.request.body.id)
        if(res) {
            ctx.body = new SuccessModel("修改成功")
            return;
        }
        ctx.body = new ErrorModel("修改失败")
    }
}
