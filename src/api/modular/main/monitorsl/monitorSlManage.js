import { axios } from '@/utils/request'

/**
 * 查询液位、流量与雨量监测数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlPage (parameter) {
  return axios({
    url: '/monitorSl/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 液位、流量与雨量监测数据列表
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlList (parameter) {
  return axios({
    url: '/monitorSl/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加液位、流量与雨量监测数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlAdd (parameter) {
  return axios({
    url: '/monitorSl/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑液位、流量与雨量监测数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlEdit (parameter) {
  return axios({
    url: '/monitorSl/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除液位、流量与雨量监测数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlDelete (parameter) {
  return axios({
    url: '/monitorSl/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出液位、流量与雨量监测数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:34
 */
export function monitorSlExport (parameter) {
  return axios({
    url: '/monitorSl/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
