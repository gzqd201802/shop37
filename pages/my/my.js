// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rawData:{},
    tabsData: [
      {
        id: 1,
        text: '选项卡1'
      },
      {
        id: 2,
        text: '选项卡2'
      },
      {
        id: 3,
        text: '选项卡3'
      },
      {
        id: 4,
        text: '选项卡4'
      },
    ],
    tabActiveId:1,
    sonData:1
  },

  changeContent(e){
    console.log(e.detail);
    this.setData({
      sonData: e.detail
    })
  },

  callMe(){
    // 拨打电话
    // wx.makePhoneCall({
    //   phoneNumber: '10086' //仅为示例，并非真实的电话号码
    // })

    // wx.getNetworkType({
    //   success :(res) =>{
    //     const networkType = res.networkType
    //     console.log(networkType);
    //   }
    // })

    wx.getSystemInfo({
      success: (res)=> {
        console.log(res);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const rawData = wx.getStorageSync('rawData') || {};
    this.setData({
      rawData
    })
  },

})