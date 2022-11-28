<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="14">
              <a-form-item label="人员名称">
                <a-input v-model="queryParam.inspectUserName" allow-clear placeholder="请输入人员名称" />
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="24">
              <a-form-item label="打卡时间">
                <a-range-picker v-model="queryParam.rangeDate" value-format="YYYY-MM-DD" />
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table ref="table" :columns="columns" :data="loadData" :scroll="{ x: 1300 }" :alert="options.alert" :rowKey="record => record.id" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator">
          <x-down ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="hasProblemScopedSlots" slot-scope="text">
          {{ text ? '否' : '是' }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a-tooltip placement="top" title="查看巡查轨迹" style="width: 30px">
            <a-icon type="environment" @click="$refs.trackPlayback.showTrack(record.id)" />
          </a-tooltip>
          <a-button type="primary" style="margin-left: 10px" @click="goInfo(record.id)">
            记录
          </a-button>
        </span>
      </s-table>
    </a-card>
    <track-playback ref="trackPlayback"></track-playback>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import trackPlayback from './trackPlayback'
import moment from 'moment'
import { patrolInspectRecordPage } from '@/api/modular/main/patrolinspectrecord/patrolInspectRecord'
export default {
  components: {
    STable,
    XDown,
    trackPlayback
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
          title: '人员名称',
          align: 'center',
          fixed: 'left',
          width: 150,
          ellipsis: true,
          dataIndex: 'inspectUserName'
        },
        {
          title: '开始巡查地点',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'address'
        },
        {
          title: '开始打卡时间',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'startTime'
        },
        {
          title: '结束打卡时间',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'endTime'
        },
        {
          title: '是否上报问题',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'hasProblem',
          scopedSlots: { customRender: 'hasProblemScopedSlots' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return patrolInspectRecordPage(Object.assign(parameter, this.switchingDate())).then(res => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  created () {
    this.columns.push({
      title: '详情',
      width: '150px',
      fixed: 'right',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' }
    })
  },
  methods: {
    moment,
    /**
     * 查询参数组装
     */
    switchingDate () {
      delete this.queryParam.rangeDateBegin
      delete this.queryParam.rangeDateEnd

      if (this.queryParam.rangeDate && this.queryParam.rangeDate.length > 0) {
        this.queryParam.rangeDateBegin = moment(this.queryParam.rangeDate[0]).format('YYYY-MM-DD')
        this.queryParam.rangeDateEnd = moment(this.queryParam.rangeDate[1]).format('YYYY-MM-DD')
        delete this.queryParam.rangeDate
      }

      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    goInfo (recordId) {
      this.$router.replace({ name: 'patrol_record_info', params: { recordId: recordId } })
    },
    /**
     * 批量导出
     */
    batchExport () {
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
