<template>
  <div class="yldVideo-content" v-if="yldVideo">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <h4>易涝点视频列表</h4>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="yldVideo=!yldVideo" />
      </div>
      <a-table class="ant-table-striped water-table" :rowKey="(record) => record.key" :customRow="showVideo" :columns="columns" :data-source="tableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
    </div>
    <!-- 视频 -->
    <div v-show="videoModel" class="video-model">
      <div class="devicePanel-top inline-flex">
        <h4>{{ rowDetails.name }}</h4>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="videoModel=!videoModel" />
      </div>
      <video id="videoElement" controls="controls" preload="auto" style="width: 100%;" src="https://zhps.zc.gov.cn/93RiskPoint/ZC_YHDVideo/pj579(pj578)pj577.webm"></video>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YldVideo',
  data () {
    return {
      yldVideo: false,
      videoModel: false,
      rowDetails: {},
      columns: [
        {
          title: '序号',
          dataIndex: 'key',
          width: 80,
          align: 'center'
        },
        {
          title: '视频监控点名称',
          dataIndex: 'name',
          width: 200,
          align: 'center'
        }
      ],
      tableData: [
        {
          key: 1,
          name: '铁塔路闸门001'
        },
        {
          key: 2,
          name: '铁塔路闸门002'
        },
        {
          key: 3,
          name: '铁塔路闸门003'
        }]
    }
  },
  methods: {
    showYldVideo () {
      this.yldVideo = true
    },
    showVideo (row, index) {
      return {
        on: {
          click: () => {
            console.log(row, '当前行数据')
            console.log(index, '当前行索引')
            this.rowDetails = row
            this.videoModel = true
          }
        }
      }
    }
  }
}
</script>

<style >
.yldVideo-content .water-table .table-striped {
  background-color: #134ae0;
}
.yldVideo-content .water-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-content {
  background-color: #004f98b8;
}
.yldVideo-content .water-table .ant-table-placeholder {
  background-color: #004f98b8;
}
.yldVideo-content .ant-table-small {
  border: none;
}
.yldVideo-content .water-table .ant-table-thead > tr > th {
  color: #8bc1f9;
  background-color: #1086ec;
  border: 1px solid #0577db;
  padding: 5px 2px;
}
.yldVideo-content .water-table .ant-table-tbody > tr > td {
  padding: 5px 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  background: #085eaa !important;
  border-bottom: 1px solid #0577db !important;
}
</style>
<style lang="less" scoped>
.yldVideo-content {
  width: 400px;
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
    width: 400px;
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
    .water-table {
      width: 100%;
      padding: 10px 10px 30px;
    }
  }
  .video-model {
    width: 400px;
    border: 1px solid #2a558e;
    background-color: #227eca;
    margin-top: 50px;
    text-align: center;
    z-index: 5;
    position: absolute;
    bottom: 20px;
    right: 15px;
    #videoElement {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
