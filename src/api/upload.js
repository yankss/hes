import request from '../utils/request';

export function upload(data){
  let formData = new FormData();
  formData.append('file', data)
  return request({
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    url: '/file/upload',
    method: 'post',
    body: FormData,
  })
}