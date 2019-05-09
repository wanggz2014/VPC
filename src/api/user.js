import axios from '@/libs/api.request'
import Qs from 'qs'

export const login = ({ userName, password}) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: 'base/login',
    data:Qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'base/userinfo',
    data:Qs.stringify({
      token
    }),
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'base/logout',
    data:Qs.stringify({
      token
    }),
    method: 'post'
  })
}
