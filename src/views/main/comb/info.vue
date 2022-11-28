<template>
  <a-modal title="查看雨水口数据" :width="900" :visible="visible" :confirmLoading="confirmLoading" :footer="null" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="排水系统编码">
          <div style="width: 250px">
            {{ record.systemid }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="X坐标">
          <div style="width: 250px">
            {{ record.xcoor }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="Y坐标">
          <div style="width: 250px">
            {{ record.ycoor }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="所在道路名称">
          <div style="width: 250px">
            {{ record.roadName }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口形式">
          <div style="width: 250px">
            <!-- {{ record.dissolvedOxygen }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口形状">
          <div style="width: 250px">
            <!-- {{ record.bod }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口尺寸1">
          <div style="width: 250px">
            {{ record.combDimenl }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口尺寸2">
          <div style="width: 250px">
            {{ record.combDimen2 }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水算材质">
          <div style="width: 250px">
            <!-- {{ record.ss }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水算间距">
          <div style="width: 250px">
            {{ record.graSpacing }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水算厚度">
          <div style="width: 250px">
            {{ record.graThickness }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口最大深度">
          <div style="width: 250px">
            {{ record.maxdepth }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="雨水口地表高程">
          <div style="width: 250px">
            {{ record.surfaceElev }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据来源">
          <div style="width: 250px">
            <!-- {{ record.cr }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="数据获取日期">
          <div style="width: 250px">
            {{ record.recordDate | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报单位">
          <div style="width: 250px">
            {{ record.reportUnit }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="填报日期">
          <div style="width: 250px">
            {{ record.reportDate | moment('YYYY-MM-DD HH:mm') }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设计能力">
          <div style="width: 250px">
            {{ record.designSluicapa }}
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否装备垃圾拦截装置">
          <div style="width: 250px">
            <!-- {{ record.zn }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否装备防臭装置">
          <div style="width: 250px">
            <!-- {{ record.analysisUnit }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="是否装备初期雨水截流装置">
          <div style="width: 250px">
            <!-- {{ record.recordTime | moment('YYYY-MM-DD HH:mm') }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="设施状态">
          <div style="width: 250px">
            <!-- {{ record.reportUnit }} -->
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          <div style="width: 250px">
            {{ record.remark }}
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
    <div class="buttonBox">
      <a-button type="primary" @click="handleCancel"> 关闭 </a-button>
    </div>
  </a-modal>
</template>

<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import { combEdit } from '@/api/modular/main/comb/combManage'
export default {
  components: {
    STable,
    XDown
  },
  data () {
    return {
      aaa: 123,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      // 机构行样式
      labelCol_JG: {
        xs: { span: 28 },
        sm: { span: 3 }
      },
      wrapperCol_JG: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      defaultFileList: [],
      headers: {
        authorization: 'authorization-text'
      },
      recordId: '',
      visible: false,
      confirmLoading: false,
      record: {},
      dicMajor: [],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        const param = {}
        param.meetId = this.recordId
        return combEdit(param).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      projectType: [],
      majortxData: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    // this.record = this.$route.params.id || null
    if (this.hasPerm('meeting:edit') || this.hasPerm('meeting:delete')) {
      this.columns.push({
        title: '操作',
        width: '150px',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      })
    }
  },
  methods: {
    moment,
    // 初始化方法
    edit (record) {
      console.log(record)
      this.visible = true
      // const params = {}
      this.record = record
      this.recordId = record.id
      this.initData()
      this.$refs.table.refresh(true)
    },
    handleCancel () {
      this.visible = false
      this.record = {}
    }
  }
}
</script>
<style lang="less" scoped>
.ant-col-sm-6 {
  width: 27%;
}
.ant-col-sm-3 {
  width: 13.5%;
}
.buttonBox {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.upload_text {
  color: #d9d9d9;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0;
}
</style>
