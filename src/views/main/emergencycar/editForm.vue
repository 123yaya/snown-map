<template>
  <a-modal
    title="编辑应急车辆"
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
            <a-form-item
              label="车辆名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入车辆名称" v-decorator="['name', {rules: [{required: true, message: '请输入车辆名称！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="车牌号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入车牌号" v-decorator="['plateNumber', {rules: [{required: true, message: '请输入车牌号！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="所属组织"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择所属组织"
                v-decorator="['orgId', { rules: [{ required: true, message: '请选择所属组织！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in org_data_list" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="车辆类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择车辆类型"
                v-decorator="['type', { rules: [{ required: true, message: '请选择车辆类型！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_emergency_car_type" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="应急车辆"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择是否属于应急车辆"
                v-decorator="['isEmergency', { rules: [{ required: true, message: '请选择是否属于应急车辆！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_yes_or_no_integer" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { emergencyCarEdit } from '@/api/modular/main/emergencycar/emergencyCarManage'
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
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        dict_emergency_car_type: [],
        dict_yes_or_no_integer: [],
        id: '',
        org_data_list: [{ code: '延吉', name: '延吉' }]
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        this.id = record.id
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              name: record.name,
              plateNumber: record.plateNumber,
              orgId: (record.orgId == null || record.orgId === '') ? undefined : String(record.orgId),
              type: (record.type == null || record.type === '') ? undefined : String(record.type),
              isEmergency: (record.isEmergency == null || record.isEmergency === '') ? undefined : String(record.isEmergency)
            }
          )
        }, 100)
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_emergency_car_type = this.$options.filters['dictData']('EMERGENCY_CAR_TYPE')
        this.dict_yes_or_no_integer = this.$options.filters['dictData']('yes_or_no_integer')
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
            values.id = this.id
            emergencyCarEdit(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
