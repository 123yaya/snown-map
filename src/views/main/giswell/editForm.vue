<template>
  <a-modal
    title="编辑排水井"
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
              label="设施编号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入设施编号" v-decorator="['facilityNo']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="外业点号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入外业点号" v-decorator="['fieldStationNo']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="X坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入X坐标" v-decorator="['xcoordinate', {rules: [{required: true, message: '请输入X坐标！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="Y坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入Y坐标" v-decorator="['ycoordinate', {rules: [{required: true, message: '请输入Y坐标！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管线性质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管线性质" v-decorator="['pipelineProperty']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="地面高程"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入地面高程" v-decorator="['wellheadElevation']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="井盖尺寸"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入井盖尺寸" v-decorator="['coverSize']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="井盖材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入井盖材质" v-decorator="['coverMaterial']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="井深"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入井深" v-decorator="['wellDepth']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="井径"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入井径" v-decorator="['wellDiameter']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="井尺寸"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入井尺寸" v-decorator="['wellSize']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="井材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入井材质" v-decorator="['wellMaterial']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="附属物"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入附属物" v-decorator="['appendage']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="特征"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入特征" v-decorator="['feature']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入类型" v-decorator="['type']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="道路名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入道路名称" v-decorator="['roadName']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="普查时间"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-date-picker style="width: 100%" placeholder="请选择普查时间" v-decorator="['censusTime']" @change="censusTimeOnChange"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="备注"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-textarea placeholder="请输入备注" v-decorator="['remarks']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { gisWellEdit } from '@/api/modular/main/giswell/gisWellManage'
  export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 }
        },
        censusTimeDateString: '',
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
        this.id = record.ogrFid
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              facilityNo: record.facilityNo,
              fieldStationNo: record.fieldStationNo,
              xcoordinate: record.xcoordinate,
              ycoordinate: record.ycoordinate,
              pipelineProperty: record.pipelineProperty,
              wellheadElevation: record.wellheadElevation,
              coverSize: record.coverSize,
              coverMaterial: record.coverMaterial,
              wellDepth: record.wellDepth,
              wellDiameter: record.wellDiameter,
              wellSize: record.wellSize,
              wellMaterial: record.wellMaterial,
              appendage: record.appendage,
              feature: record.feature,
              type: record.type,
              roadName: record.roadName,
              remarks: record.remarks
            }
          )
        }, 100)
        // 时间单独处理
        if (record.censusTime) {
            this.form.getFieldDecorator('censusTime', { initialValue: moment(record.censusTime, 'YYYY-MM-DD') })
            this.censusTimeDateString = moment(record.censusTime).format('YYYY-MM-DD')
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
            values.censusTime = this.censusTimeDateString || null
            values.ogrFid = this.id
            gisWellEdit(values).then((res) => {
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
      censusTimeOnChange(date, dateString) {
        this.censusTimeDateString = dateString
      },
      handleCancel () {
        this.censusTimeDateString = ''
        this.form.getFieldDecorator('censusTime', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
