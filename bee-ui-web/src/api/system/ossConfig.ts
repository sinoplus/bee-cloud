import request from '@/utils/request'

// 查询对象存储配置列表
export function listOssConfig(query: any) {
  return request({
    url: '/resource/oss/config/list',
    method: 'get',
    params: query,
  })
}

// 查询对象存储配置详细
export function getOssConfig(ossConfigId: string) {
  return request({
    url: `/resource/oss/config/${ossConfigId}`,
    method: 'get',
  })
}

// 新增对象存储配置
export function addOssConfig(data: any) {
  return request({
    url: '/resource/oss/config',
    method: 'post',
    data,
  })
}

// 修改对象存储配置
export function updateOssConfig(data: any) {
  return request({
    url: '/resource/oss/config',
    method: 'put',
    data,
  })
}

// 删除对象存储配置
export function delOssConfig(ossConfigId: string) {
  return request({
    url: `/resource/oss/config/${ossConfigId}`,
    method: 'delete',
  })
}

// 对象存储状态修改
export function changeOssConfigStatus(ossConfigId: string, status: string, configKey: string) {
  const data = {
    ossConfigId,
    status,
    configKey,
  }
  return request({
    url: '/resource/oss/config/changeStatus',
    method: 'put',
    data,
  })
}
