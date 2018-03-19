// const baseUrl = 'http://dingdian-ppe.parllay.cn';
const baseUrl = 'http://dingdian-ppe.parllay.cn';
//const baseUrl = 'http://192.168.22.34:8080';

// export const qiniuBaseUrl = 'http://p1az9gcpw.bkt.clouddn.com/'http://goods.mydingdian.com 
export const qiniuBaseUrl = 'http://goods.mydingdian.com'
// 登录
export const login = baseUrl + '/wxserver/uemploye/checkEmploye'
// 活动详情列表
export const getActivity = baseUrl + '/wxserver/storeActivity/getActivity'
// 单个活动详情信息
export const getActivityById = baseUrl + '/wxserver/storeActivity/getActivityById'
// 查询商品集合列表
export const searchGoods = baseUrl + '/wxserver/storeActivity/searchGoods'
// 添加活动/wxserver/storeActivity/updateActivity
export const addActivity = baseUrl + '/wxserver/storeActivity/addActivity'
// 修改活动
export const updateActivity = baseUrl + '/wxserver/storeActivity/updateActivity'

//商品管理列表
//获取商品
export const getProducts = baseUrl + '/wxserver/goods/selectGoodsListBysSalesclerk';
//添加商品
export const addGoods = baseUrl + '/wxserver/goods/addGoodsBysSalesclerk';
//查询商品详情
//export const getGoodsDetails = baseUrl + '/wxserver/home/getGoodsDetails';
export const getGoodsDetailsNew = baseUrl + '/wxserver/goods/getGoodInfo';
//修改商品
export const updateGoods = baseUrl + '/wxserver/goods/updateGoodsBysSalesclerk';

//上下架商品
export const updateGoodsStatus = baseUrl + '/wxserver/goods/updateGoodsStatus';
//查询分类id
export const getCategory = baseUrl + '/wxserver/category/getCategory';

//获取七牛云接口
export const getQiniuToken = baseUrl + '/wxserver/imgUpload/upload';
//http://dingdian-ppe.parllay.cn/wxserver/imgUpload/upload?wxSid=&wxUid=

//获取叮店列表
export const getStoreList = baseUrl + '/wxserver/ustore/getStoreList';

//获取叮店详情并修改
export const getStoreInfo = baseUrl + '/wxserver/ustore/getStoreInfo';

//修改叮店信息
export const editStore = baseUrl + '/wxserver/ustore/editStore';
// 添加叮店
export const addStore = baseUrl + '/wxserver/ustore/addStore';
// https://gitee.com/dingdangyixia/wxserver/wikis/微信小程序二维码生成?parent=叮店API接口%2F小店管理%2F小店管理
// 获取店铺二维码
export const getCode = 'https://dingdian.parllay.cn/wxserver/tool/getQRCode_wxProgram'
//重置密码
export const updateEmploye = baseUrl + '/wxserver/uemploye/updateEmploye';
// 获取模版列表
// http://dingdian-ppe.parllay.cn/wxserver/template/getTemplateList
export const getTemplateList = baseUrl + '/wxserver/template/getTemplateList';
