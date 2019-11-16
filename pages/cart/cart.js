// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArr:[]
  },

  // 加减号改变数量
  changeCount(e){
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

    // 根据索引找到数据，改变 number 数量
    cartArr[index].goods_count += number;
    
    // 判断是否越界，减号不能变负数，加号不能超过库存


    // 更新视图
    this.setData({
      cartArr
    });

    // 更新本地存储
    wx.setStorageSync('cartArr', cartArr);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
    const cartArr = wx.getStorageSync('cartArr') || [];

    this.setData({
      cartArr
    })


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})