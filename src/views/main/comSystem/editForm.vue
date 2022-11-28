<template>
  <a-modal title="编辑排水系统" :width="900" :visible="visible" :confirmLoading="confirmLoading" :maskClosable="false" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false">
          <a-input v-decorator="['systemid']" />
        </a-form-item>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="系统名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入系统名称" v-decorator="['name', {rules: [{required: true, message: '请输入系统名称！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="系统类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select style="width: 100%" v-decorator="['combType', {rules: [{ required: true, message: '请选择系统类型！' }]}]" placeholder="请选择系统类型">
                <a-select-option v-for="(item,index) in systemTypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="汇水面积" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入汇水面积" type="number" v-decorator="['servicearea', {rules: [{required: true, message: '请输入汇水面积！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="服务人口数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number placeholder="请输入服务人口数" type="number" style="width: 100%" v-decorator="['servicepopulation', {rules: [{required: true, message: '请输入服务人口数！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="径流系数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入径流系数" type="number" v-decorator="['runoffCoeff', {rules: [{required: true, message: '请输入径流系数！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="设计重现期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入设计重现期" type="number" v-decorator="['designRtp', {rules: [{required: true, message: '请输入设计重现期！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="记录建立日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker style="width: 100%" placeholder="请选择记录建立日期" v-decorator="['estDate',{rules: [{ required: true, message: '请选择记录建立日期！' }]}]" @change="estDateOnChange" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="最后修改日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker style="width: 100%" placeholder="请选择最后修改日期" v-decorator="['updateDate',{rules: [{ required: true, message: '请选择最后修改日期！' }]}]" @change="updateDateOnChange" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="记录建立单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入记录建立单位" v-decorator="['estUnit', {rules: [{required: true, message: '请输入记录建立单位！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="数据维护单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入数据维护单位" v-decorator="['orgUnit', {rules: [{required: true, message: '请输入数据维护单位！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="坐标系统" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入坐标系统" @click="$refs.chooseMap.add()" v-decorator="['coorsystem', {rules: [{required: true, message: '请输入坐标系统！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="高程系统" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入高程系统" v-decorator="['elevsystem', {rules: [{required: true, message: '请输入高程系统！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="排水体制说明" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入排水体制说明" v-decorator="['drainsystem']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input placeholder="请输入备注" v-decorator="['remark']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <choose-map ref="chooseMap" @getLatLng="getLatLng" />
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { systemEdit } from '@/api/modular/main/system/systemManage'
import chooseMap from '@/components/chooseMap/chooseMap'
export default {
  components: {
    chooseMap
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      },
      systemTypeData: [],
      estDateDateString: '',
      updateDateDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    getLatLng (e) {
      this.form.setFieldsValue({
        coorsystem: e.lng + ',' + e.lat
      })
    },
    // 初始化方法
    edit (record) {
      this.visible = true
      const systemTypeOption = this.$options
      this.systemTypeData = systemTypeOption.filters['dictData']('common_status')
      setTimeout(() => {
        this.form.setFieldsValue(
          {
            systemid: record.systemid,
            name: record.name,
            systemType: record.systemType,
            servicearea: record.servicearea,
            servicepopulation: record.servicepopulation,
            runoffCoeff: record.runoffCoeff,
            designRtp: record.designRtp,
            estUnit: record.estUnit,
            orgUnit: record.orgUnit,
            coorsystem: record.coorsystem,
            elevsystem: record.elevsystem,
            drainsystem: record.drainsystem,
            remark: record.remark
          }
        )
      }, 100)
      // 时间单独处理
      if (record.estDate) {
        this.form.getFieldDecorator('estDate', { initialValue: moment(record.estDate, 'YYYY-MM-DD') })
        this.estDateDateString = moment(record.estDate).format('YYYY-MM-DD')
      }
      // 时间单独处理
      if (record.updateDate) {
        this.form.getFieldDecorator('updateDate', { initialValue: moment(record.updateDate, 'YYYY-MM-DD') })
        this.updateDateDateString = moment(record.updateDate).format('YYYY-MM-DD')
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
          values.estDate = this.estDateDateString || null
          values.updateDate = this.updateDateDateString || null
          systemEdit(values).then((res) => {
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
    estDateOnChange (date, dateString) {
      this.estDateDateString = dateString
    },
    updateDateOnChange (date, dateString) {
      this.updateDateDateString = dateString
    },
    handleCancel () {
      this.estDateDateString = ''
      this.form.getFieldDecorator('estDate', { initialValue: null })
      this.updateDateDateString = ''
      this.form.getFieldDecorator('updateDate', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
