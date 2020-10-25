<template>
    <div id="nav-wrap">
        <!-- <h1 class="logo"><img src="../../../assets/logo.png"></h1> -->
        <el-menu :default-active="$route.path" 
        :collapse="isCollapse"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#fff"
        router>
        <template v-for="(item, index) in routers" >
            <el-submenu  v-if="!item.hidden" :key="item.id" :index="index + ''">
                <!--一级菜单-->
                <template slot="title">
                <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"/>
                <span slot="title" class="maintitle">{{item.meta.name}}</span>
                </template>
                <!--子菜单-->
                <el-menu-item :index="subItem.path" v-for="subItem in item.children" 
                :key="subItem.id"
                @click="saveNavState(subItem.path)">
                <span class="subtitle">{{subItem.meta.name}}</span>
                </el-menu-item>
            </el-submenu>
        </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'navMenu',
    data(){
        return{
            defaultActivePath: '/ChuangrongList',
            routers: this.$router.options.routes
        }
    },
    created(){
        console.log(this.myActivePath, 'created')
        window.addEventListener('popstate', this.popstate, false)
        this.defaultActivePath = window.sessionStorage.getItem('activePath')
        console.log(this.$route.path)
        if(this.defaultActivePath){
            this.defaultActivePath = window.sessionStorage.getItem('activePath')
        }else{
            sessionStorage.setItem('activePath', '/ChuangrongList')
            this.defaultActivePath = '/ChuangrongList'
        }
    },
    destroyed(){
        window.removeEventListener('popstate', this.popstate, false)
    },
    methods:{
    popstate(){
            console.log('发生了跳转')
            sessionStorage.setItem('activePath', this.$route.path)
            console.log(sessionStorage.getItem('activePath'))
        },
    saveNavState(activePath){
          window.sessionStorage.setItem('activePath', activePath)
          this.defaultActivePath = window.sessionStorage.getItem('activePath')
          console.log(this.defaultActivePath)
          console.log(this.$route.path)
      }
    },
    computed: {
        myActivePath: function(){
            sessionStorage.setItem('activePath', this.$route.path)
            return this.$route.path
        },
        isCollapse: function(){
            return this.$store.state.app.isCollapse
        }
    },
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
.el-menu{
    border-right: 0!important;
}
.el-menu-vertical-demo:not(.el-menu--collapse){
    width: $navMenu!important;
    height: 100%!important;
}
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: $navMenu;
    background-color: #344a5f;
    -webkit-transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    -ms-transition: all .3s ease 0s;
    -ms-transition: all .3s ease 0s;
    transition: all .3s ease 0s;
    svg{
        font-size: 24px;
        margin-right: 10px;
        margin-bottom: 8px;
    }
    .logo{
        img{
            margin: 28px auto 25px;
            width: 92px;
        }
    }
    .maintitle{
        font-size: 18px;
    }
    .subtitle{
        font-size: 14px;
    }
}

.open{
    #nav-wrap{
        width: $navMenu;
    }
}

.close{
    #nav-wrap{
        width: 64px;
    }
}
</style>