<template>
  <div class="TaskDoing-content" v-if="isTaskDoing">
    <div class="devicePanel">
      <h4>
        <a-icon style="font-size: 16px; padding: 4px;color:#f79221" type="bell" />
        任务调度中
      </h4>
      <a-button class="cancle-btn" @click="quiteTask()">退出调度</a-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TaskDoing',
  data () {
    return {
      isTaskDoing: false
    }
  },
  methods: {
    showTaskDoing () {
      this.isTaskDoing = true
    },
    quiteTask () {
      this.$parent.stopTaskDoing()
      this.isTaskDoing = !this.isTaskDoing
    }

  }
}
</script>

<style lang="less" scoped>
.TaskDoing-content {
  width: 300px;
  .devicePanel {
    width: 300px;
    height: 40px;
    padding: 0 15px;
    background-color: #0565b0;
    border-radius: 4px;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: #4affff;
    font-size: 22px;
    position: absolute;
    left: calc(50% - 150px);
    top: 90px;
    z-index: 99;

    h4 {
      width: 60%;
      height: 100%;
      line-height: 40px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #4affff;
      font-weight: bold;
      font-size: 16px;
      text-align: left;
    }
    .cancle-btn {
      margin-top: 4px;
      background: #1890ff;
      color: #fff;
      border: none;
    }
  }
}
</style>
