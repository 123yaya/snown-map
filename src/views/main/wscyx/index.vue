<template>
  <div class="wrapperBox">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper" v-show="Selectkey === 1">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="9" :sm="24">
              <a-form-item label="查询日期">
                <a-range-picker />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item label="">
                <a-select style="width: 100%" v-model="queryParam.treatmentMethod" placeholder="请选择厂区">
                  <a-select-option v-for="(item, index) in treatmentMethodData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <x-down ref="batchExport" @batchExport="batchExport" />
                <a-button type="primary" style="margin-left: 200px">新增</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-page-search-wrapper" v-show="Selectkey === 2">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="9" :sm="24">
              <a-form-item label="查询日期">
                <a-range-picker />
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-page-search-wrapper" v-show="Selectkey === 3">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="开始月份">
                <a-month-picker placeholder="选择开始月份" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item label="结束月份">
                <a-month-picker placeholder="选择结束月份" />
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-page-search-wrapper" v-show="Selectkey === 4">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="">
                <a-select style="width: 100%" v-model="queryParam.treatmentMethod" placeholder="请选择厂区">
                  <a-select-option v-for="(item, index) in treatmentMethodData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!--            <a-col :md="4" :sm="24">-->
            <!--              <a-form-item label="">-->
            <!--                <a-select mode="tags" style="width: 100%" :token-separators="[',']" @change="handleChange">-->
            <!--                  <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">-->
            <!--                    {{ (i + 9).toString(36) + i }}-->
            <!--                  </a-select-option>-->
            <!--                </a-select>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <a-col :md="7" :sm="24">
              <a-form-item label="">
                <a-range-picker v-model="value1" />
              </a-form-item>
            </a-col>
            <!--            <a-col :md="4" :sm="24">-->
            <!--              <a-form-item label="">-->
            <!--                <a-select mode="tags" style="width: 100%" :token-separators="[',']" @change="handleChange">-->
            <!--                  <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">-->
            <!--                    {{ (i + 9).toString(36) + i }}-->
            <!--                  </a-select-option>-->
            <!--                </a-select>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-page-search-wrapper" v-show="Selectkey === 5">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-date-picker style="width: 200px" />
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-page-search-wrapper" v-show="Selectkey === 6">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="5" :sm="24">
              <a-form-item label="">
                <a-range-picker />
              </a-form-item>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              </span>
            </a-col>
            <a-col :md="2" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" style="background-color: #FFA07A;border: none">编辑</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="列表视图">
          <a-table :data-source="data" :pagination="false" :scroll="{ x: 'calc(700px + 50%)', y: 500 }">
            <a-table-column key="age" title="日期" data-index="date" width="120px" align="center" />
            <a-table-column key="age" title="项目名称" data-index="age" width="120px" align="center" />
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">处理能力</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(万吨/日)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">日处理水量</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(万吨)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">水位</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(m)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column-group>
              <span slot="title" style="text-align: center;display: inline-block">COD进水浓度差</span>
              <a-table-column key="firstName" data-index="firstName" width="80px">
                <span slot="title" style="text-align: center;display: inline-block">(mg/L)</span>
              </a-table-column>
            </a-table-column-group>
            <a-table-column key="action" title="操作" width="200px" align="center">
              <template slot-scope="text, record">
                <span>
                  <a>编辑</a>
                  <a-divider type="vertical" />
                  <a-popconfirm placement="topRight" title="确认删除？" @confirm="() => singleDelete(record)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </template>
            </a-table-column>
          </a-table>
        </a-tab-pane>
        <!--        <a-tab-pane key="2" tab="日统计视图" force-render>-->
        <!--          <a-table sticky :columns="columns" :data-source="data2" :pagination="false" :scroll="{ x: 'calc(700px + 50%)', y: 500 }">-->
        <!--          </a-table>-->
        <!--        </a-tab-pane>-->
        <!--        <a-tab-pane key="3" tab="月统计视图">-->
        <!--          <a-table :columns="columnThree" :data-source="data2" :pagination="false" :scroll="{ y: 500 }">-->
        <!--          </a-table>-->
        <!--        </a-tab-pane>-->
        <a-tab-pane key="4" tab="统计视图" force-render>
          <div style="width: 100%;">
            <div class="table-page-search-wrapper">
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col :md="7" :sm="24">
                    <a-form-item label="SS进水浓度图表">
                      <a-select style="width: 100%" v-model="queryParam.treatmentMethod" placeholder="请选择">
                        <a-select-option v-for="(item, index) in treatmentMethodData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item label="最大值">
                      <a-input-number id="inputNumber" v-model="value" :min="1" :max="10" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item label="最小值">
                      <a-input-number v-model="value" :min="1" :max="10" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="3" :sm="24">
                    <a-form-item label="">
                      <a-switch default-checked />
                      <span>平均值</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="3" :sm="24">
                    <a-form-item label="">
                      <a-switch default-checked />
                      <span>达标值</span>
                    </a-form-item>
                  </a-col>
                  <a-col :md="3" :sm="24">
                    <a-form-item label="">
                      <a-switch default-checked />
                      <span>图表数值</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="48">
                  <a-col :md="7" :sm="24">
                    <a-form-item label="SS进水浓度图表">
                      <a-select style="width: 100%" v-model="queryParam.treatmentMethod" placeholder="请选择">
                        <a-select-option v-for="(item, index) in treatmentMethodData" :key="index" :value="item.code">{{ item.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item label="最大值">
                      <a-input-number v-model="value" :min="1" :max="10" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item label="最小值">
                      <a-input-number v-model="value" :min="1" :max="10" />
                    </a-form-item>
                  </a-col>
                  <a-col :md="2" :sm="24">
                    <span class="table-page-search-submitButtons">
                      <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                    </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>
            <div id="myChart" :style="{width: '85%', height: '500px'}"></div>
            <a-table :columns="columnsEchart" :data-source="dataEchart" :pagination="false" :scroll="{ x: 'calc(700px + 50%)', y: 500 }" style="margin-bottom: 50px">
            </a-table>
          </div>
        </a-tab-pane>
        <!--        <a-tab-pane key="5" tab="污水处理厂">-->
        <!--          <a-table :data-source="dataFive" :columns="columnsFive" :pagination="false" :scroll="{ x: 'calc(700px + 50%)', y: 500 }">-->
        <!--            <template-->
        <!--              v-for="col in ['wscScope']"-->
        <!--              :slot="col"-->
        <!--              slot-scope="text, record"-->
        <!--            >-->
        <!--              <div :key="col">-->
        <!--                <a-input-->
        <!--                  v-if="true"-->
        <!--                  style="margin: -5px 0"-->
        <!--                  :value="text"-->
        <!--                  @change="e => handleChange(e.target.value, record.key, col)"-->
        <!--                />-->
        <!--                <template v-else>-->
        <!--                  {{ text }}-->
        <!--                </template>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--            <template slot="operation" slot-scope="text, record">-->
        <!--              <div class="editable-row-operations">-->
        <!--                <span v-if="record.editable">-->
        <!--                  <a @click="() => save(record.key)">Save</a>-->
        <!--                  <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">-->
        <!--                    <a>Cancel</a>-->
        <!--                  </a-popconfirm>-->
        <!--                </span>-->
        <!--                        <span v-else>-->
        <!--                  <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>-->
        <!--                </span>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" style="padding: 8px">-->
        <!--              <a-button type="primary" size="small" style="margin-right: 8px" @click="() => handleSearch(selectedKeys, confirm, column)">-->
        <!--                保存-->
        <!--              </a-button>-->
        <!--              <a-button size="small" @click="() => handleReset(clearFilters)">-->
        <!--                取消-->
        <!--              </a-button>-->
        <!--            </div>-->
        <!--            <a-icon slot="filterIcon" slot-scope="{ filtered, column }" type="edit" @click="editColum(column)" :style="{ color: filtered ? '#108ee9' : undefined }" />-->
        <!--          </a-table>-->
        <!--        </a-tab-pane>-->
        <a-tab-pane key="6" tab="日处理表" force-render>
          <div class="tableSixBox">
            <div style="width:303px;">
              <table width="auto" cellspacing="1" cellpadding="6" bgcolor="#fafafa" class="tableSixHead" align="center">
                <tr>
                  <td class="font-center firsttd" colspan="1" rowspan="4" style="background-color: #fafafa;">
                    <div style="height: 61px;line-height: 61px;width: 150px">
                      基本信息
                    </div>
                  </td>
                  <td class="font-center firsttd" style="background-color: #fafafa;">
                    <div style="width: 150px;text-align: center">
                      污水处理厂
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      检测项目
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      单位
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      设计值
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center firsttd" colspan="1" rowspan="12" style="background-color: #fafafa;">
                    <div style="height: 61px;line-height: 61px;width: 150px">
                      2022年
                    </div>
                  </td>
                  <td class="font-center firsttd" style="background-color: #fafafa;">
                    <div style="width: 150px;text-align: center">
                      1月
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      2月
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      3月
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 150px;text-align: center">
                      4月
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div style="width:calc(100% - 303px);overflow-x: auto">
              <table width="auto" cellspacing="1" cellpadding="6" bgcolor="#fafafa" class="tableSix" align="center">
                <tr>
                  <td class="font-center firsttd" colspan="6" style="background-color: #fafafa;">
                    <div style="height: 61px;line-height: 61px;">
                      延吉污水厂
                    </div>
                  </td>
                  <td colspan="6" class="font-center firsttd" style="background-color: #fafafa;">
                    <div style="width: 500px">
                      永和污水厂11期
                    </div>
                  </td>
                  <td colspan="6" class="font-center firsttd" style="background-color: #fafafa;">
                    <div style="width: 500px">
                      永和污水厂12期
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD同比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮同比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD同比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮同比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      COD同比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮环比
                    </div>
                  </td>
                  <td class="font-center">
                    <div style="width: 120px;">
                      氨氮同比
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">mg/L</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                  <td class="font-center">%</td>
                </tr>
                <tr>
                  <td class="font-center">0</td>
                  <td class="font-center">0</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">0</td>
                  <td class="font-center">0</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">0</td>
                  <td class="font-center">0</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                  <td class="font-center">-</td>
                </tr>
                <tr>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                </tr>
                <tr>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                </tr>
                <tr>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                </tr>
                <tr>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                  <td class="font-center">238.23</td>
                  <td class="font-center">27.9</td>
                  <td class="font-center">10.64%</td>
                  <td class="font-center">5.54%</td>
                  <td class="font-center">-3.93%</td>
                  <td class="font-center">8.39%</td>
                </tr>
              </table>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import { STable, XDown } from '@/components'
import moment from 'moment'
const columnsFour = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%',
    scopedSlots: { customRender: 'age' }
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const data4 = []
for (let i = 0; i < 100; i++) {
  data4.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
export default {
  components: {
    STable,
    XDown
  },
  data () {
    this.cacheData = data4.map(item => ({ ...item }))
    return {
      data4,
      columnsFour,
      editingKey: '',
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      Selectkey: 1,
      treatmentMethodData: [{ code: '延吉污水厂', name: '延吉污水厂' }],
      columns: [
        {
          title: ' ',
          align: 'center',
          fixed: 'left',
          children: [
            {
              title: '序号',
              dataIndex: 'num',
              key: 'num',
              width: 80,
              align: 'center'
            },
            {
              title: '项目名称',
              dataIndex: 'name',
              key: 'name',
              width: 120,
              align: 'center'
            },
            {
              title: '处理能力',
              align: 'center',
              children: [
                {
                  title: '(万吨/每日)',
                  dataIndex: 'ability',
                  key: 'ability',
                  align: 'center',
                  width: 120
                }
              ]
            }
          ]
        },
        {
          title: '2020-04-21',
          align: 'center',
          children: [
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            }
          ]
        },
        {
          title: '2020-04-21',
          align: 'center',
          children: [
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            }
          ]
        },
        {
          title: '2020-04-21',
          align: 'center',
          children: [
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center',
                  width: 120
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center',
                  width: 120
                }
              ]
            }
          ]
        }
      ],
      data: [
        {
          key: '1',
          date: '2022-05-06',
          firstName: '0',
          lastName: 'Brown',
          age: '永和污水厂',
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          date: '2022-05-06',
          firstName: '0',
          lastName: 'Green',
          age: '永和污水厂11期',
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          date: '2022-05-06',
          firstName: '0',
          lastName: 'Black',
          age: '永和污水厂12期',
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        },
        {
          key: '2',
          date: '2022-05-06',
          firstName: '0',
          lastName: 'Green',
          age: '永和污水厂13期',
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          date: '2022-05-06',
          firstName: '0',
          lastName: 'Black',
          age: '永和污水厂14期',
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      data2: [{
        num: '1',
        name: '延吉污水厂',
        ability: '20',
        day: '13.11',
        COD: '235'
      },
      {
        num: '2',
        name: '永和污水厂12期',
        ability: '20',
        day: '13.11',
        COD: '235'
      },
      {
        num: '3',
        name: '永和污水厂4期',
        ability: '20',
        day: '13.11',
        COD: '235'
      },
      {
        num: '4',
        name: '永和污水厂3期进水',
        ability: '20',
        day: '13.11',
        COD: '235'
      },
      {
        name: '合计/加权值',
        ability: '20',
        day: '13.11',
        COD: '235'
      }
      ],
      columnThree: [
        {
          title: ' ',
          align: 'center',
          fixed: 'left',
          children: [
            {
              title: '序号',
              dataIndex: 'num',
              key: 'num',
              width: 80,
              align: 'center'
            },
            {
              title: '项目名称',
              dataIndex: 'name',
              key: 'name',
              width: 120,
              align: 'center'
            },
            {
              title: '处理能力',
              align: 'center',
              children: [
                {
                  title: '(万吨/每日)',
                  dataIndex: 'ability',
                  key: 'ability',
                  align: 'center',
                  width: 120
                }
              ]
            }
          ]
        },
        {
          title: '2020-04',
          align: 'center',
          children: [
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center'
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center'
                }
              ]
            },
            {
              title: '日处理水量',
              align: 'center',
              children: [
                {
                  title: '(万吨)',
                  dataIndex: 'day',
                  key: 'day',
                  align: 'center'
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center'
                }
              ]
            },
            {
              title: 'COD进水浓度',
              align: 'center',
              children: [
                {
                  title: '(mg/L)',
                  dataIndex: 'COD',
                  key: 'COD',
                  align: 'center'
                }
              ]
            }
          ]
        }
      ],
      columnsFive: [
        {
          title: '序号',
          dataIndex: 'num',
          key: 'num',
          width: 80,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '污水处理厂',
          dataIndex: 'wscName',
          key: 'wscName',
          width: 120,
          fixed: 'left',
          scopedSlots: { customRender: 'name' },
          align: 'center'
        },
        {
          title: '规模(万立方米/日)',
          dataIndex: 'wscScope',
          key: 'wscScope',
          width: 120,
          fixed: 'left',
          align: 'center',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'customRender'
          },
          onFilter: (value, record) => {
            record.name
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          },
          onFilterDropdownVisibleChange: visible => {
          }
        },
        {
          title: '2022年污水处理量      截止至2022-04-21',
          align: 'center',
          children: [
            {
              title: '累计处理水量(万吨)',
              dataIndex: 'yearLj',
              key: 'yearLj',
              width: 120,
              align: 'center'
            },
            {
              title: '日均处理水量(万吨)',
              dataIndex: 'yearRj',
              key: 'yearRj',
              width: 120,
              align: 'center'
            },
            {
              title: '同比率',
              dataIndex: 'yearRate',
              key: 'yearRate',
              width: 120,
              align: 'center'
            }
          ]
        },
        {
          title: 'BOD进水情况(mg/L)      截止至2022-04-21',
          align: 'center',
          children: [
            {
              title: '2021完成目标',
              dataIndex: 'BODTarget',
              key: 'BODTarget',
              width: 120,
              align: 'center'
            },
            {
              title: '规模(万立方米/日)',
              dataIndex: 'BODScope',
              key: 'BODScope',
              width: 120,
              align: 'center',
              scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender'
              },
              onFilter: (value, record) =>
                record.name
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus()
                  }, 0)
                }
              }
            },
            {
              title: '2022年截至完成目标',
              dataIndex: 'BODTargetTwo',
              key: 'BODTargetTwo',
              width: 120,
              align: 'center'
            },
            {
              title: '同比率',
              dataIndex: 'BODRate',
              key: 'BODRate',
              width: 120,
              align: 'center'
            }
          ]
        },
        {
          title: 'COD进水情况(mg/L)      截止至2022-04-21',
          align: 'center',
          children: [
            {
              title: '2021完成目标',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            },
            {
              title: '规模(万立方米/日)',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center',
              scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender'
              },
              onFilter: (value, record) =>
                record.name
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus()
                  }, 0)
                }
              }
            },
            {
              title: '2022年截至完成目标',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            },
            {
              title: '同比率',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            }
          ]
        },
        {
          title: '氨氮(mg/L)      截止至2022-04-21',
          align: 'center',
          children: [
            {
              title: '2021完成目标',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            },
            {
              title: '规模(万立方米/日)',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center',
              scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'customRender'
              },
              onFilter: (value, record) =>
                record.name
                  .toString()
                  .toLowerCase()
                  .includes(value.toLowerCase()),
              onFilterDropdownVisibleChange: visible => {
                if (visible) {
                  setTimeout(() => {
                    this.searchInput.focus()
                  }, 0)
                }
              }
            },
            {
              title: '2022年截至完成目标',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            },
            {
              title: '同比率',
              dataIndex: 'day',
              key: 'day',
              width: 120,
              align: 'center'
            }
          ]
        }
      ],
      dataFive: [
        {
          num: 1,
          wscName: '永和污水厂12期',
          wscScope: '20',
          yearLj: '133794.4425',
          yearRj: '760.2',
          yearRate: '23.14%',
          BODTarget: '5',
          BODScope: '100',
          BODTargetTwo: '187.32',
          BODRate: '20',
          day: '20'
        }
      ],
      columnsEchart: [
        { title: '年月', width: 120, dataIndex: 'year', key: 'year', fixed: 'left', align: 'center' },
        { title: '厂名', width: 120, dataIndex: 'name', key: 'name', fixed: 'left', align: 'center' },
        { title: '类别', width: 120, dataIndex: 'type', key: 'type', fixed: 'left', align: 'center' },
        { title: '01', dataIndex: 'address', key: '2', width: 120, align: 'center' },
        { title: '02', dataIndex: 'address', key: '2', width: 120, align: 'center' },
        { title: '03', dataIndex: 'address', key: '3', width: 120, align: 'center' },
        { title: '04', dataIndex: 'address', key: '4', width: 120, align: 'center' },
        { title: '05', dataIndex: 'address', key: '5', width: 120, align: 'center' },
        { title: '06', dataIndex: 'address', key: '6', width: 120, align: 'center' },
        { title: '07', dataIndex: 'address', key: '7', width: 120, align: 'center' },
        { title: '08', dataIndex: 'address', key: '8', width: 120, align: 'center' }],
      dataEchart: [{ year: '2022-04', name: '延吉污水厂', type: 'COD进水浓度' }],
      fixedTop: false,
      key: '1'
    }
  },
  created () {
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    moment,
    drawLine () {
      // 基于dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      var option

      const dataX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      option = {
        title: {
          text: '延吉污水厂2022年04月COD进水浓度和氨氮进水浓度对比',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['2022年-04延吉污水厂COD进水浓度', '2022年-04延吉污水厂氨氮进水浓度', '2022年-04延吉污水厂累计降雨值'],
          top: 30
        },
        xAxis: [
          {
            type: 'category',
            data: dataX,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'COD进水浓度',
            min: 0,
            max: 600,
            interval: 120,
            axisLabel: {
              formatter: '{value} mg/L'
            }
          },
          {
            type: 'value',
            name: '氨氮进水浓度',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value} mg/L'
            }
          },
          {
            type: 'value',
            name: '',
            min: 0,
            max: 500,
            interval: 100,
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            inverse: true
          }
        ],
        series: [
          {
            name: '2022年-04延吉污水厂COD进水浓度',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' mg/L'
              }
            },
            data: [
              157, 165, 155, 167, 155, 152, 151, 162.2, 157, 165, 155, 167, 155, 152, 151, 162.2, 157, 165, 155, 167, 155, 152, 151, 162.2, 157, 165, 155, 167, 155, 152
            ],
            label: {
              show: true
            },
            symbol: 'circle',
            symbolSize: 10,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '2022年-04延吉污水厂氨氮进水浓度',
            type: 'line',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' mg/L'
              }
            },
            data: [
              24, 20, 23, 26.4, 28.7, 24, 20, 23, 26.4, 28.7, 24, 20, 23, 26.4, 28.7, 24, 20, 23, 26.4, 28.7, 24, 20, 23, 26.4, 28.7
            ],
            label: {
              show: true
            },
            symbol: 'squareRatio',
            symbolSize: 10,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: '2022年-04延吉污水厂累计降雨值',
            type: 'line',
            smooth: true,
            yAxisIndex: 2,
            areaStyle: {},
            tooltip: {
              valueFormatter: function (value) {
                return value + ' mg/L'
              }
            },
            data: [0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49, 0, 90, 48, 0, 0, 0, 0, 0, 48, 0],
            label: {
              show: false
            },
            symbol: 'triangle',
            symbolSize: 10,
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            type: 'line',
            markLine: {
              data: [{ name: 'Avg', yAxis: 520, label: { formatter: 'COD达标值{c}' } }]
            }
          },
          {
            type: 'line',
            yAxisIndex: 1,
            markLine: {
              data: [{ name: 'Avg', yAxis: 21.1, label: { formatter: '氨氮达标值{c}' } }]
            }
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    },
    callback (key) {
      console.log(key)
      this.Selectkey = parseInt(key)
      console.log(this.Selectkey)
    },
    /**
     * 单个删除
     */
    singleDelete (record) {
    },
    /**
     * 批量导出
     */
    batchExport () {
    },
    handleSearch (selectedKeys, confirm, column) {
      console.log(column)
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = column.dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    editColum (dataIndex) {
      console.log(dataIndex)
    },
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    edit (key) {
      const newData = [...this.data4]
      const target = newData.find(item => key === item.key)
      this.editingKey = key
      if (target) {
        target.editable = true
        this.data4 = newData
      }
    },
    save (key) {
      const newData = [...this.data4]
      const newCacheData = [...this.cacheData]
      const target = newData.find(item => key === item.key)
      const targetCache = newCacheData.find(item => key === item.key)
      if (target && targetCache) {
        delete target.editable
        this.data4 = newData
        Object.assign(targetCache, target)
        this.cacheData = newCacheData
      }
      this.editingKey = ''
    },
    cancel (key) {
      const newData = [...this.data4]
      const target = newData.find(item => key === item.key)
      this.editingKey = ''
      if (target) {
        Object.assign(target, this.cacheData.find(item => key === item.key))
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>
<style lang="less" scoped>
  /*#app{*/
  /*  overflow: auto;*/
  /*}*/

/*.ant-layout-content{*/
/*  height: calc(100% - 80px)!important;*/
/*}*/
.ant-layout {
  height: 100%;
}
.wrapperBox {
  height: 100%;
  width: 100%;
  overflow: auto;
}
button {
  margin-right: 8px;
}
.tableSixBox {
  display: flex;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.tableSix {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
}
.tableSix td {
  background-color: #ffffff;
  height: 61px;
  line-height: 100%;
  border-bottom: 1px solid #e8e8e8;
}
.tableSixHead td {
  height: 61px;
  line-height: 100%;
  border: 1px solid #e8e8e8;
}
.firsttd {
  background-color: #fafafa;
}
.font-center {
  text-align: center;
}
</style>
