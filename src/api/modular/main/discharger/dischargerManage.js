import { axios } from '@/utils/request'

/**
 * 查询排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerPage (parameter) {
  return axios({
    url: '/discharger/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 排水户列表
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerList (parameter) {
  return axios({
    url: '/discharger/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerAdd (parameter) {
  return axios({
    url: '/discharger/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerEdit (parameter) {
  return axios({
    url: '/discharger/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerDetail (parameter) {
  return axios({
    url: '/discharger/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerDelete (parameter) {
  return axios({
    url: '/discharger/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出排水户
 *
 * @author yhl
 * @date 2022-04-06 16:47:20
 */
export function dischargerExport (parameter) {
  return axios({
    url: '/discharger/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
