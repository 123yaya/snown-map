<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('monitor:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="监测点名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入监测点名称"/>
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
        :rowKey="(record) => record.monitorid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('monitor:add')" >
          <a-button type="primary" v-if="hasPerm('monitor:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('monitor:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down v-if="hasPerm('monitor:export')" ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="nameScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="addrScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="methodScopedSlots" slot-scope="text">
          {{ 'MONITOR_METHOD' | dictType(text) }}
        </span>
        <span slot="monitorTypeScopedSlots" slot-scope="text">
          {{ 'MONITOR_TYPE' | dictType(text) }}
        </span>
        <span slot="deviceNameScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="reportUnitScopedSlots" slot-scope="text">
          <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="reportDateScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD') }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('monitor:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('monitor:edit') & hasPerm('monitor:delete')"/>
          <a v-if="hasPerm('monitor:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('monitor:edit') & hasPerm('monitor:delete')"/>
          <a-popconfirm v-if="hasPerm('monitor:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { monitorPage, monitorDelete, monitorExport } from '@/api/modular/main/monitor/monitorManage'
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
            title: '监测点名称',
            align: 'center',
            dataIndex: 'name',
            scopedSlots: { customRender: 'nameScopedSlots' }
          },
          {
            title: '监测点地址',
            align: 'center',
            dataIndex: 'addr',
            scopedSlots: { customRender: 'addrScopedSlots' }
          },
          {
            title: '监视方式',
            align: 'center',
            dataIndex: 'method',
            scopedSlots: { customRender: 'methodScopedSlots' }
          },
          {
            title: '监测数据类别',
            align: 'center',
            dataIndex: 'monitorType',
            scopedSlots: { customRender: 'monitorTypeScopedSlots' }
          },
          {
            title: '监测频率',
            align: 'center',
            dataIndex: 'frequency'
          },
          {
            title: '监测设备名称',
            align: 'center',
            dataIndex: 'deviceName',
            scopedSlots: { customRender: 'deviceNameScopedSlots' }
          },
          {
            title: '监测设备型号',
            align: 'center',
            dataIndex: 'deviceModel'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return monitorPage(Object.assign(parameter, this.switchingDate())).then((res) => {
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
      if (this.hasPerm('monitor:edit') || this.hasPerm('monitor:delete')) {
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
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'monitorid': record.monitorid }]
        this.monitorDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'monitorid': d }
        })
        this.monitorDelete(paramIds)
      },
      monitorDelete (record) {
        monitorDelete(record).then((res) => {
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
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'monitorid': d }
        })
        monitorExport(paramIds).then((res) => {
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
