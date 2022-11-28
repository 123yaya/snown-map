<template>
  <a-modal
    title="编辑排污企业"
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
            <a-form-item label="企业单位名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入企业单位名称"
                v-decorator="['enterpriseName', { rules: [{ required: true, message: '请输入企业单位名称！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="单位性质" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择单位性质"
                v-decorator="['enterpriseNature', { rules: [{ required: true, message: '请选择单位性质！' }] }]"
              >
                <a-select-option v-for="(item, index) in dict_enterprise_nature" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="法人代表" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入法人代表"
                v-decorator="['corporatRepresentative']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="组织机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入组织机构代码"
                v-decorator="['organizationalCode']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="所属行业" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择所属行业"
                v-decorator="['industry']"
              >
                <a-select-option v-for="(item, index) in dict_industry" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系地址" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系地址"
                v-decorator="['contactAddress']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系人"
                v-decorator="['contactsName']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入联系人电话"
                v-decorator="['contactsTel']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="是否办理设置同意文件" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择是否办理设置同意文件"
                v-decorator="['isHandleAgreeFile']"
              >
                <a-select-option v-for="(item, index) in dict_yes_or_no" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否办理的登记文件" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择是否办理的登记文件"
                v-decorator="['isHandleRegisterFile']"
              >
                <a-select-option v-for="(item, index) in dict_yes_or_no" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="设置同意的入河排放量、主要污染物质、排放位置" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入设置同意的入河排放量、主要污染物质、排放位置"
                v-decorator="['discharge']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入所属项目名称"
                v-decorator="['belongProject']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="审批单位及审批文号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入审批单位及审批文号"
                v-decorator="['approvalSymbol']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="许可证号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入许可证号"
                v-decorator="['licenceCode']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="许可结论" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入许可结论"
                v-decorator="['licenceConclusion']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否是重点污染源" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-select
                style="width: 100%"
                placeholder="请选择是否是重点污染源"
                v-decorator="['isImportantPollutionSource']"
              >
                <a-select-option v-for="(item, index) in dict_is_important_pollution_source" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入经度"
                type="number"
                v-decorator="['lon']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="维度" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入维度"
                type="number"
                v-decorator="['lat']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="行政编号" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入行政编号"
                v-decorator="['areacode']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="水主键" :labelCol="labelCol" :wrapperCol="wrapperCol" has-feedback>
              <a-input
                placeholder="请输入水主键"
                type="number"
                v-decorator="['waterid']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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
  import { outletEnterpriseEdit } from '@/api/modular/main/outletenterprise/outletEnterpriseManage'
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
        dict_enterprise_nature: [],
        dict_industry: [],
        dict_yes_or_no: [],
        dict_is_important_pollution_source: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        id: ''
      }
    },
    methods: {
      // 初始化方法
      edit (record) {
        this.visible = true
        this.id = record.id
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              enterpriseName: record.enterpriseName,
              enterpriseNature: (record.enterpriseNature == null || record.enterpriseNature === '') ? undefined : String(record.enterpriseNature),
              corporatRepresentative: record.corporatRepresentative,
              organizationalCode: record.organizationalCode,
              industry: (record.industry == null || record.industry === '') ? undefined : String(record.industry),
              contactAddress: record.contactAddress,
              contactsName: record.contactsName,
              contactsTel: record.contactsTel,
              isHandleAgreeFile: (record.isHandleAgreeFile == null || record.isHandleAgreeFile === '') ? undefined : String(record.isHandleAgreeFile),
              isHandleRegisterFile: (record.isHandleRegisterFile == null || record.isHandleRegisterFile === '') ? undefined : String(record.isHandleRegisterFile),
              discharge: record.discharge,
              belongProject: record.belongProject,
              approvalSymbol: record.approvalSymbol,
              licenceCode: record.licenceCode,
              licenceConclusion: record.licenceConclusion,
              isImportantPollutionSource: (record.isImportantPollutionSource == null || record.isImportantPollutionSource === '') ? undefined : String(record.isImportantPollutionSource),
              lat: record.lat,
              remark: record.remark,
              lon: record.lon,
              areacode: record.areacode,
              waterid: record.waterid
            }
          )
        }, 100)
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_enterprise_nature = this.$options.filters['dictData']('ENTERPRISE_NATURE')
        this.dict_industry = this.$options.filters['dictData']('INDUSTRY')
        this.dict_yes_or_no = this.$options.filters['dictData']('yes_or_no_integer')
        this.dict_is_important_pollution_source = this.$options.filters['dictData']('IS_IMPORTANT_POLLUTION_SOURCE')
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
            outletEnterpriseEdit(values).then((res) => {
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
