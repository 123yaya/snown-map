<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('comb:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="排水系统编码">
                <a-input v-model="queryParam.systemid" allow-clear placeholder="请输入排水系统编码"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="X坐标">
                <a-input v-model="queryParam.xcoor" allow-clear placeholder="请输入X坐标"/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="Y坐标">
                  <a-input v-model="queryParam.ycoor" allow-clear placeholder="请输入Y坐标"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="所在道路名称">
                  <a-input v-model="queryParam.roadName" allow-clear placeholder="请输入所在道路名称"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口形式">
                  <a-select style="width: 100%" v-model="queryParam.combType" placeholder="请选择雨水口形式">
                    <a-select-option v-for="(item,index) in combTypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口形状">
                  <a-select style="width: 100%" v-model="queryParam.combshape" placeholder="请选择雨水口形状">
                    <a-select-option v-for="(item,index) in combshapeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口尺寸1">
                  <a-input v-model="queryParam.combDimenl" allow-clear placeholder="请输入雨水口尺寸1"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口尺寸2">
                  <a-input v-model="queryParam.combDimen2" allow-clear placeholder="请输入雨水口尺寸2"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水算材质">
                  <a-select style="width: 100%" v-model="queryParam.graMaterial" placeholder="请选择雨水算材质">
                    <a-select-option v-for="(item,index) in graMaterialData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水算间距">
                  <a-input v-model="queryParam.graSpacing" allow-clear placeholder="请输入雨水算间距"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水算厚度">
                  <a-input v-model="queryParam.graThickness" allow-clear placeholder="请输入雨水算厚度"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口最大深度">
                  <a-input v-model="queryParam.maxdepth" allow-clear placeholder="请输入雨水口最大深度"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="雨水口地表高程">
                  <a-input v-model="queryParam.surfaceElev" allow-clear placeholder="请输入雨水口地表高程"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="数据来源">
                  <a-select style="width: 100%" v-model="queryParam.datasource" placeholder="请选择数据来源">
                    <a-select-option v-for="(item,index) in datasourceData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="数据获取日期">
                  <a-date-picker style="width: 100%" placeholder="请选择数据获取日期" v-model="queryParam.recordDateDate" @change="onChangerecordDate"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="填报单位">
                  <a-input v-model="queryParam.reportUnit" allow-clear placeholder="请输入填报单位"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="填报日期">
                  <a-date-picker style="width: 100%" placeholder="请选择填报日期" v-model="queryParam.reportDateDate" @change="onChangereportDate"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="设计能力">
                  <a-input v-model="queryParam.designSluicapa" allow-clear placeholder="请输入设计能力"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="是否装备垃圾拦截装置">
                  <a-select style="width: 100%" v-model="queryParam.antitrash" placeholder="请选择是否装备垃圾拦截装置">
                    <a-select-option v-for="(item,index) in antitrashData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="是否装备防臭装置">
                  <a-select style="width: 100%" v-model="queryParam.antiodor" placeholder="请选择是否装备防臭装置">
                    <a-select-option v-for="(item,index) in antiodorData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="是否装备初期雨水截流装置">
                  <a-select style="width: 100%" v-model="queryParam.iniraininter" placeholder="请选择是否装备初期雨水截流装置">
                    <a-select-option v-for="(item,index) in iniraininterData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="设施状态">
                  <a-select style="width: 100%" v-model="queryParam.status" placeholder="请选择设施状态">
                    <a-select-option v-for="(item,index) in statusData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="备注">
                  <a-input v-model="queryParam.remark" allow-clear placeholder="请输入备注"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="8" :sm="24" >
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)" >查询</a-button>
                <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
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
        :rowKey="(record) => record.combid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('comb:add')" >
          <a-button type="primary" v-if="hasPerm('comb:add')" icon="plus" @click="$refs.addForm.add()">新增雨水口数据</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('comb:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('comb:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="combTypeScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="combshapeScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="graMaterialScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="datasourceScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="antitrashScopedSlots" slot-scope="text">
          {{ 'yes_or_no_integer' | dictType(text) }}
        </span>
        <span slot="antiodorScopedSlots" slot-scope="text">
          {{ 'yes_or_no_integer' | dictType(text) }}
        </span>
        <span slot="iniraininterScopedSlots" slot-scope="text">
          {{ 'yes_or_no_integer' | dictType(text) }}
        </span>
        <span slot="statusScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('meeting:detail')" @click="$refs.infoForm.edit(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('meeting:edit') & hasPerm('meeting:delete')"/>
          <a v-if="hasPerm('comb:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('comb:edit') & hasPerm('comb:delete')"/>
          <a-popconfirm v-if="hasPerm('comb:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <info-form ref="infoForm" @ok="handleOk" />
    </a-card>
  </div>
</template>
<script>
  import { STable, XDown } from '@/components'
  import moment from 'moment'
  import { combPage, combDelete, combExport } from '@/api/modular/main/comb/combManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import infoForm from './info.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      infoForm,
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
            title: 'X坐标',
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
            title: '所在道路名称',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'roadName'
          },
          {
            title: '雨水口形式',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'combType',
            scopedSlots: { customRender: 'combTypeScopedSlots' }
          },
          {
            title: '雨水口形状',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'combshape',
            scopedSlots: { customRender: 'combshapeScopedSlots' }
          },
          {
            title: '雨水口尺寸1',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'combDimenl'
          },
          {
            title: '雨水口尺寸2',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'combDimen2'
          },
          {
            title: '雨水算材质',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'graMaterial',
            scopedSlots: { customRender: 'graMaterialScopedSlots' }
          },
          {
            title: '雨水算间距',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'graSpacing'
          },
          {
            title: '雨水算厚度',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'graThickness'
          },
          {
            title: '雨水口最大深度',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'maxdepth'
          },
          {
            title: '雨水口地表高程',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'surfaceElev'
          },
          {
            title: '数据来源',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'datasource',
            scopedSlots: { customRender: 'datasourceScopedSlots' }
          },
          {
            title: '数据获取日期',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'recordDate'
          },
          {
            title: '填报单位',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'reportUnit'
          },
          {
            title: '填报日期',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'reportDate'
          },
          {
            title: '设计能力',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'designSluicapa'
          },
          {
            title: '是否装备垃圾拦截装置',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'antitrash',
            scopedSlots: { customRender: 'antitrashScopedSlots' }
          },
          {
            title: '是否装备防臭装置',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'antiodor',
            scopedSlots: { customRender: 'antiodorScopedSlots' }
          },
          {
            title: '是否装备初期雨水截流装置',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'iniraininter',
            scopedSlots: { customRender: 'iniraininterScopedSlots' }
          },
          {
            title: '设施状态',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'status',
            scopedSlots: { customRender: 'statusScopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return combPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        combTypeData: [],
        combshapeData: [],
        graMaterialData: [],
        datasourceData: [],
        antitrashData: [],
        antiodorData: [],
        iniraininterData: [],
        statusData: [],
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
      if (this.hasPerm('comb:edit') || this.hasPerm('comb:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        })
      }
      const combTypeOption = this.$options
      this.combTypeData = combTypeOption.filters['dictData']('common_status')
      const combshapeOption = this.$options
      this.combshapeData = combshapeOption.filters['dictData']('common_status')
      const graMaterialOption = this.$options
      this.graMaterialData = graMaterialOption.filters['dictData']('common_status')
      const datasourceOption = this.$options
      this.datasourceData = datasourceOption.filters['dictData']('common_status')
      const antitrashOption = this.$options
      this.antitrashData = antitrashOption.filters['dictData']('yes_or_no_integer')
      const antiodorOption = this.$options
      this.antiodorData = antiodorOption.filters['dictData']('yes_or_no_integer')
      const iniraininterOption = this.$options
      this.iniraininterData = iniraininterOption.filters['dictData']('yes_or_no_integer')
      const statusOption = this.$options
      this.statusData = statusOption.filters['dictData']('common_status')
    },
    methods: {
      moment,
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
        const param = [{ 'combid': record.combid }]
        this.combDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'combid': d }
        })
        this.combDelete(paramIds)
      },
      combDelete (record) {
        combDelete(record).then((res) => {
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
      onChangerecordDate(date, dateString) {
        this.recordDateDateString = dateString
      },
      onChangereportDate(date, dateString) {
        this.reportDateDateString = dateString
      },
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'combid': d }
        })
        combExport(paramIds).then((res) => {
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
