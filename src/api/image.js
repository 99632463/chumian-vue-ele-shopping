const api = module.exports = {}

api.getImageClass = (page = 1) => {
  return axios.get(`/admin/imageclass/${page}`)
}

api.getImageClassList = obj => {
  return axios.get(`/admin/imageclass/${obj.id}/image/${obj.page}?limit=${obj.pageSize}&order=${obj.order}&keyword=${obj.keyword}`)
}

api.updateImageClass = obj => {
  return axios.post(`/admin/imageclass/${obj.id}`, obj.data)
}
