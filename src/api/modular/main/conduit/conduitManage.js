import { axios } from '@/utils/request'

/**
 * 查询排水渠
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitPage (parameter) {
  return axios({
    url: '/conduit/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 排水渠列表
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitList (parameter) {
  return axios({
    url: '/conduit/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加排水渠
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitAdd (parameter) {
  return axios({
    url: '/conduit/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑排水渠
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitEdit (parameter) {
  return axios({
    url: '/conduit/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除排水渠
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitDelete (parameter) {
  return axios({
    url: '/conduit/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出排水渠
 *
 * @author yhl
 * @date 2022-04-22 10:30:37
 */
export function conduitExport (parameter) {
  return axios({
    url: '/conduit/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
