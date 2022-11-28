<template>
  <div class="container">
    <a-tabs v-model="activeKey" size="large" @change="onChangeTabs">
      <a-tab-pane v-for="(workItem, workIndex) in workList" :key="workIndex">
        <template #tab>
          {{ workItem.name }}
          <span class="cirlceBox">
            {{ workItem.num }}
          </span>
        </template>
        <a-card :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="5" :sm="14">
                  <a-form-item label="工单来源">
                    <a-select style="width: 100%" v-model="queryParam.source" placeholder="请选择选工单来源" allow-clear>
                      <a-select-option v-for="(item, index) in dict_work_order_source" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="工单类型">
                    <a-select style="width: 100%" v-model="queryParam.type" placeholder="请选择工单类型" allow-clear>
                      <a-select-option v-for="(item, index) in dict_work_order_type" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="设施问题">
                    <a-select style="width: 100%" v-model="queryParam.facilityProblem" placeholder="请选择设施问题" allow-clear>
                      <a-select-option v-for="(item, index) in dict_facility_problem" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="7" :sm="24">
                  <a-form-item label="上报时间">
                    <a-range-picker v-model="queryParam.rangeDate" value-format="YYYY-MM-DD" />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="14">
                  <a-form-item label="所属片区">
                    <a-select style="width: 100%" v-model="queryParam.area" placeholder="请选择所属片区" allow-clear>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="2" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" icon="search" @click="onSearchData()">搜索</a-button>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </a-card>
        <div class="infoCardBox">
          <div class="infoCard" v-for="(item,index) in list" :key="index">
            <div class="cardTitleBox">
              <div class="cardTitle">
                {{ item.id }}
              </div>
              <div class="cardButtonBox">
                <a-button type="primary" @click="goInfo(workItem,item.id)">
                  查看
                </a-button>
                <a-popconfirm placement="topRight" title="确认删除？" @confirm="() => singleDelete(item.id)">
                  <a-button type="danger" icon="delete">
                  </a-button>
                </a-popconfirm>
              </div>
            </div>

            <div class="cardImgWrapper">
              <div class="cardImgBox">
                <img :src="(item.beforeProcessPhotos.split(',')[0] !== '' ? filePath+item.beforeProcessPhotos.split(',')[0] : require('../../../assets/zwtp.png'))" alt="">
                <div class="cardImgInfo cardImgInfoTwo">
                  事件处理前照片
                </div>
              </div>
              <div class="cardImgBox">
                <img :src="(item.afterProcessPhotos.split(',')[0] !== '' ? filePath+item.afterProcessPhotos.split(',')[0] : require('../../../assets/zwtp.png'))" alt="">
                <div class="cardImgInfo">
                  事件处理后照片
                </div>
              </div>
            </div>

            <div class="listInfoBox">
              <div class="leftListInfo">
                <div class="ListInfo">
                  <span class="ListInfoName">工单来源</span>
                  {{ 'WORK_ORDER_SOURCE' | dictType(item.source) }}
                </div>
                <div class="ListInfo">
                  <span class="ListInfoName">工单类型</span>
                  {{ 'WORK_ORDER_TYPE' | dictType(item.type) }}
                </div>
                <div class="ListInfo">
                  <span class="ListInfoName">设施问题</span>
                  {{ 'FACILITY_PROBLEM' | dictType(item.facilityProblem) }}
                </div>
                <div class="ListInfo">
                  <span class="ListInfoName">上报地址</span>
                  {{ item.reportAddress }}
                </div>
                <div class="ListInfo">
                  <span class="ListInfoName">上报时间</span>
                  {{ item.reportTime | moment('YYYY-MM-DD HH:mm:ss') }}
                </div>
                <div class="ListInfo">
                  <span class="ListInfoName">已上报天数</span>
                  {{ item.reportedDays }}
                </div>
              </div>
              <div class="rightListInfo" v-if="workItem.name === '待处理工单'">
                <img src="http://minio.princex.cn/yjps/b40c118b0676c359128b51e03f791158.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="paginationBox" v-if="total > 0">
          <a-pagination :current="current" :pageSize="pageSize" :total="total" @change="onPageChange" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import { problemWorkOrderPage, problemWorkOrderStatusCount, problemWorkOrderDelete } from '@/api/modular/main/problemworkorder/problemWorkOrder'

