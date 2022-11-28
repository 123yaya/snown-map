<template>
  <a-modal
    title="排水管线信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="管段编码">
          <div style="width: 250px">
            {{ record.pipeSectionNo }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管线材质">
          <div style="width: 250px">
            {{ record.pipelineMaterial }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起始井号">
          <div style="width: 250px">
            {{ record.startWellNumber }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终止井号">
          <div style="width: 250px">
            {{ record.endWellNumber }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起始点号">
          <div style="width: 250px">
            {{ record.startFieldStationNo }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终止点号">
          <div style="width: 250px">
            {{ record.endFieldStationNo }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管径">
          <div style="width: 250px">
            {{ record.pipeDiameter }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="压力">
          <div style="width: 250px">
            {{ record.pressure }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="埋设方式">
          <div style="width: 250px">
            {{ record.burialMethod }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管段类型">
          <div style="width: 250px">
            {{ record.pipeType }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管底埋深">
          <div style="width: 250px">
            {{ record.pipeBottomBurialDepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管尾埋深">
          <div style="width: 250px">
            {{ record.pipeTailBurialDepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管底高程">
          <div style="width: 250px">
            {{ record.pipeBottomElevation }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管尾高程">
          <div style="width: 250px">
            {{ record.pipeTailElevation }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="管段长度">
          <div style="width: 250px">
            {{ record.pipeLength }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="流向">
          <div style="width: 250px">
            {{ record.flowDirection }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="水流">
          <div style="width: 250px">
            {{ record.flow }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="水位">
          <div style="width: 250px">
            {{ record.waterLevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起始X坐标">
          <div style="width: 250px">
            {{ record.startX }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="起始Y坐标">
          <div style="width: 250px">
            {{ record.startY }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终止X坐标">
          <div style="width: 250px">
            {{ record.endX }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="终止Y坐标">
          <div style="width: 250px">
            {{ record.endY }}
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
