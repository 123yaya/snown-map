import { axios } from '@/utils/request'

/**
 * 查询排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterprisePage (parameter) {
  return axios({
    url: '/outletEnterprise/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 排污企业列表
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseList (parameter) {
  return axios({
    url: '/outletEnterprise/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseAdd (parameter) {
  return axios({
    url: '/outletEnterprise/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseEdit (parameter) {
  return axios({
    url: '/outletEnterprise/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseDetail (parameter) {
  return axios({
    url: '/outletEnterprise/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseDelete (parameter) {
  return axios({
    url: '/outletEnterprise/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出排污企业
 *
 * @author yhl
 * @date 2022-04-14 15:08:42
 */
export function outletEnterpriseExport (parameter) {
  return axios({
    url: '/outletEnterprise/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
