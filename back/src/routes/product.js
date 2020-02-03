const {getProducts, delProduct, showItem, newProduct, previewProduct, modifyProduct } = require('../controller/product');
const {SuccessModel, ErrorModel} = require('../config/model')
const path = require('path');
const fs = require('fs');

module.exports = {
    'productsCenter': async (ctx, next) => {
        await ctx.render('productsCenter')
    },
    //获取产品信息
    'get_products': async ctx => {
        const res = await getProducts();
        if (res) {
            ctx.body = new SuccessModel(res, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //删除产品
    'del_product': async ctx => {
        const res = await delProduct(ctx.request.body.id);
        if(res) {
            ctx.body = new SuccessModel(res, '删除成功')
            return;
        }
        ctx.body = new ErrorModel('删除失败')
    },
    //设置是否展示
    'show_item': async ctx => {
        const res = await showItem(ctx.request.body.id, ctx.request.body.status);
        if(res) {
            ctx.body = new SuccessModel('设置成功')
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    },
    //新建产品
    'new_product': async ctx => {
        // 获取上传文件key
        const keys = Object.keys(ctx.request.files);
        let arr = [] ;
        keys.forEach(item => {
            // 获取上传路径
            const readPath = ctx.request.files[item].path;
            //获取上传文件名称
            const readName = ctx.request.files[item].name;
            // 生成写入路径
            const whritePath = path.join(__dirname,'../', 'assets', 'img','/') + `${Date.now()}-${readName}`;
            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(whritePath);
            readStream.pipe(writeStream);
            // console.log(readStream.pipe(writeStream).path.split('\\'));
            const red = readStream.pipe(writeStream).path.split('\\');
            const redPath = 'http://localhost:8000/'+ 'assets/' + 'img/' + red[red.length - 1];
            arr.push(redPath)
        })
        ctx.request.body.logo = arr[0]
        ctx.request.body.link_code = arr[1]
        const res = await newProduct(ctx.request.body);
        if(res) {
            ctx.body = new SuccessModel(res, '增加成功')
            return;
        }
        ctx.body = new ErrorModel('增加失败')
    },
    //预览产品
    'preview_product': async (ctx, next) => {
        const res = await previewProduct(ctx.request.body.id)
        if(res) {
            ctx.body = new SuccessModel(res, '预览成功')
            return;
        }
        ctx.body = new ErrorModel('预览失败')
    },
    //修改产品
    'modify_product': async (ctx, next) => {
        // 获取上传文件key
        const keys = Object.keys(ctx.request.files);
        let arr = [] ;
        keys.forEach(item => {
            // 获取上传路径
            const readPath = ctx.request.files[item].path;
            //获取上传文件名称
            const readName = ctx.request.files[item].name;
            // 生成写入路径
            const whritePath = path.join(__dirname,'../', 'assets', 'img','/') + `${Date.now()}-${readName}`;
            const readStream = fs.createReadStream(readPath);
            const writeStream = fs.createWriteStream(whritePath);
            readStream.pipe(writeStream);
            // console.log(readStream.pipe(writeStream).path.split('\\'));
            const red = readStream.pipe(writeStream).path.split('\\');
            const redPath = 'http://localhost:8000/'+ 'assets/' + 'img/' + red[red.length - 1];
            if(item==='logo'){
                arr['logo'] = redPath
            } else {
                arr['link_code'] = redPath
            }
        })
        console.log(arr, 'aaaaaaaaaa')
        if(arr['logo']){
            ctx.request.body.logo = arr['logo']
        }
        if(arr['link_code']){
            ctx.request.body.link_code = arr['link_code']
        }
        const res = await modifyProduct(ctx.request.body)
        if(res) {
            ctx.body = new SuccessModel(res, '修改成功')
            return;
        }
        ctx.body = new ErrorModel('修改失败')
    }
}