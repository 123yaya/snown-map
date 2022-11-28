<template>
  <a-modal
    title="查看监测点数据信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="排水系统编码">
          <div style="width: 250px">
            {{ record.systemid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测点名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="坐标X">
          <div style="width: 250px">
            {{ record.xcoor }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="坐标Y">
          <div style="width: 250px">
            {{ record.ycoor }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测点地址">
          <div style="width: 250px">
            {{ record.addr }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监视方式">
          <div style="width: 250px">
            {{ 'MONITOR_METHOD' | dictType(record.method) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测数据类别">
          <div style="width: 250px">
            {{ 'MONITOR_TYPE' | dictType(record.method) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测频率">
          <div style="width: 250px">
            {{ record.frequency }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测设备名称">
          <div style="width: 250px">
            {{ record.deviceName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测设备型号">
          <div style="width: 250px">
            {{ record.deviceModel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所在设施编码">
          <div style="width: 250px">
            {{ record.nodeid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="流量监测管线编码">
          <div style="width: 250px">
            {{ record.pipeid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="流量监测管线编码2">
          <div style="width: 250px">
            {{ record.pipeid2 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测点周边情况描述">
          <div style="width: 250px">
            {{ record.description }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报单位">
          <div style="width: 250px">
            {{ record.reportUnit }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报日期">
          <div style="width: 250px">
            {{ record.reportDate | moment('YYYY-MM-DD') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          <div style="width: 250px">
            {{ record.remark }}
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
