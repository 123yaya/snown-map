<template>
  <a-modal
    title="查看闸门信息"
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
        <a-descriptions-item label="闸门名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="类别">
          <div style="width: 250px">
            {{ 'GATE_CATEGORY' | dictType(record.gateCategory) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="生产厂家">
          <div style="width: 250px">
            {{ record.manufacturer }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门型号">
          <div style="width: 250px">
            {{ record.model }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门高程">
          <div style="width: 250px">
            {{ record.topElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门净高">
          <div style="width: 250px">
            {{ record.height }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门净宽">
          <div style="width: 250px">
            {{ record.width }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据来源">
          <div style="width: 250px">
            {{ 'DATA_SOURCE' | dictType(record.datasource) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="技术资料文件">
          <div style="width: 250px">
            {{ record.datalistid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据获取日期">
          <div style="width: 250px">
            {{ record.recordDate }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报单位">
          <div style="width: 250px">
            {{ record.reportUnit }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报日期">
          <div style="width: 250px">
            {{ record.reportDate }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门控制类型">
          <div style="width: 250px">
            {{ 'GATE_CONTROL_TYPE' | dictType(record.controlType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门启闭形式">
          <div style="width: 250px">
            {{ 'GATE_SWITCH_STYLE' | dictType(record.switchStyle) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门排数">
          <div style="width: 250px">
            {{ record.rowNum }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="闸门孔数">
          <div style="width: 250px">
            {{ record.holeNum }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设施状态">
          <div style="width: 250px">
            {{ 'FACILITY_STATUS' | dictType(record.status) }}
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