export default {
  components: {
    STable,
    XDown
  },
  data () {
    return {
      filePath: process.env.VUE_APP_FILE_BASE_URL,
      list: [],
      current: 1,
      total: 0,
      pageSize: 8,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      activeKey: 0,
      workList: [
        {
          name: '待处理工单',
          num: '0'
        },
        {
          name: '已处理工单',
          num: '0'
        }
      ],
      dict_work_order_source: [],
      dict_work_order_type: [],
      dict_facility_problem: []
    }
  },
  created () {
    this.sysDictTypeDropDown()
    this.getStatusCount()
    this.getDataList()
  },
  methods: {
    moment,
    /**
     * 获取字典数据
     */
    sysDictTypeDropDown () {
      this.dict_work_order_source = this.$options.filters['dictData']('WORK_ORDER_SOURCE')
      this.dict_work_order_type = this.$options.filters['dictData']('WORK_ORDER_TYPE')
      this.dict_facility_problem = this.$options.filters['dictData']('FACILITY_PROBLEM')
    },
    /**
     * 获取数据列表
     */
    getDataList () {
      const param = {
        pageNo: this.current,
        pageSize: this.pageSize,
        status: this.activeKey === 0 ? 1 : 2,
        ...this.queryParam
      }
      if (param.rangeDate && param.rangeDate.length > 0) {
        param.rangeDateBegin = moment(param.rangeDate[0]).format('YYYY-MM-DD')
        param.rangeDateEnd = moment(param.rangeDate[1]).format('YYYY-MM-DD')
        delete param.rangeDate
      }
      problemWorkOrderPage(param).then((res) => {
        if (res.success) {
          this.list = res.data.rows
          this.total = res.data.totalRows
          console.log('this.current', this.total)
        } else {
          this.$message.error('获取数据失败') // + res.message
        }
      })
    },
    /**
     * 获取待处理和已处理工单数量
     */
    getStatusCount () {
      problemWorkOrderStatusCount({}).then((res) => {
        if (res.success) {
          this.workList[0].num = res.data.unhandledCount
          this.workList[1].num = res.data.handledCount
        } else {
          this.$message.error('获取数据失败') // + res.message
        }
      })
    },
    /**
     * 查询数据条件
     */
    onSearchData () {
      this.current = 1
      this.getDataList()
    },
    /**
     * 详情
     */
    goInfo (e, id) {
      console.log('--------id', id)
      this.$router.replace({ name: 'sbwt_info', params: { record: e.name, detailId: id } })
    },
    /**
     * 切换标签页监听
     */
    onChangeTabs () {
      this.current = 1
      this.getDataList()
    },
    /**
     * 换页监听
     */
    onPageChange (page, pageSize) {
      this.current = page
      this.pageSize = pageSize
      this.getDataList()
    },
    /**
     * 删除
     */
    singleDelete (id) {
      problemWorkOrderDelete([{ id: id }]).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.getDataList()
        } else {
          this.$message.error('删除失败') // + res.message
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.table-operator {
  margin-bottom: 18px;
}
button {
  margin-right: 8px;
}

.ant-tabs-nav-scroll {
  display: flex;
  justify-content: center;
}

.ant-tabs-bar {
  margin: 0;
  border-bottom: 2px solid #e8e8e8;
  background-color: #ffffff;
}

.cirlceBox {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #1890ff;
  position: absolute;
  top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  right: -15%;
  font-weight: normal !important;
  font-size: 10px;
}

.infoCardBox {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 20px;
}

.infoCard {
  width: calc(25% - 20px);
  background-color: #ffffff;
  border: 1px solid #1890ff;
  margin-right: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.infoCard:nth-last-child(1) {
  margin-right: 0;
}
.paginationBox {
  width: 100%;
  margin-top: 5px;
  display: flex;
  justify-content: center;
}

.cardTitleBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 5px 8px 15px;
  box-sizing: border-box;
}

.cardTitle {
  font-weight: bold;
  color: #1c63ba;
  font-size: 20px;
}

.cardButtonBox {
  display: flex;
  align-items: center;
}

.cardImgWrapper {
  width: 100%;
  display: flex;
}

.cardImgBox {
  width: 50%;
}

.cardImgBox img {
  width: 100%;
  height: 105px;
}

.cardImgBox .cardImgInfo {
  width: 100%;
  text-align: center;
  color: #ffffff;
  background-color: #1c63ba;
  font-size: 13px;
  padding: 3px 0px;
}

.cardImgBox .cardImgInfoTwo {
  border-right: 1px solid #ffffff;
}

.listInfoBox {
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ListInfo {
  font-size: 13px;
  margin-top: 3px;
}

.ListInfoName {
  color: #1890ff;
  margin-right: 10px;
}

.rightListInfo img {
  width: 70px;
  height: auto;
}
.ant-tabs-nav-scroll {
  display: flex !important;
  justify-content: center !important;
}
</style>
<style>
.ant-tabs-nav-scroll {
  display: flex !important;
  justify-content: center !important;
}
</style>
