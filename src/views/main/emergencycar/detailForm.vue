<template>
  <a-modal
    title="查看应急车辆信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="车辆名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="车牌号">
          <div style="width: 250px">
            {{ record.plateNumber }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所属组织">
          <div style="width: 250px">
            {{ record.orgId }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="车辆类型">
          <div style="width: 250px">
            {{ 'EMERGENCY_CAR_TYPE' | dictType(record.type) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="应急车辆">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.isEmergency) }}
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
