<template>
  <div class="policy-info">
    <el-row class="myxue">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/ShangpuList' }"><span class="sgftitle">商铺</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/shangpuInfo' }"><span class="sgftitle">{{$route.query.id ? '编辑' : '新增'}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-top: 21px;">
      <el-divider></el-divider>
    </el-row>
    <el-form ref="ruleForm" class="ruleForm" label-suffix="："  label-position="left" 
    :model="ruleForm" :rules="rules" label-width="210px" v-loading="loading">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="belogArea">
            <el-select size="small" v-model="ruleForm.belogArea" placeholder="请选择项目名称" :disabled="isEdit"
            @change="selectBelogArea(ruleForm.belogArea)"> 
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同编号" prop="contractID">
            <el-input size="small" ref="htName" v-model="ruleForm.contractID" disabled placeholder="请输入合同编号"/>
          </el-form-item>
          <el-form-item label="合同租赁位置" prop="hetongArea">
            <el-input size="small" ref="htName" v-model="ruleForm.hetongArea" placeholder="请输入合同租赁位置"/>
          </el-form-item>
          <el-form-item label="建筑面积(m²)" prop="builtArea">
            <el-input-number v-model="ruleForm.builtArea" :step="1" :precision="2" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="系统租赁位置" prop="locations">
            <el-select size="small" v-model="ruleForm.locations" multiple filterable placeholder="请选择租赁位置(可多选)"
             @remove-tag="removeTag"
             @change="selectTrigger(ruleForm.locations)">
              <el-option
                v-for="item in addoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 租赁位置签约面积 -->
          <el-form-item
            v-for="(item, index) in ruleForm.zulinArea"
            :label="item.value + '的签约面积(m²)'"
            :key="index"
            :prop="'zulinArea.'+index+'.area'"
            :rules="{
              required:true, message: '请填写相应签约面积', trigger: ['blur','change']
            }">
            <el-input-number v-model="item.area" :precision="2" :step="1" size="mini" @change="selectArea(item.area)"></el-input-number>
          </el-form-item>
          <el-form-item label="承租方名称" prop="leaseHolder">
            <el-input size="small" v-model="ruleForm.leaseHolder" placeholder="请输入承租方名称" />
          </el-form-item>
          <el-form-item label="承租类型" prop="leaseType">
            <el-select size="small" v-model="ruleForm.leaseType" placeholder="请选择承租类型" 
            @change="selectLeaseType(ruleForm.leaseType)"> 
              <el-option
                v-for="item in myoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="身份证号" prop="identity">
            <el-input size="small" v-model="ruleForm.identity" placeholder="请输入身份证号"  />
          </el-form-item> -->
          <el-form-item label="身份证号" prop="identity" v-show="isPerson">
            <el-input size="small" v-model="ruleForm.identity" placeholder="请输入身份证号"  />
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="license" v-show="!isPerson">
            <el-input size="small" v-model="ruleForm.license" placeholder="请输入统一社会信用代码"  />
          </el-form-item>
          <el-form-item label="联系人" prop="contacts">
            <el-input size="small" v-model="ruleForm.contacts" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="联系地址(非必填)" prop="address">
            <el-input size="small" v-model="ruleForm.address" placeholder="请输入联系地址(非必填)" />
          </el-form-item>
          <el-form-item label="经营业态" prop="businessPurpose">
              <el-input size="small" v-model="ruleForm.businessPurpose" placeholder="请输入经营业态" />
          </el-form-item>
          <el-form-item label="租金支付周期(月)" prop="rentPaymentCycle">
            <el-input-number v-model="ruleForm.rentPaymentCycle" :precision="0" :step="1" size="medium"></el-input-number>
          </el-form-item>
         <el-form-item label="乙方装修完成并开业期限(天)" prop="builtDay">
            <el-input-number v-model="ruleForm.builtDay" :precision="0" :step="1"  size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="备注(非必填)" prop="remarks">
            <el-input size="small" v-model="ruleForm.remarks" placeholder="请输入备注(非必填)" type="textarea" autosize/>
          </el-form-item>
          <el-form-item label="其他约定(非必填)" prop="others">
            <el-input size="small" v-model="ruleForm.others" placeholder="请输入其他约定(非必填)" type="textarea" autosize/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="店招底板费(该费用不退)(元)" prop="dibanMoney">
            <el-input-number v-model="ruleForm.dibanMoney" :precision="2" :step="1" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
              <el-input size="small" v-model="ruleForm.tel" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="日租金单价(元/m²/天)" prop="dailyRent">
            <el-input-number v-model="ruleForm.dailyRent" :precision="2" :step="1" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="新签或者续签" prop="reNewOrNew">
            <el-select size="small" v-model="ruleForm.reNewOrNew" placeholder="请选择新签还是续签"> 
              <el-option
                v-for="item in newoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="leaseTermRange">
              <el-date-picker
                size="small"
                v-model="ruleForm.leaseTermRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
                @change="leaseTerm">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="租期年限(年/月/日)" prop="leaseTerm">
            <el-input-number v-model="ruleForm.leaseYear" :precision="0" :step="1" size="mini"></el-input-number> 年 
            <el-input-number v-model="ruleForm.leaseMon" :precision="0" :step="1" size="mini"></el-input-number> 月 
            <el-input-number v-model="ruleForm.leaseDay" :precision="0" :step="1" size="mini"></el-input-number> 日 
          </el-form-item>
          <el-form-item label="免租期起止日期(非必填)" prop="freeTermRange">
              <el-date-picker
                size="small"
                v-model="ruleForm.freeTermRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="true"
                @change="freeTerm">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="租期年限(年/月/日)" prop="freeTerm">
            <el-input-number v-model="ruleForm.freeYear" :precision="0" :step="1" size="mini"></el-input-number> 年 
            <el-input-number v-model="ruleForm.freeMon" :precision="0" :step="1" size="mini"></el-input-number> 月 
            <el-input-number v-model="ruleForm.freeDay" :precision="0" :step="1" size="mini"></el-input-number> 日 
          </el-form-item>
          <el-form-item label="要求乙方正式营业日期" prop="businessDate">
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd"
              v-model="ruleForm.businessDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同保证金(元)" prop="depositContracts">
            <el-input-number v-model="ruleForm.depositContracts" :step="1" size="medium"></el-input-number>
          </el-form-item>
          <!-- <el-form-item label="签约日期" prop="signDate">
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd"
              v-model="ruleForm.signDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!--小表内容添加-->
      <el-row>
        <el-col :span="24">
          <!--绑定tableData-->
            <el-table
              :data="tableData"
              style="width: 100%" 
              :border="true"
              :stripe="true"
              class="myTable sgfTable">
              <el-table-column fixed="left" label="时间" prop="times" width="300px">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.times" placeholder="请填写第几期"></el-input>
                </template>
                </el-form-item>
              </el-table-column>
              <el-table-column label="起止日期" prop="startEnd" width="380px">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.startEnd"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :clearable="false"
                    @change="tableTerm">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="应收租金(元)" prop="rentReceivable" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.rentReceivable" :precision="2" :step="1000" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="应收管理服务费(元)" prop="serviceFeeReceivable" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.serviceFeeReceivable" :precision="2" :step="1000" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="免租后租金(元)" prop="rentPaid" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.rentPaid" :precision="2" :step="1" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="免租后管理服务费(元)" prop="servicePaid" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.servicePaid" :precision="2" :step="1" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="日租金单价(元/m²/天)" prop="dailyRent" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.dailyRent" :precision="2" :step="0.1" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="myAdd">新增</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--绑定ruleForm.myTableData-->
            <el-collapse v-model="collapseNames" @change="handleCollapseNames">
              <el-collapse-item  name="1">
                <template slot="title">
                  分期详情<i v-if="pushIcon" class="header-icon el-icon-caret-bottom" style="margin-left: 5px;"></i>
                          <i v-if="!pushIcon" class="header-icon el-icon-caret-top" style="margin-left: 5px;"></i>
                </template>
                <el-table
                  :data="ruleForm.myTableData"
                  style="width: 100%" 
                  :border="true"
                  :stripe="true"
                  height="300"
                  class="myTableData sgfTable">
                  <el-table-column fixed="left" label="时间" prop="times" width="300px">
                    <template slot-scope="scope">
                      <el-form-item :prop="'myTableData.'+scope.$index+'.times'"  :rules="{required: true,message: '请填写第几期',trigger: 'blur'}">
                          <el-input size="small" v-model="scope.row.times" placeholder="请填写第几期"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="起止日期" prop="startEnd" width="380px">
                    <template slot-scope="scope">
                      <el-form-item :prop="'myTableData.'+scope.$index+'.startEnd'" :rules="{required: true,message: '请选择日期',trigger: 'blur'}">
                          <el-date-picker
                            size="small"
                            v-model="scope.row.startEnd"
                            type="daterange"
                            range-separator="至"
                            :start-placeholder="scope.row.startEnd[0]"
                            :end-placeholder="scope.row.startEnd[1]"
                            value-format="yyyy-MM-dd"
                            :clearable="false"
                            @change="myTableTerm(scope.row)">
                          </el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="应收租金(元)" prop="rentReceivable" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.rentReceivable'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.rentReceivable" :precision="2" :step="1000" size="mini"></el-input-number>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="应收管理服务费(元)" prop="serviceFeeReceivable" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.serviceFeeReceivable'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.serviceFeeReceivable" :precision="2" :step="1000" size="mini"></el-input-number>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="免租后租金(元)" prop="rentPaid" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.rentPaid'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.rentPaid" :precision="2" :step="1000" size="mini"></el-input-number>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="免租后管理服务费(元)" prop="servicePaid" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.servicePaid'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.servicePaid" :precision="2" :step="1000" size="mini"></el-input-number>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="日租金单价(元/m²/天)" prop="dailyRent" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.dailyRent'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.dailyRent" :precision="2" :step="1000" size="mini"></el-input-number>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" align="center" label="操作" width="200px">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
        </el-col>
      </el-row>
        <el-form-item class="myItem">
          <el-button @click="$router.push('/ShangpuList')" class="mycancle" type="danger">取消</el-button>
          <el-button type="success" @click="sgfsubmit" :loading="submitLoading" class="itemBtn">确定</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { SPAddInfo, SPUpdateInfo, SPGetEditInfo,SPSYGetContractId,SPSAGetContractId,SPSYGetLocations,SPSAGetLocations } from '../../api/login.js'
