// pages/search/search.js
import { myRequest } from '../../utils/request'

let timer = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索提示列表
    tipsList:[],
    // 输入框文字绑定
    inputText:'',
    // 搜索历史
    history:[]
  },
  // 输入事件，获取用户输入
  inputHandle(e){
    console.log('键盘输入的时候',e);
    // 小程序需要通过事件对象 e.detail.value 获取输入框的值
    const { value } = e.detail;

    // 把值进行数据绑定
    this.setData({
      inputText:value
    })

    // 清除上一个启动的定时器-用于防抖，减少服务器多余请求的压力
    clearTimeout(timer);

    // 如果用户没有输入内容 - return 退出，减少服务器多余请求的压力
    if(value.trim() === ''){
      return;
    }

    // 通过启动一个新的定时器，在用户输入后 500 ms 后自动再发送，，减少服务器多余请求的压力
    timer = setTimeout(()=>{
      // 发送请求写到定时器内部
      myRequest({
        url:'goods/qsearch',
        data:{
          // 提示查询参数 query
          query: value
        },
      }).then(res=>{
        // 数据绑定到页面中
        this.setData({
          tipsList:res
        })
      })
    },500);


  },

  // 点击键盘的完成按钮 - 模拟器是按回车键触发
  submitHandle(e){
    console.log('键盘按完成的时候',e);
    // 获取用户输入的值
    const { value } = e.detail;

    // 获取本地的搜索历史
    let history = wx.getStorageSync('history') || [];

    // 历史是前添加
    history.unshift(value);

    // 通过 Set 对象去除 Array 对象的重复项，最终通过解构变回 Array 数组
    history = [...new Set(history)];

    // 更新页面视图
    this.setData({
      history
    });

    // 更新本地存储的值
    wx.setStorageSync('history',history);


  },
  // 清除输入框内容 
  clearInput(){
    // 清空输入框的 value 值
    this.setData({
      inputText:''
    })
  },
  /**
   * 生命周期函数--
   */
  onShow: function (options) {
    const history = wx.getStorageSync('history') || [];
    // 更新页面视图
    this.setData({
      history
    });
  },

})