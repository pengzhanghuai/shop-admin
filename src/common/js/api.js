// index.js配置文件名字更改的写法
// let useradd = "/jiekou/api/useradd";
// let userdel = "/jiekou/api/userdel";
// let userlist = "/jiekou/api/userlist";
// let useredit = '/jiekou/api/userinfo';

//这里的是管理员的接口
let useradd = "/api/useradd";//管理员添加
let userdel = "/api/userdel";//管理员删除
let userlist = "/api/userlist";//管理员列表
let userinfo = '/api/userinfo';//获取一条信息修改
let useredit = '/api/useredit';//管理员编辑
// 这里是登录接口
let login = '/api/login';
// 这里是商品列表接口
let cateadd = "/api/cateadd";//商品分类添加
let catedel = "/api/catedel";//商品分类删除
let catelist = "/api/catelist";//商品分类列表
let cateinfo = '/api/cateinfo';//获取一条信息修改
let cateedit = '/api/cateedit';//商品分类编辑
//这里是商品接口
let goodsadd = "/api/goodsadd";//商品添加
let goodsdel = "/api/goodsdel";//商品删除
let goodslist = "/api/goodslist";//商品列表
let goodsinfo = '/api/goodsinfo';//获取一条信息修改
let goodsedit = '/api/goodsedit';//商品编辑
// 这里是轮播图接口
let banneradd = "/api/banneradd";//轮播图添加
let bannerdel = "/api/bannerdel";//轮播图删除
let bannerlist = "/api/bannerlist";//轮播图列表
let bannerinfo = '/api/bannerinfo';//获取一条信息修改
let banneredit = '/api/banneredit';//轮播图编辑

export default { 
useradd, userdel, userlist, userinfo, useredit,
login,
cateadd, catedel, catelist, cateinfo, cateedit,
goodsadd, goodsdel, goodslist, goodsinfo, goodsedit,
banneradd, bannerdel, bannerlist, bannerinfo, banneredit,
}