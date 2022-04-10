import request from '../utils/request';

export function getListData() {
  return request({
    url: '/houses/getAllHouses',
    method: 'get',
  })
}

export function newHouse(data) {
  return request({
    url: '/houses/addNewHouse',
    method: 'post',
    data: data,
  })
}

export function updateHouse(data) {
  return request({
    url: '/houses/updateHouse',
    method: 'post',
    data: data,
  })
}