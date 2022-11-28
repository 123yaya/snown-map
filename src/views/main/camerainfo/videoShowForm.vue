<template>
  <a-modal :title="title" :width="900" :visible="visible" :maskClosable="false" :footer="null" @cancel="handleCancel">
    <a-spin :spinning="spinLoading">
      <video id="myVideo" class="video-js">
      </video>
    </a-spin>
  </a-modal>
</template>

<script>
import { videoGetVideoPath } from '@/api/modular/main/camerainfo/cameraInfoManage'

export default {
  components: {},
  data () {
    return {
      visible: false,
      spinLoading: false,
      title: '',
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
    // 初始化方法
    show (record) {
      this.title = record.cameraName
      this.visible = true
      videoGetVideoPath({ id: record.id }).then((res) => {
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
              width: '850px',
              // 设置视频播放器的显示高度（以像素为单位）
              height: '500px'
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
    handleCancel () {
      this.visible = false
      this.myPlayer.pause()
    }
  }
}
</script>
<style lang="less" scoped>
.buttonBox {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
