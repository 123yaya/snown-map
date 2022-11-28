<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: column;background-color: #ffffff;overflow: hidden">
    <a-card :bordered="false" :bodyStyle="tstyle">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="14">
              <a-form-item label="地点">
                <a-input v-model="queryParam.inspectAddress" allow-clear placeholder="请输入地点" />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="设施">
                <a-select style="width: 100%" v-model="queryParam.inspectFacility" allow-clear placeholder="请选择设施">
                  <a-select-option v-for="(item, index) in dict_patrol_inspection_facility" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" icon="search" @click="loadTableData">搜索</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <div class="topTitleBox">
      <a-button type="primary" icon="arrow-left" @click="backIndex">
        返回
      </a-button>
      <x-down ref="batchExport" @batchExport="batchExport" />
    </div>
    <a-card :bordered="false">
      <a-table sticky :columns="columns" :data-source="dataSource" :loading="loading" :scroll="{ y: 240 }">
        <span slot="inspectFacilityScopedSlots" slot-scope="text">
          {{ 'PATROL_INSPECTION_FACILITY' | dictType(text) }}
        </span>
        <span slot="isProblemScopedSlots" slot-scope="text">
          {{ 'yes_or_no_integer' | dictType(text) }}
        </span>
        <span slot="isOnSiteSolutionScopedSlots" slot-scope="text">
          {{ 'yes_or_no_integer' | dictType(text) }}
        </span>
        <span slot="sitePhotosScopedSlots" slot-scope="text">
          <a-carousel arrows style="width: 200px;">
            <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div class="swiperImgBox" v-for="(item, index) in text.split(',')" :key="'before'+index" @click="previewImg(filePath+item)">
              <img :src="filePath+item" alt="">
            </div>
          </a-carousel>
          <!-- <img style="width: 100px;height: 100px" @click="previewImg(text.split(',')[0])" :src="filePath + text.split(',')[0]" alt=""> -->
        </span>
      </a-table>
    </a-card>
    <preview-img ref="previewImg" />
  </div>
</template>

<script>
import { XDown } from '@/components'
import previewImg from '@/components/previewImg/previewImg'
import { patrolInspectRecordSubPage } from '@/api/modular/main/patrolinspectrecordsub/patrolInspectRecordSub'
export default {
  components: {
    XDown,
    previewImg
  },
  data () {
    return {
      queryParam: {},
      loading: false,
      columns: [
        {
          title: '人员名称',
          dataIndex: 'inspectUserName',
          align: 'center',
          width: 120,
          ellipsis: true
        },
        {
          title: '巡查地点',
          dataIndex: 'inspectAddress',
          align: 'center',
          width: 150,
          ellipsis: true
        },
        {
          title: '巡检上报时间',
          dataIndex: 'reportTime',
          align: 'center',
          width: 150,
          ellipsis: true
        },
        {
          title: '巡检设施',
          dataIndex: 'inspectFacility',
          align: 'center',
          width: 150,
          ellipsis: true,
          scopedSlots: { customRender: 'inspectFacilityScopedSlots' }
        },
        {
          title: '是否有问题',
          dataIndex: 'isProblem',
          align: 'center',
          width: 150,
          ellipsis: true,
          scopedSlots: { customRender: 'isProblemScopedSlots' }
        },
        {
          title: '是否现场解决',
          dataIndex: 'isOnSiteSolution',
          align: 'center',
          width: 150,
          ellipsis: true,
          scopedSlots: { customRender: 'isOnSiteSolutionScopedSlots' }
        },
        {
          title: '处理方式',
          dataIndex: 'dealWithMethod',
          align: 'center',
          width: 150,
          ellipsis: true
        },
        {
          title: '现场照片',
          dataIndex: 'sitePhotos',
          align: 'center',
          width: 150,
          ellipsis: true,
          scopedSlots: { customRender: 'sitePhotosScopedSlots' }
        }
      ],
      tstyle: { 'padding-bottom': '0px', 'margin-bottom': '10px' },
      dataSource: [],
      filePath: process.env.VUE_APP_FILE_BASE_URL,
      dict_patrol_inspection_facility: [],
      recordId: ''
    }
  },
  created () {
    this.recordId = this.$route.params.recordId
    this.sysDictTypeDropDown()
    this.loadTableData()
  },
  methods: {
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown () {
      this.dict_patrol_inspection_facility = this.$options.filters['dictData']('PATROL_INSPECTION_FACILITY')
    },
    // 查看图片
    previewImg (e) {
      this.$refs.previewImg.imgUrl = e
      this.$refs.previewImg.show()
    },
    loadTableData () {
      const that = this
      this.loading = true
      this.queryParam.recordId = this.recordId
      patrolInspectRecordSubPage(this.queryParam).then((res) => {
        if (res.success) {
          that.dataSource = res.data.rows
        }
      }).finally((res) => {
        this.loading = false
      })
    },
    /**
     * 批量导出
     */
    batchExport () {
    },
    backIndex () {
      this.$router.replace({ name: 'patrol_record_view' })
    }
  }
}
</script>
<style lang="less">
.ant-carousel .slick-list .slick-slide {
  pointer-events: auto !important;
}
</style>
<style scoped>
.topTitleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 26px;
}
.ant-card-body {
  padding-bottom: 0 !important;
}
.cardTitle {
  font-weight: bold;
  color: #1c63ba;
  font-size: 20px;
}
.swiperImgBox img {
  width: 100%;
  height: 100%;
}
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 100px;
  line-height: 100px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
