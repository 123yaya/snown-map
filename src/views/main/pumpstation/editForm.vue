<template>
  <a-modal
    title="编辑泵站"
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
                v-decorator="['systemid', {rules: [{required: true, message: '请输入排水系统编码！'}]}]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标X"
                type="number"
                v-decorator="['xcoor', {rules: [{required: true, message: '请输入坐标X！'}]}]"
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
                v-decorator="['ycoor', {rules: [{required: true, message: '请输入坐标Y！'}]}]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="泵站名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入泵站名称"
                v-decorator="['name', {rules: [{required: true, message: '请输入泵站名称！'}]}]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="泵站地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入泵站地址"
                v-decorator="['addr']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="泵站分类" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择泵站分类"
                v-decorator="['psCategory', { rules: [{ required: true, message: '请选择泵站分类！' }] }]"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_ps_category" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="泵总数" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入泵总数"
                type="number"
                v-decorator="['psNum']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="设计雨水排水能力" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入设计雨水排水能力"
                type="number"
                v-decorator="['designStormcapa']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="设计污水排水能力" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入设计污水排水能力"
                type="number"
                v-decorator="['designWwcapa']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="前池长" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入前池长"
                type="number"
                v-decorator="['forebaylen']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="前池宽" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入前池宽"
                type="number"
                v-decorator="['forebaywid']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="前池深" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入前池深"
                type="number"
                v-decorator="['forebaydep']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="进水池最高水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入进水池最高水位"
                type="number"
                v-decorator="['inMaxlevel']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="进水池设计运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入进水池设计运行水位"
                type="number"
                v-decorator="['inDesilevel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="进水池最高运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入进水池最高运行水位"
                type="number"
                v-decorator="['inMaxopelevel']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="进水池最低运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入进水池最低运行水位"
                type="number"
                v-decorator="['inMinopelevel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="出水池设计运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入出水池设计运行水位"
                type="number"
                v-decorator="['outDesilevel']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="出水池最高运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入出水池最高运行水位"
                type="number"
                v-decorator="['outMaxopelevel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="出水池最低运行水位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入出水池最低运行水位"
                type="number"
                v-decorator="['outMinopelevel']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="技术资料文件" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入技术资料文件"
                type="number"
                v-decorator="['datalistid']"
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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="填报单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入填报单位"
                v-decorator="['reportUnit']"
              />
            </a-form-item>
          </a-col>

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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="占地面积" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入占地面积"
                type="number"
                v-decorator="['area']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="服务范围" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入服务范围"
                v-decorator="['serviceScope']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="服务面积" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入服务面积"
                type="number"
                v-decorator="['serviceArea']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="现有雨水排水能力" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入现有雨水排水能力"
                type="number"
                v-decorator="['currentStormcapa']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="现有污水排水能力" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入现有污水排水能力"
                type="number"
                v-decorator="['currentWwcapa']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="设计暴雨重现期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入设计暴雨重现期"
                type="number"
                v-decorator="['designRtp']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="主供电源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入主供电源"
                v-decorator="['mainSupply']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="装机容量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入装机容量"
                type="number"
                v-decorator="['deviceCapa']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="备用电源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入备用电源"
                v-decorator="['backupSupply']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="辅助设施描述" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入辅助设施描述"
                v-decorator="['addiFac']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="溢流排放口" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入溢流排放口"
                v-decorator="['overoutfallid']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系电话"
                v-decorator="['tel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="设施状态" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择设施状态"
                v-decorator="['status']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_facility_status" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
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
  import { pumpstationEdit } from '@/api/modular/main/pumpstation/pumpstationManage'
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
        dict_ps_category: [],
        dict_data_source: [],
        dict_facility_status: [],
        recordDateDateString: '',
        reportDateDateString: '',
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
        this.id = record.pumpstationid
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              systemid: record.systemid,
              xcoor: record.xcoor,
              ycoor: record.ycoor,
              name: record.name,
              addr: record.addr,
              psCategory: (record.psCategory == null || record.psCategory === '') ? undefined : String(record.psCategory),
              psNum: record.psNum,
              designStormcapa: record.designStormcapa,
              designWwcapa: record.designWwcapa,
              forebaylen: record.forebaylen,
              forebaywid: record.forebaywid,
              forebaydep: record.forebaydep,
              inMaxlevel: record.inMaxlevel,
              inDesilevel: record.inDesilevel,
              inMaxopelevel: record.inMaxopelevel,
              inMinopelevel: record.inMinopelevel,
              outDesilevel: record.outDesilevel,
              outMaxopelevel: record.outMaxopelevel,
              outMinopelevel: record.outMinopelevel,
              datalistid: record.datalistid,
              datasource: (record.datasource == null || record.datasource === '') ? undefined : String(record.datasource),
              reportUnit: record.reportUnit,
              area: record.area,
              serviceScope: record.serviceScope,
              serviceArea: record.serviceArea,
              currentStormcapa: record.currentStormcapa,
              currentWwcapa: record.currentWwcapa,
              designRtp: record.designRtp,
              mainSupply: record.mainSupply,
              deviceCapa: record.deviceCapa,
              backupSupply: record.backupSupply,
              addiFac: record.addiFac,
              overoutfallid: record.overoutfallid,
              tel: record.tel,
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
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_ps_category = this.$options.filters['dictData']('PS_CATEGORY')
        this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
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
            values.pumpstationid = this.id
            pumpstationEdit(values).then((res) => {
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
