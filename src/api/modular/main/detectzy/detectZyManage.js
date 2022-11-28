import { axios } from '@/utils/request'

/**
 * 查询管渠内窥检测数据
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyPage (parameter) {
  return axios({
    url: '/detectZy/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 管渠内窥检测数据列表
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyList (parameter) {
  return axios({
    url: '/detectZy/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加管渠内窥检测数据
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyAdd (parameter) {
  return axios({
    url: '/detectZy/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑管渠内窥检测数据
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyEdit (parameter) {
  return axios({
    url: '/detectZy/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除管渠内窥检测数据
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyDelete (parameter) {
  return axios({
    url: '/detectZy/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出管渠内窥检测数据
 *
 * @author yhl
 * @date 2022-04-14 10:54:50
 */
export function detectZyExport (parameter) {
  return axios({
    url: '/detectZy/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
