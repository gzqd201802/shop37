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

  // 获取收货地址功能
  getAddressHandle(){
    // 获取用户授权的情况
    wx.getSetting({
      success:res=>{
        // console.log(res.authSetting);
        // console.log(res.authSetting['scope.address'])
        // 如果用户点击了拒绝，需要引导用户重新在设置界面开启，否则收货地址接口无法调用
        if (res.authSetting['scope.address'] === false){
          // 打开用户设置界面
          wx.openSetting({
            success:res=>{
              // console.log(res);
              // 如果用户在设置界面开启了授权
              if (res.authSetting['scope.address'] === true){
                // // 通过 API 方式调用收货地址
                wx.chooseAddress({

                })
              }
            }
          });
        }
        // false      !!授权窗口点击了取消-用户拒绝了授权 - 打开设置界面 - 让用户点击开启授权
        // undefined  从来没有调用过授权请求的情况
        // true       授权窗口点击了确定-用户授权了
      }
    });

    // 通过 API 方式调用收货地址
    wx.chooseAddress({
      
    })

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

    // 遍历每一项，把 checkAll 取反后的状态更新列表每一项中
    cartArr.forEach(v => {
      v.goods_checked = !checkAll;
    });

    // 更新视图的变化，包括购物车列表，总价格，选中件数，全选按钮
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
      // 如果是选中的状态
      if (v.goods_checked) {
        // 计算总金额 = 数量 * 单价
        totalMoney += v.goods_count * v.goods_price;
        // 选中的商品数量累加
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取本地存储购物车的数据
    const cartArr = wx.getStorageSync('cartArr') || [];
    // 更新视图的变化，包括购物车列表，总价格，选中件数，全选按钮
    this.updateCart(cartArr);
  },

})