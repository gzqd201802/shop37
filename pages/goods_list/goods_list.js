import {
  myRequest
} from '../../utils/request.js'
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {}
  },

  // 封装列表页请求数据
  getGoods(obj) {

    myRequest({
      // url 路径，注意有 goods 
      url: 'goods/search',
      // data 请求的参数
      data: {
        // cid 从分类页过来的 cid 值
        // cid: "5"
        ...obj
      }
    }).then(res => {
      this.setData({
        goodsData: res
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('goods_list的onLoad', options);
    const {
      cid,
      query
    } = options;
    // console.log(cid);

    this.getGoods({
      // 传递 cid，根据分类 id 查询数据
      cid
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
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload-普通页卸载');
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