export default {
  data() {
      //验证联系电话,从头开始第一位是1；第二位是3,4,5,7,8；第三位到结尾是0 - 9 的数字。(包括座机)
      // var validatetel = (rule, value, callback) => {
      //   let reg = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
      //   if (value === '') {
      //       callback(new Error('请输入联系电话'));
      //   }else if(!reg.test(value)){
      //       callback(new Error('联系电话格式有误'));
      //   } else {
      //     callback();//返回true
          
      //   }
      // };

      // //验证身份证号码
      // var validateIdentity = (rule, value, callback) => {
      //   let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      //   if (value === '') {
      //       callback(new Error('请输入身份证号'));
      //   }else if(!reg.test(value)){
      //       callback(new Error('身份证号格式有误'));
      //   } else {
      //     callback();//返回true
          
      //   }
      // };

      // //验证18位统一社会信用代码
      // var validateLicense = (rule, value, callback) => {
      //   let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      //   if (value === '') {
      //       callback(new Error('请输入统一社会信用代码'));
      //   }else if(!reg.test(value)){
      //       callback(new Error('统一社会信用代码格式有误'));
      //   } else {
      //     callback();//返回true
          
      //   }
      // };
    return {
      //区分当前页面是编辑还是新增
      collapseNames: [],
      pushIcon: true,
      isQiury: true,
      showHeader:false,
      isShowOverflow:true,
      isPerson: false,
      id: '',
      visible: false,
      startOptions: {
        disabledDate: (time) => !!this.ruleForm.endDate && time.getTime() > this.ruleForm.endDate
      },
      endOptions: {
        disabledDate: (time) => !!this.ruleForm.startDate && time.getTime() < this.ruleForm.startDate
      },
      belogOptions: [],
      SYBelogOptions: [
        {
          value: '山韵A区',
          label: '山韵A区'
        }, {
          value: '山韵B区',
          label: '山韵B区'
        }, {
          value: '山韵C区',
          label: '山韵C区'
        }, {
          value: '山韵D区',
          label: '山韵D区'
        }],
        SABelogOptions: [
        {
          value: '水岸A区',
          label: '水岸A区'
        }, {
          value: '水岸B区',
          label: '水岸B区'
        }, {
          value: '水岸C区',
          label: '水岸C区'
        }, {
          value: '水岸D区',
          label: '水岸D区'
        }],
        newoptions: [
          {
            value : '新签',
            label : '新签'
          },
          {
            value : '续签',
            label : '续签'
          },
        ],
      options: [{
          value: '山韵',
          label: '山韵'
        }, {
          value: '水岸',
          label: '水岸'
        }],
        myoptions: [{
          value: '公司',
          label: '公司'
        }, {
          value: '个人',
          label: '个人'
        }],
        zulinvalue: '',
        addoptions: [
        //   {
        //   value: '101',
        //   label: '101'
        // }, {
        //   value: '102',
        //   label: '102'
        // },
        // {
        //   value: '103',
        //   label: '103'
        // }, {
        //   value: '104',
        //   label: '104'
        // }
        ],
        addvalue: '',
        mylocation: [],
        isEdit: false,
        tagName: '',
      ruleForm: {
        xid: null,
        createBy: '',
        updateBy: '',
        contractName: '',
        contractID: '',
        condition: '',
        leaseHolder: '',
        identity: '',
        location,
        locations: [],
        hetongArea: '',
        zulinArea: [],
        builtArea: 0,
        leaseTermRange: [],
        freeTermRange: ['',''],
        rentPaymentCycle: 0,
        builtDay: 0,
        dibanMoney: 0,
        contacts: '',
        tel: '',
        address: '',
        businessPurpose: '',
        dailyRent: 0,
        leaseTerm: 0,
        leaseYear: 0,
        leaseMon : 0,
        leaseDay: 0,
        freeTerm: 0,
        freeYear: 0,
        freeMon : 0,
        freeDay : 0,
        businessDate: '',
        depositContracts: 0,
        belogArea: '',
        signDate: '',
        remarks: '',
        others: '',
        leaseType: '',
        license: '',
        reNewOrNew: '',
        myTableData:[

        ]
      },
      tableData: [{
          times: '',
          startEnd: [],
          rentReceivable: 0,
          serviceFeeReceivable: 0,
          rentPaid: 0,
          servicePaid: 0,
          dailyRent: 0,
        }],
      regionOptions: [],
      fileName: '',
      regionEnum: '',
      rules: {
        // contractName: {
        //   required: true,
        //   message: '请选择合同名称',
        //   trigger: ['blur', 'change']
        // },
        contractID: {
          required: true,
          message: '请输入合同编号',
          trigger: 'blur'
        },
        leaseHolder: {
          required: true,
          message: '请输入承租方名称',
          trigger: 'blur'
        },
        identity: {
          required: true,
          validator: this.validateIdentity,
          trigger: 'blur'
        },
        license: {
          required: true,
          validator: this.validateLicense,
          trigger: 'blur'
        },
        location: {
          required: true,
          message: '请选择租赁位置(可多选',
          trigger: ['blur', 'change']
        },
        hetongArea: {
          required: true,
          message: '请输入合同租赁位置',
          trigger: 'blur'
        },
        builtArea: {
          required: true,
          message: '请输入建筑面积',
          trigger: 'blur'
        },
        leaseTermRange: {
          required: true,
          message: '请选择租赁起止日期',
          trigger: 'blur'
        },
        // freeTermRange: {
        //   required: true,
        //   message: '请选择免租期起止日期',
        //   trigger: 'blur'
        // },
        rentPaymentCycle: {
          required: true,
          message: '请输入租金支付周期',
          trigger: 'blur'
        },
        builtDay: {
          required: true,
          message: '请输入乙方装修完成并开业期限',
          trigger: 'blur'
        },
        dibanMoney: {
          required: true,
          message: '请输入店招底板费',
          trigger: 'blur'
        },
        contacts: {
          required: true,
          message: '请输入联系人',
          trigger: 'blur'
        },
        tel: {
          required: true,
          validator: this.validatetel,
          trigger: 'blur'
        },
        businessPurpose: {
          required: true,
          message: '请输入经营业态',
          trigger: 'blur'
        },
        dailyRent: {
          required: true,
          message: '请输入日租金单价',
          trigger: 'blur'
        },
        leaseTerm: {
          required: true,
          message: '请输入租赁年限(月)',
          trigger: 'blur'
        },
        // freeTerm: {
        //   required: true,
        //   message: '请输入免租期时长(月)',
        //   trigger: 'blur'
        // },
        // businessDate: {
        //   required: true,
        //   message: '请选择要求乙方正式营业日期',
        //   trigger: 'blur'
        // },
        depositContracts: {
          required: true,
          message: '请输入合同保证金(元)',
          trigger: 'blur'
        },
        // signDate: {
        //   required: true,
        //   message: '请选择签约日期',
        //   trigger: 'blur'
        // },
        leaseType: {
          required: true,
          message: '请选择承租类型',
          trigger: ['blur', 'change']
        },
        belogArea: {
          required: true,
          message: '请选择项目名称',
          trigger: 'blur'
        },
        locations: {
          required: true,
          message: '请选择租赁位置(可多选)',
          trigger: ['blur', 'change']
        },
        reNewOrNew: {
          required: true,
          message: '请选择新签或者续签',
          trigger: ['blur', 'change']
        }
      },
      uploadLoading: false,
      optionLoading: false,
      loading: false,
      submitLoading: false,
      changeFlag: false,
    }
  },
  components: {
  },
  computed: {
  },
  async created() {
    // this.sgfGetLocation()
    if(this.$route.query.id){
      //这是显示编辑
      this.ruleForm.updateBy = localStorage.getItem('myusername')
      this.ruleForm.createBy = ''
      this.ruleForm.xid = this.$route.query.id
      this.isQuery = true
      this.isEdit = true
      console.log(this.ruleForm.updateBy)
      console.log(this.isQuery)
      console.log('query存在')
      await this.sgfGetEditList()
      console.log(this.ruleForm)
      if(this.ruleForm.leaseType == '个人'){
        console.log("个人")
        this.isPerson = true
        this.rules.identity.required = true
        this.rules.identity.validator = this.validateIdentity
        this.rules.license.required = false
        this.rules.license.validator = null
      }else if(this.ruleForm.leaseType == '公司'){
        console.log("公司")
        this.isPerson = false
        this.rules.license.required = true
        this.rules.license.validator = this.validateLicense
        this.rules.identity.required = false
        this.rules.identity.validator = null
      }
    }else{
      //这是显示新增
      this.ruleForm.createBy = localStorage.getItem('myusername')
      this.ruleForm.updateBy = ''
      this.isQuery = false
      this.isEdit = false
      console.log(this.ruleForm.createBy)
      console.log(this.isQuery)
      console.log('不存在')
    }
    this.id = this.$route.query.id

  },
  async mounted() {

  },
  beforeDestroy() {
    // window.tinymce.get('tinymce').destroy()
  },
  methods: {
    handleCollapseNames(){
      this.pushIcon = !this.pushIcon
    },
      //验证手机号和座机
      validatetel(rule, value, callback){
        let reg = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
        if (value === '') {
            callback(new Error('请输入联系电话'));
        }else if(!reg.test(value)){
            callback(new Error('联系电话格式有误'));
        } else {
          callback();//返回true
          
        }
        },
      //验证身份证号码
      validateIdentity(rule, value, callback){
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (value === '') {
            callback(new Error('请输入身份证号'));
        }else if(!reg.test(value)){
            callback(new Error('身份证号格式有误'));
        } else {
          callback();//返回true
          
        }
      },

      //验证18位统一社会信用代码
      validateLicense(rule, value, callback){
        let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
        if (value === '') {
            callback(new Error('请输入统一社会信用代码'));
        }else if(!reg.test(value)){
            callback(new Error('统一社会信用代码格式有误'));
        } else {
          callback();//返回true
          
        }
      },
    //填写签约面积触发事件
    selectArea(val){
      console.log(val)
      console.log(this.ruleForm.zulinArea)
    },
        //选择承租类型触发事件
    selectLeaseType(val){
      console.log(val)
      if(val == '个人'){
        this.isPerson = true
        this.ruleForm.identity = ''
        this.rules.identity.required = true
        this.rules.identity.validator = this.validateIdentity
        this.rules.license.required = false
        this.rules.license.validator = null
        this.ruleForm.license = ''
        console.log(this.rules.identity)
        console.log(this.rules.license)
      }else if(val == '公司'){
        this.isPerson = false
        this.ruleForm.license = ''
        this.rules.license.required = true
        this.rules.license.validator = this.validateLicense
        this.rules.identity.required = false
        this.rules.identity.validator = null
        this.ruleForm.identity = ''
        console.log(this.rules.identity)
        console.log(this.rules.license)
      }
    },
    //选择合同名称触发事件
    selectBelogArea(val){
      console.log(val)
      if(val == '山韵'){
        this.belogOptions = this.SYBelogOptions
        this.sgfGetSYId()
        this.sgfGetSYLocation()
      }else if(val == '水岸'){
        this.belogOptions = this.SABelogOptions
        this.sgfGetSAId()
        this.sgfGetSALocation()
      }
    },
    //选择租赁位置触发事件
    selectTrigger(val){
      var myarea = ''
      this.ruleForm.location = this.ruleForm.locations.join('，')
      // this.ruleForm.address = this.ruleForm.location
      if(this.ruleForm.zulinArea.length <= this.ruleForm.locations.length){
        this.ruleForm.zulinArea.push({
        value: this.ruleForm.locations[this.ruleForm.locations.length-1],
        area: 0
      })
      }else{
        for(let i = 0;i<this.ruleForm.zulinArea.length;i++){
          if(this.ruleForm.locations.indexOf(this.ruleForm.zulinArea[i].value) != -1){
            console.log(i+'存在')
          }else{
            this.ruleForm.zulinArea.splice(i,1)
            console.log('不存在')
          }
        }
      }
      console.log(this.ruleForm.zulinArea)
    },
    //系统租赁位置移除tag触发事件
    removeTag(val){
      // this.tagName = val
      // console.log(this.tagName)
      // console.log(this.ruleForm.zulinArea)
      // for(var i =0; i<this.ruleForm.zulinArea.length;i++){
      //   if(this.tagName == this.ruleForm.zulinArea[i].value){
      //     console.log("存在这个value")
      //     var myindex = i
      //   }
      // }
      // this.ruleForm.zulinArea.splice(myindex, 1)
      // console.log(this.ruleForm.zulinArea)
      },
    //获取山韵租赁位置列表
    async sgfGetSYLocation(){
      let locationData = await SPSYGetLocations()
      console.log(locationData.data.location)
      this.addoptions = locationData.data.location
    },
    //获取水岸租赁位置列表
    async sgfGetSALocation(){
      let locationData = await SPSAGetLocations()
      console.log(locationData.data.location)
      this.addoptions = locationData.data.location
    },
    //获取山韵合同编号，以及合同编号的复用
    async sgfGetSYId(){
      let hetongId = await SPSYGetContractId()
      // console.log(hetongId)
      this.ruleForm.contractID = hetongId.data.contractID
      console.log(this.ruleForm.contractID)
    },
    //获取水岸合同编号，以及合同编号的复用
    async sgfGetSAId(){
      let hetongId = await SPSAGetContractId()
      // console.log(hetongId)
      this.ruleForm.contractID = hetongId.data.contractID
      console.log(this.ruleForm.contractID)
    },
    async sgfGetEditList(){
      console.log(this.$route.query.id)
      let requestData = this.$route.query.id
      let bigdata = await SPGetEditInfo(requestData)
      let newData = bigdata.data.shanYunDto
      this.ruleForm = newData
      console.log(this.ruleForm)
      console.log(this.ruleForm.belogArea)
      if(this.ruleForm.belogArea == '山韵'){
        this.sgfGetSYLocation()
      }else if(this.ruleForm.belogArea == '水岸'){
        this.sgfGetSALocation()
      }
      // this.ruleForm.locations = this.ruleForm.location.split(',')
    },
    async sgfsubmit(){
      //登录界面传过来的用户名
      console.log(localStorage.getItem('myusername'))
      //路由传过来的参数
      console.log(this.$route.query)
      if(this.isQuery){
        //编辑功能
        console.log('编辑功能')
        this.sgfUpdateInfo()
      }else{
        //新增功能
        console.log('新增功能')
        this.sgfAddInfo()
      }
    },
    //新增功能
    async sgfAddInfo(){
      this.$refs.ruleForm.validate( async valid => {
        if(valid){
          this.ruleForm.createBy = localStorage.getItem('myusername')
          this.ruleForm.updateBy = ''
          let requestData = this.ruleForm
          //新增接口
          var adddata = await SPAddInfo(requestData).then((response) => {
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            setTimeout(() => {
              var loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)',
              customClass: 'myLoading'
            });
              setTimeout( () => {
                loading.close();
              //页面跳转到list页面
              this.$router.push('/ShangpuList')
              },2000)
            }, 2000);
            //页面跳转到list页面
            this.$router.push('/ShangpuList')
          }).catch((error) => {
          })
          console.log(adddata)
          console.log(this.ruleForm)
        }else{
              this.$message({
              message: '请输入正确数据格式',
              type: 'error',
              duration: 2000
            })
        }
      })

    },
    //编辑功能
    async sgfUpdateInfo(){
      this.$refs.ruleForm.validate( async valid => {
        if(valid){
          this.ruleForm.updateBy = localStorage.getItem('myusername')
          this.ruleForm.createBy = ''
          let requestData = this.ruleForm
          //编辑接口
          var updatedata = await SPUpdateInfo(requestData).then((response) => {
            this.$message({
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          setTimeout(() => {
              var loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)',
              customClass: 'myLoading'
            });
              setTimeout( () => {
                loading.close();
              //页面跳转到list页面
              this.$router.push('/ShangpuList')
              },2000)
            }, 2000);
          }).catch((error) => {
          })
          console.log(updatedata)
          console.log(this.ruleForm)
        }else{
              this.$message({
              message: '请输入正确数据格式',
              type: 'error',
              duration: 2000
            })
        }
      })
    },
    tableTerm(value){
      console.log(value)
      this.tableData[0].startEnd = value
      var oDate1 = new Date(this.ruleForm.leaseTermRange[0])
      var oDate2 = new Date(this.ruleForm.leaseTermRange[1])
      var oDate3 = new Date(this.tableData[0].startEnd[0])
      var oDate4 = new Date(this.tableData[0].startEnd[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.tableData[0].startEnd = ['','']
      }
    },
    myTableTerm(row){
      console.log(row)
      var oDate1 = new Date(this.ruleForm.leaseTermRange[0])
      var oDate2 = new Date(this.ruleForm.leaseTermRange[1])
      var oDate3 = new Date(row.startEnd[0])
      var oDate4 = new Date(row.startEnd[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        row.startEnd = []
      }
    },
    leaseTerm(value){
      console.log(value)
      this.ruleForm.leaseTermRange = value
      let begin = value[0].split('-');
      let end = value[1].split('-');
      // 分别取二个日期的年、月、日值
      let d1 = parseInt(begin[2].replace(/^0+/,""))
      let m1 = parseInt(begin[1].replace(/^0+/,""))
      let y1 = parseInt(begin[0])
      let d2 = parseInt(end[2].replace(/^0+/,""))
      let m2 = parseInt(end[1].replace(/^0+/,""))
      let y2 = parseInt(end[0])
      // 获取每个月的天数，这里要注意一下闰年的2月
      var getMonthDays = function (y, m) {
          var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (m == 2 && ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0))) {
              return 29;
          }
          console.log(aMonthDays[m])
          return aMonthDays[m];
      };
      console.log(getMonthDays(2020,2))
      let y, m, d
      let tempD = 0
      let tmpM = 0
      let tmpY = 0

      // 计算日，不足时向月份借
      if (d2 >= d1) {
          d = d2 - d1 + 1
      } else {
          tmpM = -1
          d = getMonthDays(y1, m1) + d2 - d1 + 1
      }
 
      // 计算月，不足时向年份借
      if (m2 + tmpM >= m1) {
          m = m2 + tmpM - m1
          if((m1 == m2)&&(d == getMonthDays(y1,m1))){
            m = m+1
            d = 0
          }else if(m1 != m2){
            console.log("m1！=m2")
            console.log(d)
            console.log(getMonthDays(y2,m2))
            if((d1==1)&&(d == getMonthDays(y2,m2))){
              m = m+1
              d = 0
            }else if((d1 != 1)&&(d == getMonthDays(y1,m1))){

              m = m+1
              d = 0
            }
          }
      } else {
          tmpY = -1
          m = 12 + m2 + tmpM - m1
          if((m1 == m2)&&(d == getMonthDays(y1,m1))){
            m = m+1
            d = 0
          }else if(m1 != m2){
            console.log("m1！=m2")
            if((d1==1)&&(d == getMonthDays(y2,m2))){
              m = m+1
              d = 0
            }else if((d1 != 1)&&(d == getMonthDays(y1,m1))){
              m = m+1
              d = 0
            }
          }
      }
      console.log(d)
      this.ruleForm.leaseDay = d

      // 计算年
      y = y2 + tmpY - y1
      if(m == 12){
        y = y+1
        m = 0
      }
      console.log(m)
      console.log(y)
      this.ruleForm.leaseMon = m
      this.ruleForm.leaseYear = y
      // 拼接距离字符串 输出格式如："5天"， "5月 05天"， "5年 05月 05日"
      let str = "";
      if (y > 0) {
          str = y + '年 ' + ("0" + m).substr(-2) + "月 " + ("0" + d).substr(-2) + '天 '
      } else if (m > 0) {
          str = m + "月 " + ("0" + d).substr(-2) + '天 '
      } else if (d > 0) {
          str = d + '天 '
      }

      // 完整输出
      console.log(str);
    },
    freeTerm(value){
      if(value == null){
        this.ruleForm.freeTermRange = ['','']
        this.ruleForm.freeYear = 0
        this.ruleForm.freeMon = 0
        this.ruleForm.freeDay = 0
        console.log(this.ruleForm.freeTermRange)
      }else{
      this.ruleForm.freeTermRange = value
      var oDate1 = new Date(this.ruleForm.leaseTermRange[0])
      var oDate2 = new Date(this.ruleForm.leaseTermRange[1])
      var oDate3 = new Date(this.ruleForm.freeTermRange[0])
      var oDate4 = new Date(this.ruleForm.freeTermRange[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.ruleForm.freeTermRange = ['','']
      }else{
      console.log(value)
      this.ruleForm.freeTermRange = value
      let begin = value[0].split('-');
      let end = value[1].split('-');
      // 分别取二个日期的年、月、日值
      let d1 = parseInt(begin[2].replace(/^0+/,""))
      let m1 = parseInt(begin[1].replace(/^0+/,""))
      let y1 = parseInt(begin[0])
      let d2 = parseInt(end[2].replace(/^0+/,""))
      let m2 = parseInt(end[1].replace(/^0+/,""))
      let y2 = parseInt(end[0])
      // 获取每个月的天数，这里要注意一下闰年的2月
      var getMonthDays = function (y, m) {
          var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (m == 2 && ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0))) {
              return 29;
          }
          console.log(aMonthDays[m])
          return aMonthDays[m];
      };
      console.log(getMonthDays(2020,2))
      let y, m, d
      let tempD = 0
      let tmpM = 0
      let tmpY = 0

      // 计算日，不足时向月份借
      if (d2 >= d1) {
          d = d2 - d1 + 1
      } else {
          tmpM = -1
          d = getMonthDays(y1, m1) + d2 - d1 + 1
      }
 
      // 计算月，不足时向年份借
      if (m2 + tmpM >= m1) {
          m = m2 + tmpM - m1
          if((m1 == m2)&&(d == getMonthDays(y1,m1))){
            m = m+1
            d = 0
          }else if(m1 != m2){
            console.log("m1！=m2")
            console.log(d)
            console.log(getMonthDays(y2,m2))
            if((d1==1)&&(d == getMonthDays(y2,m2))){
              m = m+1
              d = 0
            }else if((d1 != 1)&&(d == getMonthDays(y1,m1))){

              m = m+1
              d = 0
            }
          }
      } else {
          tmpY = -1
          m = 12 + m2 + tmpM - m1
          if((m1 == m2)&&(d == getMonthDays(y1,m1))){
            m = m+1
            d = 0
          }else if(m1 != m2){
            console.log("m1！=m2")
            if((d1==1)&&(d == getMonthDays(y2,m2))){
              m = m+1
              d = 0
            }else if((d1 != 1)&&(d == getMonthDays(y1,m1))){
              m = m+1
              d = 0
            }
          }
      }
      console.log(d)
      this.ruleForm.freeDay = d

      // 计算年
      y = y2 + tmpY - y1
      if(m == 12){
        y = y+1
        m = 0
      }
      console.log(m)
      console.log(y)
      this.ruleForm.freeMon = m
      this.ruleForm.freeYear = y
      // 拼接距离字符串 输出格式如："5天"， "5月 05天"， "5年 05月 05日"
      let str = "";
      if (y > 0) {
          str = y + '年 ' + ("0" + m).substr(-2) + "月 " + ("0" + d).substr(-2) + '天 '
      } else if (m > 0) {
          str = m + "月 " + ("0" + d).substr(-2) + '天 '
      } else if (d > 0) {
          str = d + '天 '
      }

      // 完整输出
      console.log(str);
      }
      }
    },
    nameSel(value){
      console.log(value)
      // if(value=='创融、兖矿、东站、浙大网新'){
      //   this.ruleForm.shangpuId='CR-'
      // }else if(value=='人才公寓'){
      //   this.ruleForm.shangpuId='RC-'
      // }else if(value=='映月'){
      //   this.ruleForm.shangpuId='YY-'
      // }else if(value=='山韵，水岸'){
      //   this.ruleForm.shangpuId='SY-'
      // }
    },
    handleDelete(index, row) {
        console.log(index, row);
        this.ruleForm.myTableData.splice(index, 1)
      },
    myAdd(){
      this.collapseNames = ['1']
      this.pushIcon = false
      this.ruleForm.myTableData.push({ ...this.tableData[0] })
      this.tableData[0].times=''
      this.tableData[0].startEnd=[]
      this.tableData[0].rentPaid=0
      this.tableData[0].serviceFeeReceivable=0
      this.tableData[0].rentPaid=0
      this.tableData[0].servicePaid=0
      this.tableData[0].dailyRent=0
      this.tableData[0].rentReceivable = 0
    },
    selectCompany(arr) {
      this.changeFlag = true
      this.ruleForm.companyList = arr
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-collapse-item__header{
  color: #02DBC3!important;
  font-size: 20px!important;
  margin-left: 10px!important;
}

/deep/ .myItem{
  margin-top: 30px;
  margin-left: -200px;
  // .itemBtn:hover{
  //     color: #02DBC3;
  //     border-color: #c6e2ff;
  //     background-color: #ecf5ff;
  // }
  // .mycancle:hover{
  //     color: #02DBC3;
  //     border-color: #c6e2ff;
  //     background-color: #ecf5ff;
  // }
}

/deep/ .el-collapse-item__arrow{
  display: none;
}

/deep/ .sgfTable{
    td, th{
    text-align: center!important;
  }
  .el-form-item__error{
    position: relative;
    text-align: center;
  }
}

  .policy-info {
    width: 100%;
    height: 100%;
    padding: 23px 0 0 0;

    .ruleForm {
      margin-top: 20px;
      .el-form-item {
        // width: 1398px;
        margin-bottom: 14px;
      }
      .el-form-item__content {
        max-width: 348px;
        .el-input__inner {
          width: 100%;
        }
      }
      .tinymce-textarea {
        .el-form-item__content {
          max-width: 100% !important;
        }
      }
      .tag-item {
        width: 100%;

        .el-form-item__content {
          max-width: 100%;
        }
        h5 {
          margin: 0;
          height: 32px;
          line-height: 32px;
          color: rgba(47, 49, 49, 1);
          font-size: 13px;
          text-align: left;
          width: 100%;
        }
        .tag-box {
          width: 100%;
          height: auto;
          text-align: center;
          border: 1px dashed rgba(222, 222, 223, 1);
          padding: 20px 30px;
          text-align: left;
        }
      }
    }
  }
  .myTable{
    input::-webkit-input-placeholder {
      /* placeholder字体大小  */
       font-size: 8px;
    }
  }
  .myItem{
    margin-top: 30px;
    margin-left: -200px;
    // .itemBtn{
    //   color: black;
    // }
  }

.el-table th>.cell:before {
    content: '*';
    color: #ff4949;
    margin-right: 3px;
}

.myTableCol{
  width: 500px!important;
}

.myxue{
  position: absolute;
  top: 29.5px
}

.sgftitle{
      font-size: 20px;
      font-weight: bold;
      color: $mainColor;
      font-style: italic;
    }



</style>

<style lang="scss">
.myLoading {
  .el-loading-spinner{
    i{
      font-size: 30px;
      color: $mainColor;
    }
    .el-loading-text{
      font-size: 20px;
      color: $mainColor;
    }
  }
}
.myTableData{
  .el-form-item__content{
    margin-left: 0 !important;
  }
  .el-table__row{
  .cell{
    height: 58px !important;
  }
}
}
</style>

