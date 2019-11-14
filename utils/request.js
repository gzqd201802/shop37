const baseURL = 'https://api.zbztb.cn/api/public/v1/';

// 我们预期调用时候的写法
// myRequest 内部需要返回一个 promise 的实例，外面才可以调用 then
// myRequest({
//   url: 'categories',
//   data: {},
//   method: 'POST'
// }).then(res => {
// })

export const myRequest = (obj) => {
  // resolve 成功时候的回调函数，对应  实例.then()
  // reject  失败时候的回调函数，对应  实例.catch()
  return new Promise((resolve, reject) => {
    // 内部的代码发起请求
    wx.request({
      ...obj,
      // 拼接 url 路径
      url: baseURL + obj.url,
      // 成功时候的回调函数 resolve
      success: respone => {
        // console.log('Promise内部封装', respone.data.message);
        // 直接把 respone.data.message 数据作为实参，对应 then 时候的的 res 值
        resolve(respone.data.message);
      },
      // 失败时候的回调函数 reject
      fail: res => {
        reject(res)
      }
    });
  })
}