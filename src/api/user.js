import request from '../utils/request';

export function login(data){
  return request({
    url: '/users/login',
    method: 'post',
    data: data,
  })
}

export function registered(data){
  return request({
    url: '/users/reg',
    method: 'post',
    data: data,
  })
}

export function getListData() {
  return request({
    url: '/users/getAllUser',
    method: 'get',
  })
}