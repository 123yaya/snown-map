<template>
  <a-modal title="查看泵站信息" :width="900" :visible="visible" :footer="null" @cancel="handleCancel" :maskClosable="false">
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
        <a-descriptions-item label="泵站名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="泵站地址">
          <div style="width: 250px">
            {{ record.addr }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="泵站分类">
          <div style="width: 250px">
            {{ 'PS_CATEGORY' | dictType(record.psCategory) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="泵总数">
          <div style="width: 250px">
            {{ record.psNum }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设计雨水排水能力">
          <div style="width: 250px">
            {{ record.designStormcapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设计污水排水能力">
          <div style="width: 250px">
            {{ record.designWwcapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="前池长">
          <div style="width: 250px">
            {{ record.forebaylen }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="前池宽">
          <div style="width: 250px">
            {{ record.forebaywid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="前池深">
          <div style="width: 250px">
            {{ record.forebaydep }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="进水池最高水位">
          <div style="width: 250px">
            {{ record.inMaxlevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="进水池设计运行水位">
          <div style="width: 250px">
            {{ record.inDesilevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="进水池最高运行水位">
          <div style="width: 250px">
            {{ record.inMaxopelevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="进水池最小运行水位">
          <div style="width: 250px">
            {{ record.inMinopelevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="出水池设计运行水位">
          <div style="width: 250px">
            {{ record.outDesilevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="出水池最低运行水位">
          <div style="width: 250px">
            {{ record.outMinopelevel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="出水池最高运行水位">
          <div style="width: 250px">
            {{ record.outMaxopelevel }}
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
            {{ record.reportDate | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="占地面积">
          <div style="width: 250px">
            {{ record.area }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="服务范围">
          <div style="width: 250px">
            {{ record.serviceScope }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="服务面积">
          <div style="width: 250px">
            {{ record.serviceArea }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="现有雨水排水能力">
          <div style="width: 250px">
            {{ record.currentStormcapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="现有污水排水能力">
          <div style="width: 250px">
            {{ record.currentWwcapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设计暴雨重现期">
          <div style="width: 250px">
            {{ record.designRtp }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="主供电源">
          <div style="width: 250px">
            {{ record.mainSupply }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="装机容量">
          <div style="width: 250px">
            {{ record.deviceCapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="备用电源">
          <div style="width: 250px">
            {{ record.backupSupply }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="辅助设施描述">
          <div style="width: 250px">
            {{ record.addiFac }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="溢流排放口">
          <div style="width: 250px">
            {{ record.overoutfallid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设施状态">
          <div style="width: 250px">
            {{ 'FACILITY_STATUS' | dictType(record.status) }}
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
