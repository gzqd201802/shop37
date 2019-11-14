// 小程序的 import 导入语法只能使用相对路径，相对路径有路径提示。
import {
  myRequest
} from '../../utils/request';
// console.log(myRequest);
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
    // 调用自己封装的 myRequest 函数，内部返回 Promise 实例
    myRequest({
      // 不需要传递根路径了
      url: 'categories'
    }).then(res => {
      // console.log('then回调函数的', res);
      // 返回值 res 已经是核心数据了，直接进行数据绑定
      this.setData({
        // 全部数据的绑定
        cateData: res,
        // 右侧商品数据绑定
        rightDate: res[0].children
      });
    })
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
    // 先清空了全部
    this.setData({
      activeIndex: 0,
      rightTop: 0,
      cateData: [],
      rightDate: []
    });
    // 在页面下拉刷新的时候获取数据
    this.getCatData();
  },

})