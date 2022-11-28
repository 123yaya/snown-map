import { axios } from '@/utils/request'

/**
 * 查询排水系统
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemPage (parameter) {
  return axios({
    url: '/system/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 排水系统列表
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemList (parameter) {
  return axios({
    url: '/system/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加排水系统
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemAdd (parameter) {
  return axios({
    url: '/system/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑排水系统
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemEdit (parameter) {
  return axios({
    url: '/system/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除排水系统
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemDelete (parameter) {
  return axios({
    url: '/system/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出排水系统
 *
 * @author yhl
 * @date 2022-04-11 11:00:10
 */
export function systemExport (parameter) {
  return axios({
    url: '/system/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
