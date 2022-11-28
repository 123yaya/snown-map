<template>
  <div class="devicePanel" v-if="liquidLevelStationDetail">
    <div class="devicePanel-top">
      <h4>{{ detailObj.name }}</h4>
      <div class="text">采集频率:<span style="padding-right:40px">5分钟</span>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="close()" />
      </div>
    </div>
    <div class="devicePanel-bot">
      <a-form layout="inline" :model="form" class="form-right">
        <!-- <a-form-item>
          <a-select class="select" :value="form.type" @change="handleTypeChange">
            <a-select-option value="1">限时流量</a-select-option>
            <a-select-option value="2">国家高程液位</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item v-if="activeKey=='1'">
          <a-range-picker class="picker" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" @change="onRangeChange" :value="[moment(startTime, 'YYYY-MM-DD HH:mm'),moment(endTime, 'YYYY-MM-DD HH:mm')]" :bordered="false" />
        </a-form-item>
        <a-form-item v-else>
          <a-range-picker class="picker" format="YYYY-MM-DD" :placeholder="['开始日期', '结束日期']" @change="onDateChange" :value="[moment(startDate, 'YYYY-MM-DD'),moment(endDate, 'YYYY-MM-DD')]" :bordered="false" />
        </a-form-item>
        <a-form-item style="margin-left:10px">
          <a-button type="primary" style="background: #54B749;border-color: #54B749;" @click="getData()">查询</a-button>
          <a-button type="primary" style="margin-left:10px">导出</a-button>
          <a-button type="primary" style="margin-left:10px">原始数据导出</a-button>
        </a-form-item>
      </a-form>
      <a-radio-group v-model="activeKey" class="radio-btns" @change="changeActiveKey">
        <a-radio-button value="1">实时数据</a-radio-button>
        <a-radio-button value="2">统计分析</a-radio-button>
        <a-radio-button value="3">安装详情</a-radio-button>
      </a-radio-group>

      <div class="detail-tab-box">
        <div class="detail-tab-box-item" v-if="activeKey=='1'">
          <p class="detail-tab-box-tit">记录总数(条):<span>{{ listTable.length }}</span></p>
          <a-tabs :value="activeType">
            <a-tab-pane key="1" tab="曲线" force-render>
              <div ref="echart" class="echart"></div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="表格" force-render>
              <a-table class="ant-table-striped detail-table" size="middle" :pagination="{'hideOnSinglePage':true,'pageSize':6}" :columns="columns" :data-source="listTable" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
                <template slot="tm" slot-scope="text">
                  {{ text | moment('YYYY-MM-DD HH:mm') }}
                </template>
              </a-table>
            </a-tab-pane>
          </a-tabs>
        </div>

        <a-tabs :value="activeTjfx" v-if="activeKey=='2'">
          <a-tab-pane key="1" tab="曲线" force-render>
            <div ref="echartTj" class="echart"></div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="表格" force-render>
            <a-table class="ant-table-striped detail-table" size="middle" :pagination="{'hideOnSinglePage':true,'pageSize':6}" :columns="columnsTj" :data-source="listTableTj" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
              <template slot="tm" slot-scope="text">
                {{ text | moment('YYYY-MM-DD') }}
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>

        <a-row class="detail-row" v-if="activeKey=='3'">
          <a-col :span="8">
            <h5>安装信息</h5>
            <div class="inline-flex">
              <span>设备IMEI:</span><span>861854040009092</span>
            </div>
            <div class="inline-flex">
              <span>通讯协议:</span><span>nb-iot</span>
            </div>
            <div class="inline-flex">
              <span>关联窨井:</span><span>XTZWzz2803</span>
            </div>
            <div class="inline-flex">
              <span>井深(m):</span><span>4.78</span>
            </div>
            <div class="inline-flex">
              <span>超声波距离井底高度(m):</span><span>4.33</span>
            </div>
            <div class="inline-flex">
              <span>压力距离井底高度(m):</span><span>3.73</span>
            </div>
          </a-col>
          <a-col :span="8">
            <h5>检测设备</h5>
            <div class="inline-flex">
              <span>地面高程(m):</span><span>3.73</span>
            </div>
            <div class="inline-flex">
              <span>液位预警值(m):</span><span>3.73</span>
            </div>
            <div class="inline-flex">
              <span> 液位报警值(m):</span><span>3.73</span>
            </div>
            <div class="inline-flex">
              <span>水深预警值(m):</span><span>0.73</span>
            </div>
            <div class="inline-flex">
              <span>水深报警值(m):</span><span>3.73</span>
            </div>
          </a-col>
          <a-col :span="8">
            <h5>现场图片</h5>
            <img :src="detailObj.sitePhotos" @click="previewImg(detailObj.sitePhotos)" alt="">
          </a-col>
          <!-- <a-col :span="8">
            <h5>安装图片</h5>
            <img src="@/assets/map/2.jpg" alt="">
          </a-col>
          <a-col :span="8">
            <h5>远景图片</h5>
            <img src="@/assets/map/3.jpg" alt="">
          </a-col> -->
        </a-row>
      </div>
    </div>
    <preview-img ref="previewImg" />
  </div>
