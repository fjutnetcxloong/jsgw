const {sequelize} = require('../db/db');
const {
    Post_classify
} = require('../model/createTables')
// 获取职业分类，并按sort字段排序
const getClassify = async () => {
    const sql = "select id, classify, sort, status from gw_post_classify order by sort desc";
    const ret = await sequelize.query(sql)
    return ret[0]
}
//添加职业分类
const addClassify = async (obj) => {
    let insert = obj;
    if (obj) {
        insert = await Post_classify.create({
            classify: obj.classify,
            sort: obj.sort,
            status: 1
        })
        return insert
    }

}
//编辑职业分类
const editClassify = async (parms) => {
    const findCly = await Post_classify.findOne({where: {id: parms.id}})
    if (findCly) {
        const updateCl = await Post_classify.update({
            classify: parms.classify,
            sort: parms.sort,
        }, {where: {id: parms.id}})
        return updateCl && updateCl[0]
    }
}
//删除
const delClassify = async (id) => {
    const sql = 'delete from gw_post_classify where id=' + id;
    const ret = await sequelize.query(sql);
    return ret && ret[0]
}
// 删除职业分类
const changeClassifyStatus = async (id, status) => {
    const del = await Post_classify.update({status}, {where: {id}})
    return del && del[0]
}
module.exports = {
    getClassify,
    addClassify,
    editClassify,
    delClassify,
    changeClassifyStatus
}
