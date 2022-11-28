import { axios } from '@/utils/request'

/**
 * 查询应急车辆
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarPage (parameter) {
  return axios({
    url: '/emergencyCar/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 应急车辆列表
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarList (parameter) {
  return axios({
    url: '/emergencyCar/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加应急车辆
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarAdd (parameter) {
  return axios({
    url: '/emergencyCar/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑应急车辆
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarEdit (parameter) {
  return axios({
    url: '/emergencyCar/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除应急车辆
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarDelete (parameter) {
  return axios({
    url: '/emergencyCar/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出应急车辆
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarExport (parameter) {
  return axios({
    url: '/emergencyCar/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 应急车辆列表（id、name）
 *
 * @author wzxiang
 * @date 2022-05-07 11:24:43
 */
export function emergencyCarIdNameList (parameter) {
  return axios({
    url: '/emergencyCar/idNameList',
    method: 'post',
    data: parameter
  })
}
