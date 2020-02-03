const {sequelize} = require('../db/db');

//获取轮播图
const getCarousel = async () => {
  const sql = 'select * from gw_carousel'
  const res = await sequelize.query(sql)
  return res[0]
}

//模块管理
const getModules = async () => {
  const sql = 'select * from gw_index_module'
  const res = await sequelize.query(sql)
  return res[0]
}

//修改模块排序
const changeModuleNumber = async (module_number, id) => {
  const sql = `update gw_index_module set module_number=${module_number} where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}

//展示开关
const changeModuleStatus = async (status, id) => {
  const sql = `update gw_index_module set status=${status} where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}

//设置轮播图跳转链接
const setCarouselLink = async (link, pic_address, id) => {
  let sql;
  if(pic_address){
    sql = `update gw_carousel set link='${link}',pic_address='${pic_address}' where id=${id}`
  } else {
    sql = `update gw_carousel set link='${link}' where id=${id}`
  }
  
  const res = await sequelize.query(sql)
  return res[0]
} 

//设置轮播时间
const setCarouselTimer = async (carouselTimer) => {
  const sql = `update gw_carousel set carousel_timer=${carouselTimer} where 1=1`
  const res = await sequelize.query(sql)
  return res[0]
}

//删除轮播图
const delCarousel = async (id) => {
  const sql = `delete from gw_carousel where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}

//新增轮播图
const newCarousel = async (pic_address) => {
  const sql = `insert into gw_carousel (pic_address) values ('${pic_address}')`
  const res = await sequelize.query(sql)
  return res[0]
}

module.exports = {
  getCarousel,
  getModules,
  changeModuleNumber,
  changeModuleStatus,
  setCarouselLink,
  setCarouselTimer,
  delCarousel,
  newCarousel
}