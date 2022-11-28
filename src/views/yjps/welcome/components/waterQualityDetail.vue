<template>
  <div class="waterQuality-content devicePanel" v-if="waterQualityDetail">
    <div class="devicePanel-top">
      <h4>延吉D800污水管</h4>
      <a-form layout="inline" :model="form" class="form-right">
        <a-form-item>
          <a-range-picker class="picker" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" @change="onRangeChange" @ok="onRangeOk" :value="form.time" />
        </a-form-item>
        <a-form-item style="margin-left:10px">
          <a-button type="primary" style="background: #54B749;border-color: #54B749;">查询</a-button>
          <a-button type="primary" style="margin:0px 40px 0 10px">导出</a-button>
          <a-icon type="close-circle" theme="outlined" class="close-btn" @click="waterQualityDetail = false" />
        </a-form-item>
      </a-form>
    </div>
    <div class="devicePanel-bot">
      <a-table class="ant-table-striped detail-table" size="middle" :pagination="false" :columns="columns" :data-source="tableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
      <!-- <div class="inline-flex-box">
        <div ref="echart" class="echart" id="echart">echart</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'WaterQualityDetail',
  data () {
    return {
      waterQualityDetail: false,
      form: {
        type: '1',
        time: []
      },
      activeKey: '1',
      activeType: '1',
      activeTjfx: '1',

      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          align: 'center',
          width: 60
        },
        {
          title: '时间',
          dataIndex: 'time',
          align: 'center'
        }, {
          title: 'COD浓度',
          dataIndex: 'num',
          align: 'center'
        }, {
          title: '氨氮浓度',
          dataIndex: 'num1',
          align: 'center'
        }
      ],
      tableData: [
        {
          key: '1',
          num: 33.2,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 10:50'
        },
        {
          key: '2',
          num: 4.52,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:00'
        },
        {
          key: '3',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:10'
        }, {
          key: '4',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:20'
        }, {
          key: '5',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:30'
        }, {
          key: '6',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:40'
        }, {
          key: '7',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 11:50'
        }, {
          key: '8',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 12:00'
        }, {
          key: '9',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 12:10'
        }, {
          key: '10',
          num: 32.7,
          num1: 33.2,
          name: '分析点1',
          time: '2022-09-15 12:20'
        }]
    }
  },
  methods: {
    showWaterQualityDetail (id) {
      if (id) {
        this.waterQualityDetail = true
        this.$nextTick(() => {
          this.initEchart()
          this.initEchartTjfx()
        })
      }
    },
    hideWaterQualityDetail () {
      this.waterQualityDetail = false
    },
    initEchart () {
      // 基于准备好的dom，初始化echarts实例
      console.log('初始化echarts----', this.$refs.echart)
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
            top: '4%',
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
                show: true,
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
              splitLine: {
                show: false // 去掉网格线
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#fff'
                }
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
    initEchartTjfx () {
      // 基于准备好的dom，初始化echarts实例
      const chart = this.$refs.echart1
      if (chart) {
        const myChart = echarts.init(chart)
        // 指定图表的配置项和数据
        const option = {
          xAxis: {
            type: 'category',
            data: ['2022-04-20 10:50', '2022-04-20 11:50', '2022-04-20 12:50', '2022-04-20 13:50', '2022-04-20 14:50', '2022-04-20 15:50', '2022-04-20 16:50'],
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
              data: [-0.5, -0.3, -0.1, -0.6, -0.2, 0, -1],
              type: 'line',
              smooth: true,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' },
                  {
                    name: 'min line on close',
                    type: 'min',
                    valueDim: 'close',
                    yAxis: 1.3 // 标记线x轴的值
                  }
                ]
              }
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
<style>
@import './detail.less';
</style>
<style lang="less" scoped>
.waterQuality-content {
  width: calc(100% - 500px);
  height: auto;
  max-height: calc(100% - 100px);
  background: radial-gradient(closest-side at 90% 164px, rgba(11, 41, 78, 0.2) 21%, rgba(0, 107, 200, 0.9) 90%);
  border: 1px solid #0572d1;
  position: absolute;
  top: 50px;
  left: 15px;
  z-index: 9999;
  .devicePanel-top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #0572d1;
    background: rgba(0, 95, 178, 0.5);
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
      top: -2px;
      right: -4px;
      cursor: pointer;
    }
  }
  .devicePanel-bot {
    background-color: rgba(0, 83, 155, 0.96);
    padding: 20px;
    .water-table {
      padding: 10px;
    }
    .inline-flex-box {
      width: 100%;
      height: 300px;
      padding: 20px;
      .echart {
        width: 100%;
        height: 260px;
        margin: 0 auto;
      }
    }
  }
}
</style>
