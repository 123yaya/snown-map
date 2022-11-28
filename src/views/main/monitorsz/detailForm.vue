<template>
  <a-modal title="查看水质检测数据" :width="900" :visible="visible" :maskClosable="false" :footer="null" @cancel="handleCancel">
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
        <a-descriptions-item label="水温">
          <div style="width: 250px">
            {{ record.temp }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="pH值">
          <div style="width: 250px">
            {{ record.ph }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="溶解氧">
          <div style="width: 250px">
            {{ record.dissolvedOxygen }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="五日生化需氧量">
          <div style="width: 250px">
            {{ record.bod }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="化学需氧量">
          <div style="width: 250px">
            {{ record.cod }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总有机碳">
          <div style="width: 250px">
            {{ record.toc }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="悬浮物">
          <div style="width: 250px">
            {{ record.ss }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="氨氮">
          <div style="width: 250px">
            {{ record.nhN }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总氮">
          <div style="width: 250px">
            {{ record.tn }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总磷">
          <div style="width: 250px">
            {{ record.tp }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总镉">
          <div style="width: 250px">
            {{ record.cd }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总铬">
          <div style="width: 250px">
            {{ record.cr }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总镓">
          <div style="width: 250px">
            {{ record.hg }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总铅">
          <div style="width: 250px">
            {{ record.pb }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总砷">
          <div style="width: 250px">
            {{ record.as }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总铜">
          <div style="width: 250px">
            {{ record.cu }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总锌">
          <div style="width: 250px">
            {{ record.zn }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="水质检测单位">
          <div style="width: 250px">
            {{ record.analysisUnit }}
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
            {{ record.reportDate | moment('YYYY-MM-DD HH:mm') }}
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
