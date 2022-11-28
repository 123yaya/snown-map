import { axios } from '@/utils/request'

/**
 * 查询应急物资
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesPage (parameter) {
  return axios({
    url: '/emergencySupplies/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 应急物资列表
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesList (parameter) {
  return axios({
    url: '/emergencySupplies/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加应急物资
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesAdd (parameter) {
  return axios({
    url: '/emergencySupplies/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑应急物资
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesEdit (parameter) {
  return axios({
    url: '/emergencySupplies/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除应急物资
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesDelete (parameter) {
  return axios({
    url: '/emergencySupplies/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出应急物资
 *
 * @author wzxiang
 * @date 2022-05-07 11:26:31
 */
export function emergencySuppliesExport (parameter) {
  return axios({
    url: '/emergencySupplies/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
