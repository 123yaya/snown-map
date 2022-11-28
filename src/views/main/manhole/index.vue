<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('manhole:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="检查井类别">
                <a-select style="width: 100%" v-model="queryParam.manholeCategory" placeholder="请选择检查井类别">
                  <a-select-option v-for="(item, index) in dict_manhole_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="检查井类型">
                <a-select style="width: 100%" v-model="queryParam.manholeType" placeholder="请选择检查井类型">
                  <a-select-option v-for="(item, index) in dict_manhole_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
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
        :rowKey="record => record.manholeid"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('manhole:add')">
          <a-button type="primary" v-if="hasPerm('manhole:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('manhole:delete')" @click="batchDelete"><a-icon type="delete" />批量删除</a-button>
          <x-down v-if="hasPerm('manhole:export')" ref="batchExport" @batchExport="batchExport" />
        </template>
        <span slot="manholeCategoryScopedSlots" slot-scope="text">
          {{ 'MANHOLE_CATEGORY' | dictType(text) }}
        </span>
        <span slot="manholeTypeScopedSlots" slot-scope="text">
          {{ 'MANHOLE_TYPE' | dictType(text) }}
        </span>
        <span slot="manholeStyleScopedSlots" slot-scope="text">
          {{ 'MANHOLE_STYLE' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('manhole:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('manhole:edit') & hasPerm('manhole:delete')"/>
          <a v-if="hasPerm('manhole:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('manhole:edit') & hasPerm('manhole:delete')" />
          <a-popconfirm v-if="hasPerm('manhole:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
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
import { manholePage, manholeDelete, manholeExport } from '@/api/modular/main/manhole/manholeManage'
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
          title: '排水系统编码',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'systemid'
        },
        {
          title: '坐标X',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'xcoor'
        },
        {
          title: '坐标Y',
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
          title: '检查井类别',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'manholeCategory',
          scopedSlots: { customRender: 'manholeCategoryScopedSlots' }
        },
        {
          title: '检查井类型',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'manholeType',
          scopedSlots: { customRender: 'manholeTypeScopedSlots' }
        },
        {
          title: '检查井形式',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'manholeStyle',
          scopedSlots: { customRender: 'manholeStyleScopedSlots' }
        },
        {
          title: '检查井井深',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'depth'
        },
        {
          title: '地面高程',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'surfaceElev'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return manholePage(Object.assign(parameter, this.switchingDate())).then(res => {
          return res.data
        })
      },
      dict_manhole_category: [],
      dict_manhole_type: [],
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
    if (this.hasPerm('manhole:edit') || this.hasPerm('manhole:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        fixed: 'right',
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
      this.dict_manhole_category = this.$options.filters['dictData']('MANHOLE_CATEGORY')
      this.dict_manhole_type = this.$options.filters['dictData']('MANHOLE_TYPE')
    },
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
      const param = [{ manholeid: record.manholeid }]
      this.manholeDelete(param)
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const paramIds = this.selectedRowKeys.map(d => {
        return { manholeid: d }
      })
      this.manholeDelete(paramIds)
    },
    manholeDelete(record) {
      manholeDelete(record).then(res => {
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
        return { manholeid: d }
      })
      manholeExport(paramIds).then(res => {
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
