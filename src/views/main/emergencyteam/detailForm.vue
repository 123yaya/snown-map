<template>
  <a-modal
    title="查看应急队伍信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="类型">
          <div style="width: 250px">
            {{ 'EMERGENCY_TEAM_TYPE' | dictType(record.type) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="关联组织">
          <div style="width: 250px">
            {{ record.orgId }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="领导小组成员">
          <div style="width: 250px">
            {{ record.leaderNames }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="组内成员">
          <div style="width: 250px">
            {{ record.personNames }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="抢险人员">
          <div style="width: 250px">
            {{ record.rescuePerson }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="主要抢险车辆">
          <div style="width: 250px">
            {{ record.mainCarNames }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="其他抢险车辆">
          <div style="width: 250px">
            {{ record.otherCarNames }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="抽水设备">
          <div style="width: 250px">
            {{ record.pumpingEquipment }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="液压动力站">
          <div style="width: 250px">
            {{ record.hpu }}
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
