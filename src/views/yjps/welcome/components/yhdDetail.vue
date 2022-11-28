<template>
  <a-modal :visible="yhdDetail" title="隐患点信息" footer="" @cancel="handleCancel">
    <a-row :gutter="24">
      <a-col :md="12" :sm="24">
        <p>缺陷编号：</p>
        <p>缺陷距离：0米（距离管线起点）</p>
        <p>缺陷类型：树根</p>
        <p>经度：455425.3751</p>
        <p>纬度：2558270.8471</p>
        <p>处理时间：</p>
      </a-col>
      <a-col :md="12" :sm="24">
        <video id="videoElement" controls="controls" preload="auto" style="width: 100%;" src="https://zhps.zc.gov.cn/93RiskPoint/ZC_YHDVideo/pj579(pj578)pj577.webm"></video>
      </a-col>
    </a-row>
    <h4 style="font-size:16px;font-weight:bold">所在管线信息</h4>
    <a-row :gutter="24">
      <a-col :md="12" :sm="24">
        <p>排水类型：雨污合流管道</p>
        <p>材质：水泥</p>
        <p>管径：.00毫米</p>
        <p>管线长度：59米</p>
        <p>地址：广深大道</p>
      </a-col>
      <a-col :md="12" :sm="24">
        <p>起点井号：XTZPj578</p>
        <p>终点井号：XTZPj577</p>
        <p>所在区域：新塘</p>
        <p>所在道路名称：广深大道</p>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  name: 'YhdDetail',
  data () {
    return {
      yhdDetail: false
    }
  },
  methods: {
    showDetail (record) {
      console.log('showDetail来了', record)
      this.yhdDetail = true
    },
    handleCancel () {
      this.yhdDetail = false
    }
  }
}
</script>

<style>
</style>
