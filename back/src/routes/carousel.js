const {getCarousel, setCarouselLink, setCarouselTimer, delCarousel, newCarousel} = require('../controller/indexManage')
const {SuccessModel, ErrorModel} = require('../config/model')
const path = require('path');
const fs = require('fs');

module.exports = {
    'turnManage': async (ctx, next) =>{
        const carouselList = await getCarousel()
        await ctx.render('turnManage', {carouselList})
    },
    //获取轮播图列表
    'carousel_manage': async (ctx, next) => {
        const res = await getCarousel();
        if (res) {
            ctx.body = new SuccessModel(res, "获取列表成功")
            return;
        }
        ctx.body = new ErrorModel('获取列表失败')
    },
    //设置轮播图、跳转链接
    'set_carousel_link': async (ctx, next) => {
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
            const redPath = 'http://localhost:8000/'+ 'assets/' + 'image/' + red[red.length - 1];
            arr.push(redPath)
        })
        ctx.request.body.pic_address = arr[0]
        const res = await setCarouselLink(ctx.request.body.link, ctx.request.body.pic_address, ctx.request.body.id)
        if (res) {
            ctx.body = new SuccessModel(res, "设置成功")
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    },
    //设置轮播时间
    'set_carousel_timer': async (ctx, next) => {
        const res = await setCarouselTimer(ctx.request.body.carouselTimer)
        if (res) {
            ctx.body = new SuccessModel(res, "设置成功")
            return;
        }
        ctx.body = new ErrorModel('设置失败')
    },
    //删除轮播图
    'del_carousel': async (ctx, next) => {
        const res = await delCarousel(ctx.request.body.id)
        if (res) {
            ctx.body = new SuccessModel(res, "删除成功")
            return;
        }
        ctx.body = new ErrorModel('删除失败')
    },
    //新增轮播图
    'new_carousel': async (ctx, next) => {
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
        ctx.request.body.pic_address = arr[0]
        const res = await newCarousel(ctx.request.body.pic_address)
        if (res) {
            ctx.body = new SuccessModel(res, "添加成功")
            return;
        }
        ctx.body = new ErrorModel('添加失败')
    }
}