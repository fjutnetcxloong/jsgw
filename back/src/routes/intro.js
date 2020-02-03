const path = require('path');
const fs = require('fs');
const {insertIntro, getHtml, getChecked} = require('../controller/introControllor')
const {SuccessModel, ErrorModel} = require('../config/model')
module.exports = {
    "intro": async (ctx, next) => {
        const ret = await getHtml()
        // console.log(ret, "ksajhdsakhd")
        await ctx.render('intro')
    },
    "get_rich": async (ctx, next) => {
        // 获取上传文件key
        const keys = Object.keys(ctx.request.files);
        let arr = [] ;
        keys.forEach(item => {
            // 获取上传路径
            const readPath = ctx.request.files[item].path;
            //获取上传文件名称
            const ext = ctx.request.files[item].name.split('.')[1];
            let time = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
            
            const name = time + '.' + ext
            // 生成写入路径
            const whritePath = path.join(__dirname,'../', 'assets', 'images','/') + name
            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(whritePath);
            readStream.pipe(writeStream);
            // console.log(readStream.pipe(writeStream).path.split('\\'));
            const red = readStream.pipe(writeStream).path.split('\\');
            const redPath = 'http://localhost:8000/'+ 'assets/' + 'images/' + red[red.length - 1];
            arr.push(redPath)
        })
        ctx.body = new SuccessModel(arr, "存储成功")
    },
    "insert_intro": async ctx => {
        const {html, id} = ctx.request.body;
        
        const ret = await insertIntro(html, id);
        console.log(ret)
        if (ret) {
            ctx.body = new SuccessModel("新建成功")
            return
        }
        ctx.body = new ErrorModel("新建失败")
    },
    "render_html": async ctx => {
        const {id} = ctx.request.body
        const ret = await getHtml(id)
        const html = ret ? ret.dataValues.content : ''
        if (html) {
            ctx.body = new SuccessModel({html}, "获取成功")
            return
        }
        ctx.body = new ErrorModel('获取失败')
    },
    "get_checked": async ctx => {
        let url = ctx.request.query;
        
        const ret = await getChecked(url.id)
        if (ret) {
            // let checked = ret.dataValues === true ? 'checked' : ''
            ctx.body = new SuccessModel({checked: ret.dataValues.status}, "获取成功")
            return
        }
        ctx.body = new ErrorModel('获取失败')
    }
}
