import axios from 'axios'
import {
  request,
  assignKeysA
} from '@/utils';
// 获取券信息
export const luckyTicket = (params) => {
  return request({
    url: '/cash/ticket',
    method: 'post',
    data: assignKeysA({}, [params], [
      'channel',
      'uid'
    ])
  })
}
// 存券信息
export const luckySave = (params) => {
  return request({
    url: '/cash/s',
    method: 'post',
    data: assignKeysA({}, [params], [
      'key',
      'value'
    ])
  })
}
// 获取券信息
export const luckyGet = (params) => {
  return request({
    url: '/cash/g',
    method: 'post',
    data: assignKeysA({}, [params], [
      'key',
      'value'
    ])
  })
}
// 埋点
export const luckyEvent = (params) => {
  return request({
    url: '/cash/event',
    method: 'post',
    data: assignKeysA({}, [params], [
      'channel',
      'uid',
      'type',
      'spm',
      'hid',
      'tid'
    ])
  })
}
export const jsonData = (params = {}) => {
  if (process.env.NODE_ENV == 'production') {
    return axios.get(`${location.origin}/card/json/data.json`)
  } else {
    return axios.get('/data.json');
  }
}
export const messageData  = (params)=>{
  return request({
    url: '/message/list',
    method: 'post',
    data: assignKeysA({}, [params], [
      'channel',
      'uid',
      'type',
      'spm',
      'hid',
      'tid'
    ])
  })
}
