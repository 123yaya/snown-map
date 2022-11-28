<template>
  <a-modal
    title="排水井信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="设施编号">
          <div style="width: 250px">
            {{ record.facilityNo }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="外业点号">
          <div style="width: 250px">
            {{ record.fieldStationNo }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="X坐标">
          <div style="width: 250px">
            {{ record.xcoordinate }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="Y坐标">
          <div style="width: 250px">
            {{ record.ycoordinate }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管线性质">
          <div style="width: 250px">
            {{ record.pipelineProperty }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="地面高程">
          <div style="width: 250px">
            {{ record.wellheadElevation }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖尺寸">
          <div style="width: 250px">
            {{ record.coverSize }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖材质">
          <div style="width: 250px">
            {{ record.coverMaterial }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井深">
          <div style="width: 250px">
            {{ record.wellDepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井径">
          <div style="width: 250px">
            {{ record.wellDiameter }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井尺寸">
          <div style="width: 250px">
            {{ record.wellSize }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井材质">
          <div style="width: 250px">
            {{ record.wellMaterial }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="附属物">
          <div style="width: 250px">
            {{ record.appendage }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="特征">
          <div style="width: 250px">
            {{ record.feature }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="类型">
          <div style="width: 250px">
            {{ record.type }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="道路名称">
          <div style="width: 250px">
            {{ record.roadName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="普查时间" :span="2">
          <div style="width: 250px" v-if="record.censusTime">
            {{ record.censusTime | moment('YYYY-MM-DD') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="备注" :span="2">
          <div style="width: 250px">
            {{ record.remarks }}
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
