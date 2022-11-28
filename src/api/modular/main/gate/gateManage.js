import { axios } from '@/utils/request'

/**
 * 查询闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gatePage (parameter) {
  return axios({
    url: '/gate/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 闸门列表
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateList (parameter) {
  return axios({
    url: '/gate/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateAdd (parameter) {
  return axios({
    url: '/gate/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateEdit (parameter) {
  return axios({
    url: '/gate/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateDetail (parameter) {
  return axios({
    url: '/gate/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateDelete (parameter) {
  return axios({
    url: '/gate/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出闸门
 *
 * @author yhl
 * @date 2022-04-21 21:04:15
 */
export function gateExport (parameter) {
  return axios({
    url: '/gate/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
