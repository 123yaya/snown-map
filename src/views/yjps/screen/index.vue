<template>
  <!-- 主页面 -->
  <div class="screen-container">
    <a-icon type="close-circle" theme="outlined" style="color:red;fontSize:24px;" class="backButton" @click="pre" />
    <div class="top-line"></div>
    <div class="left">
      <div class="left-box">
        <!-- 基础信息统计 -->
        <div class="headline small-tit">延吉市基础信息统计</div>
        <div class="basic-list">
          <div v-for="basic in basicData" :key="basic.id" class="basic-list-item">
            <p>{{ basic.name }}</p>
            <h5>{{ basic.value }}</h5>
            <div class="basic-list-right">{{ basic.unit }}</div>
          </div>
        </div>
      </div>
      <div class="left-box">
        <div class="headline small-tit">流量监测点实时监测</div>
        <div class="update-time">
          <div class="left-time">更新时间</div>
          <div class="right-time">{{ nowTime }}</div>>
        </div>
        <a-table class="my-table" :columns="szjcdColumns" :data-source="bzjcdData1" :rowKey="record => record.id" :pagination="{'hideOnSinglePage':true,'pageSize':10}" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        </a-table>
      </div>
      <div class="left-box">
        <div class="headline small-tit">水位监测点实时监测</div>
        <div class="status-box">
          <div class="status-num" v-for="status in statusList" :key="status.id">
            <p class="num">{{ status.num }}</p>
            <p>{{ status.name }}</p>
          </div>
        </div>
        <div style="width: 350px; height: 250px; margin: 0 auto;" id="myChartOne"></div>
      </div>
    </div>
    <div class="center">
      <div class="title">
        <div class="title-left">
          <div class="date">{{ nowDate }}</div>
          <div class="week">{{ nowWeek }}</div>
        </div>
        <div class="title-middle"><img src="@/assets/left.png" alt="" class="qx-l">
          <div class="qx-m">
            <div class="headline"><span style="font-size: 1.3vw;">城市数字化综合信息管理平台</span></div>
          </div> <img src="@/assets/right.png" alt="" class="qx-r">
        </div>
        <div class="title-right">
          <img src="@/assets/icon-weather-overcast.png" alt="">
          <div class="date">10<span class="degree">℃</span></div>
          <div class="week">阴</div>
        </div>
      </div>
      <div id="map" class="map">
        <!-- 是否开启监测视图 -->
        <div class="infoExhibition">
          <div class="radioControl">
            <div class="list-row">
              <div class="list-row-item">
                <div>污水厂监测视图</div>
                <div>
                  <a-switch :value="checkedWsc" class="my-switch" />
                </div>
              </div>
              <div class="list-row-item">
                <div>闸站监测视图</div>
                <div>
                  <a-switch :value="checkedZz" class="my-switch" />
                </div>
              </div>
              <div class="list-row-item">
                <div>泵站监测视图</div>
                <div>
                  <a-switch :value="checkedBz" class="my-switch" />
                </div>
              </div>
              <div class="list-row-item">
                <div>水深状态</div>
                <div class="my-checkbox">
                  <a-checkbox-group :value="chooseSewage" name="checkboxgroup" :options="sewageOptions" />
                </div>
              </div>

            </div>
            <!-- 本日累积雨量 -->
            <div class="rainBody">
              <div class="unit" @click="showWaterConsumption=!showWaterConsumption">
                本日累积雨量
                <i style="font-size: 0.92vw;" v-if="showWaterConsumption" class="iconfont icon-xiangxiajiantou"></i>
                <i style="font-size: 0.92vw;" v-if="!showWaterConsumption" class="iconfont icon-xiangshangjiantou"></i>
              </div>
              <!-- 累计降雨量 -->
              <div class="waterConsumption" v-if="showWaterConsumption==true">
                <div class="update-time">
                  <div class="left-time">更新时间</div>
                  <div class="right-time">{{ nowTime }}</div>
                </div>
                <div class="list-row">
                  <div class="list-row-item">
                    <div class="name">延北路水岸帝景小区渠道旁雨量计</div>
                    <div class="green">
                      0mm
                    </div>
                  </div>
                  <div class="list-row-item">
                    <div class="name">城建局旁公园雨量计</div>
                    <div class="green">
                      0mm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-box">
        <div class="headline small-tit">泵站监测点实时监控</div>
        <div class="update-time">
          <div class="left-time">更新时间</div>
          <div class="right-time">{{ nowTime }}</div>
        </div>
        <a-table class="my-table" :columns="bzjcdColumns" :data-source="bzjcdData" :rowKey="record => record.id" :pagination="{'hideOnSinglePage':true,'pageSize':10}" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        </a-table>
      </div>
      <div class="right-box">
        <div class="headline small-tit">液位水位实时监测</div>
        <div class="update-time">
          <div class="left-time">更新时间</div>
          <div class="right-time">{{ nowTime }}</div>
        </div>
        <!--        <a-date-picker placeholder="请选择日期" @change="onChange" v-decorator="['sewageTime']" :disabled-date="disabledEndDate" class="time"></a-date-picker>-->
        <a-table class="my-table" :columns="sewageColumns" :data-source="sewageData" :rowKey="record => record.id" :pagination="{'hideOnSinglePage':true,'pageSize':10}" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        </a-table>
      </div>
      <div class="right-box">
        <div class="headline small-tit">雨水汇水分区</div>
        <div class="update-time">
          <div class="left-time">更新时间</div>
          <div class="right-time">{{ nowTime }}</div>
        </div>
        <a-table class="my-table" :columns="zzmcColumns" :data-source="zzmcData" :rowKey="record => record.id" :pagination="{'hideOnSinglePage':true,'pageSize':10}" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import * as esriLoader from 'esri-loader'
