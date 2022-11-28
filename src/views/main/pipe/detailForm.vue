<template>
  <a-modal
    title="查看排水管信息"
    :width="900"
    :visible="visible"
    :maskClosable="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="排水系统编码">
          <div style="width: 250px">
            {{ record.systemid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道类别">
          <div style="width: 250px">
            {{ 'PIPE_CATEGORY' | dictType(record.pipeCategory) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道长度">
          <div style="width: 250px">
            {{ record.pipeLength }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所在道路名称">
          <div style="width: 250px">
            {{ record.roadName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起点编码">
          <div style="width: 250px">
            {{ record.inJuncid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终点编码">
          <div style="width: 250px">
            {{ record.outJuncid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起点管底标高">
          <div style="width: 250px">
            {{ record.inElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终点管底标高">
          <div style="width: 250px">
            {{ record.outElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面形式">
          <div style="width: 250px">
            {{ 'SHAPE_TYPE' | dictType(record.shapetype) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否倒虹管">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.invertsilphon) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据1">
          <div style="width: 250px">
            {{ record.shapeData1 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据2">
          <div style="width: 250px">
            {{ record.shaneData2 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据3">
          <div style="width: 250px">
            {{ record.shaneData3 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据4">
          <div style="width: 250px">
            {{ record.shaneData4 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据5">
          <div style="width: 250px">
            {{ record.shaneXydata }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道材质">
          <div style="width: 250px">
            {{ 'PIPE_MATERIAL' | dictType(record.material) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道糙率">
          <div style="width: 250px">
            {{ record.roughness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据来源">
          <div style="width: 250px">
            {{ 'DATA_SOURCE' | dictType(record.datasource) }}
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
        <a-descriptions-item label="压力类型">
          <div style="width: 250px">
            {{ 'PRESSURE_TYPE' | dictType(record.pressureType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="壁厚">
          <div style="width: 250px">
            {{ record.wallThickness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道衬里材质">
          <div style="width: 250px">
            {{ 'LINER_MATERIAL' | dictType(record.linerMaterial) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="衬里厚度">
          <div style="width: 250px">
            {{ record.linerThickness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="接头形式">
          <div style="width: 250px">
            {{ 'JOINT_TYPE' | dictType(record.jointType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="连接方式">
          <div style="width: 250px">
            {{ 'CONN_TYPE' | dictType(record.connType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管道坡度">
          <div style="width: 250px">
            {{ record.pipeSlope }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管理归属">
          <div style="width: 250px">
            {{ 'OWNER_SHIP' | dictType(record.ownership) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面面积">
          <div style="width: 250px">
            {{ record.shapeArea }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否有自冲洗设备">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.selfwashing) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否存在雨污混接现象">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.rainsewamix) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="原始结构状态">
          <div style="width: 250px">
            {{ 'ORIGIN_STRUCT' | dictType(record.originstruct) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="敷设方式">
          <div style="width: 250px">
            {{ 'CONSTR_METHOD' | dictType(record.constrMethod) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="非开挖维修方式">
          <div style="width: 250px">
            {{ 'TRENCHLESS_METHOD' | dictType(record.trenchlessMethod) }}
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
