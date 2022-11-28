import { axios } from '@/utils/request'

/**
 * 查询雨水口数据
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combPage (parameter) {
  return axios({
    url: '/comb/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 雨水口数据列表
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combList (parameter) {
  return axios({
    url: '/comb/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加雨水口数据
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combAdd (parameter) {
  return axios({
    url: '/comb/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑雨水口数据
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combEdit (parameter) {
  return axios({
    url: '/comb/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除雨水口数据
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combDelete (parameter) {
  return axios({
    url: '/comb/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出雨水口数据
 *
 * @author yhl
 * @date 2022-04-11 10:59:50
 */
export function combExport (parameter) {
  return axios({
    url: '/comb/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
