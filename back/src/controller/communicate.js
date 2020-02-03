

const {
    communicate
} = require('../model/createTables')

const Sequelize = require('sequelize');
const {sequelize} = require('../db/db');

// 获取交流信息
const getCommunicateInfo = async ({title = '',create_time = '',end_time = ''}) => {
    let ret = {};
    if(title || create_time || end_time){
        let date = null;
        let date2 = null;
        // if(create_time){
        //     date = new Date(create_time).getTime();
        //     date2 = new Date(end_time).getTime();
        //     console.log(date, date2)
        // }
        let where = '';
        if(title!=''){
            where=`c.title like '%${title}%'`;
        }
        if(create_time != ''){
            if(!where){
                where =` c.create_time>${create_time}`;
            }else{
                where +=` and c.create_time>${create_time}`;
            }
        }
        if(end_time != ''){
            if(!where){
                where =` c.create_time<${end_time}`;
            }else{
                where +=` and c.create_time<${end_time}`;
            }
        }
        const sql = `select * from gw_communicate c where ${where}`;
        // const sql = `select * from gw_communicate c where create_time < ${date} and end_time > ${date2} or c.title like '%${data.title}%'`;
        const res = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        });
        if(res && res.length > 0){
            // ret.count = res.length;
            ret.rows = res
        }
    } else {
        ret = await communicate.findAndCountAll()
    }
    return ret
}

//分页展示
const getComunicateList = async (limit, offset, page) => {
    if(limit){
        const ret = await communicate.findAll({
            limit: limit,
            offset: (page - 1) * limit
        })
        const total = await communicate.count()
        const arr = []
        // console.log(ret, 'aaaaaa')
        if (ret) {
            ret.forEach(item => {
                arr.push(item.dataValues)
            })
            return {
                arr,
                total
            }
        }
    } else {
        const ret = await communicate.findAll()
        const total = await communicate.count()
        const arr = []
        // console.log(ret, 'bbbbbbbbbb')
        if (ret) {
            ret.forEach(item => {
                arr.push(item.dataValues)
            })
            return {
                arr,
                total
            }
        }
    }
    return ''
}

//编辑
const editCommuList = async (data) =>{
    if(data.id){
        const res = await communicate.update({
            title: data.title,
            describe:data.describe,
            create_time:data.create_time,
            end_time:data.end_time,
        },{where:{id:data.id}})
        return res;
    }
    const res = await communicate.findOrCreate({
        where: {
            title: data.title,
            describe:data.describe,
            create_time:data.create_time,
            status:0
        }
    })
    return res;
}

//删除
const delCommuList = async (data) =>{
    const res = await communicate.destroy({
        where:{
            id : data.id
        }
    })
    return res;
}

//隐藏或显示
const showOrCommuList = async (data) => {
    const res = await communicate.update({
        status:data.status === '0' ? 1 : 0
    },{where:{id:data.id}})
    return res;
}

const getICommunicateDetail = async (id, is_read) => {
    if(is_read) {
        communicate.update({is_read}, {
            where: {
                id: id
            }
        })
    }
    const res = await communicate.findOne({
        where: {
            id
        }
    })
    if(res) {
        return res
    }
    return ''
}

module.exports = {
    getCommunicateInfo,
    editCommuList,
    delCommuList,
    showOrCommuList,
    getComunicateList,
    getICommunicateDetail
}
