import { axios } from '@/utils/request'

/**
 * 查询调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskPage (parameter) {
  return axios({
    url: '/schedulingTask/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 调度任务列表
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskList (parameter) {
  return axios({
    url: '/schedulingTask/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskAdd (parameter) {
  return axios({
    url: '/schedulingTask/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskEdit (parameter) {
  return axios({
    url: '/schedulingTask/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskDetail (parameter) {
  return axios({
    url: '/schedulingTask/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskDelete (parameter) {
  return axios({
    url: '/schedulingTask/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出调度任务
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingTaskExport (parameter) {
  return axios({
    url: '/schedulingTask/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
