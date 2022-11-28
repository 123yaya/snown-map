<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('cameraInfo:page')">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="摄像机名称">
                <a-input v-model="queryParam.cameraName" allow-clear placeholder="请输入摄像机名称"/>
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
        :scroll="{ x: 1300 }"
        :alert="options.alert"
        :rowKey="(record) => record.id"
        :rowSelection="options.rowSelection"
      >
        <template class="table-operator" slot="operator" v-if="hasPerm('cameraInfo:add')" >
          <a-button type="primary" v-if="hasPerm('cameraInfo:add')" icon="plus" @click="$refs.addForm.add()">新增</a-button>
          <a-button type="danger" :disabled="selectedRowKeys.length < 1" v-if="hasPerm('cameraInfo:delete')" @click="batchDelete"><a-icon type="delete"/>批量删除</a-button>
          <x-down
            v-if="hasPerm('cameraInfo:export')"
            ref="batchExport"
            @batchExport="batchExport"
          />
        </template>
        <span slot="statusScopedSlots" slot-scope="text">
          {{ 'CAMERA_STATUS' | dictType(text) }}
        </span>
        <span slot="playTypeScopedSlots" slot-scope="text">
          {{ 'PLAY_TYPE' | dictType(text) }}
        </span>
        <span slot="streamTypeScopedSlots" slot-scope="text">
          {{ 'STREAM_TYPE' | dictType(text) }}
        </span>
        <span slot="action" slot-scope="text, record">
          <a v-if="hasPerm('cameraInfo:detail')" @click="$refs.videoShowForm.show(record)">播放</a>
          <a-divider type="vertical" v-if="hasPerm('cameraInfo:detail')"/>
          <a v-if="hasPerm('cameraInfo:detail')" @click="$refs.detailForm.detail(record)">查看</a>
          <a-divider type="vertical" v-if="hasPerm('cameraInfo:edit') & hasPerm('cameraInfo:delete')"/>
          <a v-if="hasPerm('cameraInfo:edit')" @click="$refs.editForm.edit(record)">编辑</a>
          <a-divider type="vertical" v-if="hasPerm('cameraInfo:edit') & hasPerm('cameraInfo:delete')"/>
          <a-popconfirm v-if="hasPerm('cameraInfo:delete')" placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
      <add-form ref="addForm" @ok="handleOk" />
      <edit-form ref="editForm" @ok="handleOk" />
      <detail-form ref="detailForm" />
      <video-show-form ref="videoShowForm" />
    </a-card>
  </div>
</template>
<script>
  import { STable, XDown } from '@/components'
  import { cameraInfoPage, cameraInfoDelete, cameraInfoExport } from '@/api/modular/main/camerainfo/cameraInfoManage'
  import addForm from './addForm.vue'
  import editForm from './editForm.vue'
  import detailForm from './detailForm.vue'
  import videoShowForm from './videoShowForm.vue'
  export default {
    components: {
      STable,
      addForm,
      editForm,
      detailForm,
      videoShowForm,
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
            title: '摄像机名称',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraName'
          },
          {
            title: '摄像机ip地址',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraIp'
          },
          {
            title: '摄像机位置',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraLocation'
          },
          {
            title: '摄像机经度',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraLongitude'
          },
          {
            title: '摄像机纬度',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraLatitude'
          },
          {
            title: '摄像机所属行政区划',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'cameraAddvcd'
          },
          {
            title: '摄像机状态',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'status',
            scopedSlots: { customRender: 'statusScopedSlots' }
          },
          {
            title: '播放类型',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'playType',
            scopedSlots: { customRender: 'playTypeScopedSlots' }
          },
          {
            title: '码流类型',
            align: 'center',
            width: 150,
            ellipsis: true,
            dataIndex: 'streamType',
            scopedSlots: { customRender: 'streamTypeScopedSlots' }
          }
        ],
        tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return cameraInfoPage(Object.assign(parameter, this.queryParam)).then((res) => {
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
      if (this.hasPerm('cameraInfo:edit') || this.hasPerm('cameraInfo:delete')) {
        this.columns.push({
          title: '操作',
          width: '180px',
          fixed: 'right',
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
        this.cameraInfoDelete(param)
      },
      /**
       * 批量删除
       */
      batchDelete () {
        const paramIds = this.selectedRowKeys.map((d) => {
            return { 'id': d }
        })
        this.cameraInfoDelete(paramIds)
      },
      cameraInfoDelete (record) {
        cameraInfoDelete(record).then((res) => {
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
        cameraInfoExport(paramIds).then((res) => {
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
