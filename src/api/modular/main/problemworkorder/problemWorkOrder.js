import { axios } from '@/utils/request'

/**
 * 查询上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderPage (parameter) {
  return axios({
    url: '/problemWorkOrder/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 上报问题工单表列表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderList (parameter) {
  return axios({
    url: '/problemWorkOrder/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderAdd (parameter) {
  return axios({
    url: '/problemWorkOrder/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderEdit (parameter) {
  return axios({
    url: '/problemWorkOrder/edit',
    method: 'post',
    data: parameter
  })
}
/**
 * 编辑上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDetail (parameter) {
  return axios({
    url: '/problemWorkOrder/detail',
    method: 'get',
    params: parameter
  })
}
/**
 * 删除上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderDelete (parameter) {
  return axios({
    url: '/problemWorkOrder/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出上报问题工单表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderExport (parameter) {
  return axios({
    url: '/problemWorkOrder/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 待处理和已处理工单数量
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function problemWorkOrderStatusCount (parameter) {
  return axios({
    url: '/problemWorkOrder/statusCount',
    method: 'get',
    params: parameter
  })
}
