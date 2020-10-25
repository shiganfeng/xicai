<template>
  <div class="policy-info">
    <el-row class="myxue">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/RencaiList' }"><span class="sgftitle">人才公寓</span></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/rencaiInfo' }"><span class="sgftitle">{{$route.query.id ? '编辑' : '新增'}}</span></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="margin-top: 21px;">
      <el-divider></el-divider>
    </el-row>
    <el-row>
      <el-divider></el-divider>
    </el-row>
    <el-form ref="ruleForm" class="ruleForm" label-suffix="："  label-position="left" 
    :model="ruleForm" :rules="rules" label-width="210px" v-loading="loading">
      <el-row :gutter="30">
        <el-col :span="12">
          <!-- <el-form-item label="合同名称" prop="contractName">
            <el-input size="small"  v-model="ruleForm.contractName" :disabled="true" placeholder="请输入合同名称" />
          </el-form-item> -->
          <el-form-item label="合同编号" prop="contractID">
            <el-input size="small" ref="htName" v-model="ruleForm.contractID" disabled placeholder="请输入合同编号" />
          </el-form-item>
          <el-form-item label="项目名称" prop="belogArea">
            <el-input size="small" v-model="ruleForm.belogArea" placeholder="请选择项目名称" disabled/>
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
          <el-form-item label="联系人" prop="contacts">
            <el-input size="small" v-model="ruleForm.contacts" placeholder="请输入联系人"  />
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input size="small" v-model="ruleForm.tel" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="联系地址(非必填)" prop="address">
            <el-input size="small" v-model="ruleForm.address" placeholder="请输入联系地址(非必填)" />
          </el-form-item>
          <el-form-item label="身份证号" prop="identity">
            <el-input size="small" ref="htName" v-model="ruleForm.identity" placeholder="请输入身份证号" />
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
          <el-form-item label="备注(非必填)" prop="remarks">
            <el-input size="small" v-model="ruleForm.remarks" placeholder="请输入备注(非必填)" type="textarea" autosize/>
          </el-form-item>
          <el-form-item label="其他约定(非必填)" prop="others">
            <el-input size="small" v-model="ruleForm.others" placeholder="请输入其他约定(非必填)" type="textarea" autosize/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="月租金单价(元/套)" prop="monRent">
            <el-input-number v-model="ruleForm.monRent" :precision="2" :step="0.1" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="合同保证金(元)" prop="depositContracts">
              <el-input-number v-model="ruleForm.depositContracts" :step="1" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="租金支付周期(月)" prop="rentPayCycle">
            <el-input-number v-model="ruleForm.rentPayCycle" :precision="0" :step="1" size="medium"></el-input-number>
          </el-form-item>
          <el-form-item label="承租类型" prop="leaseType">
            <el-select size="small" v-model="ruleForm.leaseType" placeholder="请选择承租类型" > 
              <el-option
                v-for="item in myoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户单位" prop="accountUnit">
            <el-select size="small" v-model="ruleForm.accountUnit" placeholder="请选择开户单位" > 
              <el-option
                v-for="item in belogAreaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="租赁起止日期" prop="dateStartEnd">
              <el-date-picker
                size="small"
                v-model="ruleForm.dateStartEnd"
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
              :stripe="true"
              :border="true"
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
                    @change="tableTerm(scope.row.startEnd)">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="应收租金(元)" prop="rentReceivable" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.rentReceivable" :precision="2" :step="1000" size="mini"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="实收租金(元)" prop="rentPaid" width="250px">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.rentPaid" :precision="2" :step="1000" size="mini"></el-input-number>
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
                  :stripe="true"
                  :border="true"
                  height="300"
                  class="myTableData myTable sgfTable">
                  <!-- <el-table-column type="index" :index="indexMethod" width="100px" >
                    <span class="numqi">第几期</span>
                  </el-table-column> -->
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
                  <el-table-column label="实收租金(元)" prop="rentPaid" width="250px">
                    <template slot-scope="scope">
                      <el-form-item :prop="'myTableData.'+scope.$index+'.rentPaid'"  :rules="{required: true,message: '请填写金额',trigger: 'blur'}">
                          <el-input-number v-model="scope.row.rentPaid" :precision="2" :step="1000" size="mini"></el-input-number>
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
          <el-button @click="$router.push('/RencaiList')" class="mycancle" type="danger">取消</el-button>
          <el-button type="success" @click="sgfsubmit" :loading="submitLoading" class="itemBtn">确定</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>

