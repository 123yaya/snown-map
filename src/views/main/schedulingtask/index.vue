<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('schedulingTask:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="行政区">
                <a-select style="width: 100%" v-model="queryParam.adCode" placeholder="请选择行政区">
                  <a-select-option v-for="(item,index) in ad_data_list" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="任务状态">
                <a-select style="width: 100%" v-model="queryParam.status" placeholder="请选择任务状态">
                  <a-select-option v-for="(item,index) in dict_scheduling_task_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" >
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table
        ref="table"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowKey="(record) => record.id"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" >
          <x-down ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="statusScopedSlots" slot-scope="text">
          {{ 'SCHEDULING_TASK_STATUS' | dictType(text) }}
        </span>
      </s-table>
    </a-card>
  </div>
</template>
<script>
  import { STable, XDown } from '@/components'
  import { schedulingTaskPage, schedulingTaskExport } from '@/api/modular/main/schedulingtask/schedulingTaskManage'
  export default {
    components: {
      STable,
      XDown
    },
    data () {
      return {
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '任务类型',
            align: 'center',
            dataIndex: 'type'
          },
          {
            title: '任务点名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '行政区',
            align: 'center',
            dataIndex: 'adCode'
          },
          {
            title: '责任单位',
            align: 'center',
            dataIndex: 'dutyUnit'
          },
          {
            title: '派遣队伍',
            align: 'center',
            dataIndex: 'dispatchTeamName'
          },
          {
            title: '队伍队长',
            align: 'center',
            dataIndex: 'dispatchTeamLeader'
          },
          {
            title: '任务状态',
            align: 'center',
            dataIndex: 'status',
            scopedSlots: { customRender: 'statusScopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return schedulingTaskPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
        },
        dict_scheduling_task_status: [],
        ad_data_list: [{ code: '延吉', name: '延吉' }]
      }
    },
    created () {
      this.sysDictTypeDropDown()
    },
    methods: {
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_scheduling_task_status = this.$options.filters['dictData']('SCHEDULING_TASK_STATUS')
      },
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        schedulingTaskExport(paramIds).then((res) => {
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
