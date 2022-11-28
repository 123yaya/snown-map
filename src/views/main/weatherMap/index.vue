<template>
  <div class="weatherMap-container">
    <a-range-picker class="picker" :show-time="{ format: 'HH:mm' }" format="YYYY-MM-DD HH:mm" :placeholder="['开始时间', '结束时间']" @change="onRangeChange" :value="[moment(searchBeginTime, 'YYYY-MM-DD HH:mm'),moment(searchEndTime, 'YYYY-MM-DD HH:mm')]" :bordered="false" />

    <a-tabs :activeKey="tabKey" @change="changeTabKey">
      <a-tab-pane class="weatherMap-tab" key="wxyt" tab="卫星云图">
        <div class="inline-flex">
          <div class="flex-left">
            <div class="icon-btn icon-box" @click="start()">
              <i style="font-size: 24px;" class="iconfont icon-diyigeshipin"></i>
            </div>
            <i style="font-size: 30px;" @click="pre()" class="icon-btn iconfont icon-shangyibu"></i>
            <i style="font-size: 30px;" v-if="!isLoop" @click="loop()" class="icon-btn iconfont icon-kaishi"></i>
            <i style="font-size: 30px;" v-if="isLoop" @click="pause()" class="icon-btn iconfont icon-jieshu"></i>

            <i style="font-size: 30px;" @click="next()" class="icon-btn iconfont icon-xiayibu"></i>
            <div class="icon-btn icon-box" @click="end()">
              <i style="font-size: 24px;" class="iconfont icon-zuihouyigeshipin"></i>
            </div>
            <div class="imgs-option">
              <i style="font-size: 30px;" @click="enlarge()" class="icon-btn iconfont icon-fangda"></i>
              <i style="font-size: 30px;" @click="reduction()" class="icon-btn iconfont icon-suoxiao"></i>
              <i style="font-size: 30px;" @click="narrow()" class="icon-btn iconfont icon-huanyuanhuabu"></i>
            </div>
          </div>
          <div class="flex-right">
            时间选择
          </div>
        </div>
        <a-tabs :activeKey="tabWxKey" tab-position="right" @change="changeTabWx">
          <a-tab-pane v-for="(wx,index) in wxTab" :key="index+1" :tab="wx.imgTime| moment('MM-DD HH:mm') ">
            <div class="imgs">
              <img v-drag class="img-wx" :src="filePath+wx.imgPath" :alt="wx.imgTime" :style="scaleImg" @mousewheel.prevent="scaleFun">
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
      <a-tab-pane key="ldpt" class="weatherMap-tab" tab="雷达图">
        <div class="inline-flex">
          <div class="flex-left">
            <div class="icon-btn icon-box" @click="start()">
              <i style="font-size: 24px;" class="iconfont icon-diyigeshipin"></i>
            </div>
            <i style="font-size: 30px;" @click="pre()" class="icon-btn iconfont icon-shangyibu"></i>
            <i style="font-size: 30px;" v-if="!isLoop" @click="loop()" class="icon-btn iconfont icon-kaishi"></i>
            <i style="font-size: 30px;" v-if="isLoop" @click="pause()" class="icon-btn iconfont icon-jieshu"></i>

            <i style="font-size: 30px;" @click="next()" class="icon-btn iconfont icon-xiayibu"></i>
            <div class="icon-btn icon-box" @click="end()">
              <i style="font-size: 24px;" class="iconfont icon-zuihouyigeshipin"></i>
            </div>
            <div class="imgs-option">
              <i style="font-size: 30px;" @click="enlarge()" class="icon-btn iconfont icon-fangda"></i>
              <i style="font-size: 30px;" @click="reduction()" class="icon-btn iconfont icon-suoxiao"></i>
              <i style="font-size: 30px;" @click="narrow()" class="icon-btn iconfont icon-huanyuanhuabu"></i>
            </div>
          </div>
          <div class="flex-right">
            时间选择
          </div>
        </div>
        <a-tabs class="weatherMap-tab" :activeKey="tabLdKey" tab-position="right" @change="changeTabLd">
          <a-tab-pane v-for="(ld,index) in ldTab" :key="index+1" :tab="ld.imgTime| moment('MM-DD HH:mm')">
            <div class="imgs">
              <img v-drag class="img-ld" :src="filePath+ld.imgPath" :alt="ld.imgTime" :style="scaleImg" @mousewheel.prevent="scaleFun">
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import moment from 'moment'
import { getDate } from '@/utils/util'
import { weatherMapList } from '@/api/modular/main/weathermap/weatherMapManage'
export default {
  name: 'WeatherMap',
  components: {
  },

  data () {
    return {
      filePath: '',
      tabKey: 'wxyt',
      tabWxKey: 1,
      tabLdKey: 1,
      isLoop: false, // 是否显示循环播放
      loopImgs: null, // 循环播放计时器
      scaleVal: 1, // 图片缩放比例
      wxTab: [],
      ldTab: [],
      searchBeginTime: '',
      searchEndTime: ''
    }
  },
  computed: {
    // 放大、缩小
    scaleImg: function () {
      return `transform:scale(${this.scaleVal})`
    }
  },
  mounted () {
    this.filePath = process.env.VUE_APP_FILE_BASE_URL
    console.log('filePath', this.filePath)

    this.searchBeginTime = moment(getDate()).format('YYYY-MM-DD') + ' 00:00'
    this.searchEndTime = moment(getDate()).format('YYYY-MM-DD HH:mm')
    this.getWeatherMapList()
  },
  directives: {
    drag: {
      // 指令的定义
      bind: function (el) {
        // 获取当前元素
        const oDiv = el
        oDiv.onmousedown = (e) => {
          // 算出鼠标相对元素的位置
          const disX = e.clientX - oDiv.offsetLeft
          const disY = e.clientY - oDiv.offsetTop

          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            const left = e.clientX - disX
            const top = e.clientY - disY

            oDiv.style.left = left + 'px'
            oDiv.style.top = top + 'px'
          }
          document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
          }

          return false
        }
      }
    }
  },
  methods: {
    moment,
    onRangeChange (value, dateString) {
      console.log('Selected Time: ', value)
      this.searchBeginTime = dateString[0]
      this.searchEndTime = dateString[1]
      this.getWeatherMapList()
    },
    getWeatherMapList () {
      const params = {
        imgType: this.tabKey,
        searchBeginTime: this.searchBeginTime,
        searchEndTime: this.searchEndTime
      }
      weatherMapList(params).then((res) => {
        if (res.success) {
          if (this.tabKey === 'wxyt') {
            this.wxTab = res.data
            console.log('this.wxTab', this.wxTab)
          } else {
            this.ldTab = res.data
          }
        }
      })
    },
    changeTabKey (activeKey) {
      this.tabKey = activeKey
      if (this.tabKey === 'wxyt') {
        this.tabWxKey = 1
      } else {
        this.tabLdKey = 1
      }
      this.getWeatherMapList()
      this.scaleVal = 1
    },
    changeTabWx (activeKey) {
      this.tabWxKey = activeKey
    },
    changeTabLd (activeKey) {
      this.tabLdKey = activeKey
    },
    /**
     * 第一个
     */
    start () {
      if (this.tabKey === 'wxyt') {
        this.tabWxKey = this.wxTab.length
      } else {
        this.tabLdKey = this.ldTab.length
      }
    },
    /**
     * 上一个
     */
    pre () {
      if (this.tabKey === 'wxyt') {
        if (this.tabWxKey !== this.wxTab.length) {
          this.tabWxKey = this.tabWxKey + 1
        }
      } else {
        if (this.tabLdKey !== this.ldTab.length) {
          this.tabLdKey = this.tabLdKey + 1
        }
      }
    },
    /**
     * 循环播放
     */
    loop () {
      this.isLoop = true
      const that = this
      if (!that.loopImgs) {
        if (that.tabKey === 'wxyt') {
          that.tabWxKey = that.tabWxKey === 1 ? that.wxTab.length : that.tabWxKey
          that.loopImgs = window.setInterval(function () {
            that.tabWxKey--
            console.log('that.tabWxKey1', that.tabWxKey)
            if (that.tabWxKey === 1) {
              console.log('that.tabWxKey2', that.tabWxKey)
              that.tabWxKey = 1
              window.clearInterval(that.loopImgs)
              that.loopImgs = null
              that.isLoop = false
            }
          }, 300)
        } else {
          that.tabLdKey = that.tabLdKey === 1 ? that.ldTab.length : that.tabLdKey
          that.loopImgs = window.setInterval(function () {
            that.tabLdKey--
            if (that.tabLdKey <= 1) {
              that.tabLdKey = 1
              window.clearInterval(that.loopImgs)
              that.loopImgs = null
              that.isLoop = false
            }
          }, 300)
        }
      }
    },
    /**
     * 暂停
     */
    pause () {
      window.clearInterval(this.loopImgs)
      this.loopImgs = null
      this.isLoop = false
    },
    /**
     * 下一个
     */
    next () {
      if (this.tabKey === 'wxyt') {
        if (this.tabWxKey !== 1) {
          this.tabWxKey = this.tabWxKey - 1
        }
      } else {
        if (this.tabLdKey !== 1) {
          this.tabLdKey = this.tabLdKey - 1
        }
      }
    },
    /**
     * 最后一个
     */
    end () {
      if (this.tabKey === 'wxyt') {
        this.tabWxKey = 1
      } else {
        this.tabLdKey = 1
      }
    },
    /**
     * 放大
     */
    enlarge () {
      this.scaleVal += 0.1
    },
    /**
     * 缩小
     */
    reduction () {
      if (this.scaleVal > 0.5) {
        this.scaleVal -= 0.1
      }
    },
    /**
     * 还原
     */
    narrow () {
      this.scaleVal = 1
    },
    scaleFun (e) {
      const direction = e.deltaY > 0 ? 'down' : 'up'
      if (direction === 'up') {
        // 滑轮向上滚动
        this.scaleVal += 0.1
      } else {
        // 滑轮向下滚动
        if (this.scaleVal > 0.5) {
          this.scaleVal -= 0.1
        }
      }
    }
  }
}
</script>
<style>
.weatherMap-tab .ant-tabs-bar.ant-tabs-right-bar {
  background-color: #e8e8e8;
  padding-top: 10px;
  border: 1px solid #ddd;
}
.weatherMap-tab .ant-tabs .ant-tabs-left-bar .ant-tabs-tab,
.weatherMap-tab .ant-tabs .ant-tabs-right-bar .ant-tabs-tab {
  border-bottom: 1px solid #ddd;
  margin: 0;
}
.weatherMap-tab .ant-tabs-content.ant-tabs-content-animated.ant-tabs-right-content {
  padding: 10px 20px;
  max-width: calc(100% - 20px);
  min-height: 742px;
  position: relative;
}
</style>
<style lang="less" scoped>
.weatherMap-container {
  width: 100%;
  height: 100%;
  padding: 20px 18% 20px 20px;
  overflow: auto;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    display: none;
  }
  .inline-flex {
    width: 100%;
    height: 45px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    .flex-left {
      width: calc(100% - 123px - 20px);
      padding: 20px;
      height: 45px;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .icon-box {
        width: 30px;
        height: 30px;
        border: 1px solid #545456;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon-btn {
        margin-right: 10px;
        cursor: pointer;
        &:active,
        &:hover {
          color: #65b3fc;
        }
      }
      .imgs-option {
        margin-left: 30px;
      }
    }
    .flex-right {
      width: 123px;
      height: 45px;
      line-height: 45px;
      background-color: #e8e8e8;
      text-align: center;
      border: 1px solid #ddd;
      border-bottom: none;
    }
  }
  .imgs {
    width: 100%;
    height: 100%;
    overflow: auto;
    max-height: 742px;
    text-align: left;
    position: absolute;
    cursor: move;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    .img-wx {
      width: 100%;
      height: auto;
      display: inline-block;
      // object-fit: cover;
      position: absolute;
    }
    .img-ld {
      width: auto;
      height: 740px;
      display: inline-block;
      // object-fit: cover;
      position: absolute;
    }
  }
}
</style>
