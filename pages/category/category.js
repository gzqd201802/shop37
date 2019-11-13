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

  // 获取分类数据功能封装抽离
  getCatData() {
    // 显示加载框
    wx.showLoading({
      title: '疯狂加载中...',
    });
    // 发起请求
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      // 请求成功的回调函数
      success: res => {
        // console.log(res);
        this.setData({
          cateData: res.data.message,
          // 专门把二级的保存到 rightDate 中
          rightDate: res.data.message[this.data.activeIndex].children
        })
      },
      // 请求失败的回调函数
      fail: err => {
        console.log('请求失败的业务逻辑', err);
      },
      // 请求结束的回调函数，不管成功还是失败都执行
      complete: res => {
        // 不管成功还是失败都执行隐藏提示框
        wx.hideLoading();
        // 在手机里面，还有主动调用隐藏加载的API
        wx.stopPullDownRefresh();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 在页面初次加载的时候获取数据
    this.getCatData();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 在页面下拉刷新的时候获取数据
    this.getCatData();
  },

})