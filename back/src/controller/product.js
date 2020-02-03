const {sequelize} = require('../db/db');

//获取产品信息
const getProducts = async () => {
  const sql = 'select * from gw_product'
  const res = await sequelize.query(sql)
  return res[0]
}
//删除产品
const delProduct = async (id) => {
  const sql = `delete from gw_product where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}
//设置产品是否展示
const showItem = async (id, status) => {
  const sql = `update gw_product set status=${status} where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}
//新增商品
const newProduct = async (data) => {
  const sql = `insert into gw_product (serial_number,pro_name,product_desc,logo,android_link,ios_link,link_code) values ('${data.serial_number}','${data.pro_name}','${data.product_desc}','${data.logo}','${data.android_link}','${data.ios_link}','${data.link_code}')`
  const res = await sequelize.query(sql)
  return res[0]
}
//预览产品
const previewProduct = async (id) => {
  const sql = `select * from gw_product where id=${id}`
  const res = await sequelize.query(sql)
  return res[0]
}
//修改产品
const modifyProduct = async (data) => {
  const sql = `update gw_product set serial_number='${data.serial_number}',pro_name='${data.pro_name}',product_desc='${data.product_desc}',logo='${data.logo}',android_link='${data.android_link}',ios_link='${data.ios_link}',link_code='${data.link_code}' where id=${data.id}`
  const res = await sequelize.query(sql)
  return res[0]
}
module.exports = {
  getProducts,
  delProduct,
  showItem,
  newProduct,
  previewProduct,
  modifyProduct
}