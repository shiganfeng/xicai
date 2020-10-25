<template>
  <div class="app-container policy-list">
    <el-row class="myxue">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/ZhedaList' }"><span class="sgftitle">浙大网新</span></el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="1">
        <router-link to="/zhedaInfo">
          <el-button type="success" size="small">新增</el-button>
        </router-link>
      </el-col>
      <el-col :span="2">
          <span class="title">承租方：</span>
      </el-col>
      <el-col :span="6" class="text-r search-bar mycheng">
        <el-input v-model="shaiXuanName" ref="shaixuanInput" class="search" size="small" placeholder="请输入承租方" clearable 
        @blur="shaixuanChange"
        @keyup.enter.native="sgfshaixuan">
          <i slot="suffix" class="el-icon-search el-input__icon" @click="sgfshaixuan" />
        </el-input>
      </el-col>
      <el-col :span="3" class="text-r search-bar zhengce">
        <el-button type="success" class="shaixuan" size="small" @click="sgfshaixuan">筛选</el-button>
      </el-col>
    </el-row>
    <section class="policy-container" v-loading="loading">
      <el-table ref="multipleTable" size="small" :data="tableData" height="500px" tooltip-effect="dark" 
      @selection-change="selChange" @select="handleSelect" :row-class-name="rowClassName">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column v-for="item in tableHead" :key="item.key" :prop="item.key" :label="item.label" 
        v-if="item.hidden"
        :formatter="item.formatter" 
        :min-width="item.width" 
        :render-header="item.renderHeader" 
        show-overflow-tooltip />
        <el-table-column prop="options" label="操作" show-overflow-tooltip width="112">
          <template slot-scope="{row}">
            <template>
              <template>
                <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false" >
                  <router-link :to="`/zhedaInfo?id=${row.xid}`">
                    <svg-icon iconClass="edit" className="edit" style="color: #02dbc3;font-size: 25px;cursor: pointer;"/>
                  </router-link>
                </el-tooltip>
                <el-tooltip effect="dark" content="重试" placement="top" :enterable="false" v-show="row.condition == '出错' ? true : false">
                  <a @click="tryAgain(row)">
                    <svg-icon iconClass="try" className="try" style="color: red; cursor: pointer;font-size: 18px"/>
                  </a>
                </el-tooltip>
              </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="m-t-xs fenye">
        <el-col :span="20" class="text-r fenyeBtn">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="sgfPage.page"
            :page-sizes="[5, 10, 15]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
            </el-pagination>
        </el-col>
      </el-row>
      <div class="deleteBtn">
        <el-button  type="info" icon="el-icon-delete-solid" size="small" @click="sgfDelete" >删除</el-button>
      </div>
    </section>
  </div>
