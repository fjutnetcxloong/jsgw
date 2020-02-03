//招聘信息接口
const {getCommunicateInfo,editCommuList,delCommuList,showOrCommuList, getComunicateList, getICommunicateDetail} = require('../controller/communicate')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    "communicate_list": async ctx => {
        const ret = await getCommunicateInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "edit_communicate_list": async ctx => {
        const res = await editCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '操作成功')
            return;
        }
        ctx.body = new ErrorModel('操作成功')
    },
    "del_communicate_list": async ctx => {
        const res = await delCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '删除成功')
            return;
        }
        ctx.body = new ErrorModel('删除失败')
    },
    "enable_commu": async ctx => {
        const res = await showOrCommuList(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res, '操作成功')
            return;
        }
        ctx.body = new ErrorModel('操作失败')
    },
    'get_communicate_list': async ctx => {
        const {limit, offset, page} = ctx.request.body;
        const res = await getComunicateList(limit, offset, page);
        if (res && res.arr.length > 0) {
            ctx.body = new SuccessModel({rows: res.arr, total: res.total}, "获取讯息成功")
            return
        }
        ctx.body = new ErrorModel( "获取讯息失败")
    },
    'get_communicate_detail': async ctx => {
        const {id, is_read} = ctx.request.body
        const res = await getICommunicateDetail(id, is_read)
        if(res) {
            ctx.body = new SuccessModel(res, "获取成功")
            return
        }
        ctx.body = new ErrorModel("获取失败")
    }
}