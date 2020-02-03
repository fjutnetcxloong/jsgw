const {
    Information
} = require('../model/createTables')
const Sequelize = require('sequelize')
const insertInfo = async (html, title) => {
    const insert = await Information.create({
        info_title: title,
        info_content: html
    })
    return insert && insert.dataValues
}

const getInfo = async (offset, limit, page, key_val, timeArr) => {
    if(limit){
        const ret = await Information.findAll({
            where: {
                del_status: "1"
            },
            limit: limit,
            offset: (page - 1) * limit
        })
        const total = await Information.count({where: {del_status: "1"}})
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
        const Op = Sequelize.Op;
        if(key_val &&  timeArr && timeArr.length > 1){
            const ret = await Information.findAll({
                where: {
                    del_status: '1',
                    info_title: {
                        [Op.like]: `%${key_val}%`
                    },
                    createdAt: {
                        [Op.gt]: timeArr[0],
                        [Op.lt]: timeArr[1]
                    }
                }
            })
            const arr = []
            if (ret) {
                ret.forEach(item => {
                    arr.push(item.dataValues)
                })
                return {
                    arr
                }
            }
        }
        if(key_val && timeArr && timeArr.length < 1){
            const ret = await Information.findAll({
                where: {
                    del_status: '1',
                    info_title: {
                        [Op.like]: `%${key_val}%`
                    }
                }
            })
            const arr = []
            if (ret) {
                ret.forEach(item => {
                    arr.push(item.dataValues)
                })
                return {
                    arr
                }
            }
        }
        if(!key_val && timeArr && timeArr.length > 1){
            const ret = await Information.findAll({
                where: {
                    del_status: '1',
                    createdAt: {
                        [Op.gt]: timeArr[0],
                        [Op.lt]: timeArr[1]
                    }
                }
            })
            const arr = []
            if (ret) {
                ret.forEach(item => {
                    arr.push(item.dataValues)
                })
                return {
                    arr
                }
            }
        }
        if(!key_val && !timeArr){
            const ret = await Information.findAll({
                where: {
                    del_status: '1'
                }
            })
            const arr = []
            if (ret) {
                ret.forEach(item => {
                    arr.push(item.dataValues)
                })
                return {
                    arr
                }
            }
        }
        
    }
    return ''
}

const delInfo = async (id) => {
    const ret = await Information.findOne({
        where: {
            id
        }
    });
    if (ret) {
        const del = await Information.update({
            del_status: "0"
        }, {
            where: {
                id
            }
        })
        return del
    }
    return ''
}
// 修改资讯显示状态
const hideInfo = async id => {
    const ret = await Information.findOne({
        where: {
            id: id
        }
    });
    if (ret) {
        if (ret.dataValues.show_status === "0") {
            const hide = await Information.update({
                show_status: "1"
            }, {
                where: {
                    id
                }
            })
            return hide
        }
        const hide = await Information.update({
            show_status: "0"
        }, {
            where: {
                id
            }
        })
        return hide
    }
    return ''
}

const editInfo = async (id, html, title) => {
    const find = await Information.findOne({
        where: {
            id
        }
    })
    if (find) {
        const update = await Information.update({
            info_title: title,
            info_content: html
        }, {
            where: {
                id
            }
        })
        if (update) {
            return update
        }
        return ''
    }
    return ''
}

const getInfoDetail = async (id) => {
    const res = await Information.findAll({
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
    insertInfo,
    getInfo,
    delInfo,
    hideInfo,
    editInfo,
    getInfoDetail
}
