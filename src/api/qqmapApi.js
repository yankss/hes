import request from '../utils/request';

export function getOptions() {
  return request({
    url: '/houses/getAllHouses',
    method: 'get',
  })
}