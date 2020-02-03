//招聘信息接口
const {getRecruitInfo,addRecruitMen,getPcatBak,editRecruitMen,
    deleteRecruic,enableRecreit, getRecruitList,
    getAfressInfo,deleteAfressInfo,enableAfressInfo,addAdress,
    editAdress
} = require('../controller/recruit')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    "get_recruit": async ctx => {
        const ret = await getRecruitInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "add_recruiter":async ctx =>{
        const res =  await addRecruitMen(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel('添加成功')
            return
        }
        ctx.body = new ErrorModel('添加失败')
    },
    "edit_recruiter":async ctx =>{
        const res =  await editRecruitMen(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel('编辑成功')
            return
        }
        ctx.body = new ErrorModel('编辑失败')
    },
    "pcat_bak":async ctx =>{
        const res =  await getPcatBak(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "detelte_recreit":async ctx =>{
        const res =  await deleteRecruic(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel(res,'删除成功')
            return
        }
        ctx.body = new ErrorModel('删除失败')
    },
    "enable_recreit":async ctx => {
        const res =  await enableRecreit(ctx.request.body);  
        // console.log(res,'2考虑到法国');
        if(res){
            ctx.body = new SuccessModel(res,'操作成功')
            return
        }
        ctx.body = new ErrorModel('操作失败')
    },
    'get_recruit_List': async ctx => {
        const {limit, offset, page} = ctx.request.body;
        const res = await getRecruitList(limit, offset, page);
        if (res && res.arr.length > 0) {
            ctx.body = new SuccessModel({rows: res.arr, total: res.total}, "获取讯息成功")
            return
        }
        ctx.body = new ErrorModel( "获取讯息失败")
    },
    'adress_list': async ctx => {
        const ret = await getAfressInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'获取成功')
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    'adress_delete': async ctx => {
        const ret = await deleteAfressInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'删除成功')
            return
        }
        ctx.body = new ErrorModel('删除失败')
    },
    'adress_enable': async ctx => {
        const ret = await enableAfressInfo(ctx.request.body);
        if (ret) {
            ctx.body = new SuccessModel(ret,'操作成功')
            return
        }
        ctx.body = new ErrorModel('操作失败')
    },
    "adress_add":async ctx =>{
        const res =  await addAdress(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel('添加成功')
            return
        }
        ctx.body = new ErrorModel('添加失败')
    },
    "adress_edit":async ctx =>{
        const res =  await editAdress(ctx.request.body);
        if(res){
            ctx.body = new SuccessModel('操作成功')
            return
        }
        ctx.body = new ErrorModel('操作失败')
    },
}