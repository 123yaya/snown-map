<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('system:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="系统名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入系统名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="系统类型">
                <a-select style="width: 100%" v-model="queryParam.systemType" placeholder="请选择系统类型">
                  <a-select-option v-for="(item,index) in systemTypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="汇水面积">
                  <a-input v-model="queryParam.servicearea" allow-clear placeholder="请输入汇水面积"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="服务人口数">
                  <a-input-number v-model="queryParam.servicepopulation" style="width: 100%" allow-clear placeholder="请输入服务人口数"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="径流系数">
                  <a-input v-model="queryParam.runoffCoeff" allow-clear placeholder="请输入径流系数"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="设计重现期">
                  <a-input v-model="queryParam.designRtp" allow-clear placeholder="请输入设计重现期"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="记录建立日期">
                  <a-date-picker style="width: 100%" placeholder="请选择记录建立日期" v-model="queryParam.estDateDate" @change="onChangeestDate"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="最后修改日期">
                  <a-date-picker style="width: 100%" placeholder="请选择最后修改日期" v-model="queryParam.updateDateDate" @change="onChangeupdateDate"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="记录建立单位">
                  <a-input v-model="queryParam.estUnit" allow-clear placeholder="请输入记录建立单位"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="数据维护单位">
                  <a-input v-model="queryParam.orgUnit" allow-clear placeholder="请输入数据维护单位"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="坐标系统">
                  <a-input v-model="queryParam.coorsystem" allow-clear placeholder="请输入坐标系统"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="高程系统">
                  <a-input v-model="queryParam.elevsystem" allow-clear placeholder="请输入高程系统"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="排水体制说明">
                  <a-input v-model="queryParam.drainsystem" allow-clear placeholder="请输入排水体制说明"/>
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
        :scroll="{ x: 1300 }"
        :data="loadData"
        :alert="options.alert"
        :rowKey="(record) => record.systemid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('system:add')" >
          <a-button type="primary" v-if="hasPerm('system:add')" icon="plus" @click="$refs.addForm.add()">新增排水系统</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('system:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('system:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="systemTypeScopedSlots" slot-scope="text">
          {{ 'common_status' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('meeting:detail')" @click="$refs.infoForm.edit(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('meeting:edit') & hasPerm('meeting:delete')"/>
          <a v-if="hasPerm('system:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('system:edit') & hasPerm('system:delete')"/>
          <a-popconfirm v-if="hasPerm('system:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { systemPage, systemDelete, systemExport } from '@/api/modular/main/system/systemManage'
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
            title: '系统名称',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'name'
          },
          {
            title: '系统类型',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'systemType',
            scopedSlots: { customRender: 'systemTypeScopedSlots' }
          },
          {
            title: '汇水面积',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'servicearea'
          },
          {
            title: '服务人口数',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'servicepopulation'
          },
          {
            title: '径流系数',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'runoffCoeff'
          },
          {
            title: '设计重现期',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'designRtp'
          },
          {
            title: '记录建立日期',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'estDate'
          },
          {
            title: '最后修改日期',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'updateDate'
          },
          {
            title: '记录建立单位',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'estUnit'
          },
          {
            title: '数据维护单位',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'orgUnit'
          },
          {
            title: '坐标系统',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'coorsystem'
          },
          {
            title: '高程系统',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'elevsystem'
          },
          {
            title: '排水体制说明',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'drainsystem'
          },
          {
            title: '备注',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'remark'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return systemPage(Object.assign(parameter, this.switchingDate())).then((res) => {
            return res.data
          })
        },
        systemTypeData: [],
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
      if (this.hasPerm('system:edit') || this.hasPerm('system:delete')) {
        this.columns.push({
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        })
      }
      const systemTypeOption = this.$options
      this.systemTypeData = systemTypeOption.filters['dictData']('common_status')
    },
    methods: {
      moment,
      /**
       * 查询参数组装
       */
      switchingDate () {
        const queryParamestDate = this.queryParam.estDateDate
        if (queryParamestDate != null) {
            this.queryParam.estDate = moment(queryParamestDate).format('YYYY-MM-DD')
            if (queryParamestDate.length < 1) {
                delete this.queryParam.estDate
            }
        }
        const queryParamupdateDate = this.queryParam.updateDateDate
        if (queryParamupdateDate != null) {
            this.queryParam.updateDate = moment(queryParamupdateDate).format('YYYY-MM-DD')
            if (queryParamupdateDate.length < 1) {
                delete this.queryParam.updateDate
            }
        }
        const obj = JSON.parse(JSON.stringify(this.queryParam))
        return obj
      },
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'systemid': record.systemid }]
        this.systemDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'systemid': d }
        })
        this.systemDelete(paramIds)
      },
      systemDelete (record) {
        systemDelete(record).then((res) => {
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
      onChangeestDate(date, dateString) {
        this.estDateDateString = dateString
      },
      onChangeupdateDate(date, dateString) {
        this.updateDateDateString = dateString
      },
      /**
       * 批量导出
       */
      batchExport () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'systemid': d }
        })
        systemExport(paramIds).then((res) => {
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