</template>
<script>
import { CRShaixuan,CRGetEnterList,CRDeleteInfo,CRRetest,CRGetEditInfo,CRGetZhedaList,CRZhedaShaixuan } from '../../api/login.js'
export default {
  data() {
    return {
      total: 0,
      currentPage4: 1,
      deleteId: [],
      shaiXuanName: '',
      searchVal: '',
      loading: false,
      leaseTermRange: '',
      tableData: [],
      listTable: [],
      pageParam: {
        pageNo: 0,
        pageSize: 15
      },
      sgfPage: {
        size: 5,
        page: 1
      },
      regionEnum: {},
      sortFields: [{
        ascending: false,
        field: 'createTime'
      }],
      total: 0,
      importLoading: false,
      cacheArr: [],
      selectArr: [],
      downLoading: false,
      value: [],
      value1: '',
      options: [{
          value: '选项1',
          label: '承租方1'
        }, {
          value: '选项2',
          label: '承租方2'
        }, {
          value: '选项3',
          label: '承租方3'
        }]
    }
  },
  computed: {
    tableHead() {
      return [
      {
        key: 'contractID',
        label: '合同编号',
        hidden: true,
      },
        {
        key: 'belogArea',
        label: '项目名称',
        hidden: true,
      }, {
        key: 'leaseHolder',
        label: "承租方名称",
        hidden: true,
      }, {
        key: 'contacts',
        label: "联系人",
        hidden: true,
      }, {
        key: 'tel',
        label: "联系电话",
        hidden: true,
      },{
        key: 'location',
        label: "租赁位置",
        hidden: true,
      },{
        key: 'leaseRange',
        label: "起止时间",
        hidden: true,
      },{
        key: 'rentPaymentCycle',
        label: "租金支付周期",
        hidden: true,
      },{
        key: 'xid',
        label: "数据编号",
        hidden: false
      },
      {
        key: 'condition',
        label: '状态',
        hidden: true
      }
      ]
    }
  },
  async created() {
    this.getEnterList()
  },
  async mounted(){
    // let mydata = await this.getEnterList()
    // console.log(mydata)
    // console.log(this.sgfPage)
    // console.log(this.shaiXuanName == '')
    // this.shaixuan()
  },
  methods: {
    //获取table当前行索引值
    rowClassName({row, rowIndex}){
      row.index = rowIndex;
    },
    //重试按钮
    async tryAgain(row){
      console.log('重试')
      console.log(row)
      console.log(row.index)
      console.log(this.tableData[row.index].condition)
      let retestData = await CRRetest(row.xid).then( (res) => {
        console.log(res.data)
      }).catch( (rej) => {
        console.log(rej)
      })
      
      let bigdata = await CRGetEditInfo(row.xid)
      console.log(bigdata.data.rongChDto)
      let newdata = bigdata.data.rongChDto
      console.log(newdata.condition)
      row.condition = newdata.condition
      console.log(row.condition)
      // 当返回'已提交'的时候,保持3秒轮询
      if (newdata.condition == '已提交') {
          var timer = setInterval( async () => {
            console.log('轮询')
            let bigdata = await CRGetEditInfo(row.xid)
            let newdata = bigdata.data.rongChDto
            console.log(newdata.condition)
            row.condition = newdata.condition
            console.log(row.condition)
            // 当返回'已完成'的时候,关闭定时器,结束轮询
            if (newdata.condition == '已生成') {
                clearInterval(timer)
            }
          }, 10000)
      }
      // 当页面关闭的时候,结束轮询,否则就会一直发请求,
      //使用$once(eventName, eventHandler)一次性监听事件
      this.$once('hook:boforeDestory', () => {
          clearInterval(timer)
      })
    },
        //筛选框失去焦点触发事件
    async shaixuanChange(){
      if(this.$refs.shaixuanInput.value){
        //当输入框内值不为空,失去焦点的时候，触发获取信息列表功能
        this.shaixuan()
        console.log('111')
      }else{
        //当输入框内值为空,失去焦点的时候，触发筛选功能
        this.sgfPage.page = 1
        this.getEnterList()
        console.log('222')
      }
    },
    //删除信息
    async sgfDelete(){
      //调用删除接口
        console.log(this.deleteId)
        if(this.deleteId.length == 0){
          this.$message({
            message: '请勾选要删除的数据',
            type: 'warning',
            duration: 2000
          })
          return false
        }else{
          const confirm = await this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(() => {
          
        })
        if (confirm) {
          let requestData = this.deleteId
          let deletedate = await CRDeleteInfo(requestData)
          if (deletedate) {
            this.$message.success('删除成功!')
            this.shaixuan()
          } else {
          }
        }else{
          this.getEnterList()
        }
        }
    },
    //渲染信息
    async getEnterList(){
          let requestData = {
            page: this.sgfPage.page,
            size: this.sgfPage.size,
          }
          console.log(this.sgfPage)
          let mydata = await CRGetZhedaList(requestData)
          console.log(mydata)
          this.tableData = mydata.data.list
          this.total = mydata.data.total
    },
    sgfshaixuan(){
      if(!this.shaiXuanName){
        this.$message({
          message: '请输入承租方名称',
          type: 'warning',
          duration: 2000
        })
        return false
      }else{
        this.shaixuan()
      }
    },
    //筛选功能
    async shaixuan(){
      this.sgfPage.page = 1
      let requestData = {
            filter: this.shaiXuanName,
            page: this.sgfPage.page,
            size: this.sgfPage.size,
      }
      console.log(requestData)
          let shaixuandata = await CRZhedaShaixuan(requestData).catch((res) => {
            console.log(res)
          })
          console.log(shaixuandata)
          if(shaixuandata == undefined){
            this.tableData = []
            this.total = 0
            this.$message({
              message: '没有符合的数据',
              type: 'error',
              duration: 2000
            })
          }else{
            this.tableData = shaixuandata.data.list
            this.total = shaixuandata.data.total
          }
    },
    handleSizeChange(val) {
        this.sgfPage.size = val
        console.log(this.sgfPage.size)
        if(this.shaiXuanName == ''){
          this.getEnterList()
        }else{
          this.shaixuan()
        }
      },
    handleCurrentChange(val) {
        this.sgfPage.page = val
        console.log(this.sgfPage.page)
        if(this.shaiXuanName == ''){
          this.getEnterList()
        }else{
          this.keyShow()
        }
      },
      async keyShow(){
         let requestData = {
            filter: this.shaiXuanName,
            page: this.sgfPage.page,
            size: this.sgfPage.size,
          }
          console.log(requestData)
              let shaixuandata = await CRZhedaShaixuan(requestData).catch((res) => {
                console.log(res)
              })
              console.log(shaixuandata)
          if(shaixuandata == undefined){
            this.tableData = []
            this.total = 0
          }else{
            this.tableData = shaixuandata.data.list
            this.total = shaixuandata.data.total
          }

      },
    handleSelect(selection, row) {
      // console.log(row.xid)
      // if (selection.length < this.selectArr.length) {
      //   this.deleteId = this.deleteId.filter(v => v !== row.xid)
      // }
      // console.log(this.deleteId)
      // this.deleteId = Object.assign({}, this.deleteId, [])
      // console.log('要删除的数据的id数组')
      // console.log(this.deleteId)
      // console.log('勾选事件触发的返回的选中数组')
      // console.log(selection)
      // for(let i =0;i<selection.length;i++){
      //   this.$set(this.deleteId, i, selection[i].xid)
      // }
      // console.log(this.deleteId)
    },
    selChange(arr) {
      this.selectArr = arr;
      this.deleteId = []
      for(let i =0;i<arr.length;i++){
        this.$set(this.deleteId, i,arr[i].xid)
      }
      console.log(this.deleteId)
      // console.log(this.deleteId)
      // this.deleteId = Object.assign({}, this.deleteId, arr)
      // console.log(this.deleteId)
    },
  }
}
</script>
<style lang="scss">
  .policy-list {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 14px 0 0 0;

    .policy-container {
      height: calc(100% - 52px);
    }
    // .zhengce{
    //   position: absolute;
    //   right: 20px;
    // }
    .mycheng{
      position: absolute;
      right: 100px;
    }
    .shaixuan{
      margin-left: 20px;
      position: absolute;
      right: 20px;
    }

    // .shaixuan:active{
    //   background-color: #02dbc3;
    // }

    .title{
        position: absolute;
        right: 150px;
    }
    .color-red{
      color: red;
      cursor: pointer;
    }
  }
  .unselected .el-checkbox__input{
    border: 1px solid #fff;
  }

  .fenye{
      position: absolute;
      right: 70px;
      bottom: 20px;
  }

  .deleteBtn{
      position: absolute;
      left: 20px;
      bottom: 20px;
  }

  svg{
        font-size: 20px;
        margin-right: 10px;
        // background-color: #02dbc3;
    }

    .myxue{
      margin-bottom: 20px;
    }

.sgftitle{
      font-size: 20px;
      font-weight: bold;
      color: $mainColor;
      font-style: italic;
    }

    .el-breadcrumb__inner .is-link{
      font-size: 20px;
    }


</style>