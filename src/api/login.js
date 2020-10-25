import service from '../utils/request.js'

//登录
// export function sgflogin(data) {
//     return service.request({
//         method: 'post',
//         url: '/user/login',
//         data: data
//             //左边的data是变量名（key）后台接受的，右边的data是接受的参数，如果两者同名的情况下，可以写一个即可（es6写法）
//     })
// }

export const sgflogin = async(data) => service.post('/user/login', data)

//创融
//创融删除接口
export const CRDeleteInfo = async(data) => await service.post('/RongCh/delete', data)

//创融重试按钮发送id
export const CRRetest = async(data) => await service.post('/RongCh/retest/' + data)

//创融筛选接口
export const CRShaixuan = async(data) => await service.post('/RongCh/findByLeaseHolder', data)

//创融楼宇筛选接口
export const CRLouyuShaixuan = async(data) => await service.post('/RongCh/findByLeaseHolder/CRZL', data)

//鼎业大厦筛选接口
export const CRDingyeShaixuan = async(data) => await service.post('/RongCh/findByLeaseHolder/XDZL', data)

//无锡东站筛选接口
export const CRDongzhanShaixuan = async(data) => await service.post('/RongCh/findByLeaseHolder/DZSY', data)

//浙大网新筛选接口
export const CRZhedaShaixuan = async(data) => await service.post('/RongCh/findByLeaseHolder/ZDWX', data)

//获取创融信息列表接口
export const CRGetEnterList = async(data) => await service.post('/RongCh/queryList', data)

//获取创融列表接口
export const CRGetList = async(data) => await service.post('/RongCh/queryChuangRongList', data)

//获取浙大网新信息列表接口
export const CRGetZhedaList = async(data) => await service.post('/RongCh/queryZheDaList', data)

//获取鼎业大厦信息列表接口
export const CRGetDingyeList = async(data) => await service.post('/RongCh/queryYanKuangList', data)

//获取无锡东站信息列表接口
export const CRGetDongzhanList = async(data) => await service.post('/RongCh/queryDongZhanList', data)

//创融新增信息列表接口
export const CRAddInfo = async(data) => await service.post('/RongCh/add', data)

//创融编辑信息列表接口
export const CRUpdateInfo = async(data) => await service.post('/RongCh/update', data)

//获取创融编辑信息列表接口
export const CRGetEditInfo = async(data) => await service.post('/RongCh/findByXid/' + data)

//获取创融A合同编号接口
export const CRGetContractIdChuangA = async() => await service.get('/RongCh/getChuangA')

//获取创融B合同编号接口
export const CRGetContractIdChuangB = async() => await service.get('/RongCh/getChuangB')

//获取创融C合同编号接口
export const CRGetContractIdChuangC = async() => await service.get('/RongCh/getChuangC')

//获取创融D合同编号接口
export const CRGetContractIdChuangD = async() => await service.get('/RongCh/getChuangD')

//获取无锡东站A合同编号接口
export const CRGetContractIdDongA = async() => await service.get('/RongCh/getDongA')

//获取无锡东站B合同编号接口
export const CRGetContractIdDongB = async() => await service.get('/RongCh/getDongB')

//获取无锡东站C合同编号接口
export const CRGetContractIdDongC = async() => await service.get('/RongCh/getDongC')

//获取无锡东站下沉合同编号
export const CRGetContractIdXia = async() => await service.get('/RongCh/getDongXia')

//获取多经合同编号
export const CRGetContractIdDuo = async() => service.get('/RongCh/getDuo')

//获取鼎业合同编号
export const CRGetContractIdYanKuang = async() => service.get('/RongCh/getYanKuang')

//获取浙大网新合同编号
export const CRGetContractIdZheDa = async() => service.get('/RongCh/getZheDa')

//获取创融A租赁位置
export const CRChuangAGetLocations = async() => service.get('/RongCh/queryRongChuangALocation')

//获取创融B租赁位置
export const CRChuangBGetLocations = async() => service.get('/RongCh/queryRongChuangBLocation')

//获取创融C租赁位置
export const CRChuangCGetLocations = async() => service.get('/RongCh/queryRongChuangCLocation')

//获取创融D租赁位置
export const CRChuangDGetLocations = async() => service.get('/RongCh/queryRongChuangDLocation')

//获取无锡东站A租赁位置
export const CRDongAGetLocations = async() => service.get('/RongCh/queryDongZhanALocation')

