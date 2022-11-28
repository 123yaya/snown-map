<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('emergencyPlan:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="预警级别">
                <a-select
                  style="width: 100%"
                  v-model="queryParam.level"
                  placeholder="请选择预警级别"
                >
                  <a-select-option v-for="(item, index) in dict_emergency_level" :key="index" :value="item">{{ item }}</a-select-option>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('emergencyPlan:add')" >
          <a-button type="primary" v-if="hasPerm('emergencyPlan:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('emergencyPlan:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down v-if="hasPerm('emergencyPlan:export')" ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('emergencyPlan:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('emergencyPlan:edit') & hasPerm('emergencyPlan:delete')"/>
          <a v-if="hasPerm('emergencyPlan:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('emergencyPlan:edit') & hasPerm('emergencyPlan:delete')"/>
          <a-popconfirm v-if="hasPerm('emergencyPlan:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { emergencyPlanPage, emergencyPlanDelete, emergencyPlanExport } from '@/api/modular/main/emergencyplan/emergencyPlanManage'
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
            title: '预案名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '预警类型',
            align: 'center',
            dataIndex: 'type'
          },
          {
            title: '预警级别',
            align: 'center',
            dataIndex: 'level'
          },
          {
            title: '短信通知人员',
            align: 'center',
            width: 800,
            dataIndex: 'notePersonNames'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return emergencyPlanPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
        dict_emergency_level: ['一级', '二级', '三级', '四级']
      }
    },
    created () {
      if (this.hasPerm('emergencyPlan:edit') || this.hasPerm('emergencyPlan:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
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
        this.emergencyPlanDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.emergencyPlanDelete(paramIds)
      },
      emergencyPlanDelete (record) {
        emergencyPlanDelete(record).then((res) => {
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
        emergencyPlanExport(paramIds).then((res) => {
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
