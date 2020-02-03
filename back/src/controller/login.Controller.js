// const {exec} = require('../db/db');
const crypto = require('crypto');

const {Account, Employee, Identity, Department} = require('../model/createTables')
const login = async (account) => {
    // const sql = `SELECT * FROM users WHERE username='${username}' and password='${password}'`
    const rows = await Account.findOne({
        where: {
            account
        }
    });
    if (rows && rows.dataValues.account_status === "1") {
        const password = crypto.createHash('md5').update(rows.dataValues.password).digest("hex")
        const ident = rows.dataValues.identity_id
        const account = rows.dataValues.account
        const id = rows.dataValues.id
        const emp = await Employee.findOne({where: {id}, attributes: ['name', 'dep_id']})
        const ide = await Identity.findOne({where: {id: ident}, attributes: ['identity']})
        const dep = await Department.findOne({where: {id: emp.dataValues.dep_id}})
        // console.log(dep, "大师概述大家归属地和")
        const name = emp.dataValues.name
        const identity = ide.dataValues.identity
        return {id, account, password, name, identity, department: dep.dataValues.department}
    }
    return {}
}

// 获取员工信息
// const userInfo = async (account) => {}
module.exports = {
    login
}