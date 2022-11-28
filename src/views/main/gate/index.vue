<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('gate:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="闸门名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入闸门名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="类别">
                <a-select style="width: 100%" v-model="queryParam.gateCategory" placeholder="请选择类别">
                  <a-select-option v-for="(item,index) in dict_gate_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
        :rowKey="(record) => record.gateid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('gate:add')" >
          <a-button type="primary" v-if="hasPerm('gate:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('gate:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down v-if="hasPerm('gate:export')" ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="gateCategoryScopedSlots" slot-scope="text">
          {{ 'GATE_CATEGORY' | dictType(text) }}
        </span>
        <span slot="statusScopedSlots" slot-scope="text">
          {{ 'FACILITY_STATUS' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('gate:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('gate:edit') & hasPerm('gate:delete')"/>
          <a v-if="hasPerm('gate:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('gate:edit') & hasPerm('gate:delete')"/>
          <a-popconfirm v-if="hasPerm('gate:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { gatePage, gateDelete, gateExport } from '@/api/modular/main/gate/gateManage'
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
            title: '排水系统编码',
            align: 'center',
            dataIndex: 'systemid'
          },
          {
            title: '坐标X',
            align: 'center',
            dataIndex: 'xcoor'
          },
          {
            title: '坐标Y',
            align: 'center',
            dataIndex: 'ycoor'
          },
          {
            title: '闸门名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '类别',
            align: 'center',
            dataIndex: 'gateCategory',
            scopedSlots: { customRender: 'gateCategoryScopedSlots' }
          },
          {
            title: '闸门型号',
            align: 'center',
            dataIndex: 'model'
          },
          {
            title: '闸门高程',
            align: 'center',
            dataIndex: 'topElev'
          },
          {
            title: '闸门净高',
            align: 'center',
            dataIndex: 'height'
          },
          {
            title: '闸门净宽',
            align: 'center',
            dataIndex: 'width'
          },
          {
            title: '设施状态',
            align: 'center',
            dataIndex: 'status',
            scopedSlots: { customRender: 'statusScopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return gatePage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        dict_gate_category: [],
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
      if (this.hasPerm('gate:edit') || this.hasPerm('gate:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        })
      }

      this.sysDictTypeDropDown()
    },
    methods: {
      moment,
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_gate_category = this.$options.filters['dictData']('GATE_CATEGORY')
      },
      /**
       * 查询参数组装
       */
      switchingDate () {
        const queryParamrecordDate = this.queryParam.recordDateDate
        if (queryParamrecordDate != null) {
            this.queryParam.recordDate = moment(queryParamrecordDate).format('YYYY-MM-DD')
            if (queryParamrecordDate.length < 1) {
                delete this.queryParam.recordDate
            }
        }
        const queryParamreportDate = this.queryParam.reportDateDate
        if (queryParamreportDate != null) {
            this.queryParam.reportDate = moment(queryParamreportDate).format('YYYY-MM-DD')
            if (queryParamreportDate.length < 1) {
                delete this.queryParam.reportDate
            }
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'gateid': record.gateid }]
        this.gateDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'gateid': d }
        })
        this.gateDelete(paramIds)
      },
      gateDelete (record) {
        gateDelete(record).then((res) => {
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
            return { 'gateid': d }
        })
        gateExport(paramIds).then((res) => {
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
