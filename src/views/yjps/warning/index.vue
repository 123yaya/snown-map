<template>
  <div class="warning-map" id="container">
    <!-- 全屏 -->
    <div @click="optionFullscreen()" class="fullscreen">
      <i style="color:#3a89d9" v-if="!fullscreen" class="icon-btn iconfont icon-quanping"></i>
      <i style="color:#3a89d9" v-else class="icon-btn iconfont icon-tuichuzhuanhuan"></i>
    </div>
    <!-- 地图 -->
    <div id="map" class="web-map">
    </div>

    <!-- 右侧图例相关 -->
    <div class="map-right">
      <div class="mapTools">
        <!-- 测量 -->
        <div id="measure-bar2">
          <a-tooltip placement="top" title="测量距离">
            <div @click="measureDistance()" id="distance-btn" class="action-button esri-icon-measure-line">
            </div>
          </a-tooltip>
          <a-tooltip placement="top" title="测量面积">
            <div @click="measureArea()" id="area-btn" class="action-button esri-icon-measure-area">
            </div>
          </a-tooltip>
          <a-tooltip placement="top" title="清除测量">
            <div @click="clearMeasure()" class="action-button" style="line-height:36px;color:
          #3a89d9;z-index: 999;"><img src="@/assets/map/4.png" alt=""></div>
          </a-tooltip>
        </div>
      </div>
      <div class="mapZoom">
        <a-tooltip placement="top" title="放大">
          <div @click="mapZoom(1)">+</div>
        </a-tooltip>
        <a-tooltip placement="top" title="缩小">
          <div @click="mapZoom(0)">-</div>
        </a-tooltip>
      </div>
    </div>

    <div class="btns">
      <a-button type="primary" style="margin-right:10px" @click="$refs.newsModel.showNewsModel()" class="a-button">消息通知</a-button>
      <a-button type="primary" style="margin-right:10px" @click="editWarning('new')" class="a-button">预案启动</a-button>
      <a-button type="primary" style="margin-right:10px" @click="addTask()" class="a-button">新增任务</a-button>
    </div>
    <div class="bottom-menu">
      <div v-for="menu in bottomMenu" @click="showMenu(menu.id)" :key="menu.id" :class="allType.indexOf(menu.id)>-1?'bottom-menu-item activeMode':'bottom-menu-item'">
        <img :src="menu.url" alt="">
        <h5>{{ menu.name }}</h5>
      </div>
    </div>
    <div class="reservePlan-content" v-if="showNewTask">
      <div class="reservePlan-inline">
        <a-input class="cph-input" :value="taskName" @change="changeTaskName" placeholder="请输入名称" />
        <a-select class="pq-select" :value="taskType" @change="changeTaskType" placeholder="请选择类型">
          <a-select-option value="巡防点">巡防点</a-select-option>
          <a-select-option value="驻防点">驻防点</a-select-option>
        </a-select>
      </div>
      <a-button class="reservePlan-btn" @click="confirmAddTask">确定</a-button>
    </div>
    <!-- 液位概览 -->
    <liquid-level-station ref="liquidLevelStation"></liquid-level-station>
    <!-- 雨量站概览 -->
    <rainfall-station ref="rainfallStation"></rainfall-station>
    <!-- 流量站概览 -->
    <flow-station ref="flowStation"></flow-station>
    <!-- 视频详情 -->
    <video-detail ref="videoDetail"></video-detail>
    <yld-video ref="yldVideo"></yld-video>
    <!--预案启动 -->
    <plan-start ref="planStart"></plan-start>
    <ec-starting ref="ecStarting"></ec-starting>
    <!-- 消息通知框 -->
    <news-model ref="newsModel"></news-model>
    <!-- 进度详情 -->
    <progress-detail ref="progressDetail"></progress-detail>
    <!-- 任务调度队伍列表 -->
    <task-team-list ref="taskTeamList"></task-team-list>
    <!-- 任务调度中 -->
    <task-doing ref="taskDoing"></task-doing>
  </div>
</template>

