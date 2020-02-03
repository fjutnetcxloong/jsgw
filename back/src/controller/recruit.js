

const {
    Invite,
    PcatBak,
    Adress
} = require('../model/createTables')

const {sequelize} = require('../db/db');
// 获取招聘信息
const getRecruitInfo = async ({post_name = '',job_class='',address_name='',start_time='',end_time=''}) => {
    let ret = {};
    if(post_name || job_class || address_name || start_time || end_time){
        let date = null;
        let date2 = null;
        if(start_time){
            date = new Date(start_time).getTime();
            date2 = new Date(end_time).getTime();
        }
        let where = '';
        if(post_name!=''){
            where=`c.post_name like '%${post_name}%'`;
        }
        if(job_class != ''){
            if(!where){
                where =`c.job_class='${job_class}'`;
            }else{
                where +=` and c.job_class='${job_class}'`;
            }
        }
        if(address_name != ''){
            if(!where){
                where =` c.address_name = '${address_name}'`;
            }else{
                where +=` and c.address_name = '${address_name}'`;
            }
        }
        if(start_time != ''){
            if(!where){
                where =` c.start_time>='${date}'`;
            }else{
                where +=` and c.start_time>='${date}'`;
            }
        }
        if(end_time != ''){
            if(!where){
                where =` c.start_time<= '${date2}'`;
            }else{
                where +=` and c.start_time<= '${date2}'`;
            }
        }
        const sql = `select * from gw_invite_info c where ${where} order by c.sort asc,c.start_time desc`;
        const res = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        })
        if(res && res.length > 0){
            ret.count = res.length;
            ret.rows = res
        }
    } else {
        const res = await Invite.findAll({
            'order': [
                ['sort', 'ASC'],
                ['start_time', 'DESC']
            ]
        });
        if(res && res.length > 0){
            ret.count = res.length;
            ret.rows = res;
        }
    }
    return ret
}

//添加招聘信息
const addRecruitMen = async (data) => {
    const res = await Invite.findOrCreate({
        where: {
            post_name: data.post_name,
            job_class:data.job_class,
            // province_id:data.province_id,
            // city_id:data.city_id,
            // county_id:data.county_id,
            address_name:data.address_name,
            detail_address:data.detail_address,
            salary: data.salary,
            require_num: data.require_num,
            work_content :data.work_content,
            post_job:data.post_job,
            start_time: data.start_time,
            phone:data.phone,
            sort:data.sort,
            email:data.email,
            enable:1
        }
    })
    return res;
}

//编辑招聘信息
const editRecruitMen = async (data) => {
    const res = await Invite.update({
        post_name: data.post_name,
        job_class:data.job_class,
        // province_id:data.province_id,
        // city_id:data.city_id,
        // county_id:data.county_id,
        address_name:data.address_name,
        detail_address:data.detail_address,
        salary: data.salary,
        require_num: data.require_num,
        work_content :data.work_content,
        post_job:data.post_job,
        start_time: data.start_time,
        phone:data.phone,
        sort:data.sort,
        email:data.email,
        enable:1
    },{where:{id:data.id}})
    return res;
}

//获取省市县地址
const getPcatBak = async (data) => {
    const res = await PcatBak.findAndCountAll({
        where:data
    })
    return res;
}

//删除招聘信息
const deleteRecruic = async(data)=>{
    const res = await Invite.destroy({
        where:{
            id : data.id
        }
    })
    return res;
}

//启用或停用
const enableRecreit = async(data)=>{
    const res = await Invite.update({
        enable:data.enable === '0' ? 1 : 0
    },{where:{id:data.id}})
    return res;
}

const getRecruitList = async (limit, offset, page) => {
    if(limit){
        const ret = await Invite.findAll({
            limit: limit,
            offset: (page - 1) * limit
        })
        const total = await Invite.count()
        const arr = []
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
        const ret = await Invite.findAll()
        const total = await Invite.count()
        const arr = []
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

//招聘地区管理列表
const getAfressInfo = async()=>{
    let ret = {};
    const res = await Adress.findAll({
        'order': [
            ['sort', 'ASC']
        ]
    });
    if(res && res.length > 0){
        ret.count = res.length;
        ret.rows = res;
    }
    return ret
}

//招聘地区删除招聘信息
const deleteAfressInfo = async(data)=>{
    const res = await Adress.destroy({
        where:{
            id : data.id
        }
    })
    return res;
}

//招聘地区启用或停用
const enableAfressInfo = async(data)=>{
    const res = await Adress.update({
        enable:data.enable === '0' ? 1 : 0
    },{where:{id:data.id}})
    return res;
}

//添加招聘信息或者编辑招聘信息
const addAdress = async (data) => {
    const res = await Adress.findOrCreate({
        where: {
            name:data.name,
            sort:data.sort,
            enable:1
        }
    })
    return res;
}

//编辑
const editAdress = async(data)=>{
    const res = await Adress.update({
        name:data.name,
        sort:data.sort,
        enable:data.enable
    },{where:{id:data.id}})
    return res;
}
module.exports = {
    getRecruitInfo,
    addRecruitMen,
    editRecruitMen,
    getPcatBak,
    deleteRecruic,
    enableRecreit,
    getRecruitList,
    getAfressInfo,
    deleteAfressInfo,
    enableAfressInfo,
    addAdress,
    editAdress
}