import { GYAddInfo, GYUpdateInfo, GYGetEditInfo, GYGetXxid, GYGetLocation} from '../../api/login.js'
export default {
  data() {
      //验证联系电话,从头开始第一位是1；第二位是3,4,5,7,8；第三位到结尾是0 - 9 的数字.
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
      var validateteIdentity = (rule, value, callback) => {
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (value === '') {
            callback(new Error('请输入身份证号'));
        }else if(!reg.test(value)){
            callback(new Error('身份证号格式有误'));
        } else {
          callback();//返回true
          
        }
      };
    return {
      //区分当前页面是编辑还是新增
      collapseNames: [],
      pushIcon: true,
      isQiury: true,
      showHeader:false,
      isShowOverflow:true,
      id: '',
      visible: false,
      startOptions: {
        disabledDate: (time) => !!this.ruleForm.endDate && time.getTime() > this.ruleForm.endDate
      },
      endOptions: {
        disabledDate: (time) => !!this.ruleForm.startDate && time.getTime() < this.ruleForm.startDate
      },
      belogAreaOptions: [
        {
          value: '无锡锡东新城建设发展有限公司(燃)',
          label: '无锡锡东新城建设发展有限公司(燃)'
        }, {
          value: '无锡山水佳韵物业服务有限公司(电)',
          label: '无锡山水佳韵物业服务有限公司(电)'
        }, {
          value: '无锡恒廷实业有限公司',
          label: '无锡恒廷实业有限公司'
        }
      ],
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
        zulinvalue: '',
        myoptions: [{
          value: '公司',
          label: '公司'
        },
        {
          value: '个人',
          label: '个人'
        }],
        addoptions: [{
          value: '802',
          label: '802'
        }],
        kaihuoptions: [{
          value: '人才公寓',
          label: '人才公寓'
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
        addvalue: '',
        isEdit: false,
      ruleForm: {
        xid: null,
        createBy: '',
        updateBy: '',
        contractName: '',
        contractID: '',
        condition: '',
        leaseHolder: '',
        contacts: '',
        tel: '',
        address: '',
        identity: '',
        signDate: '',
        dateStartEnd: [],
        location: '',
        locations: [],
        monRent: 0,
        depositContracts: 0,
        leaseTerm: 0,
        leaseYear: 0,
        leaseMon : 0,
        leaseDay: 0,
        rentPayCycle: 0,
        accountUnit: '',
        leaseType: '',
        remarks: '',
        others: '',
        belogArea: '人才公寓',
        reNewOrNew: '',
        myTableData:[

        ]
      },
      tableData: [{
          times: '',
          startEnd: [],
          rentReceivable: 0,
          rentPaid: 0
        }],
      regionOptions: [],
      fileName: '',
      regionEnum: '',
      rules: {
        // contractName: {
        //   required: true,
        //   message: '请选择租赁名称',
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
        identity: {
          required: true,
          validator: validateteIdentity,
          trigger: 'blur'
        },
        // signDate: {
        //   required: true,
        //   message: '请选择签约日期',
        //   trigger: 'blur'
        // },
        dateStartEnd: {
          required: true,
          message: '请选择起止时间',
          trigger: 'blur'
        },
        location: {
          required: true,
          message: '请选择租赁位置',
          trigger: 'blur'
        },
        locations: {
          required: true,
          message: '请选择租赁位置(可多选)',
          trigger: ['blur', 'change']
        },
        monRent: {
          required: true,
          message: '请输入月租金单价',
          trigger: 'blur'
        },
        depositContracts: {
          required: true,
          message: '请输入合同保证金',
          trigger: 'blur'
        },
        leaseTerm: {
          required: true,
          message: '请输入租赁年限',
          trigger: 'blur'
        },
        freeTerm: {
          required: true,
          message: '请输入租金支付周期',
          trigger: 'blur'
        },
        rentPayCycle: {
          required: true,
          message: '请输入租金支付周期',
          trigger: 'blur'
        },
        accountUnit: {
          required: true,
          message: '请选择开户单位',
          trigger: ['blur', 'change']
        },
        leaseType: {
          required: true,
          message: '请选择租赁类型',
          trigger: ['blur', 'change']
        },
        belogArea: {
          required: true,
          message: '请选择项目名称',
          trigger: 'blur'
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
    if(this.$route.query.id){
      //这是显示编辑
      this.ruleForm.updateBy = localStorage.getItem('myusername')
      this.ruleForm.createBy = ''
      this.ruleForm.xid = this.$route.query.id
      this.isQuery = true
      console.log(this.ruleForm.updateBy)
      console.log(this.isQuery)
      console.log('query存在')
      this.sgfGetEditList()
      this.sgfGetGYLocation()
    }else{
      //这是显示新增
      this.ruleForm.createBy = localStorage.getItem('myusername')
      this.ruleForm.updateBy = ''
      this.isQuery = false
      console.log(this.ruleForm.createBy)
      console.log(this.isQuery)
      console.log('不存在')
      this.sgfGetXxid()
      this.sgfGetGYLocation()
    }
    this.id = this.$route.query.id

  },
  async mounted() {

  },
  beforeDestroy() {
    // window.tinymce.get('tinymce').destroy()
  },
  methods: {
    //处理table序号
    indexMethod(index){
      return '第'+index+'期'
    },
    handleCollapseNames(){
      this.pushIcon = !this.pushIcon
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
    //获取人才公寓租赁位置列表
    async sgfGetGYLocation(){
      let locationData = await GYGetLocation()
      console.log(locationData)
      this.addoptions = locationData.data.location
      console.log(this.addoptions)
    },
    //获取排序合同编号，以及合同编号的复用
    async sgfGetXxid(){
      let hetongId = await GYGetXxid()
      console.log(hetongId)
      this.ruleForm.contractID = hetongId.data.contractID
    },
    async sgfGetEditList(){
      console.log(this.$route.query.id)
      let requestData = this.$route.query.id
      let bigdata = await GYGetEditInfo(requestData)
      console.log(bigdata)
      let newData = bigdata.data.renCaiDto
      console.log(newData)
      this.ruleForm = newData
      console.log(this.ruleForm)
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
          let adddata = await GYAddInfo(requestData).then((response) => {
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
                this.$router.push('/RencaiList')
              },2000)
            }, 2000);
            console.log(data)
          }).catch((error) => {
          })
          console.log(adddata)
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
          let updatedata = await GYUpdateInfo(requestData).then((response) => {
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
                this.$router.push('/RencaiList')
              },2000)
            }, 2000);
            console.log(data)
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
    leaseTerm(value){
      console.log(value)
      this.ruleForm.dateStartEnd = value
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
      this.tableData[0].startEnd = value
      var oDate1 = new Date(this.ruleForm.dateStartEnd[0])
      var oDate2 = new Date(this.ruleForm.dateStartEnd[1])
      var oDate3 = new Date(this.tableData[0].startEnd[0])
      var oDate4 = new Date(this.tableData[0].startEnd[1])
      if((oDate1.getTime() > oDate3.getTime()) || (oDate2.getTime() < oDate4.getTime())){
        this.$message({
          message:'超过租赁期限，请重新选择',
          type: 'error',
          duration : 2000
        })
        this.tableData[0].startEnd = []
      }
    },
    myTableTerm(row){
      console.log(row)
      var oDate1 = new Date(this.ruleForm.dateStartEnd[0])
      var oDate2 = new Date(this.ruleForm.dateStartEnd[1])
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
    freeTerm(value){
      console.log(value)
      // 拆分年月日
      let time1 = value[0].split('-');
      // 得到月数
      let date1 = parseInt(time1[0]) * 12 + parseInt(time1[1]);
      // 拆分年月日
      let time2 = value[1].split('-');
      // 得到月数
      let date2 = parseInt(time2[0]) * 12 + parseInt(time2[1]);
      let m = Math.abs(date1 - date2);
      this.ruleForm.freeTerm = m
    },
    nameSel(value){
      console.log(value)
      // if(value=='创融、兖矿、东站、浙大网新'){
      //   this.ruleForm.xxId='CR-'
      // }else if(value=='人才公寓'){
      //   this.ruleForm.xxId='RC-'
      // }else if(value=='映月'){
      //   this.ruleForm.xxId='YY-'
      // }else if(value=='山韵，水岸'){
      //   this.ruleForm.xxId='SY'
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
      this.tableData[0].rentReceivable=0
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
  top: 20px
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
.numqi{
    height: 58px !important;
    line-height: 37px !important;
  }
}

</style>
