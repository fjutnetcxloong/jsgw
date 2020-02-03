const {Events} = require('../model/createTables')

const insertEvent = async (time, title, content) => {
    const insert = await Events.create({time, event_title: title, event_content: content})
    return insert && insert.dataValues
}

const getEvent = async () => {
    const ret = await Events.findAll({limit: 5, order: [['id', 'desc']]})
    const arr = []
    if (ret) {
        ret.forEach(item => {
            item.dataValues.titleTime = item.dataValues.time.split('/')[1] + '-' + item.dataValues.time.split('/')[2]
            item.dataValues.year = item.dataValues.time.split('/')[0]
            arr.push(item.dataValues)
        })
        return arr
    }
    return arr
}

const delEvent = async id => {
    const find = await Events.findOne({where: {id}})
    if (find) {
        const ret = await Events.destroy({where: {id}})
        return ret
    }
    return false
}

module.exports = {
    insertEvent,
    getEvent,
    delEvent
}