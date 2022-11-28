import { axios } from '@/utils/request'

/**
 * 查询排水管
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipePage (parameter) {
  return axios({
    url: '/pipe/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 排水管列表
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipeList (parameter) {
  return axios({
    url: '/pipe/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加排水管
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipeAdd (parameter) {
  return axios({
    url: '/pipe/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑排水管
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipeEdit (parameter) {
  return axios({
    url: '/pipe/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除排水管
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipeDelete (parameter) {
  return axios({
    url: '/pipe/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出排水管
 *
 * @author yhl
 * @date 2022-04-22 10:09:54
 */
export function pipeExport (parameter) {
  return axios({
    url: '/pipe/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
