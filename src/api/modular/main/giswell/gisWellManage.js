import { axios } from '@/utils/request'

/**
 * 查询GIS排水井
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellPage (parameter) {
  return axios({
    url: '/gisWell/page',
    method: 'get',
    params: parameter
  })
}

/**
 * GIS排水井列表
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellList (parameter) {
  return axios({
    url: '/gisWell/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加GIS排水井
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellAdd (parameter) {
  return axios({
    url: '/gisWell/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑GIS排水井
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellEdit (parameter) {
  return axios({
    url: '/gisWell/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除GIS排水井
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellDelete (parameter) {
  return axios({
    url: '/gisWell/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出GIS排水井
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:31
 */
export function gisWellExport (parameter) {
  return axios({
    url: '/gisWell/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
