import request from '../utils/request';

export function newHouseFacility(data) {
  return request({
    url: '/houseFacility/newHouseFacility',
    method: 'post',
    data: data
  })
}