import { axios } from '@/utils/request'

/**
 * 查询预警启动信息
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartPage (parameter) {
  return axios({
    url: '/earlyWarnStart/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 预警启动信息列表
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartList (parameter) {
  return axios({
    url: '/earlyWarnStart/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加预警启动信息
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartAdd (parameter) {
  return axios({
    url: '/earlyWarnStart/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑预警启动信息
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartEdit (parameter) {
  return axios({
    url: '/earlyWarnStart/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除预警启动信息
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartDelete (parameter) {
  return axios({
    url: '/earlyWarnStart/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出预警启动信息
 *
 * @author wzxiang
 * @date 2022-05-12 10:02:10
 */
export function earlyWarnStartExport (parameter) {
  return axios({
    url: '/earlyWarnStart/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 查询当前启动的预警信息
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function earlyWarnCurrentStarted (parameter) {
  return axios({
    url: '/earlyWarnStart/currentStarted',
    method: 'get',
    data: parameter
  })
}