</template>
<script>
import moment from 'moment'
import * as echarts from 'echarts'
import { riverRealTimeData, detail, riverStatisticalData } from '@/api/modular/main/pointDetail/pointDetail'
import { getDate, getprvweek } from '@/utils/util'
import previewImg from '@/components/previewImg/previewImg'
export default {
  name: 'LiquidLevelStationDetail',
  components: { previewImg },
  data () {
    return {
      liquidLevelStationDetail: false,
      form: {
        type: '1'
      },
      startTime: '2022-09-15 00:00',
      endTime: '2022-09-15 00:00',
      startDate: '2022-09-08',
      endDate: '2022-09-15',
      timeStr: [],
      id: null,
      detailObj: {},

      activeKey: '1',
      activeType: '1',
      activeTjfx: '1',
      columns: [
        {
          title: '测站编码',
          dataIndex: 'stcd',
          align: 'center'
        }, {
          title: '采集时间',
          dataIndex: 'tm',
          align: 'center',
          scopedSlots: { customRender: 'tm' }
        }, {
          title: '水位',
          dataIndex: 'z',
          align: 'center'
        }
      ],
      columnsTj: [
        {
          title: '采集时间',
          dataIndex: 'tm',
          align: 'center',
          scopedSlots: { customRender: 'tm' }
        }, {
          title: '最大水位',
          dataIndex: 'maxZ',
          align: 'center'
        }, {
          title: '最小水位',
          dataIndex: 'minZ',
          align: 'center'
        },
        {
          title: '平均水位',
          dataIndex: 'avgZ',
          align: 'center'
        }
      ],
      listTable: [],
      listTableTj: []
    }
  },
  methods: {
    moment,
    showLiquidLevelStationDetail (layerId, id) {
      this.startTime = moment(getDate()).format('YYYY-MM-DD') + ' 00:00'
      this.endTime = moment(getDate()).format('YYYY-MM-DD HH:mm')
      this.endDate = moment(getDate()).format('YYYY-MM-DD')
      this.startDate = moment(getprvweek(this.endDate)).format('YYYY-MM-DD')
      if (layerId) {
        this.id = id
        this.liquidLevelStationDetail = true
        this.$nextTick(() => {
          this.getDetail()
          this.initEchart()
        })
      }
    },
    getDetail () {
      detail({ monitorid: this.id }).then((res) => {
        if (res.success) {
          this.detailObj = res.data
        }
      })
    },
    initEchart () {
      const xData = []
      const yData = []
      riverRealTimeData({ monitorid: this.id, searchBeginTime: this.startTime, searchEndTime: this.endTime }).then((res) => {
        if (res.success) {
          this.listTable = res.data
          for (let i = 0; i < res.data.length; i++) {
            xData.push(moment(res.data[i].tm).format('YYYY-MM-DD HH:mm'))
            yData.push(res.data[i].z)
          }
          // 基于准备好的dom，初始化echarts实例
          console.log('初始化echarts----', this.$refs.echart)
          const chart = this.$refs.echart
          console.log('chart', chart)
          if (chart) {
            const myChart = echarts.init(chart)
            // 指定图表的配置项和数据
            const option = {
              grid: {
                top: '10%',
                left: '2%',
                right: '6%',
                bottom: '5%',
                containLabel: true
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  label: {
                    backgroundColor: '#6a7985'
                  }
                }
              },
              xAxis: {
                type: 'category',
                data: xData,
                axisLabel: {
                  textStyle: {
                    fontSize: 14,
                    color: '#fff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  textStyle: {
                    fontSize: 14,
                    color: '#fff'
                  }
                }
              },
              series: [
                {
                  data: yData,
                  type: 'line',
                  smooth: true,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
                    ]
                  }
                  // markLine: {
                  //   data: [
                  //     { type: 'average', name: '平均值' },
                  //     {
                  //       name: 'min line on close',
                  //       type: 'min',
                  //       valueDim: 'close',
                  //       yAxis: 1.3 // 标记线x轴的值
                  //     }
                  //   ]
                  // }
                }
              ]
            }
            myChart.setOption(option)
            window.addEventListener('resize', myChart.resize())
          }
        }
      })
    },
    initEchartTjfx () {
      const xData = []
      const yData = []
      riverStatisticalData({ monitorid: this.id, searchBeginTime: this.startDate, searchEndTime: this.endDate }).then((res) => {
        if (res.success) {
          this.listTableTj = res.data
          for (let i = 0; i < res.data.length; i++) {
            xData.push(moment(res.data[i].tm).format('YYYY-MM-DD'))
            yData.push(res.data[i].avgZ)
          }
          // 基于准备好的dom，初始化echarts实例
          const chart = this.$refs.echartTj
          if (chart) {
            const myChart = echarts.init(chart)
            // 指定图表的配置项和数据
            const option = {
              xAxis: {
                type: 'category',
                data: xData,
                axisLabel: {
                  textStyle: {
                    fontSize: 14,
                    color: '#fff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  textStyle: {
                    fontSize: 14,
                    color: '#fff'
                  }
                }
              },
              series: [
                {
                  data: yData,
                  type: 'line',
                  smooth: true,
                  markPoint: {
                    data: [
                      { type: 'max', name: '最大值' },
                      { type: 'min', name: '最小值' }
                    ]
                  }
                  // markLine: {
                  //   data: [
                  //     { type: 'average', name: '平均值' },
                  //     {
                  //       name: 'min line on close',
                  //       type: 'min',
                  //       valueDim: 'close',
                  //       yAxis: 1.3 // 标记线x轴的值
                  //     }
                  //   ]
                  // }
                }
              ]
            }
            myChart.setOption(option)
            window.addEventListener('resize', myChart.resize())
          }
        }
      })
    },
    // 切换
    changeActiveKey (e) {
      this.activeKey = e.target.value
      console.log('切换到了', this.activeKey)
      this.getData()
    },
    getData () {
      if (this.activeKey === '1') {
        this.initEchart()
      } else if (this.activeKey === '2') {
        this.initEchartTjfx()
      }
    },
    handleTypeChange (e) {
      console.log('e', e)
    },
    onRangeChange (value, dateString) {
      console.log('Selected Time: ', value)
      this.startTime = dateString[0]
      this.endTime = dateString[1]
    },
    onDateChange (value, dateString) {
      console.log('Selected Date: ', value)
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    },
    // 查看图片
    previewImg (e) {
      this.$refs.previewImg.imgUrl = e
      this.$refs.previewImg.show()
    },
    close () {
      this.liquidLevelStationDetail = false
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.initEchart, 20)
  }
}
</script>

