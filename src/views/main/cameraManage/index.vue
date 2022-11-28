<template>
  <div class="page-header-index-wide">
    <div class="video-box">
      <div class="video-box-left">
        <a-spin :spinning="treeLoading">
          <div v-if="treeData.length>0">
            <a-tree class="video-tree" :defaultExpandAll="true" :show-icon="true" :show-line="true" :multiple="true" :autoExpandParent="true" :tree-data="treeData" :selectedKeys="selectedKeys" @select="onSelect">
              <template slot="iconSlot" slot-scope="item">
                <!-- {"eventKey":"1514522995157155842",
                      "expanded":false,
                      "selected":false,
                      "checked":false,
                      "loaded":false,
                      "loading":false,
                      "halfChecked":false,
                      "title":"河南街与公铁立交桥交叉",
                      "pos":"0-0-0",
                      "dragOver":false,
                      "dragOverGapTop":false,
                      "dragOverGapBottom":false,
                      "dataRef":{
                      "scopedSlots":Object{...},
                      "title":"河南街与公铁立交桥交叉",
                      "key":"1514522995157155842",
                      "status":"1" // 0 不在线 1 在线
                      }} -->
                <img class="tree-video" v-if="item.selected&&item.dataRef.status==1" src="~@/assets/video_tree_open.png" alt="">
                <img class="tree-video" v-else-if="item.dataRef.status==1" src="~@/assets/video_tree_close.png" alt="">
                <img class="tree-video" v-else src="~@/assets/video_tree_error.png" alt="">
              </template>
            </a-tree>
          </div>
          <div v-else>
            <a-empty :image="simpleImage" />
          </div>
        </a-spin>
      </div>
      <div class="video-box-right">
        <div class="screen-box">
          <div :class="'screen-box-item'+splitNum" v-for="videoNum in splitNum" :id="'video-box'+videoNum" :key="videoNum">
            <video :id="'video'+videoNum" class="video-js"></video>
          </div>
        </div>

        <div class="option-btns">
          请选择分屏方式：
          <a-radio-group class="my-radio" :value="splitNum" @change="changeSplitNum">
            <a-radio-button class="my-radio-btn" v-for="item in screenList" :key="item" :value="item">
              <img v-if="splitNum==item" :src="require('@/assets/split'+item+'-active.jpg')" alt="">
              <img v-else :src="require('@/assets/split'+item+'.jpg')" alt="">
            </a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { STable, XCard, XDown } from '@/components'
