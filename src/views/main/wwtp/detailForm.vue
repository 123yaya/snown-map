<template>
  <a-modal title="查看污水处理厂信息" :width="900" :visible="visible" :maskClosable="false" :footer="null" @cancel="handleCancel">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="基础信息">
        <a-spin :spinning="spinLoading">
          <a-descriptions bordered :column="2">
            <a-descriptions-item label="排水系统编码">
              <div style="width: 250px">
                {{ record.systemid }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="坐标X">
              <div style="width: 250px">
                {{ record.xcoor }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="坐标Y">
              <div style="width: 250px">
                {{ record.ycoor }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理设施类型">
              <div style="width: 250px">
                {{ 'WWTP_TYPE' | dictType(record.wwtpType) }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理厂名称">
              <div style="width: 250px">
                {{ record.name }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理厂地址">
              <div style="width: 250px">
                {{ record.addr }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="建成日期">
              <div style="width: 250px">
                {{ record.buildDate | moment('YYYY-MM-DD') }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理级别">
              <div style="width: 250px">
                {{ 'TREATMENT_LEVEL' | dictType(record.treatmentLevel) }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="年耗电量">
              <div style="width: 250px">
                {{ record.powerconsup }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理方法">
              <div style="width: 250px">
                {{ 'TREATMENT_METHOD' | dictType(record.treatmentMethod) }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="受纳水体编号">
              <div style="width: 250px">
                {{ record.receivewaterid }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="设计处理能力">
              <div style="width: 250px">
                {{ record.designWwcapa }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水处理工艺描述">
              <div style="width: 250px">
                {{ record.wwProcess }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污水运行负荷率">
              <div style="width: 250px">
                {{ record.wwLoad }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="雨水设计处理规模">
              <div style="width: 250px">
                {{ record.designRaincapa }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="雨水处理工艺">
              <div style="width: 250px">
                {{ record.rainProcess }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污泥设计处理规模">
              <div style="width: 250px">
                {{ record.designSludgecape }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污泥运行负荷率">
              <div style="width: 250px">
                {{ record.sludgeLoad }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污泥处理工艺描述">
              <div style="width: 250px">
                {{ record.sludgeProcess }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="污泥处理方式">
              <div style="width: 250px">
                {{ 'SLUDGE_TREAT_METHOD' | dictType(record.sludgetreatmethod) }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="水泵台数">
              <div style="width: 250px">
                {{ record.pumpNum }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="数据来源">
              <div style="width: 250px">
                {{ 'DATA_SOURCE' | dictType(record.datasource) }}
              </div>
            </a-descriptions-item>
          </a-descriptions>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane key="2" tab="坐标位置" force-render>
        <show-map ref="showMap" :x="record.xcoor" :y="record.ycoor" />
      </a-tab-pane>
    </a-tabs>
    <div class="buttonBox">
      <a-button type="primary" @click="handleCancel"> 关闭 </a-button>
    </div>
  </a-modal>
</template>

<script>
import showMap from '@/components/showMap/showMap'
export default {
  components: {
    showMap
  },
  data () {
    return {
      visible: false,
      spinLoading: false,
      activeKey: '1',
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
      this.activeKey = '1'
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
