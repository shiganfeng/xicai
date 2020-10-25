<template>
  <div class="login-container">
    <div class="headTitle">
      <el-row style="color: white;font-size: 30px" >
        <span>租赁信息管理系统</span>
      </el-row>
    </div>
    <div class="rightContainer">
      <el-row>
      <el-form ref="sgfLoginForm" :model="sgfLoginForm" :rules="sgfLoginRules" class="login-form" autocomplete="on" label-position="top">
        <div class="title-container">
          <h3 class="title">登录</h3>
          <div>
            <el-divider style="margin-bottom: 10px"/>
          </div>
        </div>
        <div style="font-size: 14px;color: #3D403E; margin-left: 28px;">请填写下方信息</div>
        <el-form-item prop="username" label="用户名">
          <el-input ref="username" v-model="sgfLoginForm.username" placeholder="请输入用户名" name="username" type="text" tabindex="1" 
          autocomplete="on">
            <!-- <template slot="prepend">Http://</template> -->
          </el-input>
        </el-form-item>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password" label="密码">
            <el-input :key="passwordType" ref="password" v-model="sgfLoginForm.password" :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" 
            autocomplete="on" 
            @blur="capsTooltip = false" 
            @keyup.enter.native="sgfLogin" />
          </el-form-item>
        </el-tooltip>
        <el-button class="loginButton" :loading="loading" type="primary" style="width:344px;margin-bottom:10px;" @click.native.prevent="sgfLogin">登 录</el-button>
        <el-checkbox v-model="remember" style="margin-left: 28px;" class="rememberCheck" @change="showIsChecked">
          记住用户名
        </el-checkbox>
      </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { sgflogin } from '../../api/login.js'

export default {
  name: 'Login',
  data() {
    return {
      sgfLoginForm: {
        username: '',
        password: '',
      },
      sgfLoginRules: {
        username: {
          required: true,
          trigger: 'blur',
          message: '请输入用户名'
        },
        password: [{
          required: true,
          trigger: 'blur',
          message: '请输入密码'
        }, {
          min: 6,
          trigger: 'blur',
          message: '密码不能少于6位字符'
        }]
        },
      codeUrl: '',
      remember: false,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
    }
  },
  watch: {
  },
  created() {
    this.remember = Boolean(localStorage.getItem('remember'))
    console.log(localStorage.getItem('remember'))
    console.log(localStorage.getItem('sgfusername'))
    console.log(localStorage.getItem('sgfpassword'))
    if(localStorage.getItem('remember') == 'true'){
      console.log('111')
        this.sgfLoginForm.username = localStorage.getItem('sgfusername')
        this.sgfLoginForm.password = localStorage.getItem('sgfpassword')
    }
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    showIsChecked(){
      console.log(this.remember)
      localStorage.setItem('remember', this.remember)
    },
      sgfLogin(){
        this.$refs.sgfLoginForm.validate(async valid => {
          if(valid){
            let requestData = {
            username: this.sgfLoginForm.username,
            password: this.sgfLoginForm.password,
          }
          //使用store里的login
          this.$store.dispatch('app/login', requestData).then((response) => {
            let data = response.data
            localStorage.setItem('myusername', this.sgfLoginForm.username)
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1000
            })
            //页面跳转
            this.$router.push({
              name: 'chuangronglist'
            })
            console.log(data)
            if(this.remember){
              localStorage.setItem('remember', this.remember)
              localStorage.setItem('sgfusername', this.sgfLoginForm.username)
              localStorage.setItem('sgfpassword', this.sgfLoginForm.password)
            }
          }).catch((error) => {
            this.$message({
              message: '账户或密码错误',
              type: 'error',
              duration: 1000
            })
          })
          }
        })
          //   let requestData = {
          //   username: this.sgfLoginForm.username,
          //   password: this.sgfLoginForm.password,
          //   // code: this.ruleForm.code
          // }
          // //登录接口
          // sgflogin(requestData).then((response) => {
          //   let data = response.data
          //     if (this.remember) {
          //     localStorage.remember = this.remember
          //     localStorage.username = this.sgfLoginForm.username
          //     localStorage.password = this.sgfLoginForm.password
          //   } else {
          //     localStorage.removeItem('remember')
          //     localStorage.removeItem('username')
          //     localStorage.removeItem('password')
          //   }
          //   this.$message({
          //     message: '登录成功',
          //     type: 'success',
          //     duration: 1000
          //   })
          //   //页面跳转
          //   localStorage.setItem('myusername', this.sgfLoginForm.username)
          //   //页面跳转
          //   this.$router.push({
          //     name: 'chuangronglist'
          //   })
          // }).catch((error) => {
          //   console.log(this.sgfLoginForm)
          //   this.$message({
          //     message: '用户或密码错误',
          //     type: 'error',
          //     duration: 1000
          //   })
          //   console.log('fail')
          // })
        },
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg: #283443;
  @supports (-webkit-mask: none) and (not (cater-color: #000)) {
    .login-container .el-input input {
      color: #000;
    }
  }

  /* reset element-ui css */
  .login-container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background: url('../../../public/caizheng.jpg') center center no-repeat;
    .rightContainer {
      width: 400px;
      min-height: 400px;
      height: 400px;
      border-color: #ffffff;
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-200px);
      .title-container{
        h3{
          text-align: center!important;
        }
      }
    }
    .el-input {
      display: inline-block;
      height: 36px;
      width: 344px;
      border: 1px solid #cfd5d5;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        // padding: 12px 5px 12px 15px;
        color: #000;
        // height: 47px;
        caret-color: #000;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      }
    }

    .el-form-item {
      margin-left: 28px;
      width: 400px;
      // border: 1px solid rgba(255, 255, 255, 0.1);
      // background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      // color: #454545;
    }
    .el-form-item__label {
      padding: 0;
    }
    .headTitle{
      position: absolute;
      left: 50%;
      top: 30px;
      transform: translateX(-90px);
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: #ffffff;
    overflow: hidden;

    .login-form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 400px;
      height: 400px;
      padding: 28px 28px;
      background-color: #fff;
      .loginButton {
        width: 344px;
        height: 38px;
        // border-radius: 20px;
        color: #ffffff;
        border: none;
        background-color: #47b2a7;
        margin-top: 40px;
        margin-left: 28px;
      }
      .rememberCheck{
        margin-top: 20px;
      }
    }

    .tips {
      font-size: 14px;
      // color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #000000;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      text-align: center;
      width: 100%;
      position: relative;
      .title {
        font-size: 26px;
        color: #000;
        margin: 0px auto 40px auto;
        text-align: left;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #000;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 400px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
