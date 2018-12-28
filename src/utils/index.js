export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}