import { ServiceUrl } from '@/assets/arcgis/ArcGisServe.js'
export default {
  name: 'Screen',
  components: {
  },
  data () {
    return {
      map: {}, // map
      baseMapLayers: {
        vec: null, // 矢量底图
        cva: null, // 矢量注记
        img: null, // 影像底图
        cia: null, // 影像注记
        ter: null, // 地形晕渲
        cta: null // 地形注记
      },
      mapView: null, // view
      zoom: null, // 放大缩小
      nowDate: '', // 当前日期
      nowTime: '', // 当前时间
      nowWeek: '', // 当前星期
      positionCenter: [129.509089271, 42.891117162],
      chooseSewage: [], // 污水厂监测视图
      checkedWsc: false,
      checkedZz: false,
      checkedBz: false,
      showWaterConsumption: false,
      sewageOptions: [
        { label: '离线', value: '1' },
        { label: '低水位', value: '2' },
        { label: '满管', value: '3' }
      ],
      statusList: [
        { id: 1, name: '离线', num: 0 },
        { id: 2, name: '预警', num: 0 },
        { id: 3, name: '报警', num: 0 },
        { id: 4, name: '正常', num: 17 }
      ],
      basicData: [{ // 基本信息
        id: 1,
        name: '总汇水面积',
        value: 36.95,
        unit: 'k㎡'
      }, {
        id: 2,
        name: '已接收管渠总长',
        value: 890,
        unit: 'km'
      }, {
        id: 3,
        name: '雨水泵站',
        value: 4,
        unit: '个'
      }, {
        id: 4,
        name: '城镇污水处理厂',
        value: 2,
        unit: '座'
      }],
      sewageTimeString: [], // 污水时间
      sewageColumns: [{ // 水质考核点情况
        title: '名称',
        dataIndex: 'jcd',
        ellipsis: true,
        class: 'nameColor'
      }, {
        title: '水位',
        dataIndex: 'cod',
        children: [{
          title: '(m)',
          dataIndex: 'cod'
        }]
      }],
      sewageNowColumns: [{ // 污水厂实时监控
        title: '污水厂',
        dataIndex: 'wsc',
        width: 100,
        ellipsis: true,
        class: 'nameColor'
      },
      {
        title: '日处理量',
        dataIndex: 'jcd'
      }, {
        title: '瞬时流量',
        dataIndex: 'ssll',
        children: [{
          title: '(m³/h)',
          dataIndex: 'ssll'
        }]
      }, {
        title: 'COD',
        dataIndex: 'cod',
        children: [{
          title: '(mg/L)',
          dataIndex: 'cod'
        }]
      }, {
        title: '氨氮',
        dataIndex: 'ad',
        children: [{
          title: '(mg/L)',
          dataIndex: 'ad'
        }]
      }],
      sewageData: [
        {
          id: 1,
          cod: 0,
          jcd: '前进路与河南街交叉西南角监测点'
        },
        {
          id: 2,
          cod: 0,
          jcd: '天池路与丛柳街交叉口西南角'
        },
        {
          id: 3,
          cod: 0,
          jcd: '长白山森工南门监测点'
        },
        {
          id: 4,
          cod: 0,
          jcd: '天池路与站前街交叉口西南角监测点'
        }, {
          id: 5,
          cod: 0,
          jcd: '庆贺胡同与平安胡同交叉口监测点'
        }, {
          id: 6,
          cod: 0,
          jcd: '参花街与新华街交叉口监测点'
        }, {
          id: 7,
          cod: 0,
          jcd: '河南街与公铁立交桥交叉监测点'
        }, {
          id: 8,
          cod: 0,
          jcd: '天池路与昌盛街交叉口西北角监测点'
        }, {
          id: 9,
          cod: 0,
          jcd: '沿河路与河南街交叉东侧'
        }
      ],
      bzjcdColumns: [{ // 泵站监测点
        title: '泵站名称',
        dataIndex: 'name',
        ellipsis: true,
        class: 'nameColor'
      },
      {
        title: '排水能力(m³/h)',
        dataIndex: 'yw'
      }],
      szjcdColumns: [ // 水质点实时监测
        {
          title: '监测点',
          dataIndex: 'jcd',
          ellipsis: true,
          class: 'nameColor'
        }, {
          title: '流量',
          dataIndex: 'ad',
          children: [{
            title: '(m³/h)',
            dataIndex: 'ad'
          }]
        }
      ],
      bzjcdData: [{
        id: 1,
        name: '局子街泵站',
        yw: 3150
      }, {
        id: 2,
        name: '局子桥泵站',
        yw: 20000
      }, {
        id: 3,
        name: '延西桥泵站',
        yw: 3600
      }, {
        id: 4,
        name: '公铁立交桥泵站',
        yw: 1400
      }],
      bzjcdData1: [{
        id: 1,
        ad: 0,
        cod: 1,
        jcd: '远达小区监测点'
      }, {
        id: 2,
        ad: 0,
        csod: 1,
        jcd: '东叶胡同雨水排口监测点'
      }, {
        id: 3,
        ad: 0,
        cod: 1,
        jcd: '延北路水岸帝景小区渠道旁'
      }, {
        id: 4,
        ad: 0,
        cod: 1,
        jcd: '布尔哈通河-雨水排口渠道'
      }, {
        id: 5,
        ad: 0,
        cod: 1,
        jcd: '布尔哈通河-雨水排口渠道'
      }, {
        id: 6,
        ad: 0,
        cod: 1,
        jcd: '布尔哈通河-雨水排口渠道'
      }, {
        id: 7,
        ad: 0,
        cod: 1,
        jcd: '二期进水口'
      }],
      zzmcColumns: [{
        title: '分区名称',
        dataIndex: 'zzmc',
        ellipsis: true,
        class: 'nameColor'
      }, {
        title: '汇水面积（m²）',
        dataIndex: 'sy'
      }
      ],
      zzmcData: [{
        id: 1,
        zzmc: '延西',
        sy: '235万'
      }, {
        id: 2,
        zzmc: '北大',
        sy: '845万'
      }, {
        id: 3,
        zzmc: '河北',
        sy: '678万'
      }, {
        id: 4,
        zzmc: '公园',
        sy: '732万'
      }, {
        id: 5,
        zzmc: '河南',
        sy: '336万'
      }, {
        id: 6,
        zzmc: '铁南',
        sy: '869万'
      }
      ]
    }
  },
  mounted () {
    this.initMap()
    this.initDate()
    this.drawLine()
  },
  methods: {
    /**
    * 初始化地图
    */
    initMap () {
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Zoom',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/geometry/SpatialReference'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([Map, MapView, Zoom, WebTileLayer, TileInfo, SpatialReference]) => {
          const spatialReference = SpatialReference.WGS84

          const tileInfo = new TileInfo({
            dpi: 90.71428571427429,
            lods: [
              {
                level: 0,
                levelValue: '1',
                scale: 295828763.79585470937713011037,
                resolution: 0.703125
              },
              {
                level: 1,
                levelValue: '2',
                scale: 147914381.89792735468856505518,
                resolution: 0.3515625
              },
              {
                level: 2,
                levelValue: '3',
                scale: 73957190.948963677344282527592,
                resolution: 0.17578125
              },
              {
                level: 3,
                levelValue: '4',
                scale: 36978595.474481838672141263796,
                resolution: 0.087890625
              },
              {
                level: 4,
                levelValue: '5',
                scale: 18489297.737240919336070631898,
                resolution: 0.0439453125
              },
              {
                level: 5,
                levelValue: '6',
                scale: 9244648.868620459668035315949,
                resolution: 0.02197265625
              },
              {
                level: 6,
                levelValue: '7',
                scale: 4622324.4343102298340176579745,
                resolution: 0.010986328125
              },
              {
                level: 7,
                levelValue: '8',
                scale: 2311162.2171551149170088289872,
                resolution: 0.0054931640625
              },
              {
                level: 8,
                levelValue: '9',
                scale: 1155581.1085775574585044144937,
                resolution: 0.00274658203125
              },
              {
                level: 9,
                levelValue: '10',
                scale: 577790.55428877872925220724681,
                resolution: 0.001373291015625
              },
              {
                level: 10,
                levelValue: '11',
                scale: 288895.2771443893646261036234,
                resolution: 0.0006866455078125
              },
              {
                level: 11,
                levelValue: '12',
                scale: 144447.63857219468231305181171,
                resolution: 0.00034332275390625
              },
              {
                level: 12,
                levelValue: '13',
                scale: 72223.819286097341156525905853,
                resolution: 0.000171661376953125
              },
              {
                level: 13,
                levelValue: '14',
                scale: 36111.909643048670578262952926,
                resolution: 0.0000858306884765625
              },
              {
                level: 14,
                levelValue: '15',
                scale: 18055.954821524335289131476463,
                resolution: 0.00004291534423828125
              },
              {
                level: 15,
                levelValue: '16',
                scale: 9027.977410762167644565738231,
                resolution: 0.000021457672119140625
              },
              {
                level: 16,
                levelValue: '17',
                scale: 4513.9887053810838222828691158,
                resolution: 0.0000107288360595703125
              },
              {
                level: 17,
                levelValue: '18',
                scale: 2256.9943526905419111414345579,
                resolution: 0.00000536441802978515625
              },
              {
                level: 18,
                levelValue: '19',
                scale: 1128.4971763452709555707172788,
                resolution: 0.000002682209014892578125
              }
            ],
            size: [256, 256],
            origin: {
              x: -180,
              y: 90
            },
            spatialReference
          })

          // 矢量底图
          this.baseMapLayers.vec = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })
          // 矢量注记
          this.baseMapLayers.cva = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })
          this.baseMapLayers.vec.effect = 'grayscale(60%) invert(95%) opacity(100%) sepia(90%) saturate(250%) hue-rotate(179deg) contrast(100%)'
          this.baseMapLayers.cva.effect = 'grayscale(80%) invert(95%) opacity(100%) sepia(30%) saturate(80%) hue-rotate(190deg) contrast(100%)'
          this.map = new Map({
            basemap: { baseLayers: [this.baseMapLayers.vec, this.baseMapLayers.cva] }
          })
          this.mapView = new MapView({
            container: 'map', // 视图的容器
            map: this.map, // Map的实例放入视图中
            center: this.positionCenter, // 初始显示的地图中心点，经纬度
            zoom: 13, // 当前地图缩放等级
            logo: false,
            slider: true // 开启放大缩小
          })
          this.mapView.constraints = {
            minZoom: 9,
            maxZoom: 17
          }
          this.mapView.ui.components = []
          this.zoom = new Zoom({ // 自定义缩放
            view: this.mapView
          })
          this.mapView.when(() => {
            // 地图加载完成
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 日期需单独转换
     */
    onChange (date, dateString) {
      if (date == null) {
        this.sewageTimeString = []
      } else {
        this.sewageTimeString = moment(date).format('YYYY-MM-DD')
      }
      // this.sewageTime = this.sewageTimeString
    },
    // 禁止选择当天之前的日期 不包含当天
    disabledEndDate (current) {
      return current && current > moment().subtract(0, 'days') // 当天之后的不可选，不包括当天
    },
    // 返回按钮
    pre () {
      this.$router.back()
    },
    // 初始化日期
    initDate () {
      const date = new Date()
      // 获取当前日期
      this.nowDate = date.toLocaleDateString().split('/').map(item => {
        if (item < 10) {
          return '0' + item
        } else {
          return item
        }
      }).join('/')
      // 获取星期
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.nowWeek = weeks[date.getDay()]
      // 获取当前时间
      this.nowTime = this.dateFormatter(date)
    },
    dateFormatter (date) {
      const MM = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      const mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

      return date.getFullYear() + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
    },
    drawLine () {
      // 基于dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChartOne'))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        grid: {
          left: '5%', // 与容器左侧的距离
          top: '5%' // 与容器顶部的距离
        },
        legend: {
          x: 'left',
          y: 'center',
          orient: 'vertical',
          data: ['离线', '预警', '报警', '正常']
        },
        graphic: [{ // 环形图中间添加文字
          type: 'text', // 通过不同top值可以设置上下显示
          left: 180,
          top: 110,
          style: {
            text: '总数' + '\n' + '17',
            textAlign: 'center',
            fill: '#FFFFFF', // 文字的颜色
            width: 30,
            height: 30,
            fontSize: 20,
            fontFamily: 'Microsoft YaHei'
          }
        }],
        color: ['#A1A1A1', '#EFAD00', '#FF6B3C', '#49B1FF'],
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            y: 'top',
            left: 50,
            tooltip: {
              valueFormatter: function (value) {
                return (
                  value + ' 公里' + '(' + (value / 725).toFixed(4) * 100 + '%' + ')'
                )
              }
            },
            data: [
              { value: 0, name: '离线' },
              { value: 0, name: '预警' },
              { value: 0, name: '报警' },
              { value: 17, name: '正常' }
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
    }
  }
}
</script>
<style>
.my-table .ant-table-tbody > tr > td {
  padding: 4px 0;
  overflow-wrap: break-word;
  text-align: center;
  border: none;
  color: #fff;
  font-size: 0.7vw;
}
.my-table .ant-table-thead > tr > th {
  padding: 3px 0;
  overflow-wrap: break-word;
  text-align: center;
  border: none;
  background: rgb(6, 52, 65);
  color: rgb(0, 238, 255);
  font-size: 0.72vw;
}

