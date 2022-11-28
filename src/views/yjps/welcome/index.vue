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
        <div id="measure-bar">
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
      <!-- 防患点管理 -->
      <div class="fhd-box" v-if="showYhd">
        <h4>防患点管理</h4>
        <a-table class="my-table" :columns="fhdColumns" :data-source="fhdData" :pagination="{ pageSize: 10 }" :rowKey="record => record.id">
          <template slot="operation" slot-scope="text,record">
            <span type="text" :title="text" @click="showYhdDetail(record)" style="color:#4affff;cursor: pointer;">详情</span>
          </template>
        </a-table>
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
                <a-checkbox-group v-model="jcsbRightChecked" @change="changeRightChecked">
                  <a-checkbox class="sblist-item" v-for="jcs in jcsbData" :value="jcs.value" :key="jcs.id" @change="value => changeCheckedOne(value, 'right')">
                    {{ jcs.label }}
                  </a-checkbox>
                </a-checkbox-group>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>

    <!-- 中间搜索 -->
    <div class="left-search">
      <div class="left-search-l">
        <a-select ref="select" :value="searchVal" style="width: 100px" @change="searchChange">
          <a-select-option v-for="item in searchData" :key="item.value" :value="item.value">{{ item.name }}</a-select-option>
        </a-select>
      </div>
      <div class="left-search-r">
        <a-input-search v-if="searchVal==1" style="width: 300px;margin: 5px auto;" v-model="searchFacilityInput" placeholder="可查询作业编号、道路名和地标名" size="default" @search="facilitySearch" />
        <div class="left-search-r-inline" v-else>
          <a-input :value="longitude" style="width: 135px;margin-right: 12px;" @change="changeLongitude" placeholder="经度" />
          <a-input :value="latitude" style="width: 135px" @change="changeLatitude" placeholder="纬度" />
        </div>
      </div>
      <!-- 搜索结果展示 -->
    </div>
    <div class="search-result" v-if="showSearchResult">
      <img class="close-img" src="@/assets/map/close.png" alt="" @click="showSearchResult=!showSearchResult">
      <div v-if="searchFacilityData.length>0">
        <div v-for="item in searchFacilityData" :key="item.type">
          <h6>{{ item.type }}</h6>
          <div class="search-result-item" v-for="li in item.list" :key="li.id" @click="mapViewGoTo(li.longitude, li.latitude)">
            {{ li.title }}
          </div>
        </div>
      </div>
      <div v-else>暂无搜索结果---</div>
    </div>
    <!-- 左侧在线监测搜索弹窗 -->
    <div class="online-jc-model" v-if="showOnlineJc">
      <div class="online-jc-top">
        <div class="online-jc-search">
          <a-input-search class="jc-search-input" v-model="searchOnlineJc" placeholder="请输入搜索关键字" @search="onSearchOnlineJc" />
          <span @click="()=>{ showOnlineJcBottom = !showOnlineJcBottom }">
            <i style="font-size: 0.92vw;cursor: pointer;" v-if="showOnlineJcBottom" class="iconfont icon-xiangxiajiantou"></i>
            <i style="font-size: 0.92vw;cursor: pointer;" v-if="!showOnlineJcBottom" class="iconfont icon-xiangshangjiantou"></i>
          </span>
        </div>
        <div class="online-jc-status">
          <span style="padding-right: 15px">状态</span>
          <div class="jc-status" v-for="status in onlineJcStatus" :key="status.id" :title="status.tip" :style="{'background-color':status.color}"> {{ status.num }} </div>
        </div>
        <div class="online-jc-status-all">
          <span>状态全选</span>
          <a-switch v-model="showAllJc" @change="changeShowAllJc" />
        </div>
        <a-checkbox-group class="jclist" v-model="jcsbLeftChecked" @change="changeLeftChecked">
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.ywjcz).length>0" :value="'ywjcz'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('ywjcz')>-1&&leftAllList.ywjcz.totalNum?leftAllList.ywjcz.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('ywjcz')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                液位 <img :src="require('@/assets/jcd/11.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.bz).length>0" :value="'bz'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('bz')>-1&&leftAllList.bz.totalNum?leftAllList.bz.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('bz')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                泵站 <img :src="require('@/assets/jcd/4.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.zz).length>0" :value="'zz'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('zz')>-1&&leftAllList.zz.totalNum?leftAllList.zz.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('zz')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                闸站 <img :src="require('@/assets/jcd/5.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.jcj).length>0" :value="'jcj'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('jcj')>-1&&leftAllList.jcj.totalNum?leftAllList.jcj.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('jcj')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                检查井 <img :src="require('@/assets/jcd/11.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.ylz).length>0" :value="'ylz'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('ylz')>-1&&leftAllList.ylz.totalNum?leftAllList.ylz.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('ylz')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                雨量站 <img :src="require('@/assets/jcd/2.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.ll).length>0" :value="'ll'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('ll')>-1&&leftAllList.ll.totalNum?leftAllList.ll.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('ll')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                流量 <img :src="require('@/assets/jcd/7.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.yld).length>0" :value="'yld'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('yld')>-1&&leftAllList.yld.totalNum?leftAllList.yld.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('yld')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                易涝点 <img :src="require('@/assets/jcd/10.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
          <a-checkbox class="jclist-item" v-if="Object.values(leftAllList.hdsw).length>0" :value="'hdsw'" @change="value => changeCheckedOne(value, 'left')">
            <a-badge :count="jcsbLeftChecked.indexOf('hdsw')>-1&&leftAllList.hdsw.totalNum?leftAllList.hdsw.totalNum:null">
              <div :class="jcsbLeftChecked.indexOf('hdsw')>-1?'jclist-btn  jclist-btn-act':'jclist-btn'">
                河道水位 <img :src="require('@/assets/jcd/1.png')" alt="">
              </div>
            </a-badge>
          </a-checkbox>
        </a-checkbox-group>
        <div class="search-jctype">
          <div style="margin-top: 10px;">
            <a-select :value="selectJcXm" style="width: 80px" placeholder="项目">
              <a-select-option :value="0">全部项目</a-select-option>
            </a-select>
            <a-select :value="selectJcPq" style="width: 80px" placeholder="片区">
              <a-select-option :value="0">全部片区</a-select-option>
            </a-select>
            <a-select :value="selectJcXt" style="width: 90px" placeholder="污水系统">
              <a-select-option :value="0">全部系统</a-select-option>
            </a-select>
          </div>
        </div>
      </div>
      <div class="online-jc-bottom" v-if="showOnlineJcBottom">
        <a-tooltip placement="right" class="my-tooltip" color="#1e62b2" v-for="data in leftBottomList" :key="data.id" :arrowPointAtCenter="true">
          <template #title>
            <div class="msg-box" v-html="tooltipValue">
            </div>
          </template>
          <div class="inline-msg" @mouseenter="showToolTip(data)" @click="mapViewGoTo(data.longitude, data.latitude,data.type,data.id)">
            <div class="label-btn">{{ data.typeName }}</div>
            <div class="label-right">
              <span class="text">{{ data.title }}</span>
              <!-- 图标 -->
              <span class="img">
                <i style="color:red" class="iconfont icon-lixian" v-if="data.status === 'warn'"></i>
                <i style="color:#ffa600" class="iconfont icon-jianceyujing" v-if="data.status === 'warn'"></i>
              </span>
            </div>
          </div>
        </a-tooltip>
      </div>
      <div>
        <!-- 隐患点详情 -->
        <yhd-detail ref="yhdDetails" />
      </div>
    </div>
    <!-- 液位概览 -->
    <liquid-level-station ref="liquidLevelStation"></liquid-level-station>
    <!-- 液位详情 -->
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
    <table-detail ref="tableDetail"></table-detail>
  </div>