<style>
@import './detail.less';
</style>
<style lang="less" scoped>
.devicePanel {
  width: calc(100% - 340px);
  height: 744px;
  border: 1px solid #2a558e;
  background-color: #1e62b2;
  position: absolute;
  right: 18px;
  top: 50px;
  z-index: 999;
  .devicePanel-top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #2a55a0;
    border-bottom: 1px solid #2a558e;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      width: 40%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #4affff;
      padding: 0 15px;
    }
    .text {
      color: #fff;
      span {
        margin-right: 10px;
      }
    }
    .close-btn {
      color: #00dcff;
      font-size: 22px;
      position: absolute;
      top: 4px;
      right: 8px;
      cursor: pointer;
    }
  }
  .devicePanel-bot {
    padding: 0 0 20px;
    .radio-btns {
      width: 100%;
      text-align: center;
      padding: 15px;
    }
    .form-right {
      width: 100%;
      height: 40px;
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      .select {
        width: 100px;
        border: 1px solid #298de7;
      }
      .picker {
        width: 320px;
        border: 1px solid #298de7;
      }
    }
    .detail-tab-box {
      width: 100%;
      padding: 0 10px;
      margin-top: 20px;
      .detail-tab-box-item {
        width: 100%;
        padding: 0 20px;
        .detail-tab-box-tit {
          width: 100%;
          text-align: center;
          color: #fff;
          span {
            font-weight: bold;
            display: inline-block;
            margin: 0 10px;
          }
        }
      }
    }
    .echart {
      width: 100%;
      height: 400px;
      margin: 0 auto;
    }
    .detail-row {
      width: 100%;
      text-align: center;
      h5 {
        width: 100%;
        color: #fff;
        font-size: 15px;
        text-align: center;
      }
      .inline-flex {
        padding: 0 10px;
        height: 30px;
        border-bottom: 1px solid #eee;
        span {
          width: 50%;
          color: #fff;
          font-size: 14px;
          display: inline-block;
        }
        & span:nth-child(1) {
          text-align: right;
        }
        & span:nth-child(2) {
          font-weight: bold;
          text-align: center;
        }
      }
      img {
        width: auto;
        max-width: 80%;
        max-height: 200px;
        display: inline-block;
        margin: 0 auto;
      }
    }
  }
}
</style>
