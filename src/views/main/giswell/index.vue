<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('gisWell:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="道路名称">
                <a-input v-model="queryParam.roadName" allow-clear placeholder="请输入道路名称"/>
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
        :rowKey="(record) => record.ogrFid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('gisWell:add')" >
          <a-button type="primary" v-if="hasPerm('gisWell:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('gisWell:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('gisWell:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="censusTimeScopedSlots" slot-scope="text">
          <span v-if="text">
            {{ text | moment('YYYY-MM-DD') }}
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('gisWell:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('gisWell:edit') & hasPerm('gisWell:delete')"/>
          <a v-if="hasPerm('gisWell:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('gisWell:edit') & hasPerm('gisWell:delete')"/>
          <a-popconfirm v-if="hasPerm('gisWell:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { gisWellPage, gisWellDelete, gisWellExport } from '@/api/modular/main/giswell/gisWellManage'
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
            title: '外业点号',
            align: 'center',
            dataIndex: 'fieldStationNo'
          },
          {
            title: 'X坐标',
            align: 'center',
            dataIndex: 'xcoordinate'
          },
          {
            title: 'Y坐标',
            align: 'center',
            dataIndex: 'ycoordinate'
          },
          {
            title: '地面高程',
            align: 'center',
            dataIndex: 'wellheadElevation'
          },
          {
            title: '井盖尺寸',
            align: 'center',
            dataIndex: 'coverSize'
          },
          {
            title: '井盖材质',
            align: 'center',
            dataIndex: 'coverMaterial'
          },
          {
            title: '附属物',
            align: 'center',
            dataIndex: 'appendage'
          },
          {
            title: '道路名称',
            align: 'center',
            dataIndex: 'roadName'
          },
          {
            title: '普查时间',
            align: 'center',
            dataIndex: 'censusTime',
            scopedSlots: { customRender: 'censusTimeScopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return gisWellPage(Object.assign(parameter, this.switchingDate())).then((res) => {
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
      if (this.hasPerm('gisWell:edit') || this.hasPerm('gisWell:delete')) {
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
        const param = [{ 'ogrFid': record.ogrFid }]
        this.gisWellDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'ogrFid': d }
        })
        this.gisWellDelete(paramIds)
      },
      gisWellDelete (record) {
        gisWellDelete(record).then((res) => {
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
            return { 'ogrFid': d }
        })
        gisWellExport(paramIds).then((res) => {
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
<style lang="less">
  .table-operator {
    margin-bottom: 18px;
  }
  button {
    margin-right: 8px;
  }
</style>
