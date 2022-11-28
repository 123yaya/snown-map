<template>
  <a-modal title="查看检查井信息" :width="900" :visible="visible" :maskClosable="false" :footer="null" @cancel="handleCancel">
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
        <a-descriptions-item label="所在道路名称">
          <div style="width: 250px">
            {{ record.roadName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井类别">
          <div style="width: 250px">
            {{ 'MANHOLE_CATEGORY' | dictType(record.manholeCategory) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井类型">
          <div style="width: 250px">
            {{ 'MANHOLE_TYPE' | dictType(record.manholeType) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井形式">
          <div style="width: 250px">
            {{ 'MANHOLE_STYLE' | dictType(record.manholeStyle) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井井深">
          <div style="width: 250px">
            {{ record.depth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="地面高程">
          <div style="width: 250px">
            {{ record.surfaceElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据来源">
          <div style="width: 250px">
            {{ 'DATA_SOURCE' | dictType(record.datasource) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据获取日期">
          <div style="width: 250px">
            {{ record.recordDate | moment('YYYY-MM-DD HH:mm') }}
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
        <a-descriptions-item label="附属物描述">
          <div style="width: 250px">
            {{ record.addiFae }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井盖材质">
          <div style="width: 250px">
            {{ 'MANHOLE_COVER_MATERIAL' | dictType(record.covMaterial) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖形状">
          <div style="width: 250px">
            {{ 'MANHOLE_COVER_SHAPE' | dictType(record.covShape) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖尺寸1">
          <div style="width: 250px">
            {{ record.cnvDimen1 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖尺寸2">
          <div style="width: 250px">
            {{ record.covDimen2 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖尺寸3">
          <div style="width: 250px">
            {{ record.covDimen3 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井盖厚度">
          <div style="width: 250px">
            {{ record.covThickness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井室类型">
          <div style="width: 250px">
            {{ record.chamberType }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井室长度">
          <div style="width: 250px">
            {{ record.chamberLength }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井室宽度">
          <div style="width: 250px">
            {{ record.chamberWidth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井室高度">
          <div style="width: 250px">
            {{ record.chamberHeight }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井筒高度">
          <div style="width: 250px">
            {{ record.wellboreHeight }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="探测时水深">
          <div style="width: 250px">
            {{ record.surveyWaterdepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="探测时泥深">
          <div style="width: 250px">
            {{ record.surveySedidepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="探测日期">
          <div style="width: 250px">
            {{ record.surveyDate | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="井底形式">
          <div style="width: 250px">
            {{ 'MANHOLE_BOTTOM_STYLE' | dictType(record.bottomStyle) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查井等级">
          <div style="width: 250px">
            {{ 'MANHOLE_CLASS' | dictType(record.juneClass) }}
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
