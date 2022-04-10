import request from '../utils/request';

export function newTopic(data){
  console.log(data);
  return request({
    url: '/topics/newTopic',
    method: 'post',
    data: data,
  })
}

export function getAllTopic(){
  return request({
    url: '/topics/getAllTopic',
    method: 'get',
  })
}