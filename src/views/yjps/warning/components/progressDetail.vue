<template>
  <div class="progressDetail-content" v-if="isProgressDetail">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <h4>延吉大道</h4>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="isProgressDetail=!isProgressDetail" />
      </div>
      <div class="detail-text">
        <p>类型：{{ progressDetail.type }}</p>
        <p>名称：{{ progressDetail.name }}</p>
        <p>状态：{{ progressDetail.status === '2' ? '已调度' : '待调度' }}</p>
      </div>
      <a-collapse :activeKey="activeKey" accordion expandIconPosition="right">
        <a-collapse-panel key="1" header="上报信息">
          <div v-if="progressDetail.reportList&&progressDetail.reportList.length>0">
            <a-timeline mode="left">
              <a-timeline-item class="line-item" v-for="(line, index) in progressDetail.reportList" :key="index">
                <div class="inline-content">
                  <div class="inline-content-top">
                    <p>{{ line.type }}</p>
                    <p>{{ moment(line.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
                    <p>积水宽度：{{ line.waterDepth }}m</p>
                    <p>积水长度：{{ line.waterLength }}m</p>
                    <p>积水面积：{{ line.waterArea }}㎡</p>
                    <p>原因：{{ line.reason }}</p>
                    <p>处理措施：{{ line.measure }}</p>
                    <p>交通情况：{{ line.traffic }}</p>
                    <p>现场照片：</p>
                  </div>
                  <div class="inline-content-bottom">
                    <div class="swiperImgBox" v-for="(item, index) in line.photos.split(',')" :key="'before'+index" @click="previewImg(filePath+item)">
                      <img class="img" :src="filePath+item" alt="">
                    </div>
                  </div>
                </div>
                <!-- <div slot="dot">
                  <div class="num">{{ line.type }}</div>
                </div> -->
              </a-timeline-item>
            </a-timeline>
          </div>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="调度信息" expandIconPosition="right">
          <a-timeline mode="left">
            <a-timeline-item class="line-item" v-for="line1 in progressList2" :key="line1.id">
              <div class="inline-content">
                {{ line1.time }}{{ line1.msg }}
              </div>
              <div slot="dot">
                <div class="num">{{ line1.id }}</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <preview-img ref="previewImg" />
  </div>
</template>
<script>
import moment from 'moment'
import previewImg from '@/components/previewImg/previewImg'
import { schedulingTaskDetai, schedulingTaskDetail } from '@/api/modular/main/schedulingtask/schedulingTaskManage'
export default {
  name: 'ProgressDetail',
  components: {
    previewImg
  },
  data () {
    return {
      filePath: process.env.VUE_APP_FILE_BASE_URL,
      isProgressDetail: false,
      progressDetail: {},
      activeKey: '1',
      progressList2: [
        { id: 6, time: '2022-04-19 09:50:21', msg: '[新塘测试巡防组01组1]确定出发' },
        { id: 5, time: '2022-04-19 09:50:21', msg: '[新塘测试巡防组01组1]接收调度任务' },
        { id: 4, time: '2022-04-19 09:50:21', msg: '调度[新塘测试巡防组01组1]增援' },
        { id: 3, time: '2022-04-19 09:50:21', msg: '[新塘测试标准组01组1]请求人员增援,水泵增援' },
        { id: 2, time: '2022-04-19 09:50:21', msg: '[新塘测试标准组01组1]确定出发' },
        { id: 1, time: '2022-04-19 09:50:21', msg: '发布预警' }
      ]
    }
  },
  methods: {
    moment,
    // 查看图片
    previewImg (e) {
      this.$refs.previewImg.imgUrl = e
      this.$refs.previewImg.show()
    },
    showProgressDetail (id) {
      this.isProgressDetail = true
      schedulingTaskDetail({ id }).then(res => {
        if (res.success) {
          this.progressDetail = res.data
        }
      })
    }
  }
}
</script>
<style>
.progressDetail-content .ant-collapse.ant-collapse-icon-position-right {
  width: 94%;
  margin: 0 auto;
  border: none;
  color: #03a9f4;
  background-color: #227eca;
  text-align: left;
}
.progressDetail-content .ant-collapse-header {
  text-align: left;
  color: #40dcff !important;
  font-weight: 700;
}
.progressDetail-content .ant-collapse > .ant-collapse-item {
  border: 1px solid #03a9f4;
  margin: 20px 0 20px;
}
.progressDetail-content .ant-timeline-item-head {
  background: #48a0e9;
}
.progressDetail-content .ant-collapse-content {
  border: none;
}
.progressDetail-content .ant-collapse-content > .ant-collapse-content-box {
  max-height: 300px;
  overflow-y: auto;
  height: 100%;
  color: #d0e9fd;
  background: #48a0e9;
  border-top: 1px solid #03a9f4;
}
</style>
<style lang="less" scoped>
.progressDetail-content {
  width: 500px;
  .inline-flex {
    width: 90%;
    margin: 0 auto;
    display: inline-flex;
    justify-content: center;
    margin-bottom: 15px;
    color: #fff;
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
    width: 500px;
    border: 1px solid #2a558e;
    background-color: #227eca;
    position: absolute;
    right: 15px;
    top: 90px;
    z-index: 5;
    text-align: center;

    .time {
      color: #fff;
      font-size: 15px;
    }
  }
  .detail-text p {
    padding: 5px 10px;
    margin-bottom: 2px;
    min-width: 50%;
    display: flex;
    color: #d0e9fd;
    font-size: 16px;
  }
  .inline-content {
    width: 100%;
    .inline-content-top {
      width: 100%;
      padding: 0 10px;
      color: #d0e9fd;
      font-size: 15px;
    }
    .inline-content-bottom {
      width: 100%;
      padding: 0 10px;
      display: flex;
      justify-content: flex-start;
      .swiperImgBox {
        width: 32%;
        margin-right: 1%;
        cursor: pointer;
        .img {
          width: 100%;
          height: auto;
          display: inline-block;
        }
      }
    }
  }
  .num {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: auto;
    background: #03a9f4;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
  li.line-item.ant-timeline-item.ant-timeline-item-left {
    color: #d0e9fd;
    font-size: 16px;
  }
}
</style>
