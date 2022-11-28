<template>
  <a-modal
    title="编辑水质检测数据"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="所在监视点编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入所在监视点编码" v-decorator="['monitorid', {rules: [{required: true, message: '请输入所在监视点编码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="监测时间"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-date-picker style="width: 100%" placeholder="请选择监测时间" v-decorator="['sampleTime',{rules: [{ required: true, message: '请选择监测时间！' }]}]" @change="sampleTimeOnChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="水温"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入水温" type="number" v-decorator="['temp', {rules: [{required: true, message: '请输入水温！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="pH值"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入pH值" type="number" v-decorator="['ph', {rules: [{required: true, message: '请输入pH值！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="溶解氧"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入溶解氧" type="number" v-decorator="['dissolvedOxygen', {rules: [{required: true, message: '请输入溶解氧！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="五日生化需氧量"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入五日生化需氧量" type="number" v-decorator="['bod', {rules: [{required: true, message: '请输入五日生化需氧量！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="化学需氧量"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入化学需氧量" type="number" v-decorator="['cod', {rules: [{required: true, message: '请输入化学需氧量！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="总有机碳"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总有机碳" type="number" v-decorator="['toc', {rules: [{required: true, message: '请输入总有机碳！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="悬浮物"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入悬浮物" type="number" v-decorator="['ss', {rules: [{required: true, message: '请输入悬浮物！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="氨氮"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入氨氮" type="number" v-decorator="['nhN', {rules: [{required: true, message: '请输入氨氮！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="总氮"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总氮" type="number" v-decorator="['tn', {rules: [{required: true, message: '请输入总氮！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="总磷"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总磷" type="number" v-decorator="['tp', {rules: [{required: true, message: '请输入总磷！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="总镉"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总镉" type="number" v-decorator="['cd', {rules: [{required: true, message: '请输入总镉！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="总铬"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总铬" type="number" v-decorator="['cr', {rules: [{required: true, message: '请输入总铬！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="总镓"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总镓" type="number" v-decorator="['hg', {rules: [{required: true, message: '请输入总镓！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="总铅"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总铅" type="number" v-decorator="['pb', {rules: [{required: true, message: '请输入总铅！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="总砷"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总砷" type="number" v-decorator="['as', {rules: [{required: true, message: '请输入总砷！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="总铜"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总铜" type="number" v-decorator="['cu', {rules: [{required: true, message: '请输入总铜！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="总锌"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入总锌" type="number" v-decorator="['zn', {rules: [{required: true, message: '请输入总锌！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="水质检测单位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入水质检测单位" v-decorator="['analysisUnit', {rules: [{required: true, message: '请输入水质检测单位！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="数据获取时间"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-date-picker style="width: 100%" placeholder="请选择数据获取时间" v-decorator="['recordTime',{rules: [{ required: true, message: '请选择数据获取时间！' }]}]" @change="recordTimeOnChange"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="填报单位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入填报单位" v-decorator="['reportUnit', {rules: [{required: true, message: '请输入填报单位！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="填报日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-date-picker style="width: 100%" placeholder="请选择填报日期" v-decorator="['reportDate',{rules: [{ required: true, message: '请选择填报日期！' }]}]" @change="reportDateOnChange"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="备注"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入备注" v-decorator="['remark', {rules: [{required: true, message: '请输入备注！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { monitorSzEdit } from '@/api/modular/main/monitorsz/monitorSzManage'
  export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 17 }
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
              temp: record.temp,
              ph: record.ph,
              dissolvedOxygen: record.dissolvedOxygen,
              bod: record.bod,
              cod: record.cod,
              toc: record.toc,
              ss: record.ss,
              nhN: record.nhN,
              tn: record.tn,
              tp: record.tp,
              cd: record.cd,
              cr: record.cr,
              hg: record.hg,
              pb: record.pb,
              as: record.as,
              cu: record.cu,
              zn: record.zn,
              analysisUnit: record.analysisUnit,
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
            monitorSzEdit(values).then((res) => {
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
