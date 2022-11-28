<template>
  <a-modal
    title="新增管渠内窥检测数据"
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
            <a-form-item label="排水管、排水渠编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入排水管、排水渠编码"
                v-decorator="['pipeconduitid', { rules: [{ required: true, message: '请输入排水管、排水渠编码！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检查时间" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择检查时间"
                v-decorator="['detectTime', { rules: [{ required: true, message: '请选择检查时间！' }] }]"
                @change="detectTimeOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检测单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入检测单位"
                v-decorator="['detectUnit', { rules: [{ required: true, message: '请输入检测单位！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检测人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入检测人"
                v-decorator="['detectPerson', { rules: [{ required: true, message: '请输入检测人！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检测单位联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入检测单位联系方式"
                v-decorator="['contacts']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检测方法" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检测方法"
                v-decorator="['detectMethod', { rules: [{ required: true, message: '请选择检测方法！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_detect_method" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检测方向" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检测方向"
                v-decorator="['detectDir']"
              >
                <a-select-option v-for="(item, index) in dict_detect_dir" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="封堵情况" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入封堵情况"
                v-decorator="['pipeBlock']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="淤泥厚度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入淤泥厚度"
                type="number"
                v-decorator="['siltThickness']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="功能性缺陷类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择功能性缺陷类型"
                v-decorator="['funeDefect']"
              >
                <a-select-option v-for="(item, index) in dict_func_defect" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="功能性缺陷长度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入功能性缺陷长度"
                type="number"
                v-decorator="['funeLength']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="功能性缺陷位置" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入功能性缺陷位置"
                v-decorator="['funeAddr']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="功能性缺陷等级" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入功能性缺陷等级"
                type="number"
                v-decorator="['funeClass']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="结构性缺陷类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择结构性缺陷类型"
                v-decorator="['structDefect']"
              >
                <a-select-option v-for="(item, index) in dict_struct_defect" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="结构性缺陷长度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入结构性缺陷长度"
                type="number"
                v-decorator="['structLength']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="结构性缺陷位置" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入结构性缺陷位置"
                v-decorator="['structAddr']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="结构性缺陷等级" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入结构性缺陷等级"
                type="number"
                v-decorator="['structClass']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="修复指数 RI" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入修复指数 RI"
                type="number"
                v-decorator="['repairIndex']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="养护指数 MI" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入养护指数 MI"
                type="number"
                v-decorator="['maintainIndex']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="缺陷描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入缺陷描述"
                v-decorator="['problem']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="影像文件名" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入影像文件名"
                v-decorator="['videofilename']"
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
import { detectZyAdd } from '@/api/modular/main/detectzy/detectZyManage'
export default {
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
      dict_detect_method: [],
      dict_detect_dir: [],
      dict_func_defect: [],
      dict_struct_defect: [],
      detectTimeDateString: '',
      reportDateDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
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
      this.dict_detect_method = this.$options.filters['dictData']('DETECT_METHOD')
      this.dict_detect_dir = this.$options.filters['dictData']('DETECT_DIR')
      this.dict_func_defect = this.$options.filters['dictData']('FUNC_DEFECT')
      this.dict_struct_defect = this.$options.filters['dictData']('STRUCT_DEFECT')
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
          values.detectTime = this.detectTimeDateString || null
          values.reportDate = this.reportDateDateString || null
          detectZyAdd(values)
            .then((res) => {
              console.log(res)
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败') // + res.message
              }
            })
            .finally((res) => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    detectTimeOnChange(date, dateString) {
      this.detectTimeDateString = dateString
    },
    reportDateOnChange(date, dateString) {
      this.reportDateDateString = dateString
    },
    handleCancel() {
      this.detectTimeDateString = ''
      this.form.getFieldDecorator('detectTime', { initialValue: null })
      this.reportDateDateString = ''
      this.form.getFieldDecorator('reportDate', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
