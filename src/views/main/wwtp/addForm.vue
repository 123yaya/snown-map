<template>
  <a-modal
    title="新增污水处理厂"
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
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标X"
                type="number"
                @click="$refs.chooseMap.add()"
                v-decorator="['xcoor', { rules: [{ required: true, message: '请输入坐标X！' }] }]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="坐标Y" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标Y"
                type="number"
                @click="$refs.chooseMap.add()"
                v-decorator="['ycoor', { rules: [{ required: true, message: '请输入坐标Y！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水处理设施类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择污水处理设施类型"
                v-decorator="['wwtpType', { rules: [{ required: true, message: '请选择污水处理设施类型！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_wwtp_type" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="污水处理厂名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理厂名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入污水处理厂名称！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水处理厂地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理厂地址"
                v-decorator="['addr']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="建成日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择建成日期(竣工的具体日期)"
                v-decorator="['buildDate']"
                @change="buildDateOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水处理级别" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择污水处理级别"
                v-decorator="['treatmentLevel']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_treatment_level" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="年耗电量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入年耗电量"
                type="number"
                v-decorator="['powerconsup']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水处理方法" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择污水处理方法"
                v-decorator="['treatmentMethod']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_treatment_method" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="受纳水体编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入受纳水体编号"
                v-decorator="['receivewaterid']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="设计处理能力" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理厂设计处理能力"
                type="number"
                v-decorator="['designWwcapa']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="污水处理工艺描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理工艺描述"
                v-decorator="['wwProcess']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水运行负荷率" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水运行负荷率(百分比例)"
                type="number"
                v-decorator="['wwLoad']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="雨水设计处理规模" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入雨水设计处理规模"
                type="number"
                v-decorator="['designRaincapa']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="雨水处理工艺" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入雨水处理工艺"
                v-decorator="['rainProcess']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="污泥设计处理规模" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污泥设计处理规模"
                type="number"
                v-decorator="['designSludgecape']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污泥运行负荷率" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污泥运行负荷率（百分比例）"
                type="number"
                v-decorator="['sludgeLoad']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="污泥处理工艺描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污泥处理工艺描述"
                v-decorator="['sludgeProcess']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污泥处理方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择污泥处理方式"
                v-decorator="['sludgetreatmethod']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_sludge_treat_method" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="水泵台数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input-number
                placeholder="请输入水泵台数"
                type="number"
                style="width: 100%"
                v-decorator="['pumpNum']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="数据来源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择数据来源"
                v-decorator="['datasource']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_data_source" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <choose-map ref="chooseMap" @getLatLng="getLatLng" />
    </a-spin>
  </a-modal>
</template>

<script>
import { wwtpAdd } from '@/api/modular/main/wwtp/wwtpManage'
import chooseMap from '@/components/chooseMap/chooseMap'
export default {
  components: {
    chooseMap
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      buildDateDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      dict_wwtp_type: [],
      dict_treatment_level: [],
      dict_treatment_method: [],
      dict_sludge_treat_method: [],
      dict_data_source: []
    }
  },
  methods: {
    // 初始化方法
    add(record) {
      this.visible = true
      this.sysDictTypeDropDown()
    },
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown () {
      this.dict_wwtp_type = this.$options.filters['dictData']('WWTP_TYPE')
      this.dict_treatment_level = this.$options.filters['dictData']('TREATMENT_LEVEL')
      this.dict_treatment_method = this.$options.filters['dictData']('TREATMENT_METHOD')
      this.dict_sludge_treat_method = this.$options.filters['dictData']('SLUDGE_TREAT_METHOD')
      this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
    },
    getLatLng(e) {
      this.form.setFieldsValue({
        xcoor: e.lng,
        ycoor: e.lat
      })
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          for (const key in values) {
            if (typeof values[key] === 'object' && values[key] != null) {
              values[key] = JSON.stringify(values[key])
            }
          }
          values.buildDate = this.buildDateDateString || null
          wwtpAdd(values)
            .then(res => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败') // + res.message
              }
            })
            .finally(res => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    buildDateOnChange(date, dateString) {
      this.buildDateDateString = dateString
    },
    handleCancel() {
      this.buildDateDateString = ''
      this.form.getFieldDecorator('buildDate', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
