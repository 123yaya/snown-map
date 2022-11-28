<template>
  <a-modal title="预览图片" :width="1000" :visible="visible" :confirmLoading="confirmLoading" :footer="null" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading" style="text-align:center">
      <img class="imgPreview" :src="imgUrl" alt="">
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
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
      imgUrl: '',
      buildDateDateString: '',
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    // 初始化方法
    show (e) {
      this.visible = true
    },
    handleSubmit () {
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style>
.imgPreview {
  width: auto;
  max-height: 800px;
  max-width: 100%;
  height: 700px;
}
</style>
