<template>
  <div class="policy-info">
    <el-row class="myxue">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/YingyueList' }"><span class="sgftitle">映月</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/yingyueInfo' }"><span class="sgftitle">{{$route.query.id ? '编辑' : '新增'}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-top: 21px;">
      <el-divider></el-divider>
    </el-row>
    </el-row>
    <el-form ref="ruleForm" class="ruleForm" label-suffix="："  label-position="left" 
    :model="ruleForm" :rules="rules" label-width="210px">
      <el-row :gutter="30">
        <el-col :span="12">
          <!-- <el-form-item label="合同名称" prop="contractName">
            <el-input size="small"  v-model="ruleForm.contractName" :disabled="true" placeholder="请输入合同名称" />
          </el-form-item> -->
          <el-form-item label="合同编号" prop="contractID">
            <el-input size="small" ref="htName" v-model="ruleForm.contractID" disabled placeholder="请输入合同编号" />
          </el-form-item>
          <el-form-item label="项目名称" prop="belogArea">
            <el-input size="small" v-model="ruleForm.belogArea" placeholder="请输入项目名称" disabled/>
          </el-form-item>
          <el-form-item label="租赁位置" prop="locations">
            <el-select size="small" v-model="ruleForm.locations" placeholder="请选择租赁位置(可多选)" multiple filterable 
             @change="selectTrigger(ruleForm.locations)">
              <el-option
                v-for="item in addoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
            <el-input size="small" v-model="ruleForm.identity" placeholder="请输入身份证号"  @blur="isTrueIdentity"/>
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="license" v-show="!isPerson">
            <el-input size="small" v-model="ruleForm.license" placeholder="统一社会信用代码"  @blur="isTrueLicense"/>
          </el-form-item>
          <el-form-item label="联系人" prop="contacts">
            <el-input size="small" v-model="ruleForm.contacts" placeholder="请输入联系人" />
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input size="small" v-model="ruleForm.tel" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="通讯地址(非必填)" prop="address">
            <el-input size="small" v-model="ruleForm.address" placeholder="请输入通讯地址(非必填)" />
          </el-form-item>
          <el-form-item label="备注(非必填)" prop="remarks">
            <el-input size="small" v-model="ruleForm.remarks" placeholder="请输入备注(非必填)" type="textarea" autosize/>
          </el-form-item>
          <el-form-item label="其他约定(非必填)" prop="others">
            <el-input size="small" v-model="ruleForm.others" placeholder="请输入其他约定(非必填)" type="textarea" autosize/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营用途" prop="businessPurpose">
            <el-input size="small" v-model="ruleForm.businessPurpose" placeholder="请输入经营用途"/>
          </el-form-item>
          <el-form-item label="开业日" prop="dueDate">
            <el-date-picker
              size="small"
              value-format="yyyy-MM-dd"
              v-model="ruleForm.dueDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="使用面积(m²)" prop="usableArea">
            <el-input-number size="medium" v-model="ruleForm.usableArea" :precision="2" :step="10" ></el-input-number>
          </el-form-item>
          <el-form-item label="建筑面积(m²)" prop="builtArea">
            <el-input-number size="medium" v-model="ruleForm.builtArea" :precision="2" :step="10" ></el-input-number>
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
          <el-form-item label="租期" prop="leaseRange">
              <el-date-picker
                size="small"
                v-model="ruleForm.leaseRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="false"
                @change="zulinTerm">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="租期年限(年/月/日)">
            <el-input-number v-model="ruleForm.leaseYear" :precision="0" :step="1" size="mini"></el-input-number> 年 
            <el-input-number v-model="ruleForm.leaseMon" :precision="0" :step="1" size="mini"></el-input-number> 月 
            <el-input-number v-model="ruleForm.leaseDay" :precision="0" :step="1"size="mini"></el-input-number> 日 
          </el-form-item>
          <el-form-item label="装修免租期(非必填)" prop="decorationFree">
              <el-date-picker
                size="small"
                v-model="ruleForm.decorationFree"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="true"
                 @change="zhuangxiuFreeTerm">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="装修免租期(年/月/日)">
            <el-input-number v-model="ruleForm.decorationYear" :precision="0" :step="1" size="mini"></el-input-number> 年 
            <el-input-number v-model="ruleForm.decorationMon" :precision="0" :step="1" size="mini"></el-input-number> 月 
            <el-input-number v-model="ruleForm.decorationDay" :precision="0" :step="1" size="mini"></el-input-number> 日 
          </el-form-item>
          <el-form-item label="经营免租期(非必填)" prop="manageFree">
            <el-date-picker
                size="small"
                v-model="ruleForm.manageFree"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :clearable="true"
                 @change="freeTerm">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="经营免租期(年/月/日)">
            <el-input-number v-model="ruleForm.manageYear" :precision="0" :step="1" size="mini"></el-input-number> 年 
            <el-input-number v-model="ruleForm.manageMon" :precision="0" :step="1" size="mini"></el-input-number> 月 
            <el-input-number v-model="ruleForm.manageDay" :precision="0" :step="1" size="mini"></el-input-number> 日 
          </el-form-item>
          <el-form-item label="支付周期(月)" prop="paymentCycle">
            <el-input-number size="medium" v-model="ruleForm.paymentCycle" :precision="0" :step="1" ></el-input-number>
          </el-form-item>
          <el-form-item label="商业名称" prop="businessName">
            <el-input size="small" v-model="ruleForm.businessName" placeholder="请输入商业名称" />
          </el-form-item>
          <el-form-item label="履约保证金(元)" prop="performanceBond">
            <el-input-number size="medium" v-model="ruleForm.performanceBond" :precision="2" :step="1000" ></el-input-number>
          </el-form-item>
          <el-form-item label="相当于几个月租金(非必填)" prop="monLease">
            <el-input-number v-model="ruleForm.monLease" :precision="0" :step="1" size="medium"></el-input-number>
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
      <el-row>
        <el-col :span="24">
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
              <el-table-column label="递增年限" prop="increasingYears" width="380px">
                <template slot-scope="scope">
                  <el-date-picker
                    size="small"
                    v-model="scope.row.increasingYears"
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
              <el-table-column label="日租金单价(元)" prop="dailyRent" width="250px">
                <template slot-scope="scope">
                  <el-input  v-model="scope.row.dailyRent" size="mini"></el-input>
                </template>
              </el-table-column>
              </el-table-column>
              <el-table-column label="应收租金(元)" prop="beforeRent" width="250px">
                <template slot-scope="scope">
                  <el-input  v-model="scope.row.beforeRent" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="实收租金(元)" prop="afterRent" width="250px">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.afterRent" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="myAdd">新增</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--小表myTableData-->
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
                  class="myTableData sgfTable"
                  >
                  <el-table-column fixed="left" label="时间" prop="times" width="300px">
                    <template slot-scope="scope">
                      <el-form-item :prop="'myTableData.'+scope.$index+'.times'"  :rules="{required: true,message: '请填写第几期',trigger: 'blur'}">
                          <el-input size="small" v-model="scope.row.times" placeholder="请填写第几期"></el-input>
                      </el-form-item>
                    </template>
                    </el-form-item>
                  </el-table-column>
                  <el-table-column label="递增年限" prop="increasingYears" width="380px">
                    <template slot-scope="scope">
                      <el-form-item :prop="'myTableData.'+scope.$index+'.increasingYears'" :rules="{required: true,message: '请选择日期',trigger: 'blur'}">
                          <el-date-picker
                            <el-date-picker
                              size="small"
                              v-model="scope.row.increasingYears"
                              type="daterange"
                              range-separator="至"
                              :start-placeholder="scope.row.increasingYears[0]"
                              :end-placeholder="scope.row.increasingYears[1]"
                              value-format="yyyy-MM-dd"
                              :clearable="false"
                              @change="myTableTerm(scope.row)">
                            </el-date-picker>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="日租金单价(元)" prop="dailyRent" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.dailyRent'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input  v-model="scope.row.dailyRent" size="mini"></el-input>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  </el-table-column>
                  <el-table-column label="应收租金(元)" prop="beforeRent" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.beforeRent'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input  v-model="scope.row.beforeRent" size="mini"></el-input>
                        </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="实收租金(元)" prop="afterRent" width="250px">
                    <template slot-scope="scope">
                        <el-form-item :prop="'myTableData.'+scope.$index+'.afterRent'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input  v-model="scope.row.afterRent" size="mini"></el-input>
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
          <el-button @click="$router.push('/YingyueList')" class="mycancle" type="danger">取消</el-button>
          <el-button type="success" @click="sgfsubmit" class="itemBtn">确定</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { YYAddInfo, YYUpdateInfo, YYGetEditInfo, YYGetXxid, YYGetLocation } from '../../api/login.js'
