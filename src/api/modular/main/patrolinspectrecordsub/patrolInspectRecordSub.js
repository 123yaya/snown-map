import { axios } from '@/utils/request'

/**
 * 查询巡查记录
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function patrolInspectRecordSubPage (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/page',
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
export function patrolInspectRecordSubList (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/list',
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
export function patrolInspectRecordSubAdd (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/add',
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
export function patrolInspectRecordSubEdit (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/edit',
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
export function patrolInspectRecordSubDelete (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/delete',
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
export function patrolInspectRecordSubExport (parameter) {
  return axios({
    url: '/patrolInspectRecordSub/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
