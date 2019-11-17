// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr: [],
    totalMoney: 0,
    totalCount: 0,
    checkAll: false
  },

  // 加减号改变数量
  changeCount(e) {
    const {
      // 加减数量
      number,
      // 当前商品索引值
      index,
    } = e.currentTarget.dataset;
    // console.log(number, index);

    // 获取列表数据
    const {
      cartArr
    } = this.data;


    // 判断是否越界，减号不能变负数，加号不能超过库存
    if (cartArr[index].goods_count === 1 && number === -1) {
      wx.showModal({
        content: '是否要删除商品',
        // 确定文字
        confirmText: '删除',
        confirmColor: '#f00',
        success: res => {
          // 在点击确认按钮后
          if (res.confirm) {
            // 删除商品
            cartArr.splice(index, 1);
            // 记得在异步回调函数内部更新数据
            this.updateCart(cartArr);
          }
        }
      });
    } else {
      // 根据索引找到数据，改变 number 数量
      cartArr[index].goods_count += number;
      this.updateCart(cartArr);
    }

  },

  // 改变选中状态
  changeCheck(e) {
    const {
      // 当前商品索引值
      index,
    } = e.currentTarget.dataset;

    // 解构获取购物车数据
    const {
      cartArr
    } = this.data;

    // 获取当前商品的选中状态，取反，再赋值更新
    cartArr[index].goods_checked = !cartArr[index].goods_checked;

    // 调用封装的方法，更新购物车列表，更新总价格，更新选中件数，更新全选按钮，更新本地存储
    this.updateCart(cartArr);


  },
  // 全选按钮
  changeCheckAll() {
    let {
      checkAll,
      cartArr
    } = this.data;

    cartArr.forEach(v => {
      v.goods_checked = !checkAll;
    });

    this.updateCart(cartArr);
  },

  // 封装的方法，更新购物车列表，更新总价格，更新选中件数，更新全选按钮，更新本地存储
  updateCart(cartArr) {

    // 总价格
    let totalMoney = 0;
    // 商品总数
    let totalCount = 0;

    // 遍历购物车数组
    cartArr.forEach(v => {
      if (v.goods_checked) {
        totalMoney += v.goods_count * v.goods_price;
        totalCount++;
      }
    });

    // 全选状态：购物车总商品长度 === 选择状态长度
    // console.log(cartArr.length === totalCount)

    // 更新视图
    this.setData({
      // 更新总价格
      totalMoney,
      // 更新选中商品数
      totalCount,
      // 更新购物车数据
      cartArr,
      // 更新全选状态
      checkAll: cartArr.length === totalCount
    });

    // 更新本地存储
    wx.setStorageSync('cartArr', cartArr);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow');
    const cartArr = wx.getStorageSync('cartArr') || [];

    this.updateCart(cartArr);
    // this.setData({
    //   cartArr
    // })


  },

})