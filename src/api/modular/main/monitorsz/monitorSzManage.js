import { axios } from '@/utils/request'

/**
 * 查询水质检测数据
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzPage (parameter) {
  return axios({
    url: '/monitorSz/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 水质检测数据列表
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzList (parameter) {
  return axios({
    url: '/monitorSz/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加水质检测数据
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzAdd (parameter) {
  return axios({
    url: '/monitorSz/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑水质检测数据
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzEdit (parameter) {
  return axios({
    url: '/monitorSz/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除水质检测数据
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzDelete (parameter) {
  return axios({
    url: '/monitorSz/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出水质检测数据
 *
 * @author yhl
 * @date 2022-04-14 11:32:05
 */
export function monitorSzExport (parameter) {
  return axios({
    url: '/monitorSz/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
