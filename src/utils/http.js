
import config from '../config'

export function get(url,data) {
   return requset(url,'GET',data)
    
}

export function post(url,data) {
    return requset(url,'POST',data)
     
 }

function requset(url, method,data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host +url ,//开发者服务器接口地址",
      data: data, //请求的参数",
      method: method,
      dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: res => {
          wx.showLoading({
            title: 'Loading...', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
        resolve(
            res.data
        )
      },
      fail: (res) => {
        reject(
            res.data
        )
        wx.showLoading({
            title: 'Loading...', //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
          });
      },
      complete: () => {
          wx.hideLoading();
      }
    });
  })

}