<script>
import { findIndexByKeyValue, launchIntoFullscreen, exitFullscreen } from '@/utils/util'
import { message } from 'ant-design-vue/es'

import * as esriLoader from 'esri-loader'
import { ServiceUrl } from '@/assets/arcgis/ArcGisServe.js'
import { earlyWarnCurrentStarted } from '@/api/modular/main/earlywarnstart/earlyWarnStartManage'
import { schedulingTaskAdd, schedulingTaskList } from '@/api/modular/main/schedulingtask/schedulingTaskManage'
import yldVideo from './components/yldVideo'
import planStart from './components/planStart'
import newsModel from './components/newsModel'
import progressDetail from './components/progressDetail'
import taskTeamList from './components/taskTeamList'
import taskDoing from './components/taskDoing'
import ecStarting from './components/ecStarting'
import liquidLevelStation from '../welcome/components/liquidLevelStation'
import rainfallStation from '../welcome/components/rainfallStation'
import flowStation from '../welcome/components/flowStation'
import videoDetail from '../welcome/components/videoDetail'

import {
  geoPointyld, geoPointylj, geoPointyj, geoPointJcsb5, geoPointJcsb6
} from './mock.js'
import { oneMapFacilityCoordinates } from '@/api/modular/main/onemap/oneMapManage'
import { cameraInfoDetail } from '@/api/modular/main/camerainfo/cameraInfoManage'
message.config({
  top: 120,
  duration: 2,
  maxCount: 1
})
export default {
  name: 'Warning',
  components: {
    yldVideo,
    videoDetail,
    planStart,
    newsModel,
    progressDetail,
    taskTeamList,
    taskDoing,
    ecStarting,
    liquidLevelStation,
    rainfallStation,
    flowStation
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
      mapCenter: [129.509089271, 42.891117162],
      featureLayers: [], // layerFrus图层
      layerFrus: {}, // layerFrus图层
      pointGraphicLayer: null, // 坐标定位图层
      pointGraphic: null, // 坐标定位点
      isPlanStart: false, // 是否有预案启动
      currentPlanStart: null, // 当前正在启动的预案信息
      showNewTask: false, // 新增任务弹框是否显示
      isTaskDoing: false, // 是否任务调度中
      taskLongitude: '', // 新增任务经度
      taskLatitude: '', // 新增任务纬度
      taskName: '', // 新增任务点名称
      taskType: undefined, // 新增任务类型
      geoPointyld: geoPointyld, // 易涝点
      geoPointylj: geoPointylj, // 雨量计
      geoPointyj: geoPointyj, // 检查井
      geoPointJcsb5: geoPointJcsb5, // 闸站
      geoPointJcsb6: geoPointJcsb6, // 泵站
      rwPoints: [], // 调度任务点
      num: 1,
      showTaskTeamBtn: false, // 是否显示调度按钮
      allType: [],
      bottomMenu: [
        { id: 1, name: '泵闸站', url: require('@/assets/warn/bz.png') },
        { id: 2, name: '液位计', url: require('@/assets/warn/yl.png') },
        { id: 3, name: '雨量计', url: require('@/assets/warn/ylj.png') },
        { id: 4, name: '流量计', url: require('@/assets/warn/yj.png') },
        { id: 5, name: '易涝点视频', url: require('@/assets/warn/yldsp.png') }
      ]
    }
  },
  mounted () {
    this.initMap()
    this.earlyWarnCurrent()
  },
  methods: {
    /**
     * 初始化地图
     */
    initMap () {
      const that = this
      esriLoader.loadModules([
        'esri/Map',
        'esri/layers/TileLayer',
        'esri/views/MapView',
        'esri/widgets/Zoom',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/geometry/SpatialReference',
        'esri/widgets/Fullscreen',
        'esri/widgets/Locate',
        'esri/Graphic',
        'esri/geometry/Extent',
        'esri/layers/GraphicsLayer',
        'esri/core/watchUtils',
        'esri/layers/WMSLayer'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([Map, TileLayer, MapView, Zoom, WebTileLayer, TileInfo, SpatialReference, Fullscreen, Locate, Graphic, Extent, GraphicsLayer, watchUtils, WMSLayer]) => {
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
            center: this.mapCenter, // 初始显示的地图中心点，经纬度
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

          this.mapView.ui.add('measure-bar2', 'top-right') // 测量工具

          this.mapView.when(() => { // 地图加载完成
            this.$refs.newsModel.showNewsModel()
            this.loadTaskPoint()
          })

          this.mapView.on('click', function (e) {
            if (that.isTaskDoing) {
              that.mapView.hitTest(e).then(function (response) {
                if (response.results.length > 0) {
                  message.error('任务点已存在!')
                  if (that.pointGraphicLayer && that.pointGraphic) {
                    that.pointGraphicLayer.remove(that.pointGraphic)
                  }
                  that.showNewTask = false
                } else {
                  // const curLngLat = webMercatorUtils.xyToLngLat(e.mapPoint.x, e.mapPoint.y)
                  that.taskLongitude = e.mapPoint.x
                  that.taskLatitude = e.mapPoint.y
                  that.showNewTask = true
                  that.drawPoint(that.taskLongitude, that.taskLatitude)
                }
              })
            }
          })

          this.mapView.popup.on('trigger-action', event => {
            const { id } = event.action
            const attributes = this.mapView.popup.selectedFeature.attributes
            if (id === 'ylzView') {
              that.$refs.rainfallStation.showRainfallStation(id, attributes.id)
            } else if (id === 'llView') {
              that.$refs.flowStation.showFlowStation(id, attributes.id)
            } else if (id === 'ywjczView') {
              that.$refs.liquidLevelStation.showLiquidLevelStation(id, attributes.id)
            } else if (id === 'videoDetail') {
              that.$refs.videoDetail.showVideoDetail(attributes.id)
            } else if (id === 'ddrwDetail') {
              that.$refs.progressDetail.showProgressDetail(attributes.id)
            } else if (id === 'taskTeamList') {
              that.$refs.taskTeamList.showTaskTeamList(that.currentPlanStart, attributes.id)
            }
          })
        }).catch(err => {
          console.log(err)
        })
    },
    // 获取调度任务坐标点
    loadTaskPoint () {
      const that = this
      this.rwPoints = []
      schedulingTaskList({}).then((res) => {
        if (res.success) {
          for (let i = 0; i < res.data.length; i++) {
            that.rwPoints.push({
              geometry: {
                type: 'point',
                x: res.data[i].longitude,
                y: res.data[i].latitude
              },
              attributes: res.data[i]
            })
          }

          that.addFeatureLayer(this.rwPoints, 'ddrw', require('@/assets/mapIcon/icon-defense-point3.png'), 40)
        }
      }).finally((res) => {
      })
    },
    // 获取当前启动的预案
    earlyWarnCurrent () {
      earlyWarnCurrentStarted({}).then((res) => {
        if (res.success) {
          this.currentPlanStart = res.data
          if (res.data == null) {
            this.isPlanStart = false
          } else {
            this.isPlanStart = true
            this.$refs.ecStarting.showEcStarting(res.data)
          }
        } else {
        }
      }).finally((res) => {
      })
    },
    showMenu (type) {
      if (this.allType.indexOf(type) < 0) {
        this.allType.push(type)
      } else {
        const newData = this.allType.filter(item => item !== type)
        this.allType = newData
      }
      console.log('this.allType', this.allType)
      if (type === 1) {
        // 泵站
        this.addFeatureLayer(this.geoPointJcsb6, 'bz', require('@/assets/mapIcon/bengzhan2.png'), 20)
        // 闸站
        this.addFeatureLayer(this.geoPointJcsb5, 'zz', require('@/assets/mapIcon/bengzhan2.png'), 20)
      } else if (type === 2) {
        // 液位计
        this.getOneMapFacilityCoordinates('ywjcz', 'ywjcz', require('@/assets/mapIcon/yilaodian.png'))
        // this.addFeatureLayer(this.geoPointyld, 'yld', require('@/assets/mapIcon/yilaodian.png'), 40)
      } else if (type === 3) {
        // 雨量计
        this.getOneMapFacilityCoordinates('ylz', 'ylz', require('@/assets/mapIcon/yuliangji.png'))
        // this.addFeatureLayer(this.geoPointylj, 'ylj', require('@/assets/mapIcon/yuliangji.png'), 40)
      } else if (type === 4) {
        // 流量计
        this.getOneMapFacilityCoordinates('ll', 'll', require('@/assets/mapIcon/yinjing.png'))
        // this.addFeatureLayer(this.geoPointyj, 'yj', require('@/assets/mapIcon/yinjing.png'), 40)
      } else {
        // 易涝点视频
        // this.$refs.yldVideo.showYldVideo()
        this.getOneMapFacilityCoordinates('sp', 'yldsp', require('@/assets/warn/yldsp.png'))
      }
    },
    getOneMapFacilityCoordinates (type, layer, img) {
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

          this.addFeatureLayer(normalList, layer, img, 30)
        }
      })
    },
    /**
     * 去地图某个已知经纬度
     */
    mapGoTo (longitude, latitude) {
      this.mapView.goTo({
        target: [Number(longitude), Number(latitude)],
        zoom: 20,
        heading: 48,
        tilt: 40
      }, {
        duration: 2000 // 视角跳转时长为2秒
      }).then(function () {
      })
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
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(([FeatureLayer]) => {
        // 需要判断去重  即没有该图层再添加
        if (findIndexByKeyValue(that.featureLayers, 'id', objectId) < 0) {
          let fields = null
          let popupTemplate = null
          fields = [
            { name: 'id', type: 'oid' },
            { name: 'name', type: 'string' },
            { name: 'label', type: 'string' }
          ]
          // 弹出框的内容
          if (objectId === 'ylz') { // 雨量
            popupTemplate = {
              title: '{name}',
              actions: [
                {
                  title: '概览',
                  id: 'ylzView',
                  className: 'esri-icon-maximize'
                }
              ]
            }
          } else if (objectId === 'll') { // 流量
            popupTemplate = {
              title: '{name}',
              actions: [
                {
                  title: '概览',
                  id: 'llView',
                  className: 'esri-icon-maximize'
                }]
            }
          } else if (objectId === 'ywjcz') {
            popupTemplate = {
              title: '{name}',
              actions: [
                {
                  title: '概览',
                  id: 'ywjczView',
                  className: 'esri-icon-maximize'
                }]
            }
          } else if (objectId === 'yldsp') { // 视频
            fields = [
              { name: 'id', type: 'oid' },
              { name: 'name', type: 'string' },
              { name: 'label', type: 'string' }
            ]

            popupTemplate = {
              title: '{name}',
              content: this.getSpContent,
              actions: [
                {
                  title: '预览',
                  id: 'videoDetail',
                  className: 'esri-icon-minimize'
                }
              ]
            }
          } else if (objectId === 'ddrw') {
            fields = [
              { name: 'id', type: 'oid' },
              { name: 'name', type: 'string' },
              { name: 'status', type: 'string' }
            ]

            popupTemplate = {
              title: '{name}',
              outFields: ['*'],
              content: this.getRwContent,
              overwriteActions: true, // 隐藏默认的缩放按钮
              actions: [
                {
                  title: '查看详情',
                  id: 'ddrwDetail',
                  className: 'esri-icon-minimize'
                }, {
                  title: '调度',
                  id: 'taskTeamList',
                  className: 'esri-icon-minimize'
                }
              ]
            }
          } else {
            fields = [
              { name: 'id', type: 'oid' },
              { name: 'name', type: 'string' },
              { name: 'label', type: 'string' }
            ]

            popupTemplate = {
              title: '{name}',
              content: '<div class="model-inline"><p>上游水位:<span>0.18m</span></p></div>' +
                '<div class="model-inline"><p>下游水位:<span>0.24m</span></p></div>' +
                '<div class="model-inline"><p>开闸水位:<span>-m</span></p></div>'
            }
          }

          that.layerFrus = new FeatureLayer({
            id: objectId,
            source: geoPoint,
            // objectIdField: 'id',
            fields: fields,
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
        } else {
          this.deleteSelFeature(objectId)
          this.featureLayers = this.featureLayers.filter(v => v.id !== objectId)
          // that.$message.warning('该图层已存在，请勿重复添加！')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 任务点弹框内容
    getRwContent (feature) {
      const graphic = feature.graphic
      const attributes = graphic.attributes

      return '<div class="model-inline"><p>编号:<span>{id}</span></p><p>状态:<span>' + (attributes.status === '2' ? '已调度' : '待调度') + '</span></p></div>' +
        '<div class="model-inline"><p>预警分类:<span>常规预警</span></p><p>级别:<span>一级</span></p></div>' +
        '<div class="model-inline"><p>预警地点:<span>延吉市</span></p></div>'
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
    /**
     * 新增任务
     */
    addTask () {
      if (this.isPlanStart) {
        this.$refs.taskDoing.showTaskDoing()
        this.isTaskDoing = true
      } else {
        message.error('请先启动预案!')
      }
    },
    /**
     * 坐标定位
     */
    drawPoint (longitude, latitude) {
      // 创建图形点
      esriLoader.loadModules([
        'esri/Graphic',
        'esri/layers/GraphicsLayer'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(([Graphic, GraphicsLayer]) => {
        if (this.pointGraphic && this.pointGraphic.visible) {
          this.pointGraphicLayer.remove(this.pointGraphic)
        }
        this.pointGraphic = new Graphic({
          geometry: {
            type: 'point',
            longitude: longitude,
            latitude: latitude
          },
          symbol: {
            type: 'picture-marker',
            url: require('@/assets/marker/local.png'),
            width: '32px',
            height: '32px'
          }
        })
        this.pointGraphicLayer = new GraphicsLayer()
        this.pointGraphicLayer.add(this.pointGraphic)
        this.map.add(this.pointGraphicLayer)
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增调度任务
    confirmAddTask () {
      const that = this
      const params = {
        name: this.taskName,
        type: this.taskType,
        longitude: this.taskLongitude,
        latitude: this.taskLatitude,
        status: '0'
      }
      schedulingTaskAdd(params).then((res) => {
        if (res.success) {
          // 清除坐标定位
          that.pointGraphicLayer.remove(this.pointGraphic)
          that.rwPoints.push({
            geometry: {
              type: 'point',
              x: res.data.longitude,
              y: res.data.latitude
            },
            attributes: res.data
          })
          that.deleteSelFeature('ddrw')
          that.featureLayers = that.featureLayers.filter(v => v.id !== 'ddrw')

          that.addFeatureLayer(that.rwPoints, 'ddrw', require('@/assets/mapIcon/icon-defense-point3.png'), 40)
          that.showNewTask = false
        } else {
          that.$message.error('操作失败')
        }
      }).finally((res) => {
      })
    },
    // 预案启动升级降级
    editWarning (type, planInfo) {
      if (type === 'new') {
        if (this.isPlanStart) {
          message.error('已有启动预案，请结束后再启动！')
          return
        }
      }
      this.$refs.planStart.showPlanStart(type, planInfo)
    },
    changeTaskName (e) {
      this.taskName = e.target.value
    },
    changeTaskType (e) {
      this.taskType = e
    },
    // 结束任务调度中状态
    stopTaskDoing () {
      this.isTaskDoing = false
      // 关闭调度框
      this.showNewTask = false
      // 清除地图标点

      if (this.pointGraphicLayer && this.pointGraphic) {
        this.pointGraphicLayer.remove(this.pointGraphic)
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
    }
    // 地图操作-----------------end
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

.warning-map .ant-tabs-tab {
  border-bottom: 1px solid #309dff;
}
.warning-map .ant-tabs .ant-tabs-left-bar .ant-tabs-tab {
  margin: 0;
}
.warning-map .ant-tabs-tab-active.ant-tabs-tab {
  background-color: #1a7dd6;
  border-left: 5px solid #b2dcff;
  color: #fff;
}
.warning-map .ant-tabs .ant-tabs-left-content {
  border-left: 1px solid #309dff;
}
.warning-map .jc-search-input input.ant-input {
  background: transparent;
  border: none;
  color: #fff;
}
.warning-map span.ant-input-wrapper.ant-input-group {
  height: 42px;
  button.ant-btn.ant-btn-primary.ant-input-search-button {
    height: 42px;
    border-radius: 4px;
  }
}
.warning-map .ant-input-group .ant-input {
  height: 100%;
}
.warning-map .jc-search-input i.ant-input-search-icon.anticon.anticon-search {
  color: #fff;
}
.warning-map .ant-checkbox-inner {
  background-color: #1e62b2;
}
.warning-map .ant-tooltip-inner {
  width: 300px;
  padding: 10px;
  background-color: #1e62b2;
}
.warning-map .ant-select-selection.ant-select-selection--single {
  background: transparent;
  border: none;
  color: #fff;
}

// 地图样式覆盖---------------
.warning-map {
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
    right: 120px;
  }
  #measure-bar2 {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 42px;
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
// esri-popup__header-container
.esri-popup__pointer-direction.esri-popup--shadow,
.esri-popup__main-container.esri-widget {
  background-color: #0e7de2;
}
.esri-popup__inline-actions-container > .esri-popup__action {
  color: #fff;
}
section.esri-popup__navigation {
  background: transparent;
}
.esri-popup__header-container--button:hover,
.esri-popup__inline-actions-container .esri-popup__button:hover,
.esri-popup__header-buttons:hover,
header.esri-popup__header:hover,
h2.esri-widget__heading.esri-popup__header-title:hover,
header.esri-popup__header {
  background-color: #1c63ba;
  color: #fff;
}

.esri-popup__button,
.esri-popup__header-buttons,
h2.esri-widget__heading.esri-popup__header-title {
  color: #fff;
}
.esri-feature-content {
  padding: 10px 0;
  background-color: #0e7de2;
  .model-inline {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    p {
      width: 48%;
      color: #eee;
      text-align: left;
      span {
        color: #e1eaf9;
        font-weight: bold;
        padding-left: 5px;
      }
    }
  }
  p {
    color: #eee;
  }
}
</style>
<style lang="less" scoped>
.warning-map {
  width: 100%;
  text-align: center;
  height: calc(100vh - 80px);
  overflow: hidden;
  position: relative;
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
  }
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
  .bottom-menu {
    width: 1000px;
    height: 100px;
    margin: 0 auto;
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: calc(50% - 500px);
    background-color: #2f4456;
    border-radius: 120px 120px 0 0;
    padding: 0 100px 20px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    .bottom-menu-item {
      text-align: center;
      margin-top: -35px;
      cursor: pointer;
      &.activeMode {
        transform: translateY(-22px);
      }
      img {
        width: 90px;
        height: 90px;
        margin-bottom: 3px;
      }
      h5 {
        text-align: center;
        color: #d0e9fd;
        font-size: 20px;
        font-weight: bolder;
      }
    }
  }
  .btns {
    width: 1000px;
    position: absolute;
    bottom: 180px;
    left: calc(50% - 500px);
    z-index: 5;
  }
  .reservePlan-content {
    width: 430px;
    padding: 15px;
    background-color: #0565b0;
    border-radius: 4px;
    text-align: center;
    color: #4affff;
    font-size: 22px;
    position: absolute;
    left: calc(50% - 200px);
    top: 140px;
    z-index: 99;
    .reservePlan-inline {
      width: 100%;
      height: 45px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .cph-input {
        width: 240px;
        background: transparent;
        border: 1px solid #4ac0c4;
        color: #29b5d9 !important;
      }
      .pq-select {
        width: 140px;
        height: 32px;
        line-height: 32px;
        margin: 0 0 0 20px;
        background: transparent;
        border: 1px solid #4ac0c4;
        color: #29b5d9;
      }
    }
    .reservePlan-btn {
      margin: 10px auto;
      background: #1890ff;
      color: #fff;
      border: none;
    }
  }
}
</style>
