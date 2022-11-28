<template>
  <a-modal
    title="查看排水渠信息"
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
        <a-descriptions-item label="渠道类别">
          <div style="width: 250px">
            {{ 'CONDUIT_CATEGORY' | dictType(record.conduitCategory) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="渠道类型">
          <div style="width: 250px">
            {{ 'CONDUIT_STYLE' | dictType(record.conduitStyle) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="渠道长度">
          <div style="width: 250px">
            {{ record.conduitLength }}
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
        <a-descriptions-item label="起点渠底标高">
          <div style="width: 250px">
            {{ record.inElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终点渠底标高">
          <div style="width: 250px">
            {{ record.outElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面形式">
          <div style="width: 250px">
            {{ 'SHAPE_TYPE' | dictType(record.shapeType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据1">
          <div style="width: 250px">
            {{ record.shapeData1 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据2">
          <div style="width: 250px">
            {{ record.shapeData2 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据3">
          <div style="width: 250px">
            {{ record.shapeData3 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据4">
          <div style="width: 250px">
            {{ record.shapeData4 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="断面数据5">
          <div style="width: 250px">
            {{ record.shapeXydata }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="渠道材质">
          <div style="width: 250px">
            {{ 'CONDUIT_MATERIAL' | dictType(record.material) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="渠道糙率">
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
        <a-descriptions-item label="渠道结构">
          <div style="width: 250px">
            {{ 'CONDUIT_STRUCT' | dictType(record.conduitstruct) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="渠道坡度">
          <div style="width: 250px">
            {{ record.conduitSlope }}
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
        <a-descriptions-item label="原始结构状态">
          <div style="width: 250px">
            {{ 'ORIGIN_STRUCT' | dictType(record.originstruct) }}
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
