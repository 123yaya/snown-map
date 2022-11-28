<template>
  <a-modal class="video-model" :visible="videoDetail" :title="videoInfo.cameraName" footer="" :maskClosable="false" @cancel="close()">
    <video id="myVideo" class="video-js">
    </video>
    <div class="inline-flex">
      <!--      <h4>视频控制面板</h4>-->
      <!--      <a-progress class="my-progress" :percent="50" status="active"/>-->
    </div>
    <div class="video-option inline-flex">
      <div>
        <ul class="pie">
          <li class="slice-one slice" @mousedown="ptzStart(0)" @mouseup="ptzStop(0)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-two slice" @mousedown="ptzStart(6)" @mouseup="ptzStop(6)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-three slice" @mousedown="ptzStart(3)" @mouseup="ptzStop(3)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-four slice" @mousedown="ptzStart(7)" @mouseup="ptzStop(7)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-five slice" @mousedown="ptzStart(1)" @mouseup="ptzStop(1)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-six slice" @mousedown="ptzStart(5)" @mouseup="ptzStop(5)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-seven slice" @mousedown="ptzStart(2)" @mouseup="ptzStop(2)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <li class="slice-eight slice" @mousedown="ptzStart(4)" @mouseup="ptzStop(4)"><img src="@/assets/icons/jiantou_xiangshang.png"></li>
          <div class="slice-center"></div>
          <div class="slice-center2"></div>
        </ul>
      </div>
      <div class="inline-flex-start">
        <div>
          <a-button type="primary" class="a-button" @mousedown="ptzStart(8)" @mouseup="ptzStop(8)">放大+</a-button>
          <a-button type="primary" class="a-button" @mousedown="ptzStart(9)" @mouseup="ptzStop(9)">缩小-</a-button>
        </div>
        <div>
          <a-button type="primary" class="a-button" @mousedown="ptzStart(10)" @mouseup="ptzStop(10)">近焦距-</a-button>
          <a-button type="primary" class="a-button" @mousedown="ptzStart(11)" @mouseup="ptzStop(11)">远焦距+</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script>
import {
  videoGetVideoPath,
  videoPtzStart,
  videoPtzStop,
  cameraInfoDetail
} from '@/api/modular/main/camerainfo/cameraInfoManage'

export default {
  name: 'VideoDetail',
  data () {
    return {
      videoDetail: false,
      videoInfo: {},
      myPlayer: null
    }
  },
  mounted () {
    this.$once('hook:beforeDestroy', () => {
      if (this.myPlayer) {
        this.myPlayer.dispose()
      }
    })
  },
  methods: {
    showVideoDetail (id) {
      this.videoDetail = true
      cameraInfoDetail({ id: id }).then((res) => {
        if (res.success) {
          this.videoInfo = res.data
        } else {
          this.$message.error('获取详情失败') // + res.message
        }
      })
      videoGetVideoPath({ id: id }).then((res) => {
        if (res.code === '200') {
          if (this.myPlayer == null) {
            this.myPlayer = this.$video('myVideo', {
              // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
              controls: true,
              // 自动播放属性,muted:静音播放
              autoplay: 'muted',
              // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
              preload: 'auto',
              // 设置视频播放器的显示宽度（以像素为单位）
              width: '470px',
              // 设置视频播放器的显示高度（以像素为单位）
              height: '300px'
            })
          }
          this.myPlayer.src({
            src: res.data.url,
            type: 'application/x-mpegURL'
          })
          this.myPlayer.load()
          this.myPlayer.play()
        } else {
          this.$message.error('获取地址失败') // + res.message
        }
      })
    },
    // 云台控制开始
    ptzStart (direction) {
      videoPtzStart({ deviceSerial: this.videoInfo.cameraCode, channelNo: this.videoInfo.channelId, direction: direction }).then((res) => {
        if (res.code === '200') {
        } else {
          this.$message.error(res.msg) // + res.message
        }
      })
    },
    // 云台控制结束
    ptzStop (direction) {
      videoPtzStop({ deviceSerial: this.videoInfo.cameraCode, channelNo: this.videoInfo.channelId, direction: direction }).then((res) => {
        if (res.code === '200') {
        } else {
          this.$message.error(res.msg) // + res.message
        }
      })
    },
    close () {
      this.videoDetail = false
      this.videoInfo = {}
      if (this.myPlayer) {
        this.myPlayer.pause()
      }
    }
  }
}
</script>
<style lang="less">
.video-model {
  .ant-modal-header {
    background-color: #2a55a0;
    color: #fff;
    border: none;
    .anticon,
    .ant-modal-title {
      color: #fff;
    }
    .ant-modal-body {
      background-color: #1e62b2;
    }
  }
  .ant-modal-body {
    background-color: #35669e;
  }
}
</style>
<style lang="less" scoped>
.pie {
  position: relative;
  padding: 0;
  width: 162px;
  height: 162px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  background: #232942;
  opacity: 1;
}

.slice-center {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 41px;
  left: 41px;
  border-radius: 50%;
  background: #2c92ef;
}

.slice-center2 {
  position: absolute;
  width: 64px;
  height: 64px;
  top: 49px;
  left: 49px;
  border-radius: 50%;
  background: #1b7ed8;
}

.slice {
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 50%;
  transform-origin: 0 100%;
  border: 1px solid #2c92ef;
  /*box-shadow: 0 1px 0 #616a74 inset, 0 1px 5px #212528;*/
  background: #1b7ed8;
  cursor: pointer;
}

.slice-one {
  transform: rotate(-22.5deg) skewY(-45deg);
}

.slice-one:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-one img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-two {
  transform: rotate(22.5deg) skewY(-45deg);
}

.slice-two:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-two img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-three {
  transform: rotate(67.5deg) skewY(-45deg);
}

.slice-three:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-three img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-four {
  transform: rotate(112.5deg) skewY(-45deg);
}

.slice-four:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-four img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-five {
  transform: rotate(157.5deg) skewY(-45deg);
}

.slice-five:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-five img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-six {
  transform: rotate(202.5deg) skewY(-45deg);
}

.slice-six:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-six img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-seven {
  transform: rotate(247.5deg) skewY(-45deg);
}

.slice-seven:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-seven img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.slice-eight {
  transform: rotate(292.5deg) skewY(-45deg);
}

.slice-eight:hover {
  background: -webkit-linear-gradient(top, #5b6167, #1b7ed8);
}

.slice-eight img {
  transform: skewY(45deg) rotate(22.5deg);
  margin-top: 38px;
  margin-left: 13px;
  height: 20px;
  width: 20px;
}

.inline-flex {
  width: 100%;
  padding: 10px;
  display: inline-flex;
  justify-content: space-between;

  h4 {
    font-size: 16px;
    font-weight: bold;
  }

  .my-progress {
    width: 50%;
  }
}

.video-option {
  width: 100%;
  padding-left: 30px;

  .option {
    width: 35%;
  }

  .inline-flex-start {
    width: 55%;
    /*display: inline-flex;*/
    /*justify-content: flex-start;*/
    /*flex-wrap: wrap;*/
    padding-top: 40px;

    .a-button {
      width: 86px;
      margin: 0 10px 20px 0;
    }
  }
}
</style>
