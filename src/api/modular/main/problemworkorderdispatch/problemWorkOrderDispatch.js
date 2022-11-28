import { axios } from '@/utils/request'

/**
 * 查询上报问题工单流程信息表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchPage (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 上报问题工单流程信息表列表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchList (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加上报问题工单流程信息表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchAdd (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑上报问题工单流程信息表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchEdit (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除上报问题工单流程信息表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchDelete (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出上报问题工单流程信息表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDispatchExport (parameter) {
  return axios({
    url: '/problemWorkOrderDispatch/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
