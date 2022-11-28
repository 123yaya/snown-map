<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header v-if="visible" :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]" :style="{ padding: '0', height: '80px',}">
        <div class="header header-tit">
          <h2 class="logo-tit">城市数字化综合信息管理平台</h2>
          <a-menu class="top-menu" style="background: #001529;border-bottom: 0px;" mode="horizontal" :selectedKeys="selectedKeys" :default-selected-keys="this.defApp">
            <!-- <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" style="padding-left: 20px; padding-right: 20px;" /> -->

            <a-menu-item style="margin-right: 55px; font-size: 16px;" v-for="(item) in userInfo.apps" :key="item.code" class="header-menu-item" @click="switchApp(item.code)">
              <div class="imgboxs">
                <i style="font-size: 32px;" :class="'iconfont icon-' + item.code"></i>
              </div>
              {{ item.name }}
            </a-menu-item>
          </a-menu>
          <user-menu></user-menu>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import { mixin } from '@/utils/mixin'
import { mapActions, mapGetters } from 'vuex'
import { ALL_APPS_MENU, APP_CODE } from '@/store/mutation-types'
import Vue from 'vue'
import { message } from 'ant-design-vue/es'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    this.defApp.push(Vue.ls.get(ALL_APPS_MENU)[0].code)
    this.appCode = Vue.ls.get(ALL_APPS_MENU)[0].code
    this.selectedKeys = this.defApp
    console.log('createdselectedKeys', this.selectedKeys)
    console.log('createdappCode', this.appCode)
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0,
      defApp: [],
      appCode: 'system',
      selectedKeys: []
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    ...mapActions(['MenuChange']),

    /**
     * 应用切换
     */
    switchApp (appCode) {
      if (this.appCode !== 'comprehensive_display') {
        this.oldCode = this.appCode
      }
      this.appCode = appCode
      Vue.ls.set(APP_CODE, appCode, 7 * 24 * 60 * 60 * 1000)
      this.defApp = []
      const applicationData = this.userInfo.apps.filter(item => item.code === appCode)

      if (appCode === 'comprehensive_display') {
        this.selectedKeys = [this.oldCode]
        // 切换综合展示界面
        this.$router.push({ path: '/screen' })
      } else {
        this.selectedKeys = [appCode]
        const hideMessage = message.loading('正在切换应用！', 0)
        this.MenuChange(applicationData[0]).then((res) => {
          if (appCode === 'monitor_warn') {
            this.$router.push({ path: '/warning' })
          } else if (appCode === 'one_map') {
            this.$router.push({ path: '/welcome' })
          } else if (appCode === 'water_quality_monitor') {
            this.$router.push({ path: '/waterQualityMonitor' })
          } else if (appCode === 'facility_maintenance') {
            this.$router.push({ path: '/patrolRecordView' })
          } else if (appCode === 'information_release') {
            this.$router.push({ path: '/notice' })
          } else {
            this.$router.push({ path: '/mgr_user' })
          }
          hideMessage()
          // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          message.error('应用切换异常')
        })
      }
    },
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style>
.ant-menu-submenu > .ant-menu,
.ul.ant-menu.ant-menu-vertical.ant-menu-sub.ant-menu-submenu-content {
  background-color: #001529 !important;
}
</style>
<style lang="less">
@import '../index.less';
.top-menu {
  height: 80px;
  width: calc(100% - 250px - 470px - 30px);
  text-align: center;
  max-width: calc(100% - 250px - 470px - 30px);
  overflow: hidden;
}
.header-menu-item {
  color: rgba(255, 255, 255, 0.65);
  top: 0px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  line-height: 35px;
  .imgboxs {
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 8px auto 2px;
  }
}
.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
.header-tit {
  width: 100%;
  height: 80px;
  background: #001529;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  .logo-tit {
    line-height: 80px;
    font-size: 28px;
    padding: 0 36px;
    color: #fff;
    position: relative;
    z-index: 12;
    font-weight: bold;
    letter-spacing: 5px;
    margin: 0;
    width: 470px;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
