const router = require('koa-router')()
const login = require('./login')
const department = require('./department')
const resuirc = require('./recruit')
const intro = require('./intro')
const invite = require('./invite')
const events = require('./events')
const job = require('./job')
const home = require('./home')
const exchange = require('./exchange')
const consult = require('./consult')
const product = require('./product')
const carousel = require('./carousel')
const postApi = require('./postApi')
const helpContent = require('./helpContent')
const communicate = require('./communicate')
const talk = require('./talk')
const evaluate = require('./evaluate')
// const error = require('./error')
router.get('/delivery/*', async (ctx, next) => {
        if (ctx.isAuthenticated()) {
            await next()
        } else {
            ctx.response.redirect('/')
        }
    })
    .get('/', login.home)
    .post('/api/login', login['login'])
    .get('/api/logout', login['logout'])
    // 员工部门
    .get('/delivery/department-structur', department['departmentStructur'])
    .post('/api/add_dep', department["add-dep"])
    .post('/api/del_dep', department["del_dep"])
    .post('/api/give_dep', department["give_dep"])
    .post('/api/edit_dep', department["edit_dep"])
    .post('/api/insert_stf', department["insert_stf"])
    .post('/api/get_tab', department["get_tab"])
    .post('/api/edit_emp', department["edit_emp"])
    .post('/api/del_emp', department["del_emp"])
    .post('/api/emp_info', department["emp_info"])
    .post('/api/change_status', department["change_status"])
    .post('/api/get_recruit', resuirc["get_recruit"]) //获取招聘信息
    .post('/api/pcat_bak', resuirc["pcat_bak"]) //获取省市级信息
    .post('/api/add_recruiter', resuirc["add_recruiter"]) //添加招聘信息
    .post('/api/edit_recruiter', resuirc["edit_recruiter"]) //编辑招聘信息
    .post('/api/detelte_recreit', resuirc["detelte_recreit"]) //删除招聘信息
    .post('/api/enable_recreit', resuirc["enable_recreit"]) //启用或停用
    .post('/api/adress_list', resuirc["adress_list"]) //获取地区管理列表
    .post('/api/adress_delete', resuirc["adress_delete"]) //地区管理 删除
    .post('/api/adress_enable', resuirc["adress_enable"]) //地区管理 启用或停用
    .post('/api/adress_add', resuirc["adress_add"]) //地区管理 添加
    .post('/api/adress_edit', resuirc["adress_edit"]) //地区管理 编辑
    .post('/api/get_recruit_List', resuirc['get_recruit_List'])//招聘信息分页
    .post('/api/get_classify', postApi["get_classify"])
    .post('/api/add_centent_title', helpContent["add_centent_title"])
    .post('/api/get_centent_title', helpContent["get_centent_title"])
    .post('/api/add_classify', postApi['add_classify']) //新增职业分类
    .post('/api/edit_classify', postApi['edit_classify']) //新增职业分类
    .post('/api/del_classify', postApi['del_classify']) //删除职·业分类
    .post('/api/change_classify_status', postApi['change_status']) //禁用职业分类
    .post('/api/del_product', product['del_product']) //删除产品
    .post('/api/show_item', product['show_item']) //设置产品是否展示
    .post('/api/new_product', product['new_product']) //新增产品
    .get('/api/get_module', home['indexModule']) //模块管理
    .get('/api/carousel_manage', carousel['carousel_manage']) //获取轮播图
    .post('/api/change_module_number', home['changeModuleNumber']) //修改模块排序
    .post('/api/change_module_status', home['changeModuleStatus']) //修改模块展示状态
    .post('/api/set_carousel_link', carousel['set_carousel_link']) //设置轮播图跳转链接
    .post('/api/set_carousel_timer', carousel['set_carousel_timer']) //设置轮播时间
    .post('/api/del_carousel', carousel['del_carousel']) //删除轮播图
    .post('/api/new_carousel', carousel['new_carousel']) //新增轮播图
    .post('/api/preview_product', product['preview_product']) //预览产品
    .post('/api/commit_modify',product['modify_product'])//修改产品
    .post('/api/communicate_list',communicate['communicate_list'])//公司交流列表
    .post('/api/edit_communicate_list',communicate['edit_communicate_list'])//编辑公司交流列表
    .post('/api/del_communicate_list',communicate['del_communicate_list'])//删除公司交流列表
    .post('/api/enable_commu',communicate['enable_commu'])//隐藏或显示公司交流列表
    .post('/api/get_communicate_list', communicate['get_communicate_list'])//分页展示公告列表
    .post('/api/get_communicate_detail', communicate['get_communicate_detail'])//公告详情
    // 招聘信息管理
    .get('/delivery/invite', invite['invite'])
    // 公司简介
    .get('/delivery/intro', intro['intro'])
    //企业文化
    .get('/delivery/culture', intro['intro'])
    // .get('/delivery/richText', intro['richText'])
    .post('/api/get_rich', intro['get_rich'])
    .post('/api/insert_intro', intro['insert_intro'])
    .post('/api/render_html', intro['render_html'])
    // 獲取展示首页状态
    .get('/api/get_checked', intro['get_checked'])
    // 职位分类
    .get('/delivery/job', job['jobClass'])
    // 首页展示
    .get('/delivery/home', home['indexManage'])
    // 公司公告
    .get('/delivery/notice', exchange['companyTalk'])
    // 公司交流
    .get('/delivery/exchange', exchange['companyTalk'])
    // 产品中心
    .get('/delivery/products', product['productsCenter'])
    // 咨询中心
    .get('/delivery/consult', consult['infoCenter'])
    // 插入资讯
    .post('/api/insert_info', consult['insert_info'])
    .post('/api/get_info', consult['get_info'])
    .post('/api/del_info', consult['del_info'])
    .post('/api/hide_info', consult['hide_info'])
    .post('/api/edit_info', consult['edit_info'])
    .post('/api/get_info_detail', consult['get_info_detail'])//获取资讯详情
    // 轮播管理
    .get('/delivery/carousel', carousel['turnManage'])
    //职业分类
    .get('/delivery/postClassify', postApi['postClassify'])
    //产品中心[志强]
    .get('/delivery/helpContent', helpContent['helpContent'])
    .post('/api/get_products', product['get_products']) //获取产品信息
    // 大事件
    .get('/delivery/events', events['events'])
    .post('/api/insert_event', events['insert_event']) // 插入事件
    .post('/api/del_event', events['del_event']) // 删除事件
    .post('/api/get_events', events['get_events'])//获取大事记
    // 公司交流 上传分享
    .post('/api/up_talk', talk['up_talk'])
    .post('/api/talk_pic', talk['talk_pic'])
    .post('/api/re_talk', talk['re_talk'])
    .post('/api/talk_detail', talk['talk_detail'])
    .post('/api/del_talk', talk['del_talk'])
    
    // 分享评论
    .post('/api/up_evaluate', evaluate['up_evaluate'])
    .post('/api/get_evaluate', evaluate['get_evaluate'])
    .post('/api/del_evaluate', evaluate['del_evaluate'])
module.exports = router
