// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeType: 1,
    // 用于 tabs 的数据
    tabs:[
      {
        type: 1,
        text: '全部'
      },
      {
        type: 2,
        text: '待付款'
      },
      {
        type: 3,
        text: '代发货'
      },
      {
        type: 4,
        text: '退款/退货'
      },
    ]
  },
  // 点击切换
  changeTabs(e){
    // 获取 type 值
    const { type } = e.currentTarget.dataset;
    // 更新视图
    this.setData({
      activeType: type
    });
    // console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})