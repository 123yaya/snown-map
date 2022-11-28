<template>
  <div class="table-detail-model" v-if="tableDetail">
    <a-icon type="close-circle" theme="outlined" class="close-btn" @click="close()" />
    <a-tabs :value="activeKey" class="table-tabs">
      <a-tab-pane :key="1" tab="排水管线">
        <a-table class="ant-table-striped detail-table" :rowKey="(record) => record.id" size="middle" :scroll="{ x: 560, y: 210 }" :pagination="false" :columns="leftColumns" :data-source="leftTableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
          <template slot="census_time" slot-scope="text">
            {{ text | moment('YYYY-MM-DD') }}
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="排水井" force-render>
        <a-table class="ant-table-striped detail-table" :rowKey="(record) => record.id" size="middle" :scroll="{ x: 560, y: 210 }" :pagination="false" :columns="rightColumns" :data-source="rightTableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
          <template slot="census_time" slot-scope="text">
            {{ text | moment('YYYY-MM-DD') }}
          </template>
        </a-table>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import moment from 'moment'
import { getDate } from '@/utils/util'
export default {
  name: 'TableDetail',
  data () {
    return {
      tableDetail: false,
      activeKey: 1,
      leftColumns: [
        {
          title: '管段编码',
          dataIndex: 'pipe_section_no',
          align: 'center',
          width: 164
        }, {
          title: '起始井号',
          dataIndex: 'start_well_number',
          align: 'center',
          width: 100
        }, {
          title: '终止井号',
          dataIndex: 'end_well_number',
          align: 'center',
          width: 100
        }, {
          title: '起始外业点号',
          dataIndex: 'start_field_station_no',
          align: 'center',
          width: 120
        }, {
          title: '终止外业点号',
          dataIndex: 'end_field_station_no',
          align: 'center',
          width: 120
        }, {
          title: '管线材质',
          dataIndex: 'pipeline_material',
          align: 'center',
          width: 100
        }, {
          title: '管径',
          dataIndex: 'pipe_diameter',
          align: 'center',
          width: 100
        }, {
          title: '压力',
          dataIndex: 'pressure',
          align: 'center',
          width: 100
        }, {
          title: '埋设方式',
          dataIndex: 'burial_method',
          align: 'center',
          width: 100
        }, {
          title: '管底埋深',
          dataIndex: 'pipe_bottom_burial_depth',
          align: 'center',
          width: 100
        }, {
          title: '管尾埋深',
          dataIndex: 'pipe_tail_burial_dept',
          align: 'center',
          width: 100
        }, {
          title: '管底高程',
          dataIndex: 'pipe_bottom_elevation',
          align: 'center',
          width: 100
        }, {
          title: '管尾高程',
          dataIndex: 'pipe_tail_elevation',
          align: 'center',
          width: 100
        }, {
          title: '管段类型',
          dataIndex: 'pipe_type',
          align: 'center',
          width: 100
        }, {
          title: '管段长度',
          dataIndex: 'pipe_length',
          align: 'center',
          width: 100
        }, {
          title: '流向',
          dataIndex: 'flow_direction',
          align: 'center',
          width: 100
        }, {
          title: '水流',
          dataIndex: 'flow',
          align: 'center',
          width: 100
        }, {
          title: '水位',
          dataIndex: 'water_level',
          align: 'center',
          width: 100
        },
        {
          title: '道路名称',
          dataIndex: 'road_name',
          align: 'center',
          width: 100
        }, {
          title: '普查时间',
          dataIndex: 'census_time',
          scopedSlots: { customRender: 'census_time' },
          align: 'center',
          width: 100
        }, {
          title: '起始X坐标',
          dataIndex: 'start_x',
          align: 'center',
          width: 100
        }, {
          title: '起始Y坐标',
          dataIndex: 'start_y',
          align: 'center',
          width: 100
        }, {
          title: '终止X坐标',
          dataIndex: 'end_x',
          align: 'center',
          width: 100
        }, {
          title: '终止Y坐标',
          dataIndex: 'end_y',
          align: 'center',
          width: 100
        }, {
          title: '备注',
          dataIndex: 'remarks',
          align: 'center',
          width: 100
        }
      ],
      rightColumns: [
        {
          title: '设施编号',
          dataIndex: 'facility_no',
          align: 'center',
          width: 100
        }, {
          title: '外业点号',
          dataIndex: 'field_station_no',
          align: 'center',
          width: 100
        }, {
          title: 'X坐标',
          dataIndex: 'x_coordinate',
          align: 'center',
          width: 100
        }, {
          title: 'Y坐标',
          dataIndex: 'y_coordinate',
          align: 'center',
          width: 100
        }, {
          title: '管线性质',
          dataIndex: 'pipeline_property',
          align: 'center',
          width: 100
        }, {
          title: '地面高程',
          dataIndex: 'wellhead_elevation',
          align: 'center',
          width: 100
        }, {
          title: '井盖尺寸',
          dataIndex: 'cover_size',
          align: 'center',
          width: 100
        }, {
          title: '井盖材质',
          dataIndex: 'cover_material',
          align: 'center',
          width: 100
        }, {
          title: '井深',
          dataIndex: 'well_depth',
          align: 'center',
          width: 100
        }, {
          title: '井径',
          dataIndex: 'well_diameter',
          align: 'center',
          width: 100
        }, {
          title: '井尺寸',
          dataIndex: 'well_size',
          align: 'center',
          width: 100
        }, {
          title: '井材质',
          dataIndex: 'well_material',
          align: 'center',
          width: 100
        }, {
          title: '附属物',
          dataIndex: 'appendage',
          align: 'center',
          width: 100
        }, {
          title: '特征',
          dataIndex: 'feature',
          align: 'center',
          width: 100
        }, {
          title: '类型',
          dataIndex: 'type',
          align: 'center',
          width: 100
        }, {
          title: '道路名称',
          dataIndex: 'road_name',
          align: 'center',
          width: 100
        }, {
          title: '普查时间',
          dataIndex: 'census_time',
          scopedSlots: { customRender: 'census_time' },
          align: 'center',
          width: 100
        }, {
          title: '备注',
          dataIndex: 'remarks',
          align: 'center',
          width: 100
        }
      ],
      leftTableData: [],
      rightTableData: []
    }
  },
  methods: {
    close () {
      this.tableDetail = false
    },

    show (features) {
      this.tableDetail = true
      this.leftTableData = []
      this.rightTableData = []
      const that = this
      console.log('features', features)
      if (features.length > 0) {
        features.map(mapItem => {
          if (mapItem.id.indexOf('gis_pipeline') > -1) {
            that.leftTableData.push(mapItem.properties)
          } else {
            that.rightTableData.push(mapItem.properties)
          }
        })
      }
      console.log('this.leftTableData', this.leftTableData)
      console.log('this.rightTableData', this.rightTableData)
    }
  }
}
</script>

