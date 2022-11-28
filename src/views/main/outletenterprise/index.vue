<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('outletEnterprise:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="企业单位名称">
                <a-input v-model="queryParam.enterpriseName" allow-clear placeholder="请输入企业单位名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="单位性质">
                <a-select style="width: 100%" v-model="queryParam.enterpriseNature" placeholder="请选择单位性质">
                  <a-select-option v-for="(item,index) in enterpriseNatureData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
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
      <s-table ref="table" :columns="columns" :data="loadData" :alert="options.alert" :scroll="{ x: 1300 }" :rowKey="(record) => record.id" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator" v-if="hasPerm('outletEnterprise:add')">
          <a-button type="primary" v-if="hasPerm('outletEnterprise:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('outletEnterprise:delete')" @click="batchDelete">
            <a-icon type="delete" />批量删除
          </a-button>
          <x-down v-if="hasPerm('outletEnterprise:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="enterpriseNatureScopedSlots" slot-scope="text">
          {{ 'ENTERPRISE_NATURE' | dictType(text) }}
        </span>
        <span slot="industryScopedSlots" slot-scope="text">
          {{ 'INDUSTRY' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('outletEnterprise:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('outletEnterprise:edit') & hasPerm('outletEnterprise:delete')" />
          <a v-if="hasPerm('outletEnterprise:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('outletEnterprise:edit') & hasPerm('outletEnterprise:delete')" />
          <a-popconfirm v-if="hasPerm('outletEnterprise:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
import { outletEnterprisePage, outletEnterpriseDelete, outletEnterpriseExport } from '@/api/modular/main/outletenterprise/outletEnterpriseManage'
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
          title: '企业单位名称',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'enterpriseName'
        },
        {
          title: '单位性质',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'enterpriseNature',
          scopedSlots: { customRender: 'enterpriseNatureScopedSlots' }
        },
        {
          title: '法人代表',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'corporatRepresentative'
        },
        {
          title: '组织机构代码',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'organizationalCode'
        },
        {
          title: '所属行业',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'industry',
          scopedSlots: { customRender: 'industryScopedSlots' }
        },
        {
          title: '联系地址',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'contactAddress'
        },
        {
          title: '联系人',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'contactsName'
        },
        {
          title: '联系人电话',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'contactsTel'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return outletEnterprisePage(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      enterpriseNatureData: [],
      industryData: [],
      isHandleAgreeFileData: [],
      isHandleRegisterFileData: [],
      isImportantPollutionSourceData: [],
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
    if (this.hasPerm('outletEnterprise:edit') || this.hasPerm('outletEnterprise:delete')) {
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
    /**
     * 单个删除
     */
    singleDelete (record) {
      const param = [{ 'id': record.id }]
      this.outletEnterpriseDelete(param)
    },
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown () {
      this.dict_treatment_level = this.$options.filters['dictData']('TREATMENT_LEVEL')
    },
    /**
     * 批量删除
     */
    batchDelete () {
      const paramIds = this.selectedRowKeys.map((d) => {
        return { 'id': d }
      })
      this.outletEnterpriseDelete(paramIds)
    },
    outletEnterpriseDelete (record) {
      outletEnterpriseDelete(record).then((res) => {
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
        return { 'id': d }
      })
      outletEnterpriseExport(paramIds).then((res) => {
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
