<template>
  <a-modal
    title="新增闸门"
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
                v-decorator="['systemid', {rules: [{required: true, message: '请输入排水系统编码！'}]}]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入坐标X"
                v-decorator="['xcoor', {rules: [{required: true, message: '请输入坐标X！'}]}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="坐标Y" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                type="number"
                placeholder="请输入坐标Y"
                v-decorator="['ycoor', {rules: [{required: true, message: '请输入坐标Y！'}]}]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="闸门名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门名称"
                v-decorator="['name', {rules: [{required: true, message: '请输入闸门名称！'}]}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="类别" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择类别"
                v-decorator="['gateCategory']"
              >
                <a-select-option v-for="(item,index) in dict_gate_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="生产厂家" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入生产厂家"
                v-decorator="['manufacturer']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="闸门型号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门型号"
                v-decorator="['model']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="闸门高程" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门高程"
                type="number"
                v-decorator="['topElev']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="闸门净高" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门净高"
                type="number"
                v-decorator="['height']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="闸门净宽" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门净宽"
                type="number"
                v-decorator="['width']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="数据来源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择数据来源"
                v-decorator="['datasource']"
              >
                <a-select-option v-for="(item,index) in dict_data_source" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="技术资料文件" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入技术资料文件"
                type="number"
                v-decorator="['datalistid']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="数据获取日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择数据获取日期"
                v-decorator="['recordDate']"
                @change="recordDateOnChange"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="填报单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入填报单位"
                v-decorator="['reportUnit']"
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
                v-decorator="['reportDate']"
                @change="reportDateOnChange"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="闸门控制类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择闸门控制类型"
                v-decorator="['controlType']"
              >
                <a-select-option v-for="(item,index) in dict_gate_control_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="闸门启闭形式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择闸门启闭形式"
                v-decorator="['switchStyle']"
              >
                <a-select-option v-for="(item,index) in dict_gate_switch_style" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="闸门排数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门排数"
                type="number"
                v-decorator="['rowNum']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="闸门孔数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入闸门孔数"
                type="number"
                v-decorator="['holeNum']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="设施状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择设施状态"
                v-decorator="['status']"
              >
                <a-select-option v-for="(item,index) in dict_facility_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
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
  import { gateAdd } from '@/api/modular/main/gate/gateManage'
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
        dict_gate_category: [],
        recordDateDateString: '',
        reportDateDateString: '',
        dict_data_source: [],
        dict_gate_control_type: [],
        dict_gate_switch_style: [],
        dict_facility_status: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.sysDictTypeDropDown()
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_gate_category = this.$options.filters['dictData']('GATE_CATEGORY')
        this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
        this.dict_gate_control_type = this.$options.filters['dictData']('GATE_CONTROL_TYPE')
        this.dict_gate_switch_style = this.$options.filters['dictData']('GATE_SWITCH_STYLE')
        this.dict_facility_status = this.$options.filters['dictData']('FACILITY_STATUS')
      },
      /**
       * 提交表单
       */
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
            values.recordDate = this.recordDateDateString || null
            values.reportDate = this.reportDateDateString || null
            gateAdd(values).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败')// + res.message
              }
            }).finally((res) => {
              this.confirmLoading = false
            })
          } else {
            this.confirmLoading = false
          }
        })
      },
      recordDateOnChange(date, dateString) {
        this.recordDateDateString = dateString
      },
      reportDateOnChange(date, dateString) {
        this.reportDateDateString = dateString
      },
      handleCancel () {
        this.recordDateDateString = ''
        this.form.getFieldDecorator('recordDate', { initialValue: null })
        this.reportDateDateString = ''
        this.form.getFieldDecorator('reportDate', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