</template>

<script>
import { arrAddItem, arrRemoveItem, launchIntoFullscreen, exitFullscreen, _getMercator } from '@/utils/util'
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
import tableDetail from './components/tableDetail'
import {
  searchData, fhdColumns, fhdData, dttcData, gwssData, ywtcData, jcsbData
} from './mock.js'
import { oneMapYwCoordinates, oneMapFacilityCoordinates, oneMapFacilityStatistics, oneMapFacilityInquiry } from '@/api/modular/main/onemap/oneMapManage'
import { wwtpDetail } from '@/api/modular/main/wwtp/wwtpManage'
import { dischargerDetail } from '@/api/modular/main/discharger/dischargerManage'
import { outletEnterpriseDetail } from '@/api/modular/main/outletenterprise/outletEnterpriseManage'
import { pumpstationDetail } from '@/api/modular/main/pumpstation/pumpstationManage'
import { gateDetail } from '@/api/modular/main/gate/gateManage'
import { cameraInfoDetail } from '@/api/modular/main/camerainfo/cameraInfoManage'
import { monitorDetail } from '@/api/modular/main/monitor/monitorManage'
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
      searchVal: 1, // 搜索选中
      showYhd: false, // 隐患点管理
      showOnlineJc: true, // 在线监测弹窗
      searchOnlineJc: '', // 在线检测搜索
      showOnlineJcBottom: true, // 在线检测下部分内容是否显示
      showAllJc: true, // 显示所有检测项
      selectJcXm: 0, // 项目
      selectJcPq: 0, // 片区
      selectJcXt: 0, // 系统
      searchData: searchData,
      searchFacilityInput: '', // 设施查询
      showSearchResult: false,
      searchFacilityData: [], // 设施查询结果列表
      longitude: 129.509089271, // 经度
      latitude: 42.891117162, // 纬度
      showPsModel: false, // 排水设施显示
      showWaterQualityLayer: false, // 水质
      activeKey: '1', // 排水设施显示管理当前选中项
      showOverViewMapZindex: -1, // 是否显示鹰眼
      fhdColumns: fhdColumns,
      fhdData: fhdData,
      dttcData: dttcData,
      gwssData: gwssData,
      ywtcData: ywtcData,
      jcsbData: jcsbData,
      dttcChecked: '1',
      gwssChecked: [],
      ywtcChecked: [],
      // jcsbRightChecked: ['ylz', 'll', 'zz', 'bz'],
      jcsbRightChecked: ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw'],
      jcsbLeftChecked: ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw'],
      leftAllList: {
        ywjcz: {},
        bz: {},
        zz: {},
        jcj: {},
        ylz: {},
        ll: {},
        yld: {},
        hdsw: {}
      },
      onlineJcStatus: [
        { id: 1, num: 0, color: '#07B83C', tip: '正常' },
        { id: 2, num: 0, color: '#DEC523', tip: '预警' },
        { id: 3, num: 0, color: '#FF8000', tip: '溢流' },
        { id: 4, num: 0, color: '#FF0000', tip: '报警' },
        { id: 5, num: 0, color: '#1b4154', tip: '离线' }
      ],
      leftBottomList: [],
      mapClickChange: null,
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
      gisWellDl: null, // 道路名
      gisPipelineDl: null, // 道路名
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
      },
      tooltipValue: ''
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
          const initialExtent = new Extent({
            xmax: 12632095.378883693,
            xmin: 12301887.416691732,
            ymax: 3822101.0463749063,
            ymin: 3690323.609611262,
            spatialReference: {
              wkid: 102100
            }
          })
          this.map = new Map({
            basemap: { baseLayers: [this.baseMapLayers.vec, this.baseMapLayers.cva] }
          })

          this.mapView = new MapView({
            container: 'map', // 视图的容器
            map: this.map, // Map的实例放入视图中
            center: this.positionCenter, // 初始显示的地图中心点，经纬度
            // extent: initialExtent,
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

          this.mapView.ui.add('measure-bar', 'top-right') // 测量工具

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
              this.setup(Graphic, watchUtils)
              this.getOneMapFacilityStatistics('ywjcz,bz,zz,jcj,ylz,ll,yld,hdsw') //  获取左侧数据
              console.log(123, Object.keys(this.$route.params).includes('lat'), Object.keys(this.$route.params).includes('lng'))
              if (Object.keys(this.$route.params).includes('lat') && Object.keys(this.$route.params).includes('lng')) { // 需要监听的参数
                if (this.mapView) {
                  this.mapViewGoTo(this.$route.params.lng, this.$route.params.lat)
                }
              }
            })
          })

          this.mapView.popup.on('trigger-action', event => {
            const { id } = event.action
            const attributes = this.mapView.popup.selectedFeature.attributes
            that.modelView(id, attributes.id)
          })
        }).catch(err => {
          console.log(err)
        })
    },
    modelView (id, attributesId) {
      const that = this
      that.$refs.rainfallStation.close()
      that.$refs.rainfallStationDetail.close()
      that.$refs.flowStation.close()
      that.$refs.flowStationDetail.close()
      that.$refs.liquidLevelStation.close()
      that.$refs.liquidLevelStationDetail.close()
      that.$refs.videoDetail.close()
      if (id === 'ylzView') {
        that.$refs.rainfallStation.showRainfallStation(id, attributesId)
      } else if (id === 'ylzDetail') {
        that.$refs.rainfallStationDetail.showRainfallStationDetail(id, attributesId)
      } else if (id === 'llView') {
        that.$refs.flowStation.showFlowStation(id, attributesId)
      } else if (id === 'llDetail') {
        that.$refs.flowStationDetail.showFlowStationDetail(id, attributesId)
      } else if (id === 'ywjczView') {
        that.$refs.liquidLevelStation.showLiquidLevelStation(id, attributesId)
      } else if (id === 'ywjczDetail') {
        that.$refs.liquidLevelStationDetail.showLiquidLevelStationDetail(id, attributesId)
      } else if (id === 'videoDetail') {
        that.$refs.videoDetail.showVideoDetail(attributesId)
      }
    },
    // 去雨量站详情
    openRainfallStationDetail (id) {
      this.$refs.rainfallStationDetail.showRainfallStationDetail('ylzDetail', id)
    },
    // 显示浮框内容
    showToolTip (data) {
      this.tooltipValue = ''
      if (data.type === 'ywjcz' || data.type === 'ylz' || data.type === 'll') {
        monitorDetail({ monitorid: data.id }).then((res) => {
          if (res.success) {
            this.tooltipValue = '<p>监测点名称：' + res.data.name + ' </p>\n' +
              '              <p>监测点编码：' + res.data.systemid + ' </p>\n' +
              '              <p>监测点地址：' + res.data.addr + ' </p>\n' +
              '              <p>坐标X：' + res.data.xcoor + ' </p>\n' +
              '              <p>坐标Y：' + res.data.ycoor + ' </p>\n' +
              '              <p>监测设备名称：' + res.data.deviceName + ' </p>\n' +
              '              <p>监测设备型号：' + res.data.deviceModel + ' </p>'
          }
        })
      } else {
        this.tooltipValue = '<p>测站名：' + data.title + ' </p>\n' +
          '              <p>测站编码：00GZ030002 </p>\n' +
          '              <p>设备编号：YH008 </p>\n' +
          '              <p>水深：3.97 </p>\n' +
          '              <p>液位：0.01 </p>\n' +
          '              <p>关联窨井：XTZWbc0013 </p>'
      }
    },
    mapViewGoTo (longitude, latitude, type, attributesId) {
      this.mapView.goTo({
        target: [Number(longitude), Number(latitude)],
        zoom: 15,
        heading: 48,
        tilt: 40
      }, {
        duration: 2000 // 视角跳转时长为2秒
      }).then(function () {
        console.log('视角成功转移到', longitude, latitude)
      })
      // if (type) {
      //   this.modelView(type + 'Detail', attributesId)
      // }
    },
    async lingeHeight () {
      // 在高亮显示本区域之前移除之前的图层
      esriLoader.loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/geometry/Polygon',
        'esri/geometry/Polyline',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/Color'
      ]).then(
        ([GraphicsLayer, Graphic, Polygon, Polyline, SimpleLineSymbol, SimpleFillSymbol, Color
        ]) => {
          this.graphicsLayer = new GraphicsLayer()
          // const coordinates = xyqhJson.rings[0]
          let coordinates = geoJson
          coordinates = coordinates.coordinates
          const polyLine = new Polyline(coordinates)

          var mcLayer = new GraphicsLayer()
          mcLayer.opacity = 0.9
          // mcLayer.setOpacity(0.65)
          this.map.add(mcLayer)

          var fullExtent = [
            [-20037508.342789244, -20037508.34278909],
            [-20037508.342789244, 20037508.34278909],
            [20037508.342789244, 20037508.34278909],
            [20037508.342789244, -20037508.34278909]
          ]

          var yanji = []
          for (var i = 0; i < coordinates.length; i++) {
            var mapBoundsNode = coordinates[i]
            var p = _getMercator(mapBoundsNode[0], mapBoundsNode[1])
            var point = [p.lng, p.lat]
            yanji.push(point)
          }

          console.log('---yj---', yanji)
          var myPolygon = new Polygon({
            rings: [fullExtent, yanji],
            spatialReference: {
              wkid: 102100
            }
          })
          const symbol = {
            type: 'simple-line',
            color: [255, 0, 0],
            width: '4px',
            style: 'short-dot'
            // outline: {
            //   color: [0, 255, 0],
            //   width: '2px'

            // }
          }
          const _Polyline = [{ // 线图层的数据
            'geometry': {
              // 必填，构成线的结点坐标，根据结点顺序绘制线，所以一定要注意点顺序
              'paths': coordinates,
              'spatialReference': { 'wkid': 102100 }// 可选，坐标系
            },
            'attributes': { // 属性字段，根据实际情况添加属性字段
              'ObjectID': 1,
              'Name': '线'
            },
            'symbol': { // 必选，线符号
              'width': 3, // 可选，线的宽度，默认为1
              'style': 'esriSLSSolid', // 可选，线样式默认为esriSLSSolid，实线
              'type': 'esriSLS', // 必选，边线类型，此处是指线
              'color': [0, 206, 209]// 必选，线的颜色
            }
          }]
          const sfs = new SimpleFillSymbol(
            SimpleFillSymbol.STYLE_SOLID,
            symbol
            // [28, 99, 186, 0.8]
          )
          // var const = new Graphic(myPolygon, symbol)
          // this.graphicsLayer.add(graphic)
          // const lineSymbol = new SimpleLineSymbol(SimpleFillSymbol.STYLE_SOLID, new Color([255, 0, 0, 1]), 10)
          const graphic = new Graphic(polyLine, symbol)
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
          }).catch((error) => {
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
     * 搜索内容选择
     */
    searchChange (value) {
      this.searchVal = value
      console.log(`selected ${value}`)
      if (this.searchVal === 2) {
        // 清除监听
        if (this.mapClickChange != null) {
          this.mapClickChange.remove()
        }
        this.searchFacilityInput = ''
        if (this.gisWellDl) { // 合流管
          this.gisWellDl.visible = false
          this.gisWellDl = null
        }
        if (this.gisPipelineDl) { // 合流管
          this.gisPipelineDl.visible = false
          this.gisPipelineDl = null
        }
        this.drawPoint(this.longitude, this.latitude)
      } else if (this.searchVal === 3) {
        if (Object.keys(this.pointGraphicLayer).length > 0) {
          // 清除坐标定位
          this.pointGraphicLayer.remove(this.pointGraphic)
        }
        this.searchFacilityInput = ''
        if (this.gisWellDl) { // 合流管
          this.gisWellDl.visible = false
          this.gisWellDl = null
        }
        if (this.gisPipelineDl) { // 合流管
          this.gisPipelineDl.visible = false
          this.gisPipelineDl = null
        }
        console.log('坐标拾取')
        this.getLngLat() // 坐标拾取
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
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([Graphic, GraphicsLayer]) => {
          this.pointGraphic = new Graphic({
            geometry: {
              type: 'point',
              // 点的位置
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
    /**
     * 坐标拾取
     */
    getLngLat () {
      const that = this
      this.mapClickChange = this.mapView.on('click', function (e) {
        that.$message.success('当前坐标已成功获取到！', 10)
        that.longitude = e.mapPoint.x
        that.latitude = e.mapPoint.y
      })
    },
    changeLongitude (e) {
      this.longitude = e.target.value
      if (Object.keys(this.pointGraphicLayer).length > 0) {
        // 清除坐标定位
        this.pointGraphicLayer.remove(this.pointGraphic)
      }
      this.drawPoint(this.longitude, this.latitude)
    },
    changeLatitude (e) {
      this.latitude = e.target.value
      if (Object.keys(this.pointGraphicLayer).length > 0) {
        // 清除坐标定位
        this.pointGraphicLayer.remove(this.pointGraphic)
      }
      this.drawPoint(this.longitude, this.latitude)
    },
    /**
     * 可查询作业编号、道路名和地标名
     */
    facilitySearch () {
      // oneMapFacilityInquiry({ key: this.searchFacilityInput }).then((res) => {
      //   if (res.success) {
      //     this.searchFacilityData = res.data
      //     this.showSearchResult = true
      //   }
      // })
      const that = this
      if (that.gwssChecked.length !== 0) {
        that.chooseGwss([])
      }
      if (that.gisWellDl) { // 查询结果井
        that.gisWellDl.visible = false
        that.gisWellDl = null
      }
      if (that.gisPipelineDl) { // 查询结果管线
        that.gisPipelineDl.visible = false
        that.gisPipelineDl = null
      }
      if (!that.gisWellDl && !that.gisPipelineDl) {
        esriLoader.loadModules([
          'esri/layers/WMSLayer'
        ]).then(
          ([WMSLayer]) => {
            that.gisWellDl = new WMSLayer({
              url: 'http://218.27.207.153:9029/geoserver/gis/wms',
              sublayers: [{
                name: 'gis_well'
              }],
              maxScale: that.getScaleAccordZoom(20),
              minScale: that.getScaleAccordZoom(16),
              customLayerParameters: {
                CQL_FILTER: 'road_name like \'%' + that.searchFacilityInput + '%\''
              }
            })
            that.gisPipelineDl = new WMSLayer({
              url: 'http://218.27.207.153:9029/geoserver/gis/wms',
              sublayers: [{
                name: 'gis_pipeline'
              }],
              maxScale: that.getScaleAccordZoom(20),
              minScale: that.getScaleAccordZoom(16),
              customLayerParameters: {
                CQL_FILTER: 'road_name like \'%' + that.searchFacilityInput + '%\''
              }
            })
            that.map.add(that.gisWellDl)
            that.map.add(that.gisPipelineDl)
          }).catch(err => {
            console.log(err)
          })
      }
    },
    /**
     * 隐患点详情
     */
    showYhdDetail (record) {
      this.$nextTick(() => {
        this.$refs.yhdDetails.showDetail(record)
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
      if (e.length > 0) {
        this.searchFacilityInput = ''
      }
      if (this.gisWellDl) { // 合流管
        this.gisWellDl.visible = false
        this.gisWellDl = null
      }
      if (this.gisPipelineDl) { // 合流管
        this.gisPipelineDl.visible = false
        this.gisPipelineDl = null
      }
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
     * 获取左侧设备数据
     */
    getOneMapFacilityStatistics (types) {
      oneMapFacilityStatistics({ types: types, key: this.searchOnlineJc }).then((res) => {
        if (res.success) {
          const typeArr = types.split(',')
          for (let i = 0; i < typeArr.length; i++) {
            this.leftAllList[typeArr[i]] = res.data[typeArr[i]]
            this.addLeftMapCoordinate(typeArr[i], res.data[typeArr[i]].list)
          }
          this.compositeListData()
        }
      })
    },
    /**
     * 组合设备列表和状态总数
     */
    compositeListData () {
      const typeArr = ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw']
      let leftBottomListTemp = []
      this.onlineJcStatus = [
        { id: 1, num: 0, color: '#07B83C', tip: '正常' },
        { id: 2, num: 0, color: '#DEC523', tip: '预警' },
        { id: 3, num: 0, color: '#FF8000', tip: '溢流' },
        { id: 4, num: 0, color: '#FF0000', tip: '报警' },
        { id: 5, num: 0, color: '#1b4154', tip: '离线' }
      ]
      for (let i = 0; i < typeArr.length; i++) {
        leftBottomListTemp = leftBottomListTemp.concat(this.leftAllList[typeArr[i]].list)
        // 正常
        this.onlineJcStatus[0].num = this.onlineJcStatus[0].num + this.leftAllList[typeArr[i]].normalNum
        // 报警
        this.onlineJcStatus[3].num = this.onlineJcStatus[3].num + this.leftAllList[typeArr[i]].warnNum
      }

      // 列表排序，报警的在前边
      leftBottomListTemp.sort(function (a, b) {
        return b.status.localeCompare(a.status)
      })

      this.leftBottomList = leftBottomListTemp
    },
    /**
     * 添加左侧设备搜索框数据标点
     */
    addLeftMapCoordinate (type, list) {
      console.log('type, list', type, list)
      const normalList = []
      const warnList = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].status === 'normal') {
          normalList.push({
            geometry: {
              type: 'point',
              longitude: list[i].longitude,
              latitude: list[i].latitude
            },
            attributes: {
              id: list[i].id,
              name: list[i].title,
              data: list[i]
            }
          })
        } else if (list[i].status === 'warn') {
          warnList.push({
            geometry: {
              type: 'point',
              longitude: list[i].longitude,
              latitude: list[i].latitude
            },
            attributes: {
              id: list[i].id,
              name: list[i].title,
              data: list[i]
            }
          })
        }
      }
      if (type === 'hdsw') { // 河道水位
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'hdswLayer', require('@/assets/mapIcon/hedaoshuiwei.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'hdswLayer', require('@/assets/mapIcon/hedaoshuiwei1-warn.gif'), 35)
        }
      } else if (type === 'ylz') { // 雨量站
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'ylzLayer', require('@/assets/mapIcon/yuliangzhan.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'ylzLayer', require('@/assets/mapIcon/yuliangzhan1-warn.gif'), 35)
        }
      } else if (type === 'bz') { // 泵站
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'bzLayer', require('@/assets/mapIcon/bengzhan.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'bzLayer', require('@/assets/mapIcon/bengzhan1-warn.gif'), 35)
        }
      } else if (type === 'zz') { // 闸站
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'zzLayer', require('@/assets/mapIcon/zhazhan.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'zzLayer', require('@/assets/mapIcon/zhazhan-warn.gif'), 35)
        }
      } else if (type === 'll') { // 流量
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'llLayer', require('@/assets/mapIcon/liuliang.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'llLayer', require('@/assets/mapIcon/liuliang1-warn.gif'), 35)
        }
      } else if (type === 'yld') { // 易涝点
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'yldLayer', require('@/assets/mapIcon/yld.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'yldLayer', require('@/assets/mapIcon/yld.gif'), 35)
        }
      } else if (type === 'jcj') { // 检查井
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'jcjLayer', require('@/assets/mapIcon/jcj.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'jcjLayer', require('@/assets/mapIcon/jcj.gif'), 35)
        }
      } else if (type === 'ywjcz') { // 液位
        if (normalList.length > 0) {
          this.addFeatureLayer(normalList, 'ywjczLayer', require('@/assets/mapIcon/jcj.png'), 35)
        }
        if (warnList.length > 0) {
          this.addFeatureLayer(warnList, 'ywjczLayer', require('@/assets/mapIcon/jcj.gif'), 35)
        }
      }
    },
    /**
     * 右侧监测设备选择
     */
    changeRightChecked (e) {
      this.jcsbRightChecked = e
    },
    /**
     * 左侧监测设备是否全选
     */
    changeLeftChecked (e) {
      this.jcsbLeftChecked = e
      if (this.jcsbLeftChecked.length === 8) {
        this.showAllJc = true
      } else {
        this.showAllJc = false
      }
    },
    /**
     * 左侧 全选 取消全选
     */
    changeShowAllJc (e) {
      this.showAllJc = e
      console.log('this.showAllJc', this.showAllJc)
      const sameList = ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw'] // 左右两侧相同类型
      if (this.showAllJc) {
        this.jcsbLeftChecked = ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw']
        this.getOneMapFacilityStatistics('ywjcz,bz,zz,jcj,ylz,ll,yld,hdsw')
        // 右侧选中
        for (let i = 0; i < sameList.length; i++) {
          this.jcsbRightChecked = arrAddItem(this.jcsbRightChecked, sameList[i])
        }
      } else {
        this.jcsbLeftChecked = []
        // 移除地图标点
        this.removeOneMapFacilityCoordinates('ywjcz,bz,zz,jcj,ylz,ll,yld,hdsw')
        // 取消右侧选中
        for (let i = 0; i < sameList.length; i++) {
          this.jcsbRightChecked = arrRemoveItem(this.jcsbRightChecked, sameList[i])
        }
      }
    },
    /**
     * 当前选中或者取消选中类型值
     * e当前选中值 type 左侧还是右侧
     */
    changeCheckedOne (e, type) {
      console.log('单选', e.target.value, '那边', type)
      const curCheck = e.target.value
      const sameList = ['ywjcz', 'bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw'] // 左右两侧相同类型
      const that = this
      // jcsbRightChecked: ['bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw','sp'],
      // jcsbLeftChecked: ['bz', 'zz', 'jcj', 'ylz', 'll', 'yld', 'hdsw'],
      // 1.左侧右侧当前选中监测设备进行对比（）,
      // 若是相等, 需要给不包含的左侧或者右侧加上该项
      // 若是不相等, 则需单独处理（即只处理当前选中项数据）
      // 2.传类型参数给后台 拿到当前类型点对应的数据，并更新左侧动态数据
      // 3.以上为当前项选中逻辑，若取消选中 , 则需删除对应类型图层 更新左侧动态数据
      if (sameList.indexOf(curCheck) > -1) { // 选中或取消选中类型为左右侧均有类型需单独处理
        if (type === 'left') {
          if (that.jcsbLeftChecked.indexOf(curCheck) < 0) { // 左侧增加选中类型
            // 给右侧也增加该选中项
            that.jcsbRightChecked = arrAddItem(that.jcsbRightChecked, curCheck)
            that.getOneMapFacilityStatistics(curCheck)
          } else { // 左侧减少选中类型
            // 给右侧也减少该选中项
            that.jcsbRightChecked = arrRemoveItem(that.jcsbRightChecked, curCheck)
            that.removeOneMapFacilityCoordinates(curCheck)
          }
        } else {
          if (that.jcsbRightChecked.indexOf(curCheck) < 0) { // 右侧增加选中类型
            // 给左侧也增加该选中项
            that.jcsbLeftChecked = arrAddItem(that.jcsbLeftChecked, curCheck)
            that.getOneMapFacilityStatistics(curCheck)
          } else { // 右侧减少选中类型
            // 给左侧也减少该选中项
            that.jcsbLeftChecked = arrRemoveItem(that.jcsbLeftChecked, curCheck)
            that.removeOneMapFacilityCoordinates(curCheck)
          }
        }
      } else {
        if (type === 'left') { // 选中项为左侧或右侧独有的
          if (that.jcsbLeftChecked.indexOf(curCheck) < 0) { // 左侧增加选中类型
            that.getOneMapFacilityStatistics(curCheck)
          } else { // 左侧减少选中类型
            that.removeOneMapFacilityCoordinates(curCheck)
          }
        } else { // 选中项为右侧独有的
          if (that.jcsbRightChecked.indexOf(curCheck) < 0) { // 右侧增加选中类型
            that.getOneMapFacilityCoordinates(curCheck)
          } else { // 右侧减少选中类型
            that.deleteSelFeature(curCheck + 'Layer')
          }
        }
      }

      if (this.jcsbLeftChecked.length === 8) {
        this.showAllJc = true
      } else {
        this.showAllJc = false
      }
    },
    /**
     * 请求接口 获取当前选中项数据 并标点
     */
    getOneMapFacilityCoordinates (type) {
      oneMapFacilityCoordinates({ type: type }).then((res) => {
        if (res.success) {
          const normalList = []
          const warnList = []
          const otherList = []

          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].status === 'normal') {
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
            } else if (res.data[i].status === 'warn') {
              warnList.push({
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
            } else {
              otherList.push({
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
          }

          if (type === 'ywjcz') { // 液位
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'ywjczLayer', require('@/assets/mapIcon/yeweijiancezhan.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'ywjczLayer', require('@/assets/mapIcon/yeweijiancezhan1-warn.gif'), 35)
            }
          } else if (type === 'ylz') { // 雨量站
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'ylzLayer', require('@/assets/mapIcon/yuliangzhan.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'ylzLayer', require('@/assets/mapIcon/yuliangzhan1-warn.gif'), 35)
            }
          } else if (type === 'll') { // 流量
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'llLayer', require('@/assets/mapIcon/liuliang.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'llLayer', require('@/assets/mapIcon/liuliang1-warn.gif'), 35)
            }
          } else if (type === 'zz') { // 闸站
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'zzLayer', require('@/assets/mapIcon/zhazhan.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'zzLayer', require('@/assets/mapIcon/zhazhan-warn.gif'), 35)
            }
          } else if (type === 'bz') { // 泵站
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'bzLayer', require('@/assets/mapIcon/bengzhan.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'bzLayer', require('@/assets/mapIcon/bengzhan1-warn.gif'), 35)
            }
          } else if (type === 'yld') { // 易涝点
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'yldLayer', require('@/assets/mapIcon/yld.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'yldLayer', require('@/assets/mapIcon/hedaoshanhong1-warn.gif'), 35)
            }
          } else if (type === 'jcj') { // 检查井
            if (normalList.length > 0) {
              this.addFeatureLayer(normalList, 'jcjLayer', require('@/assets/mapIcon/jcj.png'), 35)
            }
            if (warnList.length > 0) {
              this.addFeatureLayer(warnList, 'jcjLayer', require('@/assets/mapIcon/shuikushanhong1-warn.gif'), 35)
            }
          } else if (type === 'sp') { // 视频点
            if (otherList.length > 0) {
              this.addFeatureLayer(otherList, 'spLayer', require('@/assets/marker/spd.png'), 37)
            }
          }
        }
      })
    },
    removeOneMapFacilityCoordinates (types) {
      console.log('types', types)
      const typeArr = types.split(',')
      for (let i = 0; i < typeArr.length; i++) {
        this.leftAllList[typeArr[i]] = {
          alarmNum: 0,
          normalNum: 0,
          offlineNum: 0,
          overflowNum: 0,
          totalNum: 0,
          warnNum: 0,
          list: []
        }

        this.deleteSelFeature(typeArr[i] + 'Layer')
      }
      this.compositeListData()
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
            that.addFeatureLayer(points, 'wscLayer', require('@/assets/mapIcon/wushuichang.png'), 30)
          }
        })
      } else {
        this.deleteSelFeature('wscLayer')
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
     * map 添加图层（标记点及对应弹窗）
     * geoPoint：添加的坐标点
     * objectId： 添加涂层的标识
     * imgUrl： 添加图层上的标记点图标路径
     */
    addFeatureLayer (geoPoint, objectId, imgUrl, imgSize) {
      console.log('geoPoint', geoPoint, objectId)
      const that = this
      esriLoader.loadModules([
        'esri/layers/FeatureLayer'
      ], { url: ServiceUrl.apiUrl }, { css: true }).then(
        ([FeatureLayer]) => {
          // 需要判断去重  即没有该图层再添加
          // if (findIndexByKeyValue(that.featureLayers, 'id', objectId) < 0) {
          const popupTemplate = {
            title: '{name}',
            outFields: ['*'],
            overwriteActions: true // 隐藏默认的缩放按钮
          }

          // 弹出框的内容
          if (objectId === 'wsclcLayer' || objectId === 'wscLayer') { // 污水处理厂
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
                title: '预览',
                id: 'videoDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'ylzLayer') { // 雨量
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'ylzView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'ylzDetail',
                className: 'esri-icon-minimize'
              }
            ]
          } else if (objectId === 'llLayer') { // 流量
            popupTemplate.actions = [
              {
                title: '概览',
                id: 'llView',
                className: 'esri-icon-maximize'
              },
              {
                title: '详情',
                id: 'llDetail',
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
    /**
     * 在线检测搜索
     */
    onSearchOnlineJc () {
      if (this.jcsbLeftChecked.length > 0) {
        this.getOneMapFacilityStatistics(this.jcsbLeftChecked.join(','))
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
  label.sblist-item.ant-checkbox-wrapper {
    width: 100%;
    margin: 10px 0;
    color: #95caff;
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
.jclist .jclist-item span.ant-checkbox {
  display: none;
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
  #measure-bar {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 42px;
    // border: 1px solid #206eb1;
    .action-button {
      font-size: 22px;
      // background-color: #0f2746;
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
      span {
        color: #e1eaf9;
        font-weight: bold;
        padding-left: 5px;
      }
    }
  }
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
  .search-result {
    width: 420px;
    height: auto;
    padding: 20px;
    position: absolute;
    top: 85px;
    left: 40%;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    z-index: 999;
    .close-img {
      width: 25px;
      height: 25px;
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    h6 {
      background-color: rgba(24, 144, 255, 0.6);
      color: #fff;
      padding: 5px 10px;
      display: inline-block;
      border-radius: 4px;
    }
    .search-result-item {
      margin: 5px 0;
      cursor: pointer;
      color: #74bcff;
    }
  }
  .left-search {
    width: 420px;
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
    z-index: 99;
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
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .jclist-item {
          width: 30%;
          height: 36px;
          text-align: center;
          color: white;
          cursor: pointer;
          margin: 10px 0;
          &:nth-child(2),
          &:nth-child(5),
          &:nth-child(8) {
            margin: 0 4%;
          }
          .ant-checkbox {
            display: none;
          }
          .jclist-btn {
            width: 72px;
            height: 36px;
            line-height: 36px;
            border-radius: 0 20px 0 20px;
            font-size: 12px;
            text-align: center;
            background-color: #697b84;
            border-color: #697b84;
            img {
              width: 16px;
              height: 16px;
              display: inline-block;
            }
          }
          .jclist-btn-act {
            background-color: #1890ff;
            border-color: #1890ff;
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
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      .inline-msg {
        height: 36px;
        line-height: 36px;
        display: flex;
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
          padding: 0;
          width: 70px;
          line-height: 25px;
          border: 1px solid #00acf8;
          text-align: center;
          color: white;
          border-radius: 20px;
          margin-right: 5px;
          font-size: 12px;
          background: #00acf866;
        }
        .label-right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 180px;
        }
        .text {
          color: #fff;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          width: 150px;
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
