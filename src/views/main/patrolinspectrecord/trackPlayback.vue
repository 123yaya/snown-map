<template>
  <a-modal class="trackPlayback-model" :visible="trackPlayback" title="巡查轨迹回放" footer="" @cancel="hideTrack" :maskClosable="false">
    <div class="trackPlayback-content">
      <div ref="trackMap" id="trackMap" class="trackMap">
        <!-- 全屏 -->
        <div @click="optionFullscreen()" class="fullscreen">
          <i style="color:#3a89d9" v-if="!fullscreen" class="icon-btn iconfont icon-quanping"></i>
          <i style="color:#3a89d9" v-else class="icon-btn iconfont icon-tuichuzhuanhuan"></i>
        </div>
        <!-- 地图展示动态轨迹 -->
        <div class="sports">
          <a-button style="margin-right:20px" type="primary" @click="start()">开始</a-button>
          <a-button style="margin-right:20px" type="primary" @click="pause()">暂停</a-button>
          <a-button style="margin-right:20px" type="primary" @click="goOn()">继续</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { launchIntoFullscreen, exitFullscreen } from '@/utils/util'
import * as esriLoader from 'esri-loader'
import { ServiceUrl } from '@/assets/arcgis/ArcGisServe.js'
import { patrolInspectRecordTrack } from '@/api/modular/main/patrolinspectrecord/patrolInspectRecord'

