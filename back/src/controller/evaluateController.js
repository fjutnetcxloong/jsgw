// 评论
const { Evaluate, Exchange } = require('../model/createTables')
const upEvaluate = async (id, content, name) => {
    const find = await Exchange.findOne({where: {id}})
    console.log(find)
    if (!find) {
        console.log(find, "的盛大化四大金刚")
        return ''
    }
    const ret = Evaluate.create({
        evaluate_content: content,
        exchange_id: id,
        evaluate_name: name
    })
    if (ret) {
        return ret
    }
    return ''
}

const getEvaluate = async id => {
    const ret = await Evaluate.findAll({where: {exchange_id: id}})
    // console.log(ret)
    // console.log(ret)
    if (ret) {
        const arr = []
        ret.forEach(item => {
            arr.push(item.dataValues)
        })
        return arr
    }
    return ret
}

const delEvaluate = async id => {
    const ret = await Evaluate.destroy({where: {id}})
    // console.log(ret)
    if (ret) {
        return ret
    }
    return null
}



module.exports = {
    upEvaluate,
    getEvaluate,
    delEvaluate
}