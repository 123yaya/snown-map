<template>
  <div class="map" id="container">
    <!-- 地图 -->
    <div id="map" class="web-map">
    </div>
    <!-- 鹰眼图 -->
    <template>
      <a-tooltip placement="right" title="鹰眼">
        <div class="overViewMap-btn">
          <div v-if="showOverViewMapZindex>0" @click="showOverViewMapZindex=-1" class="show-img"><img src="@/assets/map/show.png" alt=""></div>
          <div v-else @click="showOverViewMapZindex=999" class="hide-img"><img src="@/assets/map/hide.png" alt=""></div>
        </div>
      </a-tooltip>
      <div id="overViewMap" :style="{'z-index':showOverViewMapZindex}">
        <div id="extent"></div>
      </div>
    </template>
    <!-- 全屏 -->
    <div @click="optionFullscreen()" class="fullscreen">
      <i style="color:#3a89d9" v-if="!fullscreen" class="icon-btn iconfont icon-quanping"></i>
      <i style="color:#3a89d9" v-else class="icon-btn iconfont icon-tuichuzhuanhuan"></i>
    </div>
    <!-- 右侧图例相关 -->
    <div class="map-right">
      <div class="mapTools">
        <!-- <div><img src="@/assets/map/1.png" alt=""></div> -->
        <!-- <a-tooltip placement="top" title="管线">
          <div><img src="@/assets/map/2.png" alt=""></div>
        </a-tooltip> -->
        <!-- 测量 -->
        <div id="measure-bar1">
          <a-tooltip placement="top" title="测量距离">
            <div @click="measureDistance()" id="distance-btn" class="action-button esri-icon-measure-line">
              <!-- <img src="@/assets/map/3.png" alt=""> -->
            </div>
          </a-tooltip>
          <a-tooltip placement="top" title="测量面积">
            <div @click="measureArea()" id="area-btn" class="action-button esri-icon-measure-area">
              <!-- <img src="@/assets/map/6.png" alt=""> -->
            </div>
          </a-tooltip>
          <a-tooltip placement="top" title="清除测量">
            <div @click="clearMeasure()" class="action-button" style="line-height:36px;color:
          #3a89d9;z-index: 999;"><img src="@/assets/map/4.png" alt=""></div>
          </a-tooltip>
        </div>
        <a-tooltip placement="top" title="图层">
          <div @click="()=>{showPsModel=!showPsModel}"><img src="@/assets/map/5.png" alt=""></div>
        </a-tooltip>
        <a-tooltip placement="leftBottom" trigger="click">
          <template #title>
            <div class="tooltip-content">
              <h5 class="tooltip-content-h5">业务图层</h5>
              <div class="tooltip-content-list" v-for="yw in ywtcData" :key="yw.value">
                <img :src="yw.url" alt="">{{ yw.label }}
              </div>
              <h5 class="tooltip-content-h5">监测设备</h5>
              <div class="tooltip-content-list" v-for="jc in jcsbData" :key="jc.value">
                <img :src="jc.url" alt="">{{ jc.label }}
              </div>
              <h5 class="tooltip-content-h5">监测点</h5>
              <div class="tooltip-content-list">
                <img src="@/assets/marker/szjc.png" alt="">水质监测点
              </div>

            </div>
          </template>
          <div>图例</div>
        </a-tooltip>
      </div>
      <div class="mapZoom">
        <a-tooltip placement="top" title="放大">
          <div @click="mapZoom(1)">+</div>
        </a-tooltip>
        <a-tooltip placement="top" title="缩小">
          <div @click="mapZoom(0)">-</div>
        </a-tooltip>
      </div>
      <!-- 排水设施管理 -->
      <div class="psModel-box" v-if="showPsModel">
        <h4>排水设施显示管理</h4>
        <div class="my-tabs">
          <a-tabs :activeKey="activeKey" tabPosition="left" @change="changeActiveKey">
            <a-tab-pane key="1">
              <template #tab>
                <div class="tab-tit">
                  <i style="font-size: 32px;" class="iconfont icon-gistuceng"></i>
                  <p>底图图层</p>
                </div>
              </template>
              <div class="tab-box" id="basemapGallery">
                <a-radio-group :value="dttcChecked" @change="chooseDttc">
                  <a-radio style="display:flex;height:30px;lineHeight: 30px;" v-for="dttc in dttcData" :key="dttc.value" :value="dttc.value">{{ dttc.label }}</a-radio>
                </a-radio-group>
                <!-- <a-checkbox-group :value="dttcChecked" :options="dttcData" @change="chooseDttc"></a-checkbox-group> -->
              </div>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <div class="tab-tit">
                  <i style="font-size: 32px;" class="iconfont icon-guanxian"></i>
                  <p>管网设施</p>
                </div>
              </template>
              <div class="tab-box">
                <a-checkbox-group :value="gwssChecked" :options="gwssData" @change="chooseGwss"></a-checkbox-group>
              </div>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <div class="tab-tit">
                  <i style="font-size: 32px;" class="iconfont icon-gftuceng"></i>
                  <p>业务图层</p>
                </div>
              </template>
              <div class="tab-box">
                <a-checkbox-group :value="ywtcChecked" :options="ywtcData" @change="chooseywtc"></a-checkbox-group>
              </div>
            </a-tab-pane>
            <a-tab-pane key="4">
              <template #tab>
                <div class="tab-tit">
                  <i style="font-size: 32px" class="iconfont icon-mubiaojianceshezhi"></i>
                  <p>监测设备</p>
                </div>
              </template>
              <div class="tab-box">
                <a-checkbox-group :value="jcsbChecked" :options="jcsbData" @change="chooseJcsb"></a-checkbox-group>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <!-- 液位监测站概览 -->
    <liquid-level-station ref="liquidLevelStation"></liquid-level-station>
    <!-- 液位监测站详情 -->
    <liquid-level-station-detail ref="liquidLevelStationDetail"></liquid-level-station-detail>
    <!-- 雨量站概览 -->
    <rainfall-station ref="rainfallStation"></rainfall-station>
    <!-- 雨量站详情 -->
    <rainfall-station-detail ref="rainfallStationDetail"></rainfall-station-detail>
    <!-- 流量站概览 -->
    <flow-station ref="flowStation"></flow-station>
    <!-- 流量站详情 -->
    <flow-station-detail ref="flowStationDetail"></flow-station-detail>
    <!-- 视频详情 -->
    <video-detail ref="videoDetail"></video-detail>
    <!-- 水质监测点列表以及水质图例展示 -->
    <water-quality ref="waterQuality" @showWaterLevel="showWaterLevel" @cancleWaterLevel="cancleWaterLevel" @mapGoTo="mapGoTo"></water-quality>
    <water-quality-view ref="waterQualityView"></water-quality-view>
    <water-quality-detail ref="waterQualityDetail"></water-quality-detail>
    <table-detail ref="tableDetail"></table-detail>
  </div>
