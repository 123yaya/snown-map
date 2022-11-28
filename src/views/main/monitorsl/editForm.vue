<template>
  <a-modal
    title="编辑液位、流量与雨量监测数据"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['fid']" /></a-form-item>
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
                placeholder="请输入液位"
                type="number"
                v-decorator="['waterlevel', { rules: [{ required: true, message: '请输入液位！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="流速" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入流速"
                type="number"
                v-decorator="['watervelocity', { rules: [{ required: true, message: '请输入流速！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="流量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入流量"
                type="number"
                v-decorator="['flow', { rules: [{ required: true, message: '请输入流量！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="雨量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入雨量"
                type="number"
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
  import moment from 'moment'
  import { monitorSlEdit } from '@/api/modular/main/monitorsl/monitorSlManage'
  export default {
    data () {
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
      moment,
      // 初始化方法
      edit (record) {
        this.visible = true
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              fid: record.fid,
              monitorid: record.monitorid,
              waterlevel: record.waterlevel,
              watervelocity: record.watervelocity,
              flow: record.flow,
              rainfall: record.rainfall,
              reportUnit: record.reportUnit,
              remark: record.remark
            }
          )
        }, 100)
        // 时间单独处理
        if (record.sampleTime) {
            this.form.getFieldDecorator('sampleTime', { initialValue: moment(record.sampleTime, 'YYYY-MM-DD') })
            this.sampleTimeDateString = moment(record.sampleTime).format('YYYY-MM-DD')
        }
        // 时间单独处理
        if (record.recordTime) {
            this.form.getFieldDecorator('recordTime', { initialValue: moment(record.recordTime, 'YYYY-MM-DD') })
            this.recordTimeDateString = moment(record.recordTime).format('YYYY-MM-DD')
        }
        // 时间单独处理
        if (record.reportDate) {
            this.form.getFieldDecorator('reportDate', { initialValue: moment(record.reportDate, 'YYYY-MM-DD') })
            this.reportDateDateString = moment(record.reportDate).format('YYYY-MM-DD')
        }
      },
      handleSubmit () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            for (const key in values) {
              if (typeof (values[key]) === 'object' && values[key] != null) {
                values[key] = JSON.stringify(values[key])
              }
            }
            values.sampleTime = this.sampleTimeDateString || null
            values.recordTime = this.recordTimeDateString || null
            values.reportDate = this.reportDateDateString || null
            monitorSlEdit(values).then((res) => {
              if (res.success) {
                this.$message.success('编辑成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('编辑失败')//  + res.message
              }
            }).finally((res) => {
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
      handleCancel () {
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
