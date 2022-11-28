<template>
  <a-modal
    title="新增应急物资"
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
              label="物资名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入物资名称" v-decorator="['name', {rules: [{required: true, message: '请输入物资名称！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="物资类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择物资类型"
                v-decorator="['type', { rules: [{ required: true, message: '请选择物资类型！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_emergency_supplies_type" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="型号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入型号" v-decorator="['model', {rules: [{required: true, message: '请输入型号！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="数量"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入数量" v-decorator="['number', {rules: [{required: true, message: '请输入数量！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="所属应急队伍"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择所属应急队伍"
                v-decorator="['teamId', { rules: [{ required: true, message: '请选择所属应急队伍！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in team_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="应急物资"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择是否属于应急物资"
                v-decorator="['isEmergency', { rules: [{ required: true, message: '请选择是否属于应急物资！' }] }]"
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
  import { emergencySuppliesAdd } from '@/api/modular/main/emergencysupplies/emergencySuppliesManage'
  import { emergencyTeamIdNameList } from '@/api/modular/main/emergencyteam/emergencyTeamManage'
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
        dict_emergency_supplies_type: [],
        dict_yes_or_no_integer: [],
        team_data_list: []
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.sysDictTypeDropDown()
        this.getTeamIdNameList()
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_emergency_supplies_type = this.$options.filters['dictData']('EMERGENCY_SUPPLIES_TYPE')
        this.dict_yes_or_no_integer = this.$options.filters['dictData']('yes_or_no_integer')
      },
      /**
       * 获取应急队伍列表
       */
      getTeamIdNameList () {
        const that = this
        emergencyTeamIdNameList({}).then((res) => {
          if (res.success) {
            that.team_data_list = res.data
          }
        }).finally((res) => {
        })
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
            emergencySuppliesAdd(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
