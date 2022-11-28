<template>
  <a-modal
    title="编辑雨水口数据"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item v-show="false"><a-input v-decorator="['combid']" /></a-form-item>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="排水系统编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入排水系统编码" v-decorator="['systemid', {rules: [{required: true, message: '请输入排水系统编码！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="X坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入X坐标" v-decorator="['xcoor', {rules: [{required: true, message: '请输入X坐标！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="Y坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入Y坐标" v-decorator="['ycoor', {rules: [{required: true, message: '请输入Y坐标！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="所在道路名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入所在道路名称" v-decorator="['roadName', {rules: [{required: true, message: '请输入所在道路名称！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="雨水口形式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择雨水口形式">
                <a-select-option v-for="(item,index) in combTypeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="雨水口形状"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择雨水口形状">
                <a-select-option v-for="(item,index) in combshapeData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="雨水口尺寸1"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水口尺寸1" v-decorator="['combDimenl', {rules: [{required: true, message: '请输入雨水口尺寸1！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="雨水口尺寸2"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水口尺寸2" v-decorator="['combDimen2', {rules: [{required: true, message: '请输入雨水口尺寸2！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="雨水算材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择雨水算材质">
                <a-select-option v-for="(item,index) in graMaterialData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="雨水算间距"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水算间距" v-decorator="['graSpacing', {rules: [{required: true, message: '请输入雨水算间距！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="雨水算厚度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水算厚度" v-decorator="['graThickness', {rules: [{required: true, message: '请输入雨水算厚度！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="雨水口最大深度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水口最大深度" v-decorator="['maxdepth', {rules: [{required: true, message: '请输入雨水口最大深度！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="雨水口地表高程"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入雨水口地表高程" v-decorator="['surfaceElev', {rules: [{required: true, message: '请输入雨水口地表高程！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="数据来源"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择数据来源">
                <a-select-option v-for="(item,index) in datasourceData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="数据获取日期"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-date-picker style="width: 100%" placeholder="请选择数据获取日期" v-decorator="['recordDate',{rules: [{ required: true, message: '请选择数据获取日期！' }]}]" @change="recordDateOnChange"/>
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
              label="设计能力"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入设计能力" v-decorator="['designSluicapa', {rules: [{required: true, message: '请输入设计能力！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="是否装备垃圾拦截装置"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择是否装备垃圾拦截装置">
                <a-select-option v-for="(item,index) in antitrashData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="是否装备防臭装置"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择是否装备防臭装置">
                <a-select-option v-for="(item,index) in antiodorData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="是否装备初期雨水截流装置"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择是否装备初期雨水截流装置">
                <a-select-option v-for="(item,index) in iniraininterData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="设施状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择设施状态">
                <a-select-option v-for="(item,index) in statusData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
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
              <a-input placeholder="请输入备注" v-decorator="['remark']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { combEdit } from '@/api/modular/main/comb/combManage'
  export default {
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 }
        },
        combTypeData: [],
        combshapeData: [],
        graMaterialData: [],
        datasourceData: [],
        recordDateDateString: '',
        reportDateDateString: '',
        antitrashData: [],
        antiodorData: [],
        iniraininterData: [],
        statusData: [],
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
        const combTypeOption = this.$options
        this.combTypeData = combTypeOption.filters['dictData']('common_status')
        const combshapeOption = this.$options
        this.combshapeData = combshapeOption.filters['dictData']('common_status')
        const graMaterialOption = this.$options
        this.graMaterialData = graMaterialOption.filters['dictData']('common_status')
        const datasourceOption = this.$options
        this.datasourceData = datasourceOption.filters['dictData']('common_status')
        const antitrashOption = this.$options
        this.antitrashData = antitrashOption.filters['dictData']('yes_or_no_integer')
        const antiodorOption = this.$options
        this.antiodorData = antiodorOption.filters['dictData']('yes_or_no_integer')
        const iniraininterOption = this.$options
        this.iniraininterData = iniraininterOption.filters['dictData']('yes_or_no_integer')
        const statusOption = this.$options
        this.statusData = statusOption.filters['dictData']('common_status')
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              combid: record.combid,
              systemid: record.systemid,
              xcoor: record.xcoor,
              ycoor: record.ycoor,
              roadName: record.roadName,
              combType: record.combType,
              combshape: record.combshape,
              combDimenl: record.combDimenl,
              combDimen2: record.combDimen2,
              graMaterial: record.graMaterial,
              graSpacing: record.graSpacing,
              graThickness: record.graThickness,
              maxdepth: record.maxdepth,
              surfaceElev: record.surfaceElev,
              datasource: record.datasource,
              reportUnit: record.reportUnit,
              designSluicapa: record.designSluicapa,
              antitrash: record.antitrash,
              antiodor: record.antiodor,
              iniraininter: record.iniraininter,
              status: record.status,
              remark: record.remark
            }
          )
        }, 100)
        // 时间单独处理
        if (record.recordDate) {
            this.form.getFieldDecorator('recordDate', { initialValue: moment(record.recordDate, 'YYYY-MM-DD') })
            this.recordDateDateString = moment(record.recordDate).format('YYYY-MM-DD')
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
            values.recordDate = this.recordDateDateString || null
            values.reportDate = this.reportDateDateString || null
            combEdit(values).then((res) => {
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
