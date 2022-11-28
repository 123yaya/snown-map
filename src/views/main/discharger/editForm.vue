<template>
  <a-modal
    title="编辑排水户"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入名称"
                v-decorator="['name', { rules: [{ required: true, message: '请输入名称！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排水户地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入排水户地址"
                v-decorator="['addr']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="坐标X" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标X"
                type="number"
                v-decorator="['xcoor', { rules: [{ required: true, message: '请输入坐标X！' }] }]"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="坐标Y" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入坐标Y"
                type="number"
                v-decorator="['ycoor', { rules: [{ required: true, message: '请输入坐标Y！' }] }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="接入监测并编码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入接入监测并编码"
                v-decorator="['connManholeid']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组织机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入组织机构代码"
                type="number"
                v-decorator="['codeid']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="法人代表" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入法人代表"
                v-decorator="['legalperson']"
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
            <a-form-item label="主管单位" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入主管单位"
                v-decorator="['manager']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="排水户类型" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入排水户类型"
                v-decorator="['dischargerType']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="是否为重点排水户" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                placeholder="请选择是否为重点排水户"
                v-decorator="['keydischarger']"
                allow-clear
              >
                <a-select-option v-for="(item,index) in dict_yes_or_no" :key="index" :value="item.code" >{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="主要生产工艺" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入主要生产工艺"
                v-decorator="['process']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="排水许可证编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入排水许可证编号"
                v-decorator="['licenceId']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="许可证颁发日期" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-date-picker
                style="width: 100%"
                placeholder="请选择许可证颁发日期"
                v-decorator="['licenceIssuedate']"
                @change="licenceIssuedateOnChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="用水总量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入用水总量"
                type="number"
                v-decorator="['totalQuant']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="自备水量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入自备水量"
                type="number"
                v-decorator="['selfsupplyQuant']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="总排水量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入总排水量"
                type="number"
                v-decorator="['dischargeQuant']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="生产污水量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入生产污水量"
                type="number"
                v-decorator="['prodsewaQuant']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="生活污水量" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入生活污水量"
                type="number"
                v-decorator="['domesewaQuant']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="第一类污染物名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入第一类污染物名称"
                v-decorator="['gradelpollutant']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="第二类污染物名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入第二类污染物名称"
                v-decorator="['grade2pollutant']"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="污水处理方式" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理方式"
                v-decorator="['treatmentMethod']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="污水处理规模" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入污水处理规模"
                type="number"
                v-decorator="['treatmentCapa']"
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
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import moment from 'moment'
  import { dischargerEdit } from '@/api/modular/main/discharger/dischargerManage'
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
        licenceIssuedateDateString: '',
        dict_data_source: [],
        dict_yes_or_no: [],
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
        this.id = record.dischargerid
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              systemid: record.systemid,
              xcoor: record.xcoor,
              ycoor: record.ycoor,
              name: record.name,
              addr: record.addr,
              connManholeid: record.connManholeid,
              codeid: record.codeid,
              legalperson: record.legalperson,
              tel: record.tel,
              manager: record.manager,
              dischargerType: record.dischargerType,
              keydischarger: (record.keydischarger == null || record.keydischarger === '') ? undefined : String(record.keydischarger),
              process: record.process,
              licenceId: record.licenceId,
              totalQuant: record.totalQuant,
              selfsupplyQuant: record.selfsupplyQuant,
              dischargeQuant: record.dischargeQuant,
              prodsewaQuant: record.prodsewaQuant,
              domesewaQuant: record.domesewaQuant,
              gradelpollutant: record.gradelpollutant,
              grade2pollutant: record.grade2pollutant,
              treatmentMethod: record.treatmentMethod,
              treatmentCapa: record.treatmentCapa,
              datalistid: record.datalistid,
              datasource: (record.datasource == null || record.datasource === '') ? undefined : String(record.datasource)
            }
          )
        }, 100)
        // 时间单独处理
        if (record.licenceIssuedate) {
            this.form.getFieldDecorator('licenceIssuedate', { initialValue: moment(record.licenceIssuedate, 'YYYY-MM-DD') })
            this.licenceIssuedateDateString = moment(record.licenceIssuedate).format('YYYY-MM-DD')
        }
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
        this.dict_yes_or_no = this.$options.filters['dictData']('yes_or_no_integer')
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
            values.licenceIssuedate = this.licenceIssuedateDateString || null
            values.dischargerid = this.id
            dischargerEdit(values).then((res) => {
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
      licenceIssuedateOnChange(date, dateString) {
        this.licenceIssuedateDateString = dateString
      },
      handleCancel () {
        this.licenceIssuedateDateString = ''
        this.form.getFieldDecorator('licenceIssuedate', { initialValue: null })
        this.form.resetFields()
        this.visible = false
      }
    }
  }
</script>
