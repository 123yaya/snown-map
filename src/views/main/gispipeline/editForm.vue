<template>
  <a-modal
    title="编辑排水管线"
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
              label="管段编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管段编码" v-decorator="['pipeSectionNo']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="管线材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管线材质" v-decorator="['pipelineMaterial']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="起始井号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起始井号" v-decorator="['startWellNumber']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="终止井号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终止井号" v-decorator="['endWellNumber']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="起始点号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起始外业点号" v-decorator="['startFieldStationNo']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="终止点号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终止外业点号" v-decorator="['endFieldStationNo']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管径"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管径" v-decorator="['pipeDiameter']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="压力"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入压力" v-decorator="['pressure']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="埋设方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入埋设方式" v-decorator="['burialMethod']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="管段类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管段类型" v-decorator="['pipeType']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管底埋深"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管底埋深" v-decorator="['pipeBottomBurialDepth']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="管尾埋深"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管尾埋深" v-decorator="['pipeTailBurialDepth']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管底高程"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管底高程" v-decorator="['pipeBottomElevation']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="管尾高程"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管尾高程" v-decorator="['pipeTailElevation']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管段长度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管段长度" v-decorator="['pipeLength']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="流向"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入流向" v-decorator="['flowDirection']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="水流"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入水流" v-decorator="['flow']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="水位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入水位" v-decorator="['waterLevel']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
              label="起始X坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起始X坐标" v-decorator="['startX', {rules: [{required: true, message: '请输入起始X坐标！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="起始Y坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起始Y坐标" v-decorator="['startY', {rules: [{required: true, message: '请输入起始Y坐标！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="终止X坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终止X坐标" v-decorator="['endX', {rules: [{required: true, message: '请输入终止X坐标！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="终止Y坐标"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终止Y坐标" v-decorator="['endY', {rules: [{required: true, message: '请输入终止Y坐标！'}]}]" />
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
  import { gisPipelineEdit } from '@/api/modular/main/gispipeline/gisPipelineManage'
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
              pipeSectionNo: record.pipeSectionNo,
              startWellNumber: record.startWellNumber,
              endWellNumber: record.endWellNumber,
              startFieldStationNo: record.startFieldStationNo,
              endFieldStationNo: record.endFieldStationNo,
              pipelineMaterial: record.pipelineMaterial,
              pipeDiameter: record.pipeDiameter,
              pressure: record.pressure,
              burialMethod: record.burialMethod,
              pipeBottomBurialDepth: record.pipeBottomBurialDepth,
              pipeTailBurialDepth: record.pipeTailBurialDepth,
              pipeBottomElevation: record.pipeBottomElevation,
              pipeTailElevation: record.pipeTailElevation,
              pipeType: record.pipeType,
              pipeLength: record.pipeLength,
              flowDirection: record.flowDirection,
              flow: record.flow,
              waterLevel: record.waterLevel,
              roadName: record.roadName,
              startX: record.startX,
              startY: record.startY,
              endX: record.endX,
              endY: record.endY,
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
            gisPipelineEdit(values).then((res) => {
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
