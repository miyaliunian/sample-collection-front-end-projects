import request from '@/server/http'

// 测试接口
export const getProvinceList = (params: any) => {
  return request.post(`/common/province`, params)
}
// 获取所有项目信息
export const getAllProjectList = (params: any) => {
  return request.get(`/project/get/list`, params)
}
// 获取基本统计信息
export const getBaseProjectInfo = (params: any) => {
  return request.get(`/project/get`, params)
}