.my-table .ant-table-row.ant-table-row-level-0.table-striped {
  border-bottom: 1px solid #22304e !important;
  background: #1b2841;
}
.my-table .ant-table-tbody > tr > td.nameColor {
  color: rgb(43, 201, 242);
  cursor: pointer;
  font-style: normal;
}
.my-table .ant-table-tbody tr:hover:not(.ant-table-expanded-row) > td,
.my-table .ant-table-tbody .ant-table-row-hover,
.my-table .ant-table-tbody .ant-table-row-hover > td {
  background: transparent;
}
button.my-switch.ant-switch {
  border-color: rgb(70, 70, 70);

  background-color: rgb(70, 70, 70);
}
button.my-switch.ant-switch.ant-switch-checked {
  border-color: rgb(23, 166, 187);
  background-color: rgb(23, 166, 187);
}
.my-checkbox .ant-checkbox-group {
  display: inline-flex;
  justify-content: flex-end;
}
.my-checkbox .ant-checkbox-group-item {
  margin-right: 5px;
}
.my-checkbox .ant-checkbox + span {
  padding-right: 3px;
  padding-left: 3px;
}
.my-checkbox label.ant-checkbox-wrapper.ant-checkbox-group-item {
  color: #808080;
}
</style>
<style lang="less" scoped>
.screen-container {
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: #0b0b10;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .backButton {
    position: fixed;
    right: 1.5vh;
    top: 2vh;
    z-index: 999;
  }
  .top-line {
    width: 100vw;
    height: 0.1vh;
    background-color: #04a5b2;
    position: absolute;
    top: 0.5vh;
    left: 0;
  }
  .right-box,
  .left-box {
    width: 100%;
    background-color: #101726;
    border: 1px solid #063340;
    margin-bottom: 5px;
    border-radius: 10px;
    overflow: auto;
    position: relative;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .status-box {
      width: 100%;
      height: 80px;
      padding: 0 8%;
      margin: 20px auto 0;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .status-num {
        width: 24%;
        color: #fff;
        text-align: center;
        .num {
          line-height: 48px;
          font-size: 1.2vw;
          color: #02edfe;
          font-weight: bold;
        }
        p {
          text-align: center;
          line-height: 32px;
          font-size: 1vw;
          margin: 0;
        }
      }
    }
  }
  .left {
    width: 409px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: calc(99% - 10px);
    z-index: 2;
    .basic-list {
      width: 100%;
      .basic-list-item {
        float: left;
        width: 50%;
        background-color: #101726;
        border: 1px solid #063340;
        margin-bottom: 1px;
        border-radius: 10px;
        position: relative;
        .basic-list-right {
          width: 27px;
          height: 17px;
          line-height: 17px;
          position: absolute;
          right: 2px;
          top: 2px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          color: #000;
          background-color: #58d6df;
          text-align: center;
          font-style: italic;
        }
        p {
          margin: 1vh 0 0;
          text-align: center;
          font-size: 0.9vw;
          font-weight: bold;
          color: #8b8b8b;
        }
        h5 {
          height: 36px;
          text-align: center;
          font-size: 1.3vw;
          color: #02edfe;
        }
      }
    }
    .time {
      display: flex;
      height: 30px;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      font-size: 0.5vw;
    }
  }
  .center {
    width: calc(100vw - 774px);
    height: 100vh;
    border-radius: 10px;
    overflow: hidden;
    .title {
      width: calc(100vw - 774px);
      height: 6vh;
      position: absolute;
      top: 0.8vh;
      left: 414px;
      .title-left {
        width: 17vw;
        height: 6vh;
        background-image: url('../../../assets/left_k.png');
        background-repeat: no-repeat;
        background-size: 101% 88%;
        position: absolute;
        left: 0;
        bottom: -0.5vh;
        z-index: 10;
        display: flex;
        .date {
          font-size: 1.3vw;
          color: #2bc9f2;
          font-weight: bold;
          margin: 1vh 1vw 0;
        }
        .week {
          font-size: 1.3vw;
          color: #2bc9f2;
          font-weight: bold;
          margin-top: 1vh;
        }
      }
      .title-middle {
        width: 33.7vw;
        height: 6.7vh;
        background-color: #0b0b10;
        position: absolute;
        top: -0.8vh;
        left: 13vw;
        display: flex;
        .qx-l,
        .qx-r {
          width: 6vw;
          height: 6vh;
          margin-top: 0.5vh;
        }
        .qx-m {
          flex: 1;
          border-bottom: 1px solid #04a5b2;
          height: 6vh;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 0.5vh;
        }
      }
      .title-right {
        width: 17vw;
        height: 6vh;
        background-image: url('../../../assets/right_k.png');
        background-repeat: no-repeat;
        background-size: 101% 88%;
        position: absolute;
        right: 0.2vw;
        bottom: -0.5vh;
        z-index: 10;
        display: flex;
        justify-content: flex-end;
        img {
          width: 2.3vw;
          height: 1.8vw;
          margin: 0.8vh 1vw 0 2vw;
        }
        .date {
          font-size: 1.3vw;
          color: #2bc9f2;
          font-weight: bold;
          margin: 1vh 1.2vw 0 1vw;
          position: relative;
          .degree {
            font-size: 0.5vw;
            position: absolute;
            top: 0.2vh;
            right: -0.8vw;
          }
        }
        .week {
          width: 7vw;
          text-align: center;
          font-size: 1.3vw;
          color: #2bc9f2;
          font-weight: bold;
          margin: 1vh 0 0 0.5vw;
        }
      }
    }
    .map {
      width: 100%;
      height: calc(94vh - 10px);
      margin-top: calc(6vh + 8px);
      border: 1px solid #063340;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      .infoExhibition {
        border-top: 3px solid #00eeff;
        width: 260px;
        padding: 8px;
        z-index: 10;
        text-size-adjust: none;
        display: block;
        background-color: #000;
        border-radius: 5px;
        position: absolute;
        right: 0;
        top: 0;
        .radioControl {
          width: 100%;
          font-size: 0.92vw;
          color: #fff;
        }

        .unit {
          cursor: pointer;
          width: 200px;
          height: 20px;
          line-height: 20px;
          border-radius: 10px;
          color: #2ac8f1;
          text-align: center;
          margin: 5px auto;
          font-size: 0.75vw;
        }
      }
      .list-row {
        width: 100%;
        .list-row-item {
          width: 100%;
          height: 24px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
          font-size: 0.7vw;
          .name {
            font-weight: bold;
            color: #fff;
          }
          .green {
            color: #07b83c;
          }
        }
      }
      .waterConsumption {
        height: auto;
        width: 100%;
        text-align: center;
        color: #00eeff;
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 10px;
        background-color: #000;
      }
    }
    .rainBody::before {
      content: '';
      height: 3px;
      width: 50px;
      background-color: #00eeff;
      position: absolute;
      left: 106px;
      top: 127px;
      border-radius: 10px;
    }
  }
  .right {
    width: 359px;
    margin-top: 10px;
  }

  .headline {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #02e8f9;
    font-size: 0.93vw;
    font-weight: 700;
    z-index: 1;
  }
  .small-tit {
  }
  .update-time {
    display: flex;
    height: 25px;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-size: 0.5vw;
    margin-bottom: 10px;
    .left-time {
      padding: 3px 10px;
      background: #8b8b8b;
      color: #000;
      border: 1px solid #8b8b8b;
      min-height: 20px;
    }
    .right-time {
      text-align: center;
      padding: 3px 10px;
      background: transparent;
      color: #8b8b8b;
      border: 1px solid #8b8b8b;
      min-height: 20px;
    }
  }
}
</style>
