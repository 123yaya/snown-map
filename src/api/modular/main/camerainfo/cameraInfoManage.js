import { axios } from '@/utils/request'

/**
 * 查询摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoPage (parameter) {
  return axios({
    url: '/cameraInfo/page',
    method: 'get',
    params: parameter
  })
}

/**
 * 摄像头列表
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoList (parameter) {
  return axios({
    url: '/cameraInfo/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoAdd (parameter) {
  return axios({
    url: '/cameraInfo/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoEdit (parameter) {
  return axios({
    url: '/cameraInfo/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 查看摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoDetail (parameter) {
  return axios({
    url: '/cameraInfo/detail',
    method: 'get',
    params: parameter
  })
}

/**
 * 删除摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoDelete (parameter) {
  return axios({
    url: '/cameraInfo/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出摄像头
 *
 * @author yhl
 * @date 2022-04-14 15:08:29
 */
export function cameraInfoExport (parameter) {
  return axios({
    url: '/cameraInfo/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}

/**
 * 获取摄像头播放地址
 */
export function videoGetVideoPath (parameter) {
  return axios({
    url: '/video/getVideoPath',
    method: 'get',
    params: parameter
  })
}

/**
 * 云台控制开始
 */
export function videoPtzStart (parameter) {
  return axios({
    url: '/video/ptzStart',
    method: 'post',
    data: parameter
  })
}

/**
 * 云台控制结束
 */
export function videoPtzStop (parameter) {
  return axios({
    url: '/video/ptzStop',
    method: 'post',
    data: parameter
  })
}

/**
 * 云台控制
 */
export function videoPtzControl (parameter) {
  return axios({
    url: '/video/ptzControl',
    method: 'post',
    data: parameter
  })
}
export function cameraInfoTree (parameter) {
  return axios({
    url: '/cameraInfo/tree',
    method: 'get',
    data: parameter
  })
}
