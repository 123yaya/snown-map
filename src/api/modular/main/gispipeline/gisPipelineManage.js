import { axios } from '@/utils/request'

/**
 * 查询GIS排水管线
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelinePage (parameter) {
  return axios({
    url: '/gisPipeline/page',
    method: 'get',
    params: parameter
  })
}

/**
 * GIS排水管线列表
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelineList (parameter) {
  return axios({
    url: '/gisPipeline/list',
    method: 'get',
    params: parameter
  })
}

/**
 * 添加GIS排水管线
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelineAdd (parameter) {
  return axios({
    url: '/gisPipeline/add',
    method: 'post',
    data: parameter
  })
}

/**
 * 编辑GIS排水管线
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelineEdit (parameter) {
  return axios({
    url: '/gisPipeline/edit',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除GIS排水管线
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelineDelete (parameter) {
  return axios({
    url: '/gisPipeline/delete',
    method: 'post',
    data: parameter
  })
}

/**
 * 导出GIS排水管线
 *
 * @author wzxiang
 * @date 2022-10-20 13:51:33
 */
export function gisPipelineExport (parameter) {
  return axios({
    url: '/gisPipeline/export',
    method: 'get',
    params: parameter,
    responseType: 'blob'
  })
}
