<template>
  <div class="wrapperBox">
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="统计区域">
                <a-select style="width: 100%">
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="">
                <a-select mode="multiple" :default-value="['延吉']" style="width: 100%" placeholder="请选择" @change="handleChange" v-model="queryParam.place">
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
        <div class="topAreaBox">
          <div class="topAreaLeft">
            <img class="areaImg" src="https://zhps.zc.gov.cn/xtps-web/adb1d177f7288039d46bf4fecca8f45a.png" alt="">
            <div class="areaName">
              延吉
            </div>
            <div class="updateTime">
              更新时间 {{ nowDate }}
            </div>
          </div>
          <div class="topAreaRight">
            <div class="dataWrapper" v-for="(item, index) in topAreaData" :key="index">
              <img class="dataNumIcon" :src="item.img" alt="">
              <div class="dataInfo">
                <div class="dataInfoName">{{ item.dataInfoName }}</div>
                <div class="dataInfoNum">{{ item.dataInfoNum }}</div>
                <div class="mounthInfo">
                  本月环比 <span style="color: #E49900;">{{ item.mounthInfo }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-card>
    <div class="echartWrapper">
      <div class="echartBox">
        <a-collapse default-active-key="1" expand-icon-position="right">
          <a-collapse-panel key="1">
            <div class="collTitleBox" slot="header">
              <div class="collTitle">排水管道</div>
            </div>
            <div class="collInnerBox">
              <div class="collInnerLeftBox" id="myChartOne">
              </div>
              <div class="collInnerRightBox">
                <div class="chartContent totalPipe">
                  <span>排水管总长</span>
                  <span>890km</span>
                </div>
                <div class="chartContent rainPipe">
                  <span>雨水管</span>
                  <span>400km</span>
                </div>
                <div class="chartContent dirtyPipe">
                  <span>污水管</span>
                  <span>257km</span>
                </div>
                <div class="chartContent mixinPipe">
                  <span>雨污合流管</span>
                  <span>233km</span>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div class="echartBox">
        <a-collapse default-active-key="1" expand-icon-position="right">
          <a-collapse-panel key="1">
            <div class="collTitleBox" slot="header">
              <div class="collTitle">排水沟</div>
            </div>
            <div class="collInnerBox">
              <div class="collInnerLeftBox" id="myChartTwo">
              </div>
              <div class="collInnerRightBox">
                <div class="chartContent totalPipe">
                  <span>沟渠总长</span>
                  <span>3.62km</span>
                </div>
                <div class="chartContent rainPipe">
                  <span>雨水沟</span>
                  <span>2.99km</span>
                </div>
                <div class="chartContent dirtyPipe">
                  <span>污水沟</span>
                  <span>0.05km</span>
                </div>
                <div class="chartContent mixinPipe">
                  <span>雨污合流沟</span>
                  <span>0.58km</span>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div class="echartBox">
        <a-collapse default-active-key="1" expand-icon-position="right">
          <a-collapse-panel key="1">
            <div class="collTitleBox" slot="header">
              <div class="collTitle">综合统计</div>
            </div>
            <div class="collInnerBox">
              <div class="collInnerLeftBox" style="padding: 20px;box-sizing: border-box" id="myChartThree">
              </div>
              <div class="collInnerRightBox">
                <div class="chartContent zhtj">
                  <span>雨水管渠占比</span>
                  <span>44.94%</span>
                </div>
                <div class="chartContent zhtj">
                  <span>污水管渠占比</span>
                  <span>28.87%</span>
                </div>
                <div class="chartContent zhtj">
                  <span>雨污合流占比</span>
                  <span>26.19%</span>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
    <a-table :columns="columnThree" :data-source="dataSource" :scroll="{ y: 500 }">
    </a-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数
      queryParam: {},
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      nowDate: '',
      treatmentMethodData: [],
      topAreaData: [
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/c87505048fd440f70a3641a55dd9ef3c.png',
          dataInfoName: '管渠总长（km）',
          dataInfoNum: '890',
          mounthInfo: '-0'
        },
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/84ca1fcddf441d407f2bb96a5bb9de2c.png',
          dataInfoName: '雨水管渠长度（km）',
          dataInfoNum: '400',
          mounthInfo: '-0'
        },
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/5f3813223eccf3061a9d5740fa4fb3f3.png',
          dataInfoName: '污水管渠长度（km）',
          dataInfoNum: '257',
          mounthInfo: '-0'
        },
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/b0ca64c37b681b900f670ce980163f73.png',
          dataInfoName: '雨污合流管渠长度（km）',
          dataInfoNum: '233',
          mounthInfo: '-0'
        },
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/b4dc988635c00213036ee818a1b045dd.png',
          dataInfoName: '雨水口个数',
          dataInfoNum: '0',
          mounthInfo: '-0'
        },
        {
          img: 'https://zhps.zc.gov.cn/xtps-web/29f6ae7239a8fa45b0c05f1bfcbe56dc.png',
          dataInfoName: '窨井个数',
          dataInfoNum: '0',
          mounthInfo: '-0'
        }
      ],
      activeKey: ['1'],
      columnThree: [
        {
          title: '统计区域',
          dataIndex: 'tjArea',
          key: 'tjArea',
          width: 120,
          align: 'center'
        },
        {
          title: '管网数量（km）',
          align: 'center',
          children: [
            {
              title: '雨水管网',
              dataIndex: 'ysgw',
              key: 'ysgw',
              align: 'center',
              width: 120
            },
            {
              title: '污水管网',
              dataIndex: 'wsgw',
              key: 'wsgw',
              align: 'center',
              width: 120
            },
            {
              title: '合流管网',
              dataIndex: 'hlgw',
              key: 'hlgw',
              align: 'center',
              width: 120
            }
          ]
        },
        {
          title: '窨井（个）',
          align: 'center',
          children: [
            {
              title: '雨水窨井',
              dataIndex: 'ysjj',
              key: 'ysjj',
              align: 'center',
              width: 120
            },
            {
              title: '污水窨井',
              dataIndex: 'wsjj',
              key: 'wsjj',
              align: 'center',
              width: 120
            },
            {
              title: '合流窨井',
              dataIndex: 'hljj',
              key: 'hljj',
              align: 'center',
              width: 120
            }
          ]
        },
        {
          title: '污水处理厂（座）',
          dataIndex: 'wsclc',
          key: 'wsclc',
          width: 120,
          align: 'center'
        },
        {
          title: '雨污泵站（个）',
          dataIndex: 'ywbz',
          key: 'ywbz',
          width: 120,
          align: 'center'
        },
        {
          title: '闸门（个）',
          dataIndex: 'zm',
          key: 'zm',
          width: 120,
          align: 'center'
        },
        {
          title: '雨水篦子（个）',
          dataIndex: 'ysyz',
          key: 'ysyz',
          width: 120,
          align: 'center'
        }
      ],
      dataSource: [
        {
          tjArea: '延吉',
          ysgw: '890',
          wsgw: '257',
          hlgw: '233',
          ysjj: '6291',
          wsjj: '3071',
          hljj: '3008',
          wsclc: '2',
          ywbz: '4',
          zm: '0',
          ysyz: '7498'
        }
      ]
    }
  },
  watch: {
    activeKey (key) {
      console.log(key)
    }
  },
  mounted () {
    this.drawLine()
    this.drawLineTwo()
    this.drawLineThree()

    this.nowDate = new Date().toLocaleDateString().split('/').map(item => {
      if (item < 10) {
        return '0' + item
      } else {
        return item
      }
    }).join('/')
  },
  methods: {
    drawLine () {
      // 基于dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChartOne'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            tooltip: {
              valueFormatter: function (value) {
                return (
                  value + ' 公里' + '(' + (value / 725).toFixed(4) * 100 + '%' + ')'
                )
              }
            },
            data: [
              { value: 257, name: '污水管' },
              { value: 233, name: '雨污合流管' },
              { value: 400, name: '雨水管' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    },
    drawLineTwo () {
      // 基于dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChartTwo'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            tooltip: {
              valueFormatter: function (value) {
                return (
                  value + ' 公里' + '(' + (value / 3.62).toFixed(4) * 100 + '%' + ')'
                )
              }
            },
            data: [
              { value: 0.05, name: '污水沟' },
              { value: 0.58, name: '雨污合流沟' },
              { value: 2.99, name: '雨水沟' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    },
    drawLineThree () {
      // 基于dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChartThree'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        radar: {
          indicator: [
            { name: '雨污合流管', max: 6500 },
            { name: '雨水管', max: 16000 },
            { name: '雨水沟', max: 30000 },
            { name: '雨污合流沟', max: 38000 },
            { name: '污水沟', max: 52000 },
            { name: '污水管', max: 25000 }
          ],
          splitArea: {
            areaStyle: {
              color: ['#153254', '#325c92'],
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '综合分析(单位:公里)',
                lineStyle: {
                  color: 'red'
                }
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>

<style scoped>
.wrapperBox {
  height: 100%;
  overflow: auto;
}
.topAreaBox {
  width: 100%;
  display: flex;
}
.topAreaLeft {
  padding: 19px 8px 8px 8px;
  width: 270px;
  height: 216px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.areaImg {
  width: 138px;
  height: 40px;
}
.areaName {
  font-size: 40px;
  /*color: #ffffff;*/
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 25px;
}
.updateTime {
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  /*color: #ffffff;*/
  text-align: center;
  /*border: 1px solid #3c99ec;*/
  /*background: #2092f5;*/
}
.topAreaRight {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.dataWrapper {
  width: 22.285%;
  display: flex;
  align-items: center;
  margin: 0 10px;
}
.dataNumIcon {
  margin-left: 10px;
}
.dataInfo {
  margin-left: 10px;
}
.dataInfoName {
  /*color: #95caff;*/
  font-size: 12px;
}
.dataInfoNum {
  font-size: 30px;
  /*color: #4affff;*/
}
.mounthInfo {
  margin-right: 5px;
  /*color: #95caff;*/
}
.echartWrapper {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.echartBox {
  width: 33%;
}
.collTitleBox {
  display: flex;
  align-items: center;
}
.collTitle {
  flex: 1;
  text-align: center;
  /*color: #4affff;*/
  font-size: 16px;
  font-weight: bold;
}
.collInnerBox {
  width: 100%;
  height: 268px;
  display: flex;
}
.collInnerLeftBox {
  width: 60%;
  height: 100%;
}
.collInnerRightBox {
  margin-left: 5%;
  width: 35%;
  height: 100%;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chartContent {
  height: 22%;
  background-color: #fafafa;
  border-bottom: 2px solid #006bcb;
}
.chartContent > span {
  font-size: 1em;
}
.chartContent > span {
  display: block;
  font-size: 13px;
  height: 50%;
  text-indent: 20px;
}
.chartContent > span:last-child {
  font-size: 15px;
  font-weight: bold;
  /*color: #4affff;*/
}
.chartContent > span:before {
  color: black;
  display: block;
  width: 5.66px !important;
  height: 100%;
  content: '';
  float: left;
}
.zhtj > span:before {
  background-color: #47aaff;
}
.totalPipe > span:before {
  background-color: #47aaff;
}
/*.totalPipe:hover {*/
/*  background-color: #47aaff;*/
/*}*/
.rainPipe > span:before {
  background-color: #1defff !important;
}
/*.rainPipe:hover {*/
/*  background-color: #1defff;*/
/*}*/
.dirtyPipe > span:before {
  background-color: #fc72a3 !important;
}
/*.dirtyPipe:hover {*/
/*  background-color: #fc72a3;*/
/*}*/
.mixinPipe > span:before {
  background-color: #ffd344;
}
/*.mixinPipe:hover {*/
/*  background-color: #ffd344;*/
/*}*/
.ant-collapse-content-box {
  padding: 0 !important;
}
.ant-collapse-content {
  overflow: visible;
}
</style>
