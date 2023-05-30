import request from '@/utils/request'

// 查询会员信息列表
export function listUser(query: any) {
  return request({
    url: '/operation/user/list',
    method: 'get',
    params: query,
  })
}

// 查询会员信息详细
export function getUser(userId?: any) {
  return request({
    url: `/operation/user/${userId}`,
    method: 'get',
  })
}

// 新增会员信息
export function addUser(data: any) {
  return request({
    url: '/operation/user',
    method: 'post',
    data,
  })
}

// 修改会员信息
export function updateUser(data: any) {
  return request({
    url: '/operation/user',
    method: 'put',
    data,
  })
}

// 删除会员信息
export function delUser(userId: any) {
  return request({
    url: `/operation/user/${userId}`,
    method: 'delete',
  })
}
