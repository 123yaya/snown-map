<template>
  <div class="waterQuality-content" v-if="waterQuality">
    <div class="devicePanel">
      <div class="devicePanel-top inline-flex">
        <i class="iconfont icon-shangyibu"></i>
        <h4>水质抽样点片区分析点列表</h4>
        <img @click="waterQuality=!waterQuality" src="@/assets/map/close.png" style="width:20px;height:20px;cursor: pointer;margin-top: 10px" alt="">
      </div>
      <!--      <div class="inline-flex">-->
      <!--        <span>分析点显示</span>-->
      <!--        <a-switch :value="status1" @change="showWaterLevel" />-->
      <!--      </div>-->
      <!--      <div class="inline-flex">-->
      <!--        <span>分析点摘要显示</span>-->
      <!--        <a-switch :value="status2" />-->
      <!--      </div>-->
      <!--      <div class="inline-flex">-->
      <!--        <span>收水范围显示</span>-->
      <!--        <a-switch :value="status3" />-->
      <!--      </div>-->
      <!--      <div class="inline-flex">-->
      <!--        <span>多点对比显示</span>-->
      <!--        <a-switch :value="status4" />-->
      <!--      </div>-->
      <h6 class="time">水质分析时间：<span>2022-05-12 17:00</span></h6>
      <a-table class="ant-table-striped water-table" :pagination="false" size="small" :columns="columns" :data-source="tableData" :customRow="handleClickRow" :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" />
    </div>
    <!-- 图例 -->
    <div class="tuli-list">
      <div class="online-status" v-for="tuli in data" :key="tuli.id">
        <!-- <div class="point" :style="{'background':tuli.color}"></div> -->
        <img class="point" :src="tuli.url" alt="">
        <div class="name">{{ tuli.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WaterQuality',
  data () {
    return {
      waterQuality: false,
      status1: true,
      status2: false,
      status3: false,
      status4: false,
      data: [
        { id: 1, url: require('@/assets/marker/a1.png'), color: 'green', name: 'cod≥200,氨氮≥23.6,双优秀' },
        { id: 2, url: require('@/assets/marker/a2.png'), color: 'blue', name: 'cod≥180,氨氮≥23.6,双达标' },
        { id: 3, url: require('@/assets/marker/a3.png'), color: 'yellow', name: 'cod<180,氨氮>=23.6,cod不达标' },
        { id: 4, url: require('@/assets/marker/a4.png'), color: 'orange', name: 'cod≥180,氨氮<23.6,氨氮不达标' },
        { id: 5, url: require('@/assets/marker/a5.png'), color: 'red', name: 'cod<180,氨氮<23.6,均不达标' }
      ],
      columns: [
        {
          title: '分析点',
          dataIndex: 'name',
          align: 'center',
          width: 100,
          ellipsis: true
        }, {
          title: 'COD浓度',
          dataIndex: 'num',
          align: 'center'
        }, {
          title: '氨氮浓度',
          dataIndex: 'num1',
          align: 'center'
        }
      ],
      tableData: [
        {
          key: '1',
          num: 33.2,
          num1: 33.2,
          num2: 33.2,
          name: '分析点1',
          x: 129.5295169748574,
          y: 42.883759328077396
        },
        {
          key: '2',
          num: 4.52,
          num1: 33.2,
          num2: 33.2,
          name: '分析点2',
          x: 129.5623042978554,
          y: 42.89507870904678
        },
        {
          key: '3',
          num: 32.7,
          num1: 33.2,
          num2: 33.2,
          name: '分析点3',
          x: 129.574663916996,
          y: 42.898474118262186
        },
        {
          key: '4',
          num: 32.7,
          num1: 33.2,
          num2: 33.2,
          name: '分析点4',
          x: 129.54822806494525,
          y: 42.90790482955512
        },
        {
          key: '5',
          num: 32.7,
          num1: 33.2,
          num2: 33.2,
          name: '分析点5',
          x: 129.5211055673867,
          y: 42.91821408968193
        }]
    }
  },
  methods: {
    showWaterQuality () {
      this.waterQuality = true
    },
    showWaterLevel (value) {
      if (value) {
        this.status1 = value
        this.$emit('showWaterLevel')
      } else {
        this.$emit('cancleWaterLevel')
      }
    },
    handleClickRow (record, index) {
      const that = this
      return {
        on: {
          click: () => {
            console.log(record, index)
            that.$emit('mapGoTo', record.x, record.y)
          }
        }
      }
    }
  },

  destroyed () {

  }
}
</script>

<style >
.waterQuality-content .water-table .layout.ant-layout.tablet .ant-table-wrapper .ant-table-content {
  background-color: #004f98b8;
}
.waterQuality-content .water-table .ant-table-placeholder {
  background-color: #004f98b8;
}
.waterQuality-content .ant-table-small {
  border: none;
}
.waterQuality-content .water-table .ant-table-thead > tr > th {
  color: #8bc1f9;
  background-color: #1086ec;
  border: 1px solid #0577db;
  padding: 5px 2px;
}
.waterQuality-content .water-table .ant-table-tbody > tr > td {
  padding: 5px 2px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  background: #085eaa !important;
  border-bottom: 1px solid #0577db !important;
  cursor: pointer;
}
.waterQuality-content .ant-table-striped :deep(.table-striped) td {
  background-color: #134ae0;
}
</style>
<style lang="less" scoped>
.waterQuality-content {
  .inline-flex {
    width: 90%;
    margin: 0 auto;
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 15px;
    color: #fff;
  }
  .tuli-list {
    width: 280px;
    padding: 10px;
    border: 1px solid #2a558e;
    background-color: #227eca;
    position: absolute;
    left: 50px;
    bottom: 20px;
    z-index: 99;
    border-radius: 5px;
    color: #fff;
    text-align: left;
    .point {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: inline-block;
    }
    .name {
      padding: 0 0 0 5px;
    }
    .online-status {
      width: 100%;
      height: 24px;
      display: inline-flex;
      align-items: center;
      margin-bottom: 10px;
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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 0 15px;
        color: #4affff;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .time {
      color: #fff;
      font-size: 15px;
    }
    .water-table {
      width: 100%;
      padding: 10px 10px 30px;
    }
  }
}
</style>
