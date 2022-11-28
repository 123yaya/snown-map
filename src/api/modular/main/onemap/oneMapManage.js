import { axios } from '@/utils/request'

/**
 * 获取业务图层坐标点
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function oneMapYwCoordinates (parameter) {
  return axios({
    url: '/oneMap/ywCoordinates',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取监测设备坐标点
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function oneMapFacilityCoordinates (parameter) {
  return axios({
    url: '/oneMap/facilityCoordinates',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取监测设备搜索框内容
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function oneMapFacilityStatistics (parameter) {
  return axios({
    url: '/oneMap/facilityStatistics',
    method: 'get',
    params: parameter
  })
}

/**
 * 设施查询
 *
 * @author wzxiang
 * @date 2022-04-14 15:08:42
 */
export function oneMapFacilityInquiry (parameter) {
  return axios({
    url: '/oneMap/facilityInquiry',
    method: 'get',
    params: parameter
  })
}
