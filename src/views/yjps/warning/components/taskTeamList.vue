<template>
  <div class="taskList-content" v-if="isTaskList">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <h4>队伍列表</h4>
        <div style="width:45%;display:flex;align-items:center">
          <a-input class="cph-input" :value="plateNumber" placeholder="请输入车牌号" />
          <a-select class="pq-select" :value="area" @change="changeArea" allow-clear placeholder="请选择片区">
            <a-select-option value="延吉">延吉</a-select-option>
          </a-select>
        </div>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="isTaskList=!isTaskList" />
      </div>
      <a-table class="ant-table-striped taskList-table" :rowKey="(record) => record.id" :pagination="false" :columns="columns" :data-source="tableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        <span slot="typeScopedSlots" slot-scope="text">
          {{ 'EMERGENCY_TEAM_TYPE' | dictType(text) }}
        </span>
        <template slot="action" slot-scope="text, record">
          <a-button size="small" type="primary" @click="doDispatch(record)">调度</a-button>
          <a-button size="small" style="margin-left:10px" type="primary">详情</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { emergencyPlanTeamList } from '@/api/modular/main/emergencyplan/emergencyPlanManage'
import { schedulingMessageAdd } from '@/api/modular/main/schedulingmessage/schedulingMessageManage'

export default {
  name: 'TaskList',
  data () {
    return {
      isTaskList: false,
      rowDetails: {},
      plateNumber: '',
      area: undefined,
      currentPlanStart: null,
      taskId: '',
      columns: [
        {
          title: '出勤队长',
          dataIndex: 'leaderNames',
          align: 'center'
        },
        {
          title: '队伍名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '队伍类型',
          dataIndex: 'type',
          align: 'center',
          scopedSlots: { customRender: 'typeScopedSlots' }
        },
        {
          title: '主车辆',
          dataIndex: 'mainCarNames',
          align: 'center'
        }, {
          title: '片区',
          dataIndex: 'orgId',
          align: 'center'
        }, {
          title: '当前任务数量',
          dataIndex: 'num',
          align: 'center'
        }, {
          title: '距离',
          dataIndex: 'jl',
          align: 'center'
        }, {
          title: '操作',
          align: 'center',
          width: 150,
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      tableData: []
    }
  },
  methods: {
    showTaskTeamList (planInfo, taskId) {
      this.currentPlanStart = planInfo
      this.taskId = taskId
      this.loadTeamList(this.currentPlanStart.planId)
      this.isTaskList = true
    },
    changeArea (value) {
      this.area = value
    },
    // 获取队伍列表
    loadTeamList (planId) {
      emergencyPlanTeamList({ id: planId }).then((res) => {
        if (res.success) {
          this.tableData = res.data
        }
      }).finally((res) => {
      })
    },
    doDispatch (record) {
      const params = {
        taskId: this.taskId,
        remarks: '调度[' + record.name + ']'
      }

      schedulingMessageAdd(params).then((res) => {
        if (res.success) {
          this.$message.success('调度成功！')
          this.isTaskList = false
        } else {
          this.$message.error('调度失败！')
        }
      }).finally((res) => {
      })
    }
  }
}
</script>

<style >
.taskList-content .taskList-table .table-striped {
  background-color: #134ae0;
}
.taskList-content .taskList-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-content {
  background-color: #004f98b8;
}
.taskList-content .taskList-table .ant-table-placeholder {
  background-color: #004f98b8;
}
.taskList-content .ant-table-small {
  border: none;
}
.taskList-content .taskList-table .ant-table-thead > tr > th {
  color: #8bc1f9;
  background-color: #1086ec;
  border: 1px solid #0577db;
  padding: 5px 2px;
}
.taskList-content .taskList-table .ant-table-tbody > tr > td {
  padding: 5px 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  background: #085eaa !important;
  border-bottom: 1px solid #0577db !important;
}
.taskList-content .taskList-table .ant-table-tbody > tr:nth-child(2n) td {
  background: #4996da !important;
}
.taskList-content .ant-select-selection__placeholder,
.taskList-content .ant-select-arrow {
  color: #29b5d9;
}
</style>
<style lang="less" scoped>
.taskList-content {
  width: 900px;
  .inline-flex {
    width: 96%;
    margin: 0 auto;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #fff;
  }
  .devicePanel-top {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    background-color: #0565b0;
    border-bottom: 1px solid #2a558e;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: #4affff;
    font-size: 22px;
    h4 {
      width: 40%;
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
  }
  .devicePanel {
    width: 900px;
    border: 1px solid #2a558e;
    background-color: #227eca;
    position: absolute;
    left: calc(50% - 450px);
    bottom: 140px;
    z-index: 99;
    text-align: center;

    .time {
      color: #fff;
      font-size: 15px;
    }
    .taskList-table {
      width: 100%;
      padding: 10px 10px 30px;
    }
  }
  .cph-input {
    width: 120px;
    background: transparent;
    border: 1px solid #4ac0c4;
    color: #29b5d9 !important;
  }
  .pq-select {
    width: 120px;
    margin: 0 10px 0 12px;
    background: transparent;
    border: 1px solid #4ac0c4;
    color: #29b5d9;
  }
}
</style>
