const {
    sequelize
} = require('../db/db');
const fs = require('fs');
const path = require('path');


const {
    Department,
    Identity,
    Employee,
    Account,
    Company,
    mainConcat,
    friendConcat,
} = require('../model/createTables')



// 生成随机密码
function randomn(n) {
    let res = ''
    for (; res.length < n; res += Math.random().toString(36).substr(2).toUpperCase()) {}
    return res.substr(0, n)
}
// 添加分组
const addDep = async (dep) => {
    const add = await Department.findOne({
        where: {
            department: dep
        }
    })
    if (add && add.dataValues) {
        if (add.dataValues.dep_status === '0') {
            const update = await Department.update({
                dep_status: '1'
            }, {
                where: {
                    department: dep
                }
            })
            return update[0]
        }
        return false
    } else {
        const ret = await Department.findOrCreate({
            where: {
                department: dep
            }
        })
        return ret && ret[1]
    }

}
// 查找分组信息
const findDep = async () => {
    // const sql1 = 'SELECT d.department, d.id, num.dep_id as dep_id, IFNULL(num.count,0) as sum from gw_department d LEFT JOIN (select e.dep_id as dep_id, count(e.dep_id) as count from gw_employee as e LEFT JOIN gw_department as d on e.dep_id=d.id where d.dep_status=1 group by e.dep_id,d.department) as num on d.id=num.dep_id'
    const sql1 = 'select d.department, e.dep_id, d.id,count(dep_id) as num from gw_department as d LEFT JOIN gw_employee as e on e.dep_id=d.id and e.status=1 where d.dep_status=1 group by dep_id,d.id, department'
    // 获取分组
    const ret = await sequelize.query(sql1, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    const sql = 'select COUNT(1) as num from gw_employee where gw_employee.status=1'
    // 获取全部员工
    const count = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    const obj = {
        dep: ret,
        allDep: count
    }
    return obj || {}
}
// 获取分组信息
const readDep = async () => {
    const ret = await Department.findAll({
        where: {
            dep_status: "1"
        }
    })
    let arr = []
    ret.forEach(item => {
        arr.push(item.dataValues)
    })
    return arr || []
}
// 删除分组
const delDep = async (id) => {
    const ret = await Department.findOne({
        where: {
            id
        }
    })
    const sql = `update gw_employee as e set e.status=0 where e.dep_id=${id}`
    sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    if (ret.dataValues) {
        const del = await Department.update({
            dep_status: '0'
        }, {
            where: {
                id
            }
        })
        return del[0]
    }
}

// 更新分组名称
const updateDep = async (name, id) => {
    const ret = await Department.findAll({
        where: {
            department: name
        }
    })
    if (ret && ret.length > 0) {
        return false
    }
    const update = await Department.update({
        department: name
    }, {
        where: {
            id
        }
    })
    return update[0]
}
// 获取身份信息
const findIdentity = async () => {
    const ret = await Identity.findAll()
    let ident = []
    ret.forEach(item => {
        ident.push(item.dataValues)
    })
    return ident
}
// 插入员工信息
const insertEmployee = async (obj) => {
    // 查找部门id
    if (!obj.password) {
        obj.password = randomn(8)
    }
    const findDepID = await Department.findOne({
        where: {
            department: obj.department
        }
    })
    const dep_id = findDepID.id
    const findIndetId = await Identity.findOne({
        where: {
            Identity: obj.author
        }
    })
    const ident_id = findIndetId.id
    const ret = await Employee.findOne({
        where: {
            name: obj.name
        }
    })
    if (ret) {
        return await Employee.update({
            status: "1"
        }, {
            where: {
                name: obj.name
            }
        })
    } else {
        return sequelize.transaction(function (t) {
            // 要确保所有的查询链都有return返回
            return Employee.create({
                name: obj.name,
                phone: obj.phone,
                ident_id,
                dep_id
            }, {
                transaction: t
            }).then(function () {
                return Account.create({
                    account: obj.account,
                    password: obj.password,
                    identity_id: ident_id
                }, {
                    transaction: t
                });
            });

        })
    }
}

// 获取员工
const getEmployee = async (limit, page, keyword) => {
    if (keyword) {
        const sql = `select e.id, e.name, e.phone, d.department, i.identity,e.active from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id) where e.status = 1 and e.name like '%${keyword}%' or e.phone like '%${keyword}%'`
        const ret = await sequelize.query(sql, {
            replacements: ['active'],
            type: sequelize.QueryTypes.SELECT
        })
        const count = ret.length
        return {
            ret,
            count
        }
    }
    const offset = (page - 1) * limit;
    const sql = `select e.id, e.name, e.phone, d.department, i.identity,e.active from gw_employee e left join gw_department d on (e.dep_id=d.id)LEFT JOIN gw_identity i on (i.id=e.ident_id) where e.status = 1 limit ${offset}, ${limit}`
    const count = await Employee.count({
        where: {
            status: 1
        }
    })

    const ret = await sequelize.query(sql, {
        replacements: ['active'],
        type: sequelize.QueryTypes.SELECT
    })
    if (!ret || !count) {
        return false
    }
    return {
        ret,
        count
    }
}
// 编辑员工
const editEmp = async (parms) => {
    const findEmp = await Employee.findOne({
        where: {
            id: parms.id
        }
    })
    if (!parms.password) {
        parms.password = randomn(8)
    }
    const department = await Department.findOne({
        where: {
            department: parms.department
        }
    })
    const identity = await Identity.findOne({
        where: {
            identity: parms.author
        }
    })
    if (findEmp) {
        return sequelize.transaction(function (t) {
            // 在事务中执行操作
            return Employee.update({
                    name: parms.name,
                    phone: parms.phone,
                    ident_id: identity.dataValues.id,
                    dep_id: department.dataValues.id
                }, {
                    where: {
                        id: parms.id
                    }
                }, {
                    transaction: t
                })
                .then(function () {
                    return Account.update({
                        account: parms.account,
                        password: parms.password,
                        identity_id: identity.dataValues.id,
                    }, {
                        where: {
                            id: parms.id
                        }
                    }, {
                        transaction: t
                    })
                });
        })
    }
    return false
}
// 删除员工
const delEmp = async (id) => {
    const emp = await Employee.findOne({
        where: {
            id
        }
    })
    if (emp) {
        // const del = await Employee.update({
        //     status: "0"
        // }, {
        //     where: {
        //         id
        //     }
        // })
        // return del && del[0]
        return sequelize.transaction(function (t) {
            // 在事务中执行操作
            return Employee.update({
                    status: "0"
                }, {
                    where: {
                        id
                    }
                }, {
                    transaction: t
                })
                .then(function () {
                    return Account.update({
                        account_status: "0",
                    }, {
                        where: {
                            id
                        }
                    }, {
                        transaction: t
                    })
                });
        })
    }
}
const changeStatus = async (id) => {
    const emp = await Employee.findOne({
        where: {
            id
        }
    })
    if (emp) {
        if (emp.active === "0") {
            const change = await Employee.update({
                active: '1'
            }, {
                where: {
                    id
                }
            })
            return change && change[0]
        }
        const change = await Employee.update({
            active: '0'
        }, {
            where: {
                id
            }
        })
        return change && change[0]
    }
}

// 获取员工信息
const empInfo = async id => {
    const ret = await Employee.findOne({
        where: {
            id
        }
    })
    if (ret) {
        const ident = await Identity.findOne({
            where: {
                id: ret.dataValues.ident_id
            }
        })
        ret.dataValues.ident_id = ident.dataValues.identity
        const dep = await Department.findOne({
            where: {
                id: ret.dataValues.dep_id
            }
        })
        ret.dataValues.dep_id = dep.dataValues.department
    }
    const acount = await Account.findOne({
        where: {
            id
        }
    })
    const obj = Object.assign(ret.dataValues, acount.dataValues)
    return obj
}

//产品中心（存储[志强]）
const saveCententTitle = async (obj) => {
    const company = await Company.findOne({
        where: {
            id: 1
        }
    });
    let red = '';
    if (obj.pic_rul) {
        const readPath = obj.pic_rul
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        const name = time + '.' + 'png'
        const whritePath = path.join(__dirname, '../', 'assets', 'images', '/') + name
        const readStream = fs.createReadStream(readPath)
        const writeStream = fs.createWriteStream(whritePath)
        red = readStream.pipe(writeStream).path.split('\\');
        const redPath = 'http://localhost:8000/' + 'assets/' + 'images/' + red[red.length - 1];
    }
    // console.log(redPath, "的手机卡和第三届啊哈")
    if (company) {
        return sequelize.transaction(function (t) {
            return Company.update({
                status: 0,
                message: '存储成功',
                comp_name: obj.comp_name,
                intro: obj.intro,
                link_phone: obj.link_phone,
                address: obj.address,
                pic_rul: obj.pic_rul ? 'http://localhost:8000/' + 'assets/' + 'images/' + red[red.length - 1] : '',
            }, {
                where: {
                    id: 1
                }
            }, {
                transaction: t
            }).then(function () {
                return mainConcat.update({
                    comp_id: 1,
                    page_name: obj.page_name1,
                    page_link: obj.page_link1,
                },{
                    where: {
                        id: 1
                    }
                }, {
                    transaction: t
                }),
                    mainConcat.update({
                        comp_id: 1,
                        page_name: obj.page_name2,
                        page_link: obj.page_link2,
                    },{
                        where: {
                            id: 2
                        }
                    }, {
                        transaction: t
                    }),
                    mainConcat.update({
                        comp_id: 1,
                        page_name: obj.page_name3,
                        page_link: obj.page_link3,
                    },{
                        where: {
                            id: 3
                        }
                    }, {
                        transaction: t
                    }),
                    mainConcat.update({
                        comp_id: 1,
                        page_name: obj.page_name4,
                        page_link: obj.page_link4,
                    },{
                        where: {
                            id: 4
                        }
                    }, {
                        transaction: t
                    }),
                    mainConcat.update({
                        comp_id: 1,
                        page_name: obj.page_name5,
                        page_link: obj.page_link5,
                    },{
                        where: {
                            id: 5
                        }
                    }, {
                        transaction: t
                    }),
                    mainConcat.update({
                        comp_id: 1,
                        page_name: obj.page_name6,
                        page_link: obj.page_link6,
                    },{
                        where: {
                            id: 6
                        }
                    }, {
                        transaction: t
                    });
            }).then(function () {
                return friendConcat.update({
                    friend_page: obj.friend_page1,
                    friend_link: obj.friend_link1,
                    comp_id: 1,
                }, {
                    where: {
                        id: 1
                    }
                }, {
                    transaction: t
                }),
                    friendConcat.update({
                        friend_page: obj.friend_page2,
                        friend_link: obj.friend_link2,
                        comp_id: 1,
                    }, {
                        where: {
                            id: 2
                        }
                    }, {
                        transaction: t
                    })
            });
        })
    } else {
        return sequelize.transaction(function (t) {
            return Company.create({
                status: 0,
                message: '存储成功',
                comp_name: obj.comp_name,
                intro: obj.intro,
                link_phone: obj.link_phone,
                address: obj.address,
                pic_rul: obj.pic_rul ? 'http://localhost:8000/' + 'assets/' + 'images/' + red[red.length - 1] : '',
            }, {
                transaction: t
            }).then(function () {
                return mainConcat.create({
                    comp_id: 1,
                    page_name: obj.page_name1,
                    page_link: obj.page_link1,
                }, {
                    transaction: t
                }),
                    mainConcat.create({
                        comp_id: 1,
                        page_name: obj.page_name2,
                        page_link: obj.page_link2,
                    }, {
                        transaction: t
                    }),
                    mainConcat.create({
                        comp_id: 1,
                        page_name: obj.page_name3,
                        page_link: obj.page_link3,
                    }, {
                        transaction: t
                    }),
                    mainConcat.create({
                        comp_id: 1,
                        page_name: obj.page_name4,
                        page_link: obj.page_link4,
                    }, {
                        transaction: t
                    }),
                    mainConcat.create({
                        comp_id: 1,
                        page_name: obj.page_name5,
                        page_link: obj.page_link5,
                    }, {
                        transaction: t
                    }),
                    mainConcat.create({
                        comp_id: 1,
                        page_name: obj.page_name6,
                        page_link: obj.page_link6,
                    }, {
                        transaction: t
                    })
            }).then(function () {
                return friendConcat.create({
                    friend_page: obj.friend_page1,
                    friend_link: obj.friend_link1,
                    comp_id: 1,
                },{
                    transaction: t
                }),
                friendConcat.create({
                    friend_page: obj.friend_page2,
                    friend_link: obj.friend_link2,
                    comp_id: 1,
                },{
                    transaction: t
                });
            });
        })
    }
}

//获取数据(底部栏)
const getCententTitle = async () => {
    const ret = await Company.findOne({where: {id: 1}});
    const ret1 = await mainConcat.findOne({where: {id: 1}});
    const ret2 = await mainConcat.findOne({where: {id: 2}});
    const ret3 = await mainConcat.findOne({where: {id: 3}});
    const ret4 = await mainConcat.findOne({where: {id: 4}});
    const ret5 = await mainConcat.findOne({where: {id: 5}});
    const ret6 = await mainConcat.findOne({where: {id: 6}});
    const ret7 = await friendConcat.findOne({where: {id: 1}});
    const ret8 = await friendConcat.findOne({where: {id: 2}});
    const arr = [ret,ret1,ret2,ret3,ret4,ret5,ret6,ret7,ret8];
    return arr;
};
module.exports = {
    addDep,
    findDep,
    delDep,
    updateDep,
    findIdentity,
    insertEmployee,
    getEmployee,
    readDep,
    editEmp,
    delEmp,
    changeStatus,
    empInfo,
    saveCententTitle,
    getCententTitle
}
