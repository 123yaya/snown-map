<template>
  <a-modal
    title="查看摄像头信息"
    :width="900"
    :visible="visible"
    :maskClosable="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="摄像机名称">
          <div style="width: 250px">
            {{ record.cameraName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机编码">
          <div style="width: 250px">
            {{ record.cameraCode }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机ip地址">
          <div style="width: 250px">
            {{ record.cameraIp }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机位置">
          <div style="width: 250px">
            {{ record.cameraLocation }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机经度">
          <div style="width: 250px">
            {{ record.cameraLongitude }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机纬度">
          <div style="width: 250px">
            {{ record.cameraLatitude }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机所属行政区划">
          <div style="width: 250px">
            {{ record.cameraAddvcd }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="摄像机状态">
          <div style="width: 250px">
            {{ 'CAMERA_STATUS' | dictType(record.status) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="播放类型">
          <div style="width: 250px">
            {{ 'PLAY_TYPE' | dictType(record.playType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="码流类型">
          <div style="width: 250px">
            {{ 'STREAM_TYPE' | dictType(record.streamType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="通道号">
          <div style="width: 250px">
            {{ record.channelId }}
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
    <div class="buttonBox">
      <a-button type="primary" @click="handleCancel"> 关闭 </a-button>
    </div>
  </a-modal>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      spinLoading: false,
      record: {}
    }
  },
  methods: {
    // 初始化方法
    detail(record) {
      this.visible = true
      this.record = record
    },
    handleCancel() {
      this.visible = false
      this.record = {}
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
