<template>
  <div class="news-content" v-if="isNews">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <h4>通知消息列表</h4>
        <a-icon type="close-circle" theme="outlined" class="close-btn" @click="isNews=!isNews" />
      </div>
      <a-radio-group :value="status" style="margin: 12px" @change="changeStatus" button-style="solid">
        <a-radio-button style="margin-right:15px;border-radius:6px" value="1">全部消息</a-radio-button>
        <a-radio-button style="margin-right:15px;border-radius:6px" value="2">未处理</a-radio-button>
        <a-radio-button style="margin-right:15px;border-radius:6px" value="3">已处理</a-radio-button>
      </a-radio-group>

      <a-table class="ant-table-striped news-table" :rowKey="(record,index) => index" :pagination="false" :customRow="drawMap" :columns="columns" :data-source="tableData" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)">
        <span slot="timeScopedSlots" slot-scope="text">
          {{ text.substr(0, 10) }}
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
import { schedulingMessageNoticeList } from '@/api/modular/main/schedulingmessage/schedulingMessageManage'

export default {
  name: 'NewsModel',
  data () {
    return {
      isNews: false,
      rowDetails: {},
      status: '1',
      columns: [
        {
          title: '任务类型',
          dataIndex: 'type',
          width: 80,
          align: 'center'
        },
        {
          title: '消息内容',
          dataIndex: 'name',
          align: 'center'
        }, {
          title: '时间',
          dataIndex: 'createTime',
          align: 'center',
          scopedSlots: { customRender: 'timeScopedSlots' }
        }
      ],
      tableData: []
    }
  },
  methods: {
    showNewsModel () {
      this.loadNotice()
      this.isNews = true
    },
    loadNotice () {
      schedulingMessageNoticeList({}).then((res) => {
        if (res.success) {
          this.tableData = res.data
        }
      }).finally((res) => {
      })
    },
    changeStatus (e) {
      this.status = e.target.value
    },
    drawMap (row, index) {
      return {
        on: {
          click: () => {
            // 追踪到地图上该位置
            this.$parent.mapGoTo(row.longitude, row.latitude)
          }
        }
      }
    }
  }
}
</script>

<style >
.news-content .news-table .table-striped {
  background-color: #134ae0;
}
.news-content .news-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-content {
  background-color: #004f98b8;
}
.news-content .news-table .ant-table-placeholder {
  background-color: #004f98b8;
}
.news-content .ant-table-small {
  border: none;
}
.news-content .news-table .ant-table-thead > tr > th {
  color: #8bc1f9;
  background-color: #1086ec;
  border: 1px solid #0577db;
  padding: 5px 2px;
}
.news-content .news-table .ant-table-tbody > tr > td {
  padding: 5px 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  background: #085eaa !important;
  border-bottom: 1px solid #0577db !important;
  cursor: pointer;
}
.news-content .news-table .ant-table-tbody > tr:nth-child(2n) td {
  background: #4996da !important;
}
.news-content .ant-radio-button-wrapper:not(:first-child)::before {
  display: none;
}
</style>
<style lang="less" scoped>
.news-content {
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
    .news-table {
      width: 100%;
      padding: 10px 10px 30px;
    }
  }
}
</style>
