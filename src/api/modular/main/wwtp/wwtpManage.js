import { axios } from '@/utils/request'

/**
 * 查询污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpPage (parameter) {
  return axios({
    url: '/wwtp/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 污水处理厂列表
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpList (parameter) {
  return axios({
    url: '/wwtp/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpAdd (parameter) {
  return axios({
    url: '/wwtp/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpEdit (parameter) {
  return axios({
    url: '/wwtp/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpDetail (parameter) {
  return axios({
    url: '/wwtp/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpDelete (parameter) {
  return axios({
    url: '/wwtp/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出污水处理厂
 *
 * @author yhl
 * @date 2022-04-06 16:47:52
 */
export function wwtpExport (parameter) {
  return axios({
    url: '/wwtp/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
