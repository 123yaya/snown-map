import { axios } from '@/utils/request'

/**
 * 查询应急队伍
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamPage (parameter) {
  return axios({
    url: '/emergencyTeam/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 应急队伍列表
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamList (parameter) {
  return axios({
    url: '/emergencyTeam/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加应急队伍
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamAdd (parameter) {
  return axios({
    url: '/emergencyTeam/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑应急队伍
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamEdit (parameter) {
  return axios({
    url: '/emergencyTeam/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除应急队伍
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamDelete (parameter) {
  return axios({
    url: '/emergencyTeam/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出应急队伍
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamExport (parameter) {
  return axios({
    url: '/emergencyTeam/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 查询队伍列表（id、name）
 *
 * @author wzxiang
 * @date 2022-05-07 11:28:20
 */
export function emergencyTeamIdNameList (parameter) {
  return axios({
    url: '/emergencyTeam/idNameList',
    method: 'get',
    params: parameter
  })
}
