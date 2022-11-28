<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('monitorSl:page')">
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
      <s-table ref="table" :columns="columns" :data="loadData" :alert="options.alert" :rowKey="(record) => record.fid" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator" v-if="hasPerm('monitorSl:add')">
          <a-button type="primary" v-if="hasPerm('monitorSl:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('monitorSl:delete')" @click="batchDelete">
            <a-icon type="delete" />批量删除
          </a-button>
          <x-down v-if="hasPerm('monitorSl:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="sampleTimeScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD HH:mm') }}
        </span>
        <span slot="recordTimeScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD HH:mm') }}
        </span>
        <span slot="reportUnitScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="reportDateScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD') }}
        </span>
        <span slot="remarkScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('monitorSl:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('monitorSl:edit') & hasPerm('monitorSl:delete')" />
          <a v-if="hasPerm('monitorSl:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('monitorSl:edit') & hasPerm('monitorSl:delete')" />
          <a-popconfirm v-if="hasPerm('monitorSl:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
import { STable, XDown, Ellipsis } from '@/components'
import moment from 'moment'
import { monitorSlPage, monitorSlDelete, monitorSlExport } from '@/api/modular/main/monitorsl/monitorSlManage'
import addForm from './addForm.vue'
import editForm from './editForm.vue'
import detailForm from './detailForm.vue'
export default {
  components: {
    Ellipsis,
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
          dataIndex: 'monitorid'
        },
        {
          title: '监测时间',
          align: 'center',
          dataIndex: 'sampleTime',
          scopedSlots: { customRender: 'sampleTimeScopedSlots' }
        },
        {
          title: '液位',
          align: 'center',
          dataIndex: 'waterlevel'
        },
        {
          title: '流速',
          align: 'center',
          dataIndex: 'watervelocity'
        },
        {
          title: '流量',
          align: 'center',
          dataIndex: 'flow'
        },
        {
          title: '雨量',
          align: 'center',
          dataIndex: 'rainfall'
        },
        {
          title: '数据获取时间',
          align: 'center',
          dataIndex: 'recordTime',
          scopedSlots: { customRender: 'recordTimeScopedSlots' }
        },
        {
          title: '填报单位',
          align: 'center',
          dataIndex: 'reportUnit',
          scopedSlots: { customRender: 'reportUnitScopedSlots' }
        },
        {
          title: '填报日期',
          align: 'center',
          dataIndex: 'reportDate',
          scopedSlots: { customRender: 'reportDateScopedSlots' }
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remark',
          scopedSlots: { customRender: 'remarkScopedSlots' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return monitorSlPage(Object.assign(parameter, this.switchingDate())).then((res) => {
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
    if (this.hasPerm('monitorSl:edit') || this.hasPerm('monitorSl:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
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
      const querySampleTime = this.queryParam.sampleTime
      if (querySampleTime != null) {
        this.queryParam.sampleTime = moment(querySampleTime).format('YYYY-MM-DD')
        if (querySampleTime.length < 1) {
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
      this.monitorSlDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete () {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'fid': d }
      })
      this.monitorSlDelete(paramIds)
    },
    monitorSlDelete (record) {
      monitorSlDelete(record).then((res) => {
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
      monitorSlExport(paramIds).then((res) => {
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
