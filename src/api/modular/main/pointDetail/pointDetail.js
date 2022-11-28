import { axios } from '@/utils/request'

/**
 * 详情
 */
export function detail (parameter) {
  return axios({
    url: '/monitor/detail',
    method: 'get',
    params: parameter
  })
}
/**
 * 雨量计
 */
export function pptnRealTimeData (parameter) {
  return axios({
    url: '/monitor/pptnRealTimeData',
    method: 'get',
    params: parameter
  })
}
/**
 * 液位计和流量计
 */
export function riverRealTimeData (parameter) {
  return axios({
    url: '/monitor/riverRealTimeData',
    method: 'get',
    params: parameter
  })
}
export function riverStatisticalData (parameter) {
  return axios({
    url: '/monitor/riverStatisticalData',
    method: 'get',
    params: parameter
  })
}
