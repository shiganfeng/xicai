<template>
    <body id="poster">
        <div class="leftContainer">
            <div class="introduce">
                <div class="maintitle">
                <h3 class="login_title">Welcome!</h3>
                </div>
                <div class="maintitle" style="">
                <h3 class="login_title">恒廷实业资产管理系统</h3>
                </div>
                <div class="subtitle">
                <h3 class="login_title">->合同录入自动化</h3>
                </div>
                <div class="subtitle">
                <h3 class="login_title">->台账生成自动化</h3>
                </div>
                <div class="subtitle">
                <h3 class="login_title">->合同打印自动化</h3>
                </div>
                <div class="subtitle">
                <h3 class="login_title">->租金收缴自动化</h3>
                </div>
                <div class="subtitle">
                <h3 class="login_title">->资产管理自动化</h3>
                </div>
            </div>
        </div>
        <div class="design">
            <span style="font-size:15px">Copyright © 2020 WuXiRongZhi LeaseInformationEnter System. All rights reserved.</span>
        </div>
        <div class="rightContainer">
            <el-form class="login-container" ref="sgfLoginForm" :model="sgfLoginForm" :rules="sgfLoginRules" label-position="left">
                <h3 class="login_title">账号登录</h3>
                <el-form-item prop="username">
                    <el-input type="text" v-model="sgfLoginForm.username" auto-complete="off" placeholder="请输入用户名">
                        <i slot="prefix" class="el-input__icon el-icon-user" style="color: white;"></i>
                    </el-input>
                </el-form-item>
            
                <el-form-item prop="password">
                    <el-input type="password" v-model="sgfLoginForm.password" auto-complete="off" placeholder="请输入密码">
                        <i slot="prefix" class="el-input__icon el-icon-lock" style="color: white;"></i>
                    </el-input>
                </el-form-item>
            
                <el-form-item style="width: 100%">
                    <!-- <el-button type="primary" style="width: 100%;background: #505458;border: none">登录</el-button> -->
                    <el-button :loading="loading" type="primary" class="loginBtn"  
                    @click.native.prevent="sgfLogin">登 录</el-button>
                </el-form-item>

                <el-form-item style="width: 100%">
                    <el-checkbox v-model="remember" class="rememberCheck" @change="showIsChecked" style="color: white">
                        记住用户名
                    </el-checkbox>
                </el-form-item>

            </el-form>
        </div>
    </body>
</template>

<script>
import { sgflogin } from '../../api/login.js'
import { setRSApass, getRSApass } from  '../../api/rsa.js'

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
    if(localStorage.getItem('remember') == 'true'){
        this.sgfLoginForm.username = localStorage.getItem('sgfusername')
        this.sgfLoginForm.password = getRSApass(localStorage.getItem('sgfpassword'))
        // console.log(getRSApass(localStorage.getItem('sgfpassword')))
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
            password: setRSApass(this.sgfLoginForm.password),
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
              localStorage.setItem('sgfpassword', setRSApass(this.sgfLoginForm.password))
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
        },
  }
}
</script>

<style lang="scss">
  #poster {
    background:url("../../../public/caizheng.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    .design{
        width: 600px;
        position: absolute;
        left: 50%;
        bottom: 30px;
        transform: translateX(-300px);
        span{
            font-size: 12px;
            color: white;
        }
    }
  }
  body{
    margin: 0px;
    padding: 0;
    position: relative;
  }
  .leftContainer{
      width: 60%;
      margin: 0 auto;
      margin-top: 120px;
      top: 50px;
      .maintitle{
          color: white;
          font-size: 45px;
          margin-top: 10px;
      }
      .subtitle{
          color: whitesmoke;
          font-size: 25px;
          margin-top: 25px;
          h3{
              font-style: italic;
          }
      }
  }
  .rightContainer{
      position: absolute;
      right: 100px;
      top: 50px;
        .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 90px auto;
        width: 300px;
        padding: 35px 35px 15px 35px;
        background: rgba(0,0,0,0.2);
        // border: 1px solid #eaeaea;
        // box-shadow: 0 0 25px #cac6c6;
    }
    
    .login_title {
        font-size: 24px;
        font-weight: bold;
        margin: 0px auto 40px auto;
        text-align: center;
        color: #fff;
    }

    .el-input__inner {
    color: white;
    background: transparent;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    /*outline: medium;*/
}

    .el-input__inner::placeholder {
        color: #fff;
        text-align:left;
    }
     /* 谷歌 */
    .el-input__inner::-webkit-input-placeholder {
        color: #fff;
        text-align:left;
    }
     /* 火狐 */
   .el-input__inner:-moz-placeholder {
        color: #fff;
        text-align:left;
    }
     /*ie*/
   .el-input__inner:-ms-input-placeholder {
        color: #fff;
        text-align:left;
    }

    .loginBtn{
        width: 100%;
        background: $mainColor;
        border: none;
        color: white;
        font-size: 16px;
    }

  }
 
</style>
