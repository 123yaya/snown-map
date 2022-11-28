// ArcGisServe.js
export const ServiceUrl = {
  // testLayer: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0', // 测试图层
  testLayer: 'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer?f=jsapi',
  apiUrl: process.env.VUE_APP_ARCGIS_URL + '/arcgis_js_v423_api/init.js' // API地址

}
