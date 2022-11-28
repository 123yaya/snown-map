<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('emergencyTeam:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="名称">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="类型">
                <a-select style="width: 100%" v-model="queryParam.type" placeholder="请选择类型">
                  <a-select-option v-for="(item,index) in dict_emergency_team_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
        <template class="table-operator" slot="operator" v-if="hasPerm('emergencyTeam:add')" >
          <a-button type="primary" v-if="hasPerm('emergencyTeam:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('emergencyTeam:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down v-if="hasPerm('emergencyTeam:export')" ref="batchExport" @batchExport="batchExport"/>
        </template>
        <span slot="typeScopedSlots" slot-scope="text">
          {{ 'EMERGENCY_TEAM_TYPE' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('emergencyTeam:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('emergencyTeam:edit') & hasPerm('emergencyTeam:delete')"/>
          <a v-if="hasPerm('emergencyTeam:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('emergencyTeam:edit') & hasPerm('emergencyTeam:delete')"/>
          <a-popconfirm v-if="hasPerm('emergencyTeam:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
  import { emergencyTeamPage, emergencyTeamDelete, emergencyTeamExport } from '@/api/modular/main/emergencyteam/emergencyTeamManage'
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
            title: '名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '类型',
            align: 'center',
            dataIndex: 'type',
            scopedSlots: { customRender: 'typeScopedSlots' }
          },
          {
            title: '关联组织',
            align: 'center',
            dataIndex: 'orgId'
          },
          {
            title: '领导小组成员',
            align: 'center',
            dataIndex: 'leaderNames'
          },
          {
            title: '组内成员',
            align: 'center',
            dataIndex: 'personNames'
          },
          {
            title: '主要应急车辆',
            align: 'center',
            dataIndex: 'mainCarNames'
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return emergencyTeamPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
        dict_emergency_team_type: []
      }
    },
    created () {
      if (this.hasPerm('emergencyTeam:edit') || this.hasPerm('emergencyTeam:delete')) {
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
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_emergency_team_type = this.$options.filters['dictData']('EMERGENCY_TEAM_TYPE')
      },
      /**
       * 单个删除
       */
      singleDelete (record) {
        const param = [{ 'id': record.id }]
        this.emergencyTeamDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.emergencyTeamDelete(paramIds)
      },
      emergencyTeamDelete (record) {
        emergencyTeamDelete(record).then((res) => {
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
        emergencyTeamExport(paramIds).then((res) => {
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
