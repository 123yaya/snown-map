<template>
  <a-modal
    title="编辑应急队伍"
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
              label="名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入名称" v-decorator="['name', {rules: [{required: true, message: '请输入名称！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择类型"
                v-decorator="['type', { rules: [{ required: true, message: '请选择类型！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_emergency_team_type" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="关联组织"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                placeholder="请选择关联组织"
                v-decorator="['orgId', { rules: [{ required: true, message: '请选择关联组织！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in org_data_list" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="领导小组成员"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                mode="multiple"
                placeholder="请选择领导小组成员"
                v-decorator="['leaderIds', { rules: [{ required: true, message: '请选择领导小组成员！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in user_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="组内成员"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                mode="multiple"
                placeholder="请选择组内成员"
                v-decorator="['personIds', { rules: [{ required: true, message: '请选择组内成员！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in user_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="抢险人员"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入抢险人员" v-decorator="['rescuePerson', {rules: [{required: true, message: '请输入抢险人员！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="主要抢险车辆"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                mode="multiple"
                placeholder="请选择主要抢险车辆"
                v-decorator="['mainCarIds', { rules: [{ required: true, message: '请选择主要抢险车辆！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in car_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="其他抢险车辆"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select
                mode="multiple"
                placeholder="请选择其他抢险车辆"
                v-decorator="['otherCarIds', { rules: [{ required: true, message: '请选择其他抢险车辆！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in car_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="抽水设备"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入抽水设备" v-decorator="['pumpingEquipment', {rules: [{required: true, message: '请输入抽水设备！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="液压动力站"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入液压动力站" v-decorator="['hpu', {rules: [{required: true, message: '请输入液压动力站！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { emergencyTeamEdit } from '@/api/modular/main/emergencyteam/emergencyTeamManage'
  import { sysUserIdNameList } from '@/api/modular/system/userManage'
  import { emergencyCarIdNameList } from '@/api/modular/main/emergencycar/emergencyCarManage'
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
        dict_emergency_team_type: [],
        id: '',
        org_data_list: [{ code: '延吉', name: '延吉' }],
        user_data_list: [],
        car_data_list: []
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        this.id = record.id
        this.sysDictTypeDropDown()
        this.getUserIdNameList()
        this.getCarIdNameList()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              name: record.name,
              type: (record.type == null || record.type === '') ? undefined : String(record.type),
              orgId: (record.orgId == null || record.orgId === '') ? undefined : String(record.orgId),
              leaderIds: (record.leaderIds == null || record.leaderIds === '') ? undefined : JSON.parse(record.leaderIds),
              personIds: (record.personIds == null || record.personIds === '') ? undefined : JSON.parse(record.personIds),
              rescuePerson: record.rescuePerson,
              mainCarIds: (record.mainCarIds == null || record.mainCarIds === '') ? undefined : JSON.parse(record.mainCarIds),
              otherCarIds: (record.otherCarIds == null || record.otherCarIds === '') ? undefined : JSON.parse(record.otherCarIds),
              pumpingEquipment: record.pumpingEquipment,
              hpu: record.hpu
            }
          )
        }, 100)
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_emergency_team_type = this.$options.filters['dictData']('EMERGENCY_TEAM_TYPE')
      },
      /**
       * 获取用户列表
       */
      getUserIdNameList () {
        const that = this
        sysUserIdNameList({}).then((res) => {
          if (res.success) {
            that.user_data_list = res.data
          }
        }).finally((res) => {
        })
      },
      /**
       * 获取车辆列表
       */
      getCarIdNameList() {
        const that = this
        emergencyCarIdNameList({}).then((res) => {
          if (res.success) {
            that.car_data_list = res.data
          }
        }).finally((res) => {
        })
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
            emergencyTeamEdit(values).then((res) => {
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
