<template>
  <div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="14">
              <a-form-item label="测站信息">
                <a-input v-model="queryParam.name" allow-clear placeholder="请输入测站相关信息，多条件使用空格分割" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">搜索</a-button>
              <a-button type="primary" style="margin-right:20px">测点数：{{ cdNum }}</a-button>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                刷新时间：{{ updateTime }}
                <!--                <a-button type="primary" icon="undo" @click="updateTime= moment().format('YYYY-MM-DD hh:mm')">刷新</a-button>-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <s-table class="sb-table" ref="table" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" :columns="columns" :data="loadData" :scroll="{ x: 1300 }" :alert="options.alert" :rowKey="record => record.wwtpid" :rowSelection="options.rowSelection">
        <template class="table-operator" slot="operator">
          <x-down ref="batchExport" @batchExport="batchExport" />
        </template>
        <template slot="monitorTypeScopedSlots" slot-scope="text">
          {{ 'MONITOR_TYPE' | dictType(text) }}
        </template>
        <template slot="areaScopedSlots">
          延吉市
        </template>
        <template slot="statusScopedSlots" slot-scope="text, record">
          <span class="online" v-if="record.monitorType<4">在线</span>
          <span class="offline" v-else>离线</span>
        </template>
        <template slot="realTimeScopedSlots">
          1
        </template>
        <template slot="dateScopedSlots" slot-scope="text">
          <span v-if="text">{{ text | moment('YYYY-MM-DD HH:mm:ss') }}</span>
          <span v-else></span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a @click="local(record)">定位</a>
        </template>
      </s-table>
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import { monitorEquipmentRealTimePage } from '@/api/modular/main/monitor/monitorManage'
export default {
  components: {
    STable,
    XDown
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      cdNum: 0, // 测点数
      updateTime: moment().format('YYYY-MM-DD HH:mm'), // 当前时间
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '测点名称',
          align: 'center',
          ellipsis: true,
          dataIndex: 'name'
        },
        {
          title: '设备类型',
          align: 'center',
          ellipsis: true,
          dataIndex: 'monitorType',
          scopedSlots: { customRender: 'monitorTypeScopedSlots' }
        },
        {
          title: '所属区',
          align: 'center',
          width: 150,
          ellipsis: true,
          dataIndex: 'area',
          scopedSlots: { customRender: 'areaScopedSlots' }
        },
        {
          title: '地址',
          align: 'center',
          ellipsis: true,
          dataIndex: 'addr'
        },
        {
          title: '设备状态',
          align: 'center',
          ellipsis: true,
          scopedSlots: { customRender: 'statusScopedSlots' }
        },
        {
          title: '实时监测',
          align: 'center',
          ellipsis: true,
          scopedSlots: { customRender: 'realTimeScopedSlots' }
        },
        {
          title: '数据采集时间',
          align: 'center',
          width: 200,
          ellipsis: true,
          dataIndex: 'collectionTime',
          scopedSlots: { customRender: 'dateScopedSlots' }
        },
        {
          title: '操作',
          width: '100px',
          align: 'center',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return monitorEquipmentRealTimePage(Object.assign(parameter, this.switchingDate())).then(res => {
          this.cdNum = res.data.totalRows
          this.updateTime = moment().format('YYYY-MM-DD HH:mm')
          return res.data
        })
      },
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
  created () {

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
    local (record) {
      this.$router.push({ name: 'one_map_view', params: { lat: record.ycoor, lng: record.xcoor } })
    },
    /**
     * 批量导出
     */
    batchExport () {
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
.online {
  background-color: rgba(28, 246, 137, 0.2);
  border: 1px solid #1cf689;
  color: #47c686;
  padding: 4px 8px;
}
.offline {
  color: #cf6666;
  border: 1px solid #cf6666;
  background-color: rgba(207, 102, 102, 0.2);
  padding: 4px 8px;
}
.sb-table tr.table-striped {
  background-color: #fdfcfc;
}
</style>
