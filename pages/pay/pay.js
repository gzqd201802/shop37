// pages/cart/cart.js
import { myRequest } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr: [],
    totalMoney: 0,
    totalCount: 0,
    address: {},
    token:''
  },

  payHandle(){
    const {
      totalMoney,
      address,
      cartArr
    } = this.data;

    // !!! 需要安装后端要求传数据
    const goods = [];
    // 遍历数组
    cartArr.forEach(v=>{
      // 如果是选中状态
      if (v.goods_checked){
        // 添加到数组中，用于后台创建订单
        goods.push({
          goods_id: v.goods_id,
          // 注意这里的名称前后不一样
          goods_number: v.goods_count,
          goods_price: v.goods_price
        })
      }
    });

    console.log(goods);
    // 完善 myRequest 封装，如果 url 中包含了  my/ 就自动给请求的 header 添加 token
    myRequest({
      url:'my/orders/create',
      method:'POST',
      data:{
        order_price: totalMoney,
        consignee_addr: address.addressDetail,
        goods,
      }
    }).then(res=>{
      console.log(res);
    })
  },
  // 登录换取 token
  getToken(e){
    // console.log(e);
    const {
      encryptedData, iv, rawData, signature
    } = e.detail;

    wx.login({
      success:res=>{
        // console.log(res);
        const { code } = res;

        // 发起 post 请求获取 token
        myRequest({
          url:'users/wxlogin',
          method:'POST',
          data:{
            encryptedData, iv, rawData, signature, code
          }
        }).then(res=>{
          // console.log(res);
          if(res===null){
            wx.showToast({
              title: '登录失败,请重新登录',
            });
          }else{
            const { token } = res;
            this.setData({
              token
            });
            wx.setStorageSync('token', token);
            wx.setStorageSync('rawData', JSON.parse(rawData));
          }
          
        })

      }
    });


  },
  // 封装的方法，更新购物车列表，更新总价格，更新选中件数，更新全选按钮，更新本地存储
  updateCart(cartArr) {

    // 总价格
    let totalMoney = 0;
    // 商品总数
    let totalCount = 0;

    // 遍历购物车数组
    cartArr.forEach(v => {
      // 如果是选中的状态
      if (v.goods_checked) {
        // 计算总金额 = 数量 * 单价
        totalMoney += v.goods_count * v.goods_price;
        // 选中的商品数量累加
        totalCount++;
      }
    });

    // 更新视图
    this.setData({
      // 更新总价格
      totalMoney,
      // 更新选中商品数
      totalCount,
      // 更新购物车数据
      cartArr,
    });

    // 更新本地存储
    wx.setStorageSync('cartArr', cartArr);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取本地存储购物车的数据
    const cartArr = wx.getStorageSync('cartArr') || [];
    // 获取收货地址本地存储数据
    const address = wx.getStorageSync('address') || {};
    // 获取本地存储是否有 token
    const token = wx.getStorageSync('token') || '';
    // 地址信息更新到页面中
    this.setData({
      address,
      token
    })
    // 更新视图的变化，包括购物车列表，总价格，选中件数，全选按钮
    this.updateCart(cartArr);
  },

})