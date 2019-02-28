const BASEURL = "https://www.easy-mock.com/mock/5c45ceb40714c82b4138334e/example/";
const location = 'http://localhost:3000/';
const URL = {
    getShopingMallInfo: BASEURL + 'index',
    getGoodsInfo: BASEURL + 'getGoodsInfo',
    register:location+'user/register',
    login:location+'user/login',
    DetailGoodsInfo:location+'goods/getDetailGoodsInfo',
    getCategoryList:location+'goods/getCategoryList',//大类商品
    getCategorySubList:location+'goods/getCategorySub',//小类商品
    getCategoryByCategorySubId:location+'goods/getCategoryByCategorySubId',//分页商品
}
export default URL;