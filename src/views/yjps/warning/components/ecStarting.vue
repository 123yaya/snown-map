<template>
  <div class="ecStarting-content" v-if="isEcStarting">
    <div class="devicePanel">
      <img src="@/assets/warn/earing.png" class="ecStarting-icon">
      <div class="ecStarting-tip-info">启动延吉市{{ currentPlanStart.level }}预案应急响应</div>
      <div class="btns">
        <a-button class="cancle-btn" style="margin-right:20px;background-color:#42C3AD" @click="stopWarn">结束预警</a-button>
        <a-button class="cancle-btn" style="margin-right:20px;background-color:#f79220" @click="warning('up')">升级预警</a-button>
        <a-button class="cancle-btn" style="margin-right:20px;background-color:#81BAEF" @click="warning('down')">降级预警</a-button>
      </div>
    </div>
  </div>
</template>
<script>
import { earlyWarnStartEdit } from '@/api/modular/main/earlywarnstart/earlyWarnStartManage'

export default {
  name: 'EcStarting',
  data () {
    return {
      isEcStarting: false,
      currentPlanStart: null // 当前正在启动的预案
    }
  },
  methods: {
    showEcStarting (planInfo) {
      this.isEcStarting = true
      this.currentPlanStart = planInfo
    },
    warning (type) {
      this.$parent.editWarning(type, this.currentPlanStart)
    },
    stopWarn () {
      const that = this
      const params = {
        id: this.currentPlanStart.id,
        status: '2'
      }

      earlyWarnStartEdit(params).then((res) => {
        if (res.success) {
          that.$parent.earlyWarnCurrent()
          that.isEcStarting = false
        } else {
          that.$message.error('操作失败')
        }
      }).finally((res) => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ecStarting-content {
  width: 800px;
  .devicePanel {
    width: 800px;
    height: 40px;
    padding: 0 15px;
    background-color: #0565b0;
    border-radius: 4px;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: calc(50% - 400px);
    top: 40px;
    z-index: 99;
    .ecStarting-icon {
      width: 116px;
      height: 116px;
      position: absolute;
      top: 50%;
      left: -20px;
      transform: translateY(-50%);
    }
    .ecStarting-tip-info {
      padding-left: 80px;
      line-height: 40px;
      color: #f79221;
      font-size: 15px;
    }
    .cancle-btn {
      margin-top: 4px;
      color: #fff;
      border: none;
    }
  }
}
</style>