</template>

<script>
import { findIndexByKeyValue, launchIntoFullscreen, exitFullscreen } from '@/utils/util'
import geoJson from '@/assets/json/polyjoy.json'

import * as esriLoader from 'esri-loader'
import { ServiceUrl } from '@/assets/arcgis/ArcGisServe.js'
import yhdDetail from './components/yhdDetail'
import liquidLevelStation from './components/liquidLevelStation'
import videoDetail from './components/videoDetail'
import liquidLevelStationDetail from './components/liquidLevelStationDetail'
import rainfallStation from './components/rainfallStation'
import rainfallStationDetail from './components/rainfallStationDetail'
import flowStation from './components/flowStation'
import flowStationDetail from './components/flowStationDetail'
import waterQuality from './components/waterQuality'
import waterQualityView from './components/waterQualityView'
import waterQualityDetail from './components/waterQualityDetail'
import tableDetail from './components/tableDetail'

import {
  dttcData, gwssData, ywtcData, jcsbData,
  waterLevel1, waterLevel2, waterLevel3, waterLevel4, waterLevel5
} from './mock.js'
import { oneMapFacilityCoordinates, oneMapYwCoordinates } from '@/api/modular/main/onemap/oneMapManage'
import { wwtpDetail } from '@/api/modular/main/wwtp/wwtpManage'
import { dischargerDetail } from '@/api/modular/main/discharger/dischargerManage'
import { outletEnterpriseDetail } from '@/api/modular/main/outletenterprise/outletEnterpriseManage'
import { pumpstationDetail } from '@/api/modular/main/pumpstation/pumpstationManage'
import { gateDetail } from '@/api/modular/main/gate/gateManage'
import { cameraInfoDetail } from '@/api/modular/main/camerainfo/cameraInfoManage'
import axios from 'axios'