//获取无锡东站B租赁位置
export const CRDongBGetLocations = async() => service.get('/RongCh/queryDongZhanBLocation')

//获取无锡东站C租赁位置
export const CRDongCGetLocations = async() => service.get('/RongCh/queryDongZhanCLocation')

//获取无锡东站下沉租赁位置
export const CRXiaGetLocations = async() => service.get('/RongCh/queryDongZhanXiaChenLocation')

//获取多经租赁位置
export const CRDuoGetLocations = async() => service.get('/RongCh/queryDuoJingLocation')

//获取鼎业租赁位置
export const CRYanGetLocations = async() => service.get('/RongCh/queryYankuangLocation')

//获取浙大网新租赁位置
export const CRZheDaGetLocations = async() => service.get('/RongCh/queryZheDaLocation')




//映月
//映月删除接口
export const YYDeleteInfo = async(data) => await service.post('/YingYue/delete', data)

//映月新增信息列表接口
export const YYAddInfo = async(data) => await service.post('/YingYue/add', data)

//映月重试按钮发送id
export const YYRetest = async(data) => await service.post('/YingYue/retest/' + data)

//映月编辑信息列表接口
export const YYUpdateInfo = async(data) => await service.post('/YingYue/update', data)

//映月筛选信息列表接口
export const YYShaixuan = async(data) => await service.post('/YingYue/findByLeaseHolder', data)

//映月获取信息列表接口
export const YYGetEnterList = async(data) => await service.post('/YingYue/queryList', data)

//获取映月编辑信息列表接口
export const YYGetEditInfo = async(data) => await service.post('/YingYue/findByXid/' + data)

//获取映月合同编号接口
export const YYGetXxid = async() => await service.get('/YingYue/getContractID')

//获取映月租赁位置
export const YYGetLocation = async() => await service.get('/YingYue/queryYingYueLocation')



//商铺
//商铺删除接口
export const SPDeleteInfo = async(data) => await service.post('/ShangPu/delete', data)

//商铺新增信息列表接口
export const SPAddInfo = async(data) => await service.post('/ShangPu/add', data)

//商铺编辑信息列表接口
export const SPUpdateInfo = async(data) => await service.post('/ShangPu/update', data)

//商铺重试按钮发送id
export const SPRetest = async(data) => await service.post('/ShangPu/retest/' + data)

//商铺筛选信息列表接口
export const SPShaixuan = async(data) => await service.post('/ShangPu/findByLeaseHolder', data)

//商铺获取信息列表接口
export const SPGetEnterList = async(data) => await service.post('/ShangPu/queryList', data)

//获取商铺编辑信息列表接口
export const SPGetEditInfo = async(data) => await service.post('/ShangPu/findByXid/' + data)

//获取山韵合同编号
export const SPSYGetContractId = async() => await service.get('/ShangPu/getShanYunContractID')

//获取水岸合同编号
export const SPSAGetContractId = async() => await service.get('/ShangPu/getShuiAnContractID')

//获取山韵租赁位置
export const SPSYGetLocations = async() => await service.get('/ShangPu/queryShanYunLocation')

//获取水岸租赁位置
export const SPSAGetLocations = async() => await service.get('/ShangPu/queryShuiAnLocation')



//人才公寓
//人才公寓删除接口
export const GYDeleteInfo = async(data) => await service.post('/RenCai/delete', data)

//人才公寓新增信息列表接口
export const GYAddInfo = async(data) => await service.post('/RenCai/add', data)

//人才公寓重试按钮发送id
export const GYRetest = async(data) => await service.post('/RenCai/retest/' + data)

//人才公寓编辑信息列表接口
export const GYUpdateInfo = async(data) => await service.post('/RenCai/update', data)

//人才公寓筛选信息列表接口
export const GYShaixuan = async(data) => await service.post('/RenCai/findByLeaseHolder', data)

//人才公寓获取信息列表接口
export const GYGetEnterList = async(data) => await service.post('/RenCai/queryList', data)

//获取人才公寓编辑信息列表接口
export const GYGetEditInfo = async(data) => await service.post('/RenCai/findByXid/' + data)

//获取人才公寓合同编号接口
export const GYGetXxid = async() => await service.get('/RenCai/getContractID')

//获取人才公寓租赁位置
export const GYGetLocation = async() => await service.get('/RenCai/queryRenCaiLocation')