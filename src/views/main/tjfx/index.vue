<template>
  <div>
    <div class="topTableInfo">
      <h4 class="infoTop">
        <span>2022</span>年抢险内涝水浸点统计表
      </h4>
      <div class="infoBottom">
        <div class="statisticsNumBox" v-for="(item, index) in statisticsNumList" :key="index">
          <p class="statisticsNum">
            {{ item.num }}
          </p>
          <p class="statisticsName">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper" v-if="hasPerm('wwtp:page')">
        <a-form layout="inline" style="flex: 1">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="挂警时间">
                <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="挂警级别">
                <a-select v-model="queryParam.sludgetreatmethod" placeholder="请选择">
                  <a-select-option v-for="(item, index) in sludgetreatmethodData" :key="index" :value="item">{{ item }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="6" :sm="24">
              <a-form-item label="积水时长">
                <a-input-group compact>
                  <a-input style=" width: 100px; text-align: center" placeholder="" />
                  <a-input style=" width: 50px; border-left: 0; pointer-events: none; backgroundColor: #fff;text-align: center" placeholder="至" disabled />
                  <a-input style="width: 100px; text-align: center; border-left: 0" placeholder="" />
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="水浸深度">
                <a-input-group compact>
                  <a-input style="width: 100px; text-align: center" placeholder="" />
                  <a-input style="width: 50px; border-left: 0; pointer-events: none; backgroundColor: #fff;text-align: center" placeholder="至" disabled />
                  <a-input style="width: 100px; text-align: center; border-left: 0" placeholder="" />
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="内涝等级">
                <a-select v-model="queryParam.sludgetreatmethod" placeholder="请选择">
                  <a-select-option v-for="(item, index) in sludgetreatmethodData" :key="index" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="水浸名称">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
                <x-down ref="batchExport" @batchExport="batchExport" />
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <a-table :columns="columns" :data-source="data" bordered :scroll="{ x: 'calc(700px + 50%)', y: 400 }">
        <template v-for="col in ['yjLevel', 'qdLevel', 'groupNum','peopleTimes', 'carTimes', 'cssb', 'drtq']" :slot="col" slot-scope="text, record">
          <div :key="col">
            <a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.key, col)" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)">
                <a-button type="primary">
                  保存
                </a-button>
              </a>
              <a-popconfirm title="是否取消?" @confirm="() => cancel(record.key)">
                <a-button>
                  取消
                </a-button>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">
                <a-icon type="edit" />
              </a>
            </span>
          </div>
        </template>
        <a-table slot="expandedRowRender" slot-scope=" " :columns="innerColumns" :data-source="innerData" :pagination="false" :scroll="{ x: 'calc(700px + 50%)' }">
          <template v-for="col in ['name']" :slot="col" slot-scope="text, record">
            <div :key="col">
              <a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChangeTwo(e.target.value, record.key, col)" />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => saveTwo(record.key)">
                  <a-button type="primary">
                    保存
                  </a-button>
                </a>
                <a-popconfirm title="是否取消?" @confirm="() => cancelTwo(record.key)">
                  <a-button>
                    取消
                  </a-button>
                </a-popconfirm>
              </span>
              <span v-else>
                <a :disabled="editingKey !== ''" @click="() => editTwo(record.key)">
                  <a-icon type="edit" />
                </a>
              </span>
            </div>
          </template>
        </a-table>
      </a-table>
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
const columns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width: 80,
    align: 'center'
  },
  {
    title: '挂警日期',
    dataIndex: 'gjdate',
    key: 'gjdate',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'gjdate' }
  },
  {
    title: '结束日期',
    dataIndex: 'overdate',
    key: 'overdate',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'overdate' }
  },
  {
    title: '启动预警等级',
    dataIndex: 'qdLevel',
    key: 'qdLevel',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'qdLevel' }
  },
  {
    title: '预警级别',
    align: 'center',
    children: [
      {
        title: '一级',
        dataIndex: 'yjLevel',
        key: 'yjLevel',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'yjLevel' }
      },
      {
        title: '二级',
        dataIndex: 'yjLevel2',
        key: 'yjLevel2',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'yjLevel' }
      },
      {
        title: '三级',
        dataIndex: 'yjLevel3',
        key: 'yjLevel3',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'yjLevel' }
      },
      {
        title: '四级',
        dataIndex: 'yjLevel4',
        key: 'yjLevel4',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'yjLevel' }
      }
    ]
  },
  {
    title: '力量统计',
    align: 'center',
    children: [
      {
        title: '分组数量',
        dataIndex: 'groupNum',
        key: 'groupNum',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'groupNum' }
      },
      {
        title: '人次',
        dataIndex: 'peopleTimes',
        key: 'peopleTimes',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'peopleTimes' }
      },
      {
        title: '车次',
        dataIndex: 'carTimes',
        key: 'carTimes',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'carTimes' }
      },
      {
        title: '抽水设备(台)',
        dataIndex: 'cssb',
        key: 'cssb',
        width: 120,
        align: 'center',
        scopedSlots: { customRender: 'cssb' }
      }
    ]
  },
  {
    title: '当日天气',
    dataIndex: 'drtq',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'drtq' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 100,
    align: 'center',
    // fixed: 'right',
    scopedSlots: { customRender: 'operation' }
  }
]
const innerColumns = [
  {
    title: '序号',
    dataIndex: 'num',
    key: 'num',
    width: 80,
    align: 'center'
  },
  {
    title: '内涝点名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '内涝等级',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '水深*米',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '积水开始时间',
    align: 'center',
    children: [
      {
        title: '*时:*分',
        dataIndex: 'num',
        key: 'num',
        width: 180,
        align: 'center'
      }
    ]
  },
  {
    title: '积水结束时间',
    align: 'center',
    children: [
      {
        title: '*时:*分',
        dataIndex: 'num',
        key: 'num',
        width: 180,
        align: 'center'
      }
    ]
  },
  {
    title: '积水时长',
    align: 'center',
    children: [
      {
        title: '*时:*分',
        dataIndex: 'num',
        key: 'num',
        width: 180,
        align: 'center'
      }
    ]
  },
  {
    title: '初步积水原因',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '处置措施',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '处理队伍名',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '处理分组名',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '值班人员（实际）',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '支援队伍名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '支援分组名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '水浸照片',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '备注',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    align: 'center',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: 80,
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
export default {
  components: {
    STable,
    XDown
  },
  data () {
    return {
      data: [
        {
          key: '0',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        },
        {
          key: '1',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        },
        {
          key: '2',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        },
        {
          key: '3',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        }
      ],
      columns,
      innerColumns,
      innerData: [
        {
          key: '0',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        },
        {
          key: '1',
          num: 1,
          gjdate: '2020-01-20 14:26:48',
          overdate: '2020-01-20 14:26:48',
          qdLevel: '',
          yjLevel: '',
          yjLevel2: '',
          yjLevel3: '',
          yjLevel4: '',
          groupNum: 5,
          peopleTimes: '',
          carTimes: '',
          cssb: '',
          drtq: '阴'
        }
      ],
      editingKey: '',
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      sludgetreatmethodData: ['一级', '二级', '三级', '四级'],
      statisticsNumList: [
        {
          num: 96,
          name: '组数'
        },
        {
          num: 31,
          name: '人员'
        },
        {
          num: 7,
          name: '车辆(台)'
        },
        {
          num: 3,
          name: '抽水设备(台)'
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' }
    }
  },
  created () {
    this.cacheData = this.data.map(item => ({ ...item }))
    this.cacheinnerData = this.innerData.map(item => ({ ...item }))
  },
  methods: {
    moment,
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleChangeTwo (value, key, column) {
      const newData = [...this.innerData]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.innerData = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    editTwo (key) {
      const newData = [...this.innerData]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.innerData = newData
      }
    },
    save (key) {
      const newData = [...this.data]
      const newCacheData = [...this.cacheData]
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key)
      if (target && targetCache) {
        delete target.editable
        this.data = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    saveTwo (key) {
      const newData = [...this.innerData]
      const newCacheData = [...this.cacheinnerData]
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key)
      if (target && targetCache) {
        delete target.editable
        this.innerData = newData
        Object.assign(targetCache, target)
        this.cacheinnerData = newCacheData
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.data = newData
      }
    },
    cancelTwo (key) {
      const newData = [...this.innerData]
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.innerData = newData
      }
    },
    /**
     * 批量导出
     */
    batchExport () {
    }
  }
}
</script>
<style lang="less" scoped>
.topTableInfo {
  background-color: #ffffff;
  display: flex;
  margin: 0px auto;
  padding: 10px;
  align-items: center;
  flex-direction: column;
  .infoTop {
    color: #1890ff;
    font-weight: bold;
    font-size: 25px;
    margin: 10px auto 20px;
    span {
      padding: 3px 10px;
    }
  }
  .infoBottom {
    width: 80%;
    margin: 0 auto;
    display: inline-flex;
    justify-content: space-between;
    .statisticsNumBox {
      width: 20%;
      height: 100px;
      background: linear-gradient(to bottom, #0c519a, #cdd9f6);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 10px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      &:nth-child(2) {
        background: linear-gradient(to bottom, #8e70fb, #d5cbfb);
      }
      &:nth-child(3) {
        background: linear-gradient(to bottom, #579cfb, #ccd7fd);
      }
      &:nth-child(4) {
        background: linear-gradient(to bottom, #ffb051, #f9ddbb);
      }
      .statisticsNum {
        width: 100%;
        text-align: center;
        font-size: 24px;
        margin: 10px 0 6px;
      }
      .statisticsName {
        width: 100%;
        text-align: center;
        font-size: 18px;
      }
    }
  }
}
.table-page-search-wrapper {
  display: flex;
  align-items: center;
}
.table-operator {
  margin-bottom: 18px;
}
button {
  margin-right: 8px;
}
.ant-tooltip-inner {
  width: auto !important;
}
</style>