export default {
  name: 'Console',
  components: {
    yhdDetail,
    liquidLevelStation,
    videoDetail,
    liquidLevelStationDetail,
    rainfallStation,
    rainfallStationDetail,
    flowStation,
    flowStationDetail,
    waterQuality,
    waterQualityView,
    waterQualityDetail,
    tableDetail
  },
  data () {
    return {
      map: {}, // map
      fullscreen: false, // fullscreen是否全屏
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
      locate: null, // 定位
      activeWidget: null, // 测量
      activeDistanceWidget: null, // 距离测量
      activeAreaWidget: null, // 面积测量
      positionCenter: [129.509089271, 42.891117162],
      overMap: {}, // 鹰眼map
      overMapView: {}, // 鹰眼view
      featureLayers: [], // layerFrus图层
      layerFrus: {}, // layerFrus图层
      pointGraphicLayer: {}, // 坐标定位图层
      pointGraphic: {}, // 坐标定位点
      // 地图画线所需参数
      showPsModel: false, // 排水设施显示
      activeKey: '1', // 排水设施显示管理当前选中项
      showOverViewMapZindex: -1, // 是否显示鹰眼
      dttcData: dttcData,
      gwssData: gwssData,
      ywtcData: ywtcData,
      jcsbData: jcsbData,
      dttcChecked: '1',
      gwssChecked: [],
      ywtcChecked: [],
      jcsbChecked: [],
      waterLevel1: waterLevel1, // 水质等级1
      waterLevel2: waterLevel2, // 水质等级2
      waterLevel3: waterLevel3, // 水质等级3
      waterLevel4: waterLevel4, // 水质等级4
      waterLevel5: waterLevel5, // 水质等级5
      mapLayerclickChange: null, // 官网设施图层点击事件
      gisWell: null, // 排水管网主干
      gisPipeline: null, // 排水管网主干

      gisWellYsg: null, // 雨水管
      gisPipelineYsg: null, // 雨水管
      gisWellWsg: null, // 污水管
      gisPipelineWsg: null, // 污水管
      gisWellHlg: null, // 合流管
      gisPipelineHlg: null, // 合流管

      yjwgs84Line: null, // CAD
      yjwgs84Point: null, // CAD
      yjwgs84Polygon: null, // CAD
      scale2offset: {
        '0': 0.4,
        '1': 0.4,
        '2': 0.4,
        '3': 0.4,
        '4': 0.04,
        '5': 0.04,
        '6': 0.04,
        '7': 0.04,
        '8': 0.02,
        '9': 0.02,
        '10': 0.01,
        '11': 0.01,
        '12': 0.01,
        '13': 0.008,
        '14': 0.008,
        '15': 0.008,
        '16': 0.0010,
        '17': 0.0008,
        '18': 0.0005
      }
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap () {
      const that = this
      esriLoader.loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Zoom',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/geometry/SpatialReference',
        'esri/widgets/Fullscreen',
        'esri/widgets/Locate',
        'esri/Graphic',
        'esri/core/watchUtils'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([Map, MapView, Zoom, WebTileLayer, TileInfo, SpatialReference, Fullscreen, Locate, Graphic, watchUtils]) => {
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

          // 影像底图
          this.baseMapLayers.img = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })
          // 影像注记
          this.baseMapLayers.cia = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })

          // 地形晕渲
          this.baseMapLayers.ter = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })
          // 地形注记
          this.baseMapLayers.cta = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/cta_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })

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
          // const fullscreen = new Fullscreen({
          //   view: this.mapView
          // })
          // this.mapView.ui.add(fullscreen, 'bottom-right') // 添加全屏操作
          const locateBtn = new Locate({
            view: this.mapView
          })
          this.mapView.ui.add(locateBtn, 'top-right') // 添加定位操作
          this.mapView.ui._removeComponents(['zoom']) // 隐藏地图默认的缩放
          this.zoom = new Zoom({ // 自定义缩放
            view: this.mapView
          })

          this.mapView.ui.add('measure-bar1', 'top-right') // 测量工具

          // 鹰眼功能-------
          this.overMap = new Map({
            basemap: { baseLayers: [this.baseMapLayers.vec, this.baseMapLayers.cva] }
          })
          // Create the MapView for overview map
          this.overMapView = new MapView({
            container: 'overViewMap',
            map: this.overMap,
            center: this.positionCenter, // 初始显示的地图中心点，经纬度
            zoom: 8, // 当前地图缩放等级
            logo: false,
            constraints: {
              rotationEnabled: false
            }
          })
          // Remove the default widgets
          this.overMapView.ui.components = []

          this.overMapView.when(() => {
            this.mapView.when(() => {
              this.lingeHeight() // 高亮显示
              this.getWaterQuality()
              this.setup(Graphic, watchUtils)
            })
          })

          this.mapView.popup.on('trigger-action', event => {
            const { id } = event.action
            const attributes = this.mapView.popup.selectedFeature.attributes
            if (id === 'ylzView') {
              that.$refs.rainfallStation.showRainfallStation(id, attributes.id)
            } else if (id === 'ylzDetail') {
              that.$refs.rainfallStationDetail.showRainfallStationDetail(id, attributes.id)
            } else if (id === 'llView') {
              that.$refs.flowStation.showFlowStation(id, attributes.id)
            } else if (id === 'llDetail') {
              that.$refs.flowStationDetail.showFlowStationDetail(id, attributes.id)
            } else if (id === 'ywjczView') {
              that.$refs.liquidLevelStation.showLiquidLevelStation(id, attributes.id)
            } else if (id === 'ywjczDetail') {
              that.$refs.liquidLevelStationDetail.showLiquidLevelStationDetail(id, attributes.id)
            } else if (id === 'videoDetail') {
              that.$refs.videoDetail.showVideoDetail(attributes.id)
            } else if (id === 'waterQualityView') {
              that.$refs.waterQualityView.showWaterQualityView(id)
            } else if (id === 'waterQualityDetail') {
              that.$refs.waterQualityDetail.showWaterQualityDetail(id)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
   * 去地图某个已知经纬度
   */
    mapGoTo (longitude, latitude) {
      console.log('我要去---', longitude, latitude)
      const that = this
      that.mapView.goTo({
        target: [Number(longitude), Number(latitude)],
        zoom: 18,
        heading: 48,
        tilt: 40
      }, {
        duration: 2000 // 视角跳转时长为2秒
      }).then(function () {
        console.log('成功拉---')
      })
    },
    async lingeHeight () {
      // 在高亮显示本区域之前移除之前的图层

      esriLoader.loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/geometry/Polyline',
        'esri/Color'
      ]).then(
        ([GraphicsLayer, Graphic, Polyline
        ]) => {
          this.graphicsLayer = new GraphicsLayer()
          let coordinates = geoJson
          coordinates = coordinates.coordinates
          const polyLine = new Polyline(coordinates)
          const lineSymbol = {
            type: 'simple-line',
            color: [255, 0, 0],
            width: '3px'
          }
          const graphic = new Graphic(polyLine, lineSymbol)
          this.graphicsLayer.add(graphic)
          this.map.add(this.graphicsLayer)
        }).catch(err => {
          console.log(err)
        })
    },
    setup (Graphic, watchUtils) {
      const extentGraphic = new Graphic({
        geometry: null,
        symbol: {
          type: 'simple-fill',
          color: [0, 0, 0, 0.5],
          outline: null
        }
      })
      this.overMapView.graphics.add(extentGraphic)
      watchUtils.init(this.mapView, 'extent', (extent) => {
        // Sync the overview map location
        // whenever the 3d view is stationary
        if (this.mapView.stationary) {
          const that = this
          that.overMapView.goTo({
            center: that.positionCenter,
            scale: that.mapView.scale * 2 * Math.max(that.mapView.width / that.overMapView.width, that.mapView.height / that.overMapView.height)
          })
            .catch((error) => {
              // ignore goto-interrupted errors
              if (error.name !== 'view:goto-interrupted') {
                console.error(error)
              }
            })
        }

        extentGraphic.geometry = extent
      })
    },
    /**
     * 切换tab activeKey
     */
    changeActiveKey (activeKey) {
      this.activeKey = activeKey
    },
    /**
     * 选择地图图层子项
     * 1: 矢量图 2: 影像图 3: 地形图
     */
    chooseDttc (e) {
      this.dttcChecked = e.target.value
      if (this.dttcChecked === '1') {
        this.mapView.map.basemap = { baseLayers: [this.baseMapLayers.vec, this.baseMapLayers.cva] }
        this.overMapView.map.basemap = { baseLayers: [this.baseMapLayers.vec, this.baseMapLayers.cva] }
      } else if (this.dttcChecked === '2') {
        this.mapView.map.basemap = { baseLayers: [this.baseMapLayers.img, this.baseMapLayers.cia] }
        this.overMapView.map.basemap = { baseLayers: [this.baseMapLayers.img, this.baseMapLayers.cia] }
      } else {
        this.mapView.map.basemap = { baseLayers: [this.baseMapLayers.ter, this.baseMapLayers.cta] }
        this.overMapView.map.basemap = { baseLayers: [this.baseMapLayers.ter, this.baseMapLayers.cta] }
      }
    },
    /**
     * 选择管网设施
     */
    chooseGwss (e) {
      this.gwssChecked = e
      const that = this
      console.log('选择管网设施', that.mapView.zoom, that.gwssChecked)
      if (that.gwssChecked.indexOf(1) > -1) { // 排水管网主干
        if (!that.gisWell && !that.gisPipeline) {
          esriLoader.loadModules([
            'esri/layers/WMSLayer'
          ]).then(
            ([WMSLayer]) => {
              that.gisWell = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_well'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16)
              })
              that.gisPipeline = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_pipeline'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16)
              })
              that.map.add(that.gisWell)
              that.map.add(that.gisPipeline)
            }).catch(err => {
              console.log(err)
            })
          that.mapLayerclickChange = that.mapView.on('click', event => {
            const mapPoint = event.mapPoint
            const offset = that.scale2offset[that.mapView.zoom]
            const BBOX = (mapPoint.x - offset) + ',' + (mapPoint.y - offset) + ',' + (mapPoint.x + offset) + ',' + (mapPoint.y + offset)
            if (that.mapView.zoom >= 15 && that.mapView.zoom <= 20) {
              axios.get('http://218.27.207.153:9029/geoserver/gis/wms', {
                params: {
                  SERVICE: 'WMS',
                  VERSION: '1.1.1',
                  REQUEST: 'GetFeatureInfo',
                  QUERY_LAYERS: 'gis:gis_pipeline,gis:gis_well',
                  LAYERS: 'gis:gis_pipeline,gis:gis_well',
                  exceptions: 'application/Fvnd.ogc.se_inimage',
                  INFO_FORMAT: 'application/json',
                  FEATURE_COUNT: 50,
                  X: 5,
                  Y: 50,
                  SRS: 'EPSG:4326',
                  WIDTH: 101,
                  HEIGHT: 101,
                  BBOX: BBOX
                }
              }).then((res) => {
                console.log('res', res)
                if (res.data.features.length > 0) {
                  that.$refs.tableDetail.show(res.data.features)
                }
              }).catch((err) => {
                console.log(err) // 错误信息
              })
            }
          })
        }
      } else {
        // 清除监听
        if (that.mapLayerclickChange != null) {
          that.mapLayerclickChange.remove()
          that.$refs.tableDetail.close()
        }
        if (that.gisWell) { // 排水管网主干
          that.gisWell.visible = false
          that.gisWell = null
        }
        if (that.gisPipeline) { // 排水管网主干
          that.gisPipeline.visible = false
          that.gisPipeline = null
        }
      }
      if (that.gwssChecked.indexOf(2) > -1) { // 雨水管
        if (!that.gisWellYsg && !that.gisPipelineYsg) {
          esriLoader.loadModules([
            'esri/layers/WMSLayer'
          ]).then(
            ([WMSLayer]) => {
              that.gisWellYsg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_well'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'field_station_no like \'YS%\''
                }
              })
              that.gisPipelineYsg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_pipeline'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'pipe_type = \'雨水\''
                }
              })
              that.map.add(that.gisWellYsg)
              that.map.add(that.gisPipelineYsg)
            }).catch(err => {
              console.log(err)
            })
        }
      } else {
        if (that.gisWellYsg) { // 雨水管
          that.gisWellYsg.visible = false
          that.gisWellYsg = null
        }
        if (that.gisPipelineYsg) { // 雨水管
          that.gisPipelineYsg.visible = false
          that.gisPipelineYsg = null
        }
      }
      if (that.gwssChecked.indexOf(3) > -1) { // 污水管
        if (!that.gisWellWsg && !that.gisPipelineWsg) {
          esriLoader.loadModules([
            'esri/layers/WMSLayer'
          ]).then(
            ([WMSLayer]) => {
              that.gisWellWsg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_well'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'field_station_no like \'WS%\''
                }
              })
              that.gisPipelineWsg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_pipeline'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'pipe_type = \'污水\''
                }
              })
              that.map.add(that.gisWellWsg)
              that.map.add(that.gisPipelineWsg)
            }).catch(err => {
              console.log(err)
            })
        }
      } else {
        if (that.gisWellWsg) { // 污水管
          that.gisWellWsg.visible = false
          that.gisWellWsg = null
        }
        if (that.gisPipelineWsg) { // 污水管
          that.gisPipelineWsg.visible = false
          that.gisPipelineWsg = null
        }
      }
      if (that.gwssChecked.indexOf(4) > -1) { // 合流管
        if (!that.gisWellHlg && !that.gisPipelineHlg) {
          esriLoader.loadModules([
            'esri/layers/WMSLayer'
          ]).then(
            ([WMSLayer]) => {
              that.gisWellHlg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_well'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'field_station_no like \'HS%\''
                }
              })
              that.gisPipelineHlg = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'gis_pipeline'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16),
                customLayerParameters: {
                  CQL_FILTER: 'pipe_type = \'雨污合流\''
                }
              })
              that.map.add(that.gisWellHlg)
              that.map.add(that.gisPipelineHlg)
            }).catch(err => {
              console.log(err)
            })
        }
      } else {
        if (that.gisWellHlg) { // 合流管
          that.gisWellHlg.visible = false
          that.gisWellHlg = null
        }
        if (that.gisPipelineHlg) { // 合流管
          that.gisPipelineHlg.visible = false
          that.gisPipelineHlg = null
        }
      }
      if (that.gwssChecked.indexOf(5) > -1) { // CAD
        if (!that.yjwgs84Line && !that.yjwgs84Point && !that.yjwgs84Polygon) {
          esriLoader.loadModules([
            'esri/layers/WMSLayer'
          ]).then(
            ([WMSLayer]) => {
              that.yjwgs84Line = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'yjwgs84_line'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16)
              })
              that.yjwgs84Point = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'yjwgs84_point'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16)
              })
              that.yjwgs84Polygon = new WMSLayer({
                url: 'http://218.27.207.153:9029/geoserver/gis/wms',
                sublayers: [{
                  name: 'yjwgs84_polygon'
                }],
                maxScale: that.getScaleAccordZoom(20),
                minScale: that.getScaleAccordZoom(16)
              })
              that.map.add(that.yjwgs84Line)
              that.map.add(that.yjwgs84Point)
              that.map.add(that.yjwgs84Polygon)
            }).catch(err => {
              console.log(err)
            })
        }
      } else {
        if (that.yjwgs84Line) { // CAD
          that.yjwgs84Line.visible = false
          that.yjwgs84Line = null
        }
        if (that.yjwgs84Point) { // CAD
          that.yjwgs84Point.visible = false
          that.yjwgs84Point = null
        }
        if (that.yjwgs84Polygon) { // CAD
          that.yjwgs84Polygon.visible = false
          that.yjwgs84Polygon = null
        }
      }
    },
    /**
  * 根据缩放级别，获取比例尺大小
  */
    getScaleAccordZoom (zoom) {
      const scale = (295828763.795777 / Math.pow(2, zoom - 1)).toFixed(6)
      return Number(scale)
    },
    /**
     * 选择检测设备
     */
    chooseJcsb (e) {
      const that = this
      this.jcsbChecked = e
      console.log('this.jcsbChecked', this.jcsbChecked)
      if (this.jcsbChecked.indexOf('ywjcz') > -1) { // 液位检查站
        this.getOneMapFacilityCoordinates('ywjcz', 'ywjczLayer', require('@/assets/mapIcon/yeweijiancezhan.png'), 35)
      } else {
        this.deleteSelFeature('ywjczLayer')
      }
      if (this.jcsbChecked.indexOf('hdsw') > -1) { // 河道水位
        this.getOneMapFacilityCoordinates('hdsw', 'hdswLayer', require('@/assets/mapIcon/hedaoshuiwei.png'), 35)
      } else {
        this.deleteSelFeature('hdswLayer')
      }
      if (this.jcsbChecked.indexOf('ylz') > -1) { // 雨量站
        this.getOneMapFacilityCoordinates('ylz', 'ylzLayer', require('@/assets/mapIcon/yuliangzhan.png'), 35)
      } else {
        this.deleteSelFeature('ylzLayer')
      }
      if (this.jcsbChecked.indexOf('ll') > -1) { // 流量
        this.getOneMapFacilityCoordinates('ll', 'llLayer', require('@/assets/mapIcon/liuliang.png'), 35)
      } else {
        this.deleteSelFeature('llLayer')
      }
      if (this.jcsbChecked.indexOf('zz') > -1) { // 闸站
        this.getOneMapFacilityCoordinates('zz', 'zzLayer', require('@/assets/mapIcon/zhazhan.png'), 35)
      } else {
        this.deleteSelFeature('zzLayer')
      }
      if (this.jcsbChecked.indexOf('bz') > -1) { // 泵站
        this.getOneMapFacilityCoordinates('bz', 'bzLayer', require('@/assets/mapIcon/bengzhan.png'), 35)
      } else {
        this.deleteSelFeature('bzLayer')
      }
      if (this.jcsbChecked.indexOf('yld') > -1) { // 易涝点
        this.getOneMapFacilityCoordinates('yld', 'yldLayer', require('@/assets/mapIcon/yld.png'), 35)
      } else {
        this.deleteSelFeature('yldLayer')
      }
      if (this.jcsbChecked.indexOf('jcj') > -1) { // 检查井
        this.getOneMapFacilityCoordinates('jcj', 'jcjLayer', require('@/assets/mapIcon/jcj.png'), 35)
      } else {
        this.deleteSelFeature('jcjLayer')
      }
      if (this.jcsbChecked.indexOf('sp') > -1) { // 视频点
        this.getOneMapFacilityCoordinates('sp', 'spLayer', require('@/assets/marker/spd.png'), 37)
      } else {
        this.deleteSelFeature('spLayer')
      }
    },
    getOneMapFacilityCoordinates (type, layer, img, imgSize) {
      oneMapFacilityCoordinates({ type }).then((res) => {
        if (res.success) {
          const normalList = []

          for (let i = 0; i < res.data.length; i++) {
            normalList.push({
              geometry: {
                type: 'point',
                longitude: res.data[i].longitude,
                latitude: res.data[i].latitude
              },
              attributes: {
                id: res.data[i].id,
                name: res.data[i].title,
                data: res.data[i]
              }
            })
          }
          if (normalList.length > 0) {
            this.addFeatureLayer(normalList, layer, img, imgSize)
          }
        }
      })
    },
    /**
     * 选择业务图层
     */
    chooseywtc (e) {
      const that = this
      this.ywtcChecked = e
      if (this.ywtcChecked.indexOf('wsclc') > -1) { // 污水厂
        oneMapYwCoordinates({ type: 'wsclc' }).then((res) => {
          if (res.success) {
            const points = []
            for (let i = 0; i < res.data.length; i++) {
              points.push({
                geometry: {
                  type: 'point',
                  longitude: res.data[i].longitude,
                  latitude: res.data[i].latitude
                },
                attributes: {
                  id: res.data[i].id,
                  name: res.data[i].title,
                  data: res.data[i]
                }
              })
            }
            that.addFeatureLayer(points, 'wsclcLayer', require('@/assets/marker/wsclc.png'), 30)
          }
        })
      } else {
        this.deleteSelFeature('wsclcLayer')
      }
      if (this.ywtcChecked.indexOf('psh') > -1) { // 排水户
        oneMapYwCoordinates({ type: 'psh' }).then((res) => {
          if (res.success) {
            const points = []
            for (let i = 0; i < res.data.length; i++) {
              points.push({
                geometry: {
                  type: 'point',
                  longitude: res.data[i].longitude,
                  latitude: res.data[i].latitude
                },
                attributes: {
                  id: res.data[i].id,
                  name: res.data[i].title,
                  data: res.data[i]
                }
              })
            }
            that.addFeatureLayer(points, 'pshLayer', require('@/assets/marker/psh.png'), 30)
          }
        })
      } else {
        this.deleteSelFeature('pshLayer')
      }
      if (this.ywtcChecked.indexOf('pwqy') > -1) { // 排水企业
        oneMapYwCoordinates({ type: 'pwqy' }).then((res) => {
          if (res.success) {
            const points = []
            for (let i = 0; i < res.data.length; i++) {
              points.push({
                geometry: {
                  type: 'point',
                  longitude: res.data[i].longitude,
                  latitude: res.data[i].latitude
                },
                attributes: {
                  id: res.data[i].id,
                  name: res.data[i].title,
                  data: res.data[i]
                }
              })
            }
            that.addFeatureLayer(points, 'psqyLayer', require('@/assets/marker/psqy.png'), 30)
          }
        })
      } else {
        this.deleteSelFeature('psqyLayer')
      }
    },
    /**
     * 显示水质检测点图层
     */
    getWaterQuality () {
      this.showWaterLevel()
      const that = this
      this.$nextTick(() => {
        setTimeout(function () {
          console.log('that.$refs', that.$refs)
          that.$refs.waterQuality.showWaterQuality()
        }, 1)
      })
    },
    showWaterLevel () {
      console.log('显示水质等级-----')
      this.addFeatureLayer(this.waterLevel1, 'waterLevel', require('@/assets/marker/a1.png'), 30)
      this.addFeatureLayer(this.waterLevel2, 'waterLevel', require('@/assets/marker/a2.png'), 30)
      this.addFeatureLayer(this.waterLevel3, 'waterLevel', require('@/assets/marker/a3.png'), 30)
      this.addFeatureLayer(this.waterLevel4, 'waterLevel', require('@/assets/marker/a4.png'), 30)
      this.addFeatureLayer(this.waterLevel5, 'waterLevel', require('@/assets/marker/a5.png'), 30)
    },
    cancleWaterLevel () {

    },
    /**
     * map 添加图层（标记点及对应弹窗）
     * geoPoint：添加的坐标点
     * objectId： 添加涂层的标识
     * imgUrl： 添加图层上的标记点图标路径
     */
    addFeatureLayer (geoPoint, objectId, imgUrl, imgSize) {
      const that = this
      esriLoader.loadModules([
        'esri/layers/FeatureLayer'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([FeatureLayer]) => {
          // 需要判断去重  即没有该图层再添加
          console.log('-----判断去重objectId', imgUrl, objectId, findIndexByKeyValue(that.featureLayers, 'id', objectId))
          // if (findIndexByKeyValue(that.featureLayers, 'id', objectId) < 0) {
          const popupTemplate = {
            title: '{name}',
            outFields: ['*'],
            overwriteActions: true // 隐藏默认的缩放按钮
          }

          // 弹出框的内容
          if (objectId === 'wsclcLayer') { // 污水处理厂
            popupTemplate.content = this.getWwtpContent
          } else if (objectId === 'pshLayer') { // 排水户
            popupTemplate.content = this.getPshContent
          } else if (objectId === 'psqyLayer') { // 排水企业
            popupTemplate.content = this.getPsqyContent
          } else if (objectId === 'bzLayer') { // 泵站
            popupTemplate.content = this.getBzContent
          } else if (objectId === 'zzLayer') { // 闸站
            popupTemplate.content = this.getZzContent
          } else if (objectId === 'spLayer') { // 视频
            popupTemplate.content = this.getSpContent
            popupTemplate.actions = [
              {
                title: '查看详情',
                id: 'videoDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'ylzLayer') { // 雨量
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'ylView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'ylDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'llLayer') { // 流量
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'flowView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'flowDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'ywjczLayer') {
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'ywjczView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'ywjczDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'szjc' || objectId === 'waterLevel') { // 水质监测点
            // popupTemplate.content = '<p>水质检测点编号:{id}</p>'
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'waterQualityView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'waterQualityDetail',
                className: 'esri-icon-minimize'
              }
            ]
          }

          that.layerFrus = new FeatureLayer({
            id: objectId,
            source: geoPoint,
            // objectIdField: 'id',
            fields: [
              { name: 'id', type: 'oid' },
              { name: 'name', type: 'string' },
              { name: 'data', type: 'xml' }
            ],
            popupTemplate: popupTemplate,
            renderer: {
              type: 'simple',
              symbol: {
                type: 'picture-marker',
                url: imgUrl,
                width: imgSize + 'px',
                height: imgSize + 'px'
              }
            }
          })

          that.featureLayers.push(that.layerFrus) // 添加到图层组
          that.map.add(that.featureLayers[that.featureLayers.length - 1])

          // } else {
          //   this.deleteSelFeature(objectId)
          // this.featureLayers = this.featureLayers.filter(v => v.id !== objectId)
          // that.$message.warning('该图层已存在，请勿重复添加！')
          // }
        }).catch(err => {
          console.log(err)
        })
    },
    // 污水处理厂弹框内容
    getWwtpContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return wwtpDetail({ wwtpid: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>坐标X:<span>' + res.data.xcoor + '</span></p><p>坐标Y:<span>' + res.data.ycoor + '</span></p></div>' +
            '<div class="model-inline"><p>地址:<span>' + res.data.addr + '</span></p></div>' +
            '<div class="model-inline"><p>污水处理级别:<span>' + this.$options.filters['dictType']('TREATMENT_LEVEL', res.data.treatmentLevel) + '</span></p><p>污水处理方法:<span>' + this.$options.filters['dictType']('TREATMENT_METHOD', res.data.treatmentMethod) + '</span></p></div>' +
            '<div class="model-inline"><p>污泥处理方式:<span>' + this.$options.filters['dictType']('SLUDGE_TREAT_METHOD', res.data.sludgetreatmethod) + '</span></p><p>数据来源:<span>' + this.$options.filters['dictType']('DATA_SOURCE', res.data.datasource) + '</span></p></div>'
        }
      })
    },
    // 排水户弹框内容
    getPshContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return dischargerDetail({ dischargerid: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>坐标X:<span>' + res.data.xcoor + '</span></p><p>坐标Y:<span>' + res.data.ycoor + '</span></p></div>' +
            '<div class="model-inline"><p>地址:<span>' + res.data.addr + '</span></p></div>' +
            '<div class="model-inline"><p>法人代表:<span>' + res.data.legalperson + '</span></p><p>联系电话:<span>' + res.data.tel + '</span></p></div>' +
            '<div class="model-inline"><p>排水户类型:<span>' + res.data.dischargerType + '</span></p><p>是否为重点排水户:<span>' + this.$options.filters['dictType']('yes_or_no_integer', res.data.keydischarger) + '</span></p></div>' +
            '<div class="model-inline"><p>污水处理方式:<span>' + res.data.treatmentMethod + '</span></p><p>数据来源:<span>' + this.$options.filters['dictType']('DATA_SOURCE', res.data.datasource) + '</span></p></div>'
        }
      })
    },
    // 排水企业弹框内容
    getPsqyContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return outletEnterpriseDetail({ id: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>经度:<span>' + res.data.lon + '</span></p><p>维度:<span>' + res.data.lat + '</span></p></div>' +
            '<div class="model-inline"><p>联系地址:<span>' + res.data.contactAddress + '</span></p></div>' +
            '<div class="model-inline"><p>法人代表:<span>' + res.data.corporatRepresentative + '</span></p><p>单位性质:<span>' + this.$options.filters['dictType']('ENTERPRISE_NATURE', res.data.enterpriseNature) + '</span></p></div>' +
            '<div class="model-inline"><p>所属行业:<span>' + this.$options.filters['dictType']('INDUSTRY', res.data.industry) + '</span></p></div>'
        }
      })
    },
    // 泵站弹框内容
    getBzContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return pumpstationDetail({ pumpstationid: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>坐标X:<span>' + res.data.xcoor + '</span></p><p>坐标Y:<span>' + res.data.ycoor + '</span></p></div>' +
            '<div class="model-inline"><p>泵站地址:<span>' + res.data.addr + '</span></p></div>' +
            '<div class="model-inline"><p>泵站分类:<span>' + this.$options.filters['dictType']('PS_CATEGORY', res.data.psCategory) + '</span></p><p>泵总数:<span>' + res.data.psNum + '</span></p></div>' +
            '<div class="model-inline"><p>数据来源:<span>' + this.$options.filters['dictType']('DATA_SOURCE', res.data.datasource) + '</span></p><p>设施状态:<span>' + this.$options.filters['dictType']('FACILITY_STATUS', res.data.status) + '</span></p></div>'
        }
      })
    },
    // 闸站弹框内容
    getZzContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return gateDetail({ gateid: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>坐标X:<span>' + res.data.xcoor + '</span></p><p>坐标Y:<span>' + res.data.ycoor + '</span></p></div>' +
            '<div class="model-inline"><p>类别:<span>' + this.$options.filters['dictType']('GATE_CATEGORY', res.data.gateCategory) + '</span></p><p>型号:<span>' + res.data.model + '</span></p></div>' +
            '<div class="model-inline"><p>闸门高程:<span>' + res.data.topElev + '</span></p><p>闸门控制类型:<span>' + this.$options.filters['dictType']('GATE_CONTROL_TYPE', res.data.controlType) + '</span></p></div>' +
            '<div class="model-inline"><p>闸门启闭形式:<span>' + this.$options.filters['dictType']('GATE_SWITCH_STYLE', res.data.switchStyle) + '</span></p><p>数据获取日期:<span>' + res.data.recordDate + '</span></p></div>' +
            '<div class="model-inline"><p>数据来源:<span>' + this.$options.filters['dictType']('DATA_SOURCE', res.data.datasource) + '</span></p><p>设施状态:<span>' + this.$options.filters['dictType']('FACILITY_STATUS', res.data.status) + '</span></p></div>'
        }
      })
    },
    // 视频点弹框内容
    getSpContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return cameraInfoDetail({ id: attributes.id }).then((res) => {
        if (res.success) {
          return '<div class="model-inline"><p>经度:<span>' + res.data.cameraLongitude + '</span></p><p>纬度:<span>' + res.data.cameraLatitude + '</span></p></div>' +
            '<div class="model-inline"><p>摄像机位置:<span>' + res.data.cameraLocation + '</span></p></div>' +
            '<div class="model-inline"><p>摄像机编码:<span>' + res.data.cameraCode + '</span></p><p>摄像机状态:<span>' + this.$options.filters['dictType']('CAMERA_STATUS', res.data.status) + '</span></p></div>'
        }
      })
    },
    /**
      * map 删除指定图层
      * objectId： 添加涂层的标识
      */
    deleteSelFeature (objectId) {
      console.log('要删除了', objectId)
      const that = this
      for (let i = 0; i < that.featureLayers.length; i++) {
        if (that.featureLayers[i].id === objectId) {
          that.featureLayers[i].visible = false
          // const deleteFeatures = [{ objectId: objectId }]
          //  that.featureLayers[i].applyEdits({ deleteFeatures: deleteFeatures }).then((results) => {
          //   console.log('删除成功！: ', results.addFeatureResults)
          // }).catch(function (error) {
          //   console.log('删除失败！！: ', error)
          // })
        }
      }
    },
    //  地图操作-----------------start
    /**
     * 放大缩小
     */
    mapZoom (type) {
      if (type === 1) {
        // 放大
        this.zoom.zoomIn()
      } else {
        // 缩小
        this.zoom.zoomOut()
      }
    },
    /**
     * 测量距离
     */
    measureDistance () {
      esriLoader.loadModules([
        'esri/widgets/DistanceMeasurement2D'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([DistanceMeasurement2D]) => {
          this.activeDistanceWidget = new DistanceMeasurement2D({ // 距离测量工具
            view: this.mapView
          })
          this.activeWidget = this.activeDistanceWidget
          this.activeWidget.viewModel.start()
          this.setActiveButton(document.getElementById('distance-btn'))
        }).catch(err => {
          console.log(err)
        })
    },
    /**
     * 测量面积
     */
    measureArea () {
      esriLoader.loadModules([
        'esri/widgets/AreaMeasurement2D'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([AreaMeasurement2D]) => {
          this.activeAreaWidget = new AreaMeasurement2D({ // 距离测量工具
            view: this.mapView
          })
          this.activeWidget = this.activeAreaWidget
          this.activeWidget.viewModel.start()
          this.setActiveButton(document.getElementById('area-btn'))
        }).catch(err => {
          console.log(err)
        })
    },
    setActiveButton (selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      this.mapView.focus()
      const elements = document.getElementsByClassName('active')
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('active')
      }
      if (selectedButton) {
        selectedButton.classList.add('active')
      }
    },
    /**
     * 清除测量
     */
    clearMeasure () {
      if (this.activeWidget) {
        this.mapView.ui.remove(this.activeWidget)
        this.activeWidget.destroy()
        this.activeWidget = null
      }
    },
    // 地图操作-----------------end
    optionFullscreen () {
      if (this.fullscreen) {
        exitFullscreen()
        this.fullscreen = !this.fullscreen
      } else {
        const full = document.getElementById('container')
        launchIntoFullscreen(full)
        this.fullscreen = !this.fullscreen
      }
    }
  }
}
</script>
<style  lang="less">
.my-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-content {
  background-color: #004f98b8;
}
.my-table .ant-table-placeholder {
  background-color: #004f98b8;
}
.my-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-body {
  min-width: 400px;
}
.my-table .ant-table-thead > tr > th {
  color: #8bc1f9;
  background-color: #0c69bc;
  border: 1px solid #0577db;
  padding: 5px 2px;
}
.my-table .ant-table-tbody > tr > td {
  padding: 5px 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  background: #085eaa !important;
  border-bottom: 1px solid #0577db !important;
}
.my-table .ant-pagination-item,
.my-table .ant-pagination-prev .ant-pagination-item-link,
.my-table .ant-pagination-next .ant-pagination-item-link {
  color: #44f3f9;
  background-color: #096dd9;
  border: 1px solid #096dd9;
}
.tab-box {
  .ant-radio-inner,
  span.ant-checkbox-inner {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #d9d9d9;
    border: 1px solid #d9d9d9;
    margin-right: 10px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #52c41a;
    border-color: #52c41a;
  }
  label.ant-checkbox-wrapper.ant-checkbox-group-item {
    margin: 10px 0;
    color: #95caff;
    width: 170px;
  }
  label.ant-radio-wrapper {
    margin: 10px 0;
    color: #95caff;
    width: 170px;
    line-height: 24px !important;
  }
  .ant-radio-inner::after {
    position: absolute;
    top: 5px;
    left: 5px;
    display: table;
    width: 10px;
    height: 10px;
    background-color: #52c41a;
  }
}

