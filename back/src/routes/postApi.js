// 职业分类接口
const {getClassify, addClassify, editClassify, delClassify, changeClassifyStatus} =  require('../controller/postController');
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    //职业分类页面
    'postClassify': async ctx => {
        await ctx.render('postClassify')
    },
    //获取职业分类接口
    'get_classify': async ctx => {
        const classify = await getClassify();
        if (classify) {
            ctx.body = new SuccessModel(classify, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //新增职业分类
    'add_classify': async ctx => {
        const ret = await addClassify(ctx.request.body);
        if (ret) {
            return ctx.body = new SuccessModel('新增成功')
        }
         ctx.body = new SuccessModel('新增失败')
    },
    //更新职业分类
    'edit_classify': async ctx => {
        const ret = await editClassify(ctx.request.body);
        if (ret) {
            return ctx.body = new SuccessModel('更新成功')
        }
        ctx.body = new SuccessModel('跟新失败')
    },
    //删除职业分类
    'del_classify': async ctx => {
        const {id} = ctx.request.body;
        const ret = await delClassify(id);
        if (ret) {
            ctx.body = new SuccessModel('刪除成功')
            return
        }
        ctx.body = new ErrorModel('刪除失败')
    },
    //禁用职业分类
    'change_status': async ctx => {
        const {id, status} = ctx.request.body;
        const ret = await changeClassifyStatus(id, status);
        if (ret) {
            ctx.body = new SuccessModel('状态修改成功')
            return
        }
        ctx.body = new ErrorModel('状态修改失败')
    },
}
