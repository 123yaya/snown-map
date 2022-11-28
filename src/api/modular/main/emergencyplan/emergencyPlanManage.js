import { axios } from '@/utils/request'

/**
 * 查询应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanPage (parameter) {
  return axios({
    url: '/emergencyPlan/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 应急预案列表
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanList (parameter) {
  return axios({
    url: '/emergencyPlan/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanAdd (parameter) {
  return axios({
    url: '/emergencyPlan/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanEdit (parameter) {
  return axios({
    url: '/emergencyPlan/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanDetail (parameter) {
  return axios({
    url: '/emergencyPlan/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanDelete (parameter) {
  return axios({
    url: '/emergencyPlan/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出应急预案
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanExport (parameter) {
  return axios({
    url: '/emergencyPlan/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 查询应急预案列表（id、name）
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanIdNameList (parameter) {
  return axios({
    url: '/emergencyPlan/idNameList',
    method: 'post',
    data: parameter
  })
}

/**
 * 查询应急预案绑定的队伍列表（id、name）
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanTeamIdNameList (parameter) {
  return axios({
    url: '/emergencyPlan/teamIdNameList',
    method: 'post',
    data: parameter
  })
}

/**
 * 查询应急预案绑定的队伍列表
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanTeamList (parameter) {
  return axios({
    url: '/emergencyPlan/teamList',
    method: 'post',
    data: parameter
  })
}

/**
 * 上传文件
 *
 * @author wzxiang
 * @date 2022-05-10 10:16:00
 */
export function emergencyPlanUploadFile (parameter) {
  return axios({
    url: '/emergencyPlan/uploadFile',
    method: 'post',
    data: parameter
  })
}
