<template>
  <a-modal
    title="编辑摄像头"
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
              label="摄像机名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机名称" v-decorator="['cameraName', {rules: [{required: true, message: '请输入摄像机名称！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="摄像机编码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机编码" v-decorator="['cameraCode', {rules: [{required: true, message: '请输入摄像机编码！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="摄像机ip地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机ip地址" v-decorator="['cameraIp', {rules: [{required: true, message: '请输入摄像机ip地址！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="摄像机位置"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机位置" v-decorator="['cameraLocation']" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="摄像机经度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机经度" v-decorator="['cameraLongitude', {rules: [{required: true, message: '请输入摄像机经度！'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="摄像机纬度"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机纬度" v-decorator="['cameraLatitude', {rules: [{required: true, message: '请输入摄像机纬度！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="摄像机所属行政区划"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入摄像机所属行政区划" v-decorator="['cameraAddvcd']" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="摄像机状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择摄像机状态" v-decorator="['status']">
                <a-select-option v-for="(item,index) in dict_camera_status" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="播放类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择播放类型" v-decorator="['playType']">
                <a-select-option v-for="(item,index) in dict_play_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="码流类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-select style="width: 100%" placeholder="请选择码流类型" v-decorator="['streamType']">
                <a-select-option v-for="(item,index) in dict_stream_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="通道号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              has-feedback
            >
              <a-input placeholder="请输入通道号" v-decorator="['channelId']" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { cameraInfoEdit } from '@/api/modular/main/camerainfo/cameraInfoManage'
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
        dict_camera_status: [],
        dict_play_type: [],
        dict_stream_type: [],
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
              cameraName: record.cameraName,
              cameraCode: record.cameraCode,
              cameraIp: record.cameraIp,
              cameraLocation: record.cameraLocation,
              cameraLongitude: record.cameraLongitude,
              cameraLatitude: record.cameraLatitude,
              cameraAddvcd: record.cameraAddvcd,
              status: (record.status == null || record.status === '') ? undefined : String(record.status),
              playType: (record.playType == null || record.playType === '') ? undefined : String(record.playType),
              streamType: (record.streamType == null || record.streamType === '') ? undefined : String(record.streamType),
              channelId: record.channelId
            }
          )
        }, 100)
      },
      /**
       * 获取字典数据
       */
      sysDictTypeDropDown () {
        this.dict_camera_status = this.$options.filters['dictData']('CAMERA_STATUS')
        this.dict_play_type = this.$options.filters['dictData']('PLAY_TYPE')
        this.dict_stream_type = this.$options.filters['dictData']('STREAM_TYPE')
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
            cameraInfoEdit(values).then((res) => {
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
