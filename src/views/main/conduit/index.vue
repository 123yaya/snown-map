<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('conduit:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="渠道类别">
                <a-select style="width: 100%" v-model="queryParam.conduitCategory" placeholder="请选择渠道类别">
                  <a-select-option v-for="(item,index) in dict_conduit_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="渠道类型">
                <a-select style="width: 100%" v-model="queryParam.conduitStyle" placeholder="请选择渠道类型">
                  <a-select-option v-for="(item,index) in dict_conduit_style" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
        :rowKey="(record) => record.conduitId"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('conduit:add')" >
          <a-button type="primary" v-if="hasPerm('conduit:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('conduit:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down v-if="hasPerm('conduit:export')" ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="conduitCategoryScopedSlots" slot-scope="text">
          {{ 'CONDUIT_CATEGORY' | dictType(text) }}
        </span>
        <span slot="conduitStyleScopedSlots" slot-scope="text">
          {{ 'CONDUIT_STYLE' | dictType(text) }}
        </span>
        <span slot="shapeTypeScopedSlots" slot-scope="text">
          {{ 'SHAPE_TYPE' | dictType(text) }}
        </span>
        <span slot="materialScopedSlots" slot-scope="text">
          {{ 'CONDUIT_MATERIAL' | dictType(text) }}
        </span>
        <span slot="statusScopedSlots" slot-scope="text">
          {{ 'FACILITY_STATUS' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('conduit:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('conduit:edit') & hasPerm('conduit:delete')"/>
          <a v-if="hasPerm('conduit:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('conduit:edit') & hasPerm('conduit:delete')"/>
          <a-popconfirm v-if="hasPerm('conduit:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { conduitPage, conduitDelete, conduitExport } from '@/api/modular/main/conduit/conduitManage'
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
            title: '渠道类别',
            align: 'center',
            dataIndex: 'conduitCategory',
            scopedSlots: { customRender: 'conduitCategoryScopedSlots' }
          },
          {
            title: '渠道类型',
            align: 'center',
            dataIndex: 'conduitStyle',
            scopedSlots: { customRender: 'conduitStyleScopedSlots' }
          },
          {
            title: '渠道长度',
            align: 'center',
            dataIndex: 'conduitLength'
          },
          {
            title: '所在道路名称',
            align: 'center',
            dataIndex: 'roadName'
          },
          {
            title: '断面形式',
            align: 'center',
            dataIndex: 'shapeType',
            scopedSlots: { customRender: 'shapeTypeScopedSlots' }
          },
          {
            title: '渠道材质',
            align: 'center',
            dataIndex: 'material',
            scopedSlots: { customRender: 'materialScopedSlots' }
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
          return conduitPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        dict_conduit_category: [],
        dict_conduit_style: [],
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
      if (this.hasPerm('conduit:edit') || this.hasPerm('conduit:delete')) {
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
        this.dict_conduit_category = this.$options.filters['dictData']('CONDUIT_CATEGORY')
        this.dict_conduit_style = this.$options.filters['dictData']('CONDUIT_STYLE')
      },
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
        const param = [{ 'conduitId': record.conduitId }]
        this.conduitDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'conduitId': d }
        })
        this.conduitDelete(paramIds)
      },
      conduitDelete (record) {
        conduitDelete(record).then((res) => {
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
            return { 'conduitId': d }
        })
        conduitExport(paramIds).then((res) => {
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
