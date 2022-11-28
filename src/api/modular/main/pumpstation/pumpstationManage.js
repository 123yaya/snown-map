import { axios } from '@/utils/request'

/**
 * 查询泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationPage (parameter) {
  return axios({
    url: '/pumpstation/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 泵站列表
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationList (parameter) {
  return axios({
    url: '/pumpstation/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationAdd (parameter) {
  return axios({
    url: '/pumpstation/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationEdit (parameter) {
  return axios({
    url: '/pumpstation/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationDetail (parameter) {
  return axios({
    url: '/pumpstation/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationDelete (parameter) {
  return axios({
    url: '/pumpstation/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出泵站
 *
 * @author yhl
 * @date 2022-04-06 16:47:36
 */
export function pumpstationExport (parameter) {
  return axios({
    url: '/pumpstation/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
