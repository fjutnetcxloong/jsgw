const fs = require('fs')
const path = require('path')
const {
    upTalk,
    reTalk,
    talkDetail,
    delTalk
} = require('../controller/talkController')
const {
    SuccessModel,
    ErrorModel
} = require('../config/model')

module.exports = {
    "up_talk": async ctx => {
        const {
            pic,
            content,
            title,
            department,
            username
        } = ctx.request.body
        console.log(department)
        const ret = await upTalk(pic, content, title, department, username)
        if (ret) {
            ctx.body = new SuccessModel('上传成功')
            return
        }
        ctx.body = new ErrorModel('上传失败')
    },
    "talk_pic": async ctx => {
        // const pic =  
        // console.log(ctx.request.files.files.path, "即可洒很快就爱上")
        const readPath = ctx.request.files.files.path
        let time = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222);
        const ext = ctx.request.files.files.name.split('.')[1];
        const name = time + '.' + ext
        const whritePath = path.join(__dirname, '../', 'assets', 'images', '/') + name
        const readStream = fs.createReadStream(readPath)
        const writeStream = fs.createWriteStream(whritePath)
        const red = readStream.pipe(writeStream).path.split('\\');
        const redPath = 'http://localhost:8000/' + 'assets/' + 'images/' + red[red.length - 1];
        // console.log(redPath, "的手机卡和第三届啊哈")
        ctx.body = new SuccessModel({
            pic: 'http://localhost:8000/' + 'assets/' + 'images/' + red[red.length - 1]
        }, '上传成功')
    },
    "re_talk": async ctx => {
        const {limit, page, key_val, job, start_time} = ctx.request.body;
        const ret = await reTalk(limit, page, key_val, job, start_time)
        if (ret) {
            ctx.body = new SuccessModel(ret, '查询成功')
            return
        }
        ctx.body = new ErrorModel('查询失败')
    },
    "talk_detail": async ctx => {
        const { id, is_read } = ctx.request.body
        if (!id) {
            throw new Error('id Error')
        }
        const data = await talkDetail(id, is_read)
        // console.log(data)
        if (data) {
            ctx.body = new SuccessModel(data.dataValues, '查询成功')
            return
        }
        ctx.body = new ErrorModel('查询失败')
    },
    "del_talk": async ctx => {
        const { id } = ctx.request.body
        if (!id) {
            ctx.body = new ErrorModel('id err')
            return;
        }
        const ret = await delTalk(id)
        if (ret) {
            ctx.body = new SuccessModel('删除成功')
            return
        }
        ctx.body = new ErrorModel('删除失败')
    }
}