<style lang="less">
.table-detail-model {
  .detail-table tr {
    background-color: #085eaa;
  }
  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    overflow: hidden !important;
    margin: 0 !important;
  }
  .detail-table .ant-table-thead > tr > th {
    background-color: #085eaa;
    border-bottom: 1px solid #0572d1;
    color: #fff;
    font-weight: bold;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #0572d1;
  }
  .ant-table-thead > tr:first-child > th:first-child {
    border-top-left-radius: 0;
  }
  .detail-table tbody.ant-table-tbody {
    color: #fff;
  }
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #2e3cd6;
  }
  .table-tabs .ant-tabs-tab-active.ant-tabs-tab {
    color: #4affff;
    font-size: 16px;
    background: transparent;
    border: none;
  }
  .table-tabs .ant-tabs-tab {
    color: #a0f5f5;
  }

  .detail-table .ant-table-body {
    cursor: pointer;
    &::-webkit-scrollbar {
      height: 12px;
      width: 0px;
      border-radius: 5px;
      overflow-y: auto;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: #00dcff;
    }
    &::-webkit-scrollbar-track {
      border-radius: 5px;
      background: #d5eff3;
    }
  }
}
</style>
<style lang="less" scoped>
.table-detail-model {
  width: 620px;
  padding: 2px 10px 10px;
  min-height: 230px;
  border: 1px solid #2a558e;
  background-color: #1e62b2;
  position: absolute;
  left: calc(50% - 300px);
  bottom: 5px;
  z-index: 99;
  box-sizing: border-box;
  .close-btn {
    color: #00dcff;
    font-size: 24px;
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    z-index: 999;
  }
}
</style>
