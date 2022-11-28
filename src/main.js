import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission'
import './utils/filter'
import './components/global.less'
import { Dialog } from '@/components'
import { hasBtnPermission } from './utils/permissions'
import { sysApplication } from './utils/applocation'
import '@/assets/iconFont/iconfont.css'

import Video from 'video.js'
import 'video.js/dist/video-js.css'

import * as echarts from 'echarts'
import { Pagination, Carousel, Collapse, Tag, Timeline } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(Collapse)
Vue.use(Tag)
Vue.use(Timeline)

Vue.prototype.$echarts = echarts
Vue.use(VueAxios)
Vue.use(Dialog)

Vue.prototype.hasPerm = hasBtnPermission
Vue.prototype.applocation = sysApplication
Vue.config.productionTip = false

Vue.prototype.$video = Video

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
