// const mysql = require('mysql2');
const env = process.env.NODE_ENV;
const Sequelize = require('sequelize');
// const sqls = require('../model/createTables');
// const {MYSQL_CONF} = require('../config/index');

let sqlConfig = {
    host: '101.132.180.228',
    user: 'root',
    password: '!12_@Gjsk78!',
    port: '8083',
    database: 'zzkj'
}
if (env === 'dev') {
    sqlConfig = {
        host: '101.132.180.228',
        user: 'root',
        password: '!12_@Gjsk78!',
        port: '8083',
        database: 'zzkj'
    }
}

if (env === 'production') {
    sqlConfig = {
        host: '101.132.180.228',
        user: 'root',
        password: '!12_@Gjsk78!',
        port: '8083',
        database: 'zzkj'
    }
}
// 创建mysql链接
// const pool = mysql.createPool(MYSQL_CONF);

// 创建连接池
// function exec(sql) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection((err, connection) => {
//             if (err) {
//                 return reject(err)
//             }
//             connection.query(sql, (err, result) => {
//                 connection.release();
//                 if (err) {
//                     reject(err)
//                 }
//                 resolve(result)
//             })
//         })
//     })
// }
// // 新建数据库表方法
// const createTable = async (sqls) => {
//     for (let key in sqls) {
//         await exec(sqls[key],[])
//     }
// }
// createTable(sqls);
const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
    host: sqlConfig.host,
    port: sqlConfig.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
})
sequelize
    .authenticate()
    .then(() => {
        console.log('链接成功');
    })
    .catch(err => {
        console.error('链接数据库失败:', err);
    });

// exports.sequelize = sequelize;
const defineModel = function (name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
            };
        }
    }
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     // allowNull: false
    // };
    // attrs.createUser = {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // };
    // attrs.updateUser = {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        paranoid: true,
        // createdAt: "CreatedAt",  //自定义时间戳
        // updatedAt: "UpdatedAt", // 自定义时间戳
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        hooks: {
            beforeBulkCreate: function(obj){
                obj.version = 0 ;
            },
            beforeValidate: function(obj){
                if(obj.isNewRecord){
                    console.log('first');
                    obj.version = 0 ;
                }else{
                    console.log('not first');
                    obj.version = obj.version + 1 ;
                }
            }
        }
    });
};
module.exports = {
    // exec
    defineModel,
    sequelize
}
