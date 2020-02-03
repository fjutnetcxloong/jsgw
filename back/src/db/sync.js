// // 同步数据库
const fs = require('fs');
const path = require('path')
const {sequelize} = require('./db')
const modelPath = path.join(__dirname, '../', 'model')
const files = fs.readdirSync(modelPath);
const modelFile = files.filter((f)=>{
    return f.endsWith('.js');
}, files);
module.exports = {};
for (const f of modelFile) {
    const name = f.substring(0, f.length - 3);
    module.exports[name] = require('../model/' + f);
} 
sequelize.sync({ alter: true });