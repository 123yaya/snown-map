import { axios } from '@/utils/request'

/**
 * 查询气象图
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapPage (parameter) {
  return axios({
    url: '/weatherMap/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 气象图列表
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapList (parameter) {
  return axios({
    url: '/weatherMap/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加气象图
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapAdd (parameter) {
  return axios({
    url: '/weatherMap/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑气象图
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapEdit (parameter) {
  return axios({
    url: '/weatherMap/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除气象图
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapDelete (parameter) {
  return axios({
    url: '/weatherMap/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出气象图
 *
 * @author wzxiang
 * @date 2022-09-26 14:56:22
 */
export function weatherMapExport (parameter) {
  return axios({
    url: '/weatherMap/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
