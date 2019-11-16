// pages/goods_detail/goods_detail.js
import {
  myRequest
} from '../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    introduce: ''
  },

  previewBigImage(e) {
    const {
      curr
    } = e.currentTarget.dataset;

    wx.previewImage({
      current: curr,
      // 数组里面每一项要求是图片的路径，字符格式
      urls: this.data.goodsDetail.pics.map(v => v.pics_big),
    });

  },

  // 跳转购物车页面
  goToCart(){
    // 通过js的方式跳转页面
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const {
      goods_id
    } = options;

    // const goods_id = options.goods_id


    myRequest({
      url: 'goods/detail',
      data: {
        goods_id
      }
    }).then(res => {


      this.setData({
        goodsDetail: res,
        introduce: res.goods_introduce.replace(/jpg.+?webp/g, 'jpg')
      })
    })

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