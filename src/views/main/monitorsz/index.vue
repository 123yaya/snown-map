<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('monitorSz:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="所在监视点编码">
                <a-input v-model="queryParam.monitorid" allow-clear placeholder="请输入所在监视点编码" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="监测时间">
                <a-date-picker style="width: 100%" placeholder="请选择监测时间" v-model="queryParam.sampleTime" @change="onChangesampleTime" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :scroll="{ x: 1300 }" :alert="options.alert" :rowKey="(record) => record.fid" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator" v-if="hasPerm('monitorSz:add')">
          <a-button type="primary" v-if="hasPerm('monitorSz:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('monitorSz:delete')" @click="batchDelete">
            <a-icon type="delete" />批量删除
          </a-button>
          <x-down v-if="hasPerm('monitorSz:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="sampleTimeScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD HH:mm') }}
        </span>
        <span slot="recordTimeScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD HH:mm') }}
        </span>
        <span slot="reportDateScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD') }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('monitorSz:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('monitorSz:edit') & hasPerm('monitorSz:delete')" />
          <a v-if="hasPerm('monitorSz:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('monitorSz:edit') & hasPerm('monitorSz:delete')" />
          <a-popconfirm v-if="hasPerm('monitorSz:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <detail-form ref="detailForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import { monitorSzPage, monitorSzDelete, monitorSzExport } from '@/api/modular/main/monitorsz/monitorSzManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
import detailForm from './detailForm.vue'
export default {
  components: {
    STable,
    addForm,
    editForm,
    detailForm,
    XDown
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '所在监视点编码',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'monitorid'
        },
        {
          title: '监测时间',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'sampleTime',
          scopedSlots: { customRender: 'sampleTimeScopedSlots' }
        },
        {
          title: '水温',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'temp'
        },
        {
          title: 'pH值',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'ph'
        },
        {
          title: '溶解氧',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'dissolvedOxygen'
        },
        {
          title: '五日生化需氧量',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'bod'
        },
        {
          title: '化学需氧量',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'cod'
        },
        {
          title: '总有机碳',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'toc'
        },
        {
          title: '悬浮物',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'ss'
        },
        {
          title: '氨氮',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'nhN'
        },
        {
          title: '总氮',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'tn'
        },
        {
          title: '总磷',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'tp'
        },
        {
          title: '总镉',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'cd'
        },
        {
          title: '总铬',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'cr'
        },
        {
          title: '总镓',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'hg'
        },
        {
          title: '总铅',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'pb'
        },
        {
          title: '总砷',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'as'
        },
        {
          title: '总铜',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'cu'
        },
        {
          title: '总锌',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'zn'
        },
        {
          title: '水质检测单位',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'analysisUnit'
        },
        {
          title: '数据获取时间',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'recordTime',
          scopedSlots: { customRender: 'recordTimeScopedSlots' }
        },
        {
          title: '填报单位',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'reportUnit'
        },
        {
          title: '填报日期',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'reportDate',
          scopedSlots: { customRender: 'reportDateScopedSlots' }
        },
        {
          title: '备注',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'remark'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return monitorSzPage(Object.assign(parameter, this.switchingDate())).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  created () {
    if (this.hasPerm('monitorSz:edit') || this.hasPerm('monitorSz:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  methods: {
    moment,
    /**
     * 查询参数组装
     */
    switchingDate () {
      const queryParamsampleTime = this.queryParam.sampleTime
      if (queryParamsampleTime != null) {
        this.queryParam.sampleTime = moment(queryParamsampleTime).format('YYYY-MM-DD')
        if (queryParamsampleTime.length < 1) {
          delete this.queryParam.sampleTime
        }
      }
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    /**
     * 单个删除
     */
    singleDelete (record) {
      const param = [{ 'fid': record.fid }]
      this.monitorSzDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete () {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'fid': d }
      })
      this.monitorSzDelete(paramIds)
    },
    monitorSzDelete (record) {
      monitorSzDelete(record).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.clearRefreshSelected()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onChangesampleTime (date, dateString) {
      this.sampleTimeDateString = dateString
    },
    /**
     * 批量导出
     */
    batchExport () {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'fid': d }
      })
      monitorSzExport(paramIds).then((res) => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
<style lang="less" scoped>
.table-operator {
  margin-bottom: 18px;
}
button {
  margin-right: 8px;
}
</style>
