<template>
  <a-modal title="查看管渠内窥检测数据" :width="900" :visible="visible" :footer="null" @cancel="handleCancel" :maskClosable="false">
    <a-spin :spinning="spinLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="排水管、排水渠编码">
          <div style="width: 250px">
            {{ record.pipeconduitid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检查时间">
          <div style="width: 250px">
            {{ record.detectTime | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检测单位">
          <div style="width: 250px">
            {{ record.detectUnit }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检测人">
          <div style="width: 250px">
            {{ record.detectPerson }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检测单位联系方式">
          <div style="width: 250px">
            {{ record.contacts }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检测方法">
          <div style="width: 250px">
            {{ 'DETECT_METHOD' | dictType(record.detectMethod) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="检测方向">
          <div style="width: 250px">
            {{ 'DETECT_DIR' | dictType(record.detectDir) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="封堵情况">
          <div style="width: 250px">
            {{ record.pipeBlock }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="淤泥厚度">
          <div style="width: 250px">
            {{ record.siltThickness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="功能性缺陷类型">
          <div style="width: 250px">
            {{ 'FUNC_DEFECT' | dictType(record.funeDefect) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="功能性缺陷长度">
          <div style="width: 250px">
            {{ record.funeLength }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="功能性缺陷位置">
          <div style="width: 250px">
            {{ record.funeAddr }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="功能性缺陷等级">
          <div style="width: 250px">
            {{ record.funeClass }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="结构性缺陷类型">
          <div style="width: 250px">
            {{ 'STRUCT_DEFECT' | dictType(record.structDefect) }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="结构性缺陷长度">
          <div style="width: 250px">
            {{ record.structLength }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="结构性缺陷位置">
          <div style="width: 250px">
            {{ record.structAddr }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="结构性缺陷等级">
          <div style="width: 250px">
            {{ record.structClass }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="修复指数 RI">
          <div style="width: 250px">
            {{ record.repairIndex }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="养护指数 MI">
          <div style="width: 250px">
            {{ record.maintainIndex }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="缺陷描述">
          <div style="width: 250px">
            {{ record.problem }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="影像文件名">
          <div style="width: 250px">
            {{ record.videofilename }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报单位">
          <div style="width: 250px">
            {{ record.reportUnit }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报日期">
          <div style="width: 250px">
            {{ record.reportDate | moment('YYYY-MM-DD') }}
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
