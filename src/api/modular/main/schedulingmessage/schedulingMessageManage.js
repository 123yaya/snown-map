import { axios } from '@/utils/request'

/**
 * 查询调度任务过程信息
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessagePage (parameter) {
  return axios({
    url: '/schedulingMessage/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 调度任务过程信息列表
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageList (parameter) {
  return axios({
    url: '/schedulingMessage/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加调度任务过程信息
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageAdd (parameter) {
  return axios({
    url: '/schedulingMessage/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑调度任务过程信息
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageEdit (parameter) {
  return axios({
    url: '/schedulingMessage/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除调度任务过程信息
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageDelete (parameter) {
  return axios({
    url: '/schedulingMessage/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出调度任务过程信息
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageExport (parameter) {
  return axios({
    url: '/schedulingMessage/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 通知消息列表
 *
 * @author wzxiang
 * @date 2022-05-11 11:51:31
 */
export function schedulingMessageNoticeList (parameter) {
  return axios({
    url: '/schedulingMessage/noticeList',
    method: 'post',
    data: parameter
  })
}
