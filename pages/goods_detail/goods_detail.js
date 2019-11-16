/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */

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
  goToCart() {
    // 通过js的方式跳转页面
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },

  // 加入购物车业务
  addToCart() {

    // 从本地存储中获取数据
    const cartArr = wx.getStorageSync('cartArr') || [];

    // 注意数组方法 findIndex，根据当前商品 goods_id 查找索引
    const goodsIndex = cartArr.findIndex(item => {
      // goods_id 相同的时候，返回索引值
      return item.goods_id === this.data.goodsDetail.goods_id
    });

    // console.log('当前商品的所在的索引是',goodsIndex);

    // // 1. 没有存过的商品，索引就为 -1，初始化数据，并把数量 goods_count 设置为 1
    if (goodsIndex === -1) {
      // 提取当前商品的核心信息
      const {
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo
      } = this.data.goodsDetail;

      // 添加到数组中
      cartArr.push({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        // 初始化选中状态
        goods_checked: true,
        // 初始化数量为 1
        goods_count: 1
      });
    } else {
      // 2. 如果有，就数量累加
      cartArr[goodsIndex].goods_count += 1;
    }

    // console.log(cartArr);
    // 把数据保存到本地存储中
    wx.setStorageSync('cartArr', cartArr);

    // 弹窗提示用户添加成功
    wx.showToast({
      // 默认的icon，可选值，success，loading，none
      // icon:'none',
      // 自定义图标 - 图标级别高于 icon
      image: '/images/default.svg',
      // 提示文字
      title: '加入购物车成功',
      // 持续时间
      duration: 1000,
      // !透明遮罩，防止点击穿透
      mask: true
    });

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 从页面参数中提取出商品 goods_id，用于发送请求的
    const {
      goods_id
    } = options;
    // 以上ES6写法功能等价于以下一行代码
    // const goods_id = options.goods_id

    // 向服务器发起商品详情数据请求
    myRequest({
      // 请求地址
      url: 'goods/detail',
      // 商品 goods_id 参数
      data: {
        goods_id
      }
    }).then(res => {
      // 请求成功的回调函数
      this.setData({
        // 商品总数据
        goodsDetail: res,
        // 富文本详情内容，由于 ios 系统不支持 webp 图片格式，替换成 jpg 格式
        introduce: res.goods_introduce.replace(/jpg.+?webp/g, 'jpg')
      })
    })

  },

})