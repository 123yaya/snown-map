<template>
  <a-modal
    title="查看排污企业"
    :width="900"
    :visible="visible"
    :maskClosable="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="企业单位名称">
          <div style="width: 250px">
            {{ record.enterpriseName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="单位性质">
          <div style="width: 250px">
            {{ 'ENTERPRISE_NATURE' | dictType(record.enterpriseNature) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="法人代表">
          <div style="width: 250px">
            {{ record.corporatRepresentative }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="组织机构代码">
          <div style="width: 250px">
            {{ record.organizationalCode }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所属行业">
          <div style="width: 250px">
            {{ 'INDUSTRY' | dictType(record.industry) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="联系地址">
          <div style="width: 250px">
            {{ record.contactAddress }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="联系人">
          <div style="width: 250px">
            {{ record.contactsName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="联系人电话">
          <div style="width: 250px">
            {{ record.contactsTel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否办理设置同意文件">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.isHandleAgreeFile) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否办理的登记文件">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.isHandleRegisterFile) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设置同意的入河信息">
          <div style="width: 250px">
            {{ record.discharge }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所属项目名称">
          <div style="width: 250px">
            {{ record.belongProject }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="审批单位及审批文号">
          <div style="width: 250px">
            {{ record.approvalSymbol }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="许可证号">
          <div style="width: 250px">
            {{ record.licenceCode }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="许可结论">
          <div style="width: 250px">
            {{ record.licenceConclusion }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否是重点污染源">
          <div style="width: 250px">
            {{ 'IS_IMPORTANT_POLLUTION_SOURCE' | dictType(record.isImportantPollutionSource) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="维度">
          <div style="width: 250px">
            {{ record.lat }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="经度">
          <div style="width: 250px">
            {{ record.lon }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="行政编号">
          <div style="width: 250px">
            {{ record.areacode }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="水主键">
          <div style="width: 250px">
            {{ record.waterid }}
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