export default {
  data() {
      //验证联系电话,从头开始第一位是1；第二位是3,4,5,7,8；第三位到结尾是0 - 9 的数字。
      var validatetel = (rule, value, callback) => {
        let reg = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
        if (value === '') {
            callback(new Error('请输入联系电话'));
        }else if(!reg.test(value)){
            callback(new Error('联系电话格式有误'));
        } else {
          callback();//返回true
          
        }
      };

      //验证身份证号码
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

      //验证18位营业执照
      // var validateLicense = (rule, value, callback) => {
      //   let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      //   if (value === '') {
      //       callback(new Error('请输入营业执照'));
      //   }else if(!reg.test(value)){
      //       callback(new Error('营业执照格式有误'));
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
      //判断是营业执照还是身份证
      isPerson: false,
      id: '',
      visible: false,
      startOptions: {
        disabledDate: (time) => !!this.ruleForm.endDate && time.getTime() > this.ruleForm.endDate
      },
      endOptions: {
        disabledDate: (time) => !!this.ruleForm.startDate && time.getTime() < this.ruleForm.startDate
      },
      options: [{
          value: '创融、兖矿、东站、浙大网新',
          label: '创融、兖矿、东站、浙大网新'
        }, {
          value: '人才公寓',
          label: '人才公寓'
        }, {
          value: '映月',
          label: '映月'
        }, {
          value: '山韵，水岸',
          label: '山韵，水岸'
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
        myoptions: [{
          value: '公司',
          label: '公司'
        }, {
          value: '个人',
          label: '个人'
        }],
        zulinvalue: '',
        addoptions: [{
          value: '11-104',
          label: '11-104'
        }],
        addvalue: '',
        isEdit: false,
      ruleForm: {
        contractName: '',
        dueDate: '',
        contractID: '',
        condition: '',
        identity: '',
        license: '',
        leaseHolder: '',
        location: '',
        locations: [],
        decorationFree: ['',''],
        decorationYear: 0,
        decorationMon: 0,
        decorationDay: 0,
        usableArea: 0,
        manageFree: ['',''],
        manageYear: 0,
        manageMon: 0,
        manageDay: 0,
        builtArea: 0,
        contacts: '',
        address: '',
        tel: '',
        leaseRange: [],
        leaseTerm: 0,
        leaseYear: 0,
        leaseMon : 0,
        leaseDay: 0,
        businessPurpose: '',
        paymentCycle: 0,
        performanceBond: 0,
        businessName: '',
        remarks: '',
        others: '',
        leaseType: '',
        signDate: '',
        belogArea: '映月天地',
        monLease: 0,
        reNewOrNew: '',
        myTableData:[
        ]
      },
      tableData: [{
          times: '',
          increasingYears: [],//起止日期
          dailyRent: '',//日租金单价
          beforeRent: '',//应收租金
          afterRent: ''//实收租金
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
        dueDate: {
          required: true,
          message: '请选择开业日',
          trigger: 'blur'
        },
        leaseHolder: {
          required: true,
          message: '请输入承租方名称',
          trigger: 'blur'
        },
        identity: {
          required: false,
          validator: this.validateIdentity,
          trigger: 'blur'
        },
        license: {
          required: false,
          validator: this.validateLicense,
          trigger: 'blur'
        },
        location: {
          required: true,
          message: '请输入租赁位置',
          trigger: ['blur', 'change']
        },
        locations: {
          required: true,
          message: '请选择租赁位置(可多选)',
          trigger: ['blur', 'change']
        },
        locations: {
          required: true,
          message: '请选择租赁位置',
          trigger: 'blur'
        },
        // decorationFree: {
        //   required: true,
        //   message: '请选择装修免租期',
        //   trigger: 'blur'
        // },
        usableArea: {
          required: true,
          message: '请输入使用面积',
          trigger: 'blur'
        },
        // manageFree: {
        //   required: true,
        //   message: '请选择经营免租期',
        //   trigger: 'blur'
        // },
        builtArea: {
          required: true,
          message: '请输入建筑面积',
          trigger: 'blur'
        },
        contacts: {
          required: true,
          message: '请输入联系人',
          trigger: 'blur'
        },
        tel: {
          required: true,
          validator: validatetel,
          trigger: 'blur'
        },
        reNewOrNew: {
          required: true,
          message: '请选择新签或者续签',
          trigger: ['blur', 'change']
        },
        leaseRange: {
          required: true,
          message: '请选择租期起止日期',
          trigger: 'blur'
        },
        leaseTerm: {
          required: true,
          message: '请输入租赁年限(月)',
          trigger: 'blur'
        },
        businessPurpose: {
          required: true,
          message: '请输入经营用途',
          trigger: 'blur'
        },
        paymentCycle: {
          required: true,
          message: '请输入支付周期',
          trigger: 'blur'
        },
        performanceBond: {
          required: true,
          message: '请输入履约保证金',
          trigger: 'blur'
        },
        businessName: {
          required: true,
          message: '请输入商业名称',
          trigger: 'blur'
        },
        leaseType: {
          required: true,
          message: '请选择承租类型'
        },
        belogArea: {
          required: true,
          message: '请输入项目名称',
          trigger: 'blur'
        },       
        // signDate: {
        //   required: true,
        //   message: '请选择签约日期'
        // }
      }
    }
  },
  components: {
  },
  computed: {
  },
  async created() {
    if(this.$route.query.id){
      //这是显示编辑
      this.ruleForm.updateBy = localStorage.getItem('myusername')
      this.ruleForm.createBy = ''
      this.isQuery = true
      console.log(this.ruleForm.updateBy)
      console.log(this.isQuery)
      console.log('query存在')
      await this.sgfGetEditList()
      await this.sgfGetYYLocation()
      this.isEdit = true
      this.selectLeaseType(this.ruleForm.leaseType)
      // if(this.ruleForm.leaseType == '个人'){
      //   console.log("个人")
      //   this.isPerson = true
      //   // this.rules.identity.required = false
      //   // this.rules.identity.validator = this.validateIdentity
      //   // this.rules.license.required = false
      //   // this.rules.license.validator = null
      // }else if(this.ruleForm.leaseType == '公司'){
      //   console.log("公司")
      //   this.isPerson = false
      //   // this.rules.license.required = false
      //   // this.rules.license.validator = this.validateLicense
      //   // this.rules.identity.required = false
      //   // this.rules.identity.validator = null
      // }
    }else{
      //这是显示新增
      this.ruleForm.createBy = localStorage.getItem('myusername')
      this.ruleForm.updateBy = ''
      this.isQuery = false
      console.log(this.ruleForm.createBy)
      console.log(this.isQuery)
      console.log('不存在')
      this.sgfGetXxid()
      this.sgfGetYYLocation()
      this.isEdit = false
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
    isTrueIdentity(){
      // if(this.ruleForm.identity){
      //   console.log('identity')
      //   let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      //   if(!reg.test(this.ruleForm.identity)){
      //         this.$message({
      //         message: '身份证格式有误',
      //         type: 'error',
      //         duration: 2000
      //       })
      //       return false
      //   }
      // }else{
      //   console.log("no-identity")
      // }
      if(this.ruleForm.identity){
        // let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        // if(!reg.test(this.ruleForm.identity)){
        //       this.$message({
        //       message: '身份证格式有误',
        //       type: 'error',
        //       duration: 2000
        //     })
        //     return false
        // }
        this.rules.identity = {
          required: false,
          validator: this.validateIdentity,
          trigger: 'blur'
        }
        this.rules.license = {
          required: false,
          trigger: 'blur'
        }
      }else{
        
        // delete this.rules.identity
        this.rules.identity = {
          required: false,
          trigger: 'blur'
        }
        this.rules.license = {
          required: false,
          trigger: 'blur'
        }
      }
    },
    isTrueLicense(){
      // if(this.ruleForm.license){
      //   console.log("license")
      //   let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      //   if(!reg.test(this.ruleForm.license)){
      //         this.$message({
      //         message: '统一社会信用代码格式有误',
      //         type: 'error',
      //         duration: 2000
      //       })
      //       return false
      //   }
      // }else{
      //   console.log("no-license")
      // }

        if(this.ruleForm.license){
        // let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
        // if(!reg.test(this.ruleForm.license)){
        //       this.$message({
        //       message: '统一社会信用代码格式有误',
        //       type: 'error',
        //       duration: 2000
        //     })
        //     return false
        // }
        this.rules.license = {
          required: false,
          validator: this.validateLicense,
          trigger: 'blur'
        }
        this.rules.identity = {
          required: false,
          trigger: 'blur'
        }
      }else{
        // delete this.rules.license
        this.rules.license = {
          required: false,
          trigger: 'blur'
        }
        this.rules.identity = {
          required: false,
          trigger: 'blur'
        }
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
    //选择承租类型触发事件
    selectLeaseType(val){
      console.log(val)
      if(val == '个人'){
        this.isPerson = true
        this.ruleForm.identity = ''
        this.ruleForm.license = ''
        this.isTrueIdentity()
        console.log(this.rules.identity)
        console.log(this.rules.license)
      }else if(val == '公司'){
        this.isPerson = false
        this.ruleForm.license = ''
        this.ruleForm.identity = ''
        this.isTrueLicense()
        console.log(this.rules.identity)
        console.log(this.rules.license)
      }
    },
    //选择租赁位置触发事件
    selectTrigger(val){
      console.log(val)
      console.log(this.ruleForm.locations)
      this.ruleForm.location = this.ruleForm.locations.join('，')
      console.log(this.ruleForm.location)
      this.ruleForm.address = this.ruleForm.location
      // this.ruleForm.location = val.join(',')
      // console.log(val.join(','))
      // this.ruleForm.location = val.join(',')
      // console.log(this.ruleForm.location)
    },
    //获取水岸租赁位置列表
    async sgfGetYYLocation(){
      let locationData = await YYGetLocation()
      console.log(locationData)
      this.addoptions = locationData.data.location
      console.log(this.addoptions)
    },
    //获取排序合同编号，以及合同编号的复用
    async sgfGetXxid(){
      let hetongId = await YYGetXxid()
      console.log(hetongId)
      this.ruleForm.contractID = hetongId.data.contractID
    },
    async sgfGetEditList(){
      console.log(this.$route.query.id)
      let requestData = this.$route.query.id
      let bigdata = await YYGetEditInfo(requestData)
      console.log(bigdata)
      let newData = bigdata.data.yingYueDto
      this.ruleForm = newData
      console.log(this.ruleForm)
    },
    async sgfsubmit(){
      //登录界面传过来的用户名
      console.log(localStorage.getItem('myusername'))
      //路由传过来的参数
      console.log(this.$route.query)
      // if(this.ruleForm.identity){
      //   console.log('identity')
      //   let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      //   if(!reg.test(this.ruleForm.identity)){
      //         this.$message({
      //         message: '身份证格式有误',
      //         type: 'error',
      //         duration: 2000
      //       })
      //       return false
      //   }
      // }else{
      //   console.log("no-identity")
      // }
      // if(this.ruleForm.license){
      //   console.log("license")
      //   let reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      //   if(!reg.test(this.ruleForm.license)){
      //         this.$message({
      //         message: '统一社会信用代码格式有误',
      //         type: 'error',
      //         duration: 2000
      //       })
      //       return false
      //   }
      // }else{
      //   console.log("no-license")
      // }
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
          console.log(valid)
          this.ruleForm.createBy = localStorage.getItem('myusername')
          this.ruleForm.updateBy = ''
          let requestData = this.ruleForm
          //新增接口
          let adddata = await YYAddInfo(requestData).then((response) => {
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
                this.$router.push('/YingyueList')
              },2000)
            }, 2000);
            console.log(data)
            console.log(this.ruleForm)
          }).catch((error) => {
          })
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
          let updatedata = await YYUpdateInfo(requestData).then((response) => {
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
                this.$router.push('/YingyueList')
              },2000)
            }, 2000);
          //页面跳转到list页面
            console.log(data)
            console.log(this.ruleForm.location)
          }).catch((error) => {
          })
        }else{
              this.$message({
              message: '请输入正确数据格式',
              type: 'error',
              duration: 2000
            })
        }
      })
    },
    //装修免租期
    zhuangxiuFreeTerm(value){
      if(value == null){
        this.ruleForm.decorationFree = ['','']
        this.ruleForm.decorationYear = 0
        this.ruleForm.decorationMon = 0
        this.ruleForm.decorationDay = 0
        console.log(this.ruleForm.decorationFree)
      }else{
      this.ruleForm.decorationFree = value
      var oDate1 = new Date(this.ruleForm.leaseRange[0])
      var oDate2 = new Date(this.ruleForm.leaseRange[1])
      var oDate3 = new Date(this.ruleForm.decorationFree[0])
      var oDate4 = new Date(this.ruleForm.decorationFree[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.ruleForm.decorationFree = ['','']
      }else{
      console.log(value)
      this.ruleForm.decorationFree = value
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
      this.ruleForm.decorationDay = d

      // 计算年
      y = y2 + tmpY - y1
      if(m == 12){
        y = y+1
        m = 0
      }
      console.log(m)
      console.log(y)
      this.ruleForm.decorationMon = m
      this.ruleForm.decorationYear = y
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
    //租期
    zulinTerm(value){
      console.log(value)
      this.ruleForm.leaseRange = value
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
    tableTerm(value){
      console.log(value)
      this.tableData[0].increasingYears = value
      var oDate1 = new Date(this.ruleForm.leaseRange[0])
      var oDate2 = new Date(this.ruleForm.leaseRange[1])
      var oDate3 = new Date(this.tableData[0].increasingYears[0])
      var oDate4 = new Date(this.tableData[0].increasingYears[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.tableData[0].increasingYears = ['','']
      }
    },
    myTableTerm(row){
      console.log(row)
      var oDate1 = new Date(this.ruleForm.leaseRange[0])
      var oDate2 = new Date(this.ruleForm.leaseRange[1])
      var oDate3 = new Date(row.increasingYears[0])
      var oDate4 = new Date(row.increasingYears[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        row.increasingYears = []
      }
    },
    //经营免租期
    freeTerm(value){
      if(value == null){
        this.ruleForm.manageFree = ['','']
        this.ruleForm.manageYear = 0
        this.ruleForm.manageMon = 0
        this.ruleForm.manageDay = 0
        console.log(this.ruleForm.manageFree)
      }else{
      this.ruleForm.manageFree = value
      var oDate1 = new Date(this.ruleForm.leaseRange[0])
      var oDate2 = new Date(this.ruleForm.leaseRange[1])
      var oDate3 = new Date(this.ruleForm.manageFree[0])
      var oDate4 = new Date(this.ruleForm.manageFree[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.ruleForm.manageFree = ['','']
      }else{
      console.log(value)
      this.ruleForm.manageFree = value
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
      this.ruleForm.manageDay = d

      // 计算年
      y = y2 + tmpY - y1
      if(m == 12){
        y = y+1
        m = 0
      }
      console.log(m)
      console.log(y)
      this.ruleForm.manageMon = m
      this.ruleForm.manageYear = y
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
      //   this.ruleForm.yingyueId='CR-'
      // }else if(value=='人才公寓'){
      //   this.ruleForm.yingyueId='RC-'
      // }else if(value=='映月'){
      //   this.ruleForm.yingyueId='YY-'
      // }else if(value=='山韵，水岸'){
      //   this.ruleForm.yingyueId='SY'
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
      this.tableData[0].times = ''
      this.tableData[0].increasingYears = []
      this.tableData[0].dailyRent = ''
      this.tableData[0].beforeRent = ''
      this.tableData[0].afterRent = ''
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

