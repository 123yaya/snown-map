import { axios } from '@/utils/request'

/**
 * 查询检查井数据
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholePage (parameter) {
  return axios({
    url: '/manhole/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 检查井数据列表
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholeList (parameter) {
  return axios({
    url: '/manhole/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加检查井数据
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholeAdd (parameter) {
  return axios({
    url: '/manhole/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑检查井数据
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholeEdit (parameter) {
  return axios({
    url: '/manhole/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除检查井数据
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholeDelete (parameter) {
  return axios({
    url: '/manhole/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出检查井数据
 *
 * @author yhl
 * @date 2022-04-14 11:25:56
 */
export function manholeExport (parameter) {
  return axios({
    url: '/manhole/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
