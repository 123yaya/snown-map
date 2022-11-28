<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('wwtp:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="排水系统编码">
                <a-input v-model="queryParam.systemid" allow-clear placeholder="请输入排水系统编码" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="污水处理厂名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入污水处理厂名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
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
        :scroll="{ x: 1300 }"
        :alert="options.alert"
        :rowKey="record => record.wwtpid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('wwtp:add')">
          <a-button type="primary" v-if="hasPerm('wwtp:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('wwtp:delete')" @click="batchDelete"><a-icon type="delete" />批量删除</a-button>
          <x-down v-if="hasPerm('wwtp:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="wwtpTypeScopedSlots" slot-scope="text">
          {{ 'WWTP_TYPE' | dictType(text) }}
        </span>
        <span slot="treatmentLevelScopedSlots" slot-scope="text">
          {{ 'TREATMENT_LEVEL' | dictType(text) }}
        </span>
        <span slot="datasourceScopedSlots" slot-scope="text">
          {{ 'DATA_SOURCE' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('wwtp:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('wwtp:edit') & hasPerm('wwtp:delete')"/>
          <a v-if="hasPerm('wwtp:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('wwtp:edit') & hasPerm('wwtp:delete')" />
          <a-popconfirm
            v-if="hasPerm('wwtp:delete')"
            placement="topRight"
            title="确认删除？"
            @confirm="() => singleDelete(record)"
          >
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
import { wwtpPage, wwtpDelete, wwtpExport } from '@/api/modular/main/wwtp/wwtpManage'
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
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '污水处理厂名称',
          align: 'center',
          fixed: 'left',
          width: 150,
          ellipsis: true,
          dataIndex: 'name'
        },
        {
          title: '坐标X',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'xcoor'
        },
        {
          title: 'Y坐标',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'ycoor'
        },
        {
          title: '污水处理设施类型',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'wwtpType',
          scopedSlots: { customRender: 'wwtpTypeScopedSlots' }
        },
        {
          title: '污水处理厂地址',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'addr'
        },
        {
          title: '污水处理级别',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'treatmentLevel',
          scopedSlots: { customRender: 'treatmentLevelScopedSlots' }
        },
        {
          title: '数据来源',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'datasource',
          scopedSlots: { customRender: 'datasourceScopedSlots' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return wwtpPage(Object.assign(parameter, this.switchingDate())).then(res => {
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
  created() {
    if (this.hasPerm('wwtp:edit') || this.hasPerm('wwtp:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        fixed: 'right',
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
    switchingDate() {
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    /**
     * 单个删除
     */
    singleDelete(record) {
      const param = [{ wwtpid: record.wwtpid }]
      this.wwtpDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { wwtpid: d }
      })
      this.wwtpDelete(paramIds)
    },
    wwtpDelete(record) {
      wwtpDelete(record).then(res => {
        if (res.success) {
          this.$message.success('删除成功')
          this.$refs.table.clearRefreshSelected()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    /**
     * 批量导出
     */
    batchExport() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { wwtpid: d }
      })
      wwtpExport(paramIds).then(res => {
        this.$refs.batchExport.downloadfile(res)
      })
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
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
