<template>
  <a-modal
    title="新增排水管"
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
              label="管道类别"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择管道类别" v-decorator="['pipeCategory', {rules: [{ required: true, message: '请选择管道类别！' }]}]">
                <a-select-option v-for="(item,index) in dict_pipe_category" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管道长度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管道长度" type="number" v-decorator="['pipeLength', {rules: [{required: true, message: '请输入管道长度！'}]}]" />
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
              label="起点编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起点编码" v-decorator="['inJuncid', {rules: [{required: true, message: '请输入起点编码！'}]}]" />
            </a-form-item>
          </a-col>

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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="起点管底标高"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入起点管底标高" type="number" v-decorator="['inElev']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="终点管底标高"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入终点管底标高" type="number" v-decorator="['outElev']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="断面形式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择断面形式" v-decorator="['shapetype']">
                <a-select-option v-for="(item,index) in dict_shape_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="是否倒虹管"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择是否倒虹管" v-decorator="['invertsilphon']">
                <a-select-option v-for="(item,index) in dict_yes_true_false" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
              <a-input placeholder="请输入断面数据1" type="number" v-decorator="['shapeData1']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="断面数据2"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入断面数据2" type="number" v-decorator="['shaneData2']" />
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
              <a-input placeholder="请输入断面数据3" type="number" v-decorator="['shaneData3']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="断面数据4"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入断面数据4" type="number" v-decorator="['shaneData4']" />
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
              <a-input placeholder="请输入断面数据5" type="number" v-decorator="['shaneXydata']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="管道材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择管道材质" v-decorator="['material']">
                <a-select-option v-for="(item,index) in dict_pipe_material" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管道糙率"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管道糙率" type="number" v-decorator="['roughness']" />
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
              label="压力类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择压力类型" v-decorator="['pressureType']">
                <a-select-option v-for="(item,index) in dict_pressure_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="壁厚"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入壁厚" type="number" v-decorator="['wallThickness']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="管道衬里材质"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择管道衬里材质" v-decorator="['linerMaterial']">
                <a-select-option v-for="(item,index) in dict_liner_material" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="衬里厚度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入衬里厚度" type="number" v-decorator="['linerThickness']" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="接头形式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择接头形式" v-decorator="['jointType']">
                <a-select-option v-for="(item,index) in dict_joint_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="连接方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择连接方式" v-decorator="['connType']">
                <a-select-option v-for="(item,index) in dict_conn_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="管道坡度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入管道坡度" type="number" v-decorator="['pipeSlope']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="管理归属"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择管理归属" v-decorator="['ownership']">
                <a-select-option v-for="(item,index) in dict_owner_ship" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

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
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="是否有自冲洗设备"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择是否有自冲洗设备" v-decorator="['selfwashing']">
                <a-select-option v-for="(item,index) in dict_yes_true_false" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="是否存在雨污混接现象"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择是否存在雨污混接现象" v-decorator="['rainsewamix']">
                <a-select-option v-for="(item,index) in dict_yes_true_false" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="原始结构状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择原始结构状态" v-decorator="['originstruct']">
                <a-select-option v-for="(item,index) in dict_origin_struct" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="敷设方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择敷设方式" v-decorator="['constrMethod']">
                <a-select-option v-for="(item,index) in dict_constr_method" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="非开挖维修方式"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择非开挖维修方式" v-decorator="['trenchlessMethod']">
                <a-select-option v-for="(item,index) in dict_trenchless_method" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              label="设施状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择设施状态" v-decorator="['status']">
                <a-select-option v-for="(item,index) in dict_facility_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
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
  import { pipeAdd } from '@/api/modular/main/pipe/pipeManage'
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
        dict_pipe_category: [],
        dict_shape_type: [],
        dict_yes_true_false: [],
        dict_pipe_material: [],
        dict_data_source: [],
        recordDateDateString: '',
        reportDateDateString: '',
        dict_pressure_type: [],
        dict_liner_material: [],
        dict_joint_type: [],
        dict_conn_type: [],
        dict_owner_ship: [],
        dict_origin_struct: [],
        dict_constr_method: [],
        dict_trenchless_method: [],
        dict_facility_status: [],
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this)
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.sysDictTypeDropDown()
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_pipe_category = this.$options.filters['dictData']('PIPE_CATEGORY')
        this.dict_shape_type = this.$options.filters['dictData']('SHAPE_TYPE')
        this.dict_yes_true_false = this.$options.filters['dictData']('yes_or_no_integer')
        this.dict_pipe_material = this.$options.filters['dictData']('PIPE_MATERIAL')
        this.dict_data_source = this.$options.filters['dictData']('DATA_SOURCE')
        this.dict_pressure_type = this.$options.filters['dictData']('PRESSURE_TYPE')
        this.dict_liner_material = this.$options.filters['dictData']('LINER_MATERIAL')
        this.dict_joint_type = this.$options.filters['dictData']('JOINT_TYPE')
        this.dict_conn_type = this.$options.filters['dictData']('CONN_TYPE')
        this.dict_owner_ship = this.$options.filters['dictData']('OWNER_SHIP')
        this.dict_origin_struct = this.$options.filters['dictData']('ORIGIN_STRUCT')
        this.dict_constr_method = this.$options.filters['dictData']('CONSTR_METHOD')
        this.dict_trenchless_method = this.$options.filters['dictData']('TRENCHLESS_METHOD')
        this.dict_facility_status = this.$options.filters['dictData']('FACILITY_STATUS')
      },
      /**
       * 提交表单
       */
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
            pipeAdd(values).then((res) => {
              if (res.success) {
                this.$message.success('新增成功')
                this.confirmLoading = false
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败')// + res.message
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
