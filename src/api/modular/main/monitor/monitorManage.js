import { axios } from '@/utils/request'

/**
 * 查询监测点数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorPage (parameter) {
  return axios({
    url: '/monitor/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 监测点数据列表
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorList (parameter) {
  return axios({
    url: '/monitor/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加监测点数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorAdd (parameter) {
  return axios({
    url: '/monitor/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑监测点数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorEdit (parameter) {
  return axios({
    url: '/monitor/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除监测点数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorDelete (parameter) {
  return axios({
    url: '/monitor/delete',
    method: 'post',
    data: parameter
  })
}

export function monitorDetail (parameter) {
  return axios({
    url: '/monitor/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 导出监测点数据
 *
 * @author yhl
 * @date 2022-04-14 11:30:02
 */
export function monitorExport (parameter) {
  return axios({
    url: '/monitor/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 设备实时数据
 */
export function monitorEquipmentRealTimePage (parameter) {
  return axios({
    url: '/monitor/equipmentRealTimePage',
    method: 'get',
    params: parameter
  })
}
