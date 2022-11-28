<template>
  <a-modal
    title="新增液位、流量与雨量监测数据"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="所在监视点编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入所在监视点编码"
                v-decorator="['monitorid', { rules: [{ required: true, message: '请输入所在监视点编码！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监测时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择监测时间"
                v-decorator="['sampleTime', { rules: [{ required: true, message: '请选择监测时间！' }] }]"
                @change="sampleTimeOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="液位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入液位"
                v-decorator="['waterlevel', { rules: [{ required: true, message: '请输入液位！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="流速" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入流速"
                v-decorator="['watervelocity', { rules: [{ required: true, message: '请输入流速！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="流量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入流量"
                v-decorator="['flow', { rules: [{ required: true, message: '请输入流量！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="雨量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入雨量"
                v-decorator="['rainfall', { rules: [{ required: true, message: '请输入雨量！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="数据获取时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择数据获取时间"
                v-decorator="['recordTime', { rules: [{ required: true, message: '请选择数据获取时间！' }] }]"
                @change="recordTimeOnChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="填报单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入填报单位"
                v-decorator="['reportUnit', { rules: [{ required: true, message: '请输入填报单位！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="填报日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择填报日期"
                v-decorator="['reportDate', { rules: [{ required: true, message: '请选择填报日期！' }] }]"
                @change="reportDateOnChange"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入备注"
                v-decorator="['remark', { rules: [{ required: true, message: '请输入备注！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { monitorSlAdd } from '@/api/modular/main/monitorsl/monitorSlManage'
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      sampleTimeDateString: '',
      recordTimeDateString: '',
      reportDateDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // 初始化方法
    add(record) {
      this.visible = true
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof values[key] === 'object' && values[key] != null) {
              values[key] = JSON.stringify(values[key])
            }
          }
          values.sampleTime = this.sampleTimeDateString || null
          values.recordTime = this.recordTimeDateString || null
          values.reportDate = this.reportDateDateString || null
          monitorSlAdd(values)
            .then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败') // + res.message
              }
            })
            .finally((res) => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    sampleTimeOnChange(date, dateString) {
      this.sampleTimeDateString = dateString
    },
    recordTimeOnChange(date, dateString) {
      this.recordTimeDateString = dateString
    },
    reportDateOnChange(date, dateString) {
      this.reportDateDateString = dateString
    },
    handleCancel() {
      this.sampleTimeDateString = ''
      this.form.getFieldDecorator('sampleTime', { initialValue: null })
      this.recordTimeDateString = ''
      this.form.getFieldDecorator('recordTime', { initialValue: null })
      this.reportDateDateString = ''
      this.form.getFieldDecorator('reportDate', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
