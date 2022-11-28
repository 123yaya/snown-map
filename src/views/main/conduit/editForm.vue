<template>
  <a-modal
    title="编辑排水渠"
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
              label="渠道类别"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择渠道类别" v-decorator="['conduitCategory', {rules: [{ required: true, message: '请选择渠道类别！' }]}]">
                <a-select-option v-for="(item,index) in dict_conduit_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="渠道类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择渠道类型" v-decorator="['conduitStyle', {rules: [{ required: true, message: '请选择渠道类型！' }]}]">
                <a-select-option v-for="(item,index) in dict_conduit_style" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="渠道长度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入渠道长度" v-decorator="['conduitLength', {rules: [{required: true, message: '请输入渠道长度！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
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

          <a-col :span="12">
            <a-form-item
              label="起点编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起点编码" v-decorator="['inJuncid', {rules: [{required: true, message: '请输入起点编码！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="终点编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终点编码" v-decorator="['outJuncid', {rules: [{required: true, message: '请输入终点编码！'}]}]" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="起点渠底标高"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入起点渠底标高" v-decorator="['inElev']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="终点渠底标高"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入终点渠底标高" v-decorator="['outElev']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="断面形式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择断面形式" v-decorator="['shapeType']">
                <a-select-option v-for="(item,index) in dict_shape_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="断面数据1"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入断面数据1" v-decorator="['shapeData1']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="断面数据2"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入断面数据2" v-decorator="['shapeData2']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="断面数据3"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入断面数据3" v-decorator="['shapeData3']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="断面数据4"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入断面数据4" v-decorator="['shapeData4']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="断面数据5"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input type="number" placeholder="请输入断面数据5" v-decorator="['shapeXydata']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="渠道材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择渠道材质" v-decorator="['material']">
                <a-select-option v-for="(item,index) in dict_conduit_material" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="渠道糙率"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入渠道糙率" type="number" v-decorator="['roughness']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="数据来源"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择数据来源" v-decorator="['datasource']">
                <a-select-option v-for="(item,index) in dict_data_source" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
              <a-date-picker style="width: 100%" placeholder="请选择数据获取日期" v-decorator="['recordDate']" @change="recordDateOnChange"/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="填报单位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入填报单位" v-decorator="['reportUnit']" />
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
              <a-date-picker style="width: 100%" placeholder="请选择填报日期" v-decorator="['reportDate']" @change="reportDateOnChange"/>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="渠道结构"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择渠道结构" v-decorator="['conduitstruct']">
                <a-select-option v-for="(item,index) in dict_conduit_struct" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="渠道坡度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入渠道坡度" type="number" v-decorator="['conduitSlope']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="管理归属"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择管理归属" v-decorator="['ownership']">
                <a-select-option v-for="(item,index) in dict_owner_ship" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="断面面积"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入断面面积" type="number" v-decorator="['shapeArea']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="原始结构状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择原始结构状态" v-decorator="['originstruct']">
                <a-select-option v-for="(item,index) in dict_origin_struct" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="接头形式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择接头形式" v-decorator="['jointType']">
                <a-select-option v-for="(item,index) in dict_joint_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="连接方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择连接方式" v-decorator="['connType']">
                <a-select-option v-for="(item,index) in dict_conn_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="设施状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select style="width: 100%" placeholder="请选择设施状态" v-decorator="['status']">
                <a-select-option v-for="(item,index) in dict_facility_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

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
  import { conduitEdit } from '@/api/modular/main/conduit/conduitManage'
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
        dict_conduit_category: [],
        dict_conduit_style: [],
        dict_shape_type: [],
        dict_conduit_material: [],
        dict_data_source: [],
        recordDateDateString: '',
        reportDateDateString: '',
        dict_conduit_struct: [],
        dict_owner_ship: [],
        dict_origin_struct: [],
        dict_joint_type: [],
        dict_conn_type: [],
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
        this.id = record.conduitId
        this.sysDictTypeDropDown()
        setTimeout(() => {
          this.form.setFieldsValue(
            {
              systemid: record.systemid,
              conduitCategory: (record.conduitCategory == null || record.conduitCategory === '') ? undefined : String(record.conduitCategory),
              conduitStyle: (record.conduitStyle == null || record.conduitStyle === '') ? undefined : String(record.conduitStyle),
              conduitLength: record.conduitLength,
              roadName: record.roadName,
              inJuncid: record.inJuncid,
              outJuncid: record.outJuncid,
              inElev: record.inElev,
              outElev: record.outElev,
              shapeType: (record.shapeType == null || record.shapeType === '') ? undefined : String(record.shapeType),
              shapeData1: record.shapeData1,
              shapeData2: record.shapeData2,
              shapeData3: record.shapeData3,
              shapeData4: record.shapeData4,
              shapeXydata: record.shapeXydata,
              material: (record.material == null || record.material === '') ? undefined : String(record.material),
              roughness: record.roughness,
              datasource: (record.datasource == null || record.datasource === '') ? undefined : String(record.datasource),
              reportUnit: record.reportUnit,
              conduitstruct: (record.conduitstruct == null || record.conduitstruct === '') ? undefined : String(record.conduitstruct),
              conduitSlope: record.conduitSlope,
              ownership: (record.ownership == null || record.ownership === '') ? undefined : String(record.ownership),
              shapeArea: record.shapeArea,
              originstruct: (record.originstruct == null || record.originstruct === '') ? undefined : String(record.originstruct),
              jointType: (record.jointType == null || record.jointType === '') ? undefined : String(record.jointType),
              connType: (record.connType == null || record.connType === '') ? undefined : String(record.connType),
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
        this.dict_conduit_category = this.$options.filters['dictData']('CONDUIT_CATEGORY')
        this.dict_conduit_style = this.$options.filters['dictData']('CONDUIT_STYLE')
        this.dict_shape_type = this.$options.filters['dictData']('SHAPE_TYPE')
        this.dict_conduit_material = this.$options.filters['dictData']('CONDUIT_MATERIAL')
        this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
        this.dict_conduit_struct = this.$options.filters['dictData']('CONDUIT_STRUCT')
        this.dict_owner_ship = this.$options.filters['dictData']('OWNER_SHIP')
        this.dict_origin_struct = this.$options.filters['dictData']('ORIGIN_STRUCT')
        this.dict_joint_type = this.$options.filters['dictData']('JOINT_TYPE')
        this.dict_conn_type = this.$options.filters['dictData']('CONN_TYPE')
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
            values.conduitId = this.id
            conduitEdit(values).then((res) => {
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
