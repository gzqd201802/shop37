Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图的数据名称
    swiperData: [],
    navData: [],
    floorData: [],
  },

  // 自定义事件处理函数，用于实现返回顶部的
  goToTop(e) {
    console.log('事件被触发了', e.currentTarget.dataset);

    wx.pageScrollTo({
      scrollTop: e.currentTarget.dataset.scroll,
      duration: e.currentTarget.dataset.duration
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(this);
    console.log('onLoad，首页加载的时候，就请求首页的数据');
    // 发起请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      // success 注意写成箭头函数写法，否则内部的 this 指向错误
      success: res => {
        // 这种直接赋值的写法是不行的，不会更新视图
        // this.swiperData = res.data.message;
        // 在小程序中需要通过 this.setData(对象)  更新页面的数据和视图
        this.setData({
          swiperData: res.data.message
        });
      }
    });

    // 发起导航入口数据请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: res => {
        // console.log(res.data.message);
        this.setData({
          navData: res.data.message
        })
      }
    });


    // 发起楼层数据请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: res => {
        // console.log(res.data.message);
        this.setData({
          floorData: res.data.message
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload');
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