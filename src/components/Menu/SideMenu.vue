<template>
  <a-layout-sider :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]" width="230px" :collapsible="collapsible" v-model="collapsed" :trigger="null">
    <!-- <logo /> -->
    <div style="color: rgba(255, 255, 255, 0.65);line-height: 48px;
    padding: 0 12px;">
      <a-icon v-if="isDesktop()" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
      <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" style="padding-left: 20px; padding-right: 20px;" />
    </div>
    <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" :mode="mode" @select="onSelect"></s-menu>
  </a-layout-sider>

</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
    // device: {
    //   type: String,
    //   required: false,
    //   default: 'desktop'
    // }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    },
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>
