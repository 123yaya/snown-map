<template>
  <div class="devicePanel" v-if="liquidLevelStation">
    <div class="devicePanel-top">
      <h4>{{ detailObj.name }}</h4>
      <a-form layout="inline" :model="form" class="form-right">
        <!-- <a-form-item>
          <a-select class="select" :value="form.type" @change="handleTypeChange">
            <a-select-option value="1">限时流量</a-select-option>
            <a-select-option value="2">国家高程液位</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item>
          <a-range-picker class="picker" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" @change="onRangeChange" :value="[moment(startTime, 'YYYY-MM-DD HH:mm'),moment(endTime, 'YYYY-MM-DD HH:mm')]" :bordered="false" />
        </a-form-item>
        <a-form-item style="margin-left:10px">
          <a-button type="primary" style="background: #54B749;border-color: #54B749;" @click="initEchart()">查询</a-button>
          <a-button type="primary" style="margin:0px 40px 0 10px" @click="form.time=null;timeStr=[];initEchart()">重置</a-button>
          <a-icon type="close-circle" theme="outlined" class="close-btn" @click="close()" />
        </a-form-item>
      </a-form>
    </div>
    <div class="inline-flex-box">
      <div class="inline-flex-left">
        <div class="detail-box">
          <p><span>测站编码</span><span>{{ detailObj.monitorid }}</span></p>
          <p><span>监测设备名称</span><span>{{ detailObj.deviceName }}</span></p>
          <p><span>监测设备型号</span><span>{{ detailObj.deviceModel||'--' }}</span></p>
          <p><span>监测点地址</span><span>{{ detailObj.addr }}</span></p>
          <p><span>坐标x</span><span>{{ detailObj.xcoor }}</span></p>
          <p><span>坐标y</span><span>{{ detailObj.ycoor }}</span></p>
        </div>
      </div>
      <div class="inline-flex-right">
        <div ref="echart" class="echart" id="echart"></div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import * as echarts from 'echarts'
import { riverRealTimeData, detail } from '@/api/modular/main/pointDetail/pointDetail'
import { getDate } from '@/utils/util'

export default {
  name: 'LiquidLevelStation',
  data () {
    return {
      liquidLevelStation: false,
      form: {
        type: '1'
      },
      startTime: '2022-09-15 00:00',
      endTime: '2022-09-15 00:00',
      timeStr: [],
      id: null,
      detailObj: {}
    }
  },
  methods: {
    moment,
    showLiquidLevelStation (layerId, id) {
      this.startTime = moment(getDate()).format('YYYY-MM-DD') + ' 00:00'
      this.endTime = moment(getDate()).format('YYYY-MM-DD HH:mm')
      if (layerId) {
        this.id = id
        this.liquidLevelStation = true
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
      // 基于准备好的dom，初始化echarts实例
      const xData = []
      const yData = []
      riverRealTimeData({ monitorid: this.id, searchBeginTime: this.startTime, searchEndTime: this.endTime }).then((res) => {
        if (res.success) {
          for (let i = 0; i < res.data.length; i++) {
            xData.push(moment(res.data[i].tm).format('YYYY-MM-DD HH:mm'))
            yData.push(res.data[i].z)
          }
          console.log(xData, yData)
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
                axisPointer: {
                  type: 'shadow'
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#fff'
                  }
                }
              },
              yAxis: {
                type: 'value',
                axisPointer: {
                  type: 'shadow'
                },
                axisLine: {
                  show: true,
                  lineStyle: {
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
    handleTypeChange (e) {
      console.log('e', e)
    },
    onRangeChange (value, dateString) {
      console.log('Selected Time: ', value)
      this.startTime = dateString[0]
      this.endTime = dateString[1]
    },
    close () {
      this.liquidLevelStation = false
    }
  },

  destroyed () {
    window.removeEventListener('resize', this.initEchart, 20)
  }
}
</script>

<style >
.devicePanel span.ant-calendar-picker-input.ant-input {
  background-color: transparent;
  color: #fff;
}
</style>
<style lang="less" scoped>
.devicePanel {
  width: calc(100% - 400px);
  border: 1px solid #2a558e;
  background-color: #1e62b2;
  position: absolute;
  left: 360px;
  bottom: 5px;
  z-index: 5;
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
      width: 30%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #4ab1ff;
      padding: 0 15px;
      font-weight: bold;
    }
    .form-right {
      width: 70%;
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
      .close-btn {
        color: #00dcff;
        font-size: 24px;
        position: absolute;
        top: -2px;
        right: -2px;
        cursor: pointer;
      }
    }
  }
  .inline-flex-box {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    .inline-flex-left {
      width: 25%;
      .inline-flex {
        width: 100%;
        padding: 10px;
        display: inline-flex;
        justify-content: space-between;
        div {
          width: 50%;
          text-align: center;
          h4 {
            color: #4ab1ff;
            font-size: 17px;
            font-weight: bold;
          }
          p {
            padding: 0;
            color: #fff;
            margin: 0;
          }
        }
      }
      .detail-box {
        width: 100%;
        padding: 10px 20px;
        p {
          width: 100%;
          height: 18px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          & span:nth-child(1) {
            width: 40%;
          }
          & span:nth-child(2) {
            width: 60%;
            color: #eee;
            text-align: left;
          }
        }
      }
    }
    .inline-flex-right {
      width: 75%;
      height: 200px;
      color: #fff;
      .echart {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>
