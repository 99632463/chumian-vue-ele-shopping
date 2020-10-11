const api = module.exports = {}

api.login = params => {
  return axios.post('/admin/login', params)
}

api.logout = () => {
  return axios.post('/admin/logout')
}