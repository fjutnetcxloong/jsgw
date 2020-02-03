// 公司交流
const {
    Exchange,
    Evaluate
} = require('../model/createTables')

const {
    sequelize
} = require('../db/db');

const Sequelize = require('sequelize');

const upTalk = async (pic, content, title, department, username) => {
    const ret = await Exchange.create({
        username: username,
        department_id: department,
        exchange_content: content,
        exchange_pic: pic,
        exchange_title: title
    })

    return ret
}

const reTalk = async (limit, page, key_val, job, timeArr) => {
    if(limit) {
        const offset = (page - 1) * limit
        const sql = `select * from gw_exchange limit ${offset}, ${limit}`
        // const ret = await Exchange.findAll({
        //     attributes: { exclude: ['exchange_content', 'exchange_pic'] }
        // });

        const ret = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        })
        const total = await Exchange.count()
        const arr = []
        ret && ret.forEach(item => {
            arr.push(item)
        })
        return {arr, total}
    } else {
        let where_l = ''
        if(key_val) {
            where_l += `exchange_title like '%${key_val}%'`
        }
        if(job) {
            if(where_l) {
                where_l += `and department_id='${job}'`
            } else {
                where_l += `department_id='${job}'`
            }
        }
        if(timeArr && timeArr.length > 1) {
            if(where_l) {
                where_l += `and create_time between ${timeArr[0]} and ${timeArr[1]}`
            } else where_l += `create_time between ${timeArr[0]} and ${timeArr[1]}`
        }
        console.log(where_l, 'aaaaaaaaa')
        const sql = `select * from gw_exchange where ${where_l}`
        const ret = await sequelize.query(sql)
        console.log(ret, 'retret')
        // const total = await Exchange.count()
        const arr = []
        ret && ret[0] && ret[0].forEach(item => {
            arr.push(item)
        })
        return {arr}
        // const Op = Sequelize.Op;
        // const ret = await Exchange.findAll({
        //     where: {
        //         exchange_title: {
        //             [Op.like]: `%${key_val || null}%`
        //         },
        //         department_id: job || null,
        //         // create_time: {
        //         //     [Op.gt]: start_time[0],
        //         //     [Op.lt]: start_time[1]
        //         // }
        //     }
        // })
        // const total = await Exchange.count()
        // const arr = []
        // ret && ret.forEach(item => {
        //     arr.push(item)
        // })
        // return {arr, total}
    }
}

const talkDetail = async (id, is_read) => {
    if(is_read) {
        Exchange.update({is_read}, {
            where: {
                id: id
            }
        })
    }
    const find = await Exchange.findOne({
        where: {
            id
        }
    })
    // console.log(find)
    let data
    if (find) {
        let count = find.dataValues.exchange_count;
        // console.log(count, typeof count)
        count++
        const up = await Exchange.update({exchange_count: count}, {where: {id}})
        return find
    }
    return null
}

const delTalk = async id => {
    const find = Exchange.findOne({where: {id}})
    // console.log(find, "杀菌灯哈师大")
    if (find) {
        // const ret = Exchange.destroy({where: {id}})
        // // console.log(ret)
        // const eva = Evaluate.destroy({where: {exchange_id: id}})
        return sequelize.transaction(function (t) {
            // 要确保所有的查询链都有return返回
            return Exchange.destroy({where: {id}}, {
                transaction: t
            }).then(function () {
                return Evaluate.destroy({where: {exchange_id: id}}, {
                    transaction: t
                });
            });

        })
    }
    return ''
}

module.exports = {
    upTalk,
    reTalk,
    talkDetail,
    delTalk
}
