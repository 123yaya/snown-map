<template>
  <div class="devicePanel" v-if="waterQualityView">
    <div class="devicePanel-top">
      <h4>延吉D800污水管</h4>
      <a-form layout="inline" :model="form" class="form-right">
        <a-form-item>
          <a-range-picker class="picker" :show-time="{format: 'YYYY-MM-DD HH:mm' }" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" @change="onRangeChange" @ok="onRangeOk" v-model="form.time" :bordered="false" />
        </a-form-item>
        <a-form-item>
        <!--          <a-select class="select" :value="form.type" @change="handleTypeChange">-->
        <!--            <a-select-option value="1">限时流量</a-select-option>-->
        <!--            <a-select-option value="2">国家高程液位</a-select-option>-->
        <!--          </a-select>-->
        </a-form-item>
        <a-form-item style="margin-left:10px">
          <a-button type="primary" style="background: #54B749;border-color: #54B749;">查询</a-button>
          <a-button type="primary" style="margin-left:10px">重置</a-button>
          <!--          <a-button type="primary" style="margin-left:10px">新增</a-button>-->
          <a-button type="primary" style="margin:0px 40px 0 10px">叠加分析</a-button>
          <a-icon type="close-circle" theme="outlined" class="close-btn" @click="waterQualityView = false" />
        </a-form-item>
      </a-form>
    </div>
    <div class="inline-flex-box">
      <div ref="echart" class="echart" id="echart">echart</div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'WaterQualityView',
  data () {
    return {
      waterQualityView: false,
      form: {
        type: '1',
        time: []
      }
    }
  },
  methods: {
    showWaterQualityView (id) {
      if (id) {
        this.waterQualityView = true
        this.$nextTick(() => {
          this.initEchart()
        })
      }
    },
    initEchart () {
      // 基于准备好的dom，初始化echarts实例

      const chart = this.$refs.echart
      console.log('chart', chart)
      if (chart) {
        const myChart = echarts.init(chart)
        // 指定图表的配置项和数据
        const option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['COD浓度', '氨氮'],
            left: 'center',
            top: '3%',
            textStyle: { // 图例文字的样式
              color: '#ccc',
              fontSize: 12
            }
          },
          toolbox: {
            feature: {
              saveAsImage: { show: true }
            },
            iconStyle: {
              normal: {
                color: '#4affff' // 设置颜色
              }
            }
          },
          xAxis: [
            {
              type: 'category',
              data: ['22-05-13 10:00', '22-05-13 11:00', '22-05-13 12:00', '22-05-13 13:00', '22-05-13 14:00'],
              axisPointer: {
                type: 'shadow'
              },
              splitLine: {
                show: false // 去掉网格线
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#fff'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'COD浓度(mg/l)',
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#fff'
                }
              },
              splitLine: {
                show: false // 去掉网格线
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '氨氮(mg/l)',
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#fff'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'COD浓度',
              type: 'bar',
              barWidth: 40,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' (mg/l)'
                }
              },
              itemStyle: {
                normal: {
                  // 这里是重点
                  color: '#4affff'
                }
              },
              data: [2.0, 4.9, 7.0, 23.2, 25.6]
            },
            {
              name: '氨氮',
              type: 'line',
              yAxisIndex: 1,
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' (mg/l)'
                }
              },
              itemStyle: {
                normal: {
                  // 这里是重点
                  color: '#4affff'
                }
              },
              data: [2.0, 2.2, 3.3, 4.5, 6.3]
            }
          ]
        }
        myChart.setOption(option)
        window.addEventListener('resize', myChart.resize())
      }
    },
    handleTypeChange (e) {
      console.log('e', e)
    },
    onRangeChange (value, dateString) {
      console.log('Selected Time: ', value)
      this.time = value
      console.log('Formatted Selected Time: ', dateString)
    },
    onRangeOk (value) {
      console.log('onOk: ', value)
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
  background: radial-gradient(closest-side at 59% 74%, rgba(11, 41, 78, 0.92) 13%, #2a55a0 89%);
  position: absolute;
  left: 360px;
  bottom: 5px;
  z-index: 5;
  .devicePanel-top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: transparent;
    border-bottom: 1px solid #2a558e;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      width: 28%;
      height: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #4ab1ff;
      padding: 0 15px;
    }
    .form-right {
      width: 72%;
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
    height: 240px;
    background-color: rgba(21, 50, 84, 0.7);
    .echart {
      width: 100%;
      height: 240px;
    }
  }
}
</style>
