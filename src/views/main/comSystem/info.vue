<template>
  <a-modal title="查看排水系统" :width="900" :visible="visible" :confirmLoading="confirmLoading" :maskClosable="false" :footer="null" @cancel="handleCancel">
    <a-tabs v-model="activeKey">
      <a-tab-pane key="1" tab="基础信息">
        <a-spin :spinning="confirmLoading">
          <a-descriptions bordered :column="2">
            <a-descriptions-item label="系统名称">
              <div style="width: 250px">
                {{ record.name }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="系统类型">
              <div style="width: 250px">
                {{ record.combType }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="汇水面积">
              <div style="width: 250px">
                {{ record.servicearea }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="服务人口数">
              <div style="width: 250px">
                {{ record.servicepopulation }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="径流系数">
              <div style="width: 250px">
                {{ record.runoffCoeff }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="设计重现期">
              <div style="width: 250px">
                {{ record.designRtp }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="记录建立日期">
              <div style="width: 250px">
                {{ record.estDate | moment('YYYY-MM-DD HH:mm') }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="最后修改日期">
              <div style="width: 250px">
                {{ record.updateDate | moment('YYYY-MM-DD HH:mm') }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="记录建立单位">
              <div style="width: 250px">
                {{ record.estUnit }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="数据维护单位">
              <div style="width: 250px">
                {{ record.orgUnit }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="坐标系统">
              <div style="width: 250px">
                {{ record.coorsystem }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="高程系统">
              <div style="width: 250px">
                {{ record.elevsystem }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="排水体制说明">
              <div style="width: 250px">
                {{ record.drainsystem }}
              </div>
            </a-descriptions-item>
            <a-descriptions-item label="备注">
              <div style="width: 250px">
                {{ record.remark }}
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
import { STable, XDown } from '@/components'
import moment from 'moment'
import { systemEdit } from '@/api/modular/main/system/systemManage'
import showMap from '@/components/showMap/showMap'
export default {
  components: {
    STable,
    XDown,
    showMap
  },
  data () {
    return {
      activeKey: '1',
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
        return systemEdit(param).then((res) => {
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
  },
  methods: {
    moment,
    // 初始化方法
    edit (record) {
      console.log(record.coorsystem)
      this.visible = true
      // const params = {}
      this.record = record
      this.recordId = record.id
      // this.$refs.table.refresh(true)
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
.ant-modal-body {
  padding-top: 0 !important;
}
</style>
