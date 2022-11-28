<template>
  <a-modal
    title="编辑检查井数据"
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
                v-decorator="['systemid', { rules: [{ required: true, message: '请输入排水系统编码！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标X"
                type="number"
                v-decorator="['xcoor', { rules: [{ required: true, message: '请输入坐标X！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="坐标Y" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标Y"
                type="number"
                v-decorator="['ycoor', { rules: [{ required: true, message: '请输入坐标Y！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所在道路名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入所在道路名称"
                v-decorator="['roadName']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检查井类别" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检查井类别"
                v-decorator="['manholeCategory', { rules: [{ required: true, message: '请选择检查井类别！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_manhole_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检查井类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检查井类型"
                v-decorator="['manholeType', { rules: [{ required: true, message: '请选择检查井类型！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_manhole_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检查井形式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检查井形式"
                v-decorator="['manholeStyle', { rules: [{ required: true, message: '请选择检查井形式！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_manhole_style" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检查井井深" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入检查井井深"
                type="number"
                v-decorator="['depth']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="地面高程" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入地面高程"
                type="number"
                v-decorator="['surfaceElev']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="数据来源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择数据来源"
                v-decorator="['datasource']"
              >
                <a-select-option v-for="(item, index) in dict_data_source" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
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
            <a-form-item label="附属物描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入附属物描述"
                v-decorator="['addiFae']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="检查井盖材质" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检查井盖材质"
                v-decorator="['covMaterial']"
              >
                <a-select-option v-for="(item, index) in dict_manhole_cover_material" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="井盖形状" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择井盖形状"
                v-decorator="['covShape']"
              >
                <a-select-option v-for="(item, index) in dict_manhole_cover_shape" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井盖尺寸1" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井盖尺寸1"
                type="number"
                v-decorator="['cnvDimen1']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="井盖尺寸2" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井盖尺寸2"
                type="number"
                v-decorator="['covDimen2']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井盖尺寸3" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井盖尺寸3"
                type="number"
                v-decorator="['covDimen3']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="井盖厚度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井盖厚度"
                type="number"
                v-decorator="['covThickness']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井室类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井室类型"
                v-decorator="['chamberType']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="井室长度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井室长度"
                type="number"
                v-decorator="['chamberLength']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井室宽度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井室宽度"
                type="number"
                v-decorator="['chamberWidth']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="井室高度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井室高度"
                type="number"
                v-decorator="['chamberHeight']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井筒高度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入井筒高度"
                type="number"
                v-decorator="['wellboreHeight']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="探测时水深" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入探测时水深"
                type="number"
                v-decorator="['surveyWaterdepth']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="探测时泥深" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入探测时泥深"
                type="number"
                v-decorator="['surveySedidepth']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="探测日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择探测日期"
                v-decorator="['surveyDate']"
                @change="surveyDateOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="井底形式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择井底形式"
                v-decorator="['bottomStyle']"
              >
                <a-select-option v-for="(item, index) in dict_manhole_bottom_style" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="检查井等级" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择检查井等级"
                v-decorator="['juneClass']"
              >
                <a-select-option v-for="(item, index) in dict_manhole_class" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="设施状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择设施状态"
                v-decorator="['status']"
              >
                <a-select-option v-for="(item, index) in dict_facility_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
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
import moment from 'moment'
import { manholeEdit } from '@/api/modular/main/manhole/manholeManage'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17
         }
      },
      dict_manhole_category: [],
      dict_manhole_type: [],
      dict_manhole_style: [],
      dict_data_source: [],
      recordDateDateString: '',
      reportDateDateString: '',
      dict_manhole_cover_material: [],
      dict_manhole_cover_shape: [],
      surveyDateDateString: '',
      dict_manhole_bottom_style: [],
      dict_manhole_class: [],
      dict_facility_status: [],
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
      this.id = record.manholeid
      this.sysDictTypeDropDown()
      setTimeout(() => {
        this.form.setFieldsValue(
          {
            systemid: record.systemid,
            xcoor: record.xcoor,
            ycoor: record.ycoor,
            roadName: record.roadName,
            manholeCategory: (record.manholeCategory == null || record.manholeCategory === '') ? undefined : String(record.manholeCategory),
            manholeType: (record.manholeType == null || record.manholeType === '') ? undefined : String(record.manholeType),
            manholeStyle: (record.manholeStyle == null || record.manholeStyle === '') ? undefined : String(record.manholeStyle),
            depth: record.depth,
            surfaceElev: record.surfaceElev,
            datasource: (record.datasource == null || record.datasource === '') ? undefined : String(record.datasource),
            reportUnit: record.reportUnit,
            addiFae: record.addiFae,
            covMaterial: (record.covMaterial == null || record.covMaterial === '') ? undefined : String(record.covMaterial),
            covShape: (record.covShape == null || record.covShape === '') ? undefined : String(record.covShape),
            cnvDimen1: record.cnvDimen1,
            covDimen2: record.covDimen2,
            covDimen3: record.covDimen3,
            covThickness: record.covThickness,
            chamberType: record.chamberType,
            chamberLength: record.chamberLength,
            chamberWidth: record.chamberWidth,
            chamberHeight: record.chamberHeight,
            wellboreHeight: record.wellboreHeight,
            surveyWaterdepth: record.surveyWaterdepth,
            surveySedidepth: record.surveySedidepth,
            bottomStyle: (record.bottomStyle == null || record.bottomStyle === '') ? undefined : String(record.bottomStyle),
            juneClass: (record.juneClass == null || record.juneClass === '') ? undefined : String(record.juneClass),
            status: (record.status == null || record.status === '') ? undefined : String(record.status),
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
      // 时间单独处理
      if (record.surveyDate) {
          this.form.getFieldDecorator('surveyDate', { initialValue: moment(record.surveyDate, 'YYYY-MM-DD') })
          this.surveyDateDateString = moment(record.surveyDate).format('YYYY-MM-DD')
      }
    },
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown () {
      this.dict_manhole_category = this.$options.filters['dictData']('MANHOLE_CATEGORY')
      this.dict_manhole_type = this.$options.filters['dictData']('MANHOLE_TYPE')
      this.dict_manhole_style = this.$options.filters['dictData']('MANHOLE_STYLE')
      this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
      this.dict_manhole_cover_material = this.$options.filters['dictData']('MANHOLE_COVER_MATERIAL')
      this.dict_manhole_cover_shape = this.$options.filters['dictData']('MANHOLE_COVER_SHAPE')
      this.dict_manhole_bottom_style = this.$options.filters['dictData']('MANHOLE_BOTTOM_STYLE')
      this.dict_manhole_class = this.$options.filters['dictData']('MANHOLE_CLASS')
      this.dict_facility_status = this.$options.filters['dictData']('FACILITY_STATUS')
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
          values.surveyDate = this.surveyDateDateString || null
          values.manholeid = this.id
          manholeEdit(values).then((res) => {
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
    surveyDateOnChange(date, dateString) {
      this.surveyDateDateString = dateString
    },
    handleCancel () {
      this.recordDateDateString = ''
      this.form.getFieldDecorator('recordDate', { initialValue: null })
      this.reportDateDateString = ''
      this.form.getFieldDecorator('reportDate', { initialValue: null })
      this.surveyDateDateString = ''
      this.form.getFieldDecorator('surveyDate', { initialValue: null })
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>
