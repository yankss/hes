import request from '../utils/request';

export function newTag(data){
  console.log(data);
  return request({
    url: '/tags/newTag',
    method: 'post',
    data: data,
  })
}

export function fuzzyQuery(tagName){
  return request({
    url: `/tags/fuzzyQuery/${tagName}`,
    method: 'post',
  })
}

export function getAllTag(){
  return request({
    url: `/tags/getAllTag`,
    method: 'get',
  })
}