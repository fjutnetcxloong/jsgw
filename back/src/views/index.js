/**
 *视图参数
 */
const fs = require('fs');
const path = require('path');

let partials = {};

function readDirSync(root) {
    fs.readdirSync(root).forEach(function (ele, index) {
        let info = fs.statSync(root + '/' + ele);
        if(info.isDirectory()) {
            readDirSync(root + '/' + ele);
        }else {
            partials[ele.slice(0,-4)] = root + '/' + ele;
        }
    })
}

readDirSync(path.join(__dirname)+'/layout');
// readDirSync(path.join(__dirname)+'/components');

//koa-views 模板参数设置
const ViewsParam = {
    map: { hbs: 'handlebars'},
    extension: 'hbs',
    options: { //设置handlebars的Helpers、Partials等参数
        partials: partials
    }
}

module.exports = ViewsParam