<template>
  <div class="planStart-content" v-if="planStart">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <h4>预案启动</h4>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="planStart=!planStart" />
      </div>
      <div class="inline-flex">
        <div>录入时间<span>{{ entryTime }}</span></div>
        <div>录入人<span>{{ entryUser }}</span></div>
      </div>
      <h6>片区级预警</h6>
      <div class="inline-flex-start">
        <div class="title">延吉片区</div>
        <a-radio-group :value="level" button-style="solid" size="small" @change="changeLevel">
          <a-radio-button style="margin-left:10px" value="一级">一级</a-radio-button>
          <a-radio-button style="margin-left:10px" value="二级">二级</a-radio-button>
          <a-radio-button style="margin-left:10px" value="三级">三级</a-radio-button>
          <a-radio-button style="margin-left:10px" value="四级">四级</a-radio-button>
        </a-radio-group>
      </div>
      <h6>短信通知对象</h6>
      <div class="inline-flex-start">
        <div class="flex-start-item" v-for="(item, index) in notePerson" :key="index">{{ item.name }}</div>
      </div>
      <a-button style="margin:20px auto 30px" @click="submitPlan" type="primary">确认提交</a-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { emergencyPlanIdNameList, emergencyPlanTeamIdNameList } from '@/api/modular/main/emergencyplan/emergencyPlanManage'
import { earlyWarnStartAdd, earlyWarnStartEdit } from '@/api/modular/main/earlywarnstart/earlyWarnStartManage'

export default {
  name: 'PlanStart',
  data () {
    return {
      planStart: false,
      entryUser: '',
      entryTime: '',
      level: '',
      notePerson: [],
      planId: '',
      id: ''
    }
  },
  methods: {
    ...mapGetters(['nickname']),

    showPlanStart (type, planInfo) {
      if (type === 'new') {
        this.entryTime = new Date().toLocaleDateString().split('/').map(item => {
          if (item < 10) {
            return '0' + item
          } else {
            return item
          }
        }).join('-')

        this.entryUser = this.nickname()
        this.level = '一级'
        this.notePerson = []
        this.planId = ''
        this.id = ''

        this.getPlanIdNameList(this.level)
      } else if (type === 'up' || type === 'down') {
        this.entryTime = planInfo.entryTime.substr(0, 10)
        this.entryUser = planInfo.entryUser
        this.level = planInfo.level

        this.notePerson = []
        const notePersonNames = planInfo.notePersonNames.split(',')
        for (let i = 0; i < notePersonNames.length; i++) {
          this.notePerson.push({ name: notePersonNames[i] })
        }

        this.planId = planInfo.planId
        this.id = planInfo.id
      }
      this.planStart = true
    },
    changeLevel (e) {
      this.level = e.target.value
      this.getPlanIdNameList(this.level)
    },
    // 查询该等级下的预案列表
    getPlanIdNameList (level) {
      const that = this
      emergencyPlanIdNameList({ level: level }).then((res) => {
        if (res.success) {
          that.planId = res.data[0].id
          that.getTeamIdNameList(that.planId)
        } else {
          that.notePerson = []
          this.$message.error('查询失败')
        }
      }).finally((res) => {
      })
    },
    // 查询绑定的应急队伍列表
    getTeamIdNameList (planId) {
      const that = this
      emergencyPlanTeamIdNameList({ id: planId }).then((res) => {
        if (res.success) {
          that.notePerson = res.data
        } else {
          that.notePerson = []
          this.$message.error('查询失败')
        }
      }).finally((res) => {
      })
    },
    submitPlan () {
      const that = this

      if (this.id === '') {
        const params = {
          entryTime: this.entryTime,
          entryUser: this.entryUser,
          level: this.level,
          planId: this.planId,
          status: 1
        }

        earlyWarnStartAdd(params).then((res) => {
          if (res.success) {
            that.$parent.earlyWarnCurrent()
            this.planStart = false
          } else {
            this.$message.error('新增失败')
          }
        }).finally((res) => {
        })
      } else {
        const params = {
          entryTime: this.entryTime,
          entryUser: this.entryUser,
          level: this.level,
          planId: this.planId,
          status: 1,
          id: this.id
        }

        earlyWarnStartEdit(params).then((res) => {
          if (res.success) {
            that.$parent.earlyWarnCurrent()
            this.planStart = false
          } else {
            this.$message.error('修改失败')
          }
        }).finally((res) => {
        })
      }
    }
  }
}
</script>
<style scoped>
label.ant-radio-button-wrapper {
  background-color: #eee;
}
</style>
<style lang="less" scoped>
.planStart-content {
  width: 600px;
  .inline-flex {
    width: 80%;
    margin: 0 auto;
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #fff;
    div {
      color: #4affff;
      font-size: 15px;
      font-weight: bold;
      span {
        color: #fff;
        padding-left: 5px;
      }
    }
  }
  .devicePanel-top {
    width: 100%;
    padding: 0 5%;
    height: 40px;
    line-height: 40px;
    background-color: #0565b0;
    border-bottom: 1px solid #2a558e;
    font-weight: bold;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: #4affff;
    font-size: 22px;
    &.inline-flex {
      width: 100%;
      justify-content: center;
      margin-bottom: 15px;
    }
    h4 {
      width: 70%;
      height: 100%;
      margin: 0 auto;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 15px;
      color: #4affff;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .devicePanel {
    width: 600px;
    border: 1px solid #2a558e;
    background-color: #227eca;
    position: absolute;
    left: calc(50% - 300px);
    top: 160px;
    z-index: 25;
    text-align: center;
    h6 {
      width: 100%;
      line-height: 50px;
      padding-left: 3%;
      color: #4affff;
      font-weight: bold;
      text-align: left;
    }
    .inline-flex-start {
      width: 100%;
      padding-left: 3%;
      margin: 0 auto;
      display: inline-flex;
      justify-content: flex-start;
      margin-bottom: 15px;
      color: #4affff;
      .title {
      }
      .flex-start-item {
        border: 1px solid #4affff;
        margin-right: 10px;
        padding: 4px 8px;
        border-radius: 5px;
      }
    }
  }
}
</style>
