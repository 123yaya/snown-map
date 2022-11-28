<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: column;background-color: #ffffff;overflow: hidden">
    <div class="topTitleBox">
      <a-button type="primary" icon="arrow-left" @click="backSbwt">
        返回
      </a-button>
      <div class="cardTitle">
        工单：{{ detailObj.id }}
      </div>
    </div>
    <div class="bottomBoxWrapper">
      <div class="bottomLeftBox">
        <div class="stepLine" v-if="stepList.length !== 1"></div>
        <div v-for="(item, index) in stepList" :key="index" class="stepBox" :class="item.titleSrc?'selectedBac':''">
          <div class="stepLeftBox">
            <div class="steplineBox">
              <div class="stepCircle" :style="{'backgroundColor':item.name === '已完成' ||item.name ==='维修上报'? '#FFC130 ' : ''}">
                {{ index+1 }}
              </div>
            </div>
          </div>
          <div class="stepDesBox">
            <div class="stepDesBoxTitle" :style="{'color':item.name === '已完成'||item.name ==='维修上报' ? '#FFC130 ' : ''}">
              {{ item.name }}
            </div>
            <div v-for="(infoItem, infoIndex) in item.listinfo" :key="infoIndex">{{ infoItem.name }} <span :style="{'color':infoItem.name === '上报人' ? 'black':''}">{{ infoItem.value }}</span></div>
            <div :class="item.titleSrc?'stepDesImgBox':'stepDesImgBoxTwo'" :style="{'display':item.name === '已完成' ? 'none ' : ''}" @click="changeStep(index)">
              <img :src="item.titleSrc?'http://minio.princex.cn/yjps/89be26f9cca3c2a3b26a40f3ee1d95f6.png': 'http://minio.princex.cn/yjps/e800969e7a938c531f9103605ad3d4ec.png'" alt="" class="stepDesImg">
            </div>
          </div>
        </div>
      </div>
      <div class="bottomRightBox">
        <div class="bottomRightBoxTop">
          <div class="mapBox">
            <div class="mapBoxTitle">
              上报时所处位置
            </div>
            <div class="map">
              <show-map ref="showMap" :x="detailObj.reportCoordinate.split(',')[0]" :y="detailObj.reportCoordinate.split(',')[1]" />
            </div>
          </div>
          <div class="rightInfoBox">
            <div class="rightInfoTitle">
              {{ rightInfoTitle }}
            </div>
            <div class="rightInfoList">
              <div class="infoListOne">
                <div class="infoListTitle">
                  工单编号
                </div>
                <div class="infoListContent">
                  {{ detailObj.id }}
                </div>
              </div>
              <div class="infoListOne">
                <div class="infoListTitle">
                  工单来源
                </div>
                <div class="infoListContent">
                  {{ 'WORK_ORDER_SOURCE' | dictType(detailObj.source) }}
                </div>
              </div>
              <div class="infoListOne">
                <div class="infoListTitle">
                  工单类型
                </div>
                <div class="infoListContent">
                  {{ 'WORK_ORDER_TYPE' | dictType(detailObj.type) }}
                </div>
              </div>
              <div class="infoListOne">
                <div class="infoListTitle">
                  事件设施
                </div>
                <div class="infoListContent">
                  {{ 'PATROL_INSPECTION_FACILITY' | dictType(detailObj.eventFacility) }}
                </div>
              </div>
              <div class="infoListOne">
                <div class="infoListTitle">
                  清疏方案
                </div>
                <div class="infoListContent">
                  {{ 'DREDGING_PLAN' | dictType(detailObj.dredgingPlan) }}
                </div>
              </div>
              <div class="infoListTwo">
                <div class="infoListTitleTwo">
                  设施问题
                </div>
                <div class="infoListContentTwo">
                  {{ 'FACILITY_PROBLEM' | dictType(detailObj.facilityProblem) }}
                </div>
              </div>
              <div class="infoListTwo">
                <div class="infoListTitleTwo">
                  上报地址
                </div>
                <div class="infoListContentTwo">
                  {{ detailObj.reportAddress }}
                </div>
              </div>
              <div class="infoListTwo">
                <div class="infoListTitleTwo">
                  上报时间
                </div>
                <div class="infoListContentTwo">
                  {{ detailObj.reportTime | moment('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bottomRightBoxBottom">
          <div class="infoImgBox">
            <div class="infoImgTitle">
              事件处理前照片
            </div>
            <a-carousel arrows style="width: 300px;">
              <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                <a-icon type="left-circle" />
              </div>
              <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle" />
              </div>
              <div class="swiperImgBox" v-for="(item, index) in detailObj.beforeprocessingPhotosArr" :key="'before'+index" @click="previewImg(filePath+item)">
                <img :src="filePath+item" alt="">
              </div>
            </a-carousel>
          </div>
          <div class="infoImgBox">
            <div class="infoImgTitle">
              事件处理中照片
            </div>
            <a-carousel arrows style="width: 300px;">
              <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                <a-icon type="left-circle" />
              </div>
              <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle" />
              </div>
              <div class="swiperImgBox" v-for="(item, index) in detailObj.processingPhotosArr" :key="'before'+index" @click="previewImg(filePath+item)">
                <img :src="filePath+item" alt="">
              </div>
            </a-carousel>
          </div>
          <div class="infoImgBox">
            <div class="infoImgTitle">
              事件处理后照片
            </div>
            <a-carousel arrows style="width: 300px;">
              <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
                <a-icon type="left-circle" />
              </div>
              <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle" />
              </div>
              <div class="swiperImgBox" v-for="(item, index) in detailObj.afterprocessingPhotosArr" :key="'before'+index" @click="previewImg(filePath+item)">
                <img :src="filePath+item" alt="">
              </div>
            </a-carousel>
          </div>
        </div>
      </div>
    </div>
    <preview-img ref="previewimg" />
  </div>
</template>

<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
import showMap from '@/components/showMap/showMap'
import previewImg from '@/components/previewImg/previewImg'
import { problemWorkOrderDetail } from '@/api/modular/main/problemworkorder/problemWorkOrder'

export default {
  components: {
    STable,
    XDown,
    showMap,
    previewImg
  },
  data () {
    return {
      filePath: process.env.VUE_APP_FILE_BASE_URL,
      current: 0,
      detailObj: {},
      rightInfoTitle: '',
      stepList: [
        {
          name: '清疏上报',
          titleSrc: true,
          listinfo: [
            {
              name: '',
              value: '2020-03-30 15:32:00'
            },
            {
              name: '上报人：',
              value: '林干贤'
            }
          ]
        },
        {
          name: '清疏处理上报',
          titleSrc: false,
          listinfo: [
            {
              name: '',
              value: '2020-04-30 15:32:00'
            },
            {
              name: '上报人：',
              value: '赖一鸣'
            },
            {
              name: '人工人数：',
              value: '4人'
            },
            {
              name: '人工工时：',
              value: '12分钟'
            },
            {
              name: '清理污泥渣土量：',
              value: '0.02立方'
            },
            {
              name: '清理管道长度：',
              value: '5米'
            }
          ]
        },
        {
          name: '已完成',
          titleSrc: false,
          listinfo: [
            {
              name: '',
              value: '2020-05-30 10:32:00'
            }
          ]
        }
      ],
      dict_work_order_source: [],
      dict_work_order_type: [],
      dict_facility_problem: []
    }
  },
  mounted () {
    if (this.$route.params.record === '待处理工单') {
      this.stepList = [
        {
          name: '维修上报',
          titleSrc: true,
          listinfo: [
            {
              name: '',
              value: '2022-09-29 11:13:22'
            },
            {
              name: '上报人',
              value: '邵佳伟'
            }
          ]
        }
      ]
    }
    this.rightInfoTitle = this.stepList[0].name
    this.getProblemWorkOrderDetail()
  },
  methods: {
    moment,
    getProblemWorkOrderDetail () {
      console.log('this.$router.params', this.$route.params)
      problemWorkOrderDetail({ id: this.$route.params.detailId }).then((res) => {
        if (res.success) {
          this.detailObj = res.data
          this.detailObj.beforeprocessingPhotosArr = res.data.beforeProcessPhotos ? res.data.beforeProcessPhotos.split(',') : []
          this.detailObj.processingPhotosArr = res.data.processingPhotos ? res.data.processingPhotos.split(',') : []
          this.detailObj.afterprocessingPhotosArr = res.data.afterProcessPhotos ? res.data.afterProcessPhotos.split(',') : []
        } else {
          this.$message.error('获取详情失败') // + res.message
        }
      })
    },
    changeStep (index) {
      this.rightInfoTitle = this.stepList[index].name
      for (var i in this.stepList) {
        this.stepList[i].titleSrc = false
      }
      this.stepList[index].titleSrc = true
    },
    // 初始化方法
    backSbwt () {
      this.$router.replace({ name: 'report_problem_manage', params: { record: 123 } })
    },
    // 查看图片
    previewImg (e) {
      console.log('查看图片', e)
      this.$refs.previewimg.imgUrl = e
      this.$refs.previewimg.show()
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
  padding: 10px 5px;
  border-bottom: 1px solid #1890ff;
}

.cardTitle {
  font-weight: bold;
  color: #1c63ba;
  font-size: 20px;
}

.bottomBoxWrapper {
  width: 100%;
  flex: 1;
  display: flex;
}

.bottomLeftBox {
  width: 30%;
  box-sizing: border-box;
  border-right: 1px solid #1890ff;
  position: relative;
  padding-bottom: 20px;
}

.stepBox {
  width: 100%;
  display: flex;
}

.stepLeftBox {
  width: 25%;
}

.selectedBac {
  background-color: rgba(107, 205, 228, 0.5);
  position: relative;
}

.selectedBac::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  background-color: #1890ff;
}

.steplineBox {
  height: 100%;
  position: relative;
}

.stepCircle {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #1890ff;
  color: #ffffff;
  font-size: 21px;
  font-weight: bold;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 38px;
  z-index: 99;
}

.stepLine {
  width: 2px;
  height: 90%;
  background-color: #c0c4cc;
  position: absolute;
  top: 20px;
  left: 52px;
  z-index: 1;
}

.stepDesBox {
  width: 75%;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  margin-top: 20px;
}

.stepDesBoxTitle {
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stepDesImgBox,
.stepDesImgBoxTwo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1890ff;
  position: absolute;
  bottom: 10%;
  right: 10%;
}

.stepDesImgBoxTwo {
  background-color: orange;
}

.stepDesImg {
  width: 30px;
  height: 30px;
}

.bottomRightBox {
  flex: 1;
  height: 100%;
}

.bottomRightBoxTop {
  width: 100%;
  height: 300px;
  position: relative;
}

.mapBox {
  position: absolute;
  width: 280px;
  top: 0;
  right: 0px;
}

.mapBoxTitle {
  width: 100%;
  padding-right: 10px;
  text-align: center;
  font-weight: bold;
}

.map {
  width: 270px;
  height: 300px;
  overflow: hidden;
}

.rightInfoBox {
  width: 70%;
  height: 100%;
  border-bottom: #1c63ba dashed 1px;
  display: flex;
  flex-direction: column;
}

.rightInfoTitle {
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0px;
  box-sizing: border-box;
}

.rightInfoList {
  height: 70%;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 0 50px;
  box-sizing: border-box;
}

.infoListOne {
  width: 33.3%;
}

.infoListTwo {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0 40px;
}

.infoListTitle,
.infoListTitleTwo {
  color: #1c63ba;
  font-size: 15px;
  font-weight: bold;
}

.infoListTitleTwo {
  width: 30%;
}

.infoListContent {
  margin: 10px 0 40px;
}

.bottomRightBoxBottom {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 45px 30px;
  width: 100%;
}

.infoImgBox {
  width: 32%;
}

.infoImgTitle {
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
}

.swiperImgBox img {
  width: 100%;
  height: 100%;
}

.ant-steps-item-content,
.stepDesBox {
  border-bottom: #1c63ba dashed 1px !important;
}

.ant-steps-vertical .ant-steps-item-title {
  font-weight: bold;
}

/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
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
