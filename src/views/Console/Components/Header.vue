<template>
    <div id="header-wrap">
        <div class="pull-left header-icon"  @click="navMenuState">
            <svg-icon iconClass="menu" className="menu" />
        </div>
        <div class="pull-left headertitle">
            恒廷实业资产管理系统
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                {{username}}
            </div>
            <div class="pull-right header-icon" @click="exit">
                <el-button type="success"><svg-icon iconClass="exit" className="exit" /></el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username: '',
            imageUrl: ''
        }
    },
    created(){
        this.username = localStorage.getItem('myusername')
    },
    methods: {
        //改变左边导航栏状态
        navMenuState(){
            console.log('collapseState')
            this.$store.commit('app/SET_COLLAPSE')
        },
        //退出
       async exit(){
        const confirm = await this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        
      })
      if (confirm) {
            this.$store.dispatch('app/exit').then( () => {
                //路由跳转
                console.log('退出登录')
            this.$router.push({
                    name: 'Login'
                })
             })
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap{
    position: fixed;
    left: $navMenu;
    right: 0;
    top: 0;
    height: 56px;
    background-color: #02DBC3;
    line-height: 56px;
    // -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
}
.headertitle{
    color: white;
    font-size: 25px;
    padding: 0 25px;
}
.header-icon{
    padding: 0 15px;
    svg{
        color: white;
        margin-bottom: -8px;
        font-size: 25px;
        cursor: pointer;
    }
}
.user-info{
    height: 100%;
    padding: 0 10px;
    color: white;
    font-size: 16px;
    // border-right: 1px solid #ededed;
}

.open{
    #header-wrap{
        left: $navMenu;
    }
}

.close{
    #header-wrap{
        left: 64px;
    }
}
</style>