import { Empty } from 'ant-design-vue'
import { cameraInfoTree, videoGetVideoPath } from '@/api/modular/main/camerainfo/cameraInfoManage'
import $ from 'jquery'
export default {
  components: {
    XDown,
    XCard,
    STable
  },
  data () {
    return {
      treeLoading: true,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      treeData: [],
      screenList: [1, 4, 6, 9],
      splitNum: 4,
      videoIdArray: ['video1', 'video2', 'video3', 'video4'], // 播放器id数组
      videoObjArray: [], // 视频对象数组
      channelIdArr: [], // 左侧树选中id旧值
      selectedKeys: [] // 左侧树选中项id新值

    }
  },
  created () {
  },
  mounted () {
    this.getCameraInfoTree()
  },
  methods: {
    getCameraInfoTree () {
      cameraInfoTree({}).then((res) => {
        if (res.success) {
          this.treeData = res.data
        }
        this.treeLoading = false
      })
    },
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys)
      console.log('status', info.node._props.dataRef)
      this.selectedKeys = selectedKeys
      console.log('this.selectedKeys', this.selectedKeys)
      if (info.node._props.dataRef.status === '0') {
        this.$message.warning('当前监控不在线！')
        this.selectedKeys.splice(this.selectedKeys.length, 1)
      } else {
        const curId = this.searchArray(this.selectedKeys, info.node._props.dataRef.key)
        if (curId > -1) {
          // 选中 拿到当前选中节点去请求视频流
          this.getvideoGetVideoPath(this.selectedKeys[selectedKeys.length - 1])
        } else {
          const cancleId = this.searchArray(this.channelIdArr, info.node._props.dataRef.key)
          // 取消选中 节点已经点击过，销毁对应节点视频 删除对应数据
          console.log('cancleId', cancleId, '#video-box' + (cancleId + 1))
          this.videoObjArray[cancleId].dispose()
          $('#video-box' + (cancleId + 1)).html('<video id="video' + (cancleId + 1) + '" ' + 'class="video-js"></video>')
          this.videoObjArray[cancleId] = undefined
          this.channelIdArr[cancleId] = undefined
        }
      }
    },
    getvideoGetVideoPath (selectedId) {
      console.log('selectedId--', selectedId, '分屏数--', this.splitNum)
      videoGetVideoPath({ id: selectedId }).then((res) => {
        if (res.code === '200') {
          if (this.selectedKeys.length <= this.splitNum) {
            for (var i = 0; i < this.splitNum; i++) {
              // 从当前分屏且没有展示播放视频的第i个屏幕处开始
              console.log('播放视频[i]--', this.videoIdArray, this.videoObjArray, i)
              if (!this.videoObjArray[i]) {
                console.log('准备播放器id', this.videoIdArray, '播放参数', res.data.url)
                let myPlayer = {}
                try {
                  myPlayer = this.$video(this.videoIdArray[i], {
                    // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    // 自动播放属性,muted:静音播放
                    autoplay: 'muted',
                    // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: 'auto'
                    // 设置视频播放器的显示宽度（以像素为单位）
                    // width: '100%',
                    // 设置视频播放器的显示高度（以像素为单位）
                    // height: '100%'
                  })

                  myPlayer.src({
                    src: res.data.url,
                    type: 'application/x-mpegURL'
                  })
                  myPlayer.load()
                  myPlayer.play()
                } catch (e) {
                  this.$message.error(e)
                }
                // 存储当前已选择左侧树id
                this.channelIdArr[i] = selectedId
                // 存储当前视频对象
                this.videoObjArray[i] = myPlayer
                return
              }
            }
          } else {
            // 如果当前视频窗口已经全部沾满，再增加视频切换最后一个视频窗口地址
            let myPlayer = {}
            try {
              myPlayer = this.$video(this.videoIdArray[this.splitNum - 1], {
                // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                // 自动播放属性,muted:静音播放
                autoplay: 'muted',
                // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: 'auto'
                // 设置视频播放器的显示宽度（以像素为单位）
                // width: '100%',
                // 设置视频播放器的显示高度（以像素为单位）
                // height: '100%'
              })

              myPlayer.src({
                src: res.data.url,
                type: 'application/x-mpegURL'
              })
              myPlayer.load()
              myPlayer.play()
            } catch (e) {
              this.$message.error(e)
            }
            this.videoObjArray[this.splitNum - 1] = myPlayer
            this.selectedKeys.splice(this.splitNum - 1, 1)
            this.channelIdArr[this.splitNum - 1] = selectedId
          }
        } else {
          this.$message.error('获取地址失败')
        }
      })
    },
    changeSplitNum (e) {
      this.videoIdArray = []
      console.log('this.splitNum', e)
      this.splitNum = e.target.value // 1.获取当前视频窗口数
      // 1.从多屏切换到少屏且存在视频需要销毁
      if ((this.splitNum - this.channelIdArr.length) < 0) {
        // 屏幕占满且溢出
        for (let changeNum = this.channelIdArr.length - 1; this.splitNum <= changeNum; changeNum--) {
          // 销毁视频窗口 取消视频选中
          const delId = this.searchArray(this.selectedKeys, this.channelIdArr[changeNum])
          if (this.channelIdArr[changeNum]) {
            console.log('delId-', delId, 'changeNum', changeNum)
            this.videoObjArray[changeNum].dispose()
            this.videoObjArray.splice(changeNum, 1)
            this.selectedKeys.splice(delId, 1)
            this.channelIdArr[changeNum] = undefined
          }
        }
      }
      for (let i = 0; i <= this.splitNum; i++) { // 2.重置视频id数组
        this.videoIdArray[i] = 'video' + (i + 1)
      }
    },
    searchArray (arrOb, value) {
      for (var i = 0, len = arrOb.length; i < len; i++) {
        if (arrOb[i] === value) {
          return i
        }
      }
      return -1
    }
  },
  beforeDestroy () {
    for (var i = 0; i <= this.splitNum; i++) {
      // 关闭页面 销毁视频
      if (this.videoObjArray[i]) {
        this.videoObjArray[i].dispose()
        this.videoObjArray.splice(i, 1)
      }
    }
    this.videoIdArray = []
    this.selectedKeys = []
    this.channelIdArr = []
  }
}
</script>
<style lang="less">
.my-radio .ant-radio-button-wrapper {
  background: transparent !important;
  border: none;
}
.ant-tree.ant-tree-show-line li span.ant-tree-switcher {
  background: transparent !important;
}
// 把之前的默认图标隐藏.video-tree
.video-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
  display: none;
}
.screen-box .video-js {
  width: 100%;
  height: 100%;
  background-image: url('../../../assets/video_init3.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #000;
}
</style>
<style lang="less" scoped>
.page-header-index-wide {
  width: 100%;
  height: 100%;
  margin: 0 !important;
  padding: 0;
  // border: 1px solid #e2e2e2;
  .video-box {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    display: inline-flex;
    justify-content: space-between;
    position: relative;
    // background-image: linear-gradient(to bottom right, rgba(244, 246, 249, 0.8), rgba(163, 180, 208, 0.9));
    .video-box-left {
      width: 18%;
      height: 100%;
      padding: 10px;
      position: absolute;
      left: 0px;
      top: 0;
      bottom: 0;
      box-sizing: border-box;
      .tree-video {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-left: -8px;
      }
    }
    .video-box-right {
      height: 81%;
      padding: 0 !important;
      // border-left: 1px solid #e2e2e2;
      box-sizing: border-box;
      position: absolute;
      left: 19%;
      right: 0px;
      top: 0;
      bottom: 0;
      .screen-box {
        width: 100%;
        height: calc(100vh - 80px - 50px - 48px - 40px);
        overflow-y: auto;
        display: inline-flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        .screen-box-item1 {
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          padding: 2px;
          box-sizing: border-box;
        }
        .screen-box-item4 {
          width: 50%;
          height: 50%;
          padding: 2px;
          box-sizing: border-box;
        }
        .screen-box-item6 {
          width: 33.33%;
          height: 50%;
          padding: 2px;
          box-sizing: border-box;
        }
        .screen-box-item9 {
          width: 33.33%;
          height: 33.33%;
          padding: 2px;
          box-sizing: border-box;
        }
        .video-js {
          width: 100%;
          height: 100%;
          background-image: url('../../../assets/video_init3.png');
          background-repeat: no-repeat;
          background-position: center;
          background-color: #000;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .option-btns {
        width: 100%;
        height: 50px;
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        // position: absolute;
        // left: 0;
        // bottom: 0;
        .my-radio {
          display: inline-flex;
          .my-radio-btn {
            background-color: transition;
            img {
              height: 30px;
              width: 30px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>
