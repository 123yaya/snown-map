<template>
  <a-modal
    title="查看排水户信息"
    :width="900"
    :visible="visible"
    :maskClosable="false"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <!--        <a-descriptions-item label="排水系统编码">-->
        <!--          <div style="width: 250px">-->
        <!--            {{ record.systemid }}-->
        <!--          </div>-->
        <!--        </a-descriptions-item>-->
        <a-descriptions-item label="名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="排水户地址">
          <div style="width: 250px">
            {{ record.addr }}
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
        <a-descriptions-item label="接入监测并编码">
          <div style="width: 250px">
            {{ record.connManholeid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="组织机构代码">
          <div style="width: 250px">
            {{ record.codeid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="法人代表">
          <div style="width: 250px">
            {{ record.legalperson }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          <div style="width: 250px">
            {{ record.tel }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="主管单位">
          <div style="width: 250px">
            {{ record.manager }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="排水户类型">
          <div style="width: 250px">
            {{ record.dischargerType }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否为重点排水户">
          <div style="width: 250px">
            {{ 'yes_or_no_integer' | dictType(record.keydischarger) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="主要生产工艺">
          <div style="width: 250px">
            {{ record.process }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="排水许可证编号">
          <div style="width: 250px">
            {{ record.licenceId }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="许可证颁发日期">
          <div style="width: 250px">
            {{ record.licenceIssuedate | moment('YYYY-MM-DD') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="用水总量">
          <div style="width: 250px">
            {{ record.totalQuant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="自备水量">
          <div style="width: 250px">
            {{ record.selfsupplyQuant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="总排水量">
          <div style="width: 250px">
            {{ record.dischargeQuant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="生产污水量">
          <div style="width: 250px">
            {{ record.prodsewaQuant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="生活污水量">
          <div style="width: 250px">
            {{ record.domesewaQuant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="第一类污染物名称">
          <div style="width: 250px">
            {{ record.gradelpollutant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="第二类污染物名称">
          <div style="width: 250px">
            {{ record.grade2pollutant }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="污水处理方式">
          <div style="width: 250px">
            {{ record.treatmentMethod }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="污水处理规模">
          <div style="width: 250px">
            {{ record.treatmentCapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="技术资料文件">
          <div style="width: 250px">
            {{ record.datalistid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据来源">
          <div style="width: 250px">
            {{ 'DATA_SOURCE' | dictType(record.datasource) }}
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