export default {
  name: 'TrackPlayback',
  data () {
    return {
      carPaths: [], // 巡查轨迹
      trackPlayback: false,
      fullscreen: false,
      map: {}, // map
      mapView: null, // view
      positionCener: [129.345216551, 43.090781287],
      graphicLayer: null,
      showLoucus: true, // 轨迹回放展示操作
      // 轨迹移动图层
      moveLayer: null,
      moveCarGra: null,
      moving: null,
      startingPoint: {},
      startNum: 0,
      endNum: 0,
      modelNewCar: {
        type: 'picture-marker',
        url: process.env.VUE_APP_STATIC_URL + '/yjps_assets/app_static/map/patrol_people.png',
        width: '30px',
        height: '30px'
      }
    }
  },
  mounted () {
  },
  methods: {
    showTrack (id) {
      this.trackPlayback = true
      this.getPatrolInspectRecordTrack(id) // 获取轨迹
    },
    getPatrolInspectRecordTrack (id) {
      patrolInspectRecordTrack({ recordId: id }).then((res) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.carPaths = res.data
            this.positionCener = res.data[0]
          }
          this.initMap()
        }
      }).finally((res) => {
      })
    },
    /**
     * 初始化地图
     */
    initMap () {
      esriLoader.loadModules([
        'esri/Map',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/geometry/SpatialReference',
        'esri/views/MapView',
        'esri/widgets/Zoom',
        'esri/widgets/Fullscreen'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([Map, WebTileLayer, TileInfo, SpatialReference, MapView, Zoom, Fullscreen]) => {
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
          const baseMapLayersVec = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })
          // 矢量注记
          const baseMapLayersCva = new WebTileLayer({
            urlTemplate: 'http://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=429c2259891dc66b079f892926fa14fb',
            subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
            tileInfo,
            spatialReference
          })

          this.map = new Map({
            basemap: { baseLayers: [baseMapLayersVec, baseMapLayersCva] }
          })

          this.mapView = new MapView({
            container: this.$refs.trackMap, // 视图的容器
            map: this.map, // Map的实例放入视图中
            center: this.positionCener, // 初始显示的地图中心点，经纬度
            zoom: 13, // 当前地图缩放等级
            logo: false,
            slider: true // 开启放大缩小
          })
          this.mapView.constraints = {
            minZoom: 9,
            maxZoom: 17
          }
          this.mapView.ui._removeComponents(['zoom']) // 隐藏地图默认的缩放
          this.zoom = new Zoom({ // 自定义缩放
            view: this.mapView
          })
          this.mapView.when(() => { // 地图加载完成
            this.addLoucus() // 添加轨迹
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 地图添加动态轨迹相关
    addLoucus () {
      this.showLoucus = true
      esriLoader.loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/geometry/Polyline',
        'esri/symbols/SimpleLineSymbol'
      ]).then(
        ([GraphicsLayer, Graphic, Point, Polyline, SimpleLineSymbol]) => {
          const polyline = {
            type: 'polyline', // autocasts as new Polyline()
            paths: this.carPaths
          }
          const lineSymbol = {
            type: 'simple-line', // autocasts as SimpleLineSymbol()
            color: [226, 119, 40],
            width: 2
          }
          const polylineGraphic = new Graphic({
            geometry: polyline,
            symbol: lineSymbol
          })
          this.mapView.graphics.add(polylineGraphic)

          // 设置起点
          this.startingPoint = {
            type: 'point',
            longitude: this.carPaths[0][0],
            latitude: this.carPaths[0][1]
          }

          this.moveLayer = new GraphicsLayer({
            id: 'moveLayer'
          })
          this.moveCarGra = new Graphic({
            geometry: this.startingPoint,
            symbol: this.modelNewCar
          })
          this.moveLayer.add(this.moveCarGra)

          this.map.add(this.moveLayer)
        }).catch(err => {
          console.log(err)
        })
    },
    move (start, end) {
      // 两个点相同则跳过
      if (this.carPaths[start][0] === this.carPaths[end][0] && this.carPaths[start][1] === this.carPaths[end][1]) {
        this.move(start + 1, end + 1)
        return;
      }

      this.startNum = start
      this.endNum = end

      const x1 = this.carPaths[start][0]
      const y1 = this.carPaths[start][1]
      const x2 = this.carPaths[end][0]
      const y2 = this.carPaths[end][1]

      // 斜率
      const p = (y2 - y1) / (x2 - x1)
      // 速度
      const v = 0.0001 // 过小会导致线路偏移
      this.moving = setInterval(() => {
        this.moveLayer.removeAll()
        // 分别计算 x,y轴的方向和速度
        if (Math.abs(p) === Number.POSITIVE_INFINITY) {
          // 垂直的时候斜率无穷大
          if (y2 > y1) {
            this.moveCarGra.geometry.y += v
          } else {
            this.moveCarGra.geometry.y -= v
          }
        } else {
          if (x2 < x1) {
            this.moveCarGra.geometry.x -= (1 / Math.sqrt(1 + p * p)) * v
            this.moveCarGra.geometry.y -= (p / Math.sqrt(1 + p * p)) * v
          } else {
            this.moveCarGra.geometry.x += (1 / Math.sqrt(1 + p * p)) * v
            this.moveCarGra.geometry.y += (p / Math.sqrt(1 + p * p)) * v
          }
        }

        if ((x2 >= x1 && this.moveCarGra.geometry.x >= x2) || (x2 <= x1 && this.moveCarGra.geometry.x <= x2) || (y2 >= y1 && this.moveCarGra.geometry.y >= y2) || (y2 <= y1 && this.moveCarGra.geometry.y <= y2)) {
          this.moveCarGra.geometry.x = x2
          this.moveCarGra.geometry.y = y2
          this.addCurGraphic()
          clearInterval(this.moving)
          if (end < this.carPaths.length-1) {
            this.move(start + 1, end + 1)
          }
        }

        // 创建行驶车辆
        this.addCurGraphic()
      }, 50)
    },
    // 创建行驶车辆
    addCurGraphic () {
      // 创建行驶车辆
      esriLoader.loadModules([
        'esri/Graphic'
      ]).then(
        ([Graphic]) => {
          const curGraphic = new Graphic({
            geometry: this.moveCarGra.geometry,
            symbol: this.modelNewCar
          })
          this.moveLayer.add(curGraphic)
        })
    },
    // 开始
    start () {
      if (this.moving !== undefined) {
        clearInterval(this.moving) // 清除移动
      }
      this.moveCarGra.geometry = this.startingPoint
      this.move(0, 1)
    },
    // 暂停
    pause () {
      clearInterval(this.moving)
    },
    // 继续
    goOn () {
      if (this.moving !== undefined) {
        clearInterval(this.moving) // 清除移动
      }
      this.move(this.startNum, this.endNum)
    },
    hideTrack () {
      if (this.moving != null) {
        clearInterval(this.moving) // 清除移动
      }
      this.moveLayer.removeAll()

      this.trackPlayback = false
    },
    optionFullscreen () {
      if (this.fullscreen) {
        exitFullscreen()
        this.fullscreen = !this.fullscreen
      } else {
        const full = document.getElementById('trackMap')
        launchIntoFullscreen(full)
        this.fullscreen = !this.fullscreen
      }
    }
  }
}
</script>
<style>
.trackPlayback-model.ant-modal {
  width: 960px !important;
}
.esri-component.esri-attribution.esri-widget {
  display: none;
}
</style>
<style lang="less" scoped>
.trackPlayback-content {
  width: 100%;
  text-align: center;
  .trackMap {
    width: 100%;
    height: 560px;
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
    .sports {
      width: 100%;
      display: inline-flex;
      justify-content: center;
      position: absolute;
      top: 10px;
      left: 0;
    }
  }
}
</style>
