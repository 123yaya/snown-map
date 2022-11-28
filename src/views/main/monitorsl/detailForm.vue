<template>
  <a-modal title="查看液位、流量与雨量监测数据" :width="900" :visible="visible" :maskClosable="false" :footer="null" @cancel="handleCancel">
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="所在监视点编码">
          <div style="width: 250px">
            {{ record.monitorid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="监测时间">
          <div style="width: 250px">
            {{ record.sampleTime | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="液位">
          <div style="width: 250px">
            {{ record.waterlevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="流速">
          <div style="width: 250px">
            {{ record.watervelocity }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="流量">
          <div style="width: 250px">
            {{ record.flow }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨量">
          <div style="width: 250px">
            {{ record.rainfall }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据获取时间">
          <div style="width: 250px">
            {{ record.recordTime | moment('YYYY-MM-DD HH:mm') }}
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
  data () {
    return {
      visible: false,
      spinLoading: false,
      record: {}
    }
  },
  methods: {
    // 初始化方法
    detail (record) {
      this.visible = true
      this.record = record
    },
    handleCancel () {
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