.map .ant-tabs-tab {
  border-bottom: 1px solid #309dff;
}
.map .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
  margin: 0;
}
.map .ant-tabs-tab-active.ant-tabs-tab {
  background-color: #1a7dd6;
  border-left: 5px solid #b2dcff;
  border-bottom: 1px solid #309dff !important;
  color: #fff;
}
.map .ant-tabs .ant-tabs-left-content {
  border-left: 1px solid #309dff;
}
.map .jc-search-input input.ant-input {
  background: transparent;
  border: none;
  color: #fff;
}
.map span.ant-input-wrapper.ant-input-group {
  height: 42px;
  button.ant-btn.ant-btn-primary.ant-input-search-button {
    height: 42px;
    border-radius: 4px;
  }
}
.map .ant-input-group .ant-input {
  height: 100%;
}
.map .jc-search-input i.ant-input-search-icon.anticon.anticon-search {
  color: #fff;
}
.map .ant-checkbox-inner {
  background-color: #1e62b2;
}
.map .ant-tooltip-inner {
  width: 300px;
  padding: 10px;
  background-color: #1e62b2;
}
.map .ant-select-selection.ant-select-selection--single {
  background: transparent;
  border: none;
  color: #fff;
}
.map .ant-select-selection__placeholder,
.map .ant-select-search__field__placeholder,
.map .ant-select-arrow .ant-select-arrow-icon {
  color: #fff;
}
.geo-box {
  width: 100%;
  text-align: center;
  .geo-name {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
  }
  .geo-btn {
    width: 60%;
    margin: 20px auto 10px;
    display: inline-flex;
    justify-content: space-between;
    div {
      background-color: #1890ff;
      color: #fff;
      padding: 6px 15px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
// 地图样式覆盖---------------
.map {
  .esri-widget--button {
    font-size: 24px;
    background-color: rgba(17, 41, 72, 0.9);
    color: #3a89d9;
    width: 42px;
    height: 42px;
    line-height: 42px;
    z-index: 999;
    // border: 1px solid #206eb1;
    [class*='esri-icon'] {
      font-size: 22px;
      display: inline-block;
    }
    &:hover {
      background: #0079c1;
      color: #e4e4e4;
    }
  }
  .esri-ui-top-right {
    top: 25px;
    right: 183px;
    // right: 225px;
  }
  #measure-bar1 {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 42px;
    // border: 1px solid #206eb1;
    .action-button {
      font-size: 22px;
      background-color: rgba(17, 41, 72, 0.9);
      color: #3a89d9;
      height: 42px;
      line-height: 42px;
      width: 42px;
      text-align: center;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      z-index: 999;
      &:hover {
        background: #0079c1;
        color: #e4e4e4;
      }
    }
  }
}
.esri-component.esri-attribution.esri-widget {
  display: none;
}
.esri-popup__button.esri-popup__button--dock {
  display: none;
}
</style>
<style lang="less" scoped>
.map {
  width: 100%;
  height: 100%;
  position: relative;
  .fullscreen {
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(17, 41, 72, 0.9);
    font-size: 26px;
    z-index: 999;
    position: absolute;
    bottom: 30px;
    right: 20px;
    cursor: pointer;
  }
  .web-map {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .left-search {
    height: 42px;
    position: absolute;
    top: 40px;
    left: 40%;
    display: inline-flex;
    z-index: 999;
    background-color: #253c56;
    align-items: center;
    z-index: 999;
    .left-search-r {
      width: 100%;
      height: 42px;
      padding: 0 10px;
      background-color: #fff;
      .left-search-r-inline {
        width: 100%;
        height: 42px;
        display: inline-flex;
        align-items: center;
      }
    }
  }

  .map-tool-tc {
    width: 32px;
    height: 32px;
    line-height: 33px;
    border: 1px solid #206eb1;
    margin-top: 50px;
    background-color: rgba(17, 41, 72, 0.9);
    text-align: center;
    color: #3e99f6;
    cursor: pointer;
    z-index: 999;
    position: absolute;
    right: 190px;
    img {
      width: 18px;
      height: 18px;
      display: inline-block;
    }
  }
  .map-right {
    position: absolute;
    z-index: 999 !important;
    flex-flow: unset;
    margin: 0 !important;
    top: 40px;
    right: 10px;
    border-radius: 5px;
    display: inline-flex;
    justify-content: flex-end;
    .mapZoom,
    .mapTools {
      display: flex;
      width: auto;
      border-radius: 5px;
      // border: 1px solid #206eb1;
      div {
        height: 42px;
        width: 42px;
        line-height: 42px;
        background-color: rgba(17, 41, 72, 0.9);
        text-align: center;
        color: #3e99f6;
        cursor: pointer;
        &:hover {
          background: #0079c1;
          color: #e4e4e4;
        }
      }
    }
    .mapZoom {
      margin-left: 20px;
      font-size: 30px;
      line-height: 42px;
      div {
        line-height: 36px;
        cursor: pointer;
        &:hover {
          background: #0079c1;
          color: #e4e4e4;
        }
      }
    }
    .psModel-box,
    .fhd-box {
      width: 330px;
      padding: 0 5px;
      background: rgba(0, 107, 200, 0.9);
      border: 1px solid #2a558e;
      position: absolute;
      top: 50px;
      right: 5px;
      z-index: 9999;
      h4 {
        // background-color: #004f98b8;
        // border-bottom: 1px solid #309dff;
        color: #4affff;
        font-size: 16px;
        line-height: 46px;
        text-align: center;
        margin: 0;
        position: relative;
      }
    }
    .psModel-box {
      width: 330px;
      padding: 0;
      background: rgba(0, 107, 200, 0.85);
      border: 1px solid #309dff;
      .my-tabs {
        width: 100%;
        border-top: 1px solid #309dff;
        .tab-tit {
          text-align: center;
          color: #b2dcff;
        }
        .tab-box {
          height: 400px;
          padding: 10px;
          overflow: auto;
          &::-webkit-scrollbar {
            width: 0 !important;
          }
        }
      }
    }
  }

  .online-jc-model {
    width: 300px;
    height: auto;
    border: 1px solid #2a558e;
    background-color: #0e152f !important;
    position: absolute;
    top: 50px;
    left: 20px;
    z-index: 999;
    .online-jc-top {
      width: 100%;
      background: #1c63ba;
      padding: 5px 15px;
      color: #fff;
      .online-jc-search {
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .jc-search-input {
          width: 200px;
          background-color: #043b6f;
          border: 1px solid #298de7;
          color: #fff;
          display: block;
          text-align: center;
        }
      }
      .online-jc-status {
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .jc-status {
          padding: 1px 10px;
          border-radius: 15px;
          font-size: 14px;
          margin: 0 2px;
          cursor: pointer;
          background-color: #697b84;
        }
      }
      .online-jc-status-all {
        width: 95%;
        margin: 10px auto;
        height: 30px;
        padding: 10px;
        color: white;
        border-radius: 4px;
        background-color: #214f88;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 4px;
      }
      .jclist {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .jclist-item {
          width: 30%;
          height: 25px;
          line-height: 25px;
          text-align: center;
          color: white;
          margin: 0 0 5px 0;
          cursor: pointer;
          margin-bottom: 15px;
          .jclist-btn {
            width: 100%;
            border-radius: 0 20px 0 20px;
            font-size: 12px;
            text-align: center;
            img {
              width: 16px;
              height: 16px;
              display: inline-block;
            }
          }
        }
      }
    }
    .online-jc-bottom {
      width: 100%;
      height: 400px;
      overflow-y: auto;
      border: 1px solid #2290f1;
      padding: 10px 5px 0 5px;
      background: #1e62b2;
      .inline-msg {
        height: 36px;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #b2dcff;
        font-size: 14px;
        padding: 0 8px;
        background: linear-gradient(to bottom left, transparent 10px, #0e7de2 0) !important;
        margin-bottom: 8px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        .label-btn {
          height: 25px;
          padding: 0 15px;
          line-height: 25px;
          border: 1px solid #00acf8;
          text-align: center;
          color: white;
          border-radius: 20px;
          margin-right: 5px;
          font-size: 12px;
          background: #00acf866;
        }
        .text {
          width: 170px;
          color: #fff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .img {
          animation: twinkling 0.5s infinite;
          font-size: 16px;
        }
        @-webkit-keyframes twinkling {
          /*透明度由0到1*/
          0% {
            opacity: 0; /*透明度为0*/
          }

          100% {
            opacity: 1; /*透明度为1*/
          }
        }
      }
    }
  }

  .msg-box {
    width: 100%;
    background-color: #0e7de2;
    padding: 10px;
    p {
      color: #fff;
      line-height: 28px;
    }
  }
  #overViewMap {
    width: 320px;
    height: 240px;
    position: absolute;
    bottom: 0;
    left: 0;
    border: 2px solid #eee;
  }
  .overViewMap-btn {
    width: 40px;
    height: 40px;
    background-color: rgba(17, 41, 72, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9999;
    cursor: pointer;
    .hide-img,
    .show-img {
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.tooltip-content {
  padding: 20px;
  color: #fff;
  font-size: 12px;
  .tooltip-content-h5 {
    font-size: 14px;
    font-weight: bold;
    color: #fff;
  }
  .tooltip-content-list {
    width: 100%;
    height: 24px;
    display: inlin-flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    img {
      width: 20px;
      height: auto;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
.sports {
  position: absolute;
  top: 100px;
  left: 30%;
  z-index: 9999;
}
</style>
