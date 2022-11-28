<template>
  <a-modal
    title="查看应急预案信息"
    :width="900"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="预案名称">
          <div style="width: 250px">
            {{ record.name }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="预警类型">
          <div style="width: 250px">
            {{ record.type }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="片区">
          <div style="width: 250px">
            {{ record.area }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="片区级预警">
          <div style="width: 250px">
            {{ record.level }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="短信通知人员" :span="2">
          {{ record.notePersonNames }}
        </a-descriptions-item>
        <a-descriptions-item label="附件" :span="2">
          <div v-for="(item, index) in record.emergencyPlanFiles" :key="index">
            {{ index + 1 }}、{{ item.fileOriginName }}
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
  import { emergencyPlanDetail } from '@/api/modular/main/emergencyplan/emergencyPlanManage'
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
        emergencyPlanDetail({ id: record.id }).then((res) => {
          if (res.success) {
            this.record = res.data
          }
        })
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
