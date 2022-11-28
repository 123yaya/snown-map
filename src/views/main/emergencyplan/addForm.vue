<template>
  <a-modal
    title="新增应急预案"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          label="预案名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-input placeholder="请输入预案名称" v-decorator="['name', {rules: [{required: true, message: '请输入预案名称！'}]}]" />
        </a-form-item>
        <a-form-item
          label="预警类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group v-decorator="['type', {rules: [{required: true, message: '请选择预警类型！'}]}]">
            <a-radio-button value="片区级预警">片区级预警</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="片区"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-radio-group v-decorator="['area', {rules: [{required: true, message: '请选择片区！'}]}]">
            <a-radio-button value="延吉市">延吉市</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="片区级预警"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-button @click="chooseBut(item.name)" v-for="(item, index) in buttonList" :key="index" v-decorator="['level', {rules: [{required: true, message: '请选择片区级预警！'}]}]" :style="{backgroundColor: buttonListColor[index]}" class="chooseBut">
            {{ item.name }}
            <div class="buttonIcon" :style="{ borderColor: buttonListColor[index] }" v-show="item.name === levelSelected">
              <a-icon type="check" :style="{ color: buttonListColor[index] }" />
            </div>
          </a-button>
        </a-form-item>
        <a-form-item
          label="短信通知人员"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          has-feedback
        >
          <a-select
            mode="multiple"
            placeholder="请选择短信通知人员"
            v-decorator="['notePersonIds', { rules: [{ required: true, message: '请选择短信通知人员！' }] }]"
            allow-clear
          >
            <a-select-option v-for="(item,index) in team_data_list" :key="index" :value="item.id" >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="附件"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-upload
            :fileList="uploadFiles"
            :customRequest="customRequest"
            :multiple="true"
            name="file"
            @change="handleChange"
          >
            <a-button> <a-icon type="upload" />上传文件</a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { emergencyPlanAdd, emergencyPlanUploadFile } from '@/api/modular/main/emergencyplan/emergencyPlanManage'
  import { emergencyTeamIdNameList } from '@/api/modular/main/emergencyteam/emergencyTeamManage'
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
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        levelSelected: '',
        buttonList: [{
          name: '一级'
        }, {
          name: '二级'
        }, {
          name: '三级'
        }, {
          name: '四级'
        }],
        buttonListColor: ['red', '#FB873A', '#EEBD1B', '#30BFFF'],
        uploadFiles: [],
        team_data_list: []
      }
    },
    methods: {
      // 初始化方法
      add (record) {
        this.visible = true
        this.getTeamIdNameList()
      },
      /**
       * 获取应急队伍列表
       */
      getTeamIdNameList () {
        const that = this
        emergencyTeamIdNameList({}).then((res) => {
          if (res.success) {
            that.team_data_list = res.data
          }
        }).finally((res) => {
        })
      },
      chooseBut(value) {
        this.levelSelected = value
        this.form.setFieldsValue({ level: value })
      },
      /**
       * 上传文件
       */
      customRequest (data) {
        const formData = new FormData()
        formData.append('file', data.file)
        emergencyPlanUploadFile(formData).then((res) => {
          if (res.success) {
            console.log(res.data)
            data.onSuccess({ id: res.data }, data)
          } else {
            data.onError()
          }
        })
      },
      handleChange(e) {
        this.uploadFiles = e.fileList
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
            // 附件
            const fileArr = []
            for (let i = 0; i < this.uploadFiles.length; i++) {
              fileArr.push(this.uploadFiles[i].response.id)
            }
            values.attachments = fileArr.toString()

            emergencyPlanAdd(values).then((res) => {
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
      handleCancel () {
        this.form.resetFields()
        this.levelSelected = ''
        this.uploadFiles = []
        this.visible = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .chooseBut {
    color: #ffffff;
    position: relative;
    margin-right: 15px;
    transition: none!important;
  }
  .buttonIcon {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    line-height: 20px!important;
    border: 2px solid;
    background-color: #ffffff;
    color: lawngreen;
    position: absolute;
    box-sizing: border-box;
    right: -11.5px;
    top: -11.5px;
  }
  .chooseBut:hover, .chooseBut:focus {
    border: 1px solid #d9d9d9;
    color: #ffffff;
    box-shadow: none;
  }
</style>
