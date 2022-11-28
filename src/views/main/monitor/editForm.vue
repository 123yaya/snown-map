<template>
  <a-modal
    title="编辑监测点数据"
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
            <a-form-item label="排水系统编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入排水系统编码"
                v-decorator="['systemid', { rules: [{ required: true, message: '请输入排水系统编码！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监测点名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测点名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入监测点名称！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入坐标X"
                v-decorator="['xcoor', {rules: [{required: true, message: '请输入坐标X！'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="坐标Y" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入坐标Y"
                v-decorator="['ycoor', {rules: [{required: true, message: '请输入坐标Y！'}]}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="监测点地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测点地址"
                v-decorator="['addr']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监视方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择监视方式"
                v-decorator="['method', { rules: [{ required: true, message: '请选择监视方式！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_monitor_method" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="监测数据类别" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择监测数据类别"
                v-decorator="['monitorType', { rules: [{ required: true, message: '请选择监测数据类别！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_monitor_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监测频率" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测频率"
                type="number"
                v-decorator="['frequency']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="监测设备名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测设备名称"
                v-decorator="['deviceName']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监测设备型号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测设备型号"
                v-decorator="['deviceModel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="所在设施编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入所在设施编码"
                v-decorator="['nodeid']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="流量监测管线编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入流量监测管线编码"
                v-decorator="['pipeid']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="流量监测管线编码2" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入流量监测管线编码2"
                v-decorator="['pipeid2']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="监测点周边情况描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入监测点周边情况描述"
                v-decorator="['description']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="填报单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入填报单位"
                v-decorator="['reportUnit']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="填报日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择填报日期"
                v-decorator="['reportDate']"
                @change="reportDateOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入备注"
                v-decorator="['remark']"
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
  import { monitorEdit } from '@/api/modular/main/monitor/monitorManage'
  export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        },
        dict_monitor_method: [],
        dict_monitor_type: [],
        reportDateDateString: '',
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        id: ''
      }
    },
    methods: {
      moment,
      // 初始化方法
      edit (record) {
        this.visible = true
        this.id = record.monitorid
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              systemid: record.systemid,
              name: record.name,
              xcoor: record.xcoor,
              ycoor: record.ycoor,
              addr: record.addr,
              method: (record.method == null || record.method === '') ? undefined : String(record.method),
              monitorType: (record.monitorType == null || record.monitorType === '') ? undefined : String(record.monitorType),
              frequency: record.frequency,
              deviceName: record.deviceName,
              deviceModel: record.deviceModel,
              nodeid: record.nodeid,
              pipeid: record.pipeid,
              pipeid2: record.pipeid2,
              description: record.description,
              reportUnit: record.reportUnit,
              remark: record.remark
            }
          )
        }, 100)
        // 时间单独处理
        if (record.reportDate) {
            this.form.getFieldDecorator('reportDate', { initialValue: moment(record.reportDate, 'YYYY-MM-DD') })
            this.reportDateDateString = moment(record.reportDate).format('YYYY-MM-DD')
        }
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_monitor_method = this.$options.filters['dictData']('MONITOR_METHOD')
        this.dict_monitor_type = this.$options.filters['dictData']('MONITOR_TYPE')
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
            values.reportDate = this.reportDateDateString || null
            values.monitorid = this.id
            monitorEdit(values).then((res) => {
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
      reportDateOnChange(date, dateString) {
        this.reportDateDateString = dateString
      },
      handleCancel () {
        this.reportDateDateString = ''
        this.form.getFieldDecorator('reportDate', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
