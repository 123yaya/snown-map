<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('detectZy:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="排水管、排水渠编码">
                <a-input v-model="queryParam.pipeconduitid" allow-clear placeholder="请输入排水管、排水渠编码" />
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
      <s-table ref="table" :columns="columns" :data="loadData" :alert="options.alert" :scroll="{ x: 1300 }" :rowKey="(record) => record.usid" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator" v-if="hasPerm('detectZy:add')">
          <a-button type="primary" v-if="hasPerm('detectZy:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('detectZy:delete')" @click="batchDelete">
            <a-icon type="delete" />批量删除
          </a-button>
          <x-down v-if="hasPerm('detectZy:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="detectTimeScopedSlots" slot-scope="text">
          {{ text | moment('YYYY-MM-DD HH:mm') }}
        </span>
        <span slot="detectMethodScopedSlots" slot-scope="text">
          {{ 'DETECT_METHOD' | dictType(text) }}
        </span>
        <span slot="detectDirScopedSlots" slot-scope="text">
          {{ 'DETECT_DIR' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('detectZy:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('detectZy:edit') & hasPerm('detectZy:delete')" />
          <a v-if="hasPerm('detectZy:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('detectZy:edit') & hasPerm('detectZy:delete')" />
          <a-popconfirm v-if="hasPerm('detectZy:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
import { detectZyPage, detectZyDelete, detectZyExport } from '@/api/modular/main/detectzy/detectZyManage'
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
          title: '排水管、排水渠编码',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'pipeconduitid'
        },
        {
          title: '检查时间',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'detectTime',
          scopedSlots: { customRender: 'detectTimeScopedSlots' }
        },
        {
          title: '检测单位',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'detectUnit'
        },
        {
          title: '检测人',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'detectPerson'
        },
        {
          title: '检测单位联系方式',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'contacts'
        },
        {
          title: '检测方法',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'detectMethod',
          scopedSlots: { customRender: 'detectMethodScopedSlots' }
        },
        {
          title: '检测方向',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'detectDir',
          scopedSlots: { customRender: 'detectDirScopedSlots' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return detectZyPage(Object.assign(parameter, this.switchingDate())).then((res) => {
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
    if (this.hasPerm('detectZy:edit') || this.hasPerm('detectZy:delete')) {
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
    switchingDate () {
      const obj = JSON.parse(JSON.stringify(this.queryParam))
      return obj
    },
    /**
     * 单个删除
     */
    singleDelete (record) {
      const param = [{ 'usid': record.usid }]
      this.detectZyDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete () {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'usid': d }
      })
      this.detectZyDelete(paramIds)
    },
    detectZyDelete (record) {
      detectZyDelete(record).then((res) => {
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
        return { 'usid': d }
      })
      detectZyExport(paramIds).then((res) => {
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
