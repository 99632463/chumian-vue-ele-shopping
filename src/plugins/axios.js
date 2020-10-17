"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message } from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
};
let loading = false
let count = 0

function showLoading(){
  if(count === 0){
    loading = Message({
      message: '加载中...',
      duration: 0
    })
  }
  count++
}

function hideLoading(){
  if(count > 0){
    count--
  }
  if(loading && count === 0){
    loading.close()
  }
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token')
    if(token && !config.noToken){
      config.headers.token = token
    }
    // if(!config.hideLoading){
    //   showLoading()
    // }

    return config;
  },
  function(error) {
    // hideLoading()
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    let result
    if(response.status === 200){
      result = response.data;
    }

    // hideLoading()
    return result
  },
  function(error) {
    if(error.response.data && error.response.data.errorCode) {
      Message.error(error.response.data.msg)
    }

    // hideLoading()
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
