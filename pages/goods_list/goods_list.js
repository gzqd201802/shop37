/* 
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 21 / 20 ) = 2
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 
      表示 没有下一页数据

  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组 
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果
 */
import {
  myRequest
} from '../../utils/request.js'
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsData: {},
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 20,
    total: 0
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
        goodsData: res,
        total: res.total
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('goods_list的onLoad', options);
    // 解构页面的参数
    const {
      cid,
      query
    } = options;
    // console.log(cid);
    this.setData({
      cid,
      query
    })

    const {
      pagenum,
      pagesize
    } = this.data;

    this.getGoods({
      // 传递 cid，请求的时候需要根据 cid 查询数据，注意这里的名字不能改
      cid,
      query,
      pagenum,
      pagesize
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