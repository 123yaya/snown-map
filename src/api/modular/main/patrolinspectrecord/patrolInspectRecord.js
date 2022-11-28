import { axios } from '@/utils/request'

/**
 * 查询巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordPage (parameter) {
  return axios({
    url: '/patrolInspectRecord/page',
    method: 'get',
    params: parameter
  })
}
/**
 * 巡查记录列表
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordList (parameter) {
  return axios({
    url: '/patrolInspectRecord/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordAdd (parameter) {
  return axios({
    url: '/patrolInspectRecord/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordEdit (parameter) {
  return axios({
    url: '/patrolInspectRecord/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordDelete (parameter) {
  return axios({
    url: '/patrolInspectRecord/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordExport (parameter) {
  return axios({
    url: '/patrolInspectRecord/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
/**
 * 巡查轨迹
 *
 * @author 丫丫
 * @date 2022-09-29 15:00
 */
export function patrolInspectRecordTrack (parameter) {
  return axios({
    url: '/patrolInspectRecordTrack/points',
    method: 'get',
    params: parameter
  })
}
