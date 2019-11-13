// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    rightTop: 0,
    cateData: [],
    rightDate: []
  },

  // 切换 tab 索引的事件处理函数
  changeTab(e) {
    // 注意，小程序的事件参数获取比较麻烦，需要通过事件对象的自定义属性获取
    // 前期大家书写的时候容易写错,建议大家先在控制台打印出来,查看数据的结构
    // e.currentTarget.dataset.index;
    // console.log(e);
    // 点击的时候, 主动更新 activeIndex 的值
    const index = e.currentTarget.dataset.index;
    // console.log(this.data.cateData);  // this 代表页面实例
    this.setData({
      // 左侧选项卡索引
      activeIndex: index,
      // 重新让右侧盒子滚动到顶部
      rightTop: 0,
      // this 代表页面实例，从页面中原本绑定过的数据中，提取出来一部分绑定到 rightDate 中
      rightDate: this.data.cateData[index].children
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 发起请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      success: res => {
        // console.log(res);
        this.setData({
          cateData: res.data.message,
          // 专门把二级的保存到 rightDate 中
          rightDate: res.data.message[this.data.activeIndex].children
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})